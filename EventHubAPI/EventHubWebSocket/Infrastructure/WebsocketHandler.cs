using System;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.Extensions.Logging;

namespace EventHubWebSocket.Infrastructure
{
    public class WebsocketHandler
    {
        protected WebsocketConnectionManager _manager { get; set; }
        protected ILogger _logger { get; set; }

        public WebsocketHandler(WebsocketConnectionManager manager,
                                ILogger logger)
        {
            _manager = manager;
            _logger = logger;
        }

        public virtual async Task OnConnected(WebSocket socket)
        {
            _manager.Add(socket);
        }

        public virtual async Task OnDisconnected(WebSocket socket)
        {
            await _manager.Remove(_manager.GetSocketId(socket));
        }

        public async Task SendMessageAsync(WebSocket socket, object message)
        {
            try
            {
                if (socket.State != WebSocketState.Open)
                    return;

                var data = JsonConvert.SerializeObject(message);
                await socket.SendAsync(buffer: new ArraySegment<byte>(array: Encoding.ASCII.GetBytes(data),
                        offset: 0,
                        count: data.Length
                    ), messageType: WebSocketMessageType.Text,
                    endOfMessage: true,
                    cancellationToken: CancellationToken.None);
            } catch (Exception ex) {
                _logger.LogCritical(ex, "Error sending message");
            }
        }

        public async Task SendMessageAsync(string socketId, object message)
        {
            await SendMessageAsync(_manager.Get(socketId), message);
        }

        public async Task SendMessageAsync(string socketId, string message)
        {
            await SendMessageAsync(_manager.Get(socketId), message);
        }

        public async Task SendMessageToAllAsync(object message)
        {
            foreach (var socket in _manager.Query())
            {
                try
                {
                    if (socket.Value.State == WebSocketState.Open)
                        await SendMessageAsync(socket.Value, message);
                }
                catch
                {
                    // remove socket from concurrentdict
                    await _manager.Remove(socket.Key);
                }
            }
        }

        public async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            var id = _manager.GetSocketId(socket);
            var connections = _manager.Query().Where(m => m.Key != id);

            string message;
            var cancellationToken = new CancellationToken();

            //If input frame is cancelation frame, send close command. 
            if (result.MessageType == WebSocketMessageType.Close)
            {
                await socket.CloseAsync(WebSocketCloseStatus.NormalClosure,
                    String.Empty, cancellationToken);
                await _manager.Remove(id);
            }
            else
            {
                byte[] payloadData = buffer.Where(b => b != 0).ToArray();

                //Because we know that is a string, we convert it. 
                message = Encoding.UTF8.GetString(payloadData, 0, payloadData.Length);
                object obj = JsonConvert.DeserializeObject(message);
                foreach (var connection in connections)
                {
                    await SendMessageAsync(connection.Value, obj);
                }
            }
        }
    }
}

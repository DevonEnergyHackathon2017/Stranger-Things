using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace EventHubWebSocket.Infrastructure
{
    public class WebsocketMiddleware
    {
        private readonly RequestDelegate _next;
        private WebsocketHandler _handler { get; set; }

        public WebsocketMiddleware(RequestDelegate next, WebsocketHandler handler)
        {
            _next = next;
            _handler = handler;
        }

        public async Task Invoke(HttpContext context)
        {
            if (!context.WebSockets.IsWebSocketRequest)
                return;

            WebSocket socket = await context.WebSockets.AcceptWebSocketAsync();
            await _handler.OnConnected(socket);

            await Receive(socket, async (result, buffer) =>
            {
                if (result.MessageType == WebSocketMessageType.Text)
                {
                    await _handler.ReceiveAsync(socket, result, buffer);
                    return;
                }
                if (result.MessageType == WebSocketMessageType.Close)
                {
                    await _handler.OnDisconnected(socket);
                    return;
                }
            });
        }

        private async Task Receive(WebSocket socket, Action<WebSocketReceiveResult, byte[]> handleMessage)
        {
            var buffer = new byte[1024 * 4];

            while (socket.State == WebSocketState.Open)
            {
                var result = await socket.ReceiveAsync(buffer: new System.ArraySegment<byte>(buffer),
                    cancellationToken: CancellationToken.None);

                handleMessage(result, buffer);
            }
        }
    }
}

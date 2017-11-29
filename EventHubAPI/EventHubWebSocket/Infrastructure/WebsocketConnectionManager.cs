using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace EventHubWebSocket.Infrastructure
{
    public class WebsocketConnectionManager
    {
        public ConcurrentDictionary<string, WebSocket> _sockets = new ConcurrentDictionary<string, WebSocket>();

        public WebSocket Get(string id)
        {
            return _sockets.FirstOrDefault(s => s.Key == id).Value;
        }

        public ConcurrentDictionary<string, WebSocket> Query()
        {
            return _sockets;
        }

        public string GetSocketId(WebSocket socket)
        {
            return _sockets.FirstOrDefault(p => p.Value == socket).Key;
        }

        public void Add(WebSocket socket)
        {
            _sockets.TryAdd(Guid.NewGuid().ToString("N"), socket);
        }

        public async Task Remove(string id)
        {
            WebSocket socket;
            _sockets.TryRemove(id, out socket);

            if (socket != null)
                await socket.CloseAsync(closeStatus: WebSocketCloseStatus.NormalClosure, statusDescription: "Closed", cancellationToken: CancellationToken.None);
        }
    }
}

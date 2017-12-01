using System;
using System.Net.WebSockets;
using System.Threading.Tasks;
using EventHubWebSocket.Infrastructure;
using Microsoft.Extensions.Logging;

namespace EventHubWebSocket.Handlers
{
    public class DataEventHandler : EventHubWebSocket.Infrastructure.WebsocketHandler
    {
        protected ILogger _logger;

        public DataEventHandler(WebsocketConnectionManager manager, ILogger<DataEventHandler> logger) : base(manager)
        {
            _logger = logger;
        }

        public override async Task SendMessageAsync(WebSocket socket, object message) {
            try {
                await base.SendMessageAsync(socket, message);
            }
            catch (Exception ex) {
                _logger.LogCritical(ex, "Error sending message");
            }
        }
    }
}

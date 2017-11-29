using EventHubWebSocket.Handlers;
using Microsoft.Azure.EventHubs.Processor;
using Microsoft.Extensions.Logging;

// https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-dotnet-standard-getstarted-receive-eph

namespace Hckthn.Domain.EventHubProcessor
{
    public class EventHubProcessorFactory : IEventProcessorFactory
    {
        readonly ILogger<EventHubProcessor> _logger;
        private DataEventHandler _dataEventHandler;

        public EventHubProcessorFactory(ILogger<EventHubProcessor> logger, DataEventHandler dataEventHandler)
        {
            _dataEventHandler = dataEventHandler;
            _logger = logger;
        }

        public IEventProcessor CreateEventProcessor(PartitionContext context)
        {
            return new EventHubProcessor(_logger, _dataEventHandler);
        }
    }
}

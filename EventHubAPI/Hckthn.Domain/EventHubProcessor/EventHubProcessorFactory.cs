using Microsoft.Azure.EventHubs.Processor;
using Microsoft.Extensions.Logging;

// https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-dotnet-standard-getstarted-receive-eph

namespace Hckthn.Domain.EventHubProcessor
{
    public class EventHubProcessorFactory : IEventProcessorFactory
    {
        readonly ILogger<EventHubProcessor> _logger;

        public EventHubProcessorFactory(ILogger<EventHubProcessor> logger)
        {
            _logger = logger;
        }

        public IEventProcessor CreateEventProcessor(PartitionContext context)
        {
            return new EventHubProcessor(_logger);
        }
    }
}

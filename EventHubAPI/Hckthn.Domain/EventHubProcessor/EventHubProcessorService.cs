using System.Threading.Tasks;
using EventHubWebSocket.Handlers;
using Microsoft.Azure.EventHubs;
using Microsoft.Azure.EventHubs.Processor;
using Microsoft.Extensions.Logging;

// https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-dotnet-standard-getstarted-receive-eph

namespace Hckthn.Domain.EventHubProcessor
{
    public class EventHubProcessorService: IEventHubProcessorService
    {
        readonly ILogger _servicelogger;
        readonly ILogger<EventHubProcessor> _processorlogger;
        EventProcessorHost _eventProcessorHost;
        readonly IEventHubProcessorConfig _config;
        private DataEventHandler _dataEventHandler;

        public EventHubProcessorService(IEventHubProcessorConfig config, ILogger<EventHubProcessorService> serviceLogger, ILogger<EventHubProcessor> processorLogger,
                                        DataEventHandler dataEventHandler)
        {
            _servicelogger = serviceLogger;
            _processorlogger = processorLogger;
            _dataEventHandler = dataEventHandler;
            _config = config;
        }

        public async Task StartProcessingAsync()
        {
            _eventProcessorHost = new EventProcessorHost(
                _config.EhEntityPath,
                PartitionReceiver.DefaultConsumerGroupName,
                _config.EhConnectionString,
                $"DefaultEndpointsProtocol=https;AccountName={_config.StorageAccountName};AccountKey={_config.StorageAccountKey}",
                _config.StorageContainerName
            );

            await _eventProcessorHost.RegisterEventProcessorFactoryAsync(new EventHubProcessorFactory(_processorlogger, _dataEventHandler));
        }

        public async Task StopProcessingAsync()
        {
            await _eventProcessorHost.UnregisterEventProcessorAsync();
        }
    }
}

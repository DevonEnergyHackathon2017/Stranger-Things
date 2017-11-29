using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using EventHubWebSocket.Handlers;
using Microsoft.Azure.EventHubs;
using Microsoft.Azure.EventHubs.Processor;
using Microsoft.Extensions.Logging;

// https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-dotnet-standard-getstarted-receive-eph

namespace Hckthn.Domain.EventHubProcessor
{
    public class EventHubProcessor : IEventProcessor
    {
        readonly ILogger _logger;
        private DataEventHandler _dataEventHandler;

        public EventHubProcessor(ILogger<EventHubProcessor> logger, DataEventHandler dataEventHandler)
        {
            _dataEventHandler = dataEventHandler;
            _logger = logger;
        }

        public Task CloseAsync(PartitionContext context, CloseReason reason)
        {
            return Task.CompletedTask;
        }

        public Task OpenAsync(PartitionContext context)
        {
            return Task.CompletedTask;
        }

        public Task ProcessErrorAsync(PartitionContext context, Exception error)
        {
            return Task.CompletedTask;
        }

        //public async Task ProcessEventsAsync(PartitionContext context, IEnumerable<EventData> messages)
        //{
        //    foreach (var eventData in messages)
        //    {
        //        var data = Encoding.UTF8.GetString(eventData.Body.Array, eventData.Body.Offset, eventData.Body.Count);
        //        //_dataEventHandler.SendMessageToAllAsync(data);
        //        //Console.WriteLine($"Message received. Partition: '{context.PartitionId}', Data: '{data}'");
        //    }
        //    return context.CheckpointAsync();
        //}

        public Task ProcessEventsAsync(PartitionContext context, IEnumerable<EventData> messages)
        {
            foreach (var eventData in messages)
            {
                var data = Encoding.UTF8.GetString(eventData.Body.Array, eventData.Body.Offset, eventData.Body.Count);
                _dataEventHandler.SendMessageToAllAsync(data).GetAwaiter().GetResult();
                //Console.WriteLine($"Message received. Partition: '{context.PartitionId}', Data: '{data}'");
            }

            return context.CheckpointAsync();
        }
    }
}

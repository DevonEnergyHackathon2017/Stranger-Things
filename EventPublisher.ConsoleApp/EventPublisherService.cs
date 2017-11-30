using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.EventHubs;
using Newtonsoft.Json;

// https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-dotnet-standard-getstarted-send

namespace Hckthn.Domain.EventPublisher
{
    public class EventPublisherService : IEventPublisherService
    {
        EventHubClient _eventHubClient;
        readonly IEventPublisherConfig _config;

        public EventPublisherService(IEventPublisherConfig config)
        {
            _config = config;

            var connectionStringBuilder = new EventHubsConnectionStringBuilder(_config.EhConnectionString)
            {
                EntityPath = _config.EhEntityPath
            };

            _eventHubClient = EventHubClient.CreateFromConnectionString(connectionStringBuilder.ToString());
        }

        public void Dispose()
        {
            _eventHubClient.CloseAsync().GetAwaiter().GetResult();
            Console.WriteLine("Publisher disposed!");
        }

        public async Task PublishAsync<T>(T data)
        {
            await _eventHubClient.SendAsync(new EventData(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(data))));
        }

        public async Task PublishAsync(string message)
        {
            await _eventHubClient.SendAsync(new EventData(Encoding.UTF8.GetBytes(message)));
        }
    }
}

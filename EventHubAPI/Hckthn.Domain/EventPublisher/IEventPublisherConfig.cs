// https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-dotnet-standard-getstarted-send

namespace Hckthn.Domain.EventPublisher
{
    public interface IEventPublisherConfig
    {
        string EhConnectionString { get; set; }
        string EhEntityPath { get; set; }
    }
}

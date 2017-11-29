// https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-dotnet-standard-getstarted-send

namespace Hckthn.Domain.EventPublisher
{
    public class EventPublisherConfig : IEventPublisherConfig
    {
        string _ehConnectionString;
        string _ehEntityPath;

        public EventPublisherConfig(string ehConnectionString, string ehEntityPath)
        {
            _ehConnectionString = ehConnectionString;
            _ehEntityPath = ehEntityPath;
        }

        public string EhConnectionString { get => _ehConnectionString; set => _ehConnectionString = value; }
        public string EhEntityPath { get => _ehEntityPath; set => _ehEntityPath = value; }
    }
}

using System.Threading.Tasks;

// https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-dotnet-standard-getstarted-receive-eph

namespace Hckthn.Domain.EventHubProcessor
{
    public interface IEventHubProcessorService
    {
        Task StartProcessingAsync();
        Task StopProcessingAsync();
    }
}

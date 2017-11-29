using System;
using System.Threading.Tasks;

// https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-dotnet-standard-getstarted-send

namespace Hckthn.Domain.EventPublisher
{
    public interface IEventPublisherService : IDisposable
    {
        Task PublishAsync<T>(T data);
        Task PublishAsync(string message);
    }
}

using System;
namespace Hckthn.Domain.EventHubProcessor
{
    public interface IEventHubProcessorConfig
    {
        string EhConnectionString { get; set; }
        string EhEntityPath { get; set; }
        string StorageContainerName { get; set; }
        string StorageAccountName { get; set; }
        string StorageAccountKey { get; set; }
    }
}

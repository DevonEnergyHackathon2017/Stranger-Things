namespace Hckthn.Domain.EventHubProcessor
{
    public class EventHubProcessorConfig : IEventHubProcessorConfig
    {
        string _ehConnectionString;
        string _ehEntityPath;
        string _storageContainerName;
        string _storageAccountName;
        string _storageAccountKey;

        public EventHubProcessorConfig(string ehConnectionString, string ehEntityPath, string storageContainerName, string storageAccountName, string storageAccountKey)
        {
            _ehConnectionString = ehConnectionString;
            _ehEntityPath = ehEntityPath;
            _storageContainerName = storageContainerName;
            _storageAccountName = storageAccountName;
            _storageAccountKey = storageAccountKey;
        }

        public string EhConnectionString { get => _ehConnectionString; set => _ehConnectionString = value; }
        public string EhEntityPath { get => _ehEntityPath; set => _ehEntityPath = value; }
        public string StorageContainerName { get => _storageContainerName; set => _storageContainerName = value; }
        public string StorageAccountName { get => _storageAccountName; set => _storageAccountName = value; }
        public string StorageAccountKey { get => _storageAccountKey; set => _storageAccountKey = value; }
    }
}

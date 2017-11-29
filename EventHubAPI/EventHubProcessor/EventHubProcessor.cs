using System;
using System.Threading.Tasks;
using Hckthn.Domain.EventHubProcessor;

namespace EventHubProcessor
{
    public class EventProcessor
    {
        protected IEventHubProcessorService _processorService;

        public EventProcessor(IEventHubProcessorService processorService) {
            _processorService = processorService;
        }

        public void DoSomething()
        {
             _processorService.StartProcessingAsync().GetAwaiter().GetResult();

            //svc.StartProcessingAsync().GetAwaiter().GetResult();

            //Console.WriteLine("Receiving. Press ENTER to stop worker.");
            //Console.ReadLine();

            //svc.StopProcessingAsync().GetAwaiter().GetResult();

            //Console.WriteLine("Finished!");

        }
    }
}

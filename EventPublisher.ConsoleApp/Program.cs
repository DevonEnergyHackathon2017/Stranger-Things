using System;
using System.IO;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Hckthn.Domain.EventPublisher;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Hckthn.EventPublisher.ConsoleApp
{
    class Program
    {
        static IConfigurationRoot configuration;

        static void Main(string[] args)
        {
            var continueLoop = true;

            configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            // create service collection
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddLogging();

            // create service provider
            var serviceProvider = new AutofacServiceProvider(Bootstrap(serviceCollection, configuration));

            // configure logger
            serviceProvider.GetService<ILoggerFactory>().AddConsole(LogLevel.Trace);
            serviceProvider.GetService<ILoggerFactory>().AddDebug(LogLevel.Trace);

            // get the desired start time from the settings file
            var startTime = configuration["PublishSettings:StartTime"];
            var endTime = Convert.ToDateTime(configuration["PublishSettings:EndTime"]);

            // what is the desired publish rate?
            var publishDelay = Convert.ToInt32(configuration["PublishSettings:Delay"]);

            // read the file over and over if you ever reach the end (or hit endTime)
            while (true)
            {
                Console.WriteLine("Reading file.");
                using (var filedata = new StreamReader("data.json"))
                {
                    var foundStartTime = false;
                    if (startTime.Trim() == "")
                        foundStartTime = true;
                    using (var svc = serviceProvider.GetService<IEventPublisherService>())
                    {
                        Console.WriteLine($"Starting publish with delay = {publishDelay}.");
                        while (continueLoop)
                        {
                            // read line from file
                            var input = filedata.ReadLine();

                            // we want to be able to start at a specific time (specified in config)
                            if (!foundStartTime)
                            {
                                // is this the start time?
                                if (input.StartsWith($"{{\"Timestamp\":\"{startTime}", StringComparison.InvariantCulture))
                                {
                                    foundStartTime = true;
                                    Console.WriteLine($"Starting publish at {startTime}.");
                                }
                                else
                                    continue;
                            }

                            try
                            {
                                // de-serialize into object for broadcast
                                var evt = JsonConvert.DeserializeObject<AFDataEvent>(input);
                                evt.DttmOffset = DateTime.Now;

                                //Console.WriteLine("Press ENTER to send message, or 'q' to quit.");
                                //Console.ReadLine();
                                Task.Delay(publishDelay).GetAwaiter().GetResult();

                                var currentTime = Convert.ToDateTime(evt.Timestamp);

                                if (currentTime > endTime)
                                {
                                    continueLoop = false;
                                }
                                else
                                {
                                    svc.PublishAsync(evt).GetAwaiter().GetResult();
                                }
                            }
                            catch { /* something screwed up, just keep going! */ }

                            // did we reach the end of the file?
                            if (filedata.EndOfStream)
                            { // we could reset the file pointer here! for now just end if we reach the end
                                continueLoop = false;
                            }
                        }
                    }
                }
                continueLoop = true; // restart
                Console.WriteLine("Restarting data broadcast!");
            }
        }

        static IContainer Bootstrap(IServiceCollection services, IConfiguration config)
        {
            // Add Autofac
            var containerBuilder = new ContainerBuilder();
            containerBuilder.Populate(services);

            containerBuilder.RegisterType<EventPublisherService>().As<IEventPublisherService>();
            containerBuilder.Register(c =>
                                      new EventPublisherConfig(
                                          config["AzureEventHub:ConnectionString"],
                                          config["AzureEventHub:EntityPath"]))
                            .As<IEventPublisherConfig>();

            var container = containerBuilder.Build();

            return container;
        }
    }

    public class SampleData
    {
        public string Message { get; set; }
        public Guid Id { get; set; }
        public DateTimeOffset DttmOffset { get; set; }
    }
}

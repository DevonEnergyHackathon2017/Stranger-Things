﻿using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using EventHubWebSocket.Infrastructure;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Hckthn.Domain.EventHubProcessor;
using EventHubWebSocket.Handlers;

namespace EventHubAPI
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            IConfigurationBuilder builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging();
            services.AddMvc();
            services.AddWebSocketManager();
            var serviceProvider = new AutofacServiceProvider(ConfigureAutoFac(services));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IServiceProvider serviceProvider)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {


                app.UseDeveloperExceptionPage();
            }

            app.UseCors("*");
            app.UseWebSockets();
            app.UseMvc(routes =>
            {
                routes.MapRoute(name: "default", template: "api/{controller}/{action}/{id}");
            });

            app.MapWebSocketHandler("/dataevent", serviceProvider.GetService<EventHubWebSocket.Handlers.DataEventHandler>());
        }

        private IContainer ConfigureAutoFac(IServiceCollection services) {
            var containerBuilder = new ContainerBuilder();
            containerBuilder.Populate(services);

            containerBuilder.RegisterType<EventHubProcessorService>().As<IEventHubProcessorService>();
            containerBuilder.Register(c =>
                                      new EventHubProcessorConfig(
                                          Configuration["AzureEventHub:ConnectionString"],
                                          Configuration["AzureEventHub:EntityPath"],
                                          Configuration["AzureStorage:ContainerName"],
                                          Configuration["AzureStorage:AccountName"],
                                          Configuration["AzureStorage:AccountKey"]))
                            .As<IEventHubProcessorConfig>();

            var container = containerBuilder.Build();

            return container;
        }
    }
}
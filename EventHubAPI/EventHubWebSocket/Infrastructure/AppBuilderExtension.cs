using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace EventHubWebSocket.Infrastructure
{
    public static class AppBuilderExtension
    {
        public static IApplicationBuilder MapWebSocketHandler(this IApplicationBuilder app, PathString path, WebsocketHandler handler)
        {
            return app.Map(path, (_app) => _app.UseMiddleware<WebsocketMiddleware>(handler));
        }

        public static IServiceCollection AddWebSocketManager(this IServiceCollection services)
        {
            services.AddTransient<WebsocketConnectionManager>();

            foreach (var type in Assembly.GetEntryAssembly().ExportedTypes)
            {
                if (type.GetTypeInfo().BaseType == typeof(WebsocketHandler))
                    services.AddSingleton(type);
            }

            return services;
        }
    }
}

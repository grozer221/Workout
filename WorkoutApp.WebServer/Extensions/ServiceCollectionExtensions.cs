using GraphQL;
using GraphQL.Server;
using GraphQL.SystemTextJson;

using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection.Extensions;

using System.Reflection;

using WorkoutApp.WebServer.DataAnotations;
using WorkoutApp.WebServer.GraphApi;
using WorkoutApp.WebServer.GraphApi.Modules.Auth;
using WorkoutApp.WebServer.Middlewares;

namespace Geesemon.Web.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInjectableServices(this IServiceCollection services)
        {
            var loadedAssemblies = AppDomain.CurrentDomain.GetAssemblies().ToList();
            var loadedPaths = loadedAssemblies.Select(a => a.Location).ToArray();
            var referencedPaths = Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory, "*.dll");
            var toLoad = referencedPaths.Where(r => !loadedPaths.Contains(r, StringComparer.InvariantCultureIgnoreCase)).ToList();
            toLoad.ForEach(path => loadedAssemblies.Add(AppDomain.CurrentDomain.Load(AssemblyName.GetAssemblyName(path))));

            var implementationTypes = loadedAssemblies
                .SelectMany(asembly => asembly.GetTypes())
                .Where(type => type.IsDefined(typeof(InjectableServiceAttribute)));

            foreach (var implementationType in implementationTypes)
            {
                var injectableServiceAttribute = implementationType.GetCustomAttribute(typeof(InjectableServiceAttribute), true) as InjectableServiceAttribute;
                var serviceType = injectableServiceAttribute.ServiceType == null ? implementationType : injectableServiceAttribute.ServiceType;
                services.TryAdd(new ServiceDescriptor(serviceType, implementationType, injectableServiceAttribute.ServiceLifetime));
            }

            return services;
        }

        public static IServiceCollection AddGraphApi(this IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddScoped<AppSchema>();
            services.AddGraphQLUpload();
            services
                 .AddGraphQL(options =>
                 {
                     options.EnableMetrics = true;
                     options.UnhandledExceptionDelegate = (context) =>
                     {
                         Console.WriteLine(context.Exception.StackTrace);
                         context.ErrorMessage = context.Exception.Message;
                     };
                 })
                 .AddSystemTextJson()
                 .AddWebSockets()
                 .AddGraphTypes(typeof(AppSchema), ServiceLifetime.Scoped)
                 .AddGraphQLAuthorization(options =>
                 {
                     options.AddPolicy(AuthPolicies.Authenticated, p => p.RequireAuthenticatedUser());
                 });

            return services;
        }

        public static IServiceCollection AddJwtAuthorization(this IServiceCollection services)
        {
            services.AddAuthorization();
            services
                 .AddAuthentication(BasicAuthenticationHandler.SchemeName)
                 .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>(BasicAuthenticationHandler.SchemeName, _ => { });
            return services;
        }
    }
}

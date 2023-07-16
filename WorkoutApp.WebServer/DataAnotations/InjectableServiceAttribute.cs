namespace WorkoutApp.WebServer.DataAnotations
{
    public class InjectableServiceAttribute : Attribute
    {
        private readonly ServiceLifetime serviceLifetime;
        private readonly Type? serviceType;

        public InjectableServiceAttribute(ServiceLifetime serviceLifetime = ServiceLifetime.Singleton, Type? serviceType = null)
        {
            this.serviceLifetime = serviceLifetime;
            this.serviceType = serviceType;
        }

        public ServiceLifetime ServiceLifetime => serviceLifetime;

        public Type? ServiceType => serviceType;
    }
}

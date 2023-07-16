using WorkoutApp.WebServer.DataAnotations;

namespace WorkoutApp.WebServer.Services;

[InjectableService(serviceType: typeof(ISettingsProvider))]
public class SettingsProvider : ISettingsProvider
{
    public string GetAuthSecurityKey()
    {
        return "11fasefoi[aenfgaergnikaernjgerg;[paerwg;oearga;perig";
    }
}

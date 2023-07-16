using System.Security.Claims;

namespace WorkoutApp.WebServer.GraphApi.Modules.Auth
{
    public class AuthClaimsIdentity : ClaimsIdentity
    {
        public const string DefaultIdClaimType = "Id";
    }
}

using System.Security.Claims;
using WorkoutApp.WebServer.GraphApi.Modules.Auth;

namespace WorkoutApp.WebServer.Extensions;

public static class ClaimExtensions
{
    public static Guid GetUserId(this IEnumerable<Claim> claims)
    {
        return new Guid(claims.First(c => c.Type == AuthClaimsIdentity.DefaultIdClaimType).Value);
    }
}

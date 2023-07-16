using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using WorkoutApp.WebServer.DataAnotations;
using WorkoutApp.WebServer.GraphApi.Modules.Auth;

namespace WorkoutApp.WebServer.Services;

[InjectableService]
public class AuthService
{
    private readonly ISettingsProvider settingsProvider;

    public AuthService(ISettingsProvider settingsProvider)
    {
        this.settingsProvider = settingsProvider;
    }

    public const string Bearer = "Bearer";

    public string GenerateAccessToken(Guid userId)
    {
        SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settingsProvider.GetAuthSecurityKey()));
        SigningCredentials signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        List<Claim> claims = new List<Claim>
        {
            new Claim(AuthClaimsIdentity.DefaultIdClaimType, userId.ToString()),
        };
        JwtSecurityToken token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddDays(30),
                signingCredentials: signingCredentials);
        return Bearer + " " + new JwtSecurityTokenHandler().WriteToken(token);
    }

    public ClaimsPrincipal ValidateAccessToken(string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(settingsProvider.GetAuthSecurityKey());
            tokenHandler.ValidateToken(CleanBearerInToken(token), new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
            }, out var validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(jwtToken.Claims, JwtBearerDefaults.AuthenticationScheme);

            return new ClaimsPrincipal(claimsIdentity);
        }
        catch
        {
            return null;
        }
    }

    public string? CleanBearerInToken(string token)
    {
        return token?.Replace(Bearer + " ", string.Empty);
    }
}

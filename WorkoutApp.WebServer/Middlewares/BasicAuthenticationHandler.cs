using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;

using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Text.Encodings.Web;

using WorkoutApp.WebServer.DataAccess;
using WorkoutApp.WebServer.Extensions;
using WorkoutApp.WebServer.Services;

namespace WorkoutApp.WebServer.Middlewares;

public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    public const string SchemeName = "SchemeName";
    private readonly SessionRepository sessionRepository;
    private readonly ISettingsProvider settingsProvider;
    private readonly AuthService authService;

    public BasicAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock,
        SessionRepository sessionRepository,
        ISettingsProvider settingsProvider,
        AuthService authService) : base(options, logger, encoder, clock)
    {
        this.sessionRepository = sessionRepository;
        this.settingsProvider = settingsProvider;
        this.authService = authService;
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        string token = Request.Headers[HeaderNames.Authorization];
        var handler = new JwtSecurityTokenHandler();
        var validations = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settingsProvider.GetAuthSecurityKey())),
            ValidateIssuer = false,
            ValidateAudience = false
        };
        try
        {
            var claimsPrincipal = handler.ValidateToken(authService.CleanBearerInToken(token), validations, out var tokenSecure);
            var userId = claimsPrincipal.Claims.GetUserId();
            var sessions = await sessionRepository.GetAsync(t => t.UserId == userId);
            if (!sessions.Any(t => t.Token == token))
                throw new Exception("Bad token");
            var ticket = new AuthenticationTicket(claimsPrincipal, new AuthenticationProperties { IsPersistent = false }, SchemeName);
            return AuthenticateResult.Success(ticket);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return AuthenticateResult.Fail(ex);
        }
    }
}

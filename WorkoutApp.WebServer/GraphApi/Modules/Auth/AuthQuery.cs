using GraphQL;
using GraphQL.Types;
using Microsoft.Net.Http.Headers;
using WorkoutApp.WebServer.DataAccess;
using WorkoutApp.WebServer.Extensions;

namespace WorkoutApp.WebServer.GraphApi.Modules.Auth
{
    public class AuthQuery : ObjectGraphType
    {
        public AuthQuery(IHttpContextAccessor httpContextAccessor, UserRepository userRepository, SessionRepository sessionRepository)
        {
            Field<NonNullGraphType<AuthResponseType>, AuthResponse>()
                .Name("Me")
                .ResolveAsync(async context =>
                {
                    var userId = httpContextAccessor.HttpContext.User.Claims.GetUserId();
                    return new AuthResponse()
                    {
                        Token = httpContextAccessor.HttpContext.Request.Headers[HeaderNames.Authorization],
                        User = await userRepository.GetByIdAsync(userId),
                    };
                })
                .AuthorizeWith(AuthPolicies.Authenticated);

            //Field<NonNullGraphType<ListGraphType<SessionType>>, IEnumerable<Session>>()
            //    .Name("GetSessions")
            //    .ResolveAsync(async context =>
            //    {
            //        var userId = httpContextAccessor.HttpContext.User.Claims.GetUserId();
            //        return await sessionRepository.GetAsync(s => s.UserId == userId);
            //    })
            //    .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}

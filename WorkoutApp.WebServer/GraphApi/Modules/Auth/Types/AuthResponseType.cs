using GraphQL.Types;
using WorkoutApp.WebServer.Business;
using WorkoutApp.WebServer.GraphApi.Modules.Users;

namespace WorkoutApp.WebServer.GraphApi.Modules.Auth;

public class AuthResponseType : ObjectGraphType<AuthResponse>
{
    public AuthResponseType()
    {
        Field<NonNullGraphType<UserType>, User>()
            .Name(nameof(AuthResponse.User))
            .Resolve(context => context.Source.User);

        Field<NonNullGraphType<StringGraphType>, string>()
            .Name(nameof(AuthResponse.Token))
            .Resolve(context => context.Source.Token);
    }
}

public class AuthResponse
{
    public User User { get; set; }

    public string Token { get; set; }
}

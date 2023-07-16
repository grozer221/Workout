using GraphQL.Types;

using System.ComponentModel.DataAnnotations;

namespace WorkoutApp.WebServer.GraphApi.Modules.Auth;

public class AuthLoginInputType : InputObjectGraphType<AuthLoginInput>
{
    public AuthLoginInputType()
    {
        Field<NonNullGraphType<StringGraphType>, string>()
           .Name(nameof(AuthLoginInput.Email))
           .Resolve(context => context.Source.Email);

        Field<NonNullGraphType<StringGraphType>, string>()
           .Name(nameof(AuthLoginInput.Password))
           .Resolve(context => context.Source.Password);
    }
}

public class AuthLoginInput
{
    [EmailAddress]
    public string Email { get; set; }

    public string Password { get; set; }
}

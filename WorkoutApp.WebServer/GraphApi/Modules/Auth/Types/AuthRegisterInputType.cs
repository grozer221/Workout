using GraphQL.Types;

using System.ComponentModel.DataAnnotations;

namespace WorkoutApp.WebServer.GraphApi.Modules.Auth;

public class AuthRegisterInputType : InputObjectGraphType<AuthRegisterInput>
{
    public AuthRegisterInputType()
    {
        Field<NonNullGraphType<StringGraphType>, string>()
           .Name(nameof(AuthRegisterInput.Email))
           .Resolve(context => context.Source.Email);

        Field<NonNullGraphType<StringGraphType>, string>()
           .Name(nameof(AuthRegisterInput.Password))
           .Resolve(context => context.Source.Password);

        Field<NonNullGraphType<StringGraphType>, string>()
           .Name(nameof(AuthRegisterInput.FirstName))
           .Resolve(context => context.Source.FirstName);

        Field<NonNullGraphType<StringGraphType>, string?>()
           .Name(nameof(AuthRegisterInput.LastName))
           .Resolve(context => context.Source.LastName);
    }
}

public class AuthRegisterInput
{
    [EmailAddress]
    public string Email { get; set; }

    [MinLength(3)]
    public string Password { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }
}

using GraphQL.Types;
using WorkoutApp.WebServer.Business;

namespace WorkoutApp.WebServer.GraphApi.Modules.Users
{
    public class UserType : BaseModelType<User>
    {
        public UserType()
        {
            Field<NonNullGraphType<StringGraphType>, string>()
               .Name("FirstName")
               .Resolve(context => context.Source.FirstName);

            Field<StringGraphType, string?>()
               .Name("LastName")
               .Resolve(context => context.Source.LastName);

            Field<NonNullGraphType<StringGraphType>, string>()
               .Name("FullName")
               .Resolve(context => context.Source.FullName);

            Field<StringGraphType, string?>()
               .Name("Email")
               .Resolve(context => context.Source.Email);

            Field<DateTimeGraphType, DateTime?>()
               .Name("DateOfBirth")
               .Resolve(context => context.Source.DateOfBirth);
        }
    }
}

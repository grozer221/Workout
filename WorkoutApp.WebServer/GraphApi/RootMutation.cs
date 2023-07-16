using GraphQL.Types;
using WorkoutApp.WebServer.Extensions;
using WorkoutApp.WebServer.GraphApi.Modules.Auth;

namespace WorkoutApp.WebServer.GraphApi
{
    public class RootMutation : ObjectGraphType
    {
        public RootMutation()
        {
            Field<AuthMutation>()
                .Name("Auth")
                .Resolve();
        }

    }
}

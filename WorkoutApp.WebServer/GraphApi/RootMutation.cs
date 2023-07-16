using GraphQL;
using GraphQL.Types;

using WorkoutApp.WebServer.Extensions;
using WorkoutApp.WebServer.GraphApi.Modules.Auth;
using WorkoutApp.WebServer.GraphApi.Modules.Workouts;

namespace WorkoutApp.WebServer.GraphApi
{
    public class RootMutation : ObjectGraphType
    {
        public RootMutation()
        {
            Field<AuthMutation>()
                .Name("Auth")
                .Resolve();

            Field<WorkoutMutation>()
                .Name("Workout")
                .Resolve()
                .AuthorizeWith(AuthPolicies.Authenticated);
        }

    }
}

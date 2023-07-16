using GraphQL;
using GraphQL.Types;

using WorkoutApp.WebServer.Extensions;
using WorkoutApp.WebServer.GraphApi.Modules.AppTexts;
using WorkoutApp.WebServer.GraphApi.Modules.Auth;
using WorkoutApp.WebServer.GraphApi.Modules.Workouts;

namespace WorkoutApp.WebServer.GraphApi
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery()
        {
            Field<AuthQuery>()
                .Name("Auth")
                .Resolve();

            Field<AppTextsQuery>()
                .Name("AppTexts")
                .Resolve();

            Field<WorkoutQuery>()
                .Name("Workout")
                .Resolve()
                .AuthorizeWith(AuthPolicies.Authenticated);
        }
    }
}

using GraphQL.Types;

using WorkoutApp.WebServer.Extensions;
using WorkoutApp.WebServer.GraphApi.Modules.AppTexts;
using WorkoutApp.WebServer.GraphApi.Modules.Auth;

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
        }

    }
}

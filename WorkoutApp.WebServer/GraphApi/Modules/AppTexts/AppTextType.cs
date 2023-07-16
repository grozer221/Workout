using GraphQL.Types;

namespace WorkoutApp.WebServer.GraphApi.Modules.AppTexts
{
    public class AppTextType : ObjectGraphType<AppText>
    {
        public AppTextType()
        {
            Field<NonNullGraphType<StringGraphType>, string>()
                .Name("Key")
                .Resolve(context => context.Source.Key);

            Field<NonNullGraphType<StringGraphType>, string?>()
                .Name("Value")
                .Resolve(context => context.Source.Value);
        }
    }
}

using GraphQL.Builders;

namespace WorkoutApp.WebServer.Extensions
{
    public static class FieldBuilderExtensions
    {
        public static FieldBuilder<TSourceType, object> Resolve<TSourceType>(this FieldBuilder<TSourceType, object> fieldBuilder)
            => fieldBuilder.Resolve(_ =>
            {
                return new { };
            });
    }
}

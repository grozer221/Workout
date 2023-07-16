using GraphQL.Language.AST;
using GraphQL.Types;

namespace WorkoutApp.WebServer.GraphApi.Common
{
    public class EmptyResultType : ScalarGraphType
    {
        public EmptyResultType()
        {
            Name = "EmptyResult";
            Description = "Empty result.";
        }

        public override object ParseLiteral(IValue value) => ParseValue(value.Value);

        public override object ParseValue(object value)
            => throw new NotSupportedException($"{Name} type is not supported as input field.");

        public override object Serialize(object value) => Result.Empty;
    }

    public static class Result
    {
        public static readonly object Empty = new { };
        public static readonly object Ignored = new { };
    }
}

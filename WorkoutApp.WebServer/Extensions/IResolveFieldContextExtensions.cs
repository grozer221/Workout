using GraphQL;

using System.ComponentModel.DataAnnotations;

namespace WorkoutApp.WebServer.Extensions
{
    public static class IResolveFieldContextExtensions
    {
        public static T GetAndValidateArgument<T>(this IResolveFieldContext context, string name)
        {
            var argument = context.GetArgument<T>(name);
            var vc = new ValidationContext(argument);
            var results = new List<ValidationResult>();
            bool isValid = Validator.TryValidateObject(argument, vc, results, true);

            if (!isValid)
            {
                for (int i = 0; i < results.Count - 1; i++)
                    context.Errors.Add(new ExecutionError(results[i].ErrorMessage));
                throw new ExecutionError(results[results.Count - 1].ErrorMessage);
            }

            return argument;
        }
    }
}

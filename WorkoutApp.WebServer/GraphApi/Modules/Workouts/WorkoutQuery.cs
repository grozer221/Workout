using GraphQL.Types;

using WorkoutApp.WebServer.Business.Models;
using WorkoutApp.WebServer.DataAccess;
using WorkoutApp.WebServer.Extensions;

namespace WorkoutApp.WebServer.GraphApi.Modules.Workouts
{
    public class WorkoutQuery : ObjectGraphType
    {
        public WorkoutQuery(WorkoutRepository workoutRepository, IHttpContextAccessor httpContextAccessor)
        {
            Field<NonNullGraphType<ListGraphType<WorkoutType>>, IEnumerable<Workout>>()
                .Name("List")
                .ResolveAsync(async context =>
                {
                    var userId = httpContextAccessor.HttpContext.User.Claims.GetUserId();
                    return await workoutRepository.GetOrderedAsync(w => w.UserId == userId);
                });

            Field<NonNullGraphType<WorkoutType>, Workout>()
                .Name("Item")
                .Argument<NonNullGraphType<GuidGraphType>, Guid>("id", "")
                .ResolveAsync(async context =>
                {
                    var id = context.GetAndValidateArgument<Guid>("id");
                    var userId = httpContextAccessor.HttpContext.User.Claims.GetUserId();
                    var workout = await workoutRepository.GetSingleAsync(w => w.Id == id && w.UserId == userId);

                    if (workout == null)
                        throw new Exception($"Workout with ID {id} does not exists");

                    return workout;
                });
        }
    }
}

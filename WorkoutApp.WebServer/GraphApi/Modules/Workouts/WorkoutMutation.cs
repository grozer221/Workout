using GraphQL;
using GraphQL.Types;

using WorkoutApp.WebServer.Business.Models;
using WorkoutApp.WebServer.DataAccess;
using WorkoutApp.WebServer.Extensions;

namespace WorkoutApp.WebServer.GraphApi.Modules.Workouts
{
    public class WorkoutMutation : ObjectGraphType
    {
        public WorkoutMutation(WorkoutRepository workoutRepository, IHttpContextAccessor httpContextAccessor)
        {
            Field<NonNullGraphType<WorkoutType>, Workout>()
                .Name("Create")
                .Argument<NonNullGraphType<WorkoutInputType>, WorkoutInput>("input", "")
                .ResolveAsync(async context =>
                {
                    var input = context.GetAndValidateArgument<WorkoutInput>("input");
                    var userId = httpContextAccessor.HttpContext.User.Claims.GetUserId();

                    var workout = new Workout { UserId = userId };

                    if (input.DateStart.HasValue)
                        workout.DateStart = input.DateStart.Value;
                    if (input.DateEnd.HasValue)
                        workout.DateEnd = input.DateEnd.Value;

                    return await workoutRepository.CreateAsync(workout);
                });

            Field<NonNullGraphType<WorkoutType>, Workout>()
                .Name("Edit")
                .Argument<NonNullGraphType<GuidGraphType>, Guid>("id", "")
                .Argument<NonNullGraphType<WorkoutInputType>, WorkoutInput>("input", "")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<Guid>("id");
                    var input = context.GetAndValidateArgument<WorkoutInput>("input");
                    var userId = httpContextAccessor.HttpContext.User.Claims.GetUserId();

                    var workout = await workoutRepository.GetSingleAsync(w => w.Id == id && w.UserId == userId);
                    if (workout == null)
                        throw new Exception($"Workout with ID {id} does not exists");

                    if (input.DateStart.HasValue)
                        workout.DateStart = input.DateStart.Value;
                    if (input.DateEnd.HasValue)
                        workout.DateEnd = input.DateEnd.Value;

                    await workoutRepository.UpdateAsync(workout);

                    return workout;
                });
        }
    }
}

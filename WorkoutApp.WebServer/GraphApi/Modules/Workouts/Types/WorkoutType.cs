using GraphQL.Types;

using WorkoutApp.WebServer.Business.Models;

namespace WorkoutApp.WebServer.GraphApi.Modules.Workouts
{
    public class WorkoutType : BaseModelType<Workout>
    {
        public WorkoutType()
        {
            Field<NonNullGraphType<DateTimeGraphType>, DateTime>()
                .Name(nameof(Workout.DateStart))
                .Resolve(context => context.Source.DateStart);

            Field<DateTimeGraphType, DateTime?>()
                .Name(nameof(Workout.DateEnd))
                .Resolve(context => context.Source.DateEnd);
        }
    }
}

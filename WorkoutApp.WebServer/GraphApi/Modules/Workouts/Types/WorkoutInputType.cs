using GraphQL.Types;

namespace WorkoutApp.WebServer.GraphApi.Modules.Workouts
{
    public class WorkoutInputType : InputObjectGraphType<WorkoutInput>
    {
        public WorkoutInputType()
        {
            Field<DateTimeGraphType, DateTime?>()
               .Name(nameof(WorkoutInput.DateStart))
               .Resolve(context => context.Source.DateStart);

            Field<DateTimeGraphType, DateTime?>()
               .Name(nameof(WorkoutInput.DateEnd))
               .Resolve(context => context.Source.DateEnd);
        }
    }
    public class WorkoutInput
    {
        public DateTime? DateStart { get; set; }

        public DateTime? DateEnd { get; set; }
    }
}

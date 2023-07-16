using GraphQL.Types;
using WorkoutApp.WebServer.Business;

namespace WorkoutApp.WebServer.GraphApi
{
    public abstract class BaseModelType<T> : ObjectGraphType<T> where T : BaseModel
    {
        public BaseModelType()
        {
            Field<NonNullGraphType<IdGraphType>, Guid>()
               .Name(nameof(BaseModel.Id))
               .Resolve(context => context.Source.Id);

            Field<NonNullGraphType<DateTimeGraphType>, DateTime>()
               .Name(nameof(BaseModel.CreatedAt))
               .Resolve(context => context.Source.CreatedAt);

            Field<NonNullGraphType<DateTimeGraphType>, DateTime>()
               .Name(nameof(BaseModel.UpdatedAt))
               .Resolve(context => context.Source.UpdatedAt);
        }
    }
}

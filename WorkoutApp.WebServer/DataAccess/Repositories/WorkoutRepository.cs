using Microsoft.EntityFrameworkCore;

using System.Linq.Expressions;

using WorkoutApp.WebServer.Business.Models;
using WorkoutApp.WebServer.DataAnotations;

namespace WorkoutApp.WebServer.DataAccess;

[InjectableService(ServiceLifetime.Scoped)]
public class WorkoutRepository : BaseRepository<Workout>
{
    public WorkoutRepository(AppDbContext context) : base(context)
    {
    }

    public Task<List<Workout>> GetOrderedAsync(Expression<Func<Workout, bool>> condition)
    {
        return context.Workouts
            .Where(condition)
            .OrderByDescending(w => w.DateStart)
            .ToListAsync();
    }
}

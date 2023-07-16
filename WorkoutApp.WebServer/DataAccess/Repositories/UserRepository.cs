using WorkoutApp.WebServer.Business;
using WorkoutApp.WebServer.DataAnotations;

namespace WorkoutApp.WebServer.DataAccess;

[InjectableService(ServiceLifetime.Scoped)]
public class UserRepository : BaseRepository<User>
{
    public UserRepository(AppDbContext context) : base(context)
    {
    }

    public Task<User> GetByEmailAsync(string email)
    {
        return GetSingleAsync(user => user.Email == email);
    }
}

using Microsoft.EntityFrameworkCore;

using WorkoutApp.WebServer.Business;
using WorkoutApp.WebServer.DataAnotations;

namespace WorkoutApp.WebServer.DataAccess;

[InjectableService(ServiceLifetime.Scoped)]
public class SessionRepository : BaseRepository<Session>
{
    public SessionRepository(AppDbContext context) : base(context)
    {
    }

    public Task<Session?> GetByTokenAsync(string token)
    {
        return context.Sessions.SingleOrDefaultAsync(s => s.Token == token);
    }

    public async Task RemoveAllForUserAsync(Guid userId)
    {
        var tokens = await GetAsync(t => t.UserId == userId);
        foreach (var token in tokens)
            context.Sessions.Remove(token);
        await context.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid userId, string token)
    {
        var tokens = await GetAsync(t => t.UserId == userId && t.Token == token);
        foreach (var t in tokens)
            context.Sessions.Remove(t);
        await context.SaveChangesAsync();
    }
}

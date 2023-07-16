using Geesemon.Web.Extensions;

using Microsoft.EntityFrameworkCore;

using WorkoutApp.WebServer.DataAccess;
using WorkoutApp.WebServer.GraphApi;
using WorkoutApp.WebServer.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddInjectableServices();
builder.Services.AddJwtAuthorization();
builder.Services.AddGraphApi();
builder.Services.AddDbContext<AppDbContext>((options) =>
{
    options.UseSqlServer(AppDbContext.DefaultConnectionString);
});

var app = builder.Build();

app.UseMiddleware<RequestLoggingMiddleware>();

//app.UseRouting();

app.UseAuthentication();

app.UseWebSockets();
app.UseGraphQLUpload<AppSchema>()
    .UseGraphQL<AppSchema>();
app.UseGraphQLAltair();

app.Run();

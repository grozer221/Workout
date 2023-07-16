namespace WorkoutApp.WebServer.Business;

public class Session : BaseModel
{
    public string Token { get; set; }

    public Guid UserId { get; set; }

    public User User { get; set; }
}

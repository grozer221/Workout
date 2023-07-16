namespace WorkoutApp.WebServer.Business.Models
{
    public class Workout : BaseModel
    {
        public DateTime DateStart { get; set; }

        public DateTime? DateEnd { get; set; }

        public Guid UserId { get; set; }

        public User User { get; set; }
    }
}

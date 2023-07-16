using System.ComponentModel.DataAnnotations.Schema;

namespace WorkoutApp.WebServer.Business
{
    public class User : BaseModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [NotMapped]
        public string FullName { get => $"{FirstName} {LastName}"; }

        public string? Email { get; set; }

        public bool IsEmailConfirmed { get; set; }

        public string Password { get; set; }

        public DateTime? DateOfBirth { get; set; }
    }

}

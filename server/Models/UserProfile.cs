using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class UserProfile
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string UserEmail { get; set; }

    public string? FullName { get; set; }
    public string? Bio { get; set; }
    public string? Location { get; set; }
    public string? Website { get; set; }
    public string? Phone { get; set; }
    public string? Company { get; set; }
    public string? JobTitle { get; set; }
    public string? Education { get; set; }
    public string? Experience { get; set; }
    public string? Skills { get; set; }
    
    // Storing as JSON strings for simplicity in this schema
    public string? Languages { get; set; }
    public string? Specialties { get; set; }
    
    // Social Links
    public string? LinkedIn { get; set; }
    public string? Twitter { get; set; }
    public string? GitHub { get; set; }
    public string? ProfilePicture { get; set; }
}

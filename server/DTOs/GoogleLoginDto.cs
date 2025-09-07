using System.ComponentModel.DataAnnotations;

namespace server.DTOs;

public class GoogleLoginDto
{
    [Required, MinLength(3)]
    public string Username { get; set; }
    [Required, EmailAddress]
    public string Email { get; set; }
    [Required]
    public string PictureUrl { get; set; }
    [Required]
    public string GoogleId { get; set; }
    // Optional: If you want to include password for some reaso
    // [Required, MinLength(6)]
    // public string Password { get; set; }
}
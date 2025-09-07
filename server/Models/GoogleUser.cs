using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
namespace server.Models;

public class GoogleUser
{
    [Key]
    [Column("UserId")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required, MinLength(3), NotNull]
    public string Username { get; set; }

    [Required, EmailAddress, NotNull]
    public string Email { get; set; }

    // [Required, NotNull]
    // public string PasswordHash { get; set; }

    [Required, NotNull]
    public string PictureUrl { get; set; }

    [Required, NotNull]
    public string GoogleId { get; set; }
}
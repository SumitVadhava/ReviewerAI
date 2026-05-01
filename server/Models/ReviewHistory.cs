using System;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class ReviewHistory
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserEmail { get; set; } = string.Empty;

        [Required]
        public string Filename { get; set; } = string.Empty;

        public string Categories { get; set; } = "[]"; // Store as JSON string

        public string Model { get; set; } = string.Empty;

        [Required]
        public string ReviewContent { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

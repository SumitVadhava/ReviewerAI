using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.DTOs;
using System.Text.Json;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HistoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HistoryController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetHistory(string email)
        {
            var history = await _context.ReviewHistories
                .Where(h => h.UserEmail == email)
                .OrderByDescending(h => h.CreatedAt)
                .Select(h => new ReviewHistoryDto
                {
                    Filename = h.Filename,
                    Categories = JsonSerializer.Deserialize<string[]>(h.Categories, (JsonSerializerOptions)null) ?? new string[0],
                    Model = h.Model,
                    ReviewContent = h.ReviewContent,
                    CreatedAt = h.CreatedAt
                })
                .ToListAsync();

            return Ok(history);
        }

        [HttpPost]
        public async Task<IActionResult> SaveHistory([FromBody] SaveReviewDto dto)
        {
            if (string.IsNullOrEmpty(dto.UserEmail)) return BadRequest("User email is required.");

            var history = new ReviewHistory
            {
                UserEmail = dto.UserEmail,
                Filename = dto.Filename,
                Categories = JsonSerializer.Serialize(dto.Categories),
                Model = dto.Model,
                ReviewContent = dto.ReviewContent,
                CreatedAt = DateTime.UtcNow
            };

            _context.ReviewHistories.Add(history);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Review saved to history." });
        }
    }
}

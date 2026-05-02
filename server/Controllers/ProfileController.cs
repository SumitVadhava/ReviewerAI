using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.DTOs;
[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<ProfileController> _logger;

    public ProfileController(AppDbContext context, ILogger<ProfileController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet("{email}")]
    public async Task<IActionResult> GetProfile(string email)
    {
        try
        {
            var profile = await _context.UserProfiles.FirstOrDefaultAsync(p => p.UserEmail == email);
            if (profile == null)
            {
                return NotFound(new { message = "Profile not found" });
            }
            return Ok(profile);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching profile for {Email}", email);
            return StatusCode(500, new { message = "Internal server error", detail = ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> UpdateProfile([FromBody] ProfileDto profileDto)
    {
        if (profileDto == null || string.IsNullOrEmpty(profileDto.UserEmail))
        {
            return BadRequest(new { message = "Invalid profile data or Email is missing" });
        }

        try
        {
            var existingProfile = await _context.UserProfiles.FirstOrDefaultAsync(p => p.UserEmail == profileDto.UserEmail);

            if (existingProfile == null)
            {
                var newProfile = new UserProfile
                {
                    UserEmail = profileDto.UserEmail,
                    FullName = profileDto.FullName,
                    Bio = profileDto.Bio,
                    Location = profileDto.Location,
                    Website = profileDto.Website,
                    Phone = profileDto.Phone,
                    Company = profileDto.Company,
                    JobTitle = profileDto.JobTitle,
                    Education = profileDto.Education,
                    Experience = profileDto.Experience,
                    Skills = profileDto.Skills,
                    Languages = profileDto.Languages,
                    Specialties = profileDto.Specialties,
                    LinkedIn = profileDto.LinkedIn,
                    Twitter = profileDto.Twitter,
                    GitHub = profileDto.GitHub,
                    ProfilePicture = profileDto.ProfilePicture
                };
                _context.UserProfiles.Add(newProfile);
            }
            else
            {
                // Update fields
                existingProfile.FullName = profileDto.FullName;
                existingProfile.Bio = profileDto.Bio;
                existingProfile.Location = profileDto.Location;
                existingProfile.Website = profileDto.Website;
                existingProfile.Phone = profileDto.Phone;
                existingProfile.Company = profileDto.Company;
                existingProfile.JobTitle = profileDto.JobTitle;
                existingProfile.Education = profileDto.Education;
                existingProfile.Experience = profileDto.Experience;
                existingProfile.Skills = profileDto.Skills;
                existingProfile.Languages = profileDto.Languages;
                existingProfile.Specialties = profileDto.Specialties;
                existingProfile.LinkedIn = profileDto.LinkedIn;
                existingProfile.Twitter = profileDto.Twitter;
                existingProfile.GitHub = profileDto.GitHub;
                existingProfile.ProfilePicture = profileDto.ProfilePicture;

                _context.UserProfiles.Update(existingProfile);
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Profile updated successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating profile for {Email}", profileDto.UserEmail);
            return StatusCode(500, new { message = "Internal server error", detail = ex.Message });
        }
    }
}

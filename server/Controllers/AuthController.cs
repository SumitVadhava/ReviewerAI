using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.DTOs;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly JwtService _jwtService;

    public AuthController(AppDbContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            return BadRequest(new { message = "Email already exists" });

        var user = new User
        {
            Username = dto.Username,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var token = _jwtService.GenerateToken(user, null);
        return Ok(new { message = "Signup successfully", token, user = new { id = user.Id, username = user.Username, email = user.Email } });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized(new { message = "Invalid credentials" });

        var token = _jwtService.GenerateToken(user, null);
        return Ok(new { message = "Login successfully", token, user = new { id = user.Id, username = user.Username, email = user.Email } });
    }


    [HttpPost("googleLogin")]
    public async Task<IActionResult> GoogleLogin(GoogleLoginDto dto)
    {
        var existingUser = await _context.GoogleUsers.FirstOrDefaultAsync(u => u.GoogleId == dto.GoogleId);
        
        if (existingUser != null)
        {
            var token = _jwtService.GenerateToken(null, existingUser);
            return Ok(new { message = "Login successfully", token, user = new { id = existingUser.Id, username = existingUser.Username, email = existingUser.Email, pictureUrl = existingUser.PictureUrl } });         
        }

        var googleUser = new GoogleUser
        {
            Username = dto.Username,
            Email = dto.Email,
            PictureUrl = dto.PictureUrl,
            GoogleId = dto.GoogleId
        };

        _context.GoogleUsers.Add(googleUser);
        await _context.SaveChangesAsync();

        var newToken = _jwtService.GenerateToken(null, googleUser);
        return Ok(new { message = "Login successfully", token = newToken, user = new { id = googleUser.Id, username = googleUser.Username, email = googleUser.Email, pictureUrl = googleUser.PictureUrl } });
    }
}
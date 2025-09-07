using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.DTOs;
using server.Services;
using BCrypt.Net;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
 public class AuthController : Controller
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
            return Json(new { message = "Email already exists" });

        var user = new User
        {
            Username = dto.Username,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var token = _jwtService.GenerateToken(user, null);
        return Json(new { message = "Signup successfully", token,user = new {UserId =  user.Id, Username = user.Username, Email = user.Email } });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Json(new { message = "Invalid credentials" });

        var token = _jwtService.GenerateToken(user, null);
        return Json(new { message = "Login successfully", token, user = new { UserId = user.Id, Username = user.Username, Email = user.Email } });
    }


    [HttpPost("googleLogin")]
    public async Task<IActionResult> GoogleLogin(GoogleLoginDto dto)
    {
        if (await _context.GoogleUsers.AnyAsync(u => u.GoogleId == dto.GoogleId))
        {
            var googleUser1 = new GoogleUser
            {
                Username = dto.Username,
                Email = dto.Email,
                PictureUrl = dto.PictureUrl,
                GoogleId = dto.GoogleId
            };
            var token1 = _jwtService.GenerateToken(null, googleUser1);
            return Json(new { message = "Email already exists", token1, user = new { dto.GoogleId, dto.Username, dto.Email, dto.PictureUrl } });         
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

            var token = _jwtService.GenerateToken(null, googleUser);
            return Json(new { message = "Login successfully", token, user = new { googleUser.Id, googleUser.Username, googleUser.Email, googleUser.PictureUrl } });
            // return Json(new { message = "Signup successfully", user = new { user.Id, user.Username, user.Email } });
        }
    }
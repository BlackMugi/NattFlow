using Microsoft.AspNetCore.Mvc;
using NattFlow.DTOs.Auth;
using NattFlow.Services.Interfaces;

namespace NattFlow.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDTO dto)
    {
        try
        {
            var result = await authService.LoginAsync(dto);
            return Ok(result);
        }
        catch (UnauthorizedAccessException)
        {
            return Unauthorized(new { message = "Email ou mot de passe incorrect." });
        }
       
    }
}
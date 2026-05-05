using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NattFlow.DTOs.User;
using NattFlow.Services.Interfaces;

namespace NattFlow.Controllers;

[ApiController]
[Route("api/users")]
[Authorize]
public class UsersController(IUserService userService) : ControllerBase
{
    [HttpGet]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        => Ok(await userService.GetAllAsync(page, pageSize));

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
        => Ok(await userService.GetByIdAsync(id));

    [HttpPost]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Create([FromBody] UserCreateDTO dto)
    {
        var created = await userService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.IdUser }, created);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Update(int id, [FromBody] UserCreateDTO dto)
        => Ok(await userService.UpdateAsync(id, dto));

    [HttpDelete("{id}")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Delete(int id)
    {
        await userService.DeleteAsync(id);
        return NoContent();
    }
}
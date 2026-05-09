using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NattFlow.DTOs.Notification;
using NattFlow.Services.Interfaces;

namespace NattFlow.Controllers
{
    [ApiController]
    [Route("api/notifications")]
    [Authorize]
    public class NotificationController(INotificationService notificationService) : ControllerBase
    {
        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetAll()
            => Ok(await notificationService.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
            => Ok(await notificationService.GetByIdAsync(id));

        [HttpGet("user/{idUser}")]
        public async Task<IActionResult> GetByUserId(int idUser)
            => Ok(await notificationService.GetByUserIdAsync(idUser));

        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Create([FromBody] NotificationCreateDTO dto)
        {
            var created = await notificationService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.IdNotification }, created);
        }

        [HttpPut("{id}/lu")]
        public async Task<IActionResult> MarquerCommeLu(int id)
            => Ok(await notificationService.MarquerCommeLuAsync(id));

        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Delete(int id)
        {
            await notificationService.DeleteAsync(id);
            return NoContent();
        }
    }
}
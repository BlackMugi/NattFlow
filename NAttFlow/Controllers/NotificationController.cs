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
        //Get
        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetAll()
            => Ok(await notificationService.GetAllAsync());

        //Get{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
            => Ok(await notificationService.GetByIdAsync(id));

        //Get(user/{idUser})
        [HttpGet("user/{idUser}")]
        public async Task<IActionResult> GetByUserId(int idUser)
            => Ok(await notificationService.GetByUserIdAsync(idUser));


        //Post
        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Create([FromBody] NotificationCreateDTO dto)
        {
            var created = await notificationService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.IdNotification }, created);
        }

        //Put({id}/lu)
        [HttpPut("{id}/lu")]
        public async Task<IActionResult> MarquerCommeLu(int id)
            => Ok(await notificationService.MarquerCommeLuAsync(id));


        //Delete{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Delete(int id)
        {
            await notificationService.DeleteAsync(id);
            return NoContent();
        }

        //pour envoyer à tous 
        [HttpPost("broadcast")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Broadcast([FromBody] BroadcastNotificationDTO dto)
        {
            await notificationService.BroadcastAsync(dto);
            return NoContent();
        }
    }
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NattFlow.DTOs.Paiement;
using NattFlow.Services.Interfaces;

namespace NattFlow.Controllers
{
    [ApiController]
    [Route("api/paiements")]
    [Authorize]
    public class PaiementController(IPaiementService paiementService) : ControllerBase
    {
        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetAll()
            => Ok(await paiementService.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
            => Ok(await paiementService.GetByIdAsync(id));

        [HttpGet("user/{idUser}")]
        public async Task<IActionResult> GetByUserId(int idUser)
            => Ok(await paiementService.GetByUserIdAsync(idUser));

        [HttpGet("cotisation/{idCotisation}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetByCotisationId(int idCotisation)
            => Ok(await paiementService.GetByCotisationIdAsync(idCotisation));

        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Create([FromBody] PaiementCreateDTO dto)
        {
            var created = await paiementService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.IdPaiement }, created);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Update(int id, [FromBody] PaiementCreateDTO dto)
            => Ok(await paiementService.UpdateAsync(id, dto));

        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Delete(int id)
        {
            await paiementService.DeleteAsync(id);
            return NoContent();
        }
    }
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NattFlow.DTOs.Cotisation;
using NattFlow.Services.Interfaces;

namespace NattFlow.Controllers
{
    [ApiController]
    [Route("api/cotisations")]
    [Authorize]
    public class CotisationController(ICotisationService cotisationService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
            => Ok(await cotisationService.GetAllAsync(page, pageSize));

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
            => Ok(await cotisationService.GetByIdAsync(id));

        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Create([FromBody] CotisationCreateDTO dto)
        {
            var created = await cotisationService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.IdCotisation }, created);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Update(int id, [FromBody] CotisationCreateDTO dto)
            => Ok(await cotisationService.UpdateAsync(id, dto));

        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Delete(int id)
        {
            await cotisationService.DeleteAsync(id);
            return NoContent();
        }
    }
}
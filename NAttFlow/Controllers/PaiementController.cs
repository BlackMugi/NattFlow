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
        //Get
        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
            => Ok(await paiementService.GetAllAsync(page, pageSize));

        //Get{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
            => Ok(await paiementService.GetByIdAsync(id));

        //Get(user/{idUser})
        [HttpGet("user/{idUser}")]
        public async Task<IActionResult> GetByUserId(int idUser, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
            => Ok(await paiementService.GetByUserIdAsync(idUser, page, pageSize));


        //Get(cotisation/{idCotisation})
        [HttpGet("cotisation/{idCotisation}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetByCotisationId(int idCotisation, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
            => Ok(await paiementService.GetByCotisationIdAsync(idCotisation, page, pageSize));
        //Membre initie un paiement
        [HttpPost("initier")]
        public async Task<IActionResult> Initier([FromBody] PaiementInitierDTO dto)
        {
            var created = await paiementService.InitierAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.IdPaiement }, created);
        }

        //Admin valide
        [HttpPut("{id}/valider")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Valider(int id)
            => Ok(await paiementService.ValiderAsync(id));

        //Admin rejette
        [HttpPut("{id}/rejeter")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Rejeter(int id)
            => Ok(await paiementService.RejeterAsync(id));

        //Post
        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Create([FromBody] PaiementCreateDTO dto)
        {
            var created = await paiementService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.IdPaiement }, created);
        }

        //Put{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Update(int id, [FromBody] PaiementCreateDTO dto)
            => Ok(await paiementService.UpdateAsync(id, dto));

        //Delete{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Delete(int id)
        {
            await paiementService.DeleteAsync(id);
            return NoContent();
        }

        
    }
}
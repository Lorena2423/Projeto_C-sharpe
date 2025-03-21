using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sistema_processos.Data;
using Sistema_processos.Models;

namespace Sistema_processos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcessoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProcessoesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Processoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Processo>>> GetProcessos()
        {
            return await _context.Processos.ToListAsync();
        }

        // GET: api/Processoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Processo>> GetProcesso(int id)
        {
            var processo = await _context.Processos.FindAsync(id);

            if (processo == null)
            {
                return NotFound();
            }

            return processo;
        }

        // PUT: api/Processoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProcesso(int id, Processo processo)
        {
            if (id != processo.Id)
            {
                return BadRequest();
            }

            _context.Entry(processo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProcessoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Processoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Processo>> PostProcesso(Processo processo)
        {
            _context.Processos.Add(processo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProcesso", new { id = processo.Id }, processo);
        }

        // DELETE: api/Processoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProcesso(int id)
        {
            var processo = await _context.Processos.FindAsync(id);
            if (processo == null)
            {
                return NotFound();
            }

            _context.Processos.Remove(processo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProcessoExists(int id)
        {
            return _context.Processos.Any(e => e.Id == id);
        }
    }
}

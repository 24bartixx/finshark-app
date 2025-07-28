using backend.Data;
using backend.Dtos.Stock;
using backend.Interfaces;
using backend.Mappers;
using backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IStockRepository _stockRepo;

        public StockController(ApplicationDBContext context, IStockRepository stockRepo)
        {
            _context = context;
            _stockRepo = stockRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var stocks = await _stockRepo.GetAllAsync();
            var stockss = stocks.Select(stock => stock.ToStockDto());

            return Ok(stocks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var stock = await _stockRepo.GetByIdAsync(id);

            if (stock == null)
            {
                return NotFound();
            }
            return Ok(stock.ToStockDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockDto stockDto)
        {
            Stock stock = stockDto.ToStockFromCreateStockDto();
            await _stockRepo.CreateAsync(stock);
            return CreatedAtAction(nameof(GetById), new { ID = stock.Id }, stock.ToStockDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockDto updateStockDto)
        {
            var stock = await _stockRepo.UpdateAsync(id, updateStockDto);

            if (stock == null)
            {
                return NotFound();
            }

            return Ok(stock.ToStockDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await _stockRepo.DeleteAsync(id);

            return NoContent();
        }
    }
}
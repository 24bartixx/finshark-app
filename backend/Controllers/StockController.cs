using backend.Data;
using backend.Dtos.Stock;
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

        public StockController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var stocks = _context.Stocks.ToList().Select(stock => stock.ToStockDto());
            return Ok(stocks);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var stock = _context.Stocks.Find(id);

            if (stock == null)
            {
                return NotFound();
            }
            return Ok(stock.ToStockDto());
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateStockDto stockDto)
        {
            Stock stock = stockDto.ToStockFromCreateStockDto();
            _context.Stocks.Add(stock);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { ID = stock.Id }, stock.ToStockDto());
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateStockDto updateStockDto)
        {
            var stock = _context.Stocks.FirstOrDefault((e) => e.Id == id);

            if (stock == null)
            {
                return NotFound();
            }

            stock.Symbol = updateStockDto.Symbol;
            stock.CompanyName = updateStockDto.CompanyName;
            stock.Purchase = updateStockDto.Purchase;
            stock.LastDiv = updateStockDto.LastDiv;
            stock.Industry = updateStockDto.Industry;
            stock.MarketCap = updateStockDto.MarketCap;

            _context.SaveChanges();

            return Ok(stock.ToStockDto());
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var stock = _context.Stocks.FirstOrDefault((e) => e.Id == id);

            if (stock == null)
            {
                return NotFound();
            }

            _context.Stocks.Remove(stock);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
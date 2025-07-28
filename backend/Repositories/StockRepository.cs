using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Stock;
using backend.Interfaces;
using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class StockRepository : IStockRepository
    {
        private readonly ApplicationDBContext _context;

        public StockRepository(ApplicationDBContext context)
        {
            _context = context;
        }


        public async Task<List<Stock>> GetAllAsync()
        {
            return await _context.Stocks.Include(c => c.Comments).ToListAsync();
        }

        public async Task<Stock?> GetByIdAsync(int id)
        {
            return await _context.Stocks.Include(c => c.Comments).FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Stock> CreateAsync(Stock stock)
        {
            await _context.Stocks.AddAsync(stock);
            await _context.SaveChangesAsync();
            return stock;
        }

        public async Task<Stock?> UpdateAsync(int id, UpdateStockDto updateStockDto)
        {
            var stock = await _context.Stocks.FirstOrDefaultAsync((e) => e.Id == id);

            if (stock == null)
            {
                return null;
            }

            stock.Symbol = updateStockDto.Symbol;
            stock.CompanyName = updateStockDto.CompanyName;
            stock.Purchase = updateStockDto.Purchase;
            stock.LastDiv = updateStockDto.LastDiv;
            stock.Industry = updateStockDto.Industry;
            stock.MarketCap = updateStockDto.MarketCap;

            await _context.SaveChangesAsync();

            return stock;
        }

        public async Task<Stock?> DeleteAsync(int id)
        {
            var stock = await _context.Stocks.FirstOrDefaultAsync((e) => e.Id == id);

            if (stock == null)
            {
                return null;
            }

            _context.Stocks.Remove(stock);
            await _context.SaveChangesAsync();

            return stock;
        }

        public async Task<bool> StockExists(int id)
        {
            return await _context.Stocks.AnyAsync(s => s.Id == id);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces;
using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class PortofolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDBContext _context;

        public PortofolioRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Stock>> GetUserPortfolio(AppUser appUser)
        {
            return await _context.Portfolios.Where(p => p.AppUserId == appUser.Id)
                .Select(portfolio => portfolio.Stock)
                .ToListAsync();
        }
    }
}
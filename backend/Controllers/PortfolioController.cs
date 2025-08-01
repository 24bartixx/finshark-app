using backend.Extensions;
using backend.Interfaces;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("/api/portfolio")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {

        private readonly UserManager<AppUser> _userManager;
        private readonly IStockRepository _stockRepo;
        private readonly IPortfolioRepository _portfolioRepo;
        private readonly IFinancialModelingService _fmpService;

        public PortfolioController(UserManager<AppUser> userManager, IStockRepository stockRepo,
            IPortfolioRepository portfolioRepo, IFinancialModelingService fmpService)
        {
            _userManager = userManager;
            _stockRepo = stockRepo;
            _portfolioRepo = portfolioRepo;
            _fmpService = fmpService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio()
        {
            string username = User.GetUsername();
            AppUser appUser = await _userManager.FindByNameAsync(username);

            List<Stock> userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);

            return Ok(userPortfolio);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddToPortfolio(string symbol)
        {
            string username = User.GetUsername();
            AppUser appUser = await _userManager.FindByNameAsync(username);

            Stock stock = await _stockRepo.GetBySymbolAsync(symbol);

            if (stock == null)
            {
                stock = await _fmpService.FindStockBySymbolAsync(symbol);

                if (stock == null)
                {
                    return BadRequest("Stock does not exist");
                }

                await _stockRepo.CreateAsync(stock);
            }

            if (stock == null) return BadRequest("Stock not found");

            List<Stock> portfolio = await _portfolioRepo.GetUserPortfolio(appUser);

            if (portfolio.Any(s => s.Symbol.ToLower() == symbol.ToLower())) return BadRequest("Cannot add duplicate stock to portfolio");

            Portfolio newPortfolio = new Portfolio
            {
                AppUserId = appUser.Id,
                StockId = stock.Id
            };

            await _portfolioRepo.CreateAsync(newPortfolio);

            if (newPortfolio == null) return StatusCode(500, "Could not create");

            return Created();
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteFromPortfolio(string symbol)
        {
            string username = User.GetUsername();
            AppUser appUser = await _userManager.FindByNameAsync(username);

            List<Stock> portfolio = await _portfolioRepo.GetUserPortfolio(appUser);

            List<Stock> toDelete = portfolio.Where(s => s.Symbol.ToLower() == symbol.ToLower()).ToList();

            if (toDelete.Count() != 1)
            {
                return BadRequest("Stock not in your portfolio");
            }

            await _portfolioRepo.DeleteAsync(appUser, symbol);
            return Ok();

        }
    }
}
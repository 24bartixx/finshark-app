using backend.Dtos.Stock;
using backend.Model;

namespace backend.Mappers
{
    public static class StockMappers
    {
        public static StockDto ToStockDto(this Stock stock)
        {
            return new StockDto
            {
                Id = stock.Id,
                Symbol = stock.Symbol,
                CompanyName = stock.CompanyName,
                Purchase = stock.Purchase,
                LastDiv = stock.LastDiv,
                Industry = stock.Industry,
                MarketCap = stock.MarketCap,
                Comments = stock.Comments.Select(e => e.ToCommentDto()).ToList()
            };
        }

        public static Stock ToStockFromCreateStockDto(this CreateStockDto createStockDto)
        {
            return new Stock
            {
                Symbol = createStockDto.Symbol,
                CompanyName = createStockDto.CompanyName,
                Purchase = createStockDto.Purchase,
                LastDiv = createStockDto.LastDiv,
                Industry = createStockDto.Industry,
                MarketCap = createStockDto.MarketCap
            };
        }

        public static Stock ToStockFromFMP(this StockFMP stockFMP)
        {
            return new Stock
            {
                Symbol = stockFMP.symbol,
                CompanyName = stockFMP.companyName,
                Purchase = (decimal) stockFMP.price,
                LastDiv = (decimal) stockFMP.lastDiv,
                Industry = stockFMP.industry,
                MarketCap = stockFMP.mktCap
            };
        }
    }
}
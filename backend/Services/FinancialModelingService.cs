using backend.Interfaces;
using backend.Mappers;
using backend.Model;
using Newtonsoft.Json;

namespace backend.Services
{
    public class FinancialModelingService : IFinancialModelingService
    {

        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public FinancialModelingService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        public async Task<Stock> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                HttpResponseMessage httpResult
                    = await _httpClient.GetAsync($"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={_config["FMPKey"]}");

                if (httpResult.IsSuccessStatusCode)
                {
                    string content = await httpResult.Content.ReadAsStringAsync();
                    StockFMP[] stocksFMP = JsonConvert.DeserializeObject<StockFMP[]>(content);
                    var stockFMP = stocksFMP[0];

                    if (stockFMP != null)
                    {
                        return stockFMP.ToStockFromFMP();
                    }

                    return null;
                }

                return null;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}
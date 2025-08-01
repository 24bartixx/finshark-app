using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Model;

namespace backend.Interfaces
{
    public interface IFinancialModelingService
    {
        Task<Stock> FindStockBySymbolAsync(string symbol);
    }
}
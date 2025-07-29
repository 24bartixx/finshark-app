using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Stock
{
    public class CreateStockDto
    {
        [Required]
        [MaxLength(12, ErrorMessage = "Symbol cannot consist of more than 12 characters")]
        public string Symbol { get; set; } = string.Empty;
        [Required]
        [MaxLength(64, ErrorMessage = "Company name cannot consist of more than 64 characters")]
        public string CompanyName { get; set; } = string.Empty;
        [Required]
        [Range(0.001, 999999999)]
        public decimal Purchase { get; set; }
        [Required]
        [Range(0.001, 100)]
        public decimal LastDiv { get; set; }
        [Required]
        [MaxLength(32, ErrorMessage = "Industry cannot consist of more than 32 characters")]
        public string Industry { get; set; } = string.Empty;
        [Range(1, 99999999999999)]
        public long MarketCap { get; set; }
    }
}
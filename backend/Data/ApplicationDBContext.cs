using backend.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // composite key
            builder.Entity<Portfolio>(e => e.HasKey(p => new { p.AppUserId, p.StockId }));

            builder.Entity<Portfolio>()
                .HasOne(u => u.AppUser)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(p => p.AppUserId);

            builder.Entity<Portfolio>()
                .HasOne(u => u.Stock)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(p => p.StockId);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole {
                Id = "e6a52c1a-6a61-40f1-b4d1-8a7d1cbd52c1",
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new IdentityRole {
                Id = "d0f07cb7-50f3-4e52-91fd-39b3cb8881ff",
                Name = "User",
                NormalizedName = "USER"
            }
            };

            builder.Entity<IdentityRole>().HasData(roles);
        }

    }
}
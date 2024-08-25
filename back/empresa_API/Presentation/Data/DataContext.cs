using Microsoft.EntityFrameworkCore;
using Presentation.Entities;

namespace Presentation.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public virtual DbSet<UserEntity> Users { get; set; }
    }
}

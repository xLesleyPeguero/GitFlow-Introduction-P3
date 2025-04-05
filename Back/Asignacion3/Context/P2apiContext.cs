using Asignacion3.Models;
using Microsoft.EntityFrameworkCore;

namespace Asignacion3.Context
{
    public class P2apiContext : DbContext
    {
        public P2apiContext(DbContextOptions<P2apiContext> database): base(database) 
        {
        
        }

        public DbSet<User> Usuario { get; set; }

        public DbSet<Country> Paises { get; set; }
    }
}

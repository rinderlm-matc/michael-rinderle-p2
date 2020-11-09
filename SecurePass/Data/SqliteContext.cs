using SecurePass.Library.Entity;
using Microsoft.EntityFrameworkCore;

namespace SecurePass.Data
{
    public class SqliteContext : SecurePassContext
    {
        public SqliteContext() { }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=SecurePassDB.db3", 
                b=>b.MigrationsAssembly("iToons"));
    }
}

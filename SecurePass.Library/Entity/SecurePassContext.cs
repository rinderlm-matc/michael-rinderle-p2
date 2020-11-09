using Microsoft.EntityFrameworkCore;

namespace SecurePass.Library.Entity
{
    public class SecurePassContext : DbContext
    {
        public virtual DbSet<Storage> Storages { get; set; }
        public SecurePassContext() { }
    }
}

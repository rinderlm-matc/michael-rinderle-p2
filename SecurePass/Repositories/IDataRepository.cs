using SecurePass.Library.Entity;

namespace SecurePass.Repositories
{
    public interface IDataRepository
    {
        void MigrateDatabase();
        Storage GetStorage(string guid);
        Storage Store(Storage Store);
        Storage ConfirmPassword(string guid, string password);
        bool Delete(string guid);
    }
}
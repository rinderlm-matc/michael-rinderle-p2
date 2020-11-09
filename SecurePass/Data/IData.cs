using SecurePass.Library.Entity;
using SecurePass.Repositories;

namespace SecurePass.Data
{
    public class IData : IDataRepository
    {
        private readonly IDataRepository DataRepository;

        public IData(IDataRepository dataRepository)
        {
            DataRepository = dataRepository;
        }

        public void MigrateDatabase()
        {
            DataRepository.MigrateDatabase();
        }
        
        public Storage Store(Storage store)
        {
            return DataRepository.Store(store);
        }
        
        public Storage GetStorage(string guid)
        {
            return DataRepository.GetStorage(guid);
        }
        
        public Storage ConfirmPassword(string guid, string password)
        {
            return DataRepository.ConfirmPassword(guid, password);
        }
        
        public bool Delete(string guid)
        {
            return DataRepository.Delete(guid);
        }
    }
}

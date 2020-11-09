using SecurePass.Data;
using SecurePass.Library.Entity;
using SecurePass.Providers;
using SecurePass.Repositories;
using System;
using System.Diagnostics;
using System.Linq;

namespace SecurePass.Dependencies
{
    public class IDataSqlite: IDataRepository
    {
        public void MigrateDatabase()
        {
            using var sql = new SqliteContext();
            // sql.Database.Migrate();
            sql.Database.EnsureCreated();
        }

        public Storage GetStorage(string guid)
        {
            try
            {
                using var sql = new SqliteContext();
                
                var store = sql.Storages.FirstOrDefault(x => x.Guid == guid);
                if (store.IsPasswordProtected)
                {
                    store.Username = string.Empty;
                    store.Password = string.Empty;
                    store.Note = string.Empty;
                }
                return store;
            }
            catch(Exception ex)
            {
                Debug.WriteLine(ex);
                return null;
            }
        }

        public Storage Store(Storage store)
        {
            try
            {
                using var sql = new SqliteContext();
                store.Guid = Guid.NewGuid().ToString();
                if (store.IsPasswordProtected)
                {
                    var csp = new CryptoServiceProvider();
                    store.ProtectedPassword = csp.CreatePasswordHash(store.ProtectedPassword);                  
                }
                sql.Storages.Add(store);
                sql.SaveChanges();
                return store;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return null;
            }
        }

        public Storage ConfirmPassword(string guid, string password)
        {
            try
            {
                using var sql = new SqliteContext();
                var store = sql.Storages.FirstOrDefault(x => x.Guid == guid);
                if (store != null)
                {
                    if (CryptoServiceProvider.VerifyHashString(password, store.ProtectedPassword))
                    {
                        return store;
                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return null;
            }
        }

        public bool Delete(string guid)
        {
            try
            {
                using var sql = new SqliteContext();
                var store = sql.Storages.FirstOrDefault(x => x.Guid == guid);
                sql.Storages.Remove(store);
                sql.SaveChanges();
                MailServiceProvider.SendConfirmation(store);
                return true;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return false;
            }
        }
    }
}
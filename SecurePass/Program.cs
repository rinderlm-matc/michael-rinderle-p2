using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using SecurePass.Data;
using SecurePass.Dependencies;

namespace SecurePass
{
    public class Program
    {
        public static IData Data { get; private set; }

        public static void Main(string[] args)
        {
            // custom dependency injection & sql data connection 
            // performing migrations on startup
            Data = new IData(new IDataSqlite());
            Data.MigrateDatabase();

            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}

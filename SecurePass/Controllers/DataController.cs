using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SecurePass.Library.Entity;

namespace SecurePass.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DataController : ControllerBase
    {
        private readonly ILogger<DataController> _logger;

        public DataController(ILogger<DataController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("store")]
        public ActionResult GetStorage(string guid)
        {
            return Ok(Program.Data.GetStorage(guid));
        }

        [HttpPost]
        [Route("store")]
        public ActionResult Store([FromBody] Storage storage)
        {
            return Ok(Program.Data.Store(storage));
        }

        [HttpGet]
        [Route("confirm")]
        public ActionResult ConfirmPassword(string guid, string password)
        {
            return Ok(Program.Data.ConfirmPassword(guid, password));
        }

        [HttpGet]
        [Route("delete")]
        public ActionResult Delete(string guid)
        {
            return Ok(Program.Data.Delete(guid));
        }
    }
}

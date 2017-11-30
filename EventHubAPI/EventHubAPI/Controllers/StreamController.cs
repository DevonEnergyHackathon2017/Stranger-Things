using System.Threading.Tasks;
using EventHubWebSocket.Handlers;
using Microsoft.AspNetCore.Mvc;

namespace EventHubAPI.Controllers
{
    [Route("api/[controller]")]
    public class StreamController : Controller
    {
        protected DataEventHandler _dataEventHandler;

        public StreamController(DataEventHandler dataEventHandler)
        {
            _dataEventHandler = dataEventHandler;
        }

        [HttpPost]
        public async Task Post([FromBody] object value)
        {
            await _dataEventHandler.SendMessageToAllAsync(value);

            return;
        }
    }
}

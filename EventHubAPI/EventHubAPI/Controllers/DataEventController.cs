using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EventHubWebSocket.Handlers;
using EventHubWebSocket.Models;

namespace EventHubAPI.Controllers
{
    [Route("api/[controller]")]
    public class DataEventController : Controller
    {
        protected DataEventHandler _dataEventHandler;

        public DataEventController(DataEventHandler dataEventHandler) {
            _dataEventHandler = dataEventHandler;
        }

        [HttpGet]
        public object Get() {
            return new { 
                Status = "Connnected"
            };
        }

        [HttpPost]
        public async Task Post([FromBody] DataEvent value)
        {
            await _dataEventHandler.SendMessageToAllAsync(value);

            return;
        }
    }
}

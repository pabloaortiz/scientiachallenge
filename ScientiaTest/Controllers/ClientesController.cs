using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ScientiaTest.Data;
using ScientiaTest.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientiaTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly ILogger<ClientesController> _logger;
        private readonly IClientesAccess _clientes;

        public ClientesController(ILogger<ClientesController> logger, IClientesAccess clientes)
        {
            _logger = logger;
            _clientes = clientes;            
        }

        [HttpGet]
        public IEnumerable<Cliente> GetCliente()
        {
            return _clientes.GetList();
        }

        [HttpGet("{id}")]
        public Cliente GetCliente(int id)
        {
            return _clientes.Get(id);
        }

        [HttpPost]
        public IActionResult PostCliente(Cliente cliente)
        {
            _clientes.Create(cliente);
            return StatusCode(201, cliente);
        }

        [HttpPut("{id}")]
        public IActionResult PutCliente(int id, Cliente cliente)
        {
            _clientes.Update(id, cliente);
            return StatusCode(201, cliente);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCliente(int id)
        {
            _clientes.Delete(id);
            return StatusCode(204);
        }
    }
}

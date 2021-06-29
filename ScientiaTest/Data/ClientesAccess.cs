using Microsoft.Extensions.Configuration;
using ScientiaTest.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ScientiaTest.Data
{
    public class ClientesAccess : IClientesAccess
    {
        private readonly TestDbContext _context;
        private readonly IConfiguration _configuration;

        public ClientesAccess(TestDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            string constring = _configuration.GetConnectionString("ScConnection").Split('=')[1];

            if (!File.Exists(constring))
            {
                _context.Database.EnsureCreated();
                _context.Clientes.Add(new Cliente { CUIT = "35-24121421-2", Apellido = "Perez", Nombre = "Juan", Email = "juanperez@mail.com" });
                _context.Clientes.Add(new Cliente { CUIT = "27-37782432-6", Apellido = "Mas", Nombre = "Veronica", Email = "veronicamas@mail.com" });
                _context.Clientes.Add(new Cliente { CUIT = "25-54211423-8", Apellido = "Alvarez", Nombre = "Emilio", Email = "emilioalvarez@mail.com" });
                _context.Clientes.Add(new Cliente { CUIT = "20-14237782-3", Apellido = "Martiarena", Nombre = "Julia", Email = "juliamartiarena@mail.com" });
                _context.Clientes.Add(new Cliente { CUIT = "22-23778243-5", Apellido = "Monzo", Nombre = "Benito", Email = "benitomonzo@mail.com" });
                _context.Clientes.Add(new Cliente { CUIT = "20-23778236-9", Apellido = "Moura", Nombre = "Javier", Email = "javiermoura@mail.com" });
                _context.Clientes.Add(new Cliente { CUIT = "22-37782438-7", Apellido = "Sousa", Nombre = "Mirta", Email = "mirtasousa@mail.com" });
                _context.SaveChanges();
            }   
        }

        public Cliente Get(int id)
        {
            var cliente = _context.Clientes.FirstOrDefault(c => c.Id == id);
            if (cliente != null)
            {
                return cliente;
            }
            return null;
        }

        public List<Cliente> GetList()
        {
            return _context.Clientes.ToList();
        }

        public Cliente Create(Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            _context.SaveChanges();
            return cliente;
        }

        public Cliente Update(int id, Cliente cliente)
        {
            var _cliente = _context.Clientes.FirstOrDefault(c => c.Id == id);
            if (_cliente != null)
            {
                _cliente.CUIT = cliente.CUIT;
                _cliente.Apellido = cliente.Apellido;
                _cliente.Nombre = cliente.Nombre;
                _cliente.Email = cliente.Email;
                _context.SaveChanges();
                return _cliente;
            }
            return null;
        }

        public bool Delete(int id)
        {
            var cliente = _context.Clientes.FirstOrDefault(c => c.Id == id);
            if (cliente != null)
            {
                _context.Clientes.Remove(cliente);
                _context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}

using ScientiaTest.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientiaTest.Data
{
    public interface IClientesAccess
    {
        public Cliente Create(Cliente cliente);
        public Cliente Update(int id, Cliente cliente);
        public bool Delete(int id);
        public Cliente Get(int id);
        public List<Cliente> GetList();
    }
}

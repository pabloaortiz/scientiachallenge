using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientiaTest.Model
{
    public class TestDbContext : DbContext
    {
        public DbSet<Cliente> Clientes { get; set; }

        public TestDbContext(DbContextOptions<TestDbContext> options) : base(options)
        {
        }
    }
}

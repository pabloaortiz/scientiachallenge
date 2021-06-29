using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ScientiaTest.Model
{
    [Table("Cliente")]
    public class Cliente
    {
        [Key]        
        public int Id { get; set; }

        [StringLength(50)]
        public string CUIT { get; set; }

        [StringLength(150)]
        public string Apellido { get; set; }

        [StringLength(150)]
        public string Nombre { get; set; }

        [StringLength(150)]
        public string Email { get; set; }
    }
}

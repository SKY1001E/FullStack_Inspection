using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InspectionAPI.Models
{
    public class InspectionType
    {
        public int Id { get; set; } // PK

        [StringLength(20)]
        public string InspectionName { get; set; } = string.Empty;
    }
}

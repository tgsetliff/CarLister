using Insight.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarLister.Models
{
    public class Car
    {
        public int id { get; set; }
        public string make { get; set; }
        [Column("model_name")]
        public string model { get; set; }
        [Column("model_year")]
        public string year { get; set; }
        [Column("model_trim")]
        public string trim { get; set; }
        public string engine_cc { get; set; }
        public string engine_num_cyl { get; set; }
        public string engine_type { get; set; }
        public string engine_valves_per_cyl { get; set; }
        public string engine_power_ps { get; set; }
        public string engine_power_rpm { get; set; }
        public string engine_torque_nm { get; set; }
        public string engine_torque_rpm { get; set; }
        public string drive_type { get; set; }
        public string transmission_type { get; set; }
        public string seats { get; set; }
        public string doors { get; set; }
        public string wheelbase { get; set; }

    }
}
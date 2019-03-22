using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace WeatherPlotter.Models {

    public class Clouds {

        public double All { get; set; }

        public Clouds(JToken cloudsData) {
            All = double.Parse(cloudsData.SelectToken("all").ToString());
        }
    }
}

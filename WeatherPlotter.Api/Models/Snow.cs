using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace WeatherPlotter.Models {
    public class Snow {

        public double H3 { get; set; }

        public Snow(JToken snowData) {
            if (snowData.SelectToken("3h") != null)
                H3 = double.Parse(snowData.SelectToken("3h").ToString());
        }
    }
}

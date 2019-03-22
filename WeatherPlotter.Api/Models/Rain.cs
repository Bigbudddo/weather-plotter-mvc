using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace WeatherPlotter.Models {
    public class Rain {

        public double H3 { get; set; }

        public Rain(JToken rainData) {
            if (rainData.SelectToken("3h") != null)
                H3 = double.Parse(rainData.SelectToken("3h").ToString());
        }
    }
}

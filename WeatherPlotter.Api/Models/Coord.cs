using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace WeatherPlotter.Models {

    public class Coord {

        public double Longitude { get; set; }

        public double Latitude { get; set; }

        public Coord(JToken coordData) {
            Longitude = double.Parse(coordData.SelectToken("lon").ToString());
            Latitude = double.Parse(coordData.SelectToken("lat").ToString());
        }
    }
}

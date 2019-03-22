using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;

namespace WeatherPlotter.Models {

    public class City {

        public int Id { get; set; }

        public string Name { get; set; }

        public Coord CityCoords { get; set; }

        public string CountryCode { get; set; }

        public City(JToken cityData) {
            Id = int.Parse(cityData.SelectToken("id").ToString());
            Name = cityData.SelectToken("name").ToString();
            CityCoords = new Coord(cityData.SelectToken("coord"));
            CountryCode = cityData.SelectToken("country").ToString();
        }
    }
}
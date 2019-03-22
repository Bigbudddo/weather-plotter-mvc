using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;

namespace WeatherPlotter.Models {

    public class ForecastGroup {

        public DateTime ForecastedDate { get; set; }

        public Main Main { get; set; }

        public Clouds Clouds { get; set; }

        public Rain Rain { get; set; }

        public Snow Snow { get; set; }

        public Weather Weather { get; set; }

        public Wind Wind { get; set; }

        public ForecastGroup(JToken forecastData) {
            double dt = double.Parse(forecastData.SelectToken("dt").ToString());
            ForecastedDate = Utilities.UnixTimeStampToDateTime(dt);

            if (forecastData.SelectToken("main") != null)
                Main = new Main(forecastData.SelectToken("main"));

            if (forecastData.SelectToken("clouds") != null)
                Clouds = new Clouds(forecastData.SelectToken("clouds"));
            
            if (forecastData.SelectToken("rain") != null)
                Rain = new Rain(forecastData.SelectToken("rain"));

            if (forecastData.SelectToken("snow") != null)
                Snow = new Snow(forecastData.SelectToken("snow"));

            if (forecastData.SelectToken("weather") != null)
                Weather = new Weather(forecastData.SelectToken("weather"));

            if (forecastData.SelectToken("wind") != null)
                Wind = new Wind(forecastData.SelectToken("wind"));
        }
    }
}
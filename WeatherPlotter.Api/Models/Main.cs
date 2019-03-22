using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace WeatherPlotter.Models {

    public class Main {
        
        public double Pressure { get; set; }

        public double Humdity { get; set; }

        public double SeaLevelAtm { get; set; }

        public double GroundLevelAtm { get; set; }

        public TemperatureObj Temperature { get; set; }

        public Main(JToken mainData)
        {
            Temperature = new TemperatureObj(
                double.Parse(mainData.SelectToken("temp").ToString()),
                double.Parse(mainData.SelectToken("temp_min").ToString()), double.Parse(mainData.SelectToken("temp_max").ToString())
            );

            Pressure = double.Parse(mainData.SelectToken("pressure").ToString());
            Humdity = double.Parse(mainData.SelectToken("humidity").ToString());

            if (mainData.SelectToken("sea_level") != null)
                SeaLevelAtm = double.Parse(mainData.SelectToken("sea_level").ToString());

            if (mainData.SelectToken("grnd_level") != null)
                GroundLevelAtm = double.Parse(mainData.SelectToken("grnd_level").ToString());
        }

        public class TemperatureObj {

            public double CelsiusCurrent { get; set; }

            public double FahrenheitCurrent { get; set; }

            public double KelvinCurrent { get; set; }

            public double CelsiusMinimum { get; set; }

            public double CelsiusMaximum { get; set; }

            public double FahrenheitMinimum { get; set; }

            public double FahrenheitMaximum { get; set; }

            public double KelvinMinimum { get; set; }

            public double KelvinMaximum { get; set; }

            public TemperatureObj(double temp, double min, double max) {
                KelvinCurrent = temp;
                KelvinMaximum = max;
                KelvinMinimum = min;

                CelsiusCurrent = convertToCelsius(KelvinCurrent);
                CelsiusMaximum = convertToCelsius(KelvinMaximum);
                CelsiusMinimum = convertToCelsius(KelvinMinimum);

                FahrenheitCurrent = convertToFahrenheit(CelsiusCurrent);
                FahrenheitMaximum = convertToFahrenheit(CelsiusMaximum);
                FahrenheitMinimum = convertToFahrenheit(CelsiusMinimum);
            }

            private double convertToFahrenheit(double celsius) {
                return Math.Round(((9.0 / 5.0) * celsius) + 32, 3);
            }

            private double convertToCelsius(double kelvin) {
                return Math.Round(kelvin - 273.15, 3);
            }
        }
    }
}

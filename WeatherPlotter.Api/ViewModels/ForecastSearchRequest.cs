using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeatherPlotter.ViewModels {

    public sealed class ForecastSearchRequest {

        public string CityName { get; set; }

        public string CountryCode { get; set; } = "uk";
    }
}

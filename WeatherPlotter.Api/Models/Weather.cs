using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace WeatherPlotter.Models {

    public class Weather {

        public int Id { get; private set; }

        public string Main { get; private set; }

        public string Description { get; private set; }

        public string Icon { get; private set; }

        public Weather(JToken weatherData) {
            if (weatherData.SelectToken("id") != null)
                Id = int.Parse(weatherData.SelectToken("id").ToString());

            if (weatherData.SelectToken("main") != null)
                Main = weatherData.SelectToken("main").ToString();

            if (weatherData.SelectToken("description") != null)
                Description = weatherData.SelectToken("description").ToString();

            if (weatherData.SelectToken("icon") != null)
                Icon = weatherData.SelectToken("icon").ToString();
        }
    }
}

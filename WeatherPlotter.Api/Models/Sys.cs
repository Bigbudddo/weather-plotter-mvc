using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace WeatherPlotter.Models {
    public class Sys {

        public int Type { get; set; }

        public int ID { get; set; }

        public double Message { get; set; }

        public string Country { get; set; }

        public DateTime Sunrise { get; set; }

        public DateTime Sunset { get; set; }

        public Sys(JToken sysData) {
            if(sysData.SelectToken("type") != null)
                Type = int.Parse(sysData.SelectToken("type").ToString());

            if (sysData.SelectToken("id") != null)
                ID = int.Parse(sysData.SelectToken("id").ToString());

            Message = double.Parse(sysData.SelectToken("message").ToString());
            Country = sysData.SelectToken("country").ToString();

            Sunrise = convertUnixToDateTime(double.Parse(sysData.SelectToken("sunrise").ToString()));
            Sunset = convertUnixToDateTime(double.Parse(sysData.SelectToken("sunset").ToString()));
        }

        private DateTime convertUnixToDateTime(double unixTime) {
            DateTime dt = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            return dt.AddSeconds(unixTime).ToLocalTime();
        }
    }
}

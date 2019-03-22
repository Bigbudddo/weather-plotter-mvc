using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WeatherPlotter {

    public static class Utilities {

        // https://stackoverflow.com/questions/249760/how-can-i-convert-a-unix-timestamp-to-datetime-and-vice-versa
        public static DateTime UnixTimeStampToDateTime(double unixTimeStamp) {
            // Unix timestamp is seconds past epoch
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds(unixTimeStamp).ToLocalTime();
            return dtDateTime;
        }
    }
}
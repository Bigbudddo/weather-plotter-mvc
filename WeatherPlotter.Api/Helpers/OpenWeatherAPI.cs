using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using WeatherPlotter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace WeatherPlotter {

    public class OpenWeatherMapAPI {

        private string _apiKey;

        public OpenWeatherMapAPI(string apiKey) {
            _apiKey = apiKey;
        }

        public void UpdateAPIKey(string apiKey) {
            _apiKey = apiKey;
        }

        public Forecast QueryForecast(string queryStr) {
            ForecastQuery newQuery = new ForecastQuery(_apiKey, queryStr);
            if (newQuery.ValidRequest)
                return newQuery.GetForecast();
            return null;
        }
    }

    public abstract class OpenWeatherMapAPIQuery {
        
        public bool ValidRequest { get; protected set; }

        public int Code { get; protected set; }
    }

    public class ForecastQuery : OpenWeatherMapAPIQuery {

        [BsonId]
        public ObjectId ID { get; set; }

        public double Message { get; set; }

        public int Count { get; set; }

        public City City { get; set; }

        public List<ForecastGroup> List { get; set; } = new List<ForecastGroup>();

        public Forecast GetForecast() {
            return new Forecast() {
                Id = ID,
                Message = Message,
                Count = Count,
                City = City,
                List = List
            };
        }

        public ForecastQuery() { }

        public ForecastQuery(string apiKey, string queryStr) {
            // make our query
            JObject jsonData = JObject.Parse(new System.Net.WebClient().DownloadString(string.Format("http://api.openweathermap.org/data/2.5/forecast?appid={0}&q={1}", apiKey, queryStr)));
            if (jsonData.SelectToken("cod").ToString() == "200") {
                // set the protected/inherited properties
                ValidRequest = true;
                Code = int.Parse(jsonData.SelectToken("cod").ToString());

                // get the property data
                Message = double.Parse(jsonData.SelectToken("message").ToString());
                Count = int.Parse(jsonData.SelectToken("cnt").ToString());
                City = new City(jsonData.SelectToken("city"));

                foreach (JToken list in jsonData.SelectToken("list"))
                    List.Add(new ForecastGroup(list));
            }
            else {
                ValidRequest = false;
            }
        }
    }
}

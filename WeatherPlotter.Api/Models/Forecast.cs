using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WeatherPlotter.Models {

    public class Forecast {

        [BsonId]
        public ObjectId Id { get; set; }

        public double Message { get; set; }

        public int Count { get; set; }

        public City City { get; set; }

        public DateTime DateSearched { get; set; } = DateTime.Now;

        public List<ForecastGroup> List { get; set; } = new List<ForecastGroup>();

    }
}
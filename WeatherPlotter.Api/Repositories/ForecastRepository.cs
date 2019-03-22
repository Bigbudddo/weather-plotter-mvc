using MongoDB.Bson;
using MongoDB.Driver;
using WeatherPlotter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WeatherPlotter.Repositories {

    public class ForecastRepository {

        private readonly string _mongoDbName = "weather";
        private readonly string _mongoDbCollectionName = "forecasts";
        private readonly string _connectionString;

        public ObjectId? StoreForecast(Forecast forecast) {
            try {
                var client = new MongoClient(_connectionString);
                IMongoDatabase database = client.GetDatabase(_mongoDbName);
                IMongoCollection<Forecast> collection = database.GetCollection<Forecast>(_mongoDbCollectionName);

                collection.InsertOne(forecast);
                return forecast.Id;
            }
            catch {
                return null;
            }
        }

        public Forecast GetForecast(string forecastId) {
            try {
                var client = new MongoClient(_connectionString);
                IMongoDatabase database = client.GetDatabase(_mongoDbName);
                IMongoCollection<Forecast> collection = database.GetCollection<Forecast>(_mongoDbCollectionName);
                
                return collection.Find(new BsonDocument("_id", ObjectId.Parse(forecastId))).First();
            }
            catch {
                return null;
            }
        }

        public IEnumerable<Forecast> GetForecasts() {
            try {
                var client = new MongoClient(_connectionString);
                IMongoDatabase database = client.GetDatabase(_mongoDbName);
                IMongoCollection<Forecast> collection = database.GetCollection<Forecast>(_mongoDbCollectionName);

                return collection.Find(new BsonDocument()).ToList();
            }
            catch {
                return new List<Forecast>();
            }
        }

        public ForecastRepository(string mongoDbConnectionString) {
            _connectionString = mongoDbConnectionString;
        }
    }
}
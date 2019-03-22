using MongoDB.Bson;
using Newtonsoft.Json;
using WeatherPlotter.Models;
using WeatherPlotter.Repositories;
using WeatherPlotter.ViewModels;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.IO;

namespace WeatherPlotter.Api.Controllers {

    public class WeatherController : ApiController {

        private readonly string _apiKey = ConfigurationManager.AppSettings["openWeatherApiKey"];
        private readonly string _mongoDbPath = ConfigurationManager.AppSettings["mongoDbConnection"];

        [HttpGet]
        [ResponseType(typeof(Forecast))]
        [Route("api/forecast")]
        [Route("api/forecast/{forecastId}")]
        public IHttpActionResult GetWeatherForecast(string forecastId) {
            try {
                var forecastRepo = new ForecastRepository(_mongoDbPath);
                Forecast forecast = forecastRepo.GetForecast(forecastId);

                if (forecast is null)
                    return BadRequest($"could not locate forecast data with id: {forecastId}");
                else
                    return Ok(forecast);
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [ResponseType(typeof(List<Forecast>))]
        [Route("api/forecast/list")]
        public IHttpActionResult GetWeatherForecastList() {
            try {
                var forecastRepo = new ForecastRepository(_mongoDbPath);
                List<Forecast> summaries = forecastRepo.GetForecasts().ToList();

                return Ok(summaries);
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [ResponseType(typeof(string))]
        [Route("api/forecast/search")]
        public IHttpActionResult SearchWeatherReport([FromBody] ForecastSearchRequest request) {
            try {
                // fetch the forecast
                var openWeatherApi = new OpenWeatherMapAPI(_apiKey);
                Forecast forecast = openWeatherApi.QueryForecast($"{request.CityName}"); //,{request.CountryCode}

                // store the results
                var forecastRepo = new ForecastRepository(_mongoDbPath);
                ObjectId? forecastId = forecastRepo.StoreForecast(forecast);

                // return the query result
                if (forecastId.HasValue)
                    return Ok(forecastId.Value);
                else
                    return BadRequest("Could not store results of query");
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }
    }
}

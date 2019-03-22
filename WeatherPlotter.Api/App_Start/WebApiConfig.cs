using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WeatherPlotter.Api {

    public static class WebApiConfig {
        public static void Register(HttpConfiguration config) {
            // Web API configuration and services

            // Web API Cors Setup
            // todo; remove the ability for anybody to make a request to this API
            string whiteList = ConfigurationManager.AppSettings["corsWhitelist"];
            var globalCors = new EnableCorsAttribute(whiteList, "*", "*");

            // Enable CORS so that our web-app can access our API better
            config.EnableCors(globalCors);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}

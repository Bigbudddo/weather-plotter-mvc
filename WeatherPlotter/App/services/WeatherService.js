
// todo; use '$resource' instead?

(function () {
    'use strict';

    angular.module('weather')
        .factory('WeatherService', WeatherService);

    WeatherService.$inject = ['$http', '$sanitize', 'webApiUrl'];

    function WeatherService($http, $sanitize, webApiUrl) {
        //////////////////////////////////////////
        // Service Setup
        //////////////////////////////////////////
        var service = {
            getForecast: getForecast,
            listForecasts: listForecasts,
            searchForecast: searchForecast
        };

        return service;

        //////////////////////////////////////////
        // Function Definitions
        //////////////////////////////////////////
        function getForecast(forecastId) {
            return $http.get((webApiUrl + 'api/forecast'), {
                params: {
                    forecastId: forecastId
                }
            });
        }

        function listForecasts() {
            return $http.get((webApiUrl + 'api/forecast/list'));
        }

        function searchForecast(cityName, countryCode) {
            // check/modify the countryCode
            // bit of error checking in-case we don't reach this part of the task
            countryCode = (countryCode == undefined || countryCode == null) ? countryCode : "uk"
            // make our request
            return $http.post((webApiUrl + 'api/forecast/search'), {
                CityName: cityName,
                CountryCode: countryCode
            });
        }
    }
})();
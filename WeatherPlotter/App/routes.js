(function () {
    'use strict';

    /////////////////////////////////////////////////////
    // Angular Config
    /////////////////////////////////////////////////////
    angular
        .module('weather')
        .config(RouteConfiguration)
        .run(RouteRunConfiguration);

    /////////////////////////////////////////////////////
    // States
    /////////////////////////////////////////////////////
    var homepage = {
        url: '/',
        templateUrl: '/Home/HomePage',
        controller: 'HomeController',
        controllerAs: 'vm',
        //resolve: {
        //    forecasts: function (WeatherService) {
        //        return WeatherService.listForecasts()
        //        .then(
        //            s => { return s.data; },
        //            e => { return []; }
        //        );
        //    }
        //}
        // I've commented this out after I found the webpage slow to start because it was trying to fetch so much data
        // I think the best approach is to bring back a minimal set of data and have an inifinite scroll, but time constraints...
    };

    var forecast = {
        url: '/forecast/:forecastId',
        templateUrl: '/Home/Forecast',
        controller: 'ForecastController',
        controllerAs: 'vm',
        params: {
            forecastId: null
        },
        resolve: {
            forecast: function ($stateParams, WeatherService) {
                // todo; check for valid stateParams
                return WeatherService.getForecast($stateParams['forecastId'])
                .then(
                    s => { return s.data; },
                    e => { return false; }
                );
            }
        }
    };

    /////////////////////////////////////////////////////
    // Routing & States Configuration
    /////////////////////////////////////////////////////
    RouteConfiguration.$inject = ['$stateProvider', '$locationProvider'];
    function RouteConfiguration($stateProvider, $locationProvider) {
        $stateProvider
            .state('homepage', homepage)
            .state('forecast', forecast);

        $locationProvider.hashPrefix('');
    }

    /////////////////////////////////////////////////////
    // Routing & States Run Configuration
    /////////////////////////////////////////////////////
    RouteRunConfiguration.$inject = ['$state', '$transitions'];

    function RouteRunConfiguration($state, $transitions) {
        $transitions.onStart({}, function (trans) {
            // apply a load mask on the UI-View when we jump to another state
            $('#main-app-view').addClass('loading-mask');
        });

        $transitions.onFinish({}, function (trans) {
            // this is to force the page back to the top once the route has finished loading!
            document.body.scrollTop = document.documentElement.scrollTop = 0;

            // remove the load mask on the UI-View when the state change has finished
            $('#main-app-view').removeClass('loading-mask');
        });
    };
})();
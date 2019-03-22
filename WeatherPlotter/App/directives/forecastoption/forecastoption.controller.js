(function () {
    'use strict';

    angular.module('weather').directive('forecastOption', ForecastOptionController);

    ForecastOptionController.$inject = [];

    function ForecastOptionController() {
        return {
            restrict: 'E',
            scope: {
                forecast: '='
            },
            templateUrl: "/App/directives/forecastoption/forecastoption.view.html",
            link: function (scope, element, attrs) {

                scope.isOpeningForecast = false;

                scope.getDurationSince = function () {
                    var now = moment(new Date());
                    var end = scope.forecast.DateSearched;

                    if (now.diff(end, 'seconds') < 60) {
                        return now.diff(end, 'seconds') + " seconds ago";
                    }
                    else if (now.diff(end, 'minutes') < 60) {
                        return now.diff(end, 'minutes') + " minutes ago";
                    }
                    else if (now.diff(end, 'hours') < 24) {
                        return now.diff(end, 'hours') + " hours ago";
                    }
                    else if (now.diff(end, 'days') < 7) {
                        return now.diff(end, 'days') + " days ago";
                    }
                    else {
                        return now.diff(end, 'weeks') + " weeks ago";
                    }
                }

                // handle when the option has been selected
                // we want to jump to the forecast display page
                scope.onSelectForecastOption = function (option) {
                    scope.isOpeningForecast = true;
                    if (typeof (scope.$parent.$parent.openForecast) == 'function')
                        scope.$parent.$parent.openForecast(option.Id);
                }
            }
        }
    }
})();
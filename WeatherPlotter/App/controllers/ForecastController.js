(function () {
    'use strict';

    angular
        .module('weather')
        .controller('ForecastController', ForecastController)

    ForecastController.$inject = ['$scope', 'webUrl', 'WeatherService', 'forecast'];

    function ForecastController($scope, webUrl, WeatherService, forecast) {
        /////////////////////////////////////////////////////
        // Properties
        /////////////////////////////////////////////////////
        var vm = this;
        vm.forecast = forecast;

        /////////////////////////////////////////////////////
        // UI Functions & Listeners
        /////////////////////////////////////////////////////
        vm.getShareUrl = function () {
            return webUrl + '#/forecast/' + vm.forecast.Id;
        }

        vm.onHomepageClick = function () {
            if (typeof ($scope.$parent.goHome) == 'function')
                $scope.$parent.goHome();
        }

        /////////////////////////////////////////////////////
        // Data Functions
        /////////////////////////////////////////////////////
        vm.getHumidityData = function () {
            var humidityData = [];

            for (var i = 0; i < vm.forecast.List.length; i++) {
                var o = vm.forecast.List[i];
                humidityData.push([o.ForecastedDate.unix() * 1000, o.Main.Humdity]);
            }

            return humidityData;
        }

        vm.getRainData = function () {
            var rainData = [];

            for (var i = 0; i < vm.forecast.List.length; i++) {
                var o = vm.forecast.List[i];
                var rain = (o.Rain == null) ? 0 : o.Rain.H3;
                rainData.push([o.ForecastedDate.unix() * 1000, rain]);
            }

            return rainData;
        }

        vm.getSnowData = function () {
            var snowData = [];

            for (var i = 0; i < vm.forecast.List.length; i++) {
                var o = vm.forecast.List[i];
                var snow = (o.Snow == null) ? 0 : o.Snow.H3;
                snowData.push([o.ForecastedDate.unix() * 1000, snow]);
            }

            return snowData;
        }

        vm.getTemperatureData = function () {
            var temperatureData = [];

            for (var i = 0; i < vm.forecast.List.length; i++) {
                var o = vm.forecast.List[i];
                temperatureData.push([o.ForecastedDate.unix() * 1000, o.Main.Temperature.CelsiusCurrent]);
            }

            return temperatureData;
        }

        /////////////////////////////////////////////////////
        // Highcharts Declerations
        /////////////////////////////////////////////////////
        Highcharts.chart('temperature-container', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: '5-Day Temperature Forecast'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Current Temperature',
                data: vm.getTemperatureData()
            }]
        });

        Highcharts.chart('humidity-container', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: '5-Day Humidity Forecast'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Humidity (%)'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Humidity',
                data: vm.getHumidityData()
            }]
        });

        Highcharts.chart('rain-container', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: '5-Day Rain Forecast'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Rain Volume (mm)'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Rain Volume',
                data: vm.getRainData()
            }]
        });

        Highcharts.chart('snow-container', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: '5-Day Snow Forecast'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Snow Volume (mm)'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Snow Volume',
                data: vm.getSnowData()
            }]
        });
    }
})();
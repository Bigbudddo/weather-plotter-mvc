(function () {
    'use strict';

    angular
        .module('weather')
        .controller('HomeController', HomeController)

    HomeController.$inject = ['$scope', 'Notification', 'WeatherService'];

    function HomeController($scope, Notification, WeatherService) {
        /////////////////////////////////////////////////////
        // Properties
        /////////////////////////////////////////////////////
        var vm = this,
            baseMapPath = "https://code.highcharts.com/mapdata/",
            mapKey = "custom/world",
            svgPath = baseMapPath + mapKey + '.svg',
            geojsonPath = baseMapPath + mapKey + '.geo.json',
            showDataLabels = false, // Switch for data labels enabled/disabled
            mapGeoJSON = Highcharts.maps[mapKey],
            mapCount = 0,
            searchText,
            mapOptions = '';

        vm.searchModel = "";
        vm.isSearching = false;
        vm.isFetchingList = false;
        vm.isMapLoaded = false;
        vm.forecasts = [];

        /////////////////////////////////////////////////////
        // UI Functions & Listeners
        /////////////////////////////////////////////////////
        vm.onSearchClick = function () {
            vm.searchForecast();
        }

        vm.onSearchKeypress = function (event) {
            if (event.keyCode === 13)
                vm.searchForecast();
        }

        /////////////////////////////////////////////////////
        // Data Functions
        /////////////////////////////////////////////////////
        vm.getMapData = function (features) {
            var data = [];

            $.each(mapGeoJSON.features, function (index, feature) {
                // get the key
                var id = feature.id;

                // look for that feature within our searches
                var queries = vm.forecasts.filter(el => {
                    return el.City.CountryCode == id;
                });

                // add the counted result to our data values
                data.push({
                    key: feature.properties['hc-key'],
                    value: queries.length
                });
            });

            return data;
        }

        /////////////////////////////////////////////////////
        // Service Functions
        /////////////////////////////////////////////////////
        vm.listForecasts = function () {
            vm.isFetchingList = true;
            WeatherService.listForecasts()
                .then(s => {
                    vm.isFetchingList = false;
                    vm.forecasts = s.data;
                    vm.loadMap();
                }, e => {
                    console.error('listForecasts: error', e);
                    vm.isFetchingList = false;
                    vm.forecasts = [];
                });
        }

        vm.searchForecast = function () {
            vm.isSearching = true;
            WeatherService.searchForecast(vm.searchModel, 'uk')
            .then(
                success => {
                    // when we get a success result, we want to jump the user
                    // to the forecast display page
                    vm.isSearching = false;
                    if (typeof ($scope.$parent.openForecast) == 'function')
                        $scope.$parent.openForecast(success.data);
                    // todo; might want to handle this error? But we shouldn't land here
                },
                error => {
                    vm.isSearching = false;
                    if (error.status == 400)
                        Notification.error('The city/town you searched for could not be located. Please try again.');
                    else if (error.data.hasOwnProperty('Message'))
                        Notification.error(error.data.Message);
                    else
                        Notification.error('An unknown error has occured.');

                    console.error('there was a problem', error);
                }
            );
        }

        /////////////////////////////////////////////////////
        // Highmaps
        /////////////////////////////////////////////////////
        vm.loadMap = function () {
            if (vm.isMapLoaded)
                return; // do not reload map?

            var data = vm.getMapData(mapGeoJSON.features);
            $("#map-container").highcharts('Map', {
                title: {
                    text: null
                },
                mapNavigation: {
                    enabled: true
                },
                colorAxis: {
                    min: 0,
                    stops: [
                        [0, '#EFEFFF'],
                        [0.5, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
                    ]
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'bottom'
                },
                series: [{
                    data: data,
                    mapData: mapGeoJSON,
                    joinBy: ['hc-key', 'key'],
                    name: 'Random data',
                    states: {
                        hover: {
                            color: Highcharts.getOptions().colors[2]
                        }
                    },
                    dataLabels: {
                        enabled: showDataLabels,
                        formatter: function () {
                            return mapKey === 'custom/world' || mapKey === 'countries/us/us-all' ?
                                (this.point.properties && this.point.properties['hc-a2']) :
                                this.point.name;
                        }
                    },
                    point: {
                        events: {
                            // On click, look for a detailed map
                            click: function () {
                                var key = this.key;
                                $('#mapDropdown option').each(function () {
                                    if (this.value === 'countries/' + key.substr(0, 2) + '/' + key + '-all.js') {
                                        $('#mapDropdown').val(this.value).change();
                                    }
                                });
                            }
                        }
                    }
                }, {
                    type: 'mapline',
                    name: "Separators",
                    data: Highcharts.geojson(mapGeoJSON, 'mapline'),
                    nullColor: 'gray',
                    showInLegend: false,
                    enableMouseTracking: false
                }]
            });

            vm.isMapLoaded = true;
        };

        // List the data
        vm.listForecasts();
    }
})();
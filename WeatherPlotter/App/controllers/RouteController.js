(function () {
    'use strict';

    angular
        .module('weather')
        .controller('RouteController', RouteController)

    RouteController.$inject = ['$scope', '$state'];
    function RouteController($scope, $state) {
        //////////////////////////////////////////
        // Constructor
        //////////////////////////////////////////
        $scope.init = function (viewbag) {
            // todo; configure based on view-bag config
            $state.go('homepage');
        };

        //////////////////////////////////////////
        // State Controls
        //////////////////////////////////////////
        $scope.goHome = function () {
            $state.go('homepage');
        }

        $scope.openForecast = function (forecastId) {
            $state.go('forecast', { forecastId: forecastId });
        }
    }
})();
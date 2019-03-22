(function () {
    'use strict';

    angular.module('weather').filter('reverse', ReverseFilter);

    ReverseFilter.$inject = [];

    function ReverseFilter() {
        return function (items) {
            return items.slice().reverse();
        };
    }
})();
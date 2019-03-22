(function () {
    'use strict';

    angular
        .module('weather', [
            'ngAnimate',
            'ngAria',
            'ngCookies',
            'ngMessages',
            'ngSanitize',
            'ui-notification',
            'ui.router'
        ])
        .constant('webUrl', 'http://localhost:60101/')
        .constant('webApiUrl', 'http://localhost:60141/')
        .config(CookieConfiguration)
        .config(HttpConfiguration)
        .config(NotificationConfiguration);

    //////////////////////////////////////////
    // App Cookie Configuration
    //////////////////////////////////////////
    CookieConfiguration.$inject = ['$cookiesProvider'];
    function CookieConfiguration($cookiesProvider) {
        $cookiesProvider.defaults.path = '/';
    }

    //////////////////////////////////////////
    // App Http Configuration
    // Note; this will convert all date fields into Moment.js date
    // This makes it a bit easier to manipulate when all dates are made the same type
    //////////////////////////////////////////
    HttpConfiguration.$inject = ['$httpProvider'];
    function HttpConfiguration($httpProvider) {
        $httpProvider.defaults.transformResponse.push(function (responseData) {
            if (responseData != null) {
                if (responseData.hasOwnProperty('Result')) {
                    window.top.formatDateStringsToDates(responseData.Result);
                }
                else {
                    window.top.formatDateStringsToDates(responseData);
                }
            }

            return responseData;
        });
    }

    //////////////////////////////////////////
    // App Notification Configuration
    // Just so we can set some defaults for UI-Notification
    //////////////////////////////////////////
    NotificationConfiguration.$inject = ['NotificationProvider'];
    function NotificationConfiguration(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 5000,
            startTop: 10,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom'
        });
    }
})();
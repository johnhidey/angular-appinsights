// fe43bead-b7b1-4e6c-b273-5a101ba16b9c
/*global angular: true */

(function () {
    "use strict";

    angular.module('insightsApp', ['ngRoute', 'angular-appinsights'])
        .config(['$routeProvider', 'insightsProvider', function ($routeProvider, insightsProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: "page1.html"
                })
                .when('/page2', {
                    templateUrl: "page2.html"
                });

            insightsProvider.start('Application Insights App Id');

        }]);

}());

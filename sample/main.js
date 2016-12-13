// fe43bead-b7b1-4e6c-b273-5a101ba16b9c
/*global angular: true */

(function () {
    "use strict";

    angular.module('insightsApp', ['ngRoute', 'angular-appinsights'])
        .config(['$routeProvider', 'insightsProvider', function ($routeProvider, insightsProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: "page1.html",
                    controller: 'page1Controller'
                })
                .when('/page2', {
                    templateUrl: "page2.html"
                });

            // Add application insights id here
            insightsProvider.start('Application Insights App Id Goes Here');

        }])
        .controller('page1Controller', ['$scope', 'insights', function($scope, insights) {

            insights.logEvent('Page 1 Controller Activated');

            $scope.exit = function () {
                insights.logEvent('User clicked the exit button');
            };
        }]);

}());

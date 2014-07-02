/*global angular: true, appInsights: true */


(function () {
    "use strict";

    angular.module('angular-appinsights', [])
        .provider('insights', function () {

            this.start = function (appId) {

                if (appInsights) {
                    appInsights.start(appId);
                }

            };

            function Insights () {

                this.logEvent = function (event, properties, property) {

                    if (appInsights) {
                        appInsights.logEvent(event, properties, property);
                    }

                };

                this.logPageView = function (page) {

                    if (appInsights) {
                        appInsights.logPageView(page);
                    }

                };

            }

            this.$get = function() {
                return new Insights();
            };

        })
        .run(function($rootScope, $route, $location, insights) {
            $rootScope.$on('$locationChangeStart', function() {

                insights.logPageView($location.path());

            });
        });

}());

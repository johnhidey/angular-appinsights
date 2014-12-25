(function () {
    "use strict";

    angular.module('angular-appinsights', [])

        .provider('insights', function () {

            var _appId,
                _appName;

            this.start = function (appId, appName) {

                _appId = appId;
                _appName = appName || '(Application Root)';

                if (appInsights && appId && appInsights.start) {
                    appInsights.start(appId);
                }
                if (appInsights && appId && !appInsights.start) {
                    appInsights = appInsights({ instrumentationKey: appId });
                }

            };

            function Insights() {

                var _logEvent = function (event, properties, property) {

                    if (appInsights && _appId && appInsights.logEvent) {
                        appInsights.logEvent(event, properties, property);
                    }
                    if (appInsights && _appId && appInsights.trackEvent) {
                        appInsights.trackEvent(event, properties, property);
                    }

                },

                _logPageView = function (page) {

                    if (appInsights && _appId && appInsights.logPageView) {
                        appInsights.logPageView(page);
                    }
                    if (appInsights && _appId && appInsights.trackPageView) {
                        appInsights.trackPageView(page);
                    }

                },

                _logException = function (exception) {
                    
                    if (appInsights && appInsights.trackException) {
                        appInsights.trackException(exception);
                    }
                };

                return {
                    'logEvent': _logEvent,
                    'logPageView': _logPageView, 
                    'logException': _logException,
                    'appName': _appName
                };

            }

            this.$get = function () {
                return new Insights();
            };

        })
		//this configures 
        .config(function ($provide) {
            $provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
                return function (exception, cause) {
                    // Calls the original $exceptionHandler.
                    $delegate(exception, cause);
                   
                    //if application insights is loaded and supports trackException execute it.
                    if (appInsights && appInsights.config.instrumentationKey && appInsights.trackException) {
                        appInsights.trackException(exception);
                    }
                    
                };
            }]);
        })
        .run(function ($rootScope, $route, $location, insights) {
            $rootScope.$on('$locationChangeSuccess', function () {
                var pagePath;
                try {
                    pagePath = $location.path().substr(1);
                    pagePath = insights.appName + '/' + pagePath;
                }
                finally {
                    insights.logPageView(pagePath);
                }
            });
        });

}());
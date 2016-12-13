/*! angular-appinsights - v0.0.3 - 2016-12-12
* https://github.com/johnhidey/angular-appinsights#readme
* Copyright (c) 2016 ; Licensed  */
(function () {
    "use strict";

    angular.module('angular-appinsights', [])
        .provider('insights', InsightsProvider)
        .run(['$rootScope', '$location', 'insights', onAppRun]);

    var _appName = '';
    var _stub = {
        startTrackPage: angular.noop,
        stopTrackPage: angular.noop,
        trackPageView: angular.noop,
        startTrackEvent: angular.noop,
        stopTrackEvent: angular.noop,
        trackEvent: angular.noop,
        trackDependency: angular.noop,
        trackException: angular.noop,
        trackMetric: angular.noop,
        trackTrace: angular.noop,
        flush: angular.noop,
        setAuthenticatedUserContext: angular.noop,
        clearAuthenticatedUserContext: angular.noop,
    };

    function InsightsProvider() {

        this.start = function (appId, appName) {

            var options;
            if (angular.isObject(appId)) {
                options = appId;
            } else if (angular.isString(appId)) {
                options = {
                    appId: appId,
                    appName: appName
                };
            }

            initialize(options);
        };

        this.$get = function () {
            return window.appInsights || _stub;
        };

        function initialize(options) {

            _appName = options.appName || '(Application Root)';

            if (options.appId) {
                if (window.appInsights.start) {
                    window.appInsights.start(options.appId);
                } else if (angular.isFunction(window.appInsights)) {
                    window.appInsights = window.appInsights({ instrumentationKey: options.appId });
                } else if (window.appInsights.config) {
                    window.appInsights.config.instrumentationKey = options.appId;
                }
            }

            if (!window.appInsights.config.instrumentationKey) {
                console.warn('Application Insights not initialized');
            }
        }
    }

    function onAppRun($rootScope, $location, insights) {

        $rootScope.$on('$locationChangeStart', function () {
            var pagePath;
            try {
                pagePath = _appName + '/' + $location.path().substr(1);
            }
            finally {
                insights.startTrackPage(pagePath);
            }
        });

        $rootScope.$on('$locationChangeSuccess', function (e, newUrl) {
            var pagePath;
            try {
                pagePath = _appName + '/' + $location.path().substr(1);
            }
            finally {
                insights.stopTrackPage(pagePath, newUrl);
            }
        });
    }

} ());

/*global angular: true, appInsights: true */
(function() {
    "use strict";

    function appInsightProvider() {
        var insights;

        this.start = function(appId, appName) {
            insights.start(appId, appName);
        };

        this.$get = function() {
            insights = new insightsFactory();
            return insights;
        };
    }

    bootstrapInsights.$inject = ['$rootScope', '$route', '$location', 'insights'];

    function bootstrapInsights($rootScope, $route, $location, insights) {
        $rootScope.$on('$locationChangeSuccess', function() {
            var pagePath;
            try {
                pagePath = $location.path().substr(1);
                pagePath = insights.appName + '/' + pagePath;
            } finally {
                insights.logPageView(pagePath);
            }
        });
    }

    function insightsFactory() {
        var _appId,
            _appUserId,
            _appName;

        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length > 1) return parts.pop().split(";").shift();
            return "";
        }

        function setCookie(name, value, days) {
            var d = new Date();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + "; " + expires;
        }

        function expireCookie(name) {
            document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        }

        this.logEvent = function(event, properties, property) {
            if (appInsights && _appId && appInsights.logEvent) {
                appInsights.logEvent(event, properties, property);
            }
            if (appInsights && _appId && appInsights.trackEvent) {
                appInsights.trackEvent(event, properties, property);
            }
        };

        this.logPageView = function(page) {
            if (appInsights && _appId && appInsights.logPageView) {
                appInsights.logPageView(page);
            }
            if (appInsights && _appId && appInsights.trackPageView) {
                appInsights.trackPageView(page);
            }
        };

        this.setUserId = function(appUserId) {
            _appUserId = appUserId;

            if (!appInsights) {
                return;
            }

            var currentUserId = getCookie("ai_user");
            if (currentUserId !== appUserId) {
                expireCookie("ai_user");
                expireCookie("ai_session");

                if (appInsights.context && appInsights.context.user) {
                    appInsights.context.user.id = appInsights.context.user.authUserId = appUserId;
                }
            }
        };

        this.start = function(appId, appName) {
            _appId = appId;
            _appName = appName || '(Application Root)';

            if (appInsights && appId && appInsights.start) {
                appInsights.start(appId);
            }
            if (appInsights && appId && !appInsights.start) {
                appInsights = appInsights({
                    instrumentationKey: appId
                });
            }
        };
    }

    angular.module('angular-appinsights', [])
        .provider('insights', appInsightProvider)
        .run(bootstrapInsights);
}());

Angular-AppInsights
===================

Angular-AppInsights is an angular module for using Microsoft's Application Insights within a SPA (Single Page Application).

Usage
===================
Include the following script tag 

```HTML
<script type="text/javascript" src="angular-appinsights.js"></script>
```

on your SPA shell page (perferrably at the bottom of the `<body>`).  Now all we need to do is initialize the `angular-appinsights `
module and we're done.  The best place to initialize `angular-appinsights` is in your application bootstrap.  Below is sample of 
what this might look like. Make sure to take note that the application now has a dependency on `angular-appinsights`.

```JavaScript
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
        insightsProvider.start('Application Insights Application Id');
    }])
```
  
You angular application will now log all page views defined by subscribing to the event `locationChangeSuccess` within angular.
You're up and logging page views now.  

To log custom events you just need to have a dependency on `insights` and Angular's DI will deliver you the object.  From there it is 
pretty simple.  You will call `insights.logEvent()` passing your event data.  For a complete definition of the method please refer to
Microsoft's document on [logEvent](http://msdn.microsoft.com/en-us/library/dn614099.aspx).  You can also log page views by calling
`insights.logPageView()`. For a complete definition of the method please refer to Microsoft's document on
[logPageView](http://msdn.microsoft.com/en-us/library/dn614096.aspx). Below is a sample where the `page1Controller` is logging it's activation. 

```JavaScript
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
        insightsProvider.start('Application Insights Application Id');

    }])
    .controller('page1Controller', ['$scope', 'insights', function($scope, insights) {

        insights.logEvent('Page 1 Controller Activated');

    }]);
```
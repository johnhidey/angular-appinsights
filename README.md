Angular-AppInsights
===================

Angular-AppInsights is an angular module for using Microsoft's Application Insights within a SPA (Single Page Application).

Usage
===================
Include the following script tag 

```<script type="text/javascript" src="angular-appinsights.js"></script>```  

on your SPA shell page (perferrably at the bottom of the of body).  Now all we need to do is initialize the angular-appinsights 
module and we're done.  The best place to initialize angular-appinsights is in your application bootstrap.  Below is sample of 
what this might look like.  

```
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

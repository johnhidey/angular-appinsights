[![Stories in Ready](https://badge.waffle.io/johnhidey/angular-appinsights.png?label=ready&title=Ready)](https://waffle.io/johnhidey/angular-appinsights)
[![Stories in Progress](https://badge.waffle.io/johnhidey/angular-appinsights.png?label=in%20progress&title=In%20Progress)](https://waffle.io/johnhidey/angular-appinsights)
Angular-AppInsights
===================

Angular-AppInsights is an angular module for using Microsoft's Application Insights within a SPA (Single Page Application).

## Usage
Get your regular Microsoft's Application Insights
```HTML
<!--
To collect end-user usage analytics about your application,
insert the following script into each page you want to track.
Place this code immediately before the closing </head> tag,
and before any other scripts. Your first data will appear
automatically in just a few seconds.
-->
<script type="text/javascript">
    var appInsights=window.appInsights||function(config){
    function i(config){t[config]=function(){var i=arguments;t.queue.push(function(){t[config].apply(t,i)})}}var t={config:config},u=document,e=window,o='script',s='AuthenticatedUserContext',h='start',c='stop',l='Track',a=l+'Event',v=l+'Page',y=u.createElement(o),r,f;y.src=config.url||'https://az416426.vo.msecnd.net/scripts/a/ai.0.js';u.getElementsByTagName(o)[0].parentNode.appendChild(y);try{t.cookie=u.cookie}catch(p){}for(t.queue=[],t.version='1.0',r=['Event','Exception','Metric','PageView','Trace','Dependency'];r.length;)i('track'+r.pop());return i('set'+s),i('clear'+s),i(h+a),i(c+a),i(h+v),i(c+v),i('flush'),config.disableExceptionTracking||(r='onerror',i('_'+r),f=e[r],e[r]=function(config,i,u,e,o){var s=f&&f(config,i,u,e,o);return s!==!0&&t['_'+r](config,i,u,e,o),s}),t
    }({
        instrumentationKey:"your key here"//<-- optionally remove this to apply in 'start'. See 'Note' below
    });
    
    window.appInsights=appInsights;
    appInsights.trackPageView(); //<-- remove this
</script>
```

You tag should look like this when modified:
```HTML
<!--
To collect end-user usage analytics about your application,
insert the following script into each page you want to track.
Place this code immediately before the closing </head> tag,
and before any other scripts. Your first data will appear
automatically in just a few seconds.
-->
<script type="text/javascript">
    var appInsights=window.appInsights||function(config){
    function i(config){t[config]=function(){var i=arguments;t.queue.push(function(){t[config].apply(t,i)})}}var t={config:config},u=document,e=window,o='script',s='AuthenticatedUserContext',h='start',c='stop',l='Track',a=l+'Event',v=l+'Page',y=u.createElement(o),r,f;y.src=config.url||'https://az416426.vo.msecnd.net/scripts/a/ai.0.js';u.getElementsByTagName(o)[0].parentNode.appendChild(y);try{t.cookie=u.cookie}catch(p){}for(t.queue=[],t.version='1.0',r=['Event','Exception','Metric','PageView','Trace','Dependency'];r.length;)i('track'+r.pop());return i('set'+s),i('clear'+s),i(h+a),i(c+a),i(h+v),i(c+v),i('flush'),config.disableExceptionTracking||(r='onerror',i('_'+r),f=e[r],e[r]=function(config,i,u,e,o){var s=f&&f(config,i,u,e,o);return s!==!0&&t['_'+r](config,i,u,e,o),s}),t
    }({});
    window.appInsights=appInsights;
</script>
```

**Note**: You can apply other settings here for application insights if you choose. See the Microsoft documentation for [IConfig](https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#config) for possible parameters.

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

## API

### start(appId, appName)

Initializes the Application Insights object with default settings using the provided `appId` and optional `appName`.

`appId` (string) - The key of your Application Insights resource in Azure.
`appName` (string) - *Optional.* Text that is prepended to the path information when the angular page is changed. **Default:** `(Application Root)`

#### Example

```JavaScript
insightsProvider.start('00000000-0000-0000-0000-000000000000', 'MyApp');
```

### start(options)

Initializes the Application Insights object with settings applied from an options object.

#### Example

```JavaScript
var options = {
    appId: '00000000-0000-0000-0000-000000000000',
    appName: 'MyApp'
};
insightsProvider.start(options);
```

##Change Log
Please see [`CHANGELOG.md`](CHANGELOG.md)

##License
MIT. Please see [`LICENSE`](LICENSE)

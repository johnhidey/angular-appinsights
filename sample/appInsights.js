(function () {
    window.appInsights={queue:[],applicationInsightsId:null,accountId:null,appUserId:null,configUrl:null,start:function(n){function u(n){t[n]=function(){var i=arguments;t.queue.push(function(){t[n].apply(t,i)})}}function f(n,t){if(n){var u=r.createElement(i);u.type="text/javascript";u.src=n;u.async=!0;u.onload=t;u.onerror=t;r.getElementsByTagName(i)[0].parentNode.appendChild(u)}else t()}var r=document,t=this,i;t.applicationInsightsId=n;u("logEvent");u("logPageView");i="script";f(t.configUrl,function(){f("//az416426.vo.msecnd.net/scripts/ai.0.js")});t.start=function(){}}};
}());


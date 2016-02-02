var angular = require('angular');
var appConfig = require('./app.config');

angular.module(appConfig.name, [])
    .run(function() {
        console.log('Angular running');
    });

angular.bootstrap(document, [appConfig.name]);
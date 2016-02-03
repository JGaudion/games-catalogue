var angular = require('angular');
var uiRouter = require('angular-ui-router');

var app = angular.module('SLGames', [uiRouter]);

require('../routes')(app);

module.exports = app;
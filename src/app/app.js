var angular = require('angular');
var uiRouter = require('angular-ui-router');

var app = angular.module('SLGames', [uiRouter]);

require('../routes')(app);
require('../navbar')(app);

module.exports = app;
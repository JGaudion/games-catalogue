var angular = require('angular');
var uiRouter = require('angular-ui-router');

var app = angular.module('GamesCatalogue', [uiRouter]);

require('../routes')(app);
require('../navbar')(app);

module.exports = app;
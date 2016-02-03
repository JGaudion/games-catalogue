module.exports = function(app) {
    app.config(routes);

    routes.$inject = ['$stateProvider', '$locationProvider'];
    function routes($stateProvider, $locationProvider) {
        $stateProvider
            .state('app', {
                template: require('../app/app.html')
            })
            .state('app.home', {
                url: '/',
                template: require('../home/home.html')
            })
            .state('app.games', {
                url: '/games',
                template: require('../games/games.html'),
                controller: 'GamesController',
                controllerAs: 'games'
            });

        $locationProvider.html5Mode(true);
    }
};
module.exports = function(module) {
    module.factory('gamesService', gamesService);

    gamesService.$inject = ['$http', 'config'];
    function gamesService($http, config) {
        return {
            getGames: getGames
        };

        function getGames() {
            return $http.get(config.endpoint + 'games')
                .then(function(res) {
                    return res.data;
                });
        }
    }
};
module.exports = function(module) {
    module.factory('gamesService', gamesService);

    gamesService.$inject = ['$http', '$q', 'config'];
    function gamesService($http, $q, config) {
        return {
            getGames: getGames
        };

        function getGames() {
            return $http.get(config.endpoint + 'games')
                .then(function(res) {
                    return res.data;
                })
                .catch(function(res) {
                    return $q.reject(res.data);
                });
        }
    }
};
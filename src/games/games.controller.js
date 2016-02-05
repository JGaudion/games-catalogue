module.exports = function(app) {
    app.controller('GamesController', GamesController);

    GamesController.$inject = ['$q', '_', 'gamesService'];
    function GamesController($q, _, gamesService) {
        var games = this;
        games.list = [];
        games.exist = exist;
        games.error = null;
        games.loaded = false;

        activate();

        function activate() {
            gamesService.getGames()
                .then(setGames)
                .catch(setError)
                .finally(setLoaded);
        }

        function exist() {
            return games.list.length > 0;
        }

        function setGames(_games_) {
            if(!_.isArray(_games_)) {
                return $q.reject('Games incorrectly formatted');
            }

            games.list = _games_;
        }

        function setError(error) {
            games.error = error;
        }

        function setLoaded() {
            games.loaded = true;
        }
    }
};
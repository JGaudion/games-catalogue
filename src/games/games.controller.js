module.exports = function(app) {
    app.controller('GamesController', GamesController);

    function GamesController() {
        var games = this;
        games.list = [];
        games.exist = exist;

        activate();

        function activate() {
            // TODO: Games service to get list
        }

        function exist() {
            return games.list.length > 0;
        }
    }
};
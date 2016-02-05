var path = require('path');
var express = require('express');
var serverConfig = require('./server.conf.js');

var app = express();
var gamesRouter = require('./games/games.router.js');

app.use(express.static('dist'));
app.use('/api/games', gamesRouter);
app.get('*', function(req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

app.listen(serverConfig.port);

module.exports = {
    setGames: setGames
};

function setGames(games) {
    require('./games/model').games = games;
}
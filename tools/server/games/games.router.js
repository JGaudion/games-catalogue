var express = require('express');

var gamesRouter = express.Router();
gamesRouter.route('/')
    .get(function(req, res) {
        var games = require('./model').games;
        res.json(games);
    });

module.exports = gamesRouter;
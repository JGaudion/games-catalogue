var express = require('express');

var gamesRouter = express.Router();
gamesRouter.route('/')
    .get(function(req, res) {
        var games = require('./model').games;

        if(games) {
            res.json(games);
        } else {
            res.status(404).send('Failed to retrieve games.');
        }
    });

module.exports = gamesRouter;
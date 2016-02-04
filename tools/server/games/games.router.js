var express = require('express');

var gamesRouter = express.Router();
gamesRouter.route('/')
    .get(function(req, res) {
        res.json([
            { name: 'Catan' },
            { name: 'Ticket to Ride' },
            { name: '7 Wonders' }
        ]);
    });

module.exports = gamesRouter;
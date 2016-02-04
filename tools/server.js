var path = require('path');
var express = require('express');
var serverConfig = require('./server.conf');

var app = express();

app.use(express.static('dist'));
app.get('*', function(req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

app.listen(serverConfig.port);
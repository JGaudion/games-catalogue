module.exports = function(app) {
    require('./games.controller')(app);
    require('./games.service')(app);
};
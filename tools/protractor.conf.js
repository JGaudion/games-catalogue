exports.config = {
    baseUrl: require('./server/server-address'),
    onPrepare: function() {
        global.server = require('./server/server');
    },
    specs: ['e2e/tests/**/*.spec.js']
};
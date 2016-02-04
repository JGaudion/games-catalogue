exports.config = {
    baseUrl: require('./server-address'),
    onPrepare: function() {
        global.server = require('./server');
    },
    specs: ['e2e/tests/**/*.spec.js']
};
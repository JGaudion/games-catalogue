var serverAddress = require('./server-address');

exports.config = {
    specs: ['e2e/tests/**/*.spec.js'],
    baseUrl: serverAddress
};
var serverAddress = require('./server-address');

describe('Test', function() {
    it('should load home page', function() {
        // When angular exists: browser.get(serverAddress);
        browser.driver.get(serverAddress);

        browser.sleep(2000);
    });
});
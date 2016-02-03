var homePage = require('../pages/home.page');

describe('Home', function() {
    it('heading should exist', headingShouldExist);

    function headingShouldExist() {
        homePage.navigate();

        expect(homePage.heading).toEqual('Games Catalogue');
    }
});
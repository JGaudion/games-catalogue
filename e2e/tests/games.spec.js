var gamesPage = require('../pages/games.page');

describe('Games', function() {
    it('heading should exist', headingShouldExist);

    function headingShouldExist() {
        gamesPage.navigate();

        expect(gamesPage.heading).toEqual('Games');
    }
});
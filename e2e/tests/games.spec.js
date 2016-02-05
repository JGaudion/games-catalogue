var gamesPage = require('../pages/games.page');

describe('Games', function() {
    it('heading should exist', function() {
        gamesPage.navigate();

        expect(gamesPage.heading).toEqual('Games');
    });

    it('should list the games', function() {
        server.setGames([
            { name: 'g1' },
            { name: 'g2' },
            { name: 'g3' }
        ]);
        gamesPage.navigate();

        expect(gamesPage.games).toEqual(['g1', 'g2', 'g3']);
    });
});
describe('GamesController', function() {
    beforeEach(module('GamesCatalogue'));

    var games;
    beforeEach(inject(function($controller){
        games = $controller('GamesController');
    }));

    it('initalises list to empty array', listIsEmpty);

    describe('exist()', function() {
        it('returns false when list is empty', returnsFalse);
        it('returns true when list is not empty', returnsTrue);

        function returnsFalse() {
            games.list = [];

            expect(games.exist()).toEqual(false);
        }

        function returnsTrue() {
            games.list = ['a'];

            expect(games.exist()).toEqual(true);
        }
    });

    function listIsEmpty() {
        expect(games.list).toEqual([]);
    }
});
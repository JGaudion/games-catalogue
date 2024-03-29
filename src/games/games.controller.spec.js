describe('GamesController', function() {
    beforeEach(module('GamesCatalogue'));

    var gamesService;
    beforeEach(module(function($provide) {
        gamesService = jasmine.createSpyObj('gamesService', ['getGames']);
        $provide.value('gamesService', gamesService);
    }));

    var $rootScope;
    var $q;
    var $controller;
    beforeEach(inject(function(_$rootScope_, _$q_, _$controller_) {
        $rootScope = _$rootScope_;
        $q = _$q_;
        $controller = _$controller_;
    }));

    describe('initially', function() {
        beforeEach(function() {
            createController();
        });

        it('sets list to empty array', function() {
            expect(games.list).toEqual([]);
        });

        it('sets error to null', function() {
            expect(games.error).toBeNull();
        });

        it('sets loaded to false', function() {
            expect(games.loaded).toEqual(false);
        });
    });

    it('sets list', function() {
        var gamesList = ['game1', 'game2'];

        createController({ gamesList: gamesList });
        $rootScope.$digest();

        expect(games.list).toEqual(gamesList);
    });

    it('set loaded to true', function() {
        createController();
        $rootScope.$digest();

        expect(games.loaded).toEqual(true);
    });

    describe('error', function() {
        it('is set when returned games list is not an array', function() {
            createController();
            $rootScope.$digest();

            expect(games.error).not.toBeNull();
        });

        it('is set when a rejected promise is returned', function() {
            var error = 'This is an error';

            createController({ error: error });
            $rootScope.$digest();

            expect(games.error).toEqual(error);
        });

        it('is not set when returned games list is an array', function() {
            createController({ gamesList: []});
            $rootScope.$digest();

            expect(games.error).toBeNull();
        });
    });

    describe('exist()', function() {
        beforeEach(function() {
            createController();
        });

        it('returns false when list is empty', function() {
            games.list = [];

            expect(games.exist()).toEqual(false);
        });

        it('returns true when list is not empty', function() {
            games.list = ['a'];

            expect(games.exist()).toEqual(true);
        });
    });

    var games;
    function createController(config) {
        config = config || {};

        if(config.error) {
            gamesService.getGames.and.returnValue($q.reject(config.error));
        } else {
            gamesService.getGames.and.returnValue($q.when(config.gamesList));
        }

        games = $controller('GamesController');
    }
});
describe('navbar', function() {
    beforeEach(module('GamesCatalogue'));

    var $location;
    beforeEach(module(function($provide) {
        $location = jasmine.createSpyObj('$location', ['url']);
        $provide.value('$location', $location);
    }));

    var $rootScope;
    var $compile;
    beforeEach(inject(function(_$rootScope_, _$compile_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));

    var navbar;
    beforeEach(function() {
        var element = $compile('<gc-navbar></gc-navbar>')($rootScope);
        $rootScope.$digest();

        navbar = element.controller('gcNavbar');
    });

    describe('home', function() {
        it('is active when url is /', isActive);
        it('is not active when url is not /', isNotActive);

        function isActive() {
            $location.url.and.returnValue('/');

            expect(navbar.homeIsActive()).toEqual(true);
        }

        function isNotActive() {
            $location.url.and.returnValue('abc');

            expect(navbar.homeIsActive()).toEqual(false);
        }
    });

    describe('games', function() {
        it('is active when url is /games', isActive);
        it('is not active when url is not /games', isNotActive);

        function isActive() {
            $location.url.and.returnValue('/games');

            expect(navbar.gamesIsActive()).toEqual(true);
        }

        function isNotActive() {
            $location.url.and.returnValue('def');

            expect(navbar.gamesIsActive()).toEqual(false);
        }
    });
});
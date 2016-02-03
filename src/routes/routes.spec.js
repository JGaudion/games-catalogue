describe('routes', function() {
    beforeEach(module('SLGames'));

    var $rootScope;
    var $location;
    var $state;
    beforeEach(inject(function(_$rootScope_, _$location_, _$state_) {
        $rootScope = _$rootScope_;
        $location = _$location_;
        $state = _$state_;
    }));

    it('navigates to home state', navigatesHome);
    it('navigates to games state', navigatesGames);

    function navigateTo(url) {
        $location.path(url);
        $rootScope.$apply();
    }

    function navigatesHome() {
        navigateTo('/');

        expect($state.current.name).toEqual('app.home');
    }

    function navigatesGames() {
        navigateTo('/games');

        expect($state.current.name).toEqual('app.games');
    }
});
describe('gamesService', function() {
    beforeEach(module('GamesCatalogue'));

    beforeEach(module(function($provide) {
        $provide.value('config', {
            endpoint: 'endpoint/'
        });
    }));

    var $httpBackend;
    var gamesService;
    beforeEach(inject(function(_$httpBackend_, _gamesService_) {
        $httpBackend = _$httpBackend_;
        gamesService = _gamesService_;
    }));

    describe('getGames', function() {
        var request;
        beforeEach(function() {
            request = $httpBackend.expectGET('endpoint/games');
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('returns data on success', function() {
            request.respond('success');

            var data;
            gamesService.getGames()
                .then(function(_data_) {
                    data = _data_;
                });
            $httpBackend.flush();

            expect(data).toEqual('success');
        });

        it('returns error on fail', function() {
            request.respond(401, 'error');

            var error;
            gamesService.getGames()
                .catch(function(_error_) {
                    error = _error_;
                });
            $httpBackend.flush();

            expect(error).toEqual('error');
        });
    });
});
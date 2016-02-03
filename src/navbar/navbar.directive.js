module.exports = function(app) {
    app.directive('gcNavbar', navbar);

    navbar.$inject = ['$location'];
    function navbar($location) {
        return {
            restrict: 'E',
            template: require('./navbar.directive.html'),
            controller: navbarController,
            controllerAs: 'navbar',
            bindToController: true
        };

        function navbarController() {
            var navbar = this;
            navbar.homeIsActive = homeIsActive;
            navbar.gamesIsActive = gamesIsActive;

            function homeIsActive() {
                return $location.url() === '/';
            }

            function gamesIsActive() {
                return $location.url() === '/games';
            }
        }
    }
};
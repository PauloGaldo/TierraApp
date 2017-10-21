(function () {
    'use strict';

    angular
            .module('tierra.code.sidenav')
            .controller('SidenavCtrl', SidenavCtrl);

    SidenavCtrl.$inject = ['$scope', 'TierraService', '$state', '$rootScope'];

    function SidenavCtrl($scope, TierraService, $state, $rootScope) {
        var vm = this;
        vm.user = null;
        vm.goToProfile = goToProfile;

        /**
         * Evento lanzado al terminar la carga del template desde ui.router
         */
        $scope.$on('$viewContentLoaded', function () {
            startSidenav();
        });


        function startSidenav() {
            var token = angular.fromJson(localStorage.getItem('token'));
            TierraService
                    .userDetails(token.access_token)
                    .then(function (response) {
                        vm.user = response.data;
                        console.log(response.data);
                    });
        }

        function goToProfile(user_id) {
            $rootScope.$broadcast('$closeSidenav');
            $state.go('home.profile', {user_id: user_id});
        }

    }

})();



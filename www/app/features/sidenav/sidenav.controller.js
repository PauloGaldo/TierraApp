(function () {
    'use strict';

    angular
            .module('tierra.code.sidenav')
            .controller('SidenavCtrl', SidenavCtrl);

    SidenavCtrl.$inject = ['$scope', 'TierraService', '$state', '$rootScope', 'User'];

    function SidenavCtrl($scope, TierraService, $state, $rootScope, User) {
        var vm = this;
        vm.user = null;
        vm.goToProfile = goToProfile;

        /**
         * Evento lanzado al terminar la carga del template desde ui.router
         */
        $scope.$on('$viewContentLoaded', function () {
            vm.user = User.data;
        });

        function goToProfile(user_id) {
            $rootScope.$broadcast('$closeSidenav');
            $state.go('home.profile', {user_id: user_id});
        }

    }

})();



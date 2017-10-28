(function () {
    'use strict';

    angular
            .module('tierra.code.user')
            .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['$scope', 'User'];

    function UserCtrl($scope, User) {
        var vm = this;
        vm.user = null;
        vm.barcode = null;
        vm.userLogged = null;

        /**
         * Evento lanzado al terminar la carga del template desde ui.router
         */
        $scope.$on('$viewContentLoaded', function () {
            vm.userLogged = User.data;
        });
    }

})();
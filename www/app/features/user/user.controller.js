(function () {
    'use strict';

    angular
            .module('tierra.code.user')
            .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['$scope', 'TierraService'];

    function UserCtrl($scope, TierraService) {
        var vm = this;
        vm.user = null;

        /**
         * Evento lanzado al terminar la carga del template desde ui.router
         */
        $scope.$on('$viewContentLoaded', function () {
            showUserDetails();
        });


        function showUserDetails() {
            var token = angular.fromJson(localStorage.getItem('token'));
            TierraService
                    .userDetails(token.access_token)
                    .then(function (response) {
                        vm.user = response.data;
                        console.log(response.data);
                    });
        }

    }

})();

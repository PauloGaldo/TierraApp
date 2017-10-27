(function () {
    'use strict';

    angular
        .module('tierra.code.user')
        .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['$scope', 'TierraService', '$cordovaBarcodeScanner', 'User'];

    function UserCtrl($scope, TierraService, $cordovaBarcodeScanner, User) {
        var vm = this;
        vm.user = null;
        vm.barcode = null;
        vm.userLogged = null;

        /**
         * Evento lanzado al terminar la carga del template desde ui.router
         */
        $scope.$on('$viewContentLoaded', function () {
//            scanBarcode();
            vm.userLogged = User.data;
        });


        function showUserDetails() {
            
        }

        function scanBarcode() {
            $cordovaBarcodeScanner
                .scan()
                .then(function (barcodeData) {
                    console.log(barcodeData);
                    vm.barcode = barcodeData;
                }, function (error) {
                    console.log(error);
                    vm.barcode = error;
                    // An error occurred
                });
        }

    }

})();
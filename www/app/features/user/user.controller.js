(function () {
    'use strict';

    angular
        .module('tierra.code.user')
        .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['$scope', 'TierraService', '$cordovaBarcodeScanner'];

    function UserCtrl($scope, TierraService, $cordovaBarcodeScanner) {
        var vm = this;
        vm.user = null;
        vm.barcode = null;

        /**
         * Evento lanzado al terminar la carga del template desde ui.router
         */
        $scope.$on('$viewContentLoaded', function () {
            showUserDetails();
            scanBarcode();
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
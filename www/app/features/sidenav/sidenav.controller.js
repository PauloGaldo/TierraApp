(function () {
    'use strict';

    angular
            .module('tierra.code.sidenav')
            .controller('SidenavCtrl', SidenavCtrl);

    SidenavCtrl.$inject = ['$scope', 'TierraService', '$state', '$rootScope', 'User', 'toaster', '$cordovaBarcodeScanner', ];

    function SidenavCtrl($scope, TierraService, $state, $rootScope, User, toaster, $cordovaBarcodeScanner) {
        var vm = this;
        vm.user = null;
        vm.goToProfile = goToProfile;
        vm.scanBarcode = scanBarcode;

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

        function scanBarcode() {
            $cordovaBarcodeScanner
                    .scan()
                    .then(function (barcode) {
                        $rootScope.$broadcast('$closeSidenav');
                        console.log(barcode);
                        TierraService
                                .searchProductByBarcode(barcode.text)
                                .then(function (response) {
                                    console.log(response);
                                    if (response.status === 200) {
                                        if (response.data.length > 1) {

                                        } else if (response.data.length === 1) {
                                            $state.transitionTo('home.product', {id: response.data[0].idProducto.idProducto});
                                        } else {
                                            toaster.pop({
                                                type: 'error',
                                                title: 'Error',
                                                body: 'No se ha encontrado el producto',
                                                showCloseButton: false
                                            });
                                        }
                                    }
                                });
                    }, function (error) {
                        console.log(error);
                        toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: 'No se ha encontrado el producto',
                            showCloseButton: false
                        });
                    });
        }


    }

})();



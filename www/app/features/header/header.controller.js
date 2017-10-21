(function () {
    'use strict';

    angular
            .module('tierra.code.header')
            .controller('HeaderCtrl', HeaderCtrl);

    HeaderCtrl.$inject = ['$mdSidenav', '$scope'];

    function HeaderCtrl($mdSidenav, $scope) {
        var vm = this;
        vm.showSidenav = showSidenav;
        vm.closeSidenav = closeSidenav;
        
        /**
         * Evento lanzado al terminar la carga del template desde ui.router
         */
        $scope.$on('$closeSidenav', function () {
            closeSidenav();
        });

        function showSidenav() {
            $mdSidenav('left')
                    .open()
                    .then(function () {
                        console.debug("toggle is done");
                    });
        }

        function closeSidenav() {
            $mdSidenav('left')
                    .close()
                    .then(function () {
                        console.debug("toggle is done");
                    });
        }

    }

})();
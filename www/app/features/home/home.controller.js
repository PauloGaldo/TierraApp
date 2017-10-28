(function () {
    'use strict';

    angular
            .module('tierra.code.home')
            .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$window', 'cfpLoadingBar'];

    function HomeCtrl($scope, $window, cfpLoadingBar) {
        var vm = this;
        /**
         * Evento lanzado al terminar la carga del template desde ui.router
         */

        StatusBar.backgroundColorByHexString('#689F38');
        $scope.$on('$viewContentLoaded', function () {
            console.log(StatusBar);
        });


    }

})();
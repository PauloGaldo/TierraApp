(function () {
    'use strict';

    angular
            .module('tierra.code.product')
            .controller('ProductCtrl', ProductCtrl);

    ProductCtrl.$inject = ['$scope', 'TierraService', '$state', '$stateParams'];

    function ProductCtrl($scope, TierraService, $state, $stateParams) {
        var vm = this;
        vm.item = null;
        vm.bc = {
            format: 'CODE128',
            lineColor: '#000000',
            width: 2,
            height: 140,
            displayValue: true,
            fontOptions: '',
            font: 'monospace',
            textAlign: 'center',
            textPosition: 'bottom',
            textMargin: 2,
            fontSize: 20,
            background: '#ffffff',
            margin: 0,
            marginTop: undefined,
            marginBottom: undefined,
            marginLeft: undefined,
            marginRight: undefined
        };
        /**
         * Evento lanzado al terminar la carga del template desde ui.router
         */
        $scope.$on('$viewContentLoaded', function () {
            loadProductById($stateParams.id);
        });

        function loadProductById(id) {
            TierraService
                    .searchProductById(id)
                    .then(function (response) {
                        console.log(response);
                        if (response.status === 200) {
                            vm.item = response.data;
                        } else {
                            $state.go('home');
                        }
                    });
        }

    }

})();
(function () {

    'use strict';

    angular
            .module('tierra.code.home')
            .run(run);

    run.$inject = ['$rootScope', '$state', '$window'];

    function run($rootScope, $state, $window) {

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            alert("root change success");
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            alert("root change start");
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            alert("root change error");
        });

    }

})();
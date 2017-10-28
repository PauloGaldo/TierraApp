(function () {
    'use strict';

    angular
            .module('tierra.code.login')
            .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['TierraService', '$state', '$scope', '$window', '$timeout', '$uiRouter'];

    function LoginCtrl(TierraService, $state, $scope, $window, $timeout, $uiRouter) {
        var vm = this;
        /*VARIABLES*/
        vm.form_login = {
            username: null,
            password: null
        };
        /*METHODS*/
        vm.loginUser = loginUser;

        $scope.$on('$viewContentLoaded', function () {
            $timeout(function () {
                console.log($window.statusBarAndroid);
                $window.statusBarAndroid.backgroundColorByHexString('#00A000');
            }, 500);
        });

        function loginUser(model, form) {
            angular.forEach(form.$$controls, function (field) {
                field.$setTouched();
            });
            if (form.$valid) {
                TierraService
                        .loginUser(model)
                        .then(function (response) {
                            console.log(response);
                            if (response.status === 200) {
                                localStorage.setItem('token', angular.toJson(response.data));
                                StatusBar.backgroundColorByHexString('#689F38');
                                $state.go('home');
                            }
                        });
            }
        }

    }

})();
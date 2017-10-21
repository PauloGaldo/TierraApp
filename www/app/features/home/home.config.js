(function () {
    'use strict';

    angular
            .module('tierra.code.home')
            .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        function auth($http, Constants) {
            $http({
                url: Constants.API_URL + 'oauth/token',
                method: 'POST',
                headers: {
                    'Authorization': 'Basic bmF0dXJhYXBwOjEyMzQ1Ng==',
                    'Content-type': 'application/json'
                },
                params: {
                    username: '',
                    password: '',
                    grant_type: 'password'
                }
            }).then(function successCallback(response) {
                localStorage.setItem('token', angular.toJson(response.data));
            }, function errorCallback(response) {
                localStorage.setItem('token', null);
            });
        }

        $stateProvider
                .state('home', {
                    url: '/',
                    resolve: {auth: auth},
                    views: {
                        'header': {
                            templateUrl: "app/features/header/header.html",
                            controller: 'HeaderCtrl',
                            controllerAs: 'header'
                        },
                        'body': {
                            templateUrl: "app/features/home/home.html",
                            controller: 'HomeCtrl',
                            controllerAs: 'home'
                        },
                        'sidenav': {
                            templateUrl: "app/features/sidenav/sidenav.html",
                            controller: 'SidenavCtrl',
                            controllerAs: 'sidenav'
                        }
                    }
                })
                .state('home.profile', {
                    url: 'profile/:user_id',
                    views: {
                        'content': {
                            templateUrl: "app/features/user/profile.html",
                            controller: 'UserCtrl',
                            controllerAs: 'user'
                        }
                    }
                });

        $urlRouterProvider.otherwise('/');

    }

})();
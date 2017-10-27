(function () {
    'use strict';

    angular
            .module('tierra.code.home')
            .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        function userDetails($http, $q, Constants) {
            var token = angular.fromJson(localStorage.getItem('token'));
            var deferred = $q.defer();
            $http({
                url: Constants.API_URL + 'usuarios/detail',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token.access_token,
                    'Content-type': 'application/json'
                }
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.resolve(null);
            });
            return deferred.promise;
        }

        $stateProvider
                .state('login', {
                    url: '/',
                    views: {
                        'header': {
                            templateUrl: null,
                            controller: null
                        },
                        'body': {
                            templateUrl: "app/features/login/login.html",
                            controller: 'LoginCtrl',
                            controllerAs: 'login'
                        },
                        'sidenav': {
                            templateUrl: "app/features/sidenav/sidenav.html",
                            controller: null
                        }
                    }
                })
                .state('home', {
                    url: '/home',
                    resolve: {User: userDetails},
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
                    resolve: {User: userDetails},
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
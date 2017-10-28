(function () {
    'use strict';

    angular
            .module('tierra.code.home')
            .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider'];

    function config($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {

        function userDetails($http, $q, Constants) {
            var token = angular.fromJson(localStorage.getItem('token'));
            var deferred = $q.defer();
            $http({
                url: Constants.API_URL + 'usuarios/detail',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-type': 'application/json'
                }
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.resolve(null);
            });
            return deferred.promise;
        }

        function authenticate($http, $state, Constants) {
            var token = angular.fromJson(localStorage.getItem('token'));
            $http({
                url: Constants.API_URL + 'usuarios/logged',
                method: 'post',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-type': 'application/json'
                }
            }).then(function successCallback(response) {
                /*nada por ahora*/
            }, function errorCallback(response) {
                if (response.status === 401) {
                    localStorage.clear();
                    $state.go('login');
                }
            });
        }

        $stateProvider
                .state('login', {
                    url: '/',
                    resolve: {
                        validate: function ($q, $state) {
                            if (localStorage.getItem('token')) {
                                $state.go('home');
                                return $q.reject('Theres already a token');
                            }
                        }
                    },
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
                    resolve: {
                        User: userDetails,
                        isAuth: authenticate
                    },
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
                    url: '/profile/:user_id',
                    resolve: {
                        User: userDetails,
                        isAuth: authenticate
                    },
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
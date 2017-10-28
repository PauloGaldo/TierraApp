(function () {
    'use strict';

    angular
            .module('tierra.code')
            .service('TierraService', TierraService);

    TierraService.$inject = ['$http', '$q', 'Constants'];

    function TierraService($http, $q, Constants) {

        this.loginUser = function (params) {
            var deferred = $q.defer();
            $http({
                url: Constants.API_URL + 'oauth/token',
                method: 'POST',
                headers: {
                    'Authorization': 'Basic bmF0dXJhYXBwOjEyMzQ1Ng==',
                    'Content-type': 'application/json'
                },
                params: {
                    username: params.username.trim(),
                    password: params.password.trim(),
                    grant_type: 'password'
                }
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.resolve(null);
            });
            return deferred.promise;
        };

        this.searchProductByBarcode = function (barcode) {
            var datosRecu = null;
            var deferred = $q.defer();
            $http({
                url: Constants.API_URL + 'producto/stock',
                method: 'POST',
                params: {
                    'barcode': barcode
                },
                headers: {
                    'Authorization': 'Bearer ' + angular.fromJson(localStorage.getItem('token')),
                    'Content-type': 'application/json'
                }
            }).then(function successCallback(response) {
                datosRecu = response;
                deferred.resolve(datosRecu);
            }, function errorCallback(response) {
                datosRecu = response;
                deferred.resolve(datosRecu);
            });
            return deferred.promise;
        };

        this.searchProductById = function (id) {
            var datosRecu = null;
            var deferred = $q.defer();
            $http({
                url: Constants.API_URL + 'producto/search',
                method: 'post',
                params: {
                    'id': id
                },
                headers: {
                    'Authorization': 'Bearer ' + angular.fromJson(localStorage.getItem('token')),
                    'Content-type': 'application/json'
                }
            }).then(function successCallback(response) {
                datosRecu = response;
                deferred.resolve(datosRecu);
            }, function errorCallback(response) {
                datosRecu = response;
                deferred.resolve(datosRecu);
            });
            return deferred.promise;
        }



    }

})();
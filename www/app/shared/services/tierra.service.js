(function () {
    'use strict';

    angular
            .module('tierra.code')
            .service('TierraService', TierraService);

    TierraService.$inject = ['$http', '$q', 'Constants'];

    function TierraService($http, $q, Constants) {

        this.userDetails = function (token) {
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
        };

    }

})();
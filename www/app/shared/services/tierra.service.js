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
        
        

    }

})();
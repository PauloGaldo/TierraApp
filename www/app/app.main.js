(function () {
    'use string';

    angular.module('tierra.code', [
        /*Librerias angular*/
        'ngAnimate',
        'ngAria',
        'ngMessages',
        'ngMaterial',
        'ngSanitize',
        /*Librerias de terceros*/
        'ui.router',
        'ngCordova',
        /*Medulos proyecto*/
        'tierra.code.home',
        'tierra.code.header',
        'tierra.code.sidenav',
        'tierra.code.user'
    ]);


})();
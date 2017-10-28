(function () {
    'use string';

    angular.module('tierra.code', [
        /*Librerias angular*/
        'ngAnimate',
        'ngAria',
        'ngMessages',
        'ngMaterial',
        'ngSanitize',
        'ngTouch',
        /*Librerias de terceros*/
        'ui.router',
        'ngCordova',
        'toaster',
        'angular-loading-bar',
        'anim-in-out',
        /*Medulos proyecto*/
        'tierra.code.home',
        'tierra.code.header',
        'tierra.code.sidenav',
        'tierra.code.user',
        'tierra.code.login'
    ]);


})();
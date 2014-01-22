/**
 * wrapper for the cordova service is ready test
 */
'use strict';

angular.module('phonegapAngularClientApp')
  .factory('cordovaReady', function ($rootScope) {

    var status = false;
    document.addEventListener('deviceready', function () {
      console.log('CORDOVA IS READY');
      $rootScope.$apply(function () {
        status = true;
      });
    }, false);

    return function () {
      return status;
    };
  });

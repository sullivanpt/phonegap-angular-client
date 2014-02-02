/**
 * wrapper for the cordova service is ready test.
 *
 * Usage:
 *   $scope.$watch(cordovaReady, function (newValue) {
 *     if (newValue) {
 *       $scope.phoneModel = $window.device.model;
 *     }
 *   });
 */
'use strict';

angular.module('phonegapAngularClientApp')
  .factory('cordovaReady', function ($rootScope, $timeout) {

    var status = false;
    document.addEventListener('deviceready', function () {
      console.log('Cordova deviceready received.');
      // deviceready is sometimes a direct callback if phonegap is already loaded (no $apply needed),
      // and is a DOM event if loaded in the future ($apply is needed).
      // Apparently the safe way to make sure it's always wrapped correctly is to use $timeout.
      // http://stackoverflow.com/a/18996042
      $timeout(function () {
        status = true;
        $rootScope.cordovaIsReady = true; // Provide a simplified global flag
      });
    }, false);

    return function () {
      return status;
    };
  });

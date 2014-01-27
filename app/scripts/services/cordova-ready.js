/**
 * wrapper for the cordova service is ready test.
 *
 * Usage:
 *   $scope.$watch(cordovaReady, function (newValue) {
 *   if (newValue) {
 *     $scope.phoneModel = $window.device.model;
 *     }
 *   });
 */
'use strict';

angular.module('phonegapAngularClientApp')
  .factory('cordovaReady', function ($rootScope) {

    var status = false;
    document.addEventListener('deviceready', function () {
      console.log('Cordova deviceready received.');
      $rootScope.$apply(function () {
        status = true;
        $rootScope.cordovaIsReady = true; // Provide a simplified global flag
      });
    }, false);

    return function () {
      return status;
    };
  });

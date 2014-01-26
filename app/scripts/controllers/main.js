'use strict';

angular.module('phonegapAngularClientApp')
  .controller('MainCtrl', function ($scope, cordovaReady, $window) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.$watch(cordovaReady, function (newValue) {
      if (newValue) {
        $scope.cordovaIsReady = true;
        $scope.phoneModel = $window.device.model;
      }
    });
  });

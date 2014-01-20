'use strict';

angular.module('phonegapAngularClientApp')
  .controller('MainCtrl', function ($scope, cordovaReady) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    cordovaReady(function () {
      $scope.apply(function () {
        $scope.cordovaIsReady = true;
      });
    });
  });

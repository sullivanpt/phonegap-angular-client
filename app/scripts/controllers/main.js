'use strict';

angular.module('phonegapAngularClientApp')
  .controller('MainCtrl', function ($scope, cordovaReady) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.cordovaReady = cordovaReady;
  });

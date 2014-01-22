'use strict';

angular.module('phonegapAngularClientApp')
  .controller('MainCtrl', function ($scope, cordovaReady, cordovaDevice) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.cordovaReady = cordovaReady;

    cordovaDevice(function (device) {
      $scope.phoneModel = device.model;
    });
  });

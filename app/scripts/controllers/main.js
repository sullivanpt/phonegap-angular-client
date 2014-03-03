'use strict';

angular.module('phonegapAngularClientApp')
  .controller('MainCtrl', function ($scope, cordovaReady, $window, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $http.get('version.json').success(function(version) {
      $scope.version = version;
    });

    $scope.$watch(cordovaReady, function (newValue) {
      if (newValue) {
        $scope.phoneModel = $window.device.model;
      }
    });
  });

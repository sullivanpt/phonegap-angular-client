'use strict';

angular.module('phonegapAngularClientApp')
  .directive('navbar', function () {
    return {
      templateUrl: 'views/navbar.html',
      restrict: 'E',
      controller: ['$scope', '$location', 'cordovaReady', function ($scope, $location, cordovaReady) {
        cordovaReady(); // bootstrap the event listener. TODO: change this to angular.run()

        $scope.isActive = function(route) {
          return route === $location.path();
        };
      }]
    };
  });

'use strict';

angular.module('phonegapAngularClientApp')
  .directive('navbar', function () {
    return {
      templateUrl: 'views/navbar.html',
      restrict: 'E',
      controller: ['$scope', '$location', function ($scope, $location) {
        $scope.isActive = function(route) {
          return route === $location.path();
        };
      }]
    };
  });

'use strict';

angular.module('phonegapAngularClientApp')
  .directive('navbar', function () {
    return {
      templateUrl: 'views/navbar.html',
      restrict: 'E',
      controller: ['$scope', '$location', 'cordovaReady', 'MeanSsoSession', function ($scope, $location, cordovaReady, MeanSsoSession) {
        cordovaReady(); // bootstrap the event listener. TODO: change this to angular.run()
        MeanSsoSession.ready(); // bootstrap the event listener. TODO: change this to angular.run()

        $scope.isActive = function(route) {
          return route === $location.path();
        };

        $scope.logout = function() {
          MeanSsoSession.logout();
          // Logged out, redirect to home
          $location.path('/');
        };
      }]
    };
  });

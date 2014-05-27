'use strict';

angular.module('phonegapAngularClientApp')
  .controller('LoginCtrl', function ($scope, $location, MeanSsoSession, config, errors) {
    $scope.config = config;
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        MeanSsoSession.resourceOwnerPasswordCredentials({
          username: $scope.user.username,
          password: $scope.user.password
        })
          .then( function() {
            // Logged in, redirect to home
            $location.path('/');
          })
          .catch( function(err) {
            $scope.errors = {};
            $scope.errors.other = errors.format(err);
          });
      }
    };
  });

'use strict';

angular.module('phonegapAngularClientApp')
  .controller('LoginCtrl', function ($scope, cordovaReady) {
    $scope.sso = { // hard coded meanSso configuration
      baseUrl: 'http://intense-brushlands-5559.herokuapp.com' // TODO: insist on SSL
    };

    $scope.$watch(cordovaReady, function (newValue) {
      if (newValue) {
        $scope.cordovaIsReady = true;
      }
    });
  });

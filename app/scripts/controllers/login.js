'use strict';

angular.module('phonegapAngularClientApp')
  .controller('LoginCtrl', function ($scope) {
    $scope.sso = { // hard coded meanSso configuration
      baseUrl: 'http://intense-brushlands-5559.herokuapp.com' // TODO: insist on SSL
    };
  });

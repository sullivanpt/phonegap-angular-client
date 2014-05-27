'use strict';

angular.module('phonegapAngularClientApp')
  .directive('footbar', function () {
    return {
      templateUrl: 'views/footbar.html',
      restrict: 'E'
    };
  });

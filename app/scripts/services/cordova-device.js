'use strict';

angular.module('phonegapAngularClientApp')
  .factory('cordovaDevice', function ($window) {
    return function (fn) {
      // TODO: defer this call until the device is ready
      fn($window.device || {
        model: 'Unknown'
      });
    };
  });

'use strict';

angular.module('phonegapAngularClientApp')
  .factory('cordovaDevice', function () {
    return function (fn) {
      // TODO: defer his call until the device is ready
      fn(window.device || {
        model: 'Unknown'
      });
    };
  });

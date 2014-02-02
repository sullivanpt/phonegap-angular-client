'use strict';

/*jshint camelcase: false */

angular.module('phonegapAngularClientApp')
  .factory('errors', function ($log) {
    return {
      format: function (err) {
        $log.debug('error: ' + JSON.stringify(err));
        return (err.data && (err.data.message || err.data.error_description || err.data)) || err.status || err;
      }
    };
  });

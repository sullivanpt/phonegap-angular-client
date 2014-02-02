'use strict';

// Implements: http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
// Usage: $http.post(url, data, formUrlEncoded)
angular.module('phonegapAngularClientApp')
  .constant('formUrlEncoded', {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function (data) {
      if (!data) {
        return data;
      }

      var s;
      for(var prop in data) {
        if(data.hasOwnProperty(prop) && !angular.isFunction(data[prop])) { // remove prototype methods and other extensions
          var e = data[prop] || ''; // null values as blank strings to prevent word 'null' in the output
          s = ((s && (s + '&')) || '') + encodeURIComponent(prop) + '=' + encodeURIComponent(e); // emulate: $.param(data, false);
        }
      }

      return s;
    }
  });

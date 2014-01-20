/**
 * This wrapper will queue up PhoneGap API calls if called before
 * deviceready and call them after deviceready fires. After deviceready
 * has been called, the API calls will occur normally.
 *
 * Usage:
 *   CordovaReady(fn, fnArgs);  // will invoke fn(fnArgs) when Cordova is ready
 *
 * See http://briantford.com/blog/angular-phonegap.html
 */
'use strict';

angular.module('phonegapAngularClientApp')
  .factory('cordovaReady', function () {
    return function (fn) {

      var queue = [];

      var impl = function () {
        queue.push(Array.prototype.slice.call(arguments));
      };

      document.addEventListener('deviceready', function () {
        queue.forEach(function (args) {
          fn.apply(this, args);
        });
        impl = fn;
      }, false);

      return function () {
        return impl.apply(this, arguments);
      };
    };
  });

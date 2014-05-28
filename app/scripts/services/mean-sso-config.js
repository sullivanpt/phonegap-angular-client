/**
 * Provides configuration data about the parent MeanSso server to the angular app.
 * This data is passed to the app via an API call and saved in local storage for offline use.
 */
'use strict';

angular.module('phonegapAngularClientApp')
  .service('MeanSsoConfig', function MeanSsoConfig($rootScope, $window, $log, MeanSsoApi) {
    var LOCAL_STORAGE_ID = 'meanSsoConfig'; // window.localStorage key
    var that = this;

    /**
     * Helper to test if a provider is enabled
     */
    this.hasProvider = function (provider) {
      return that.providers.indexOf(provider) !== -1;
    };

    /**
     * Save or update the configuration
     */
    function applyConfig(decoded) {
      angular.extend(that, decoded);

      // Initialize jquery cloudinary
      if ($window.$ && $window.$.cloudinary && decoded.cloudinary) {
        decoded.cloudinary.protocol = decoded.cloudinary.protocol || 'https:';
        $window.$.cloudinary.config(decoded.cloudinary);
      }

      $rootScope.MeanSsoConfig = that; // make config globally available to views and watches
    }

    // singleton initialization helper to either load the _cache from local storage or from scratch
    // take care to return a valid context even when local storage exists but is unparsable
    try {
      var decoded = JSON.parse($window.localStorage[LOCAL_STORAGE_ID]);
      if (decoded) {
        $log.debug('MeanSsoConfig saved', decoded);
        applyConfig(decoded);
      }
    } catch (e) {
      $log.warn('MeanSsoConfig parse ' + e);
      delete $window.localStorage[LOCAL_STORAGE_ID];
    }
    MeanSsoApi.config.get().$promise.then(function (value) {
      $log.debug('MeanSsoConfig updated', value);
      var decoded = angular.fromJson(angular.toJson(value)); // strip $resource vars
      applyConfig(decoded);
      $window.localStorage[LOCAL_STORAGE_ID] = JSON.stringify(decoded); // save them in case we are offline next time
    }).catch(function (err) {
      $log.warn('catch ' + err);
    });
  });
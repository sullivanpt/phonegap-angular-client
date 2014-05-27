/**
 * Provides configuration data about the parent MeanSso server to the angular app.
 * This data is passed to the app via an API call and saved in local storage for offline use.
 */
'use strict';

angular.module('phonegapAngularClientApp')
  .service('MeanSsoConfig', function MeanSsoConfig($window, $log, MeanSsoApi) {
    var LOCAL_STORAGE_ID = 'meanSsoConfig'; // window.localStorage key
    var that = this;
    var status = false;

    /**
     * This module restores session state from Phonegap storage and web APIs, which take time; use
     * this function to determine when the module has been fully booted and previous session state
     * has been determined.
     *
     * Usage:
     *   $scope.$watch(MeanSsoConfig, function (newValue) {
     *     if (newValue) {
     *       $scope.setting = MeanSsoConfig.setting;
     *     }
     *   });
     */
    this.ready = function () {
      return status;
    };

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
        $window.$.cloudinary.config(decoded.cloudinary);
      }

      status = true;
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
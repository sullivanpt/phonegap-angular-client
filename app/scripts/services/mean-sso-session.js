'use strict';

/*jshint camelcase: false */

angular.module('phonegapAngularClientApp')
  .service('MeanSsoSession', function MeanSsoSession(MeanSsoApi, MeanSsoPrimus, config, $q, $log, $rootScope, $window) {
    var LOCAL_STORAGE_ID = 'meanSsoSession'; // window.localStorage key
    var status = false; // set true after module initializes

    function saveTokens(tokens) {
      if (tokens) {
        MeanSsoApi.setUserAuthorizationHeader('Bearer', tokens.access_token);
        MeanSsoPrimus.setUserAuthorizationHeader('bearer', tokens.access_token);
      } else {
        MeanSsoApi.setUserAuthorizationHeader();
        MeanSsoPrimus.setUserAuthorizationHeader();
      }
      $window.localStorage[LOCAL_STORAGE_ID] = JSON.stringify(tokens);
    }

    /**
     * This module restores session state from Phonegap storage and web APIs, which take time; use
     * this function to determine when the module has been fully booted and previous session state
     * has been determined.
     *
     * Usage:
     *   $scope.$watch(MeanSsoSession, function (newValue) {
     *     if (newValue) {
     *       $scope.username = MeanSsoSession.user.username;
     *     }
     *   });
     */
    this.ready = function () {
      return status;
    };

    /**
     * Returns the currently authenticated user profile or null if no user is logged in.
     */
    this.user = function () {
      return $rootScope.currentUser;
    };

    /**
     * Logout and discard the current session
     */
    this.logout = function () {
      $log.info('logout ' + ($rootScope.currentUser && $rootScope.currentUser.username || ''));
      $rootScope.currentUser = null;
      saveTokens(null);
    };

    /**
     * Login with resource owner password credentials.
     * Previous session, if any, will be forgotten.
     */
    this.resourceOwnerPasswordCredentials = function (options) {
      var deferred = $q.defer();
      var tokens,
        tokeninfo,
        me;
      $log.info('login as ' + options.username);
      MeanSsoApi.oauth2Token.save({
        'grant_type': 'password',
        scope: 'offline_access',
        username: options.username,
        password: options.password
      }).$promise.then(function (value) {
          tokens = angular.fromJson(angular.toJson(value)); // strip $resource vars
          $log.debug('tokens ' + JSON.stringify(tokens));
          return MeanSsoApi.oauth2TokenInfo.get({
            access_token: tokens.access_token
          }).$promise;
        }).then(function (value) {
          tokeninfo = angular.fromJson(angular.toJson(value)); // strip $resource vars
          $log.debug('token info ' + JSON.stringify(tokeninfo));
          if (tokeninfo.audience !== config.meanSso.clientId) {
            $log.debug('Unexpected token client ID ' + tokeninfo.audience);
            return $q.reject('Unexpected token client ID');
          } else {
            saveTokens(tokens);
            return MeanSsoApi.me.get().$promise;
          }
        }).then(function (value) {
          me = angular.fromJson(angular.toJson(value)); // strip $resource vars
          $log.info('me ' + JSON.stringify(me));
          $rootScope.currentUser = me; // Provide simple global access
          deferred.resolve();
        }).catch(function (err) {
          $log.warn('catch ' + err);
          $rootScope.currentUser = null;
          saveTokens(null);
          deferred.reject(err);
        });
      return deferred.promise;
    };

    /**
     * Register a new user
     */
    this.register = function (options) {
      var deferred = $q.defer();
      MeanSsoApi.register.save({
        name: options.name,
        email: options.email,
        password: options.password
      }).$promise.then(function (value) {
          $log.info('register ' + JSON.stringify(value));
          deferred.resolve(value);
        }).catch(function (err) {
          $log.warn('catch ' + err);
          deferred.reject(err);
        });
      return deferred.promise;
    };

    // singleton initialization helper to either load the _cache from local storage or from scratch
    // take care to return a valid context even when local storage exists but is unparsable
    try {
      var tokens = JSON.parse($window.localStorage[LOCAL_STORAGE_ID]);
      if (tokens) {
        $log.debug('tokens ' + JSON.stringify(tokens));
        MeanSsoApi.setUserAuthorizationHeader('Bearer', tokens.access_token);
        MeanSsoApi.me.get().$promise.then(function (value) {
          var me = angular.fromJson(angular.toJson(value)); // strip $resource vars
          $log.info('me ' + JSON.stringify(me));
          $rootScope.currentUser = me; // Provide simple global access
          MeanSsoPrimus.setUserAuthorizationHeader('bearer', tokens.access_token); // do this AFTER validating the token
          status = true;
        }).catch(function (err) {
            $log.warn('catch ' + err);
            $rootScope.currentUser = null;
            saveTokens(null);
            status = true;
          });
      } else {
        status = true;
      }
    } catch (e) {
      $log.warn('MeanSsoSession parse ' + e);
      $rootScope.currentUser = null;
      saveTokens(null);
      status = true;
    }
  });

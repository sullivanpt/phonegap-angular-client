'use strict';

/*jshint camelcase: false */

angular.module('phonegapAngularClientApp')
  .service('MeanSsoSession', function MeanSsoSession(MeanSsoApi, meanSsoConfig, $q, $log, $rootScope) {
    var savedTokens; // saves user credentials if we have any. TODO: save in local storage

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
      return true;
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
      savedTokens = null;
      MeanSsoApi.setUserAuthorizationHeader();
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
          if (tokeninfo.audience !== meanSsoConfig.clientId) {
            $log.debug('Unexpected token client ID ' + tokeninfo.audience);
            return $q.reject('Unexpected token client ID');
          } else {
            savedTokens = tokens;
            MeanSsoApi.setUserAuthorizationHeader('Bearer', tokens.access_token);
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
          savedTokens = null;
          MeanSsoApi.setUserAuthorizationHeader();
          deferred.reject(err);
        });
      return deferred.promise;
    };
  });

'use strict';

/*jshint camelcase: false */

angular.module('phonegapAngularClientApp')
  .service('MeanSsoSession', function MeanSsoSession(MeanSsoApi, meanSsoConfig, $q) {
    var savedTokens; // saves user credentials if we have any. TODO: save in local storage
    var savedUser; // saves the current user session profile. TODO: set this (need support in mean-sso)

    /**
     * This module restores session state from Phonegap storage and web APIs, which take time; use
     * this function to determine when the module has been fully booted and previous session state
     * has been determined.
     *
     * Usage:
     *   $scope.$watch(MeanSsoSession, function (newValue) {
     *     if (newValue) {
     *       MeanSsoSession.resourceOwnerPasswordCredentials(options);
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
      return savedUser;
    };

    /**
     * Login with resource owner password credentials.
     * Previous session, if any, will be forgotten.
     */
    this.resourceOwnerPasswordCredentials = function (options) {
      var deferred = $q.defer();
      var tokens;
      console.log('login as ' + options.username);
      MeanSsoApi.oauth2Token.save({
        'grant_type': 'password',
        scope: 'offline_access',
        username: options.username,
        password: options.password
      }).$promise.then(function (value) {
          console.log('tokens ' + JSON.stringify(value));
          tokens = angular.fromJson(angular.toJson(value)); // strip $resource vars
          return MeanSsoApi.oauth2TokenInfo.get({
            access_token: tokens.access_token
          }).$promise;
        }).then(function (value) {
          console.log('token info ' + JSON.stringify(value));
          if (value.audience !== meanSsoConfig.clientId) {
            console.log('Unexpected token client ID ' + value.audience);
            deferred.reject('Unexpected token client ID');
          } else {
            savedTokens = tokens;
            MeanSsoApi.setUserAuthorizationHeader('Bearer', tokens.access_token);
            deferred.resolve();

            // use token
            MeanSsoApi.profile.get({}, function (value) {
              console.log('profile ok ' + JSON.stringify(value));
            }, function (err) {
              console.log('profile err ' + JSON.stringify(err.data));
            });
          }
        }).catch(function (err) {
          console.log('catch ' + err);
          MeanSsoApi.setUserAuthorizationHeader();
          deferred.reject(err);
        });
      return deferred.promise;
    };
  });

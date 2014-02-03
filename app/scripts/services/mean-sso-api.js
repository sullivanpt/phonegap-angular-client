'use strict';

angular.module('phonegapAngularClientApp')
  .service('MeanSsoApi', function MeanSsoApi($resource, formUrlEncoded, base64, meanSsoConfig) {

    //
    // Helpers for authorization
    //

    // Add $http.config Basic authorization headers for the configured client
    function addClientAuthorizationHeader(config) {
      config.headers = angular.extend(config.headers || {},{
        'Authorization': 'Basic ' + base64.encode((meanSsoConfig.clientId || '') + ':' + (meanSsoConfig.clientSecret || ''))
      });
      return config;
    }

    var userAuthorizationHeader;

    // Set or clear the authorization header to be sent with all API calls that use user headers
    // Supported types: 'Bearer' (token), 'Basic' (username, password), null (to clear)
    this.setUserAuthorizationHeader = function (type, arg1, arg2) {
      switch (type) {
      case 'Basic':
        userAuthorizationHeader = 'Basic ' + base64.encode((arg1 || '') + ':' + (arg2 || ''));
        break;
      case 'Bearer':
        userAuthorizationHeader = 'Bearer ' + arg1;
        break;
      default:
        userAuthorizationHeader = null;
        break;
      }
    };

    // Add $http.config Basic authorization headers for the current user.
    // See addUserAuthorizationHeader
    function addUserAuthorizationHeader(config) {
      config.headers = angular.extend(config.headers || {},{
        'Authorization': function () {
          return userAuthorizationHeader;
        }
      });
      return config;
    }

    var userAuthorizationActions = {
      'get': addUserAuthorizationHeader({method:'GET'}),
      'save': addUserAuthorizationHeader({method:'POST'}),
      'query':  addUserAuthorizationHeader({method:'GET', isArray:true}),
      'remove': addUserAuthorizationHeader({method:'DELETE'}),
      'delete': addUserAuthorizationHeader({method:'DELETE'})
    };

    //
    // Resource definitions start here
    //

    this.oauth2Token = $resource(meanSsoConfig.baseUrl + '/oauth2/token', {}, {
      save: addClientAuthorizationHeader(angular.extend({method: 'POST'}, formUrlEncoded))
    });
    this.oauth2TokenInfo = $resource(meanSsoConfig.baseUrl + '/oauth2/tokeninfo');
    this.me = $resource(meanSsoConfig.baseUrl + '/api2/me', {}, userAuthorizationActions);
  });

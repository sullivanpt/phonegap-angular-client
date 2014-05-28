'use strict';

angular.module('phonegapAngularClientApp')
  .service('MeanSsoApi', function MeanSsoApi($resource, formUrlEncoded, base64, config) {

    //
    // Helpers for authorization
    //

    // Add $http.config Basic authorization headers for the configured client
    function addClientAuthorizationHeader(httpConfig) {
      httpConfig.headers = angular.extend(httpConfig.headers || {},{
        'Authorization': 'Basic ' + base64.encode((config.meanSso.clientId || '') + ':' + (config.meanSso.clientSecret || ''))
      });
      return httpConfig;
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
    function addUserAuthorizationHeader(httpConfig) {
      httpConfig.headers = angular.extend(httpConfig.headers || {},{
        'Authorization': function () {
          return userAuthorizationHeader;
        }
      });
      return httpConfig;
    }

    var userAuthorizationActions = {
      'get': addUserAuthorizationHeader({method:'GET'}),
      'save': addUserAuthorizationHeader({method:'POST'}),
      'update': addUserAuthorizationHeader({method:'PUT'}),
      'query':  addUserAuthorizationHeader({method:'GET', isArray:true}),
      'remove': addUserAuthorizationHeader({method:'DELETE'}),
      'delete': addUserAuthorizationHeader({method:'DELETE'})
    };

    //
    // Resource definitions start here
    //

    this.config = $resource(config.meanSso.baseUrl + '/api2/config');

    /**
     * GET retrieve a token authorizing a single cloudinary image upload.
     * See https://github.com/jbcpollak/cloudinary_angular
     */
    this.imagesSignRequest = $resource(config.meanSso.baseUrl + '/api2/images/signrequest', {}, userAuthorizationActions);

    this.oauth2Token = $resource(config.meanSso.baseUrl + '/oauth2/token', {}, {
      save: addClientAuthorizationHeader(angular.extend({method: 'POST'}, formUrlEncoded))
    });
    this.oauth2TokenInfo = $resource(config.meanSso.baseUrl + '/oauth2/tokeninfo');
    this.me = $resource(config.meanSso.baseUrl + '/api2/me', {}, userAuthorizationActions);
    this.register = $resource(config.meanSso.baseUrl + '/api/users', {}, userAuthorizationActions); // TODO: change to api2

    this.mePersonae = $resource(config.meanSso.baseUrl + '/api2/me/personae/:personaID', {
      personaID: '@id'
    }, userAuthorizationActions);
    this.personae = $resource(config.meanSso.baseUrl + '/api2/personae/:personaID', {}, userAuthorizationActions);
    this.messages = $resource(config.meanSso.baseUrl + '/api2/messages/:messageID', {
      personaID: '@id'
    }, userAuthorizationActions);
  });

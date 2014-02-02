'use strict';

angular.module('phonegapAngularClientApp')
  .constant('meanSsoConfig', { // hard coded meanSso configuration
    baseUrl: 'http://intense-brushlands-5559.herokuapp.com', // TODO: insist on SSL
    clientId: 'phonegap-angular-client',
    clientSecret: 'ssh-not-secret' // for an installed client this is NOT a secret
  });

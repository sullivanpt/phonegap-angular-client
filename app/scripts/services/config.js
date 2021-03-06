'use strict';

angular.module('phonegapAngularClientApp')
  .constant('config', {
    meanSso: { // hard coded meanSso configuration
      baseUrl: 'http://intense-brushlands-5559.herokuapp.com', // TODO: insist on SSL
      // baseUrl: 'http://localhost:9000', // grunt serve local host to local mean-sso
      // baseUrl: 'http://10.0.2.2:9000', // android emulator's host. See http://developer.android.com/tools/devices/emulator.html#networkaddresses
      clientId: 'phonegap-angular-client',
      clientSecret: 'ssh-not-secret' // for an installed client this is NOT a secret
    }
  });

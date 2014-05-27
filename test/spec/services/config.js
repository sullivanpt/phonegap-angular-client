'use strict';

describe('Service: config', function () {

  // load the service's module
  beforeEach(module('phonegapAngularClientApp'));

  // instantiate service
  var config;
  beforeEach(inject(function (_config_) {
    config = _config_;
  }));

  it('should define the meanSso base configuration', function () {
    expect(!!config.meanSso.baseUrl).toBe(true);
    expect(!!config.meanSso.clientId).toBe(true);
  });

});

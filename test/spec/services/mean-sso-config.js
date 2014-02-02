'use strict';

describe('Service: meanSsoConfig', function () {

  // load the service's module
  beforeEach(module('phonegapAngularClientApp'));

  // instantiate service
  var meanSsoConfig;
  beforeEach(inject(function (_meanSsoConfig_) {
    meanSsoConfig = _meanSsoConfig_;
  }));

  it('should do something', function () {
    expect(!!meanSsoConfig).toBe(true);
  });

});

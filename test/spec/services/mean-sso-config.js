'use strict';

describe('Service: MeanSsoConfig', function () {

  // load the service's module
  beforeEach(module('phonegapAngularClientApp'));

  // instantiate service
  var MeanSsoConfig;
  beforeEach(inject(function (_MeanSsoConfig_) {
    MeanSsoConfig = _MeanSsoConfig_;
  }));

  it('should do something', function () {
    expect(!!MeanSsoConfig).toBe(true);
  });

});

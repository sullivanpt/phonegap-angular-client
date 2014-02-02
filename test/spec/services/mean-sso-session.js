'use strict';

describe('Service: MeanSsoSession', function () {

  // load the service's module
  beforeEach(module('phonegapAngularClientApp'));

  // instantiate service
  var MeanSsoSession;
  beforeEach(inject(function (_MeanSsoSession_) {
    MeanSsoSession = _MeanSsoSession_;
  }));

  it('should do something', function () {
    expect(!!MeanSsoSession).toBe(true);
  });

});

'use strict';

describe('Service: cordovaDevice', function () {

  // load the service's module
  beforeEach(module('phonegapAngularClientApp'));

  // instantiate service
  var cordovaDevice;
  beforeEach(inject(function (_cordovaDevice_) {
    cordovaDevice = _cordovaDevice_;
  }));

  it('should do something', function () {
    expect(!!cordovaDevice).toBe(true);
  });

});

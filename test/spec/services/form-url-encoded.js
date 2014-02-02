'use strict';

describe('Service: formUrlEncoded', function () {

  // load the service's module
  beforeEach(module('phonegapAngularClientApp'));

  // instantiate service
  var formUrlEncoded;
  beforeEach(inject(function (_formUrlEncoded_) {
    formUrlEncoded = _formUrlEncoded_;
  }));

  it('should do something', function () {
    expect(!!formUrlEncoded).toBe(true);
  });

});

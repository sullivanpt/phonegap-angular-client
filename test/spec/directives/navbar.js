'use strict';

describe('Directive: navbar', function () {

  // load the directive's module
  beforeEach(module('phonegapAngularClientApp', function ($provide) {
    $provide.service('MeanSsoConfig', function () {});
  }));

  var $httpBackend,
    element,
    scope;

  beforeEach(inject(function ($rootScope, $injector) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.expectGET('views/navbar.html').
      respond('<div>mocked</div>');
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<navbar></navbar>');
    element = $compile(element)(scope);
    $httpBackend.flush();
    expect(element.text()).toBe('mocked');
  }));
});

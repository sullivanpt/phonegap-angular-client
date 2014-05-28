'use strict';

describe('Controller: SocialMessageCtrl', function () {

  // load the controller's module
  beforeEach(module('phonegapAngularClientApp', function ($provide) {
    $provide.constant('config', {
      meanSso: { // hard coded meanSso configuration
        baseUrl: 'http://server'
      }
    });
    $provide.service('MeanSsoConfig', function () {});
    $provide.service('MeanSsoSession', function () {
      this.ready = function () { return true; };
    });
  }));

  var SocialMessageCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('http://server/api2/personae')
      .respond({ id: '456', alias: 'jane doe'});
    $httpBackend.expectGET('http://server/api2/me/personae')
      .respond({ id: '123', alias: 'john doe'});
    $rootScope.currentUser = {}; // mock
    scope = $rootScope.$new();
    SocialMessageCtrl = $controller('SocialMessageCtrl', {
      $scope: scope
    });
  }));

  it('should attach two personae to the scope', function () {
    expect(scope.persona).toBeUndefined();
    expect(scope.other).toBeUndefined();
    $httpBackend.flush();
    expect(scope.persona.id).toBe('123');
    expect(scope.other.id).toBe('456');
  });
});

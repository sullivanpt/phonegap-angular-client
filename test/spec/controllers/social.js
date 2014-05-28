'use strict';

describe('Controller: SocialCtrl', function () {

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

  var SocialCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('http://server/api2/me/personae')
      .respond([{ id: '123', alias: 'john doe'}]);
    $rootScope.currentUser = {}; // mock
    scope = $rootScope.$new();
    SocialCtrl = $controller('SocialCtrl', {
      $scope: scope
    });
  }));

  it('should attach my persona to the scope', function () {
    expect(scope.persona).toBeUndefined();
    $httpBackend.flush();
    expect(scope.persona.id).toBe('123');
  });
});

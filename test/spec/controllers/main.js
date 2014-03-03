'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('phonegapAngularClientApp'));

  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('version.json')
      .respond({revision:'abc1234',date:'2014-03-02T19:36:34'});
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });

  it('should attach the version to the scope', function () {
    $httpBackend.flush();
    expect(scope.version.revision).toBe('abc1234');
  });
});

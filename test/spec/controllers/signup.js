'use strict';

describe('Controller: SignupCtrl', function () {

  // load the controller's module
  beforeEach(module('phonegapAngularClientApp'));

  var SignupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope
    });
  }));

  it('should attach the sso parameters to the scope', function () {
    expect(scope.meanSsoConfig).toBeTruthy();
  });
});

'use strict';

angular.module('phonegapAngularClientApp')
  .controller('SignupCtrl', function ($scope, $location, MeanSsoSession, config, errors) {
    $scope.config = config;
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        MeanSsoSession.register({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then( function(value) {
            $scope.accountCreated = value;
            // TODO: A new user has been created, inform the user and try to login
          })
          .catch( function(err) {

            // TODO: REFACTOR THIS AS errors.formatForm(err, form)

            $scope.errors = {};
            if (err.data && err.data.errors) {
              // Update validity of form fields that match the mongoose errors
              // {"message":"Validation failed","name":"ValidationError","errors":{"email":{"message":"Validator \"Email cannot be blank\" failed for path email","name":"ValidatorError","path":"email","type":"Email cannot be blank"}}}
              angular.forEach(err.data.errors, function(error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.type;
              });
            } else {
              $scope.errors.other = errors.format(err);
            }
          });
      }
    };
  });

'use strict';

angular.module('phonegapAngularClientApp')
  .controller('SocialMeCtrl', function ($scope, $location, $log, MeanSsoApi, MeanSsoSession, MeanSsoConfig) {
    $scope.errors = {};

    function signUploadRequest() {
      if (MeanSsoConfig.cloudinary && $scope.currentUser && !$scope.cloudinaryData) {
        MeanSsoApi.imagesSignRequest.get({}, function (value) {
          $scope.cloudinaryData = {
            formData: angular.fromJson(angular.toJson(value)), // strip $get. http://stackoverflow.com/a/20713104
            start: function () { $scope.message = 'Uploading image...'; },
            done: function (e,data) {
              /*jshint camelcase: false */
              $scope.persona.avatarID = data.result.public_id;
              $scope.message = '';
            }
          };
        }, function (err) {
          $log.warn('cloudinary error', err);
        });
      }
    }

    function loadOrCreatePersona() {
      // select and display the active persona
      $scope.persona = null;
      MeanSsoApi.mePersonae.query(function (values) {
        if(!$scope.persona && values.length) {
          // if they have many just show one
          $scope.persona = values[0];
        } else {
          $scope.persona = { alias: $scope.currentUser.name };
        }
      }, function (err) {
        $log.warn('no persona', err);
      });
    }

    $scope.deletePersona = function () {
      if ($scope.persona.id) {
        MeanSsoApi.mePersonae.delete({ personaID: $scope.persona.id })
          .$promise.then( function() {
            loadOrCreatePersona();
          })
          .catch( function() {
            $scope.errors.other = 'Unable to delete';
          });
      } else {
        loadOrCreatePersona();
      }
    };

    $scope.changePersona = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        MeanSsoApi.mePersonae[$scope.persona.id ? 'update' : 'save']($scope.persona)
          .$promise.then( function(value) {
            $scope.persona = value;
            $scope.message = 'Profile successfully changed.';
          })
          .catch( function() {
            $scope.errors.other = 'Unable to save';
          });
      }
    };

    $scope.$watch(MeanSsoSession.ready, function (newValue) {
      if (newValue) {
        if ($scope.currentUser) {
          loadOrCreatePersona();
          signUploadRequest();
        } else {
          $location.path('/login'); // not authenticated
        }
      }
    });

    $scope.$watch('MeanSsoConfig.cloudinary', function (value) {
      if (value) {
        signUploadRequest();
      }
    });
  });

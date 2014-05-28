'use strict';

angular.module('phonegapAngularClientApp')
  .controller('SocialCtrl', function ($scope, $location, $log, MeanSsoApi, MeanSsoSession) {

    // implement user search by name or bio
    $scope.searchPersona = function (form) {
      $scope.search.found = null;
      if (form.$valid) {
        MeanSsoApi.personae.query({ bio: $scope.search.terms })
          .$promise.then(function (values) {
            $log.debug('success', values);
            $scope.search.found = values;
          }).catch(function (err) {
            $log.warn('error', err);
          });
      }
    };

    $scope.$watch(MeanSsoSession.ready, function (newValue) {
      if (newValue) {
        if ($scope.currentUser) {
          // select and display the active persona
          MeanSsoApi.mePersonae.query(function (values) {
            if(!$scope.persona && values.length) {
              $scope.persona = values[0];
            } else {
              // shunt users without a persona off to the create profile
              $location.path('/social-me');
            }
          }, function (err) {
            $log.warn('no persona', err);
          });
        } else {
          $location.path('/login'); // not authenticated
        }
      }
    });
  });

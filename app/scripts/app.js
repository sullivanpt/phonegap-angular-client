'use strict';

angular.module('phonegapAngularClientApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/social', {
        templateUrl: 'views/social.html',
        controller: 'SocialCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function (MeanSsoConfig) {/*jshint unused:false*/}); // forcing config and notify services to load


'use strict';

/**
 * @ngdoc function
 * @name medicoApp.controller:addPatientCtrl
 * @description
 * # addPatientCtrl
 * Controller of the medicoApp
 */
angular.module('medicoApp')
  .controller('menuCtrl', function ($scope,$location) {

  	$scope.isActive = function(route) {
        return route === $location.path();
    };
});
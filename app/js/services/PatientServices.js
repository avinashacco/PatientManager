'use strict';

/**
 * @ngdoc function
 * @name medicoApp.controller:addPatientCtrl
 * @description
 * # addPatientCtrl
 * Controller of the medicoApp
 */
angular.module('medicoApp')
  .factory('Patients', function ($http) {
    return {
    	getAll : function( _successCallback, _failureCallback){
        return $http({
          url : 'api/getPatient',
          method : 'GET',
        }).success(function(result) {
          _successCallback(result);
        }).error(function(error){
          _failureCallback(error);
        });
      }
    }
});
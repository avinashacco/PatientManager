'use strict';

/**
 * @ngdoc function
 * @name medicoApp.controller:addPatientCtrl
 * @description
 * # addPatientCtrl
 * Controller of the medicoApp
 */
angular.module('medicoApp')
  .controller('addPatientCtrl', function ($scope,$upload,$location) {

  	$scope.model = {};
	$scope.selectedFile = [];
	$scope.uploadProgress = 0;
  	$scope.addPatient = function(){
		$('.progress').show();
		var file = $scope.selectedFile;
		var d = $scope.visitingdate.split("/");
		$scope.upload = $upload.upload({
			url : 'api/addPatient',
			method : 'POST',
			data : {
				name: $scope.patientname,
				age: $scope.age,
				visitingdate: d[1]+"/"+d[0]+"/"+d[2],
				doctorname: $scope.doctorname,
				hospitalname: $scope.hospitalname,									
			},
			file : file
		}).progress(function(evt) {
			$scope.uploadProgress = parseInt(100.0 * evt.loaded/evt.total, 10);
		}).success(function(result) {
			if(result.status === "Success"){
				$location.path("/home");
			}
			else{
				console.log(result.message);
			}
		}).error(function(error){
			console.log(error);
		});
	};

	$scope.onFileSelect = function($files) {
		$scope.uploadProgress = 0;
		$scope.selectedFile = $files;
	};

	}).directive('progressBar', [ function() {
		return {
			link : function($scope, el, attrs) {
			$scope.$watch(attrs.progressBar, function(newValue) {
				el.css('width', newValue.toString() + '%');
			});
		}
	};
}]);
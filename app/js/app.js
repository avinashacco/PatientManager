var app = angular.module('medicoApp', [ 'ngRoute','angularFileUpload','ngPDFViewer']);

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl : 'views/home.html',
		controller: 'homeCtrl'
	}).when('/add', {
		templateUrl : 'views/addPatient.html',
		controller: 'addPatientCtrl'
	}).when('/pdfViewer', {
		templateUrl : 'views/pdfviewer.html',
		controller: 'addPatientCtrl'
	}).otherwise({
		redirectTo : '/home'
	});
} ]);
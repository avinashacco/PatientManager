'use strict';

/**
 * @ngdoc function
 * @name medicoApp.controller:addPatientCtrl
 * @description
 * # addPatientCtrl
 * Controller of the medicoApp
 */
angular.module('medicoApp')
  .controller('homeCtrl', function ($scope,$http,Patients) {
  	$("#pages").show();
  	var pdfDoc = null,
        pageNum = 1,
        pageRendering = false,
        pageNumPending = null,
        scale = 0.8,
        canvas = document.getElementById('the-canvas'),
        ctx = canvas.getContext('2d');
    $scope.pageClass = "hide";
    $scope.renderPage = function (num) {
      pageRendering = true;
      // Using promise to fetch the page
      pdfDoc.getPage(num).then(function(page) {
        var viewport = page.getViewport(scale);
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        
        // Wait for rendering to finish
        renderTask.promise.then(function () {
          pageRendering = false;
          if (pageNumPending !== null) {
            // New page rendering is pending
            renderPage(pageNumPending);
            pageNumPending = null;
          }
        });
       });
  	  // Update page counters
      document.getElementById('page_num').textContent = pageNum;
    }
  	$scope.getPatient = function(){
		Patients.getAll($scope.getAllPatients, $scope.errorHandler);
	};
	$scope.getAllPatients = function(results){
		$scope.pageClass = "show center-block";
		$scope.patients = results;
		$scope.loadPdf(results[0]);
	}
	$scope.errorHandler = function(err){
		//TODO: handle error
	}
	$scope.loadPdf = function(patient){
		PDFJS.getDocument({
    		data: patient.attachments[0]
	    }).then(function (pdfDoc_) {
	      pdfDoc = pdfDoc_;
	      document.getElementById('page_count').textContent = pdfDoc.numPages;
	      $scope.renderPage(pageNum);
	    });
	}
	$scope.queueRenderPage = function(num) {
      if (pageRendering) {
        pageNumPending = num;
      } else {
        $scope.renderPage(num);
      }
    };
	$scope.getNextPage = function(){
		if (pageNum >= pdfDoc.numPages) {
	        return;
	    }
	    pageNum++;
	    $scope.queueRenderPage(pageNum);
	};
	$scope.getPrevPage = function() {
      if (pageNum <= 1) {
        return;
      }
      pageNum--;
      $scope.queueRenderPage(pageNum);
    }
	$scope.getPatient();
});
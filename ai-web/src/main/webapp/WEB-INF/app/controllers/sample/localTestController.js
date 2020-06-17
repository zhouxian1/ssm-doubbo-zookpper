define(['app'], function(app) {
    app.controller('localTestController', localTestController);
    localTestController.$inject = ['$scope','$state'];
    function localTestController($scope,$state) {
    	$scope.currentTabId = 0;
    	$scope.dataArr = {};
        $scope.tabSwitch = function(num) {
	        $scope.currentTabId = num;
	    };
	    $scope.initData = function(){
	    	
	    };
	    
	    $scope.initData();
    }
});
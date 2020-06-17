define(['app'], function(app) {
    app.controller('algorithmTrainController', algorithmTrainController);
    algorithmManageController.$inject = ['$scope'];
    function algorithmTrainController($scope) {
    	$scope.currentTabId = 0;
    	$scope.dataArr = {};
        $scope.tabSwitch = function(num) {
	        $scope.currentTabId = num;
	    };
	    $scope.initData = function(){
	    	$scope.algoInfo = [{
	    		name:"算法名",
	    		frame:"Caffe",
	    		author:"航天星图",
	    		date:"20170501",
	    		status:"已购买",
	    		action:"去训练算法"
	    	}];
	    };
	    $scope.initData();
    }
})
define(['app'], function(app) {
    app.controller('algorithmManageController', algorithmManageController);
    algorithmManageController.$inject = ['$scope','$state'];
    function algorithmManageController($scope,$state) {
    	$scope.currentTabId = 0;
    	$scope.dataArr = {};
        $scope.tabSwitch = function(num) {
	        $scope.currentTabId = num;
	    };
	    $scope.initData = function(){
	    	$scope.boughtDataArr = [{
	    		name:"算法名",
	    		frame:"Caffe",
	    		publisher:"航天星图",
	    		date:"20170501",
	    		status:"已购买",
	    		action:"去训练算法"
	    	}];
	    };
	    $scope.enterTrain = function(){
	    	$state.go('algorithmtrain');
	    };
	    $scope.enterTest = function(){
	    	$state.go('algorithmtest');
	    };
	    $scope.initData();
    }
});
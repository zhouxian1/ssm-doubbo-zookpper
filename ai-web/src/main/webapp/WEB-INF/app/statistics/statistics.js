//声明路由模块
angular.module("statistics",[])
    .component("statistics",{
        templateurl:'app/statistics/statistics.html',
        controller:statisticsCtrl
    })
//声明控制器函数statisticsCtrl
function statisticsCtrl($scope){
    $scope.testText="statistics页面测试文本";
}
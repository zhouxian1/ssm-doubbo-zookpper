/**
 * Created by wangshuangxiao on 16/9/22.
 */
var app = angular.module("gxMesApp",[]);
app.controller("statusListCtrl",function($scope,$http) {
//
//    app.controller("statusListCtrl", function($scope,$http){
//        $scope.selectedPerson = 0;
//        $scope.selectedGenre = null;
//        $scope.people = [
//            {
//                id: 0,
//                name: 'Leon'
//            },
//            {
//                id: 1,
//                name: 'Chris'
//            },
//            {
//                id: 2,
//                name: 'Harry'
//            },
//            {
//                id: 3,
//                name: 'Allyce'
//            }
//        ];
    $scope.templateUrl = "http://101.201.51.207:8093/order/order_status"; //接口地址+接口名称
    //请求参数列表  无
    /*订单状态*/

    $scope.parm = "";
    $http({
        url: $scope.templateUrl,
        method: "POSE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"// form形式提交
        },
        data: $scope.parm
    }).success(function (response) {

        //$scope.people = response.data; //状态参数列表
        console.log(response.data);

        console.log("success");
    }).error(function (response) {
        console.log("error")
    });
});
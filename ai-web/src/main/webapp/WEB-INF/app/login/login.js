//定义angualr模块
var app = angular.module("gxMesApp",[]);
app.controller('loginCtrl',function($scope,$http,$location){
    $scope.templateUrl = "/u/login"; //接口地址+接口名称/u/login
    $scope.parm = {}; //声明请求空参数对象
    $scope.login = function(){ // 调用登录接口
        console.log($scope.parm);
        $http({ //发送http请求
            url:$scope.templateUrl,
            method: "POST",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"// form形式提交
            },
            data: $.param($scope.parm)
        }).success(function(response){
            console.log(response);
            console.log("登录请求成功");
            if(response.status==200){
                console.log("开始跳转");
                window.location.href="file:///Users/shane/gx-cms/src/app/index.html#/";
            }else{}
            alert("对不起,"+response.statusText);
        }).error(function(){
            console.log("登录请求失败");
        })
    };
});

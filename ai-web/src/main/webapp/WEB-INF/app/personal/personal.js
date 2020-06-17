////var app = angular.module("gxMesApp",[]);//定义一个主模块
//app.controller("personalCtrl", function($scope,$http){
//    $scope.templateUrl = "http://101.201.51.207:8093/u/detail";//接口地址+接口名称
//    $scope.parm = {userId:1};//请求参数
//    //$scope.load = function(){//调用的接口
//        $http({
//            url : $scope.templateUrl,//请求的url地址
//            method : "POST",//请求的方式
//            headers:{
//                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"//请求头部以这种方式传输
//            },
//            data: $.param($scope.parm)//param可以将参数转化成键值对形式
//        }).success(function(response){
//
//            console.log(response.data);//输出我要的数据
//            $scope.personalList = response.data;//声明一个变量来保存我需要的数据
//            console.log("success");//请求是否成功
//
//        }).error(function(){
//            console.log("error");//请求是否失败
//        });
//    //}
//
//});

function personalCtrl($scope,$http,$cookies){

    $scope.isLogined=$cookies.get('loginStatus');
    $scope.loginUserId=$cookies.get('loginUserId');
    //定义测试文本
    $scope.testText="personal页面测试文本";
    //设置请求数据接口
    //$scope.templateUrl='http://101.201.51.207:8093/u/detail';//接口地址+接口名称
    $scope.templateUrl='/u/detail';//接口地址+接口名称
    //设置请求参数
    //注意:这里的userId需要从用户登录后设置的缓存中取出,所以需要在登录成功后返回userId,现在返回的是空
    console.log("缓存登录用户的Id值:"+$scope.loginUserId);
    $scope.parm={userId:$scope.loginUserId};
    $http({
        url:$scope.templateUrl,
        method:"POST",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"// form形式提交
        },
        data: $.param($scope.parm)
    }).success(
        function(response){

            if(200 == response.status){
                console.log("personal请求成功");
                console.log(response);
                $scope.personalList=response.data;
                console.log($scope.personalList);
            }else if(401 == response.status){

                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
            }
        }
    ).error(
        function(){
            console.log("personal请求失败")
        }
    )
    $scope.pageAdjust();
}

//声明路由模块personal,定义组件
angular.module('personal',[])
    .component('personal',{
        templateUrl:'personal/personal.html',
        controller:personalCtrl
    });

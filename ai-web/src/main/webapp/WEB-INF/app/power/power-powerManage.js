//声明路由模块powerManage
//定义一个组件component(组件名称,组件配置对象)
angular.module('powerManage',[])
    .component('powerManage',{
        templateUrl:'app/power/power-powerManage.html',//主模块可以用的路径
        controller:powerManageCtrl//依赖注入一个控制器
    });

//操作powerManageCtrl
function powerManageCtrl($scope,$http,$cookies){


    $scope.isLogined=$cookies.get('loginStatus');
    $scope.loginUserId=$cookies.get('loginUserId');
    //设置返回结果变量
    $scope.responseData=[];
    //请求接口数据
    $scope.templateUrl='/u/list';//请求数据的接口管理员列表
    $scope.templateUrl2='/u/delete';//删除的接口
    $scope.parm={};//后台没有请求参数暂时设为空

    $scope.parm2="";
    $http({
        url:$scope.templateUrl,//请求的路径
        method:"POST",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"// form形式提交
        },
        data:$.param($scope.parm)//返回的数据
    }).success(
        function(response){
            console.log("请求成功");
            console.log(response);
            $scope.responseData=response.data;//返回的数据保存在变量responseData中
            console.log($scope.responseData);
            if(response.status==403){
                //$window.location.href='/app/index.html#/common/error.html';
                //$("#error").load('error.html');
                console.log('现在的状态码是'+response.status);
                window.location.href="/app/power.html";
                //window.location.reload();
                //window.location.reload();
            }else if(401 == response.status){

                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
            }
            else{
                console.log("访问页面成功");
            }
        }
    ).error(
        function(){
            console.log("请求失败");
        }
    );
    $scope.deleteCell=function(index){//传入index这个参数是索引下标
        console.log(index);
        console.log($scope.responseData[index]);//得到这个数组的下标
        $scope.parm2={
            userId:$scope.responseData[index].userId//得到这个数组的下标的id
        };
        console.log($scope.parm2);
        $scope.responseData.splice(index,1);
        $http({
            url:$scope.templateUrl2,
            method:"POST",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"// form形式提交
            },
            data:$.param($scope.parm2)
        }).success(
            function(response){
                console.log("请求删除成功");
                console.log(response);
            }
        ).error(
            function(){
                console.log("请求删除失败");
            }
        );
    }
    $scope.pageAdjust();

}

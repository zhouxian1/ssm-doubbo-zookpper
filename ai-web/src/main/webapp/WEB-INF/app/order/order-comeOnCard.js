/**
 * Created by liuping on 17/4/17.
 */
angular.module("comeOnCard",[])
    .component("comeOnCard",{

        templateUrl : "app/order/order-comeOnCard.html",
        controller : comeOnCardCtrl
    });

function comeOnCardCtrl($scope,$http,$cookies,$timeout){

    $scope.isLogined = $cookies.get('loginStatus');
    $scope.loginUserId = $cookies.get('loginUserId');

    //连接假数据
    $scope.apiUrl_comeOnCard = "order/data/comeon.json";

    $scope.mod_comeOnCardList = []; //返回的列表
    $scope.param_comeOnCard = {};//加油卡查询的参数

    /******获取加油卡订单列表********/
    $http({

        url:$scope.apiUrl_comeOnCard,
        method:"GET",
        headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
        data:$.param($scope.param_comeOnCard)
    }).success(

        function(response){

            if(response.status == 200){

                // console.log(response.data);
                console.log("获取加油卡订单列表成功");
                $scope.mod_comeOnCardList = response.data.data;
                console.log($scope.mod_comeOnCardList);
            }else if(response.status == 401){

                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href = "/app/index.html#/";
                window.location.reload();
            }else{

                swal(response.statusText,"","error");
            }
        }
    ).error(function(){

        swal('网络出错,请重试',"","error");
    });
}

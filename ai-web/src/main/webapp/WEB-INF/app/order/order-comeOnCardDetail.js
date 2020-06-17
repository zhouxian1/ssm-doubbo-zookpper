/**
 * Created by liuping on 17/4/17.
 */
angular.module('comeOnCardDetail',[])
    .component('comeOnCardDetail',{

        templateUrl : 'app/order/order-comeOnCardDetail.html',
        controller: comeOnCardDetailCtrl
    });

function comeOnCardDetailCtrl($scope,$http,$cookies){

    $scope.isLogined = $cookies.get('loginStatus');
    $scope.loginUserId = $cookies.get("loginUserId");

    $scope.apiUrl_comeOnCardDetail = "order/data/comeOnCardDetail.json";

    $scope.param_comeOnCardDetail = {};//传的详情参数

    $scope.mod_comeOnCardDetail = {};
    $scope.mod_comeOnCardDetailList = [];
    $scope.mod_orderLogs = []; //修改订单记录列表


    /******获取加油卡订单详情********/
    $http({

        url:$scope.apiUrl_comeOnCardDetail,
        method:"GET",
        headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
        data:$.param($scope.param_comeOnCardDetail)
    }).success(

        function(response){

            if(response.status == 200){

                // console.log(response.data);
                console.log("获取加油卡订单列表成功");
                $scope.mod_comeOnCardDetail = response.data;
                $scope.mod_comeOnCardDetailList = response.data.goods;
                console.info($scope.mod_comeOnCardDetailList);
                $scope.mod_orderLogs = response.data.orderLogs; // mod_orderLogs 接住订单修改记录
                angular.forEach($scope.mod_comeOnCardDetailList,function(orderstatus){
                    console.info(orderstatus);

                    if($scope.mod_comeOnCardDetailList.status == orderstatus.status){

                        $scope.orderStatusText = "订单完成";
                        console.info($scope.orderStatusText);
                    }
                })
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
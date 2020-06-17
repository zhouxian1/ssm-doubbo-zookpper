/**
 * Created by wangshuangxiao on 16/9/1.
 */
//声明路由模块orderDetailedCtrl
angular.module("orderDetailed", [])
    .component("orderDetailed", {
        templateUrl: "app/order/orderDetailed.html",
        controller: orderDetailedCtrl
    });
//操作orderDetailedCrtl
function orderDetailedCtrl($scope, $http, $routeParams, $cookies, $timeout,$rootScope) {

    $scope.isLogined = $cookies.get('loginStatus');
    $scope.loginUserId = $cookies.get('loginUserId');
    /********* 订单详情 开始初始化controller**************/
    // 请求参数
    $scope.param_orderDetile = {}; //订单详情请求参数
    $scope.paramQueryOrderStatusList = {}; //查询订单状态参数
    $scope.param_changeOrderStatus = {}; //修改订单状态


    // 请求接口地址
    $scope.apiUrl_orderDetail = '/order/order_detail'; // 订单详情接口地址
    $scope.apiUrl_orderStatusList = "/order/order_status"; //查询订单状态列表
    $scope.apiUrl_changeOrderStatus = "/order/change_order_status"; //修改订单状态接口地址
    $scope.apiUrl_order_againOutStock = "/order/againOutStock";//124加油卡充值二次出库
    $scope.apiUrl_order_confirm_gas_card_ok = "/order/confirm_gas_card_ok";//128:确认充值成功

    // model 初始化
    $scope.mod_orderDetailList = []; //订单列表列表
    $scope.mod_orderGoodsList = []; // 订单商品列表
    $scope.mod_orderStatusList = []; //订单状态列表
    $scope.mod_orderLogs = []; //修改订单记录列表
    $scope.mod_showOutStockAgain = "";//如果是异常订单就显示二次出库
    $scope.param_orderNo = {};//订单单号
    $scope.param_orderStock = {}
    $scope.param_returnMoneny = {};//申请退款
    $scope.param_confirmMoneny = {};//确认充值成功

    // 变量赋值
    $scope.orderNo = $routeParams.orderNo; //定义变量 orderNo接住跨页传参到的orderNo

    $scope.param_orderDetile.orderNo = $scope.orderNo;
    $scope.param_changeOrderStatus.orderNo = $scope.orderNo;


    /********* 订单详情 结束初始化controller**************/

    /************ 订单状态列表 ****************/
    $http({
        url: $scope.apiUrl_orderStatusList,
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
        data: $.param($scope.paramQueryOrderStatusList)
    }).success(function (response) {
        console.log("请求订单状态列表成功");
        console.log(response);
        $scope.mod_orderStatusList = response.data;
    }).error(function () {
        console.log("error");
    });
    /************ 订单详情 ****************/
    $scope.orderDetail = function(){

        $http({
            //请求地址
            url: $scope.apiUrl_orderDetail,
            //请求方法
            method: "POST",
            //请求头
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            //请求参数
            data: $.param($scope.param_orderDetile)
        }).success(function (response) {
            if (response.status == 200) {
                console.info("请求订单详情成功!");
                console.log(response);
                $scope.mod_orderDetailList = response.data; // mod_orderDetailList接住返回的数据
                $scope.mod_orderGoodsList = response.data.goods; // mod_orderGoodsList接住order中的商品列表
                console.info($scope.mod_orderGoodsList);
                $scope.mod_orderLogs = response.data.orderLogs; // mod_orderLogs 接住订单修改记录
                console.info(response.data.showOutStockAgain);
                $scope.mod_showOutStockAgain = response.data.showOutStockAgain;//是否二次出库
                console.info($scope.mod_showOutStockAgain);

                angular.forEach($scope.mod_orderStatusList, function (orderstatus) {
                    if ($scope.mod_orderDetailList.status == orderstatus.status) {
                        $scope.orderStatusText = orderstatus.text;
                        console.info($scope.orderStatusText);
                    }
                });
                console.log("状态文本是下面");
                console.log($scope.orderStatusText);
            } else if (401 == response.status) {
                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href = "/app/index.html#/";
                window.location.reload();
            }
            else {

                swal(response.statusText,"","error");
            }

        }).error(function () {

            swal('网络出错,请重试',"","error");
        });
    };
    $scope.orderDetail();
    $scope.sendMessageOrStock = function (useOldCard) {
        var alertTitle = "确认发送充值短信,这可能会导致接收充值结果出错?";
        if(useOldCard == 0){

            alertTitle = "确认二次出库,这会损耗一张加油卡?"
        }
        swal({

            title: alertTitle,
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "取消",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            closeOnConfirm: false
        },function(){
            $scope.param_orderStock = {

                orderNo : $scope.orderNo,
                useOldCard:useOldCard
            };
            $http({
                url: $scope.apiUrl_order_againOutStock,
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
                data: $.param($scope.param_orderStock)
            }).success(function (response) {

                if(200 == response.status){

                    swal({title:"操作成功"},function(){});
                    $scope.orderDetail();


                }else{

                    swal(response.statusText,"","error");
                }
                console.log(response);

            }).error(function () {

                swal('网络出错,请重试',"","error");
            });
        })

    };
    //确认交易完成
    $scope.confirmTopMoney = function(){

        swal({

            title: "确认交易成功?",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "取消",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            closeOnConfirm: false
        },function(){

            $scope.param_confirmMoneny = {

                orderNo : $scope.orderNo
            };
            $http({
                url: $scope.apiUrl_order_confirm_gas_card_ok,
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
                data: $.param($scope.param_confirmMoneny)
            }).success(function (response) {

                if(200 == response.status){

                    swal({title:"确认充值成功"},function(){});
                    $scope.orderDetail();

                }else{

                    swal(response.statusText,"","error");
                }
                console.log(response);

            }).error(function () {

                swal('网络出错,请重试',"","error");
            });
        })
    };

    /************ 更改订单状态 ****************/
    $scope.changeOrderstatus = function () {
        var alertText = ""
        if ($scope.param_changeOrderStatus.status == 21 || $scope.param_changeOrderStatus.status == 22 || $scope.param_changeOrderStatus.status == 23) {
            alertText = "确认跳过 [申请退款] 流程,直接更改订单状态?"
        }
        swal({
                title: "确认更改订单状态?",
                text: alertText,
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "取消",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确认",
                closeOnConfirm: false
            },
            function () {
                $http({
                    //请求地址
                    url: $scope.apiUrl_changeOrderStatus,
                    //请求方法
                    method: "POST",
                    //请求头
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    //请求参数
                    data: $.param($scope.param_changeOrderStatus)
                }).success(function (response) {
                    if (response.status == 200) {
                        swal("修改状态成功!")
                    } else if (response.status == 401) {
                        $cookies.remove('loginStatus');
                        $cookies.remove('loginUserId');
                        window.location.href = "/app/index.html#/";
                        window.location.reload();
                    } else {
                        swal("出错!", response.statusText, "error")
                    }
                }).error(function () {
                    swal("出错!", "网络出错,请重试", "error")
                });
            });
    };


    //是否申请退款
    $scope.confirmReturnMoneny = function(){

        swal({

            title: "确认申请退款?",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "取消",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            closeOnConfirm: false

        },function(){

            $scope.param_returnMoneny = {

                orderNo : $scope.orderNo,
                status : 20
            };
            $http({
                url: $scope.apiUrl_changeOrderStatus,
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
                data: $.param($scope.param_returnMoneny)
            }).success(function (response) {

                if(200 == response.status){

                    swal({title:"申请退款成功"},function(){

                        $("#myModelApply").css("display","none");
                    });

                }else{

                    swal(response.statusText,"","error");
                }
                console.log(response);

            }).error(function () {

                swal('网络出错,请重试',"","error");
            });
        })

    };
    $scope.pageAdjust();
}


/**
 * Created by DKings on 2017/3/27.
 * Desc:新增需求，根据卡号查询卡包含的卡片的信息
 */
//声明路由模块orderDetailedCtrl
angular.module("orderCardNumber",[])
    .component("orderCardNumber",{
        templateUrl:"app/order/order-cardNumber.html",
        controller:orderCardNumberCtrl
    });
//操作orderCardNumberCtrl
function orderCardNumberCtrl($scope,$http,$routeParams) {
    // 变量赋值
    $scope.param_cardNumber = {}; //订单号下的数量
    $scope.mod_cardNumber = [];
    $scope.param_cardNumber.orderNo = $routeParams.orderNo; //定义变量 orderNo接住跨页传参到的orderNo;


    // 请求接口地址
    $scope.apiUrl_cardNumber = '/card/get_card_list'; // 订单详情接口地址
    $scope.pageSizes = [{value:5},{value:15},{value:20},{value:25}]
    $scope.pageSizeSelect = $scope.pageSizes[0].value;//获取商品类型列表

    // 订单下的卡列表
    $scope.queryCardNum = function(){
        $scope.param_cardNumber.pageSize = $scope.pageSizeSelect;
        $http({
            url : $scope.apiUrl_cardNumber,
            method : "POST",
            headers :{"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
            data : $.param($scope.param_cardNumber)
        }).success(function(response){
            console.log("请求订单卡片成功");
            $scope.mod_cardNumber = response.data;
            $scope.pageNum=response.data.pageNum;
            $scope.totalPageCount=response.data.totalPageCount;
            console.info($scope.mod_cardNumber);
        }).error(function(){
            console.log("error");
        });
    };

    $scope.queryCardNum();      // 页面刷新调用方法；

    /*********** 上一页 ****************/

    $scope.previous=function(){
        if($scope.pageNum==1){
            alert("这已经是第一页了!");
        }else{
            $scope.param_cardNumber.pageNO=$scope.pageNum-1;
            $scope.queryCardNum();
        }
    };

    /*********** 下一页 ****************/
    $scope.next=function(){
        if($scope.pageNum==$scope.totalPageCount){
            alert("这已经是最后一页了!");
        }else{
            $scope.param_cardNumber.pageNO=$scope.pageNum+1;
            $scope.queryCardNum();
        }
    };
    /*********** 确认查询 ****************/
    $scope.confirmQuery = function () {
        // console.log($scope.pageSizeSelect);
        $scope.queryCardNum();
        console.log('触发这个方法');
    };

    /*********** 跳转到指定页面 ****************/
    $scope.goToPage=function(){
        if($scope.changePage==null||$scope.changePage==undefined||$scope.changePage==""){
            alert("不能跳转到空白页面!");
        }else if(!($scope.changePage>=1&&$scope.changePage<=$scope.totalPageCount)){
            alert("页面不能小于1,不能大于页面总数!");
        }else{
            $scope.param_cardNumber.pageNO=$scope.changePage;
            $scope.queryCardNum();
        }
    };
    $scope.excludeExcel = function(){
        var param = new Object();
        param.orderNo = $routeParams.orderNo;
        $http({
            url : "/card/excludeCardExcel",
            method : "POST",
            headers :{"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
            data : $.param(param)
        }).success(function(response){
            if(response.status== 200){
                swal("任务提交成功,稍后请到excel导出列表中查看");
            }else{
                swal(response.statusText,"","error");
            }
        }).error(function(){
            swal("网络异常,请重试","","error");
        });
    };
    $scope.pageAdjust();

}
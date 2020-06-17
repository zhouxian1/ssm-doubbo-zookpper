/**
 * Created by DKing on 17/5/31.
 */
angular.module("recyclingConfig",[])
    .component("recyclingConfig",{

        templateUrl: "app/stock/stock-recyclingConfig.html",
        controller: recyclingConfigCtrl
    });

function recyclingConfigCtrl($scope,$http,$timeout,$route,$cookies){
    $scope.isLogined=$cookies.get('loginStatus');
    $scope.loginUserId=$cookies.get('loginUserId');

    //接口地址
    $scope.apiUrl_recycle_stockLogPageList = "/recycle/RecycleLogPageList";

    //请求参数
    $scope.param_stock_list = {};//查询
    $scope.pageSizes = [{value:8},{value:20},{value:50},{value:100}];
    $scope.pageSizeSelect = $scope.pageSizes[0].value;//获取商品类型列表
    $scope.pageNum = 1;
    $scope.totalPageCount = 0;

    //返回来的response
    $scope.mod_stockList = [];

    //调用接口
    $scope.queryRecycleStockLogPageList = function(){

        $scope.param_stock_list.pageSize = $scope.pageSizeSelect
        $scope.param_stock_list.pageNo = $scope.pageNum

        $http({
            url:$scope.apiUrl_recycle_stockLogPageList,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"//FORM形式提交
            },
            data:$.param($scope.param_stock_list)
        }).success(
            function(response){

                if(response.status == 200){
                    $scope.mod_stockList = response.data.list;
                    console.info(response);
                    console.info($scope.mod_stockList);
                }else if(response.status == 403){

                    swal("对不起,您没有权限,请联系管理员!")

                } else if(response.status == 401){

                    $cookies.remove('loginStatus');
                    $cookies.remove('loginUserId');
                    window.location.href="/app/index.html#/";
                    window.location.reload();
                }else{

                    swal(response.statusText,"","error")
                }
                $scope.totalCount = response.data.totalCount;
                console.log($scope.totalCount)
                $scope.pageSize = response.data.pageSize;
                $scope.totalPageCount = response.data.totalPageCount;
                $scope.pageNum = response.data.pageNum;
            }
        ).error(

            function(){

                swal("网络异常,请稍后重试","","error")
            }
        )
    };

    $scope.queryRecycleStockLogPageList();

    //上一页
    $scope.previous=function(){
        if($scope.pageNum==1){
            alert("这已经是第一页了!");
        }else{
            $scope.param_stock_list.pageNO = $scope.pageNum-1;
            $scope.queryRecycleStockLogPageList();
        }
    };

    //下一页
    $scope.next=function(){
        if($scope.pageNum==$scope.totalPageCount){
            alert("这已经是最后一页了!");
        }else{
            $scope.param_stock_list.pageNO=$scope.pageNum+1;
            $scope.queryRecycleStockLogPageList()
        }
    };

    //跳转到指定页面
    $scope.goToPage=function(){

        console.log("跳转到以下页面:"+$scope.changePage);
        if($scope.changePage==null||$scope.changePage==undefined||$scope.changePage==""){
            alert("不能跳转到空白页面!");
        }else if(!($scope.changePage>=1&&$scope.changePage<=$scope.totalPageCount)){
            alert("页面不能小于1,不能大于页面总数!");
        }else {
            $scope.param_stock_list.pageNO = $scope.changePage;
            $scope.queryRecycleStockLogPageList()
        }
    };

    // 选择每页条数
    $scope.confirmQuery = function() {
        console.log($scope.pageSizeSelect)
        $scope.param_stock_list.pageSize = $scope.pageSizeSelect
        $scope.queryRecycleStockLogPageList();
    };


    // /*********** 确认查询 ****************/
    // $scope.confirmQuery = function (flag) {
    //     // console.log($scope.pageSizeSelect);
    //
    //         $scope.queryRecycleStockLogPageList()
    //
    // };

    // $scope.allFull = function(){
    //     $scope.param_query_stock = ""
    //
    // };
}
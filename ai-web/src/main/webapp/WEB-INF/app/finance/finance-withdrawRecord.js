angular.module("withdrawRecord",[])
    .component("withdrawRecord",{
        templateUrl:"app/finance/finance-withdrawRecord.html",
        controller:withdrawRecordCtrl
    });
function withdrawRecordCtrl($scope,$http,$cookies){

    $scope.isLogined=$cookies.get('loginStatus');
    $scope.loginUserId=$cookies.get('loginUserId');
    /*********** url ***************/
    $scope.apiUrl_transferList = "/finance/bankTransferList"; //提现记录列表 58

    /**************定义变量******************/
    $scope.param_transferList = {}; //提现记录列表参数
    console.info($scope.param_firmBankTransferStatus);

    /***************定义数组***********************/
    $scope.mod_transferList =[];// 提现记录列表
    $scope.mod_transferStatusText = ""; // 放入订单状态
    $scope.pageSizes = [{value:20},{value:50},{value:80},{value:100}];
    $scope.pageSizeSelect = $scope.pageSizes[0].value;//获取商品类型列表

    /***************清空查询条件************/
    $scope.emptyQuery = function(){
        $scope.param_transferList = {}; //提现记录列表参数
        $scope.param_firmBankTransferStatus = {};//查询转账状态列表参数
    };

    /********* 查询提现记录列表 ***********/
    $scope.confireQuery = function(){
        console.log($scope.param_transferList);
        $scope.param_transferList.pageSize = $scope.pageSizeSelect;
        $http({
            url:$scope.apiUrl_transferList,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.param_transferList)
        }).success(
            function(response) {
                console.log("请求成功");
                console.log(response);
                if (response.status == 200) {
                    $scope.mod_transferList = response.data.list;
                }else if(response.status == 403){
                    alert("对不起,您没有权限,请联系管理员!")
                }else if(response.status == 401){

                    $cookies.remove('loginStatus');
                    $cookies.remove('loginUserId');
                    window.location.href="/app/index.html#/";
                    window.location.reload();
                } else{
                    alert("对不起," + response.statusText);
                }

                //需要用到的分页显示信息
                $scope.totalCount=response.data.totalCount;
                $scope.pageSize=response.data.pageSize;
                $scope.totalPageCount=response.data.totalPageCount;
                $scope.pageNum=response.data.pageNum;
            }
        ).error(
            function(){
                console.log("查询失败");
        })
    };
    $scope.confireQuery();

    //上一页
    $scope.previous=function(){
        if($scope.pageNum==1){
            alert("这已经是第一页了!");
        }else{
            $scope.param_transferList.pageNO=$scope.pageNum-1;
            $scope.confireQuery();
        }
    };

    //下一页
    $scope.next=function(){
        if($scope.pageNum==$scope.totalPageCount){
            alert("这已经是最后一页了!");
        }else{
            $scope.param_transferList.pageNO=$scope.pageNum+1;
            $scope.confireQuery();
        }
    };
    /*********** 确认查询 ****************/
    $scope.confirmQuery = function () {
        // console.log($scope.pageSizeSelect);

        $scope.confireQuery();
        console.log('触发这个方法');
    };

    //跳转到指定页面
    $scope.goToPage=function(){
        console.log("跳转到以下页面:"+$scope.changePage);
        if($scope.changePage==null||$scope.changePage==undefined||$scope.changePage==""){
            alert("不能跳转到空白页面!");
        }else if(!($scope.changePage>=1&&$scope.changePage<=$scope.totalPageCount)){
            alert("页面不能小于1,不能大于页面总数!");
        }else{
            $scope.param_transferList.pageNO=$scope.changePage;
            $scope.confireQuery();
        }
    };
    $scope.pageAdjust();

}

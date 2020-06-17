angular.module("withdrawDetailed",[])
    .component("withdrawDetailed",{
        templateUrl:"app/finance/finance-withdrawDetailed.html",
        controller:withdrawDetailedCtrl
    });
function withdrawDetailedCtrl($scope,$http,$routeParams,$cookies,$timeout){

    $scope.isLogined=$cookies.get('loginStatus');
    $scope.loginUserId=$cookies.get('loginUserId');
    /********* start controller ************/
    $scope.drawDetaileNum = $routeParams.orderNo;
    $scope.apiUrl_bankTransferInfo = "/finance/bankTransferInfo"; // 查询提现信息 68
    $scope.apiUrl_firmBankTransferStatus = "/finance/firmBankTransferStatus"; // 查询转账状态 69
    $scope.apiUrl_updateTransferStatus = "/finance/update_transfer_status"; //修改转账状态 75
    //$scope.apiUrl_firmNameList = "/finance/firmNameList"; //查询公司名称 74

    $scope.param_updateTransferStatus = {}; //修改转账状态的参数
    $scope.param_updateTransferStatus.orderNo = $scope.drawDetaileNum; //订单编号
    $scope.param_bankTransferInfo = {}; // 查询提现信息的请求参数
    $scope.param_bankTransferInfo.orderNo = $scope.drawDetaileNum ; // 订单编号
    $scope.param_firmBankTransferStatus = {}; //查询转账状态
    //$scope.param_firmName = {}; // 查询公司名称参数

    $scope.mod_bankTransferInfoList = []; //提现信息的model
    $scope.mod_bankName = ""; // 操作人
    $scope.mod_firmBankTransferStatus = []; //转账状态model
    $scope.mod_remark = "";//备注
    //$scope.mod_firmNameList = []; //公司名称列表
    /********* end controller ************/

    /*********** 提现信息的请求***************/
    $http({
        url:$scope.apiUrl_bankTransferInfo,
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: $.param($scope.param_bankTransferInfo)
    }).success(
        function(response) {
            console.log($scope.param_addbankTransfer);
            console.log("恭喜您,提交打款成功!");
            console.log(response);
            if (response.status == 200) {
                $scope.mod_bankTransferInfoList = response.data.bankTransfer;
                $scope.mod_bankName = response.data.name;
            }else if(response.status == 403){
                alert("对不起,您没有权限,请联系管理员!")
            }else if(401 == response.status){

                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
            }
            else{
                alert("对不起," + response.statusText);
            }
        }).error(function(){
        console.log("请求余额添加失败");
    });

    /************ 查询转账状态 *******************/
    $http({
        url:$scope.apiUrl_firmBankTransferStatus,
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: $.param($scope.param_firmBankTransferStatus)
    }).success(
        function(response) {
            console.log($scope.param_addbankTransfer);
            console.log("查看转账状态成功!");
            console.log(response);
            if (response.status == 200) {
                $scope.mod_firmBankTransferStatus = response.data;
            }else if(response.status == 403){
                alert("对不起,您没有权限,请联系管理员!")
            } else if(401 == response.status){

                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
            }
            else{
                $("#error").css("display","block");
                $timeout(function(){
                    $("#error").css("display","none");

                },2000);
                console.log(response.statusText);
                $scope.statustext = response.statusText;
                console.log(statustext);
            }
        }).error(function(){
        console.log("请求余额添加失败");
    });

    /*********** 修改转账状态 ************/
    $scope.changeTransferStatus = function(status){

        $scope.updateTransferStatus = status;
        console.info($scope.updateTransferStatus);
        $("#showImg").css("display","block");

    };
    $scope.sure_delete_or_error = function(){

        $("#delete_or_not_box_error").css("display","none");

    };
    $scope.fire = function(){

        $("#showImg").css("display","none");
        $scope.param_updateTransferStatus ={

            remark:$scope.mod_remark,
            status : $scope.updateTransferStatus,
            orderNo: $scope.drawDetaileNum

        };
        console.info($scope.param_updateTransferStatus);
        $http({
            url:$scope.apiUrl_updateTransferStatus,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.param_updateTransferStatus)
        }).success(
            function(response) {
                console.log(response);
                if (response.status == 200) {

                    alert("恭喜您!修改打款状态成功!");

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
            }).error(function(){
            console.log("修改打款状态失败!");
        });

    };
    $scope.pageAdjust();
    ///********* 查询单位列表 ***************/
    //$http({
    //    url:$scope.apiUrl_firmNameList,
    //    method:"POST",
    //    headers:{
    //        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    //    },
    //    data: $.param($scope.param_firmName)
    //}).success(
    //    function(response) {
    //        console.log(response);
    //        if (response.status == 200) {
    //            $scope.mod_firmNameList = response.data;
    //            console.log($scope.mod_firmNameList);
    //            angular.forEach($scope.mod_firmNameList,function(data){
    //                if($scope.mod_bankTransferInfoList ==data.dicId){
    //
    //                }
    //            })
    //
    //        }else if(response.status == 403){
    //            alert("对不起,您没有权限,请联系管理员!")
    //        } else{
    //            alert("对不起," + response.statusText);
    //        }
    //    }).error(function(){
    //    console.log("请求余额添加失败");
    //})



}

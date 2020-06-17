angular.module("submitPaid",[])
    .component("submitPaid",{
        templateUrl:"app/personalPaid/personal-submitPaid.html",
        controller:submitPaidCtrl
    });
function submitPaidCtrl($scope,$http,$cookies,$timeout){

    $scope.isLogined=$cookies.get('loginStatus');
    $scope.loginUserId=$cookies.get('loginUserId');
    /********* controller的变量 **********/
    $scope.apiUrl_addbankTransfer = '/finance/addbankTransfer'; // 提交打款申请 70
    $scope.apiUrl_firmNameList = "/finance/firmNameList"; //查询公司名称 74

    $scope.param_addbankTransfer = {}; //提交打款申请参数
    $scope.param_firmName = {}; // 查询公司名称参数

    $scope.mod_firmNameList = []; //公司名称列表
    /********* end controller的变量 **********/

    /********* 申请提现 ***********/
    $scope.submitTransfer = function(){
        $http({
            url:$scope.apiUrl_addbankTransfer,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.param_addbankTransfer)
        }).success(
            function(response) {
                console.log($scope.param_addbankTransfer);
                console.log("恭喜您,提交打款成功!");
                console.log(response);
                if (response.status == 200) {

                    //alert("恭喜您,提交打款成功!");
                    $("#delete_or_not_box").css("display","block");
                    $timeout(function(){
                        $("#delete_or_not_box").css("display","none");

                    },1000)

                }else if(response.status == 403){
                    alert("对不起,您没有权限,请联系管理员!")
                } else if(401 == response.status){
                    $cookies.remove('loginStatus');
                    $cookies.remove('loginUserId');
                    window.location.href="/app/index.html#/";
                    window.location.reload();
                }else{

                    $("#error").css("display","block");
                    $timeout(function(){
                        $("#error").css("display","none");

                    },1000);
                    $scope.statustext = response.statusText;
                    console.log($scope.statustext )
                }
            }).error(function(){
            console.log("请求余额添加失败");
        })
    };

    //添加后消失
    $scope.sure_delete_or_not = function(){

        $("#delete_or_not_box").css("display","none");
    };
    $scope.sure_delete_or_error = function(){

        $("#delete_or_not_box_error").css("display","none");

    };

    /*********** 付款单位公司名称列表 ***********/
    $http({
        url:$scope.apiUrl_firmNameList,
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: $.param($scope.param_firmName)
    }).success(
        function(response) {
            console.log($scope.param_firmName);
            console.log("查看公司名称成功!!");
            console.log(response);
            if (response.status == 200) {
                $scope.mod_firmNameList = response.data;
                console.log($scope.mod_firmNameList);
            }else if(response.status == 403){
                alert("对不起,您没有权限,请联系管理员!")
            }else if(401 == response.status){
                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
            } else{
                alert("对不起," + response.statusText);
            }
        }).error(function(){
        console.log("请求余额添加失败");
    })
    $scope.pageAdjust();
}



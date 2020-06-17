angular.module("financeManage",[])
    .component("financeManage",{
        templateUrl:"app/finance/finance-financeManage.html",
        controller:financeManageCtrl
    });
function financeManageCtrl($scope,$http,$cookies,$timeout){

    $scope.isLogined=$cookies.get('loginStatus');
    $scope.loginUserId=$cookies.get('loginUserId');
    /******** 开始 初始化controller ***************/
    // 接口地址
    $scope.apiUrl_addBalances = "/finance/add_balance"; //添加余额接口地址 42
    $scope.apiUrl_balanceList = "/finance/balance_log_info"; //查询余额记录接口地址 41
    $scope.apiUrl_finance_get_balance_info = "/finance/get_balance_info";//129查询账户信息，余额，冻结余额
    $scope.apiUrl_finance_freeze_list = "/finance/freeze_list";//130查询冻结余额
    $scope.apiUrl_finance_unfreeze_balance = "/finance/unfreeze_balance";//131解冻某条记录
    $scope.apiUrl_finance_delete_freeze_balance = "/finance/delete_freeze_balance";//删除某条记录132

    // 请求参数
    $scope.param_addBalance = {}; //添加余额参数
    $scope.param_balanceList = {}; //查询余额列表参数
    $scope.param_get_balance_info = {};//查询账户信息,余额,冻结余额
    $scope.param_thaw={};//解除某条记录
    $scope.param_query_freeze = {
        pageSize:5
    };//查询冻结余额
    $scope.param_delete_freeze_balance = {};//删除某条记录
    $scope.param_addBalance.compId = ''; //用户id
    $scope.param_addBalance.userName = ''; //用户名
    $scope.param_addBalance.addAmount = '';//添加金额
    $scope.param_addBalance.userType = ''; // 用户类型
    $scope.param_addBalance.balanceRemark = '';//余额备注
    $scope.mod_statusList = [
        {status:0,text:"冻结"},
        {status:1,text:"已解冻"}
        ];//状态列表
    $scope.mod_userTypeList = [
        {userType:0,text:"普通用户"},
        {userType:1,text:"大客户"}
    ];
    // $scope.mod_isSave = true;
    $scope.mod_show = true;
    $scope.mod_moneny= false;
    $scope.mod_checkedMoney = '';//选中时
    $scope.mod_freeze = false;//控制是否显示冻结余额
    $scope.mod_freezeBalance = 0;//冻结的金额
    $scope.mod_addbalance = 0;//添加余额

    $scope.mod_addFreezeBalance = '';//添加冻结的金额

    $scope.mod_unFreezeTime = '';//解冻时间
    $scope.mod_freezeRemark = '';//冻结余额的备注
    $scope.mod_getBalance = '';//查询账户余额
    $scope.mod_getAccountType = '';//得到用户类型
    $scope.mod_hasFreeze= '';//是否冻结余额
    $scope.mod_getFreezeList = [];//冻结余额列表
    $scope.pageSizes = [{value:20},{value:50},{value:80},{value:100}];
    $scope.pageSizeSelect = $scope.pageSizes[0].value;//获取商品类型列表

    // model 初始化

    /**********结束 初始化controller *************/

    $scope.addBalances=function(){
        var param = new Object();
        console.log($scope.param_addBalance);
        param.userId = $scope.param_addBalance.compId;
        param.balance = $scope.param_addBalance.balance;
        param.balanceRemark = $scope.param_addBalance.balanceRemark;
        param.hasFreeze = $scope.mod_hasFreeze;
        if($scope.mod_hasFreeze == 1){
            param.freezeBalance = $scope.mod_addFreezeBalance;
            param.unFreezeTime = $scope.mod_unFreezeTime;
            param.freezeRemark = $scope.mod_freezeRemark;
            if(param.freezeBalance == ""||param.freezeBalance == null){

                swal("请填写添加冻结余额");
                return;
            }
            if(param.unFreezeTime == ""|| param.unFreezeTime == null){

                swal("请填写解冻时间");
                return;
            }
            if(param.freezeRemark ==""||param.freezeRemark == null){

                swal("请填写冻结备注");
                return;
            }

        }
        console.log(param.userId);
        if(param.userId == ""||param.userId == null){

            swal("请填写用户ID");
            return;
        }
        if(param.balance == ""||param.balance == null){

            swal("请填写添加余额");
            return;
        }
        if(param.balanceRemark == ""||param.balanceRemark == null){

            swal("请填写余额备注");
            return;
        }

            $http({
                url:$scope.apiUrl_addBalances,
                method:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"//FORM形式提交
                },
                data:$.param(param)
            }).success(
                function(response) {
                    console.log("添加余额请求成功");
                    console.log(response);
                    if (response.status == 200) {

                        // //alert("添加余额成功");
                        // $scope.mod_show = false;
                        // $scope.mod_moneny= true;
                        // $("#delete_or_not_box").css("display","block");
                        // $timeout(function(){
                        //
                        //     $("#delete_or_not_box").css("display","none");
                        //
                        // },2000);
                        swal("添加余额成功");
                        $scope.queryFreezeList();
                        $scope.param_addBalance = "";//添加余额成功之后就清空
                        $scope.mod_freezeRemark = '';
                        $scope.mod_unFreezeTime = '';
                        $scope.param_addBalance.balance = '';
                        $scope.mod_freezeRemark = '';
                        $scope.mod_addbalance = '';
                        $scope.mod_addFreezeBalance ='';
                        $scope.mod_freezeBalance = "";
                    }else if(response.status == 403){
                        swal("对不起,您没有权限,请联系管理员!")
                    } else if(response.status == 401){

                        $cookies.remove('loginStatus');
                        $cookies.remove('loginUserId');
                        window.location.href="/app/index.html#/";
                        window.location.reload();
                    }
                    else{
                        swal(response.statusText, "", "error");
                    }
                }
            ).error(
                function(){
                    swal("网络异常,请稍后重试", "", "error")
                }
            )
        };

    //添加手机号成功后消失
    $scope.sure_delete_or_not = function(){

        $("#delete_or_not_box").css("display","none");
    };
    $scope.know = function(){

        $("#error").css("display","none");

    };
    /******* 清空查询*******/
    $scope.fullAll=function(){
        $scope.param_balanceList={};
    };
    /********* 查询余额列表 **********/
    $scope.queryBalanceLogInfo=function(){
        console.log($scope.param_balanceList);
        $scope.param_balanceList.pageSize = $scope.pageSizeSelect;
        $http({
            url:$scope.apiUrl_balanceList,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.param_balanceList)
        }).success(
            function(response){
                console.log("查询添加记录请求成功");
                console.log(response);
                $scope.addBalanceLogInfo=response.data.list;
                if(response.status==200){
                    console.log("查询添加记录请求成功")
                }else if(response.status == 401){

                    $cookies.remove('loginStatus');
                    $cookies.remove('loginUserId');
                    window.location.href="/app/index.html#/";
                    window.location.reload();
                }
                else{
                    alert("对不起"+response.statusText)
                }
                console.log($scope.addBalanceLogInfo);

                //需要用到的分页显示信息
                //console.log("商品总条数:"+response.data.totalCount);
                $scope.totalCount=response.data.totalCount;
                //console.log("页面显示条数:"+response.data.pageSize);
                $scope.pageSize=response.data.pageSize;
                //console.log("总页数:"+response.data.totalPageCount);
                $scope.totalPageCount=response.data.totalPageCount;
                //console.log("当前页数:"+response.data.pageNum);
                $scope.pageNum=response.data.pageNum;
            }
        ).error(
            function(){
                console.log("查询添加记录请求失败")
            }
        );
    };
    //标签页切换
    $('#myTabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
        $scope.queryFreezeList();
    })
    /****** 页面刷新自动调用 ******/
    $scope.queryBalanceLogInfo();

    //上一页
    $scope.previous=function(){
        if($scope.pageNum==1){
            alert("这已经是第一页了!");
        }else{
            $scope.param_balanceList.pageNO=$scope.pageNum-1;
            $scope.queryBalanceLogInfo();
        }
    };

    //下一页
    $scope.next=function(){
        if($scope.pageNum==$scope.totalPageCount){
            alert("这已经是最后一页了!");
        }else{
            $scope.param_balanceList.pageNO=$scope.pageNum+1;
            $scope.queryBalanceLogInfo();
        }
    };
    /*********** 确认查询 ****************/
    $scope.confirmQuery = function (flag) {
        // console.log($scope.pageSizeSelect);
        if(flag==1){

            $scope.queryBalanceLogInfo();

        }else{

            $scope.queryFreezeList();
        }
    };

    //跳转到指定页面
    $scope.goToPage=function(){

        console.log("跳转到以下页面:"+$scope.changePage);
        if($scope.changePage==null||$scope.changePage==undefined||$scope.changePage==""){
            alert("不能跳转到空白页面!");
        }else if(!($scope.changePage>=1&&$scope.changePage<=$scope.totalPageCount)){
            alert("页面不能小于1,不能大于页面总数!");
        }else{
            $scope.param_balanceList.pageNO=$scope.changePage;
            $scope.queryBalanceLogInfo();
        }
    };
    //控制冻结余额的显示或不显示
    $scope.selectChecked = function(checked){

        console.log(checked);

        if(checked == true){

            $scope.mod_freeze = true;
            $scope.mod_hasFreeze = 1;
        }else{
            $scope.mod_freeze = false;
            $scope.mod_hasFreeze = 0;
        }

    };
    //失去焦点时调用查询的http请求
    $scope.getInfo = function(){

        $scope.param_get_balance_info = {
            userId:$scope.param_addBalance.compId
        };
        if($scope.param_addBalance.compId == ""|| $scope.param_addBalance.compId == null){
            console.log("用户ID为空");
            return;
        }
        $http({

            url: $scope.apiUrl_finance_get_balance_info,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            method: "POST",
            data: $.param($scope.param_get_balance_info)
        }).success(function (response) {

            console.log(response);

            if (200 == response.status) {

                $scope.mod_addbalance = response.data.balance;
                $scope.mod_freezeBalance = response.data.freezeBalance;
                $scope.mod_getAccountType = response.data.accountType;
                $scope.param_addBalance.userName = response.data.userName;
                console.log(response)
            } else if (response.status == 401) {

                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href = "/app/index.html#/";
                window.location.reload();

                console.log("对不起" + response.statusText);
            } else {
                swal(response.statusText, "", "error");
                console.log(response);
            }

        }).error(function () {
            swal("网络异常,请稍后重试", "", "error")
        });

    };
    //查询冻结余额
    $scope.queryFreezeList = function(){

        $scope.param_query_freeze.pageSize = $scope.pageSizeSelect;

        $http({

            url: $scope.apiUrl_finance_freeze_list,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            method: "POST",
            data: $.param($scope.param_query_freeze)

        }).success(function (response) {

            console.log(response);

            if (200 == response.status) {

                // swal("查询成功");
                $scope.mod_getFreezeList = response.data.list;
            } else if (response.status == 401) {

                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href = "/app/index.html#/";
                window.location.reload();

                console.log("对不起" + response.statusText);
            } else {

                swal(response.statusText, "", "error");
                console.log(response);
            }
            $scope.totalCountFreeze=response.data.totalCount;
            console.log("页面显示条数:"+response.data.pageSize);
            $scope.pageSizeFreeze=response.data.pageSize;
            console.log("总页数:"+response.data.totalPageCount);
            $scope.totalPageCountFreeze=response.data.totalPageCount;
            console.log("当前页数:"+response.data.pageNum);
            $scope.pageNumFreeze=response.data.pageNum;

        }).error(function () {
            swal("网络异常,请稍后重试", "", "error")
        });
    };
    $scope.queryFreezeList();
    //上一页
    $scope.previousFreeze = function(){

        if($scope.pageNumFreeze ==1){

            swal("这已经是第一页了!");
        }else{
            $scope.param_query_freeze.pageNO = $scope.pageNumFreeze-1;
            $scope.queryFreezeList();

        }
    };
    //下一页
    $scope.nextFreeze = function(){

        if($scope.pageNumFreeze == $scope.totalPageCountFreeze){

            swal("这是最后一页");
        }else{
            $scope.param_query_freeze.pageNO = $scope.pageNumFreeze+1;
            $scope.queryFreezeList();


        }
    }
    /*********** 确认查询 ****************/

    //跳转到指定页面
    $scope.goToPageFreeze = function(){


        console.log("跳转到以下页面:"+$scope.changePageTwo);

        if($scope.changePageFreeze == null || $scope.changePageFreeze == undefined || $scope.changePageFreeze == ""){

            swal("不能跳转到空白页面!")
        }else if(!($scope.changePageFreeze>=1&&$scope.changePageFreeze<=$scope.totalPageCountFreeze)){

            swal("页面不能小于1,不能大于页面总数!");
        }else{

            $scope.paramGoodsPage.pageNO = $scope.changePageFreeze;
            //$scope.comp_sales_list($scope.paramPage);
            //console.log( $scope.param_compSalesList.pageNum);
            $scope.queryFreezeList();


        }
    };
    //解冻
    $scope.thaw = function(thawId){

        swal({
            title: "确认解冻?",
            showCancelButton: true,
            cancelButtonText: "取消",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            closeOnConfirm: false
        },function(){

            $scope.param_thaw = {

                id:thawId
            };
            $http({

                url: $scope.apiUrl_finance_unfreeze_balance,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                method: "POST",
                data: $.param($scope.param_thaw)

            }).success(function (response) {

                console.log(response);

                if (200 == response.status) {

                    swal("解冻成功");
                    $scope.queryFreezeList();
                } else if (response.status == 401) {

                    $cookies.remove('loginStatus');
                    $cookies.remove('loginUserId');
                    window.location.href = "/app/index.html#/";
                    window.location.reload();

                    console.log("对不起" + response.statusText);
                } else {

                    swal(response.statusText, "", "error");
                    console.log(response);
                }

            }).error(function () {
                swal("网络异常,请稍后重试", "", "error")
            });
        })


    };

    //删除
    $scope.deleteThrow = function(index){

        swal({
            title: "确认删除?",
            showCancelButton: true,
            cancelButtonText: "取消",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            closeOnConfirm: false
        },function(){

            $scope.param_delete_freeze_balance = {

                freezeId:$scope.mod_getFreezeList[index].id
            };

            $scope.mod_getFreezeList.splice(index,1);
            $http({

                url: $scope.apiUrl_finance_delete_freeze_balance,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                method: "POST",
                data: $.param($scope.param_delete_freeze_balance)

            }).success(function (response) {

                console.log(response);

                if (200 == response.status) {

                    swal("删除成功");
                } else if (response.status == 401) {

                    $cookies.remove('loginStatus');
                    $cookies.remove('loginUserId');
                    window.location.href = "/app/index.html#/";
                    window.location.reload();

                    console.log("对不起" + response.statusText);
                } else {

                    swal(response.statusText, "", "error");
                    console.log(response);
                }

            }).error(function () {
                swal("网络异常,请稍后重试", "", "error")
            });

        })


    };
    //清空查询
    $scope.fullAllFreeze = function(){
        $scope.param_query_freeze = {}
    };
    $scope.pageAdjust();
}
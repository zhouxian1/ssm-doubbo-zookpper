angular.module("suppGoods", [])
    .component("suppGoods", {
        templateUrl : "app/channel/channel-suppGoods.html",
        controller  : suppGoodsCtrl
    });

function suppGoodsCtrl($scope, $routeParams, $http,$cookies){

    $scope.isLogined=$cookies.get('loginStatus');
    $scope.loginUserId=$cookies.get('loginUserId');

    $scope.channelCode = $routeParams.channelCode;
    $scope.channelName = $routeParams.channelName;
    console.log( $scope.channelCode );
    console.log( $scope.channelName );

    //1、初始化请求地址
    $scope.initQueryUrl = function(){
        $scope.apiUrl_goods_suppGoodsList        = "/goods/supp_goods_list";        //76 : 查询上游商品列表
        $scope.apiUrl_goods_synchronousSuppGoods = "/goods/synchronous_supp_goods"; //77 : 同步上游接口
    };
    $scope.initQueryUrl();

    //2、初始化请求参数
    $scope.initQueryParam = function(){
        $scope.param_goods_suppGoodsList        = {};
        $scope.param_goods_synchronousSuppGoods = {};
    };
    $scope.initQueryParam();

    //3、初始化绑定数据
    $scope.initQueryMod = function(){
        $scope.mod_queryGoodsName = "";
        $scope.mod_suppGoodsList  = [];
        $scope.mod_currentPage    = 1;
        $scope.mod_totalPage      = 1;
    };
    $scope.initQueryMod();

    //4、查询上游商品函数
    $scope.query_goods_suppGoodsList = function(){
        $scope.param_goods_suppGoodsList = {
            channelCode   : $scope.channelCode,
            suppGoodsName : $scope.mod_queryGoodsName,
            pageNO        : $scope.mod_currentPage,
            pageSize      : 20
        };
        $scope.query_goods_suppGoodsList_http();
    };
    $scope.query_goods_suppGoodsList_http = function(){
        $http({
            url     : $scope.apiUrl_goods_suppGoodsList,
            method  : "POST",
            headers : {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data    : $.param($scope.param_goods_suppGoodsList)
        }).success(function(response){
            console.log($scope.param_goods_suppGoodsList);
            console.log("76接口-查询上游商品列表-请求成功!");
            console.log(response);
            if(200 == response.status){
                $scope.mod_suppGoodsList = response.data.list;
                $scope.mod_currentPage      = response.data.pageNum;
                $scope.mod_totalPage        = response.data.totalPageCount;
            }else if(401 ==response.status){
                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
            }
        }).error(function(response){
            console.log("76接口-查询上游商品列表-请求失败!");
            console.log(response);
        })
    };

    //5、刚进入页面执行一次查询函数
    $scope.query_goods_suppGoodsList();

    //5.5、
    $scope.query_goods_suppGoodsList_buyGoodsName = function(){
        $scope.mod_currentPage=1;
        $scope.query_goods_suppGoodsList();
    };

    //6、同步上游商品
    $scope.query_goods_synchronousSuppGoods = function(){

        $scope.param_goods_synchronousSuppGoods = {
            channelCode : $scope.channelCode
        };

        $http({
            url     : $scope.apiUrl_goods_synchronousSuppGoods,
            method  : "POST",
            headers : {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data    : $.param($scope.param_goods_synchronousSuppGoods)
        }).success(function(response){
            console.log("77接口-同步上游接口-请求成功!");
            console.log(response);
            alert(response.statusText);
        }).error(function(response){
            console.log("77接口-同步上游接口-请求失败!");
            console.log(response);
            alert("同步失败!请重试!");
        })
    };

    //7、分页查询
    //上一页
    $scope.previous=function(){
        if($scope.mod_currentPage==1){
            alert("这已经是第一页了!");
        }else{
            $scope.mod_currentPage=$scope.mod_currentPage-1;
            $scope.query_goods_suppGoodsList();
        }
    };

    //下一页
    $scope.next=function(){
        if($scope.mod_currentPage==$scope.mod_totalPage){
            alert("这已经是最后一页了!");
        }else{
            $scope.mod_currentPage=$scope.mod_currentPage+1;
            $scope.query_goods_suppGoodsList();
        }
    };

    //跳转到指定页面
    $scope.goToPage=function(){
        console.log("跳转到以下页面:"+$scope.changePage);
        if($scope.changePage==null||$scope.changePage==undefined||$scope.changePage==""){
            alert("不能跳转到空白页面!");
        }else if(!($scope.changePage>=1&&$scope.changePage<=$scope.mod_totalPage)){
            alert("页面不能小于1,不能大于页面总数!");
        }else{
            $scope.mod_currentPage=$scope.changePage;
            $scope.query_goods_suppGoodsList();
        }
    }

}
/**
 * Created by shane on 2016/11/23.
 */
angular.module("queryStock",[])
       .component("queryStock",{
           templateUrl:"app/stock/stock-queryStock.html",
           controller:queryStockCtrl
       });

function queryStockCtrl($http, $scope, $routeParams,$cookies){

    $scope.isLogined=$cookies.get('loginStatus');
    $scope.loginUserId=$cookies.get('loginUserId');

    $scope.initQueryUrl = function(){
        $scope.apiUrl_card_queryByStatus = "/card/queryByStatus";
        $scope.apiUrl_card_delCardByCardIds = "/card/delCardsByCardIds";
    };
    $scope.initQueryUrl();


    $scope.initQueryParam = function(){
        $scope.param_card_queryByStatus = {};
        $scope.param_card_delCardByCardIds = {};
    };
    $scope.initQueryParam();


    $scope.initQueryMod = function(){
        $scope.mod_cardList = [];
    };
    $scope.initQueryMod();


    $scope.logId = $routeParams.logId;
    console.log($scope.logId);
    $scope.goodsName = $routeParams.goodsName;
    $scope.suppOrderNo = $routeParams.suppOrderNo;
    console.log($scope.goodsName);

    console.log("进入stock-queryStock页面!");
    console.log(window.location.hash);
    var hashName = window.location.hash;

    console.log(hashName.indexOf("have_been_sold"));
    console.log(hashName.indexOf("not_been_sold"));
    console.log(hashName.indexOf("have_been_lock"));
    console.log(hashName.indexOf("have_been_delete"));
    console.log(hashName.indexOf("queryStock"));

    $scope.query_card_byStatus = function(){
        $http({
            url : $scope.apiUrl_card_queryByStatus,
            method : "POST",
            headers : {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data : $.param($scope.param_card_queryByStatus)
        }).success(function(response){
            console.log("93接口请求成功!");
            console.log(response);
            if(200 == response.status){
                $scope.mod_cardList = response.data.list;
                $scope.pageNum = response.data.pageNum;
                $scope.totalPageCount = response.data.totalPageCount;
            }else if(401 == response.status){
                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
            }
        }).error(function(response){
            console.log("93接口请求失败!");
            console.log(response);
        })
    };

    if(-1 != hashName.indexOf("have_been_sold")){
        //console.log(hashName.indexOf("#/have_been_sold"));
        console.log("1");
        $("#nav1").addClass("active");
        $("#have_been_sold").addClass("active");

        $scope.param_card_queryByStatus = {
            logId : $scope.logId,
            status : 1,
            pageNO : 1,
            pageSize : 5
        };

        $scope.query_card_byStatus();

    }else if(-1 != hashName.indexOf("not_been_sold")){
        //console.log(hashName.indexOf("#/not_been_sold"));
        console.log("2");
        $("#nav2").addClass("active");
        $("#not_been_sold").addClass("active");

        $scope.show_delete_btn = true;

        $scope.param_card_queryByStatus = {
            logId : $scope.logId,
            status : 2,
            pageNO : 1,
            pageSize : 5
        };

        $scope.query_card_byStatus();

    }else if(-1 != hashName.indexOf("have_been_lock")){
        console.log("3");
        $("#nav3").addClass("active");
        $("#have_been_lock").addClass("active");

        $scope.param_card_queryByStatus = {
            logId : $scope.logId,
            status : 3,
            pageNO : 1,
            pageSize : 5
        };

        $scope.query_card_byStatus();

    }else if(-1 != hashName.indexOf("have_been_delete")){
        console.log("4");
        $("#nav4").addClass("active");
        $("#have_been_delete").addClass("active");

        $scope.param_card_queryByStatus = {
            logId : $scope.logId,
            status : 4,
            pageNO : 1,
            pageSize : 5
        };

        $scope.query_card_byStatus();

    }else if(-1 != hashName.indexOf("queryStock")){
        console.log("5");
        $("#nav1").addClass("active");
        $("#have_been_sold").addClass("active");

        $scope.param_card_queryByStatus = {
            logId : $scope.logId,
            status : 1,
            pageNO : 1,
            pageSize : 5
        };

        $scope.query_card_byStatus();

    }

    $scope.cardChecked = [];
    $scope.selectAll = function(){
        if( $scope.select_all ){
            angular.forEach( $scope.mod_cardList, function(mod_card){
                mod_card.checked = true;
                var cardIdStatus = $scope.cardChecked.indexOf(mod_card.cardId);
                if(mod_card.checked && -1==cardIdStatus){
                    $scope.cardChecked.push( mod_card.cardId );
                }
            } )
        }else{
            angular.forEach( $scope.mod_cardList, function(mod_card){
                mod_card.checked = false;
                $scope.cardChecked = [];
            } )
        }
        console.log( $scope.cardChecked );
    };

    $scope.selectOne = function(){
        angular.forEach( $scope.mod_cardList, function(mod_card){
            //console.log(mod_card);
            var cardIdStatus = $scope.cardChecked.indexOf(mod_card.cardId);
            if(mod_card.checked && -1==cardIdStatus){
                $scope.cardChecked.push( mod_card.cardId );
            }else if(!mod_card.checked && -1!=cardIdStatus){
                $scope.cardChecked.splice(cardIdStatus,1);
            }
        });
        console.log( $scope.cardChecked );
        if($scope.cardChecked.length == $scope.mod_cardList.length){
            $scope.select_all = true;
        }else{
            $scope.select_all = false;
        }
    };

    $scope.deleteThisOneCard = function(cardChecked, cardId, index){
        //$scope.mod_cardList.splice(index , 1);
        console.log(cardChecked);
        console.log(cardId);
        console.log(index);
        if(true == cardChecked){
            console.log("已选中,现在可以删除当前卡!");
            $scope.param_card_delCardByCardIds = {
                logId : $scope.logId,
                cardsIds : cardId
            };
            $scope.delete_card_delCardByCardIds_http(index);
        }else{
            console.log("未选中,现在不可以删除当前卡!");
        }
    };

    $scope.deleteSelectCards = function(){
        console.log($scope.cardChecked);
        var cardsIds = $scope.cardChecked.join(',');
        console.log(cardsIds);
        $scope.param_card_delCardByCardIds = {
            logId : $scope.logId,
            cardsIds : cardsIds
        };
        $scope.delete_card_delCardByCardIds_http();
    };

    $scope.delete_card_delCardByCardIds_http = function(index){
        $http({
            url : $scope.apiUrl_card_delCardByCardIds,
            method : "POST",
            headers : {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data : $.param($scope.param_card_delCardByCardIds)
        }).success(function(response){
            console.log(response);
            if(200 == response.status){
                $scope.cardChecked = [];
                //$scope.mod_cardList.splice(index , 1);
                $scope.query_card_byStatus();
                alert("删除成功!");
            }else if(500 == response.status && '' == $scope.param_card_delCardByCardIds.cardsIds){
                alert("请选择要删除的商品!");
            }else if(500 == response.status && '' != $scope.param_card_delCardByCardIds.cardsIds){
                alert("删除失败!");
            }else if(401 == response.status){
                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
            }
        }).error(function(response){
            alert("请求删除失败!");
            console.log(response);
        })
    };


    //上一页
    $scope.previous=function(){
        if($scope.pageNum==1){
            alert("这已经是第一页了!");
        }else{
            $scope.param_card_queryByStatus.pageNO=$scope.pageNum-1;
            console.log($scope.param_card_queryByStatus);
            $scope.query_card_byStatus();
        }
    };
    //下一页
    $scope.next=function(){
        console.log($scope.param_card_queryByStatus);
        console.log("当前页数:"+$scope.pageNum);
        if($scope.pageNum==$scope.totalPageCount){
            alert("这已经是最后一页了!");
        }else{
            $scope.param_card_queryByStatus.pageNO=$scope.pageNum+1;
            console.log($scope.param_card_queryByStatus);
            $scope.query_card_byStatus();
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
            //$scope.parm.pageNO=$scope.changePage;
            //$scope.queryGoods($scope.parm);
            $scope.param_card_queryByStatus.pageNO=$scope.changePage;
            $scope.query_card_byStatus();
        }
    };
    $scope.excludeExcel = function(){
        var param = new Object();
        param.suppOrderNo = $scope.suppOrderNo;
        if(param.suppOrderNo == null || param.suppOrderNo == ''){
            swal("批次号错误","","error");
        }
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
/**
 * Created by liuping on 17/4/17.
 */
angular.module("comeOnCardConfig",[])
    .component({

        templateUrl : "app/order/order-comeOnCardConfig.html",
        controller : comeOnCardConfigCtrl
    });
function comeOnCardConfigCtrl($scope,$http,$cookies){

    $scope.isLogined = $cookies.get('loginStatus');
    $scope.loginUserId = $cookies.get('loginUserId');
    $scope.apiUrl_comeOnCardDetailConfigList = "order/data/comeOnCardDetailConfig.json";
    $scope.stockUrl = "order/data/config.json";
    $scope.apiUrl_goods_charge_goods_types = "/goods/charge_goods_types";//查询充值商品类型
    $scope.apiUrl_goods_charge_goods = "/goods/charge_goods";//126查询充值商品
    $scope.apiUrl_goods_save_charge_goods = "/goods/save_charge_goods";//127保存商品
    $scope.apiUrl_goods_pageList = "/goods/pageList";//商品列表


    $scope.mod_configList = [];
    $scope.paramAllGoods = {};
    $scope.mod_selectGoods = " ";
    $scope.mod_selectList = [];//选择的下拉列表
    $scope.param_select = {};
    $scope.param_save = {};//保存
    $scope.save_list =  [];
    $scope.parmQuery = {}; //查询带条件的商品
    $scope.mod_goodsName = "";//输入商品名称
    $scope.pageSizes = [{value:5},{value:15},{value:20}]
    $scope.pageSizeSelect = $scope.pageSizes[0].value;//获取商品类型列表
    $scope.mod_page={};
    $scope.mod_checkboxList = {};




    /*********** 查询所有商品列表 ***********/
    $scope.paramAllGoods = { //商品列表请求参数
        pageSize: 20,
        pageNO: 1
    };
    $scope.paramGoodsPage = {

        pageSize:5

    };
    //下拉列表请求
    $scope.select = function(){

        $http({

            url:$scope.apiUrl_goods_charge_goods_types,
            method:"POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
            data:$.param($scope.param_select)

        }).success(

            function(response){

                if(response.status == 200){

                    // swal("请求下拉列表成功");
                    $scope.mod_selectList = response.data;
                    console.log($scope.mod_selectList);
                    // angular.forEach($scope.mod_selectList,function(data,index,array){
                    //
                    //
                    //    $scope.mod_selectGoods == data.status;
                    //
                    // })
                }else{

                    swal(response.statusText,"","error");
                }
            }
        ).error(function(){
            swal('网络出错,请重试',"","error");

        })
    };
    $scope.select();
    //ng-change改变
    $scope.selectOrderType = function(){

        console.log($scope.mod_selectGoods);

        $scope.queryAllConfigGoods();
    };
    //只是展示列表
    $scope.queryAllConfigGoods = function(){
        if ($scope.mod_selectGoods == null || $scope.mod_selectGoods == ''){
            return;
        }
        $scope.paramAllGoods = {

            chargeGoodsType : $scope.mod_selectGoods
        };

        $http({
            url: $scope.apiUrl_goods_charge_goods,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.paramAllGoods)
        }).success(
            function (response) {
                if (response.status == 200) {
                    console.log("商品列表请求成功");
                    console.log(response.data);
                    $scope.mod_configList = response.data;

                } else if (401 == response.status) {

                    $cookies.remove('loginStatus');
                    $cookies.remove('loginUserId');
                    window.location.href = "/app/index.html#/";
                } else {
                    swal(response.statusText,"","error");
                }
            }
        ).error(function (response) {
            swal('网络出错,请重试',"","error");
        });
    };
    //删除
    $scope.selectDelect = function(index){

        $scope.mod_configList.splice(index,1);
        console.log(index);
        // $scope.queryAllConfigGoods();


    };
    //保存
    $scope.saveGoodsId = function(goodId){
        var save_list = [];
        angular.forEach($scope.mod_configList,function(data,index,array){
            if(data.goodsId!=""){
                save_list.push(data.goodsId);
                console.log($scope.save_list.join(","));
            }
        });

        var param_save = new Object();
        param_save.chargeGoodsType = $scope.mod_selectGoods;
        param_save.goodsIds = save_list.join(",");

        $http({
            url: $scope.apiUrl_goods_save_charge_goods,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param(param_save)
        }).success(
            function (response) {
                if (response.status == 200) {
                    swal("保存商品成功");
                    console.log(response);

                } else if (401 == response.status) {

                    $cookies.remove('loginStatus');
                    $cookies.remove('loginUserId');
                    window.location.href = "/app/index.html#/";
                } else {
                    swal(response.statusText,"","error");
                }
            }
        ).error(function (response) {
            swal('网络出错,请重试',"","error");
        });

    };

    $scope.fadeModel = function(){

        $("#buyComeOnCardGood").css("display","none");
    };
    $scope.selectModel = function(){

        if($scope.mod_selectGoods == null || $scope.mod_selectGoods== " "){

            swal("请选择类型");
            return;
        }

        $("#buyComeOnCardGood").css("display","block");

    };
    //商品列表
    $scope.modGoodsPageList = function(){

        $scope.paramGoodsPage.pageSize =$scope.pageSizeSelect;
        console.log($scope.mod_page);
        $http({
            //请求地址
            url:$scope.apiUrl_goods_pageList,
            //请求方法
            method:"POST",
            //请求头
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.paramGoodsPage)
        }).success(function(response){

            console.log(response);

            if(response.status==200){
                //console.log('现在的状态码是'+response.status);
                $scope.goodsList=response.data.list;
                $scope.mod_page = response.data.pageSize;
                console.log($scope.mod_page);
                console.log(response.data);
                // swal("请求列表成功")

            }else if(response.status == 401){

                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
                console.log("对不起"+response.statusText);

            }

            //需要用到的分页信息
            $scope.totalCountTwo = response.data.totalCount; //总条数
            console.log("总条数"+$scope.totalCountTwo);
            // $scope.pageSizeTwo = response.data.pageSize;
            $scope.pageSizeTwo = 5;
            console.log("1页显示"+$scope.pageSizeTwo);

            $scope.totalPageCountTwo = response.data.totalPageCount; //总页数
            console.log("总页数"+$scope.totalPageCountTwo);

            $scope.pageNumTwo = response.data.pageNum; //当前页数
            console.log("当前页数"+$scope.pageNumTwo);


        }).error(
            function(response){
                console.log("goodsManage请求失败");

            }
        )
    };


    //分页上一页

    $scope.previousTwo = function(){

        console.log($scope.pageNumTwo);

        if($scope.pageNumTwo == 1){

            alert("当前页数"+$scope.pageNum);
        }else{

            $scope.paramGoodsPage.pageNO = $scope.pageNumTwo-1;
            console.log($scope.paramGoodsPage.pageNO);

            $scope.modGoodsPageList();
        }
    };

    //分下一页
    $scope.nextTwo = function(){

        console.log("当前页数:"+$scope.pageNumTwo);


        if($scope.pageNumTwo == $scope.totalPageCountTwo){

            alert("这已经是最后一页")
        }else {

            $scope.paramGoodsPage.pageNO = $scope.pageNumTwo+1;
            console.log($scope.paramGoodsPage.pageNO);
            $scope.modGoodsPageList();

        }
    };
    /*********** 确认查询 ****************/
    $scope.confirmQuery = function () {
        // console.log($scope.pageSizeSelect);
        $scope.paramGoodsPage.pageNO = 1;
        $scope.modGoodsPageList();
        console.log('触发这个方法');
    };

    //跳转到指定页面
    $scope.goToPageTwo = function(){


        console.log("跳转到以下页面:"+$scope.changePageTwo);

        if($scope.changePageTwo == null || $scope.changePageTwo == undefined || $scope.changePageTwo == ""){

            alert("不能跳转到空白页面!")
        }else if(!($scope.changePageTwo>=1&&$scope.changePageTwo<=$scope.totalPageCountTwo)){

            alert("页面不能小于1,不能大于页面总数!");
        }else{

            $scope.paramGoodsPage.pageNO = $scope.changePageTwo;
            //$scope.comp_sales_list($scope.paramPage);
            //console.log( $scope.param_compSalesList.pageNum);
            $scope.modGoodsPageList();


        }
    };
    //
    //选择商品列表
    $scope.modGoodsPageList();

    //搜索
    $scope.searchGoods = function(){

        $scope.modGoodsPageList();
    };
    //点击选择时
    $scope.selectOne = function(model){

        // $scope.model = model;
        // console.log($scope.model);
        // $scope.mod_checkboxList = model.goodsName;
        var check = true;//声明一个全局变量为true的时候就添加
        angular.forEach($scope.mod_configList,function(data,index){

            if(data.amount == model.amount){
                check=false;
                swal("该面值的商品已存在");
                return;
            }
            if(data.goodsId == model.goodsId){

                check=false;
                swal("该商品的ID已存在");
                return;
            }
        });

        if(!check){

            return;
        }
        //点击选择时把选择的卡加入到一个数组中
        var tmp = new Object();//new一个新对象
        tmp.goodsName = model.goodsName;
        tmp.goodsId = model.goodsId;
        tmp.amount = model.amount;
        $scope.mod_configList.push(tmp);
        console.log(tmp);

    };
    $('html, body').animate({                 //添加animate动画效果
        scrollTop: 0
    }, 1000);
    console.log("触发这个方法")


}
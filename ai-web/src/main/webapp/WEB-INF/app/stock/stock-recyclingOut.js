/**
 * Created by liuping on 17/5/31.
 */
angular.module("recyclingOut",[])
    .component("recyclingOut",{

        templateUrl: "app/stock/stock-recyclingManage.html",
        controller: recyclingOutCtrl
    });

function recyclingOutCtrl($scope,$http,$timeout,$route,$cookies){

    $scope.isLogined=$cookies.get('loginStatus');
    $scope.loginUserId=$cookies.get('loginUserId');

    //接口地址
    $scope.apiUrl_creat_order = "/recycle/createOrder";//133
    $scope.apiUrl_recycle_stockLogPageList = "/recycle/outRecyclePageList"

    //请求参数
    $scope.param_creat_order = {};  //出库请求参数
    $scope.pageSizes = [{value:5},{value:20},{value:50},{value:80}];
    $scope.pageSizeSelect = $scope.pageSizes[0].value;//获取商品类型列表
    $scope.param_stock_list = {};
    $scope.pageNum = 1;
    $scope.totalPageCount = 0;
    //返回来的response
    $scope.mod_stockList = [];
    // 页面变量
    $scope.displayIdList = false;           // 商品ID的列表展示与否
    $scope.paramGoodsPage = {};             // 商品ID的请求参数
    // $scope.pageSizesMin = [{value:10},{value:20},{value:50}]
    $scope.pageSizeSelectMin = 10;//获取商品类型列表
    $scope.apiUrl_cardId_list = '/goods/pageList';
    $scope.mod_page = 0;


    // 出库
    $scope.creatOrder = function(){
        if (($scope.param_creat_order.goodsId === '') || ($scope.param_creat_order.goodsId === undefined)) {
            swal('请填写商品ID和商品名称')
            return
        }
        if (($scope.param_creat_order.count === '') || ($scope.param_creat_order.count === undefined)) {
            swal('请填写出库数量')
            return
        }
        if (($scope.param_creat_order.price === '') || ($scope.param_creat_order.price === undefined)) {
            swal('请填写出库单价')
            return
        }
        if (($scope.param_creat_order.email === '') || ($scope.param_creat_order.email === undefined)) {
            swal('请填写收货邮箱')
            return
        }
        $http({
            url:$scope.apiUrl_creat_order,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"//FORM形式提交
            },
            data:$.param($scope.param_creat_order)
        }).success(
            function(response){

                if(response.status == 200){
                    swal('出库成功！')
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
            }
        ).error(
            function(){
                swal("网络异常,请稍后重试","","error")
            }
        )
    };

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

    // 商品Id联动
    $scope.chooseGoodId = function () {
        $scope.displayIdList = true
        $scope.modGoodsPageList()
    };
    // 关闭idlist
    $scope.fadeModel = function(){
        $scope.displayIdList = false
    };
    // 搜索商品对应的id
    $scope.searchGoods = function(){
        $scope.paramGoodsPage.pageNO = 1
        $scope.modGoodsPageList();
    };
    //商品id列表
    $scope.modGoodsPageList = function(){

        $scope.paramGoodsPage.pageSize =$scope.pageSizeSelectMin;

        $http({
            //请求地址
            url:$scope.apiUrl_cardId_list,
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
                $scope.goodsList=response.data.list;
                $scope.mod_page = response.data.pageSize;
                console.log($scope.mod_page);

            }else if(response.status == 401){
                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
                console.log("对不起"+response.statusText);
            }

            //需要用到的分页信息
            $scope.totalCountTwo = response.data.totalCount; //总条数
            $scope.pageSizeTwo = 5;
            $scope.totalPageCountTwo = response.data.totalPageCount; //总页数
            $scope.pageNumTwo = response.data.pageNum; //当前页数
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
    //选中其中一个
    $scope.selectedGood = function(model){
        console.log(model);
        $scope.param_creat_order.goodsName = model.goodsName
        $scope.param_creat_order.goodsId = model.goodsId
        $scope.displayIdList = false
    };
}
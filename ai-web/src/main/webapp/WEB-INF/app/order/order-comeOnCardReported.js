/**
 * Created by liuping on 17/4/17.
 */
angular.module("comeOnCardReported",[])
    .component("comeOnCardReported",{

        templateUrl : "app/order/order-comeOnCardReported.html",
        controller : comeOnCardReportedCtrl
    });

function comeOnCardReportedCtrl($scope,$http,$cookies,$timeout){

    $scope.logined = $cookies.get('loginStatus');
    $scope.loginUserId = $cookies.get('loginUserId');
    $scope.apiUrl_reported = "/card/list";
    $scope.paramGoodsPage = {

        status : 7,
        pageSize:5
    };
    $scope.mod_reportedList = [];
    $scope.pageSizes = [{value:5},{value:10},{value:15},{value:20}];
    $scope.pageSizeSelect = $scope.pageSizes[0].value;//获取商品类型列表
    $scope.reportedList = function(){

        $scope.paramGoodsPage.pageSize = $scope.pageSizeSelect;
        $scope.paramGoodsPage.orderColumn = "buyOrderNo";
        // $scope.patamGoodsPage = {
        //
        //     orderColumn:"buyOrderNo"
        // };

        $http({

            url:$scope.apiUrl_reported,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.paramGoodsPage)
        }).success(

            function(response){

                if(200 == response.status){

                    console.log(response.data);
                    $scope.mod_reportedList = response.data.list;
                }else if (response.status == 401) {

                    $cookies.remove('loginStatus');
                    $cookies.remove('loginUserId');
                    window.location.href = "/app/index.html#/";
                    window.location.reload();
                }else{

                    swal(response.statusText,"","error");
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
            }
        ).error(

            function(){

                swal('网络出错,请重试',"","error");

            }
        )

    };
    $scope.reportedList();
    //分页上一页

    $scope.previousTwo = function(){

        console.log($scope.pageNumTwo);

        if($scope.pageNumTwo == 1){

            alert("当前页数"+$scope.pageNum);
        }else{

            $scope.paramGoodsPage.pageNO = $scope.pageNumTwo-1;
            console.log($scope.paramGoodsPage.pageNO);

            $scope.reportedList();
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
            $scope.reportedList();


        }
    };
    /*********** 确认查询 ****************/
    $scope.confirmQuery = function () {
        // console.log($scope.pageSizeSelect);
        $scope.paramGoodsPage.pageNO = 1;
        $scope.reportedList();
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
            $scope.reportedList();


        }
    };
    //页面置顶
    $('html, body').animate({                 //添加animate动画效果
        scrollTop: 0
    }, 1000);
    console.log("触发这个方法")


}
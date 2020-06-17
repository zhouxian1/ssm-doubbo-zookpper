/**
 * Created by liuping on 17/5/15.
 */
angular.module("exportExcel", [])
    .component("exportExcel", {

        templateUrl: "app/stock/stock-exportExcel.html",
        controller: exportExcelCtrl
    });
function exportExcelCtrl($scope, $http, $timeout, $route, $cookies) {

    $scope.logined = $cookies.get('loginStatus');
    $scope.loginUserId = $cookies.get('loginUserId');

    //接口的路径
    $scope.apiUrl_cardExcels = "/card/excels_list";
    $scope.mod_excelsList = [];//定义数组用来接返回来的数组
    $scope.pageSizes = [{value: 5}, {value: 15}, {value: 20}];
    $scope.paramExcel = {};
    $scope.pageSizeSelect = $scope.pageSizes[0].value;//获取商品类型列表

    //查询excel表
    $scope.queryExcel = function () {

        $scope.paramExcel.pageSize = $scope.pageSizeSelect;

        $http({

            url: $scope.apiUrl_cardExcels,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.paramExcel)
        }).success(function (response) {
            if (200 == response.status) {

                console.log(response.data);
                $scope.mod_excelsList = response.data.list;
                console.info($scope.mod_excelsList);
            } else if (response.status == 401) {

                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href = "/app/index.html#/";
                window.location.reload();
            } else {

                swal(response.statusText, "", "error");
            }

            //需要用到的分页信息
            $scope.totalCountTwo = response.data.totalCount; //总条数
            console.log("总条数" + $scope.totalCountTwo);
            // $scope.pageSizeTwo = response.data.pageSize;
            $scope.pageSizeTwo = 5;
            console.log("1页显示" + $scope.pageSizeTwo);

            $scope.totalPageCountTwo = response.data.totalPageCount; //总页数
            console.log("总页数" + $scope.totalPageCountTwo);

            $scope.pageNumTwo = response.data.pageNum; //当前页数
            console.log("当前页数" + $scope.pageNumTwo);

        }).error(
            function () {
                swal('网络出错,请重试', '', "error");
            }
        )


    };
    $scope.queryExcel();

    //查询
    $scope.queryCardList = function () {

        $scope.queryExcel();

    };
    $scope.previousTwo = function () {

        console.log($scope.pageNumTwo);

        if ($scope.pageNumTwo == 1) {

            swal("当前页数" + $scope.pageNum);
        } else {

            $scope.paramExcel.pageNO = $scope.pageNumTwo - 1;
            console.log($scope.paramExcel);

            $scope.queryExcel();
        }
    };

    //分下一页
    $scope.nextTwo = function () {

        console.log("当前页数:" + $scope.pageNumTwo);


        if ($scope.pageNumTwo == $scope.totalPageCountTwo) {

            swal("这已经是最后一页")
        } else {

            $scope.paramExcel.pageNO = $scope.pageNumTwo + 1;
            $scope.queryExcel();


        }
    };

    //跳转到指定页面
    $scope.goToPageTwo = function () {

        console.log("跳转到以下页面:" + $scope.changePageTwo);

        if ($scope.changePageTwo == null || $scope.changePageTwo == undefined || $scope.changePageTwo == "") {

            swal("不能跳转到空白页面!")
        } else if (!($scope.changePageTwo >= 1 && $scope.changePageTwo <= $scope.totalPageCountTwo)) {

            swal("页面不能小于1,不能大于页面总数!");
        } else {

            $scope.paramExcel.pageNO = $scope.changePageTwo;
            $scope.queryExcel();


        }
    };

    /*********** 确认查询 ****************/
    $scope.confirmQuery = function () {
        $scope.queryExcel();
    };
    $scope.pageAdjust();

}
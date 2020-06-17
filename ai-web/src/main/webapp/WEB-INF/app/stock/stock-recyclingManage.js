/**
 * Created by liuping on 17/5/31.
 */
angular.module("recycling",[])
    .component("recycling",{

        templateUrl: "app/stock/stock-recyclingManage.html",
        controller: recyclingCtrl
    });

function recyclingCtrl($scope,$http,$timeout,$route,$cookies,$location){
    //url
    $scope.apiUrl_application= $scope.commonUrl+"v1/app/application";//应用列表接口
    // $scope.apiUrl_application= $scope.commonUrl+"v1/app/application";//应用列表接口
    $scope.apiUrl_check = $scope.commonUrl+"v1/app/application/check";//审核接口
    //请求参数
    $scope.applicationList = [];//返回列表
    $scope.statusText = "";
    $scope.paramApplication = {};//列表
    $scope.paramcheckContent =  {};//核对内容
    $scope.pageSi= 20;

    //列表
    $scope.application = function (currentPage,pageSize) {
        // if(paramPage!=null){
        //     $scope.paramApplication.page = paramPage
        // }
        $http({
            // url:$scope.apiUrl_application+"?page="+currentPage+"&per_page="+pageSize+"&orderK=created_at&orderV=desc",
            url:$scope.apiUrl_application+"?page="+currentPage+"&per_page="+pageSize,

            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }

        }).success(function(response){
            console.log(response);
            $scope.applicationList = response.data.data;
            var options = {
                pageNo: currentPage,
                totalPages: Math.ceil(response.data.total/response.data.per_page),
                onPageChanged: function (e, oldPage, newPage) {
                    console.log(oldPage);
                    console.log(newPage);
                    console.log(e);
                    $scope.application(newPage, pageSize);
                }
            };
            $('#pageBottom').bootstrapPaginator(options);
            //需要用到的分页信息
            $scope.totalCount = response.data.total;
            angular.forEach($scope.applicationList,function(data){
                if(data.status == 0){
                    data.text = "待审核"
                }
                if(data.status == 1){
                    data.text = "审核通过"
                }
                if(data.status == 2){
                    data.text = "审核失败"
                }
            })
            // console.log($scope.totalCount);
            // console.log("总条数")
            $scope.pageSize = response.data.per_page;
            console.log('每页数量')
            console.log($scope.pageSize)
            $scope.pageNum = response.data.current_page;
            console.log($scope.pageNum);
            console.log("当前页数")
            console.log("一页显示多少条totalPageCount");
            console.log("一共显示多少页totalCount");
            //一页展示多少条
            // $scope.totalPageCount = response.data.
        })
    }
    $scope.application(1,$scope.pageSi)
    //审核v1/app/plugins/check
    $scope.checkContent = function(id){
        $scope.paramcheckContent.id = id
        $scope.paramcheckContent.status = 1
        console.log(id)
        $http({
            url:$scope.apiUrl_check,
            method:"POST",
            headers:{
               "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data:$.param($scope.paramcheckContent)
        }).success(function(response){
            if(response.code == 1000){
                swal("审核成功")
                $scope.application($scope.pageNum,$scope.pageSi)
            }else{
                swal(response.msg)
            }
        })
    };

    //分页

}
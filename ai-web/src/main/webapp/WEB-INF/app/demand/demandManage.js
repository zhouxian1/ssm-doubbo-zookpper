/**
 * Created by liuping on 17/8/7.
 */
//声明路由模块inStock
angular.module("demand",[])
    .component("demand",{
        templateUrl:"app/demand/demandManage.html",
        controller:demandManageCtrl
    });
function demandManageCtrl($scope,$http,$timeout,$route,$cookies){

    //url
    $scope.api_url_demand = $scope.commonUrl+"v1/app/demands";
    $scope.api_url_check = $scope.commonUrl+"v1/app/demands/check";

    //参数
    $scope.demandsList = [];
    $scope.checkoutParam = {}
    $scope.pageSi= 5;

    $scope.demandList = function(currentPage,pageSize){

        $scope.demandParam = {};
        $http({
            url:$scope.api_url_demand+"?page="+currentPage+"&per_page="+pageSize,
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).success(function(data){
            var options = {
                pageNo: currentPage,
                totalPages: Math.ceil(data.data.total/data.data.per_page),
                onPageChanged: function (e, oldPage, newPage) {
                    console.log(oldPage);
                    console.log(newPage);
                    console.log(e);
                    $scope.demandList(newPage, pageSize);
                }
            };
            $('#pageBottom').bootstrapPaginator(options);
            //需要用到的分页信息
            $scope.totalCount = data.data.total;
            // console.log($scope.totalCount);
            // console.log("总条数")
            $scope.pageSize = data.data.per_page;
            console.log('每页数量')
            console.log($scope.pageSize)
            $scope.pageNum = data.data.current_page;
            console.log($scope.pageNum);
            console.log("当前页数")
            console.log("一页显示多少条totalPageCount");
            console.log("一共显示多少页totalCount");
            console.log(data)
            $scope.demandsList = data.data.data;
            angular.forEach($scope.demandsList,function(data){
                console.log(data)
                if(data.status == 0){
                    data.mod_statusText = "待审核状态"
                }
                if(data.status == 1){
                    data.mod_statusText = "审核完成"
                }
                if(data.status == 2){
                    data.mod_statusText = "审核"
                }
            })
        })


    }
    $scope.demandList(1,$scope.pageSi);
    //审核
    $scope.checkout = function (id){

        $scope.checkoutParam.id=id
        $scope.checkoutParam.status=1
        $http({
            url:$scope.api_url_check,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data:$.param($scope.checkoutParam)
        }).success(function(res){
            if(res.code == 1000){
                swal("审核成功")
                $scope.demandList($scope.pageNum,$scope.pageSi);
            }else{
                swal(res.msg)
            }
        })
    }
}
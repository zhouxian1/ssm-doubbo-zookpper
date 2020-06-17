//声明路由模块orderManadeCtrl
angular.module('orderManage', [])
    .component('orderManage', {
        templateUrl: 'app/order/orderManage.html',
        controller: orderManageCtrl
    });
//对orderManageCtrl
function orderManageCtrl($scope, $http, $cookies) {

    $scope.apiUrl_knowledges= $scope.commonUrl+"v1/admin/knowledges";//知识列表接口
    $scope.apiUrl_knowledges_delete= $scope.commonUrl+"v1/admin/knowledges/del";//知识删除接口

    //參數
    //v1/admin/knowledges/del/{id}
    $scope.apiUrl_knowledges_List=[];
    $scope.pageSi= 5;

    $scope.getList=function (currentPage,pageSize) {
        $http({
            url:$scope.apiUrl_knowledges+"?page="+currentPage+"&per_page="+pageSize,
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }

        }).success(function(response){
            console.log(response)
            var options = {
                pageNo: currentPage,
                totalPages: Math.ceil(response.data.total/response.data.per_page),
                onPageChanged: function (e, oldPage, newPage) {
                    console.log(oldPage);
                    console.log(newPage);
                    console.log(e);
                    $scope.getList(newPage, pageSize);
                }
            };
            $('#pageBottom').bootstrapPaginator(options);
            //需要用到的分页信息
            $scope.totalCount = response.data.total;
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
            $scope.applicationList = response.data.data;
            $scope.totalCount = response.data.total;
            console.log($scope.totalCount);
            $scope.pageSize = response.data.per_page;
            console.log($scope.pageSize)
            $scope.pageNum = response.data.current_page;
            console.log($scope.pageNum);
            $scope.apiUrl_knowledges_List=response.data.data;
            console.log($scope.apiUrl_knowledges_List);

        });
    }
    $scope.getList(1,$scope.pageSi);

    $scope.delete =function(id){
        $http({
            url:$scope.apiUrl_knowledges_delete+'/'+id,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).success(function(response){
            if(response.code == 1000){
                swal("删除成功")
                $scope.getList($scope.pageNum,$scope.pageSi);
            }else{
                swal(response.msg)
            }

            console.log(response)

        }).error(function(response){
            alert("刪除知识失败")
        });
    };

}

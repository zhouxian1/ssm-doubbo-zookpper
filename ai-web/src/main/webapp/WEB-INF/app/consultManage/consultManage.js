/**
 * Created by liuping on 17/8/22.
 */
angular.module("consultManage",[])
    .component("consultManage",{
        templateUrl:"app/consultManage/consultManage.html",
        controller:consultManageCtrl
    });
function consultManageCtrl($scope,$http){
    $scope.apiUrl_knowledges= $scope.commonUrl+"v1/admin/articles";//资讯列表
    $scope.apiUrl_knowledges_delete= $scope.commonUrl+"v1/admin/articles/del";//知识删除接口

    //參數
    $scope.apiUrl_knowledges_List=[];
    $scope.pageSi= 20;

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
            console.log(response)
            if(response.code == 1000){
                swal("删除成功")
                $scope.getList($scope.pageNum,$scope.pageSi);
            }else{
                swal(response.msg)
            }
        }).error(function(response){
           swal("删除失败")
        });
    };
}
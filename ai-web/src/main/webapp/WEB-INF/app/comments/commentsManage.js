/**
 * Created by liuping on 17/8/7.
 */
//声明路由模块inStock
angular.module("comments",[])
    .component("comments",{
        templateUrl:"app/comments/commentsManage.html",
        controller:commentsManageCtrl
    });

function commentsManageCtrl($scope,$http,$timeout,$route,$cookies,$location){






    //url
    // $scope.apiUrl_application= "v1/admin/comments"; // 评论列表接口
    $scope.apiUrl_application= $scope.commonUrl+"v1/admin/comments"; // 评论列表接口
    // $scope.apiUrl_comments = "v1/admin/comments/check/id/status";//审核
    $scope.apiUrl_comments = $scope.commonUrl+"v1/admin/comments/check/";//审核

    //请求参数
    $scope.applicationList = []; // 返回列表
    $scope.paramApplication = {}
    $scope.pageNum="";
    $scope.checkoutParam = {}
    $scope.pageSi= 5;

    //列表
    $scope.commentList = function (currentPage,pageSize) {

        $http({
            url:$scope.apiUrl_application+"?page="+currentPage+"&per_page="+pageSize,
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).success(function(response){
            console.log(response)
            console.log(response)
            var options = {
                pageNo: currentPage,
                totalPages: Math.ceil(response.data.total/response.data.per_page),
                onPageChanged: function (e, oldPage, newPage) {
                    console.log(oldPage);
                    console.log(newPage);
                    console.log(e);
                    $scope.commentList(newPage, pageSize);
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
        })
    }
    $scope.commentList(1,$scope.pageSi)
    $scope.checkoutContent = function(id,status){

        $http({
            url:$scope.apiUrl_comments+id+"/1",
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).success(function(res){
            if(res.code == 1000){
                swal("审核成功")
                $scope.commentList($scope.pageNum,$scope.pageSi)
            }else{
                swal(res.msg)
            }
        })

    }

}
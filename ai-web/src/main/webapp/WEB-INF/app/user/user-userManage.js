//声明路由模块userManage
angular.module("userManage",[])
    .component("userManage",{

        templateUrl:"app/user/user-userManage.html",
        controller:userManageCtrl

    });
//声明控制器函数userManageCtrl
function userManageCtrl($scope,$http,$cookies){
    //url
    $scope.api_url = $scope.commonUrl+"v1/admin/users";
    $scope.api_check = $scope.commonUrl+"v1/admin/users";
    //参数
    $scope.usersList = [];
    $scope.param_users  = {}
    $scope.pageSi= 20;

    $scope.admin_users = function(currentPage,pageSize){

        $http({
            url:$scope.api_url+"?page="+currentPage+"&per_page="+pageSize,
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }

        }).success(function(data){
            console.log(data)
            var options = {
                pageNo: currentPage,
                totalPages: Math.ceil(data.data.total/data.data.per_page),
                onPageChanged: function (e, oldPage, newPage) {
                    console.log(oldPage);
                    console.log(newPage);
                    console.log(e);
                    $scope.admin_users(newPage, pageSize);
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

            $scope.usersList= data.data.data
            $scope.totalCount = data.data.total;
        })
    }
    $scope.admin_users(1,$scope.pageSi);
    //审核
    $scope.checkoutUser=  function(id,status,type){

        $scope.param_users.status = 1;
        $http({
            url:$scope.api_check+"/"+id+"/checking",
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data:$.param($scope.param_users)
        }).success(function(res){
            console.log(res)
            if(res.code == 1000){
                swal("审核通过");
                $scope.admin_users($scope.pageNum,$scope.pageSi);
            }else{
                swal(res.msg)
            }
        })
    }
}
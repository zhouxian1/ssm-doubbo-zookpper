//声明路由模块channelManage
angular.module("channelManage",[])
    .component("channelManage",{
        templateUrl:"app/channel/channel-channelManage.html",
        controller:channelManageCtrl
    });
//声明控制器函数channelManageCtrl
function channelManageCtrl($scope,$http,$cookies){
    //url
    $scope.apiUrl_labels= $scope.commonUrl+"v1/admin/labels/";//应用列表接口
    $scope.apiUrl_labels_delete= $scope.commonUrl+"v1/admin/labels/del";//应用列表接口

    //參數
    $scope.apiUrl_labels_List=[];
    $scope.paramlLabelPage = {

    }
    $scope.pageSi= 20;
    $scope.getList=function (currentPage,pageSize) {
        // param.pageNum = currentPage;page	页码（默认1）
        // 2	per_page	每页条数（默认10）
        // param.pageSize = pageSize;
        // $scope.paramlLabelPage.page = currentPage
        // $scope.paramlLabelPage.per_page = pageSize
        $http({
            url:$scope.apiUrl_labels+"?page="+currentPage+"&per_page="+pageSize+"&orderK=created_at&orderV=desc",
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }

        }).success(function(response){
            console.log(response);
            $scope.apiUrl_labels_List=response.data.data;


            angular.forEach($scope.apiUrl_labels_List, function(data,index,array){
                console.log(data.a+'='+array[index].a);
                switch (data.type){
                    case 1:
                        data.type="插件";
                        break;
                    case 2:
                        data.type="应用";
                        break;
                }
            });


            console.log($scope.apiUrl_labels_List);
            var options = {
                pageNo: currentPage,
                totalPages:  Math.ceil(response.data.total/response.data.per_page),
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

        });
    }
    $scope.getList(1,$scope.pageSi);

    $scope.delete =function(id){
        $http({
            url:$scope.apiUrl_labels_delete+"/"+id,
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
            // data:$.param(id)

        }).success(function(response){
            console.log(response);
            if(response.code == 1000){
                swal('删除成功')
                $scope.getList($scope.pageNum,$scope.pageSi);

            }else{
                swal(response.msg)
            }

        }).error(function(response){
            swal("刪除标签失败");
        });
    };
}

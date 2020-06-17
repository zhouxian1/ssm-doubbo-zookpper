//声明路由模块addBatch
angular.module("addBatch", [])
    .component("addBatch", {
        templateUrl: "app/stock/stock-addBatch.html",
        controller: addBatchCtrl
    })
    .directive('customOnChange', function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var onChangeHandler = scope.$eval(attrs.customOnChange);
                element.bind("change", onChangeHandler);
            }
        }
    })
    .directive('selectOnChange', function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var onChangeHandler = scope.$eval(attrs.selectOnChange);
                element.bind("change", onChangeHandler);
            }
        }
    });

//声明控制器函数addBatchCtrl
function addBatchCtrl($scope, $http, $timeout, $route, $cookies) {
    //url
    // http://api.geovis.yunxiaotui.wang/v1/admin/documents

    $scope.apiUrl_classifications= $scope.commonUrl+"v1/admin/classifications";//应用列表接口
    $scope.apiUrl_classifications_delete= $scope.commonUrl+"v1/admin/classifications/del";//应用列表接口


    //參數
    $scope.pageSi= 5;
    $scope.classifications_List=[];

    $scope.getList=function (currentPage,pageSize) {
        $http({
            url:$scope.apiUrl_classifications+"?page="+currentPage+"&per_page="+pageSize,
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
            // $scope.apiUrl_classifications=response.data.data;
            $scope.classifications_List = response.data.data
            angular.forEach($scope.classifications_List,function(data){
                console.log(data);

                if(data.type == 1){
                    data.mod_statusText = "资讯"
                }
                if(data.type == 2){
                    data.mod_statusText = "样本"
                }
                if(data.type == 3){
                    data.mod_statusText = "算法"
                }
                if(data.type == 4){
                    data.mod_statusText = "需求"
                }
                if(data.type == 5){
                    data.mod_statusText = "知识"
                }
                if(data.type == 6){
                    data.mod_statusText = "文档"
                }
            })
            console.log($scope.classifications_List);
            console.log(response.data.data)

        });
    }
    $scope.getList(1,$scope.pageSi);

    $scope.delete =function(id){
        $http({
            url:$scope.apiUrl_classifications_delete+"/"+id,
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }

        }).success(function(response){
            console.log(response)
            if(response.code == 1000){
                swal("删除成功");
                $scope.getList($scope.pageNum,$scope.pageSi);
            }else{
                swal(response.msg)
            }
        }).error(function(response){
            alert("刪除分类失败")
        });
    };
}
angular.module("webBanner",[])
    .component("webBanner",{
        templateUrl:"app/web/web-webBannerImg.html",
        controller:webBannerCtrl
    })
    .directive('customOnChange',function(){
        return{
            restrict:"A",
            link:function(scope,element,attrs){
                var onChangeHandler=scope.$eval(attrs.customOnChange);
                element.bind('change',onChangeHandler);
            }
        }
    });

function webBannerCtrl($scope, $http, $compile){

    $scope.apiUrl_knowledges_plugins= $scope.commonUrl+"v1/admin/rotations/";//轮播列表
    $scope.apiUrl_rotations_delete= $scope.commonUrl+"v1/admin/rotations/del";//知识删除接口

    //參數
    //
    $scope.plugins_List=[];
    $scope.pageSi= 5;


    $scope.bannerList=function (currentPage,pageSize) {
        $http({
            url:$scope.apiUrl_knowledges_plugins+"?page="+currentPage+"&per_page="+pageSize,
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }

        }).success(function(response){
            console.log(response)
            $scope.plugins_List=response.data.data;
            console.log($scope.plugins_List);
            var options = {
                pageNo: currentPage,
                totalPages: Math.ceil(response.data.total/response.data.per_page),
                onPageChanged: function (e, oldPage, newPage) {
                    console.log(oldPage);
                    console.log(newPage);
                    console.log(e);
                    $scope.bannerList(newPage, pageSize);
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
            $scope.totalCount = response.data.total;
            console.log($scope.totalCount);
            $scope.pageSize = response.data.per_page;
            console.log($scope.pageSize)
            $scope.pageNum = response.data.current_page;
            console.log($scope.pageNum);

        });
    }
    $scope.bannerList(1,$scope.pageSi);

    $scope.deleteBanner =function(id){
        $http({
            url:$scope.apiUrl_rotations_delete+'/'+id,
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).success(function(response){
            console.log(response)
            if(response.code == 1000){
                swal("删除轮播")
                $scope.bannerList($scope.pageNum,$scope.pageSi);

            }else{
                swal(response.msg)
            }

        }).error(function(response){
            swal("刪除知识失败")
        });
    };
}

define(['app'], function(app) {
    app.controller('userSampleManageController', userSampleManageController);
    userSampleManageController.$inject = ['$scope','$location','userCenterService','$cookies','baseUrl4','baseUrl5'];
    function userSampleManageController($scope,$location,$userCenterService,$cookies,baseUrl4,baseUrl5) {
        $scope.urlType=1;
        $scope.urlTypeShendu=2;
        if($location.absUrl().indexOf("http://www.")>-1){//有www
            $scope.urlType=1;
            $scope.urlTypeShendu=2;
        }else{
            $scope.urlTypeShendu=4;
            $scope.urlType=3;
        }

        var services = $userCenterService.lists;
        $scope.downloadUrl=baseUrl5+"/datasets";
        $scope.baseImgUrl=baseUrl4;

        $scope.total=0;
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 10;  // 每页条数 默认10条

        //
        // console.log(123)
        // 购买-下载
        $scope.download = function(item){
            console.log($scope.downloadUrl+item.dataset_id);
            if($cookies.get("access_token")) {
                window.open(baseUrl5+"/dl/dataset/download?access_token="+$cookies.get("access_token")+"&id="+item.dataset_id);
            }else{
                $location.path("/");
            }
        };
        // $scope.orderSampleList=[];
        $scope.user={
            access_token:$cookies.get("access_token"),
            role:$cookies.get("role"),
            user_name:$cookies.get("user_name"),
            user_id:$cookies.get("user_id")
        };
        getOrderSampleList();
        function getOrderSampleList () {
            if($cookies.get("user_id")){
                services.getOrderSampleList( $scope.current ,$scope.pageTotal,$cookies.get("user_id"),$scope.urlType).then(function (res) {
                    console.log(res);
                    if (res.status === 200) {
                        $scope.total= res.data.count;
                        $scope.orderSampleList = res.data.data;
                    }
                });
            }else{
                // alert("请登录后再试！")
                $location.path("/");
            }
        }

        // ======== tgd添加开始 ==========

        $scope.jumpPage = function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.current = $scope.search_current;
                getOrderSampleList();
            }
        }
        $scope.search = function(bool) {
            if (bool) {
                getOrderSampleList();

            }
        };
        // ======== tgd添加结束 ==========
    }
});

define(['app'], function(app) {
    app.controller('demandListController', demandListController);
    demandListController.$inject = ['$scope','$location','demandService'];
    function demandListController($scope,$location,$demandService) {
        $scope.demandList={};
        $scope.classificationList={};
        $scope.hotDemandList={};

        $scope.total=0;
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 16;  // 每页条数 默认10条

        $scope.order='bidding_count|desc';
        $scope.classification_id=0;
        var services = $demandService.lists;

        function getList() {
            services.getDemandList($scope.current,$scope.pageTotal,$scope.classification_id,$scope.order).then(function (res) {
                if(res.status===200){
                    $scope.demandList = res.data.data.data;
                    $scope.total = res.data.data.total; // tgd添加

                    // if(order=="id|desc"){
                    //     $scope.hotDemandList= res.data.data.data;
                    // }
                    console.log(res)
                }
            }) ;
        }
        services.getHot().then(function(res) {
            if (res.status === 200) {
                $scope.hotDemandList=res.data.data;
                console.log(res)
            }
        });
        getList();
        services.getClassifications(1,20,4).then(function (res) {
            if(res.status===200){
                $scope.classificationList = res.data.data.data;
                console.log($scope.classificationList);
            }
        }) ;
        $scope.list = function(id){
            if(id!=$scope.classification_id){
                console.log(id);
                $scope.classification_id=id;
                getList();
            }
        }
        $scope. ordersClick=function (order) {
            if(order!=$scope.order){
                console.log(order);
                $scope.order=order;
                getList();
            }
        }



        // ======== tgd添加开始 ==========

        $scope.jumpPage = function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.current = $scope.search_current;
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                getList();
            }
        }
        $scope.search = function(bool) {
            if (bool) {
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                getList();
            }

        };
        // ======== tgd添加结束 ==========
    }
})


   



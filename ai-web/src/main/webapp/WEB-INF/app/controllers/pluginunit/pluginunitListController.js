define(['app'], function(app) {
    app.controller('pluginunitListController', pluginunitListController);
    pluginunitListController.$inject = ['$scope','$location','pluginunitListService'];

    function pluginunitListController($scope,$location,$pluginunitListService) {
        
        $scope.pluginunitList={};
        $scope.hotPluginunitList={};
        $scope.order='buy_count|desc';
        $scope.labId=0;
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 16;  // 每页条数 默认10条

        var services = $pluginunitListService.lists;
        // 请求参数详情
        // 参数名	说明	必填	类型
        // order	排序（最新发布 ： id|desc 最多购买：buy_count|desc 评论最多 ： comment_count|desc ）	是	[string]
        function getPage (page,per_page,order,label_id) {
            services.getPlugins(page,per_page,order,label_id).then(function (res) {
                console.log("page="+page+",per_page="+per_page+",order="+order+',label_id='+label_id);

                if(res.status===200){
                    $scope.pluginunitList = res.data.data.data;
                    $scope.total = res.data.data.total; // tgd添加
                    console.log(res)
                }
            });
        }
        services.getHot().then(function (res) {
            if(res.status===200){
                $scope.hotPluginunitList=res.data.data;
                console.log(res)
            }
        });
        getPage($scope.current,$scope.pageTotal,$scope.order,0);
        $scope.labsList={};
        services.getLabels(1,20).then(function (res) {
            if(res.status===200){
                $scope.labsList = res.data.data.data;
                console.log(res)
            }
        });



        // ======== tgd添加开始 ==========
        // $scope.current = 1; //当前页 默认值为1
        // $scope.pageTotal = 2;  // 每页条数 默认10条
        $scope.jumpPage = function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.current = $scope.search_current;
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                getPage($scope.current, $scope.pageTotal,$scope.order, $scope.labId);

            }
        }
        $scope.search = function(bool) {
            if (bool) {
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                getPage($scope.current, $scope.pageTotal,$scope.order, $scope.labId);

            }

        }
        // ======== tgd添加结束 ==========

        $scope.list = function(id){
            if(id!=$scope.labId){
                console.log(id);
                $scope.labId=id;
                $scope.current=1;
                getPage($scope.current, $scope.pageTotal,$scope.order, $scope.labId);
            }
        }
        $scope.list2 = function(id){
            if(id!=$scope.order){
                console.log(id);
                $scope.order=id;
                $scope.current=1;
                getPage($scope.current, $scope.pageTotal,$scope.order, $scope.labId);
            }

        }
    }
})

   



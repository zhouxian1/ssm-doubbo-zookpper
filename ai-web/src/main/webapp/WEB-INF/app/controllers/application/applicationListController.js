define(['app'], function(app) {
    app.controller('applicationListController', applicationListController);
    applicationListController.$inject = ['$scope', '$location', 'applicationService'];

    function applicationListController($scope, $location, applicationService) {
        var services = applicationService.lists;
        $scope.hotApplication={};
        // 获取标签
        services.getLabels(1,20).then(function(res) {
            if (res.status === 200) {
                $scope.labels = res.data.data.data;
                console.log(res);
            }
        });
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 16;  // 每页条数 默认10条
        $scope.order = 'buy_count|desc';  // 每页条数 默认10条
        $scope.labId = 0;  // 每页条数 默认10条

        // 排序（最新发布 ： id|desc 最多购买：buy_count|desc 评论最多 ： comment_count|desc ）
        function getPage(page, per_page, order,label_id) {
            services.getPage(page, per_page, order,label_id,"").then(function(res) {
                if (res.status === 200) {
                    $scope.application = res.data.data.data;
                    $scope.total = res.data.data.total; // tgd添加
                    console.log(res.data.data.data)
                }
            });
        }
        services.getHot().then(function(res) {
            if (res.status === 200) {
                $scope.hotApplication=res.data.data;
                console.log(res)
            }
        });
        // $scope.$watch('param.page+param.per_page+param.order', getData( $scope.current,$scope.pageTotal,$scope.order,$scope.labId));
        getPage( $scope.current,$scope.pageTotal,$scope.order,$scope.labId);

        // ======== tgd添加开始 ==========

        $scope.jumpPage = function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.current = $scope.search_current;
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                getPage( $scope.current,$scope.pageTotal,$scope.order,$scope.labId)
            }
        }
        $scope.search = function(bool) {
            if (bool) {
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                getPage( $scope.current,$scope.pageTotal,$scope.order,$scope.labId)
            }

        };
        // ======== tgd添加结束 ==========


        $scope.labsClick = function(id){
            if(id!=$scope.labId){
                console.log(id);
                $scope.labId=id;
                // getList(1,10,$scope.order, $scope.lab);
                // getPage( $scope.param.page,$scope.param.per_page,$scope.param.order,$scope.param.labId);
                $scope.current=1;
                getPage( $scope.current,$scope.pageTotal,$scope.order,$scope.labId);
            }
        }
        $scope.ordersClick = function(order){
            if(order!= $scope.order){
                // console.log(order);
                $scope.order=order;
                $scope.current=1;
                // getList(1,10,$scope.order, $scope.lab);
                getPage( $scope.current,$scope.pageTotal,$scope.order,$scope.labId);
                // getPage( $scope.param.page,$scope.param.per_page,$scope.param.order,$scope.param.labId);
                // getPage( $scope.current,$scope.pageTotal,$scope.order,$scope.labId);
            }
        }

    }
})

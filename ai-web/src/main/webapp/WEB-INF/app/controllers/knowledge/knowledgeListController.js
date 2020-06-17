define(['app'], function(app) {
    app.controller('knowledgeListController', knowledgeListController);
    knowledgeListController.$inject = ['$scope', 'knowledgesService', '$http', '$compile', '$cookies'];

    function knowledgeListController($scope, knowledgesService, $http, $compile, $cookies) {
        // $cookies服务
        // var obj = {name: 'zhang', id: 123}
        // $cookies.putObject('user', obj); // 设置
        // $scope.b = $cookies.getObject('user'); // 获取
        // console.log($scope.b)

        
        $scope.knowledgesList = {};
        $scope.classificationList = {};
        $scope.classification_id = 0;
        var services = knowledgesService.lists;
        getPage = function(page, per_page, classification_id) {
            services.getPage(page, per_page, classification_id).then(function(res) {
                console.log(res);
                if (res.status === 200) {
                    console.log(res.data.data.data);
                    $scope.total = res.data.data.total; // tgd添加
                    $scope.knowledgesList = res.data.data.data;
                }
            });
        };
        // ======== tgd添加开始 ==========
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 10;  // 每页条数 默认10条
        $scope.jumpPage = function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                // $scope.current = $scope.search_current;
                if($scope.current==""||$scope.current==undefined){
                    $scope.current=1;
                }
                getPage($scope.current, $scope.pageTotal, $scope.classification_id);
            }
        };
        $scope.search = function(bool) {
            if (bool) {
                // $scope.current = $scope.search_current;
                if($scope.current==""||$scope.current==undefined){
                    $scope.current=1;
                }
                getPage($scope.current, $scope.pageTotal, $scope.classification_id);
            }

        };
        // ======== tgd添加结束 ==========

        getPage($scope.current, $scope.pageTotal, $scope.classification_id);  // tgd修改
        $scope.content = {};
        services.getDetailPage(1).then(function(res) {
            console.log(res);
            if (res.status === 200) {
                console.log(res.data.data.content);
                $scope.content = res.data.data.content;
            }
        });
        services.getClassifications(1, 20, 4).then(function(res) {
            console.log(res);
            if (res.status === 200) {
                $scope.classificationList = res.data.data.data;
            }
        });
        $scope.list = function(id) {
            console.log(id);
            $scope.classification_id = id;
            getPage(1, 10, $scope.classification_id);
        };
    }

    app.filter('to_trusted', ['$sce', function ($sce) {
    　　return function (text) {
        　　return $sce.trustAsHtml(text);
    　　};
    }]);
});
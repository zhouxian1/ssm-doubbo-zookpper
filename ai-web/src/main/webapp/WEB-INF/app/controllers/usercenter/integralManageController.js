/**
 * Created by HP on 2017/8/30.
 */
define(['app'], function(app) {
    app.controller('integralManageController', integralManageController);
    integralManageController.$inject = ['$scope', '$location', 'integralService','$cookies'];

    function integralManageController($scope, $location, $integralService,$cookies) {
        var services = $integralService.lists;
        $scope.integralList={};
        $scope.total=0;
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 16;  // 每页条数 默认10条
        function getPage() {
            if($cookies.get("user_id")){
                services.getIntegralList($scope.current, $scope.pageTotal,$cookies.get("user_id")).then(function (res) {
                    if(res.status===200){
                        console.log(res);
                        $scope.total = res.data.data.total; // tgd添加
                        $scope.integralList = res.data.data.data;
                    }
                });
            }else{
                $location.path("/");
            }
        }

        getPage();

        // ======== tgd添加开始 ==========

        $scope.jumpPage = function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.current = $scope.search_current;
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                getPage()
            }
        }
        $scope.search = function(bool) {
            if (bool) {
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                getPage()
            }

        };
        // ======== tgd添加结束 ==========
    }
});
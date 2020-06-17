/**
 * Created by HP on 2017/8/30.
 */
define(['app'], function(app) {
    app.controller('applyManageController', applyManageController);
    applyManageController.$inject = ['$scope', '$location', 'userCenterService','$cookies'];

    function applyManageController($scope, $location, $userCenterService,$cookies) {
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 10;  // 每页条数 默认10条
        $scope.total=0;
        $scope.userList={}
        //  把url传过来的参数取出来的方法id
        function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }

        var shareComplaintDetailId=GetRequest();

        $scope.demandId = shareComplaintDetailId.demandId;

        var services = $userCenterService.lists;
        function getToubiaoList() {

            if($cookies.get("user_id")){
                services.getDemandToubiaoList( $scope.current, $scope.pageTotal, $scope.demandId,$cookies.get("user_id")).then(function (res) {
                    if(res.status===200){
                        $scope.total = res.data.data.total; // tgd添加

                        $scope.userList = res.data.data.data;
                        console.log(res)
                    }
                });
            }else{
                $location.path("/");
            }

        }
        getToubiaoList();


        // ======== tgd添加开始 ==========

        $scope.jumpPage = function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.current = $scope.search_current;
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                getToubiaoList();

            }
        }
        $scope.search = function(bool) {
            if (bool) {
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                getToubiaoList();

            }

        }
        // ======== tgd添加结束 ==========
    }
});
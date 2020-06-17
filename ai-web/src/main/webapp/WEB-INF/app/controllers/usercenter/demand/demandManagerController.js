/**
 * Created by HP on 2017/8/25.
 */
define(['app'], function(app) {
    app.controller('demandManagerController',demandManagerController);
    demandManagerController.$inject = ['$scope', '$location','userCenterService','$cookies'];

    function demandManagerController($scope,$location, $userCenterService,$cookies) {
        var services = $userCenterService.lists;
        $scope.state=1;
        $scope.demandList={};
        $scope.order='id|desc';
        $scope.lab='0';
        $scope.user_id=1;

        $scope.total=0;
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 10;  // 每页条数 默认10条
        //购买的需求
        function getFabuList() {
            if($cookies.get("user_id")){
                services.getFabuList( $scope.current,$scope.pageTotal,$cookies.get("user_id")).then(function (res) {
                    if(res.status===200){
                        $scope.total = res.data.data.total; // tgd添加

                        $scope.demandList = res.data.data.data;
                        console.log(res)
                    }
                }) ;
            }else{
                $location.path("/");
            }

        }
        //中标的
        function getZhongbiaoList( ) {

            if($cookies.get("user_id")){
                services.getZhongbiaoList( $scope.current,$scope.pageTotal,$cookies.get("user_id")).then(function (res) {
                    if(res.status===200){
                        $scope.total = res.data.data.total; // tgd添加

                        $scope.demandList = res.data.data.data;
                        console.log(res)
                    }
                }) ;
            }else{
                $location.path("/");
            }
        }
        //投标的
        function getToubiaoList() {

            if($cookies.get("user_id")){
                services.getToubiaoList( $scope.current,$scope.pageTotal,$cookies.get("user_id")).then(function (res) {
                    if(res.status===200){
                        $scope.total = res.data.data.total; // tgd添加

                        $scope.demandList = res.data.data.data;
                        console.log(res)
                    }
                }) ;
            }else{
                $location.path("/");
            }

        }
        getFabuList();
        $scope.clickState=function (state) {
            if($scope.state!=state){
                $scope.current=1;
                $scope.state=state;
                if($scope.state==1){
                    getFabuList();
                }else if($scope.state==2){
                    getToubiaoList();
                }else{
                    getZhongbiaoList();
                }
            }
        }
        $scope.abandon=function (id) {
            if($cookies.get("user_id")){
                services.abandonDemand($cookies.get("user_id"),id).then(function (res) {
                    if(res.status===200&&res.data.code==1000){
                        console.log(res);
                        getToubiaoList();
                    }else{
                        alert("取消失败");
                    }
                }) ;
            }else{
                $location.path("/");
            }
        }
        // ======== tgd添加开始 ==========

        $scope.jumpPage = function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.current = $scope.search_current;
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                if($scope.state==1){
                    getFabuList();
                }else if($scope.state==2){
                    getToubiaoList();
                }else{
                    getZhongbiaoList();
                }
            }
        }
        $scope.search = function(bool) {
            if (bool) {
                if($scope.state==1){
                    getFabuList();
                }else if($scope.state==2){
                    getToubiaoList();
                }else{
                    getZhongbiaoList();
                }
            }
        };
        // ======== tgd添加结束 ==========
    }

});
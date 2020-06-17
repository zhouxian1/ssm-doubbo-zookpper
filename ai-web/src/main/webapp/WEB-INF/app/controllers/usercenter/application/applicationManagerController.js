/**
 * Created by HP on 2017/8/26.
 */
define(['app'], function(app) {
    app.controller('applicationManagerController', applicationManagerController);
    applicationManagerController.$inject = ['$scope', '$location', 'applicationService','$cookies'];
    function applicationManagerController($scope, $location, applicationService,$cookies) {
        // 获取应用列表
        // 第三个参数： id|desc、buy_count|desc、comment_count|desc
        var services = applicationService.lists;
        $scope.application={};
        $scope.appState=1;
        $scope.total=0;
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 10;  // 每页条数 默认10条
        $scope.order= 'id|desc';
        $scope.lab=0;

        // 排序（最新发布 ： id|desc 最多购买：buy_count|desc 评论最多 ： comment_count|desc ）
        function getData() {

            if($cookies.get("user_id")){
                    services.getYifabu($scope.current , $scope.pageTotal, $scope.order,$scope.lab,$cookies.get("user_id")).then(function(res){
                        if (res.status === 200) {
                            $scope.total = res.data.data.total; // tgd添加
                            $scope.application = res.data.data.data;

                            angular.forEach($scope.application, function(data,index,array){
                                // console.log(data.a+'='+array[index].a);
                                if(data.status==0){
                                    $scope.application.statusstr="未审核";
                                }else{
                                    $scope.application.statusstr="已审核";
                                }
                            });
                            console.log(res);
                        };
                    });
            }else{
                $location.path("/");
            }
        }
        function getOrdered() {
            if($cookies.get("user_id")){
                services.getOrdered($scope.current ,$scope.pageTotal,$cookies.get("user_id")).then(function(res){
                    if (res.status === 200) {
                        $scope.total = res.data.data.total; // tgd添加
                        $scope.application = res.data.data.data;


                        angular.forEach($scope.application, function(data,index,array){
                                $scope.application.statusstr="已购买";

                            // console.log(data.a+'='+array[index].a);
                            // if(data.status==0){
                            //     $scope.application.statusstr="未审核";
                            // }else{
                            //     $scope.application.statusstr="已审核";
                            // }
                        });
                        console.log(res);
                    };
                });
            }else{
                $location.path("/");
            }
        }
        getOrdered();
        $scope.clickapp=function (state) {
            if($scope.appState!=state){
                $scope.current=1;
                $scope.appState=state;
                if( $scope.appState==1){
                    getOrdered();
                }else{
                    getData();
                }
            }
        };
        // ======== tgd添加开始 ==========

        $scope.jumpPage = function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.current = $scope.search_current;
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                if( $scope.appState==1){
                    getOrdered();
                }else{
                    getData();
                }
            }
        }
        $scope.search = function(bool) {
            if (bool) {
                if( $scope.appState==1){
                    getOrdered();
                }else{
                    getData();
                }
            }
        };

        $scope.deleteApplication = function(item) {
            console.log(item);
            if($cookies.get("user_id")){
                services.abandonApplication($cookies.get("user_id"),item.id).then(function (res) {
                    if(res.status===200&&res.data.code==1000){
                        console.log(res);
                        getData();
                    }else{
                        alert("取消失败");
                    }
                }) ;
            }else{
                $location.path("/");
            }
        };

        $scope.updateApplication = function(item) {
            console.log(item)
        }
        // ======== tgd添加结束 ==========
    }
});
/**
 * Created by HP on 2017/8/25.
 */
define(['app'], function(app) {
    app.controller('pluginunitmanageController',pluginunitmanageController);
    pluginunitmanageController.$inject = ['$scope', '$location','pluginunitListService','$cookies'];

    function pluginunitmanageController($scope,$location, $pluginunitListService,$cookies) {
        $scope.pluginunitList={};
        // $scope.orderedpluginunitList={};

        // $scope.hotPluginunitList={};
        $scope.order='id|desc';
        $scope.lab=0;
        $scope.state=1;
        $scope.total=0;
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 16;  // 每页条数 默认10条


        var services = $pluginunitListService.lists;
        // 请求参数详情
        // 参数名	说明	必填	类型
        // order	排序（最新发布 ： id|desc 最多购买：buy_count|desc 评论最多 ： comment_count|desc ）	是	[string]
        function getPage() {
            if($scope.state==1){
                getOrdered();
            }else{
                getYifabu();
            }

        }
        function getYifabu () {
            if($cookies.get("user_id")){
                services.getYifabu( $scope.current ,$scope.pageTotal , $scope.order,0,$cookies.get("user_id")).then(function (res) {
                    if (res.status === 200) {
                        $scope.total = res.data.data.total; // tgd添加
                        $scope.pluginunitList = res.data.data.data;
                        angular.forEach($scope.pluginunitList, function (data) {
                            console.log(data.status);
                            if (data.status == 0) {
                                data.statusstr = '待审核';
                            } else if (data.status == 1) {
                                data.statusstr = '审核通过';
                            } else if (data.status == 2) {
                                data.statusstr = '审核失败';
                            }
                        });
                    }
                });
            }else{
                $location.path("/");
            }
        }
        function getOrdered () {
            services.getOrdered( $scope.current ,$scope.pageTotal ,$cookies.get("user_id")).then(function (res) {
                if (res.status === 200) {
                    $scope.total = res.data.data.total; // tgd添加
                    $scope.pluginunitList=res.data.data.data;

                    angular.forEach($scope.pluginunitList, function (data) {
                        console.log(data.plugins_detail.status);
                        if (data.plugins_detail.status == 0) {
                            data.plugins_detail.statusstr = '待审核';
                        } else if (data.plugins_detail.status == 1) {
                            data.plugins_detail.statusstr = '审核通过';
                        } else if (data.plugins_detail.status == 2) {
                            data.plugins_detail.statusstr = '审核失败';
                        }
                    });
                }
            });
        }
        getPage();
        var data={
            user_id:1,
            id:0,
            is_shelf:2
        }
       $scope.updatePlugins= function (item) {
           data.id=item.id;
           if(item.is_shelf==1){
               data.is_shelf=2;
           }else{
               data.is_shelf=1;
           }
           console.log(item.id);
            services.updatePlugins(data).then(function (res) {
                if(res.status==0){
                    getPage();
                }
            });
        }



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

    $scope.click=function (state) {
        if(state!=$scope.state){
            $scope.current=1;
            $scope.state=state;
            getPage()
        }
    }
    }
});
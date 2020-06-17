
/**
 * Created by HP on 2017/8/26.
 */
define(['app'], function(app) {

    app.controller('searchController', searchController);
    searchController.$inject = ['$scope', '$location', 'searchService'];

    function searchController($scope, $location, searchService) {

        // 获取get值
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

        var shareComplaintDetailId = GetRequest();
        $scope.searchStr = shareComplaintDetailId.search;

        // 获取搜索列表
        var services = searchService.lists;
        // $scope.searchService = {};
        $scope.appState = 1;
        $scope.total = 0;
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 2;  // 每页条数 默认10条
        // $scope.search_current=1;
        function articleData() {
            services.getArticles($scope.current, $scope.pageTotal, $scope.searchStr).then(function (res) {
                if (res.status === 200) {
                    $scope.total = res.data.data.total; // tgd添加
                    $scope.list = res.data.data.data;
                    // console.log(res);
                };
            });
        };
        articleData();

        function applicationsData() {
            services.getApplications($scope.current, $scope.pageTotal, $scope.searchStr).then(function (res) {
                if (res.status === 200) {
                    $scope.total = res.data.data.total; // tgd添加
                    $scope.list = res.data.data.data;
                    // console.log(res);
                };
            });
        };

        function pluginsData() {
            services.getPlugins($scope.current, $scope.pageTotal, $scope.searchStr).then(function (res) {
                if (res.status === 200) {
                    $scope.total = res.data.data.total; // tgd添加
                    $scope.list = res.data.data.data;
                    // console.log(res);
                };
            });
        };

        function demandsData() {
            services.getDemands($scope.current, $scope.pageTotal, $scope.searchStr).then(function (res) {
                if (res.status === 200) {
                    $scope.total = res.data.data.total; // tgd添加
                    $scope.list = res.data.data.data;
                    // console.log(res);
                };
            });
        };

        var getData = function () {
            switch ($scope.appState) {
                case 1:
                    articleData();
                    // console.log($scope.appState);
                    break;
                case 2:
                    // console.log($scope.appState);
                    break;
                case 3:
                    // console.log($scope.appState);
                    break;
                case 4:
                    pluginsData();
                    // console.log($scope.appState);
                    break;
                case 5:
                    applicationsData();
                    // console.log($scope.appState);
                    break;
                case 6:
                    // console.log($scope.appState);
                    break;
                case 7:
                    demandsData();
                    // console.log($scope.appState);
                    break;
                default:
                    // console.log($scope.appState);
            }
        }

        $scope.clickApp = function (state) {
            if ($scope.appState != state) {
                //console.log(state);
                $scope.current = 1;
                $scope.appState = state;
                getData();
            }
        };
        // ======== tgd添加开始 ==========
        // $scope.current = 1; //当前页 默认值为1
        // $scope.pageTotal = 10;  // 每页条数 默认10条
        $scope.jumpPage = function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                // $scope.current = $scope.search_current;
                if($scope.current==""||$scope.current==undefined){
                    $scope.current=1;
                }
                getData();

            }
        }
        $scope.search = function(bool) {

            if (bool) {
                // $scope.current = $scope.search_current;
                if($scope.current==""||$scope.current==undefined){
                    $scope.current=1;
                }
                console.log( $scope.current );

                getData();

            }

        }
        // ======== tgd添加结束 ==========

        $scope.refresh = function () {
            $scope.searchStr = document.getElementById("searchBigInput").value;
            getData();
        }
    }

});
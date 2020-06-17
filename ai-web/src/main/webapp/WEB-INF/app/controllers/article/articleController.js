/**
 * Created by HP on 2017/8/19.
 */
define(['app'], function(app) {
    app.controller('articleController', articleController);
    articleController.$inject = ['$scope', '$location', 'articleService'];

    function articleController($scope, $location, articleService) {
        //参数
        $scope.background_color = false;
        $scope.articleList={};
        $scope.classifications={};
        $scope.classificationId=0;
        $scope.total=0;
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 10;  // 每页条数 默认10条
        // $scope.articid=0;
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
        console.log( shareComplaintDetailId);

        $scope.classificationId= shareComplaintDetailId.classificationId;
        if($scope.classificationId===undefined){
            $scope.classificationId=0;
        }
        console.log( $scope.classificationId);
        var services = articleService.lists;
        function getPage(page,per_page,classification_id) {
            services.getArticles(page, per_page, classification_id).then(function (res) {
                console.log(res);
                if(res.status===200){
                // $scope.total = res.data.data.data.total; // tgd添加
                    $scope.total = res.data.data.total; // tgd添加

                    console.log($scope.length);

                    $scope.articleList = res.data.data.data;
            }
        }) ;
        }
        // ======== tgd添加开始 ==========

        $scope.jumpPage = function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.current = $scope.search_current;
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                getPage( $scope.current,$scope.pageTotal,$scope.order,$scope.classificationId)
            }
        }
        $scope.search = function(bool) {
            if (bool) {
                getPage( $scope.current,$scope.pageTotal,$scope.classificationId)
            }
        };
        // ======== tgd添加结束 ==========
        getPage($scope.current,$scope.pageTotal,$scope.classificationId);
        services.getClassifications(1,50,1).then(function (res) {
            if(res.status===200){
                $scope.classifications = res.data.data.data;
                console.log( $scope.classifications);
            }
        }) ;
        $scope.list = function(id){
            console.log(id);
            $scope.classificationId=id;
            getPage( $scope.current,$scope.pageTotal,$scope.classificationId)
        }

    }

    app.filter('to_trusted', ['$sce', function ($sce) {
    　　return function (text) {
        　　return $sce.trustAsHtml(text);
    　　};
    }]);
})





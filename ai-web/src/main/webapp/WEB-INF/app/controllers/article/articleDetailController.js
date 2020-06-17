/**
 * Created by HP on 2017/8/19.
 */
define(['app'], function(app) {
    app.controller('articleDetailController', articleDetailController);
    articleDetailController.$inject = ['$scope', '$location', 'articleService','$cookies'];

    function articleDetailController($scope, $location,$articleService,$cookies) {
        $scope.articleId={};
        $scope.articleDetail={};
        $scope.userAvatar_url= $cookies.get("avatar_url");
        $scope.userNickname= $cookies.get("nickname");

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
        $scope.userDetail={};



        var shareComplaintDetailId=GetRequest();

        $scope.articleId = shareComplaintDetailId.articleId;
        console.log($scope.articleId);
        var services = $articleService.lists;
        services.getArticleDetail($scope.articleId).then(function (res) {
            if(res.status===200){
                $scope.articleDetail = res.data.data;
                getUserDetail($scope.articleDetail.user_id);
                console.log($scope.articleDetail.user_id);
                $scope.content = $scope.articleDetail.content;
                $("#content").html( $scope.content );
            }
        });
        function getUserDetail(user_id) {
            services.getUserDetail(user_id).then(function (res) {
                if(res.status==200){
                    // $scope.userDetail=res.data.data;
                    $scope.userDetail=res.data.data;
                    console.log($scope.userDetail);
                }
            });
        }
        $scope.total=0;
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 10;  // 每页条数 默认10条
        $scope.commentListInfo={};
        $scope.commentList={};

        $scope.myStar_rating=3;
        function getComments() {
            services.getComments( $scope.current, $scope.pageTotal,$scope.articleId).then(function (res) {
                if(res.status==200){
                    $scope.commentListInfo=res.data.data;
                    $scope.total = res.data.data.total; // tgd添加
                    $scope.commentList=res.data.data.data;
                    console.log( $scope.commentListInfo);
                }
            });
        }
        getComments();
        // ======== tgd添加开始 ==========

        $scope.jumpPage = function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.current = $scope.search_current;
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                getComments();
            }
        }
        $scope.search = function(bool) {
            if (bool) {
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                getComments();
            }

        };
        // ======== tgd添加结束 ==========



//添加
        $scope.mod_text="";
        $scope.faBiao = function(){
            if($scope.mod_text==""||$scope.mod_text=="请输入评论内容"){
                alert("评论内容不能为空！");
            }else{
                var param = {
                    content: $scope.mod_text,
                    star_rating: $scope.myStar_rating,
                    relevance_id:$scope.articleId,
                    type:1,
                    user_id:$cookies.get("user_id")
                }
                if(param.user_id){
                    services.putComment(param).then(function (res) {
                        console.log(res);

                        if(res.status===200){
                            // $scope.commentList = res.data.data.data;
                            alert("评论发表成功，正在等待后台审核！");
                            $scope.mod_text="";
                        }else{
                            alert("发表失败");
                        }
                    });
                }else{
                    alert("请登录后再试！");
                }
            }
        }
        $scope.commentStart=function (start) {
            $scope.myStar_rating=start;
        }
    }
})





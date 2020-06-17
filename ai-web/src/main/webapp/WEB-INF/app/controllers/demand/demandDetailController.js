define(['app'], function(app) {
    app.controller('demandDetailController', demandDetailController);
    demandDetailController.$inject = ['$scope','$location','demandService','$cookies'];
    function demandDetailController($scope,$location,$demandService,$cookies) {
        //
        $scope.userAvatar_url= $cookies.get("avatar_url");
        $scope.userNickname= $cookies.get("nickname");
        //  把url传过来的参数取出来的方法id
        function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            console.log( url);
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
        $scope.demandId="";
        $scope.demandId = shareComplaintDetailId.demandId;
        console.log( $scope.demandId);


        $scope.demandDetail={};
        $scope.bindingList=[];
        $scope.demandList={};
        var services = $demandService.lists;
        function getDemandDetail() {
                services.getDemandDetail($scope.demandId,$cookies.get("user_id")).then(function (res) {
                    if(res.status===200){
                        $scope.demandDetail = res.data.data;
                        $("#content").html( $scope.demandDetail.content);
                        console.log($scope.demandDetail);
                        getPage();

                    }
                }) ;

        }
        function getBiddings () {
            services.getBiddings( $scope.demandId).then(function (res) {
                if(res.status===200){
                    $scope.bindingList = res.data.data.data;
                    // if(order=='buy_count|desc'){
                    //     $scope.hotPluginunitList=res.data.data.data;
                    // }

                    console.log($scope.bindingList);
                }
            });
        }
        function getPage () {
            services.getUserDemandList(1,5,0,'id|desc',$scope.demandDetail.user_id).then(function (res) {
                if(res.status===200){
                    $scope.demandList = res.data.data.data;
                    // if(order=='buy_count|desc'){
                    //     $scope.hotPluginunitList=res.data.data.data;
                    // }
                    console.log(res)
                }
            });
        }
        $scope.total=0;
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 2;  // 每页条数 默认10条
        $scope.commentListInfo={};
        $scope.commentList={};
        function getComments() {
            services.getComments( $scope.current, $scope.pageTotal,$scope.demandId).then(function (res) {
                if(res.status==200){
                    $scope.commentListInfo=res.data.data;
                    $scope.total = res.data.data.total; // tgd添加
                    $scope.commentList=res.data.data.data;
                    console.log( $scope.commentListInfo);
                }
            });
        }
        getDemandDetail();
        getBiddings();
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


        $scope.myStar_rating=3;
//添加
        $scope.faBiao = function(){
            if($scope.mod_text==""||$scope.mod_text=="请输入评论内容") {
                alert("评论内容不能为空！");
                return;
            }else{
                var param = {
                    content: $scope.mod_text,
                    star_rating: $scope.myStar_rating,
                    relevance_id:$scope.demandId,
                    type:7,
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
        };
        $scope.refresh=function (id) {
            $scope.demandId=id;
            getDemandDetail();
            getPage();
            getBiddings();
            getComments();
        }
        $scope.commentStart=function (start) {
            $scope.myStar_rating=start;
        }
    }
})

   



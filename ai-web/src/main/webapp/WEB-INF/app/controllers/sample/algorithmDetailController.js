define(['app'], function(app) {
    app.controller('algorithmDetailController', algorithmDetailController);
    algorithmDetailController.$inject = ['$scope','algorithmService','$cookies','baseUrl4','$location','baseUrl5','baseUrl'];
    function algorithmDetailController($scope,algorithmService,$cookies,baseUrl4,$location,baseUrl5,baseUrl) {
        // $scope.ITryUrl=baseUrl4+"/"+"models/20170904-210714-bd24";

        $scope.urlType=1;
        $scope.urlTypeShendu=2;
        $scope.userArithmeticList=[];
        if($location.absUrl().indexOf("http://www.")>-1){//有www
            $scope.urlType=1;
            $scope.urlTypeShendu=2;
        }else{
            $scope.urlTypeShendu=4;
            $scope.urlType=3;
        }

        $scope.baseImgUrl=baseUrl4+"/";

        $scope.userAvatar_url= $cookies.get("avatar_url");
        $scope.userNickname= $cookies.get("nickname");

        $scope.Itry=function () {
            // $scope.download();
            if($cookies.get("access_token")) {
                // window.location.href=baseUrl5+ "/datasets/"+$scope.arithmeticDetail.model_id;
                window.open(baseUrl5+ "/models/"+$scope.arithmeticDetail.model_id+"?access_token="+$cookies.get("access_token"));
            }else{
                // alert(baseUrl+"/v1/authorize?redirect_uri="+$location.absUrl());
                window.location.href=baseUrl+"/v1/authorize?redirect_uri="+$location.absUrl();

                // $location.path("/");
            }
            // if($cookies.get("access_token")) {
            //     window.location.href=$scope.ITryUrl+"?access_token="+$cookies.get("access_token")+"&user_name="+$cookies.get("user_name");
            //
            //     // window.open($scope.ITryUrl,"access_token="+$cookies.get("access_token")+"&user_name="+$cookies.get("user_name"));
            // }else{
            //     $location.path("/");
            // }
        }
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
        $scope.userSampleList=[];
        var shareComplaintDetailId=GetRequest();
        $scope.algorithmId=shareComplaintDetailId.algorithmId;

        var service=algorithmService.lists;

        $scope.arithmeticDetail={};

        function getalgorithmDetail() {
            service.getalgorithmDetail( $scope.algorithmId,$cookies.get("user_id"),$scope.urlType).then(function (res) {
                $scope.arithmeticDetail=res.data.data;
                refreshSampleImg();
                $scope.ITryUrl=baseUrl5+"/"+"models/"+$scope.arithmeticDetail.model_id;
                getUserSampleList();
                getUserArithmeticList();
                console.log($scope.arithmeticDetail);
            });
        }
        $scope.refresh=function (id) {
            // alert(id)
            $scope.algorithmId=id;
            getalgorithmDetail();

            getComments();
        }

        function getUserArithmeticList() {
            service.getUserArithmeticList( 1,5, $scope.arithmeticDetail.user_id,$scope.urlType).then(function (res) {
                console.log(res);
                $scope.userArithmeticList=res.data.data;
                console.log($scope.userArithmeticList);
            });
        }
        function getUserSampleList() {
            service.getUserSampleList( 1,5, $scope.arithmeticDetail.user_id,$scope.urlType).then(function (res) {
                console.log(res);
                $scope.userSampleList=res.data.data;
                console.log($scope.userSampleList);
            });
        }
        //换一换，获取算法详情的图片
        function refreshSampleImg() {
            service.refreshSampleImg($scope.arithmeticDetail.model_id,$scope.urlTypeShendu).then(function (res) {
                // $scope.imgUrls=res.data.slice(0,16);
                $scope.imgUrls=res.data;

            });
        }
        $scope.refreshSampleImgClick =function () {
            refreshSampleImg();
        }
        /**
         * 购买
         * @param data
         */
        $scope.payOrder=function(){
            //判断是否已购，如果已购下载，没购买，显示购买
            if($scope.arithmeticDetail.isPay!=1){
                payOrder();
            }else{
                $scope.arithmeticDetail.isPay=1;
                // alert("您已购买！");
                $scope.download();
            }
        };
        $scope.download = function(){
            // 调用下载接口
            // alert($scope.downloadUrl+$scope.sample.dataset_id);
            if($cookies.get("access_token")) {
                // window.location.href=baseUrl5+ "/datasets/"+$scope.arithmeticDetail.model_id;
                window.open(baseUrl5+ "/models/"+$scope.arithmeticDetail.model_id+"?access_token="+$cookies.get("access_token"));
            }else{
                alert(baseUrl+"/v1/authorize?redirect_uri="+$location.absUrl());
                window.location.href=baseUrl+"/v1/authorize?redirect_uri="+$location.absUrl();

                // $location.path("/");
            }
        };
        function payOrder() {
            var a=confirm("将扣除"+$scope.arithmeticDetail.price+"个积分，确定购买?");
            console.log(a);
            if(a){
                if($cookies.get("user_id")){
                    service.payOrder($cookies.get("user_id"), $scope.algorithmId).then(function (res) {
                        console.log($cookies.get("user_id"));
                        if(res.status==200&&res.data.code==1000){
                            alert("购买成功！");
                            // $scope.payState="下载";
                            $scope.arithmeticDetail.isPay=1;
                        }else{
                            alert("购买失败！")
                        }
                    });            }else{
                    alert("请登录后再试！");
                }
            }

        }

        getalgorithmDetail();
        $scope.total=0;
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 10;  // 每页条数 默认10条
        $scope.commentListInfo={};
        $scope.commentList={};
        function getComments() {
            service.getComments( $scope.current, $scope.pageTotal,$scope.algorithmId).then(function (res) {
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

        $scope.mod_text="";
        $scope.myStar_rating=3;
        $scope.faBiao = function(){
            if($scope.mod_text==""||$scope.mod_text=="请输入评论内容"){
                alert("评论内容不能为空！");
            }else{
                console.log($scope.mod_text);
                console.log($scope.algorithmId);
                var param = {
                    content: $scope.mod_text,
                    star_rating:  $scope.myStar_rating,
                    relevance_id:$scope.algorithmId,
                    type:3,
                    user_id:$cookies.get("user_id")
                }
                if(param.user_id){
                    service.putComment(param).then(function (res) {
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

   



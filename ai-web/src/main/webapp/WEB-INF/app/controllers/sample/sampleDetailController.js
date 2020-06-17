define(['app'], function(app) {
    app.controller('sampleDetailController', sampleDetailController);
    sampleDetailController.$inject = ['$scope','sampleService','$cookies','baseUrl4','$location','baseUrl5'];
    function sampleDetailController($scope,sampleService,$cookies,baseUrl4,$location,baseUrl5) {

        $scope.urlType=1;
        $scope.urlTypeShendu=2;

        if($location.absUrl().indexOf("http://www.")>-1){//有www
            $scope.urlType=1;
            $scope.urlTypeShendu=2;
        }else{
            $scope.urlTypeShendu=4;
            $scope.urlType=3;
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

        var shareComplaintDetailId=GetRequest();

        $scope.userAvatar_url= $cookies.get("avatar_url");
        $scope.userNickname= $cookies.get("nickname");
        $scope.sampleId=shareComplaintDetailId.sampleId;
        $scope.sample={};
        $scope.userSampleList=[];
        $scope.trainingList=[];
        $scope.userDetail={};
        $scope.userArithmeticList=[];
        $scope.downloadUrl=baseUrl5+"/datasets/";
        $scope.imgUrls=[];
        $scope.baseImgUrl=baseUrl4+"/";
        //
        // console.log(123)
        // 购买-下载
        $scope.status = '购买';
        $scope.download = function(){
        	$scope.status = '下载';
        	// 调用下载接口
            // alert($scope.downloadUrl+$scope.sample.dataset_id);
            // window.open($scope.downloadUrl+$scope.sample.dataset_id,"access_token="+$cookies.get("access_token")+"&user_name="+$cookies.get("user_name"));
            if($cookies.get("access_token")) {
                window.open(baseUrl5+"/dl/dataset/download?access_token="+$cookies.get("access_token")+"&id="+$scope.sample.dataset_id);
            }else{
                $location.path("/");
            }

            // window.location.href= $scope.downloadUrl+$scope.sample.dataset_id;
        };
        // $scope.id="20170824-153412-6c79";
        var service=sampleService.lists;
        function getSampleDetail() {
            console.log($scope.sampleId);
            service.getSampleDetail($scope.sampleId,$cookies.get("user_id"),$scope.urlType).then(function (res) {
                console.log(res);
                $scope.sample=res.data.data;
                refreshSampleImg();
                getUserDetail();
                getUserSampleList();
                getUserArithmeticList();
                console.log($scope.sample);
                // console.log(res);
            });
        }
        //换一换，获取算法详情的图片
        function refreshSampleImg() {
            service.refreshSampleImg($scope.sample.dataset_id,$scope.urlTypeShendu).then(function (res) {
                // $scope.imgUrls=res.data.slice(0,16);
                $scope.imgUrls=res.data;

                // console.log(res);
                // $scope.userSampleList=res.data.data;
                // console.log($scope.userSampleList);
            });
        }
        $scope.refreshSampleImgClick =function () {
            refreshSampleImg();
        }
        function getUserSampleList() {
            service.getUserSampleList( 1,5, $scope.sample.user_id,$scope.urlType).then(function (res) {
                console.log(res);
                $scope.userSampleList=res.data.data;
                console.log($scope.userSampleList);
            });
        }
        function getUserArithmeticList() {
            service.getUserArithmeticList( 1,5, $scope.sample.user_id,$scope.urlType).then(function (res) {
                console.log(res);
                $scope.userArithmeticList=res.data.data;
                console.log($scope.userArithmeticList);
            });
        }
        // function getTrainSampleList() {
        //     service.getTrainSampleList(1,5,$scope.sampleId,$cookies.get("user_id")).then(function (res) {
        //         console.log(res);
        //         $scope.trainingList=res.data.data;
        //         console.log($scope.trainingList);
        //         // console.log(res);
        //     });
        // }
        function getUserDetail() {
            service.getUserDetail($scope.sample.user_id).then(function (res) {
                console.log(res);
                $scope.userDetail=res.data.data;
                console.log($scope.userDetail);
                // console.log(res);
            });
        }
        // function getComments() {
        //     service.getComments($sc$scope.sample.user_id).then(function (res) {
        //         console.log(res);
        //         $scope.userDetail=res.data.data;
        //         console.log($scope.userDetail);
        //         // console.log(res);
        //     });
        // }
        getSampleDetail();
        // getComments();
        // getTrainSampleList();
        /**
         * 购买
         * @param data
         */
        $scope.payOrder=function(){
            //判断是否已购，如果已购下载，没购买，显示购买
            if($scope.sample.isPay!=1){
                payOrder();
            }else{
                $scope.download();
                // alert("您已购买！");
            }
        };
        function payOrder() {
            var a=confirm("将扣除"+$scope.sample.price+"个积分，确定购买?");
            console.log(a);
            if(a){
                if($cookies.get("user_id")){
                    service.payOrder($cookies.get("user_id"), $scope.sampleId).then(function (res) {
                        console.log($cookies.get("user_id"));
                        if(res.status==200&&res.data.code==1000){
                            alert("购买成功！");
                            // $scope.payState="下载";
                            $scope.sample.isPay=1;
                        }else{
                            alert("购买失败！")
                        }
                    });            }else{
                    alert("请登录后再试！");
                }
            }

        }
        $scope.refresh=function (id) {
            // alert(id)
            $scope.sampleId=id;
            getSampleDetail();

            getComments();
        }


        $scope.total=0;
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 10;  // 每页条数 默认10条
        $scope.commentListInfo={};
        $scope.commentList={};
        $scope.myStar_rating=3;

        function getComments() {
            service.getComments( $scope.current, $scope.pageTotal,$scope.sampleId).then(function (res) {
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
        $scope.faBiao = function(){
            if($scope.mod_text==""||$scope.mod_text=="请输入评论内容"){
                alert("评论内容不能为空！");
            }else{
                console.log($scope.mod_text);
                console.log($scope.sampleId);
                var param = {
                    content: $scope.mod_text,
                    star_rating:  $scope.myStar_rating,
                    relevance_id:$scope.sampleId,
                    type:2,
                    user_id:$cookies.get("user_id")
                }
                console.log(">>>>>>>>>>>>"+param.user_id);
                console.log("<<<<<<<<<<<<"+$cookies.get("user_id"))

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
});

   



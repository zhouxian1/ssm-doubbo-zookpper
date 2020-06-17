 define(['app'], function(app) {
    app.controller('pluginunitDetailController', pluginunitDetailController);
    pluginunitDetailController.$inject = ['$scope','$location','pluginunitDetailService',"$cookies"];

    function pluginunitDetailController($scope,$location,pluginunitDetailService,$cookies) {
        $scope.mod_text = "";
    //  把url传过来的参数取出来的方法id

        $scope.userAvatar_url= $cookies.get("avatar_url");
        $scope.userNickname= $cookies.get("nickname");
    function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    console.log(url);
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
//添加
        $scope.myStar_rating=3;
$scope.faBiao = function(){
    if($scope.mod_text==""||$scope.mod_text=="请输入评论内容") {
        alert("评论内容不能为空！");
        return;
    }
    var param = {
        content: $scope.mod_text,
        star_rating:  $scope.myStar_rating,
        relevance_id:$scope.pluginunitId,
        type:4,
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
var shareComplaintDetailId=GetRequest();

    $scope.pluginunitId = shareComplaintDetailId.pluginunitId;
                console.log($scope.pluginunitId)

        $scope.pluginunitDetail={};
        $scope.commentList=[];
        // $scope.payState="购买"

        $scope.param = {
            page: 1,
            per_page: 10,
            order: 'id|desc',
            lab:0,
            user_id:1
        };
        var services = pluginunitDetailService.lists;
        function getPluginsDetail() {
            services.getPluginsDetail($scope.pluginunitId,$cookies.get("user_id")).then(function (res) {
                if(res.status===200){
                    $scope.pluginunitDetail = res.data.data;
                    console.log(res);
                    $scope.param.user_id=$scope.pluginunitDetail.user_id;
                    getPlugins();
                }
            });
        }

        // 'getPlugins': function(page,per_page,order,label_id,user_id) {
        function getPlugins() {
            services.getPlugins(1,5,'id|desc',0,$scope.param.user_id).then(function (res) {
                if(res.status===200){
                    $scope.pluginunitList = res.data.data.data;
                    $scope.param.user_id=$scope.pluginunitList.user.user_id;
                    console.log(res)
                }
            });
        }



        $scope.total=0;
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 10;  // 每页条数 默认10条
        $scope.commentListInfo={};
        $scope.commentList={};
        // page,per_page,type,relevance_id
        function getComments() {
            services.getComments($scope.current, $scope.pageTotal, $scope.pluginunitId).then(function (res) {
                if(res.status===200){
                    $scope.total = res.data.data.total; // tgd添加
                    $scope.commentList = res.data.data.data;
                    console.log($scope.commentList);
                }
            });
        }
        getPluginsDetail();
        // getPlugins();
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

        $scope.refresh=function (id) {
            // alert(id)
            $scope.pluginunitId=id;
            getPluginsDetail();
            getPlugins();
            getComments();
        }
        /**
         * 购买
         * @param data
         */
        $scope.payOrder=function(){
            //判断是否已购，如果已购下载，没购买，显示购买
                if($scope.pluginunitDetail.isPay!=1){
                    payOrder();
                }else{
                    alert("功能暂未开放!");
                }
        };
        function payOrder() {
            var a=confirm("将扣除"+$scope.pluginunitDetail.price+"个积分，确定购买?");
            console.log(a);
            if(a){
                if($cookies.get("user_id")){
                    services.payOrder($cookies.get("user_id"), $scope.pluginunitId).then(function (res) {
                        console.log($cookies.get("user_id"));
                        if(res.status==200&&res.data.code==1000){
                            alert("购买成功！");
                            // $scope.payState="下载";
                            $scope.pluginunitDetail.isPay=1;
                        }else{
                            alert("购买失败！")
                        }
                    });            }else{
                    alert("请登录后再试！");
                }
            }

        }
        $scope.commentStart=function (start) {
            $scope.myStar_rating=start;
        }
    }
})



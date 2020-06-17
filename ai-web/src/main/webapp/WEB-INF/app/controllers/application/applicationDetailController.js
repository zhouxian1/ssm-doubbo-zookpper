define(['app'], function(app) {
    app.controller('applicationDetailController', applicationDetailController);
    applicationDetailController.$inject = ['$scope', '$location', 'applicationService','$cookies'];
    function applicationDetailController($scope, $location, applicationService,$cookies) {
      var services = applicationService.lists;
        //  把url传过来的参数取出来的方法id


        $scope.userAvatar_url= $cookies.get("avatar_url");
        $scope.userNickname= $cookies.get("nickname");
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
        $scope.applicationID=shareComplaintDetailId.applicationId;
        $scope.user_id=shareComplaintDetailId.user_id;
        $scope.data={};
        // $scope.image_urls=[];
        // $scope.param = {
        //     page: 1,
        //     per_page: 10,
        //     order: 'id|desc',
        //     lab:0,
        //     user_id:$scope.user_id
        // }
        // console.log($scope.applicationID);
      function getDetailPage () {
          services.getDetailPage($scope.applicationID,$cookies.get("user_id")).then(function(res){
              if(res.status === 200){
                  $scope.data = res.data.data;
                  $scope.user_id=$scope.data.user_id;
                  getData(1,5,'id|desc',0,  $scope.user_id);

                  // // $scope.data.label_ids=JSON.parse($scope.data.label_ids);
                  // // $scope.data.image_urls=JSON.parse($scope.data.image_urls);
                  // // angular.forEach(objs, function(data,index,array){
                  // //     console.log(data.a+'='+array[index].a);
                  // // });
                  // // res.data.dataimage_urls
                  // // var objs =[{a:1},{a:2}];
                  // // console.log($scope.data.image_urls);
                  // $scope.image_urls=
                  // angular.forEach( $scope.data.image_urls, function(data,index,array){
                  //     // image_urls;
                  //     // console.log(data);
                  //     // console.log(data.a+'='+array[index].a);
                  // });
              }
          });
      }
        // 排序（最新发布 ： id|desc 最多购买：buy_count|desc 评论最多 ： comment_count|desc ）
        function getData(page, per_page, order,label_id,user_id) {
            services.getPage(page, per_page, order,label_id,user_id).then(function(res) {
                if (res.status === 200) {
                    $scope.application = res.data.data.data;
                    console.log(res.data.data.data)
                }
            });
        };
        $scope.total=0;
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 10;  // 每页条数 默认10条
        $scope.commentListInfo={};
        $scope.commentList={};
        function getComments() {
            services.getComments( $scope.current, $scope.pageTotal,$scope.applicationID).then(function (res) {
                if(res.status==200){
                    $scope.commentListInfo=res.data.data;
                    $scope.total = res.data.data.total; // tgd添加
                    $scope.commentList=res.data.data.data;
                    console.log( $scope.commentListInfo);
                }
            });
        }
        getDetailPage();
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
                    relevance_id:$scope.applicationID,
                    type:5,
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
            location.href = "/application/applicationDetail?applicationId=" + id
            /* $scope.applicationID=id;
            getDetailPage();
            getData(1,5,'id|desc',0,$scope.param.user_id);
            getComments(); */
        }

        // $scope.payState="购买";
        /**
         * 购买
         * @param data
         */
        $scope.payOrder=function(){
            //判断是否已购，如果已购下载，没购买，显示购买
            if($scope.data.isPay!=1){//如果未购买,去购买
                payOrder();
            }else{
                // alert("您已购买！");
                // alert( $scope.data.appbox_url);
                window.open($scope.data.appbox_url);
                // window.location.href= $scope.application.appbox_url;
            }
        };
        function payOrder() {
            var a=confirm("将扣除"+$scope.data.price+"个积分，确定购买?");
            console.log(a);
            if(a){
                if($cookies.get("user_id")){
                    services.payOrder($cookies.get("user_id"), $scope.applicationID).then(function (res) {
                        console.log($cookies.get("user_id"));
                        if(res.status==200&&res.data.code==1000){
                            alert("购买成功！");
                            // $scope.payState="下载";
                            $scope.data.isPay=1;
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

   



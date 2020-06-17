define(['app'], function(app) {
    app.controller('indexController', indexController);
    indexController.$inject = ['$scope', '$location', 'indexService','baseUrl6','$cookies','baseUrl5','baseUrl','baseUrl7'];
    function indexController($scope, $location,indexService,baseUrl6,$cookies,baseUrl5,baseUrl,baseUrl7) {
        $scope.urlType=1;
        $scope.urlTypeShendu=2;

        if($location.absUrl().indexOf("http://www.")>-1){//有www
            $scope.urlType=1;
            $scope.urlTypeShendu=2;
        }else{
            $scope.urlTypeShendu=4;
            $scope.urlType=3;
        }

        $scope.baseUrl6=baseUrl6;
        $scope.goLab=function () {
            if($cookies.get("access_token")){
                // window.location.href(baseUrl6+"?access_token="+$cookies.get(access_token)+"&user_name="+user_name);user_name
                window.open(baseUrl6,"access_token="+$cookies.get("access_token")+"&user_name="+$cookies.get("user_name"));
            }else{
                // alert("请登录后再试！")
                window.location.href=baseUrl+"/v1/authorize?redirect_uri="+$location.absUrl();
            }
        };
        $scope.goShendu=function () {
            // alert(baseUrl5);
            if($cookies.get("access_token")){
                // alert(baseUrl5+"?access_token="+$cookies.get("access_token")+"&user_name="+$cookies.get("user_name"));
                // window.location.href=baseUrl5+"?access_token="+$cookies.get("access_token")+"&user_name="+$cookies.get("user_name");
                window.open(baseUrl5+"?access_token="+$cookies.get("access_token")+"&user_name="+$cookies.get("user_name"));
            }else{
                // alert("请登录后再试！")
                window.location.href=baseUrl+"/v1/authorize?redirect_uri="+$location.absUrl();

            }
        };
        $scope.goEarth=function () {
            window.open(baseUrl7);
        }
        $scope.order="updated_at|desc";
        //热门资讯
        $scope.hotNews={};
        //样本资讯
        $scope.sampleNews= {};
        //极客资讯
        $scope.jikeNews={};
        //算法资讯
        $scope.suanfaNews={};
        //数据资讯
        $scope.dataNews= {};
        //应用资讯
        $scope.applicationNews={};

        //轮播
        $scope.rotationList=[];
        //样本
        $scope.sampleList={};
        //数据
        // $scope.dataList= getList();
        //最新需求
        $scope.hotDemandList= {};
        //极客秀
        $scope.userList= {};
        // //算法
        // $scope.suanfaList= getList(1,4,1);
        $scope.arithmeticList={};
        //应用
        $scope.applicationList= {};
        //插件
        $scope.pluginunitList= {};
        var services = indexService.lists;
        //资讯类接口
        function getList(page, per_page, classification_id) {
            services.getArticles(page, per_page, classification_id).then(function (res) {
                if(res.status===200){
                    // $scope.articleList = res.data.data.data;
                    // id	id	是	[string]	查看
                    // 7	 title	标题	是	[string]	查看
                    // 8	 content	内容	是	[string]	查看
                    // 9	 user_id	用户id	是	[string]	查看
                    // 10	 type_id	分类id	是	[string]	查看
                    // 11	 is_del	是否删除	是	[string]	查看
                    // 12	 created_at	创建时间	是	[string]	查看
                    // 13	 updated_at	更新时间	是	[string]	查看
                    // 14	 img	图片url	是	[string]
                    // 15	 about	正文前200字
                    // console.log(res.data.data.data);
                    // return  res.data.data.data;
                    // 1	资讯	是
                    // 2	2	样本
                    // 3	3	需求
                    // 4	4	知识
                    // 5	5	文档
                    switch(classification_id) {
                        case 8:
                            $scope.hotNews=res.data.data.data;
                            // console.log($scope.hotNews);
                            break;
                        case 1:
                            $scope.sampleNews=res.data.data.data;
                            // 执行代码块 2
                            break;
                        case 2:
                            $scope.suanfaNews=res.data.data.data;
                            // 执行代码块 2
                            break;
                        // case 3:
                        //     $scope.plu=res.data.data.data;
                        //     // 执行代码块 2
                        //     break;
                        case 4:
                            $scope.applicationNews=res.data.data.data;
                            break;
                        // 执行代码块 2
                        case 5://
                            $scope.jikeNews=res.data.data.data;
                            // console.log($scope.jikeNews);
                            // 执行代码块 2
                            break;
                        case 6:
                            $scope.dataNews=res.data.data.data;
                            // 执行代码块 2
                            break;
                        default:
                        // n 与 case 1 和 case 2 不同时执行的代码
                    }
                }
            }) ;
            return $scope.articleList;
        }
        function getSampleList() {
            services.getSampleList($scope.urlType).then(function (res) {
                $scope.sampleList=res.data.data;
                console.log($scope.sampleList);
            });
        }
        function getArithmeticList() {
            services.getArithmeticList($scope.urlType).then(function (res) {
                $scope.arithmeticList=res.data.data;
                console.log($scope.arithmeticList);
            });
        }
        //轮播图接口
        function getRotations() {
            services.getRotations().then(function (res) {
                if(res.status===200){
                    // $scope.articleList = res.data.data.data;
                    // console.log(res);
                    $scope.rotationList= res.data.data.data;
                }
            }) ;
        }
        // //轮播图接口
        // function getARotation(id) {
        //     services.getARotation(id).then(function (res) {
        //         if(res.status===200){
        //             // $scope.articleList = res.data.data.data;
        //             console.log(res);
        //             $scope.rotationList= res.data.data;
        //         }
        //     }) ;
        // }
        //需求列表
        function getDemandList(page, per_page, order) {
            services.getDemandList(page, per_page, order).then(function (res) {
                if(res.status===200){
                    // $scope.articleList = res.data.data.data;
                    $scope.hotDemandList=res.data.data.data;
                    console.log(res);
                    return  res.data.data.data;
// id	id	是	[string]		查看
// 2	user_id	用户id	是	[string]		查看
// 3	cover_url	封面图	是	[string]		查看
// 4	type	需求类型	是	[string]		查看
// 5	bidding_cycle	投标周期	是	[string]		查看
// 6	bidding_time	投标截止时间	是	[string]		查看
// 7	deliver_cycle	交付周期	是	[string]		查看
// 8	comment_count	评论数	是	[string]		查看
// 9	status	状态 0待审核状态，1 审核完成，2审核失败	是	[string]		查看
// 10	price	报价	是	[string]		查看
// 11	schedule	进度状态 0 投递查看中 1开发中 2交付完成	是	[string]		查看
// 12	page	页码	是	[string]		查看
// 13	per_page	每页数量
                }
            }) ;
        }
        //用户列表
        function getUserList(page, per_page) {
            services.getUsers(page,per_page).then(function (res) {
                if(res.status===200){
                    $scope.userList = res.data.data.data;
                    return  res.data.data.data;
// id	id	是	[string]		查看
// 2	user_id	用户id	是	[string]		查看
// 3	cover_url	封面图	是	[string]		查看
// 4	type	需求类型	是	[string]		查看
// 5	bidding_cycle	投标周期	是	[string]		查看
// 6	bidding_time	投标截止时间	是	[string]		查看
// 7	deliver_cycle	交付周期	是	[string]		查看
// 8	comment_count	评论数	是	[string]		查看
// 9	status	状态 0待审核状态，1 审核完成，2审核失败	是	[string]		查看
// 10	price	报价	是	[string]		查看
// 11	schedule	进度状态 0 投递查看中 1开发中 2交付完成	是	[string]		查看
// 12	page	页码	是	[string]		查看
// 13	per_page	每页数量
                }
            }) ;
        }
        //应用列表
        function getApplicationList(page, per_page, order) {
            services.getApplicationList(page, per_page, order).then(function (res) {
                if(res.status===200){
                    // $scope.articleList = res.data.data.data;
                    $scope.applicationList=res.data.data.data;
                    return  res.data.data.data;
// id	id	是	[string]		查看
// 2	user_id	用户id	是	[string]		查看
// 3	cover_url	封面图	是	[string]		查看
// 4	type	需求类型	是	[string]		查看
// 5	bidding_cycle	投标周期	是	[string]		查看
// 6	bidding_time	投标截止时间	是	[string]		查看
// 7	deliver_cycle	交付周期	是	[string]		查看
// 8	comment_count	评论数	是	[string]		查看
// 9	status	状态 0待审核状态，1 审核完成，2审核失败	是	[string]		查看
// 10	price	报价	是	[string]		查看
// 11	schedule	进度状态 0 投递查看中 1开发中 2交付完成	是	[string]		查看
// 12	page	页码	是	[string]		查看
// 13	per_page	每页数量
                }
            }) ;
        }
        //插件列表
        function getPluginList(page, per_page, order) {
            services.getPlugins(page, per_page, order).then(function (res) {
                if(res.status===200){
                    // $scope.articleList = res.data.data.data;
                    $scope.pluginunitList=res.data.data.data;
                    // console.log($scope.pluginunitList);
                    return  res.data.data.data;
                    //     1	id	id	是	[string]		查看
                    //     2	type	插件类型 默认挂件：1 工具：2	是	[string]		查看
                    //     3	status	Status 状态 默认0 待审核 1审核通过 2 审核失败	是	[string]		查看
                    //     4	version	版本号	是	[string]		查看
                    //     5	user_id	发布用户id	是	[string]		查看
                    //     6	buy_count	购买次数	是	[string]		查看
                    //     7	servicebox_status	服务包状态 默认0未 1成功 2 失败	是	[string]		查看
                    //     8	pluginsbox_status	插件包 默认0 未 1成功 2失败	是	[string]		查看
                    //     9	price	积分	是	[string]		查看
                    //     10	page	页码	是	[string]		查看
                    //     11	per_page	每页数量
                }
            }) ;
        }
        // //热门资讯
        // $scope.hotNews= getList(1,3,0);
        // //样本资讯
        // $scope.sampleNews= getList(1,3,1);
        // //极客资讯
        // $scope.jikeNews= getList(1,4,5);
        // //算法资讯
        // $scope.suanfaNews= getList(1,3,6);
        // //数据资讯
        // $scope.dataNews= getList(1,4,4);
        // //应用资讯
        // $scope.applicationNews= getList(1,3,3);
        //热门资讯
        getList(1,3,8);
        //样本资讯
        getList(1,4,1);
        //算法资讯
        getList(1,4,2);
        //插件资讯
        // getList(1,3,3);
        //应用资讯
        getList(1,4,4);
        //极客资讯
        getList(1,4,5);
        //数据资讯
        getList(1,4,6);
//         //轮播
        getRotations();
        // getUserList(1,10);
//         //样本
        getSampleList();

//         // $scope.sampleList= getList();
//         //数据
//         // $scope.dataList= getList();
//         //最新需求
         getDemandList(1,4,$scope.order);
//         //极客秀
        $scope.userList= getUserList(1,5);
        // //算法
        // $scope.suanfaList= getList(1,4,1);
        getArithmeticList();
        //应用
        getApplicationList(1,6,$scope.order);
        //插件
        getPluginList(1,6,$scope.order);

        // rotationClick(item)
        $scope.rotationClick = function(item) {
            // item.url="www.yunxiaotui.com";
            // console.log(item);
            if (isContains(item.url, 'http://')) {
                window.location.href = item.url;
            } else if (isContains(item.url, 'https://')){
                window.location.href = item.url;
            }else {
                window.location.href="http://"+item.url;
            }
        }
        
        function isContains(str, substr) {
            return str.indexOf(substr) >= 0;
        }

    }

    app.filter('to_trusted', ['$sce', function ($sce) {
    　　return function (text) {
        　　return $sce.trustAsHtml(text);
    　　};
    }]);
});

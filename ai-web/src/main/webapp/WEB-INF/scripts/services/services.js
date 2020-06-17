define(['app'], function(app) {

    // baseUrl统一管理

    // 本地调试
    if (false) {
        // 前段程序部署域名，其他接口http://www.geovis.me/
        /*app.value('baseUrl', 'http://192.168.48.19:82');*/
        app.value('baseUrl', 'http://localhost:8080');
        // 样本算法接口
        app.value('baseUrl2', 'http://192.168.4.148/see');
        //深度学习平台
        app.value('baseUrl4', 'http://192.168.43.195:82/shendu');
        app.value('baseUrl5', 'http://219.143.189.234:50001');
        // GVlab
        app.value('baseUrl6', 'http://lab.geovis.ai:10001');
        // 地球网站
        app.value('baseUrl7', 'http://210.72.27.243/GeoVis/geovis.html');
    } else {
        // 前段程序部署域名，其他接口http://www.geovis.me/
        //app.value('baseUrl', 'http://192.168.4.148/api');
        app.value('baseUrl', '/api');
        // 样本算法接口
        //app.value('baseUrl2', 'http://192.168.4.148/see');
        app.value('baseUrl2', '/see');
        //深度学习平台
        //app.value('baseUrl4', 'http://192.168.43.195:82/shendu');
        //app.value('baseUrl5', 'http://219.143.189.234:50001');
        app.value('baseUrl4', '');
        app.value('baseUrl5', '');
        // GVlab
        //app.value('baseUrl6', 'http://lab.geovis.ai:10001');
        app.value('baseUrl6', '');
        // 地球网站
        //app.value('baseUrl7', 'http://210.72.27.243/GeoVis/geovis.html');
        app.value('baseUrl7', '');
    }

    //前段程序部署域名，其他接口http://www.geovis.me/
   //  app.value('baseUrl', 'http://www.geovis.me/api');
   //  //王浩然接口域名，样本算法接口
   //  app.value('baseUrl2', 'http://www.geovis.me/see');
   //  //深度学习平台
   //  app.value('baseUrl4', 'http://www.geovis.me/shendu');
   //  //app.value('baseUrl5', ' http://219.143.189.234:50001');
   //  app.value('baseUrl5', ' http://dl.geovis.ai:50001');
   //  // GVlab
   //  app.value('baseUrl6', 'http://lab.geovis.ai:10001');
   // // 地球网站
   //  app.value('baseUrl7', 'http://210.72.27.243/GeoVis/geovis.html');

    // // 搜索功能
    app.factory('searchService', searchService);
    searchService.$inject = ['http','$scope'];

    function searchService(http) {
        var methods = {
            lists:{
                //获取资讯列表
                'getArticles': function(page,per_page,search) {
                    if (!search) search = '';
                    return http.get('/v1/app/articles?page=' + page + '&per_page=' + per_page + '&search=' + search);
                },
                //获取应用列表
                'getApplications': function(page,per_page,search) {
                    if (!search) search = '';
                    return http.get('/v1/app/application?page=' + page + '&per_page=' + per_page + '&search=' + search+"&status="+1);
                },
                //获取插件列表
                'getPlugins': function(page,per_page,search) {
                    if (!search) search = '';
                    return http.get('/v1/app/plugins?page=' + page + '&per_page=' + per_page + '&search=' + search+"&status="+1);
                },
                //获取需求列表
                'getDemands': function(page,per_page,search) {
                    if (!search)search='';
                    return http.get('/v1/app/demands?page=' + page + '&per_page=' + per_page + '&search=' + search+"&status="+1);
                }
            }
        };
        return methods;
    }

    // 知识服务
    app.factory('knowledgesService', knowledgesService);
    knowledgesService.$inject = ['http'];

    function knowledgesService(http) {

        var methods = {
            lists: {
                // 列表页
                'getPage': function(param1, param2,classification_id) {
                    return http.get('/v1/app/knowledges?page=' + param1 + '&per_page=' + param2+'&classification_id='+classification_id);
                },
                // 详情页
                'getDetailPage': function(param1) {
                    return http.get('/v1/app/knowledges/' + param1);
                },
                'getClassifications': function(page,per_page) {
                    return http.get('/v1/admin/classifications?page=' + page + '&per_page=' + per_page+'&type='+5);
                },
            }
        };
        return methods;
    }

    // 知识服务
    app.factory('knowledgeDetailService', knowledgeDetailService);
    knowledgeDetailService.$inject = ['http'];

    function knowledgeDetailService(http) {

        var methods = {
            lists: {
                // 列表页
                // 'getPage': function(param1, param2) {
                //     return http.get('/v1/app/knowledges?page=' + param1 + '&per_page=' + param2);
                // },
                // 详情页
                'getDetailPage': function(param1) {
                    return http.get('/v1/app/knowledges/' + param1);
                },
            }
        };
        return methods;
    }

    // 应用
    app.factory('applicationService', applicationService);
    applicationService.$inject = ['http'];

    function applicationService(http) {
        var methods = {
            lists: {
                // 获取应用列表
                'getPage': function(param1, param2, param3,label_id,user_id) {
                    if(""==user_id){
                        return http.get('/v1/app/application?page=' + param1 + '&per_page=' + param2 + '&order=' + param3+"&label_id="+label_id+"&status=1");
                    }else{
                        return http.get('/v1/app/application?page=' + param1 + '&per_page=' + param2 + '&order=' + param3+"&label_id="+label_id+"&user_id="+user_id+"&status=1");
                    }
                },
                // 获取应用列表
                'getYifabu': function(param1, param2, param3,label_id,user_id) {
                   return http.get('/v1/app/application?page=' + param1 + '&per_page=' + param2 + '&order=' + param3+"&label_id="+label_id+"&user_id="+user_id);
                },
                'getLabels': function(page,per_page) {
                    return http.get('/v1/admin/labels?page=' + page + '&per_page=' + per_page+'&type=2');
                },
                // 获取应用详情（ID）
                'getDetailPage': function(param1,user_id) {
                    return http.get('/v1/app/application/' + param1+"?user_id="+user_id);
                },
                // 资讯	是
                // 2	2	样本
                //     3	3	算法
                // 4	4	插件
                //     5	5	应用
                // 6	6	数据
                //     7	7	需求
                'getComments': function (page,per_page,relevance_id) {
                    return http.get('/v1/app/comments?page=' + page + '&per_page=' + per_page+'&type='+5+'&relevance_id='+relevance_id);
                },
                //v1/app/comments/store/
                // content	评论内容 string(必填)	是	[string]
                // 2	star_rating	星级 int(必填)	是	[string]
                // 3	relevance_id	相关内容id int(必填)	是	[string]
                // 4	type
                // 'putComment': function (content,star_rating,relevance_id) {
                //     return http.post('/v1/app/comments/store/',content,star_rating,relevance_id,4);
                // },
                'putComment': function (data) {
                    return http.post('/v1/app/comments/store/',data);
                },
                // v1/app/application/grouplist
                'getHot': function () {
                    return http.get('/v1/app/application/grouplist?page=1&per_page=5&status=1');
                },
                'abandonApplication': function(user_id,applicationId) {
                    var data={
                        user_id:user_id,
                        id:applicationId
                    }
                    return http.post('/v1/app/application/del',data);
                },
                // v1/app/orders已购买的
                'getOrdered': function (page,per_page,user_id) {
                    return http.get('/v1/app/orders?page='+page+'&per_page='+per_page+'&type=applications&user_id'+user_id);
                },
                // v1/app/orders/placeorder
                // v1/app/orders已购买的
                'payOrder': function (user_id,relevance_id) {
                    var param={
                        user_id:user_id,
                        relevance_id:relevance_id,
                        type:"applications"
                    }
                    return http.post('/v1/app/orders/placeorder',param);
                },
            },
            set: function(data) {
                saveData = data;
            },
            get: function() {
                return saveData;
            },
        };
        return methods;
    }

    //资讯
    app.factory("articleService",articleService);
    articleService.$inject = ['http'];
      function articleService(http) {

        var methods = {
            lists: {
                'getArticles': function(page, per_page,classification_id) {
                    return http.get('/v1/app/articles?page=' + page + '&per_page=' + per_page+"&classification_id="+classification_id);
                },
                // http://api.geovis.yunxiaotui.wang/v1/admin/classifications
                'getClassifications': function(page,per_page,type) {
                    return http.get('/v1/admin/classifications?page=' + page + '&per_page=' + per_page+'&type='+type);
                },
                'getArticleDetail': function (param) {
                    return http.get('/v1/app/articles/' + param);
                },
                'getComments': function (page,per_page,relevance_id) {
                    return http.get('/v1/app/comments?page=' + page + '&per_page=' + per_page+'&type='+1+'&relevance_id='+relevance_id);
                },
                'getUserDetail': function (id) {
                    return http.get('/v1/app/home/users/' + id);
                },
                'putComment': function (data) {
                    return http.post('/v1/app/comments/store/',data);
                }
            }
        }
        return methods;
      }

    // 个人中心  插件
    app.factory('releasePluginunitService', releasePluginunitService);
    releasePluginunitService.$inject = ['http'];

    function releasePluginunitService(http) {
        var saveData = {};

        var methods = {
            lists: {
                // 保存表单
                'save': function(param1) {
                    return http.post('/v1/app/plugins/update', param1);
                },
                // 获取标签
                'getLabels': function(param1) {
                    return http.get('/v1/admin/labels?type=' + param1);
                },
                // 图片上传
                'uploadImg': function() {
                    return '/v1/upload';
                },
                // 获取插件详情{id}

                'getPlugins': function(param1) {
                    // return http.get('/v1/app/plugins?page=' + page + '&per_page=' + per_page+"&order="+order+"&label_id="+label_id+"&user_id="+user_id+"&status=1");

                    return http.get('/v1/app/plugins/' + param1);
                },

            },
            set: function(data) {
                saveData = data;
            },
            get: function() {
                return saveData;
            },
        };
        return methods;
    }

    // 个人中心  应用
    app.factory('releaseApplicationService', releaseApplicationService);
    releaseApplicationService.$inject = ['http'];

    function releaseApplicationService(http) {
        var saveData = {};

        var methods = {
            lists: {
                // 保存表单
                'save': function(param1) {
                    return http.post('/v1/app/application/update', param1);
                },
                // 获取标签
                'getLabels': function(param1) {
                    return http.get('/v1/admin/labels?type=' + param1);
                },
                // 图片上传
                'uploadImg': function() {
                    return '/v1/upload';
                },
                // 获取应用详情
                'getApplication': function(param1) {
                    return http.get('/v1/app/application/' + param1);
                },

            },
            set: function(data) {
                saveData = data;
            },
            get: function() {
                return saveData;
            },
        };
        return methods;
    }

    // 个人中心  需求
    app.factory('releaseDemandService', releaseDemandService);
    releaseDemandService.$inject = ['http'];

    function releaseDemandService(http) {
        var saveData = {};

        var methods = {
            lists: {
                // 保存表单
                'save': function(param1) {
                    return http.post('/v1/app/demands/update', param1);
                },
                // 获取需求详情
                'getDemands': function(param1) {
                    return http.get('/v1/app/demands/' + param1);
                },
                // 图片上传
                'uploadFile': function() {
                    return '/v1/upload';
                },
                // 获取投标详情
                'getBiddings': function(param1) {
                    return http.get('/v1/app/biddings/' + param1);
                },
                // 保存投标
                'saveBiddings': function(param1) {
                    return http.post('/v1/app/biddings/update', param1);
                },
                'getClassifications': function(page,per_page) {
                    return http.get('/v1/admin/classifications?page=' + page + '&per_page=' + per_page+'&type='+4);
                },

            },
            set: function(data) {
                saveData = data;
            },
            get: function() {
                return saveData;
            },
        };
        return methods;
    }

    // 个人中心 用户认证v1/app/home/users/{id}/certification
    app.factory('accountAuthenticationService', accountAuthenticationService);
    accountAuthenticationService.$inject = ['http'];

    function accountAuthenticationService(http) {
        var saveData = {};

        var methods = {
            lists: {
                // 保存表单
                'save': function(param1, param2) {
                    return http.patch('/v1/app/home/users/' + param1 + '/certification', param2);
                },
                // 图片上传
                'uploadImg': function() {
                    return '/v1/upload';
                },

            },
            set: function(data) {
                saveData = data;
            },
            get: function() {
                return saveData;
            },
        };
        return methods;
    }

    //插件
    app.factory("pluginunitListService",pluginunitListService);
    pluginunitListService.$inject = ['http'];

    function pluginunitListService(http) {

        var methods = {
            lists: {
                'getPlugins': function(page,per_page,order,label_id) {
                    // return http.get('/v1/app/plugins?page=' + page + '&per_page=' + per_page+"&order="+order+"&label_id="+label_id+"&user_id="+user_id+"&status=1");

                    return http.get('/v1/app/plugins?page=' + page + '&per_page=' + per_page+"&order="+order+"&label_id="+label_id+"&status=1");
                },
                'getYifabu': function(page,per_page,order,label_id,user_id) {
                    // return http.get('/v1/app/plugins?page=' + page + '&per_page=' + per_page+"&order="+order+"&label_id="+label_id+"&user_id="+user_id+"&status=1");

                    return http.get('/v1/app/plugins?page=' + page + '&per_page=' + per_page+"&order="+order+"&label_id="+label_id+"&status=1&user_id="+user_id);
                },
                // 1	插件	是
                //     2	2	应用
                // 3	3	数据
                'getLabels': function(page,per_page) {
                    return http.get('/v1/admin/labels?page=' + page + '&per_page=' + per_page+"&type="+1);
                },
                // is_shelf=1
                'updatePlugins': function(data) {
                    return http.post('v1/app/plugins/update',data);
                },
                'getHot': function () {
                    return http.get('/v1/app/plugins/grouplist?page=1&per_page=5&status=1&order=buy_count|desc');
                },
                // v1/app/orders已购买的
                'getOrdered': function (page,per_page,user_id) {
                    return http.get('/v1/app/orders?page='+page+'&per_page='+per_page+'&type=plugins&user_id='+user_id);
                },
                }
        };
        return methods;
    }

    //　插件详情
    app.factory("pluginunitDetailService",pluginunitDetailService);
    pluginunitDetailService.$inject = ['http'];

  function pluginunitDetailService(http) {

        var methods = {
            lists: {
                'getPluginsDetail': function(id,user_id) {
                    return http.get('/v1/app/plugins/'+id+"?user_id="+user_id);
                },
                // 'getdemandList': function() {
                //     return http.get('/v1/app/demands');
                // },
                // 'getdemandDetail': function(id) {
                //     return http.get('/v1/app/demands/'+id);
                // },

                // 资讯	是
                // 2	2	样本
                //     3	3	算法
                // 4	4	插件
                //     5	5	应用
                // 6	6	数据
                //     7	7	需求
                'getComments': function (page,per_page,relevance_id) {
                    return http.get('/v1/app/comments?page=' + page + '&per_page=' + per_page+'&type='+4+'&relevance_id='+relevance_id);
                },

                //v1/app/comments/store/
                // content	评论内容 string(必填)	是	[string]
                // 2	star_rating	星级 int(必填)	是	[string]
                // 3	relevance_id	相关内容id int(必填)	是	[string]
                // 4	type
                // 'putComment': function (content,star_rating,relevance_id) {
                //     return http.post('/v1/app/comments/store/',content,star_rating,relevance_id,4);
                // },
                'putComment': function (data) {
                    return http.post('/v1/app/comments/store/',data);
                },
                'getPlugins': function(page,per_page,order,label_id,user_id) {
                    return http.get('/v1/app/plugins?page=' + page + '&per_page=' + per_page+"&order="+order+"&label_id="+label_id+"&user_id="+user_id+"&status=1");
                },
                'payOrder': function (user_id,relevance_id) {
                    var param={
                        user_id:user_id,
                        relevance_id:relevance_id,
                        type:"plugins"
                    };
                    return http.post('/v1/app/orders/placeorder',param);
                },
            }
        };
        return methods;
    }

    // 需求
    app.factory("demandService",demandService);
    demandService.$inject = ['http'];

    function demandService(http) {

        var methods = {
            lists: {
                'getDemandList': function(page,per_page,classification_id,order) {
                    return http.get('/v1/app/demands?page=' + page + '&per_page=' + per_page+'&classid='+classification_id+'&order='+order+"&status=1");
                },
                'getUserDemandList': function(page,per_page,classification_id,order,user_id) {
                    return http.get('/v1/app/demands?page=' + page + '&per_page=' + per_page+'&classid='+classification_id+'&order='+order+"&status=1&user_id="+user_id);
                },
                'getDemandDetail': function(id,user_id) {
                    if(user_id){
                        return http.get('/v1/app/demands/'+id+"?user_id="+user_id);
                    }else{
                        return http.get('/v1/app/demands/'+id);
                    }
                },
                'getClassifications': function(page,per_page,type) {
                    return http.get('/v1/admin/classifications?page=' + page + '&per_page=' + per_page+'&type='+type);
                },
                // 提交投标
                'save': function(param1) {
                    return http.post('/v1/app/biddings/update', param1);
                },
                // 图片 、文件上传
                'uploadFile': function() {
                    return '/v1/upload';
                },
                // 1    资讯	是
                // 2	2	样本
                // 3	3	算法
                // 4	4	插件
                // 5	5	应用
                // 6	6	数据
                //     7	7	需求
                'getComments': function (page,per_page,relevance_id) {
                    return http.get('/v1/app/comments?page=' + page + '&per_page=' + per_page+'&type='+7+'&relevance_id='+relevance_id);
                },
                'getHot': function () {
                    return http.get('/v1/app/demands/grouplist?page=1&per_page=5&status=1');
                },
                // v1/app/biddings
                'getBiddings': function (demand_id) {
                    return http.get('/v1/app/biddings?page=1&per_page=5&demand_id='+demand_id);
                },
                'putComment': function (data) {
                    return http.post('/v1/app/comments/store/',data);
                }
            }
        };
        return methods;
    }

        // 首页
    app.factory("indexService",indexService);
    indexService.$inject = ['http'];

    function indexService(http) {

        var methods = {
            lists: {
                'getSampleList':function (urlType) {
                    return http.get("?c=sample&m=listing&page="+1+"&per_page="+15+"&order_by=updated_at",urlType);
                },
                // http://wechat.hiall.com.cn/geovis/index.php?c=Arithmetic&m=listing
                'getArithmeticList':function (urlType) {
                    return http.get("?c=Arithmetic&m=listing&page="+1+"&per_page="+5,urlType);
                },
                // groupid	位置id	是	[int]		查看
                //     2	name	名称	是	[string]		查看
                //     3	image	路径	是	[string]		查看
                //     4	url
                'getRotations': function () {
                    // return http.get('/v1/admin/rotations?groupid=' + 1);
                    return http.get('/v1/admin/rotations?page=' + 1 + '&per_page=' + 5+ '&groupid=' + 1);
                },
                'getDemandList': function(page, per_page, order) {
                    return http.get('/v1/app/demands?page=' + page + '&per_page=' + per_page+ '&order=' + order+"&status=1");
                    // return http.get('/v1/app/demands');
                },
                'getArticles': function(page, per_page,classification_id) {
                    return http.get('/v1/app/articles?page=' + page + '&per_page=' + per_page+"&classification_id="+classification_id);
                },
                'getUsers': function (page,per_page) {
                    return http.get('/v1/admin/users?page=' + page+"&per_page="+per_page+"&status=1");
                },
                // 获取应用列表
                'getApplicationList': function(page, per_page, order) {
                    return http.get('/v1/app/application?page=' + page+"&per_page="+per_page+ '&order=' + order+"&status");
                },
                'getPlugins': function(page, per_page, order) {
                    // return http.get('/v1/app/plugins?page=' + page + '&per_page=' + per_page+ '&order=' + order);
                    // return http.get('/v1/app/plugins?page=' + page + '&per_page=' + per_page+"&order="+order+"&label_id="+label_id+"&user_id="+user_id+"&status=1");

                    return http.get('/v1/app/plugins?page='+page+"&per_page="+per_page+"&order="+order+"&status=1");
                },
                // v1/admin/rotations/getone/1
                'getARotation': function(id) {
                    return http.get('/v1/app/plugins/'+id);
                },
            }
        };
        return methods;
    };
//文档
    app.factory("doucumentListService",doucumentListService);
    doucumentListService.$inject = ['http'];
    function doucumentListService(http) {

        var methods = {
            lists: {
                'getDocuments': function(page,per_page,classification_id) {
                    return http.get('/v1/app/documents?page=' + page + '&per_page=' + per_page+"&classification_id="+classification_id);
                },
                'getClassifications': function(page,per_page,type) {
                    return http.get('/v1/admin/classifications?page=' + page + '&per_page=' + per_page+'&type='+type);
                },
                'getDetail': function(id) {
                    return http.get('/v1/app/documents/'+id);
                }
            }
        };
        return methods;
    }
    //个人中心
    app.factory("userCenterService",userCenterService);
    userCenterService.$inject = ['http','baseUrl4'];
    function userCenterService(http,baseUrl4) {
        var methods = {
            lists: {
                // http://wechat.hiall.com.cn/geovis/index.php?c=user&m=user_bought_samples
                // 1	user_id	用户id	是	[string]
                // 2	page	第几页		[string]
                // 3	per_page
                //获取已购买的样本
                'getOrderSampleList': function (page,per_page,user_id,urlType) {
                    return http.get('?c=user&m=user_bought_samples&page='+page+"&per_page="+per_page+"&user_id=" + user_id,urlType);
                },
                //获取已购买的算法
                'getOrderArithmeticList': function (page,per_page,user_id,urlType) {
                    return http.get('?c=user&m=user_bought_arithmetic&page='+page+"&per_page="+per_page+"&user_id=" + user_id,urlType);
                },
                //获取已发布的算法
                'getUserArithmeticList': function (page,per_page,user_id,urlType) {
                    return http.get('?c=user&m=user_arithmetic&page='+page+"&per_page="+per_page+"&user_id=" + user_id,urlType);
                },
                //获取我训练的算法
                'getUserTrainArithmeticList': function (page,per_page,user_id,urlType) {
                    return http.get('?c=user&m=user_arithmetic&page='+page+"&per_page="+per_page+"&user_id=" + user_id,urlType);
                },
                'getUserDetail': function (id) {
                    return http.get('/v1/app/home/users/' + id);
                },
                'getPlugins': function(page,per_page,order,user_id) {
                    return http.get('/v1/app/plugins?page=' + page + '&per_page=' + per_page+"&order="+order+"&label_id="+0+"&user_id="+user_id);
                    // return http.get('/v1/app/plugins?page=' + page + '&per_page=' + per_page+"&order="+order+"&label_id="+label_id+"&user_id="+user_id);
                },
                // 获取应用列表
                'getApplications': function(param1, param2, param3,user_id) {
                    return http.get('/v1/app/application?page=' + param1 + '&per_page=' + param2 + '&order=' + param3+"&label_id="+0+"&user_id="+user_id);
                },
                'getDemandList': function(page,per_page,user_id) {
                    return http.get('/v1/app/demands?page=' + page + '&per_page=' + per_page+"&status=1&user_id="+user_id);
                },
                //已发布的
                'getFabuList': function(page,per_page,user_id) {
                    return http.get('/v1/app/demands?page=' + page + '&per_page=' + per_page+"&user_id="+user_id);
                },
                // v1/app/biddings中标的
                'getZhongbiaoList': function(page,per_page,user_id) {
                    return http.get('/v1/app/biddings?page=' + page + '&per_page=' + per_page+'&schedule='+1+"&user_id="+user_id);
                },
                // v1/app/biddings投标的
                'getToubiaoList': function(page,per_page,user_id) {
                    return http.get('/v1/app/biddings?page=' + page + '&per_page=' + per_page+"&user_id="+user_id);
                },
                // v1/app/biddings投标的
                'getDemandToubiaoList': function(page,per_page,demand_id,user_id) {
                    return http.get('/v1/app/biddings?page=' + page + '&per_page=' + per_page+"&demand_id="+demand_id+"&user_id="+user_id);
                },
                // // v1/app/biddings投标的
                // 'getBaomingUsers': function(page,per_page) {
                //     return http.get('/v1/app/home/users/?page=' + page + '&per_page=' + per_page+'&me='+1);
                // },
                // v1/app/orders已购买的
                'getOrderedPlugins': function (page,per_page,user_id) {
                    return http.get('/v1/app/orders?page='+page+'&per_page='+per_page+'&type=plugins&user_id='+user_id);
                },
                // v1/app/orders已购买的
                'getOrderedApplications': function (page,per_page,user_id) {
                    return http.get('/v1/app/orders?page='+page+'&per_page='+per_page+'&type=applications&user_id='+user_id);
                },
                // 图片 、文件上传
                'uploadImg': function() {
                    return '/v1/upload';
                },
                // http://api.geovis.ai/v1/app/home/users/{user_id}/avatar    avatar_url
                'saveImg': function(user_id,avatar_url) {
                    var data={
                        avatar_url:avatar_url
                    }
                    return http.put('/v1/app/home/users/'+user_id+'/avatar',data);
                },
                'abandonDemand': function(user_id,demandId) {
                    var data={
                        user_id:user_id,
                        id:demandId
                    }
                    return http.post('/v1/app/biddings/del',data);
                },
                'download':function (id,access_token) {
                    var data={
                        id:id,
                        access_token:access_token
                    }
                    return http.post(baseUrl4+'/dl/dataset/download',data);
                }
            }
        };
        return methods;
    }
    // // 样本
    // app.factory("sampleService",sampleService);
    // sampleService.$inject = ['http'];
    // function sampleService(http) {
    //
    //     var methods = {
    //         lists: {
    //             // access_token string 无 无 解码前的tokenorder_by string 'id' 样本详细信息中除了introduction之外的所有字段 排序方式desc boolean false true,false 是否是逆序page int 0 无 要查询第
    //             'getsampleList': function(access_token,order_by,desc,page) {
    //                 var data={
    //                     access_token:access_token,
    //                     order_by:order_by,
    //                     desc: desc,
    //                     page: page
    //                 }
    //                 return http.post('/dl/datasets',data);
    //             },
    //         }
    //     };
    //     return methods;
    // }
    app.factory("integralService",integralService);
    integralService.$inject = ['http'];
    function integralService(http) {

        var methods = {
            lists: {
                'getIntegralList': function(page,per_page,user_id) {
                    return http.get('/v1/app/integralRecording?page='+page+"&per_page"+per_page+"&user_id="+user_id);
                },
            }
        };
        return methods;
    }
    app.factory("sampleService",sampleService);
    sampleService.$inject = ['http'];
    function sampleService(http) {
        var methods = {
            lists: {
                // 1	page	第几页		[string]
                // 2	per_page	每页多少条		[string]
                // 3	search	搜索关键字		[string]
                // 4	order_by	排序字段		[string]
                // 5	desc	是否倒序		[string]
                // 6	classification_id	分类id		[string]
                // 7	user_id	用户id		[string]
                // 8	filters
                'getSampleList':function (page,per_page,classification_id,filters,order_by,urlType) {
                    return http.get("?c=sample&m=listing&page="+page+"&per_page="+per_page+"&classification_id="+classification_id+"&filters="+filters+"&order_by="+order_by,urlType);
                },
                /**
                 * 热门样本发布者
                 * http://wechat.hiall.com.cn/geovis/index.php?c=user&m=hot_samples_user
                 * @param page
                 * @param per_page
                 */
                'getHotSampleList':function (page,per_page,urlType) {
                    return http.get("?c=user&m=hot_samples_user&page="+page+"&per_page="+per_page,urlType);
                },
                /**热门算法发布者
                 * http://wechat.hiall.com.cn/geovis/index.php?c=user&m=hot_arithmetic_user
                 * @param page
                 * @param per_page
                 */
                'getHotArithmeticList':function (page,per_page,urlType) {
                    return http.get("?c=user&m=hot_arithmetic_user&page="+page+"&per_page="+per_page,urlType);
                },
                // c=sample&m=info
                'getSampleDetail':function (id,user_id,urlType) {
                    // var param={
                    //     id:id
                    // };
                    // return http.post("http://www.geovis.me/see/dl/dataset/detail",param);
                    if(user_id){
                        return http.get("?c=sample&m=info&id="+id+"&user_id="+user_id,urlType);
                    }else{
                        return http.get("?c=sample&m=info&id="+id,urlType);
                    }
                },
                // http://wechat.hiall.com.cn/geovis/index.php?c=user&m=user_samples
                'getUserSampleList':function (page,per_page,user_id,urlType) {
                    if(user_id){
                        return http.get("?c=user&m=user_samples&page="+page+"&per_page="+per_page+"&user_id="+user_id,urlType);
                    }else{
                        return http.get("?c=user&m=user_samples&page="+page+"&per_page="+page,urlType);
                    }
                },
                //获取已发布的算法
                'getUserArithmeticList': function (page,per_page,user_id,urlType) {
                    return http.get('?c=user&m=user_arithmetic&page='+page+"&per_page="+per_page+"&user_id=" + user_id,urlType);
                },
                // 'getUserArithmeticList':function (page,per_page,user_id,sample_id,urlType) {
                //     // if(user_id){
                //         return http.get("?c=arithmetic&m=sample_train&page="+page+"&per_page="+per_page+"&user_id="+user_id+"&sample_id="+sample_id,urlType);
                //     // }
                //     // else{
                //     //     // return http.get("?c=arithmetic&m=sample_train&page="+page+"&per_page="+page,1);
                //     // }
                // },
                // http://wechat.hiall.com.cn/geovis/index.php?c=arithmetic&m=sample_train
                // 'getTrainSampleList':function (page,per_page,id) {
                //     return http.get("?c=arithmetic&m=sample_train&sample_id="+id+"&page="+page+"&per_page="+per_page,1);
                // },
                // http://wechat.hiall.com.cn/geovis/index.php?c=user&m=user_arithmetic
                // http://wechat.hiall.com.cn/geovis/index.php?c=user&m=user_samples
                'getClassifications': function(page,per_page) {
                    return http.get('/v1/admin/classifications?page=' + page + '&per_page=' + per_page+'&type='+2);
                },
                'getUserDetail': function (id) {
                    return http.get('/v1/app/home/users/' + id);
                },
                'getComments': function (page,per_page,relevance_id) {
                    return http.get('/v1/app/comments?page=' + page + '&per_page=' + per_page+'&type='+2+'&relevance_id='+relevance_id);
                },
                'payOrder': function (user_id,relevance_id) {
                    var param={
                        user_id:user_id,
                        relevance_id:relevance_id,
                        type:"samples"
                    }
                    return http.post('/v1/app/orders/placeorder',param);
                },
        // /dl/dataset/preview/refresh/
                'refreshSampleImg': function (id,urlTypeShendu) {
                    return http.get('/dl/dataset/preview/refresh/'+id,urlTypeShendu);
                },
                'putComment': function (data) {
                    return http.post('/v1/app/comments/store/',data);
                }

            }
        };
        return methods;
    }
    //算法详情接口
    app.factory("algorithmService",algorithmService);
    algorithmService.$inject = ['http'];
    function algorithmService(http) {
        var methods = {
            lists: {
                //获取已发布的算法
                'getUserArithmeticList': function (page,per_page,user_id,urlType) {
                    return http.get('?c=user&m=user_arithmetic&page='+page+"&per_page="+per_page+"&user_id=" + user_id,urlType);
                },
                'getalgorithmDetail':function (id,user_id,urlType) {
                    // var param={
                    //     id:id
                    // };
                    // return http.post("http://www.geovis.me/see/dl/dataset/detail",param);
                    if(user_id){
                        return http.get("?c=arithmetic&m=info&id="+id+"&user_id="+user_id,urlType);
                    }else{
                        return http.get("?c=arithmetic&m=info&id="+id,urlType);
                    }
                },
        // /dl/dataset/preview/refresh/
                'refresh':function (id,user_id,urlType) {
                    if(user_id){
                        return http.get("?c=arithmetic&m=info&id="+id+"&user_id="+user_id,urlType);
                    }else{
                        return http.get("?c=arithmetic&m=info&id="+id,urlType);
                    }
                },
                'getUserSampleList':function (page,per_page,user_id,urlType) {
                    if(user_id){
                        return http.get("?c=user&m=user_samples&page="+page+"&per_page="+per_page+"&user_id="+user_id,urlType);
                    }else{
                        return http.get("?c=user&m=user_samples&page="+page+"&per_page="+page,urlType);
                    }
                },
                'getComments': function (page,per_page,relevance_id) {
                    return http.get('/v1/app/comments?page=' + page + '&per_page=' + per_page+'&type='+3+'&relevance_id='+relevance_id);
                },
                'putComment': function (data) {
                    return http.post('/v1/app/comments/store/',data);
                },
                'payOrder': function (user_id,relevance_id) {
                    var param={
                        user_id:user_id,
                        relevance_id:relevance_id,
                        type:"algorithms"
                    }
                    return http.post('/v1/app/orders/placeorder',param);
                },
                // dl.geovis.ai:50001/dl/model/preview/refresh/  (+ modelid)
                'refreshSampleImg': function (id,urlType) {
                    return http.get('/dl/model/preview/refresh/'+id,urlType);
                },
            }
        }
        return methods;
    }
    app.factory("headService",headService);
    headService.$inject = ['http'];
    function headService(http) {
        var methods = {
            lists: {
                'login': function(code) {
                    return http.get('/v1/login?code='+code);
                },
                'getUserDetail': function (id) {
                    return http.get('/v1/app/home/users/' + id);
                },
                // v1/register
                'register': function(redirect_uri) {
                    return http.get('/v1/register?redirect_uri='+redirect_uri);
                }
            }
        };
        return methods;
    }

    app.factory("editeUserService",editeUserService);
    editeUserService.$inject = ['http'];
    function editeUserService(http) {
        var methods = {
            lists: {
                // 保存表单
                'save': function(user_id,data) {
                    return http.put('/v1/app/home/users/'+user_id+'/userinfo',data);
                },
                'getUserDetail': function (id) {
                    return http.get('/v1/app/home/users/' + id);
                },
            }
        };
        return methods;
    }

    app.factory("userIndexService",userIndexService);
    userIndexService.$inject = ['http'];
    function userIndexService(http) {
        var methods = {
            lists: {
                // 获取用户详情
                'getUserDetail': function (id) {
                    return http.get('/v1/app/home/users/' + id);
                },
                //获取已发布的算法
                'getUserArithmeticList': function (page,per_page,user_id,urlType) {
                    return http.get('?c=user&m=user_arithmetic&page='+page+"&per_page="+per_page+"&user_id=" + user_id,urlType);
                },
                // 获取应用列表
                'getUserApplicationsList': function(page, per_page,user_id) {
                    return http.get('/v1/app/application?page=' + page + '&per_page=' + per_page + "&label_id="+0+"&user_id="+user_id);
                },
                //已发布的需求
                'getUserDemandList': function(page,per_page,user_id) {
                    return http.get('/v1/app/demands?page=' + page + '&per_page=' + per_page+"&user_id="+user_id);
                },
                'getUserPluginsList': function(page,per_page,user_id) {
                    return http.get('/v1/app/plugins?page=' + page + '&per_page=' + per_page+"&label_id="+0+"&user_id="+user_id);
                },
            }
        };
        return methods;
    }
});

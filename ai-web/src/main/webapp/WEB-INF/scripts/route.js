define(["app"],
    function(app) {
        return app.run([
                '$rootScope',
                '$state',
                '$stateParams',
                '$location',
                function($rootScope, $state, $stateParams, $location) {
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                }
            ])
            .config(function($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider) {
                $locationProvider.html5Mode(true);
                //用于改变state时跳至顶部
                $uiViewScrollProvider.useAnchorScroll();
                // 首页
                $stateProvider.state({
                    name: 'index',
                    url: '/',
                    templateUrl: 'app/views/index.html',
                    controller: 'indexController'
                });
                // 搜索
                $stateProvider.state({
                    name: 'search',
                    url: '/search',
                    templateUrl: 'app/views/search.html',
                    controller: 'searchController'
                });
                // 资讯
                $stateProvider.state({
                    name: 'article',
                    url: '/article/article',
                    templateUrl: 'app/views/article/articlelist.html',
                    controller: 'articleController'
                });
                // 资讯详情
                $stateProvider.state({
                    name: 'article_detail',
                    url: '/article/articleDetail',
                    templateUrl: 'app/views/article/articleDetail.html',
                    controller: "articleDetailController"
                });
                // 样本
                $stateProvider.state({
                    name: 'sample',
                    url: '/sample/sample',
                    templateUrl: 'app/views/sample/samplelist.html',
                    controller: "sampleController"
                });
                // 样本详情
                $stateProvider.state({
                    name: 'sample_detail',
                    url: '/sample/sampleDetail',
                    templateUrl: 'app/views/sample/sampleDetail.html',
                    controller: 'sampleDetailController'
                });
                // 算法详情
                $stateProvider.state({
                    name: 'algorithm_detail',
                    url: '/sample/algorithmDetail',
                    templateUrl: 'app/views/sample/algorithmDetail.html',
                    controller: 'algorithmDetailController'
                });
                // 算法本地测试
                $stateProvider.state({
                    name: 'algorithm_localtest',
                    url: '/sample/localTest',
                    templateUrl: 'app/views/sample/localTest.html'
                });
                // 数据
                $stateProvider.state({
                    name: 'data',
                    url: '/data/datalist',
                    templateUrl: 'app/views/data/dataList.html'
                });
                // 数据详情
                $stateProvider.state({
                    name: 'data_detail',
                    url: '/data/dataDetail',
                    templateUrl: 'app/views/data/dataDetail.html'
                });
                // 插件
                $stateProvider.state({
                    name: 'pluginunit',
                    url: '/pluginunit/pluginunitlist',
                    templateUrl: 'app/views/pluginunit/pluginunitList.html',
                    controller: 'pluginunitListController'
                });
                // 插件详情
                $stateProvider.state({
                    name: 'pluginunit_detail',
                    url: '/pluginunit/pluginunitDetail',
                    templateUrl: 'app/views/pluginunit/pluginunitDetail.html',
                    controller: 'pluginunitDetailController'

                });
                // 应用
                $stateProvider.state({
                    name: 'application',
                    url: '/application/applicationlist',
                    templateUrl: 'app/views/application/applicationList.html',
                    controller: 'applicationListController'
                });
                // 应用详情
                $stateProvider.state({
                    name: 'application_detail',
                    url: '/application/applicationDetail',
                    templateUrl: 'app/views/application/applicationDetail.html',
                    controller: 'applicationDetailController'
                });
                // 需求
                $stateProvider.state({
                    name: 'demand',
                    url: '/demand/demandlist',
                    templateUrl: 'app/views/demand/demandList.html',
                    controller: 'demandListController'
                });
                // 需求详情
                $stateProvider.state({
                    name: 'demand_detail',
                    url: '/demand/demandDetail',
                    templateUrl: 'app/views/demand/demandDetail.html',
                    controller: 'demandDetailController'
                });
                // 需求投标
                $stateProvider.state({
                    name: 'demand_schedule',
                    url: '/demand/scheduleDetail',
                    templateUrl: 'app/views/demand/scheduleDetail.html',
                    controller: 'scheduleDetailController'
                });
                // 知识列表
                $stateProvider.state({
                    name: 'knowledgelist',
                    url: '/knowledge/knowledgelist',
                    templateUrl: 'app/views/knowledge/knowledgeList.html',
                    controller: 'knowledgeListController'
                });
                // 知识详情
                $stateProvider.state({
                    name: 'knowledgedetail',
                    url: '/knowledge/knowledgedetail',
                    templateUrl: 'app/views/knowledge/knowledgeDetail.html',
                    controller: 'knowledgeDetailController'
                });
                // 文档
                $stateProvider.state({
                    name: 'document',
                    url: '/document',
                    templateUrl: 'app/views/document/document.html'
                });
                // 下载
                $stateProvider.state({
                    name: 'download',
                    url: '/download',
                    templateUrl: 'app/views/download/download.html'
                });
                // 个人中心
                $stateProvider.state({
                    name: 'usercenter',
                    url: '/usercenter',
                    templateUrl: 'app/views/usercenter/usercenter.html',
                    controller: 'userhomeController'
                });
                // 个人中心 首页(默认)
                $stateProvider.state({
                    name: 'usercenter.home',
                    url: '/home',
                    templateUrl: 'app/views/usercenter/home.html'
                });
                // 个人中心 样本管理
                $stateProvider.state({
                    name: 'usercenter.samplemanage',
                    url: '/samplemanage',
                    templateUrl: 'app/views/usercenter/sample/sampleManage.html'
                });
                // 个人中心 发布算法 releaseAlgorithm
                $stateProvider.state({
                    name: 'usercenter.releasealgorithm',
                    url: '/releasealgorithm',
                    templateUrl: 'app/views/usercenter/algorithm/releaseAlgorithm.html',
                    controller: 'releaseAlgorithmController'
                });
                // 个人中心 算法管理 algorithmManage
                $stateProvider.state({
                    name: 'usercenter.algorithmmanage',
                    url: '/algorithmmanage',
                    templateUrl: 'app/views/usercenter/algorithm/algorithmManage.html',
                    controller: 'algorithmManagerController'

                });
                // 个人中心 算法训练 algorithmTrain
                $stateProvider.state({
                    name: 'algorithmtrain',
                    url: '/algorithmtrain',
                    templateUrl: 'app/views/usercenter/algorithm/algorithmTrain.html'
                });
                // 个人中心 算法测试 algorithmTest
                $stateProvider.state({
                    name: 'algorithmtest',
                    url: '/algorithmtest',
                    templateUrl: 'app/views/usercenter/algorithm/algorithmTest.html'
                });
                // 个人中心 插件 上传插件 releasePluginunit
                $stateProvider.state({
                    name: 'releasePluginunit',
                    url: '/releasePluginunit',
                    templateUrl: 'app/views/usercenter/pluginunit/releasePluginunit.html',
                    controller: 'releasePluginunitController'
                });
                // 个人中心 插件  编辑插件
                $stateProvider.state({
                    name: 'editePluginunit',
                    url: '/editePluginunit',
                    templateUrl: 'app/views/usercenter/pluginunit/editePluginunit.html',
                    controller: 'editePluginunitController'
                });
                // 个人中心 插件 插件管理  usercenter.uploadpluginunit
                $stateProvider.state({
                    name: 'usercenter.pluginunitmanage',
                    url: '/pluginunitmanage',
                    templateUrl: 'app/views/usercenter/pluginunit/pluginunitManage.html'
                });
                // 个人中心 插件 发布应用 releaseSecondApplication
                $stateProvider.state({
                    name: 'releaseSecondApplication',
                    url: '/releaseSecondApplication',
                    templateUrl: 'app/views/usercenter/application/releaseSecondApplication.html'
                });
                // 个人中心 应用  发布应用
                $stateProvider.state({
                    name: 'releaseApplication',
                    url: '/releaseApplication',
                    templateUrl: 'app/views/usercenter/application/releaseApplication.html',
                    controller: 'releaseApplicationController'
                });
                // 个人中心 应用  修改应用
                $stateProvider.state({
                    name: 'editeApplication',
                    url: '/editeApplication',
                    templateUrl: 'app/views/usercenter/application/editeApplication.html',
                    controller: 'editeApplicationController'
                });
                // 个人中心 插件 发布应用 releaseFirstApplication
                $stateProvider.state({
                    name: 'releaseFirstApplication',
                    url: '/releaseFirstApplication',
                    templateUrl: 'app/views/usercenter/application/releaseFirstApplication.html'
                });
                // 个人中心 应用  应用管理
                $stateProvider.state({
                    name: 'usercenter.applicationmanage',
                    url: '/applicationmanage',
                    templateUrl: 'app/views/usercenter/application/applicationManage.html'
                });
                // 个人中心 数据  数据管理
                $stateProvider.state({
                    name: 'usercenter.datamanage',
                    url: '/datamanage',
                    templateUrl: 'app/views/usercenter/data/dataManage.html'
                });
                // 个人中心 需求  发布需求
                $stateProvider.state({
                    name: 'releasedemand',
                    url: '/releasedemand',
                    templateUrl: 'app/views/usercenter/demand/releaseDemand.html',
                    controller: 'releaseDemandController'
                });
                //
                // 个人中心 需求  发布需求
                $stateProvider.state({
                    name: 'editedemand',
                    url: '/editedemand',
                    templateUrl: 'app/views/usercenter/demand/editeDemand.html',
                    controller: 'editeDemandController'
                });
                // 个人中心 需求  提交成果
                $stateProvider.state({
                    name: 'deliverdemand',
                    url: '/deliverdemand',
                    templateUrl: 'app/views/usercenter/demand/deliverDemand.html',
                    controller: 'deliverdemandController'
                });
                // 个人中心 需求  需求管理
                $stateProvider.state({
                    name: 'usercenter.demandmanage',
                    url: '/demandmanage',
                    templateUrl: 'app/views/usercenter/demand/demandManage.html'
                });
                // 个人中心 需求  需求管理
                $stateProvider.state({
                    name: 'usercenter.tenderManage',
                    url: '/tenderManage',
                    templateUrl: 'app/views/usercenter/demand/tenderManage.html'
                });
                // 个人中心 需求  需求管理 applyManage.html
                $stateProvider.state({
                    name: 'usercenter.winBidManage',
                    url: '/winBidManage',
                    templateUrl: 'app/views/usercenter/demand/winBidManage.html'
                });
                // 个人中心 需求  需求管理 applyManage.html
                $stateProvider.state({
                    name: 'applyManage',
                    url: '/applyManage',
                    templateUrl: 'app/views/usercenter/demand/applyManage.html',
                    controller: 'applyManageController'
                });
                // 个人中心 账户  基础信息
                $stateProvider.state({
                    name: 'usercenter.baseinfo',
                    url: '/baseinfo',
                    templateUrl: 'app/views/usercenter/account/baseInfo.html',
                    controller: 'baseInfoManagerController'
                });

                // 个人中心 账户  账户认证
                $stateProvider.state({
                    name: 'accountAuthentication',
                    url: '/accountAuthentication',
                    templateUrl: 'app/views/usercenter/account/accountAuthentication.html',
                    controller: 'accountAuthenticationContrl'
                });
                // 个人中心 账户  积分管理
                $stateProvider.state({
                    name: 'usercenter.integralmanage',
                    url: '/integralmanage',
                    templateUrl: 'app/views/usercenter/account/integralManage.html',
                    controller: 'integralManageController'
                });
                // 个人中心 账户  修改密码
                // $stateProvider.state({
                //     name: 'usercenter.modifyinfo',
                //     url: '/modifyinfo',
                //     templateUrl: 'app/views/usercenter/account/modifyInfo.html'
                // });
                // 个人中心 账户  修改个人信息
                $stateProvider.state({
                    name: 'usercenter.modifyInfo',
                    url: '/modifyInfo',
                    templateUrl: 'app/views/usercenter/account/modifyInfo.html',
                    controller: 'editeUserInfoController'
                });
                // 个人主页
                $stateProvider.state({
                    name: 'userIndex',
                    url: '/usercenter/account/userIndex',
                    templateUrl:'app/views/usercenter/account/userIndex.html',
                    controller: 'userIndexController'
                });
                $urlRouterProvider.otherwise('/');
            })
    })
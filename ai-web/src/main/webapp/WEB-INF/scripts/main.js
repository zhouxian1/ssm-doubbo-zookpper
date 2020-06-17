require.config({//配置依赖
    baseUrl: '/', //如果不手动配置的话，默认是包含运行requireJS的Html的目录
    paths: {
        //一些库文件
        'jquery': '../scripts/lib/jquery.min',
        'angular': '../scripts/lib/angular.min',
        'uiroute': '../scripts/lib/angular-ui-router.min',
        'domReady': '../scripts/vendor/domReady.min',
        'app': '../scripts/app',
        'route': '../scripts/route',
        'http': '../scripts/services/http',
        'services': '../scripts/services/services',
        'directives': '../scripts/directives/directives',
        'filters': '../scripts/filters/filters',
        'fileUpload': '../scripts/lib/angular-file-upload.min',
        'uibootstrap': '../scripts/lib/ui-bootstrap-tpls-0.14.3.min',
        'WdatePicker': '../scripts/lib/WdatePicker',
        'moment': '../scripts/lib/moment',
        'angularCookies': '../scripts/lib/angular-cookies',
        // 所有控制器
        'headerController': '../app/controllers/main/headerController',
        //'algorithmManageController': 'app/controllers/algorithm/algorithmManageController',
        // 知识
        'knowledgeListController': '../app/controllers/knowledge/knowledgeListController',
        'knowledgeDetailController': '../app/controllers/knowledge/knowledgeDetailController',
        // 个人中心
        'usercenterController': '../app/controllers/usercenter/usercenterController',
        'userhomeController': '../app/controllers/usercenter/userhomeController',
        'userSampleManageController': '../app/controllers/usercenter/userSampleManageController',
        // 个人中心 插件
        'releasePluginunitController': '../app/controllers/usercenter/pluginunit/releasePluginunitController',
        'editePluginunitController': '../app/controllers/usercenter/pluginunit/editePluginunitController',
        // 个人中心 发布算法
        'releaseAlgorithmController': '../app/controllers/usercenter/algorithm/releaseAlgorithmController',
        // 个人中心 发布应用
        'releaseApplicationController': '../app/controllers/usercenter/application/releaseApplicationController',
        'editeApplicationController': '../app/controllers/usercenter/application/editeApplicationController',
        // 个人中心 发布需求
        'releaseDemandController': '../app/controllers/usercenter/demand/releaseDemandController',
        'editeDemandController': '../app/controllers/usercenter/demand/editeDemandController',
        'deliverdemandController': '../app/controllers/usercenter/demand/deliverdemandController',

        // 个人中心 账户认证
        'accountAuthenticationContrl': '../app/controllers/usercenter/account/accountAuthenticationContrl',
        // 应用
        'applicationListController': '../app/controllers/application/applicationListController',
        'applicationDetailController': '../app/controllers/application/applicationDetailController',

        //咨询
        'articleController': '../app/controllers/article/articleController',
        'articleDetailController': '../app/controllers/article/articleDetailController',

        //插架列表D:\phpStudy\WWW\geovis_app\src\app\controllers\pluginunit
        'pluginunitListController': '../app/controllers/pluginunit/pluginunitListController',
        'pluginunitDetailController': '../app/controllers/pluginunit/pluginunitDetailController',

        'demandListController': '../app/controllers/demand/demandListController',
        'demandDetailController': '../app/controllers/demand/demandDetailController',

        'indexController': '../app/controllers/home/indexController',
        'searchController': '../app/controllers/home/searchController',

        'documentListController': '../app/controllers/document/documentListController',
        'pluginunitmanageController': '../app/controllers/usercenter/pluginunit/pluginunitmanageController',
        'applicationManagerController':'../app/controllers/usercenter/application/applicationManagerController',
        'demandManagerController':'../app/controllers/usercenter/demand/demandManagerController',
        'baseInfoManagerController':'../app/controllers/usercenter/account/baseInfoManagerController',
        'applyManageController':'../app/controllers/usercenter/demand/applyManageController',
        'integralManageController':'../app/controllers/usercenter/integralManageController',
        'algorithmDetailController':'../app/controllers/sample/algorithmDetailController',
        'scheduleDetailController':'../app/controllers/sample/scheduleDetailController',
        'sampleController':'../app/controllers/sample/sampleController',
        'sampleDetailController':'../app/controllers/sample/sampleDetailController',
        'algorithmManagerController':'../app/controllers/usercenter/algorithm/algorithmManagerController',
        'algorithmDetailController':"../app/controllers/sample/algorithmDetailController",
        'editeUserInfoController':'../app/controllers/usercenter/account/editeUserInfoController',
       'userIndexController':'../app/controllers/usercenter/account/userIndexController'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiroute': {
            deps: ['angular'],
            exports: 'uiroute'
        },
        'fileUpload': {
            deps: ['angular'],
            exports: 'angularFileUpload'
        },
        'uibootstrap':{
            deps: ['angular'],
            exports: 'uibootstrap'
        },
        'WdatePicker': {
            deps: ['jquery']
        },
        'moment': {
            exports: 'moment'
        },
        'angularCookies': {
            deps: ['angular'],
            exports: 'ngCookies'
        }
    },
    // urlArgs: "bust=" + (new Date()).getTime() // 防止读取缓存，调试用
    // waitSeconds: 15
})

define(['require', 'angular', 'uiroute', 'uibootstrap','jquery','fileUpload', 'WdatePicker',
    'domReady', 'app', 'route', 'http', 'services', 'directives', 'filters', 'moment','angularCookies',
    'headerController', 'knowledgeListController', 'knowledgeDetailController',
    'usercenterController', 'userhomeController', 'userSampleManageController',
    'releaseAlgorithmController', 'applicationListController', 'releaseApplicationController',
    'applicationDetailController', 'releasePluginunitController', 'articleController',
    'articleDetailController', 'pluginunitListController',
    'pluginunitDetailController', 'demandListController','demandDetailController',
    'indexController', 'accountAuthenticationContrl','releaseDemandController','documentListController','pluginunitmanageController',
    'applicationManagerController','demandManagerController','baseInfoManagerController','editePluginunitController','editeApplicationController',
    'editeDemandController','applyManageController','integralManageController', 'searchController',
    'algorithmDetailController','scheduleDetailController','deliverdemandController','sampleController', 'sampleDetailController','algorithmManagerController',
    'algorithmDetailController','editeUserInfoController','userIndexController'

],
    function(require, angular) {
    'use strict';
        require(['domReady'], function (document) {
        angular.bootstrap(document, ['webapp']); //手动加载angularjs应用

    })
});

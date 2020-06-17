//声明全局的一个主模块
var app = angular.module('gxCmsApp', [
    "ngRoute",
    "powerManage", "addPower", "powerDetailed",
    "personal",
    "goodsManage", "addClassify", "addGoods", "goodsDetailed",
    "orderManage", "orderDetailed", "addOrder", "orderCardNumber",
    "inStock", "addBatch","recycling","recyclingQuery","recyclingConfig","recyclingOut",
    "channelManage", "addChannel", "channelDetailed",
    "userManage", "addUser", "userDetailed",
    "financeManage",
    "webManage", "webBanner", "webClassify", "webManageCategories", "webFloor",
    "addIssuer", "withdrawRecord", "withdrawDetailed", "submitPaid",
    "ngCookies",
    "associatedPhone",
    "suppGoods",
    "queryStock",
    "threeStore",
    "offlineDelivery",
    "comeOnCard",
    "comeOnCardDetail",
    "exportExcel",
    "angularFileUpload",
    "mylogin"
]);

//主控制器
app.controller('mainCtrl', function ($scope, $http, $cookies, $interval, $timeout, $rootScope,$location) {

    // this.html5Mode(true);
    // $rootScope.commonUrl = "http://api.geovis.yunxiaotui.wang/";
    // $rootScope.commonUrl = "http://admin.geovis.ai/api/";
    $rootScope.commonUrl = "/api/";

    //点击日期这个icon时出现日期和页面置顶
    $scope.pageAdjust = function () {
        $(".glyphicon-calendar").parent().on("click", function () {
            $(this).prev().focus();
        });
        $('html, body').animate({
            //添加animate动画效果
            scrollTop: 0
        }, 1);
    };
    //登录之后得到cookie放进去
    $scope.isLogined = $cookies.put('loginStatus',"response.id");
    $scope.isLogined = $cookies.get('loginStatus');

    $(".xn-navActive").click(function () {
        $(this).addClass("active");
        //var putActiveHtml=angular.toJson(this);
    });

    //登錄開始
    $scope.code=$location.search().code;
    // alert($scope.code);
    $scope.user={
        access_token:$cookies.get("access_token"),
        role:$cookies.get("role"),
        user_name:$cookies.get("user_name"),
        user_id:$cookies.get("user_id")
    };
    if( $scope.user.access_token&&$scope.user.role&&$scope.user.user_name&&$scope.user.user_id){//已经成功登录
        if($scope.user.role!=2){
            swal("您不是管理员用户");
            // window.location.href="http://www.geovis.ai";
            // window.location.href=$scope.commonUrl+"v1/authorize?redirect_uri="+$location.absUrl();

            window.location.href="/adminlogin.html";


        }
    }else if($scope.code){//登陆后已经跳转回来，需要调用登录接口
        // http://api.geovis.ai/v1/login  $scope.commonUrl  http://api.geovis.yunxiaotui.wang/v1/authorize
        $http({
            url:$scope.commonUrl+"v1/login?code="+$scope.code,
            method:"get",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }

        }).success(function(res) {
            console.log(res);
            if(res.code==1000){
                $scope.user=  res.data;
                console.log($scope.user.user_name);
                if($scope.user.role!=2){
                    swal("您不是管理员用户");
                    // window.location.href="http://www.geovis.ai";
                    // window.location.href=$scope.commonUrl+"v1/authorize?redirect_uri="+$location.absUrl();
                    window.location.href="/adminlogin.html";

                }else{
                    $cookies.put("access_token",$scope.user.access_token);
                    $cookies.put("role",$scope.user.role);
                    $cookies.put("user_name",$scope.user.user_name);
                    $cookies.put("user_id",$scope.user.user_id);
                }

                // getUserDetail($scope.user.user_id);
            } else if(res.code==10002003){//"code过期或者code码已经换取过一次token[code只能使用一次]
                swal("code过期或者code码已经换取过一次token[code只能使用一次");
                // window.location.href=$scope.commonUrl+"v1/authorize?redirect_uri="+$location.absUrl();
                window.location.href="/adminlogin.html";

            } else{
                swal("登录失败"+res.message);
                // window.location.href=$scope.commonUrl+"v1/authorize?redirect_uri="+$location.absUrl();
                window.location.href="/adminlogin.html";

            }
        })
    } else{//没有成功登录，跳转到登录页面
        // window.location.href=$scope.commonUrl+"v1/authorize?redirect_uri="+$location.absUrl();
        window.location.href="/adminlogin.html";

    }

    $scope.logout=function () {
        $scope.user=  "";
        console.log($scope.user.user_name);
        $cookies.put("access_token",$scope.user.access_token);
        $cookies.put("role",$scope.user.role);
        $cookies.put("user_name",$scope.user.user_name);
        $cookies.put("user_id",$scope.user.user_id);
        // window.location.href=$scope.commonUrl+"v1/authorize?redirect_uri="+$location.absUrl();
        // window.location.href="http://www.geovis.ai";
        window.location.href="/adminlogin.html";

        // window.location.href=$scope.commonUrl+"v1/authorize?redirect_uri="+$location.absUrl();

        // swal("退出");
    }
    $scope.nologout=function () {
        swal("放弃退出");
    }
    //登錄結束


});
 app.config(['$locationProvider', function($locationProvider) {
  // Configure existing providers
  // $locationProvider.hashPrefix('!');
     $locationProvider.html5Mode(true);
 }]);
//配置跳转路径和控制器
app.config(['$routeProvider',
    function ($routeProvider, $scope) {
        $routeProvider
            .when('/', {
                templateUrl: "app/stock/stock-recyclingManage.html",
                controller: recyclingCtrl
            })
            .when("/mylogin",{
                templateUrl: "app/mylogin/mylogin.html",
                controller: myloginCtrl
            })
            .when('/powerManage', {
                templateUrl: 'app/power/power-powerManage.html',
                controller: powerManageCtrl
            })
            .when('/addPower', {
                templateUrl: 'app/power/power-addPower.html',
                controller: addPowerCtrl
            })
            .when('/powerDetailed', {
                templateUrl: 'app/power/power-powerDetailed.html',
                controller: powerDetailedCtrl
            })
            .when('/powerDetailed/:userId', {
                templateUrl: 'app/power/power-powerDetailed.html',
                controller: powerDetailedCtrl
            })
            .when('/addIssuer', {
                templateUrl: "app/channel/channel-addIssuer.html",
                controller: addIssuerCtrl
            })
            .when('/channelDetailed', {
                templateUrl: 'app/channel/channel-channelDetailed.html',
                controller: channelDetailedCtrl
            })
            .when('/channelDetailed/:compId', {
                templateUrl: 'app/channel/channel-channelDetailed.html',
                controller: channelDetailedCtrl
            })
            .when('/personal', {
                templateUrl: 'app/personal/personal.html',
                controller: personalCtrl
            })
            .when('/submitPaid', {
                templateUrl: 'app/personalPaid/personal-submitPaid.html',
                controller: submitPaidCtrl
            })
            .when('/goodsManage', {
                templateUrl: 'app/goods/goods-goodsManage.html',
                controller: goodsManageCtrl
            })
            .when('/addClassify', {
                templateUrl: 'app/goods/goods-addClassify.html',
                controller: addClassifyCtrl
            })
            .when('/addClassify/:id', {
                templateUrl: 'app/goods/goods-addClassify.html',
                controller: addClassifyCtrl
            })
            .when('/addGoods', {
                templateUrl: 'app/goods/goods-addGoods.html',
                controller: addGoodsCtrl
            })
            .when('/addGoods/:id', {
                templateUrl: 'app/goods/goods-addGoods.html',
                controller: addGoodsCtrl
            })
            .when('/goodsDetailed', {
                templateUrl: 'app/goods/goods-goodsDetailed.html',
                controller: goodsDetailedCtrl
            })
            .when('/goodsDetailed/:goodsId', {
                templateUrl: 'app/goods/goods-goodsDetailed.html',
                controller: goodsDetailedCtrl
            })
            .when('/orderManage', {
                templateUrl: 'app/order/order-orderManage.html',
                controller: orderManageCtrl
            })
            .when('/orderDetailed', {
                templateUrl: 'app/order/order-orderDetailed.html',
                controller: orderDetailedCtrl
            })
            .when('/orderDetailed/:orderNo', {
                templateUrl: 'app/order/order-orderDetailed.html',
                controller: orderDetailedCtrl
            })
            .when('/addOrder', {
                templateUrl: "app/order/order-addOrder.html",
                controller: addOrderCtrl
            })
            .when('/addOrder/:id', {
                templateUrl: "app/order/order-addOrder.html",
                controller: addOrderCtrl
            })
            .when('/orderCardNumber', {
                templateUrl: 'app/order/order-cardNumber.html',
                controller: orderCardNumberCtrl
            })
            .when('/orderCardNumber/:orderNo', {
                templateUrl: 'app/order/order-cardNumber.html',
                controller: orderCardNumberCtrl
            })
            .when('/inStock', {
                templateUrl: 'app/stock/stock-inStock.html',
                controller: inStockCtrl
            })
            .when('/addBatch', {
                templateUrl: "app/stock/stock-addBatch.html",
                controller: addBatchCtrl
            })
            .when('/channelManage', {
                templateUrl: "app/channel/channel-channelManage.html",
                controller: channelManageCtrl
            })
            .when('/addChannel', {
                templateUrl: "app/channel/channel-addChannel.html",
                controller: addChannelCtrl
            })
            .when('/addChannel/:id', {
                templateUrl: "app/channel/channel-addChannel.html",
                controller: addChannelCtrl
            })
            .when('/channelDetailed', {
                templateUrl: 'app/channel/channel-channelDetailed.html',
                controller: channelDetailedCtrl
            })
            .when('/userManage', {
                templateUrl: "app/user/user-userManage.html",
                controller: userManageCtrl
            })
            .when('/addUser', {
                templateUrl: "app/user/user-addUser.html",
                controller: addUserCtrl
            })
            .when('/userDetailed', {
                templateUrl: "app/user/user-userDetailed.html",
                controller: userDetailedCtrl
            })
            .when('/userDetailed/:id', {
                templateUrl: "app/user/user-userDetailed.html",
                controller: userDetailedCtrl
            })
            .when('/userDetailed/:userId', {
                templateUrl: "app/user/user-userDetailed.html",
                controller: userDetailedCtrl
            })
            .when('/financeManage', {
                templateUrl: "app/finance/finance-financeManage.html",
                controller: financeManageCtrl
            })
            .when('/withdrawRecord', {
                templateUrl: "app/finance/finance-withdrawRecord.html",
                controller: withdrawRecordCtrl
            })
            .when('/withdrawDetailed', {
                templateUrl: "app/finance/finance-withdrawDetailed.html",
                controller: withdrawDetailedCtrl
            })
            .when('/withdrawDetailed/:orderNo', {
                templateUrl: "app/finance/finance-withdrawDetailed.html",
                controller: withdrawDetailedCtrl
            })
            //.when('/webManage',{
            //    templateUrl:"web/web-webManage.html",
            //    controller:webManageCtrl
            //})
            .when('/webBanner', {
                templateUrl: "app/web/web-webBannerImg.html",
                controller: webBannerCtrl
            })
            .when('/webClassify', {
                templateUrl: "app/web/web-webClassify.html",
                controller: webClassifyCtrl
            })
            .when('/addConfig', {
                templateUrl: "app/channel/channel-addconfig.html",
                controller: addConfigCtrl
            })
            .when('/suppGoods/:channelCode/:channelName', {
                templateUrl: "app/channel/channel-suppGoods.html",
                controller: suppGoodsCtrl
            })
            .when("/queryStock/:logId/:suppOrderNo/:goodsName", {
                templateUrl: "app/stock/stock-queryStock.html",
                controller: queryStockCtrl
            })
            .when("/have_been_sold/:logId/:suppOrderNo/:goodsName", {
                templateUrl: "app/stock/stock-queryStock.html",
                controller: queryStockCtrl
            })
            .when("/not_been_sold/:logId/:suppOrderNo/:goodsName", {
                templateUrl: "app/stock/stock-queryStock.html",
                controller: queryStockCtrl
            })
            .when("/have_been_lock/:logId/:suppOrderNo/:goodsName", {
                templateUrl: "app/stock/stock-queryStock.html",
                controller: queryStockCtrl
            })
            .when("/have_been_delete/:logId/:suppOrderNo/:goodsName", {
                templateUrl: "app/stock/stock-queryStock.html",
                controller: queryStockCtrl
            })
            .when("/recyclingConfig",{
               templateUrl : "app/stock/stock-recyclingConfig.html",
               controller  : recyclingConfigCtrl
            })
            .when("/recyclingOut",{
               templateUrl : "app/stock/stock-recyclingOut.html",
               controller  : recyclingOutCtrl
            })
            .when("/webFloor", {
                templateUrl: "app/web/web-webFloor.html",
                controller: webFloorCtrl
            })
            .when("/associatedPhone", {

                templateUrl: "app/channel/associatedPhone.html",
                controller: associatedPhoneCtrl
            })
            .when("/threeStore", {

                templateUrl: 'app/order/order-threeStore.html',
                controller: threeStoreCtrl
            })
            .when("/offlineDelivery", {
                templateUrl: 'app/offlineDelivery/offlineDelivery.html',
                controller: offlineDeliveryCtrl
            })
            .when("/comeOnCard", {

                templateUrl: 'app/order/order-comeOnCard.html',
                controller: comeOnCardCtrl
            })
            .when("/comeOnCardDetail", {

                templateUrl: 'app/order/order-comeOnCardDetail.html',
                controller: comeOnCardDetailCtrl

            })
            .when("/comeOnCardList", {

                templateUrl: "app/order/order-comeOnCardList.html",
                controller: comeOnCardCtrl
            })
            .when("/comeOnCardReported", {

                templateUrl: "app/order/order-comeOnCardReported.html",
                controller: comeOnCardReportedCtrl
            })
            .when("/comeOnCardConfig", {

                templateUrl: "app/order/order-comeOnCardConfig.html",
                controller: comeOnCardConfigCtrl
            })
            .when("/exportExcel",{

                templateUrl:'app/stock/stock-exportExcel.html',
                controller:exportExcelCtrl
            })
            .when("/recyclingQuery",{

                templateUrl:"app/stock/stock-recyclingQuery.html",
                controller:recyclingQueryCtrl
            })
            .when("/recyclingQuery/:logId/:goodsName",{

                templateUrl:"app/stock/stock-recyclingQuery.html",
                controller:recyclingQueryCtrl
            })
            .when("/recycling",{

                templateUrl: "app/stock/stock-recyclingManage.html",
                controller: recyclingCtrl
            })
            .when("/demand",{

                templateUrl: "app/demand/demandManage.html",
                controller: demandManageCtrl
            })
            .when("/comments",{

                templateUrl: "app/comments/commentsManage.html",
                controller: commentsManageCtrl
            })
            .when("/addBanner",{

                templateUrl: "app/web/addBanner.html",
                controller: addBannerManageCtrl
            })
            .when("/addBanner/:id",{

                templateUrl: "app/web/addBanner.html",
                controller: addBannerManageCtrl
            })
            .when("/plugManage",{

                templateUrl: "app/plugManage/plugManage.html",
                controller: plugManageCtrl
            })
            .when("/consultManage",{

                templateUrl: "app/consultManage/consultManage.html",
                controller: consultManageCtrl
            })
            .when("/addConsult",{

                templateUrl: "app/consultManage/addConsultManage.html",
                controller: addConsultManageCtrl
            })
            .when("/addConsult/:id",{

                templateUrl: "app/consultManage/addConsultManage.html",
                controller: addConsultManageCtrl
            })
            .otherwise({
                redirectTo: '/recycling'
            });
    }
]);
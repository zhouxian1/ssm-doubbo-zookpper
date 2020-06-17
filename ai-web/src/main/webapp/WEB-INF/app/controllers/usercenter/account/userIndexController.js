/**
 * Created by HP on 2017/9/12.
 */
define(['app'], function(app) {

    app.controller('userIndexController', userIndexController);

    userIndexController.$inject = ['$scope','$location','userIndexService','baseUrl4'];
    function userIndexController($scope,$location,userIndexService,baseUrl4) {
        $scope.userInfo={};
        $scope.userArithmeticList=[];
        $scope.userApplicationsList=[];
        $scope.userDemandList=[];
        $scope.userPluginsList=[];

        $scope.baseImgUrl=baseUrl4;
        $scope.urlType=1;
        if($location.absUrl().indexOf("http://www.")==0){//有www
            $scope.urlType=1;
        }else{
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
      var   shareComplaintDetailId=  GetRequest();
        $scope.user_id = shareComplaintDetailId.userId;


        var services = userIndexService.lists;
        //获取用户信息
        services.getUserDetail($scope.user_id).then(function (res) {
            if(res.status === 200){
                $scope.userInfo=res.data.data;
            }
        });
        //获取他发布的算法  page,per_page,user_id,urlType
        function getUserArithmeticList() {
            services.getUserArithmeticList(1,4,$scope.user_id, $scope.urlType).then(function (res) {
                if(res.status === 200){
                    $scope.userArithmeticList=res.data.data;
                }
            });
        }
        //获取他发布的应用
        function getUserApplicationsList() {
            services.getUserApplicationsList(1,4,$scope.user_id).then(function (res) {
                if(res.status === 200){
                    $scope.userApplicationsList=res.data.data.data;
                    console.log($scope.userApplicationsList);
                }
            });
        }

        //获取他发布的需求
        function getUserDemandList() {
            services.getUserDemandList(1,4,$scope.user_id).then(function (res) {
                if(res.status === 200){
                    $scope.userDemandList=res.data.data.data;
                }
            });
        }

        //获取他发布的插件
        function getUserPluginsList() {
            services.getUserPluginsList(1,4,$scope.user_id).then(function (res) {
                if(res.status === 200){
                    $scope.userPluginsList=res.data.data.data;
                }
            });
        }

        getUserArithmeticList();
        getUserApplicationsList();
        getUserDemandList();
        getUserPluginsList();
    }
});
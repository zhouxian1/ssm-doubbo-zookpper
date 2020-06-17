/**
 * Created by HP on 2017/9/8.
 */
define(['app'], function(app) {
    app.controller('algorithmManagerController', algorithmManagerController);
    algorithmManagerController.$inject = ['$scope','$location','userCenterService','$cookies','baseUrl4','baseUrl5'];
    function algorithmManagerController($scope,$location,$userCenterService,$cookies,baseUrl4,baseUrl5) {





        $scope.urlType=1;
        $scope.urlTypeShendu=2;

        if($location.absUrl().indexOf("http://www.")>-1){//有www
            $scope.urlType=1;
            $scope.urlTypeShendu=2;
            $scope.baseImgUrl=baseUrl4;
            $scope.loookTrainUrl=baseUrl5+"/models/";
        }else{
            $scope.baseImgUrl=baseUrl4.replace("www.",'');
            $scope.loookTrainUrl=baseUrl5.replace("www.",'')+"/models/";
            $scope.urlTypeShendu=4;
            $scope.urlType=3;
        }

        var services = $userCenterService.lists;
        // $scope.orderArithmeticList=[];
        // $scope.userArithmeticList=[];
        // $scope.userTrainArithmeticList=[];
        $scope.total=0;
        $scope.current = 1; //当前页 默认值为1
        $scope.pageTotal = 10;  // 每页条数 默认10条

        $scope.arithmeticList=[];
        $scope.type='1';
        $scope.user_info={};
        $scope.user={
            access_token:$cookies.get("access_token"),
            role:$cookies.get("role"),
            user_name:$cookies.get("user_name"),
            user_id:$cookies.get("user_id")
        };
        function getOrderArithmeticList () {
            if($cookies.get("user_id")){
                services.getOrderArithmeticList( $scope.current , $scope.pageTotal ,$cookies.get("user_id"),$scope.urlType).then(function (res) {
                    console.log(res);
                    if (res.status === 200) {
                        $scope.total=res.data.count;
                        $scope.arithmeticList=res.data.data;
                    }
                });
            }else{
                // alert("请登录后再试！")
                $location.path("/");
            }
        }
        function getUserArithmeticList () {
            if($cookies.get("user_id")){
                services.getUserArithmeticList(  $scope.current  , $scope.pageTotal,$cookies.get("user_id"),$scope.urlType).then(function (res) {
                    if (res.status === 200) {
                        // $scope.userArithmeticList = res.data.data;
                        $scope.user_info=res.data.user_info;
                        $scope.total=res.data.count;
                        // console.log("-----------------2---"+$scope.total);
                        $scope.arithmeticList=res.data.data;
                    }
                    // console.log( $scope.userArithmeticList);

                });
            }else{
                // alert("请登录后再试！")
                $location.path("/");
            }
        }
        checkType();
        $scope.typeClick=function (type) {
            if(type!=$scope.type){
                $scope.type=type;
                checkType();
            }
        };
        function checkType() {
            switch ($scope.type){
                case '1':
                    getOrderArithmeticList();
                    break;
                case '3':
                    getUserArithmeticList();
                    break;
                default:
                    getUserArithmeticList();
                    break;
            }
        }
        // ======== tgd添加开始 ==========
        $scope.jumpPage = function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.current = $scope.search_current;
                // console.log($scope.current);
                console.log("--------1---"+$scope.current);

                checkType();
            }
        }
        $scope.search = function(bool) {
            if (bool) {
                console.log("--------2---"+$scope.current);

                checkType();
            }
        };
        // ======== tgd添加结束 ==========
        // $scope.goTrain=function (item) {
        //     console.log(baseUrl5+"/models/"+item.dataset_id);
        //     $location.path(baseUrl5+"/models/"+item.dataset_id);
        //
        // }
        //查看训练过程

        // 个人中心-算法管理-我训练的算法-【查看训练过程】：http://192.168.4.228:50001/models/20170904-210714-bd24
        $scope.lookTrain=function (item) {
            // alert($scope.loookTrainUrl+item.dataset_id);
            // $location.path(baseUrl4+"/models/"+item.dataset_id);
            // window.location.href= $scope.loookTrainUrl+item.model_id+"?access_token="+$cookies.get("access_token")+"&user_name="+$cookies.get("user_name");
            window.open($scope.loookTrainUrl+item.model_id+"?access_token="+$cookies.get("access_token")+"&user_name="+$cookies.get("user_name"));
            // window.location.href= $scope.loookTrainUrl+item.dataset_id;
        }
    }
});

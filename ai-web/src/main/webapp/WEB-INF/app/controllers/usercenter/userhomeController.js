define(['app'], function(app) {
    app.controller('userhomeController', userhomeController);
    userhomeController.$inject = ['$scope','$location','userCenterService','$cookies','baseUrl4'];
    function userhomeController($scope,$location,$userCenterService,$cookies,baseUrl4) {

        $scope.urlType=1;
        $scope.urlTypeShendu=2;

        if($location.absUrl().indexOf("http://www.")==0){//有www
            $scope.urlType=1;
            $scope.urlTypeShendu=2;
        }else{
            $scope.urlTypeShendu=4;
            $scope.urlType=3;
        }

        var services = $userCenterService.lists;
        $scope.baseImgUrl=baseUrl4;

        $scope.user={
            access_token:$cookies.get("access_token"),
            role:$cookies.get("role"),
            user_name:$cookies.get("user_name"),
            user_id:$cookies.get("user_id")
        };
        // alert( $scope.user.user_id);

        $scope.userInfo={};
        $scope.pluginunitList={};
        $scope.applicationList={};
        $scope.demandList={};

        $scope.orderSampleList=[];
        $scope.arithmeticList=[]
        // $scope.userArithmeticList=[];
        // $scope.orderArithmeticList=[];
        $scope.order='id|desc';
        $scope.lab='0';
        // $scope.user_id=1;
        $scope.plugstate=1;
        $scope.appState=1;
        $scope.demandstate=1;
        services.getUserDetail($scope.user.user_id).then(function (res) {
            console.log( res);
            if(res.status === 200){
                $scope.userInfo=res.data.data;
            }
        });
        // return http.get('?c=user&m=user_bought_samples&page='+page+"&per_page="+per_page+"&user_id" + user_id,1);

        function getOrderSampleList () {
            if($cookies.get("user_id")){
                services.getOrderSampleList( 1 ,3,$cookies.get("user_id"),$scope.urlType).then(function (res) {
                    console.log(res);
                    if (res.status === 200) {
                        $scope.orderSampleList = res.data.data;
                    }
                });
            }else{
                // alert("请登录后再试！")
                $location.path("/");
            }
        }
        $scope.checkSample=function () {
            getOrderSampleList();
        }
        function getOrderArithmeticList () {
            if($cookies.get("user_id")){
                services.getOrderArithmeticList( 1 ,3,$cookies.get("user_id"),$scope.urlType).then(function (res) {
                    console.log(res);
                    if (res.status === 200) {
                        $scope.arithmeticList = res.data.data;
                    }
                });
            }else{
                // alert("请登录后再试！")
                $location.path("/");
            }
        }
        function getUserArithmeticList () {
            if($cookies.get("user_id")){
                services.getUserArithmeticList( 1 ,3,$cookies.get("user_id"),$scope.urlType).then(function (res) {
                    console.log(res);
                    if (res.status === 200) {
                        $scope.arithmeticList = res.data.data;
                    }
                });
            }else{
                $location.path("/");
            }
        }
        $scope.ArithmeticType=1;
        function getArithmetic() {
            switch ( $scope.ArithmeticType){
                case 1:
                    getOrderArithmeticList();
                    break;
                case 3:
                    getUserArithmeticList();
                    break;
                default:
                    getOrderArithmeticList();
                break;
            }

        }
        getOrderSampleList();
        getOrderArithmeticList();
        $scope.checkArithmetic=function (type) {
            if(type!=$scope.ArithmeticType){
                $scope.ArithmeticType=type;
                getArithmetic();
            }
        }
        // 请求参数详情
        // 参数名	说明	必填	类型
        // order	排序（最新发布 ： id|desc 最多购买：buy_count|desc 评论最多 ： comment_count|desc ）	是	[string]
        // getPlugins(1,3,  $scope.order,$scope.lab,$scope.user_id);

        function getPlugins () {
            if($cookies.get("user_id")){
                services.getPlugins(1,3,$scope.order,$cookies.get("user_id")).then(function (res) {
                    if(res.status===200){
                        $scope.pluginunitList = res.data.data.data;
                        console.log(res);
                    }
                });
            }else{
                // alert("请登录后再试！");
                $location.path("/");

            }

        }
        function getOrderedPlugins () {
            if($cookies.get("user_id")){
                services.getOrderedPlugins( 1 ,3,$cookies.get("user_id")).then(function (res) {
                    if (res.status === 200) {
                        if(res.status===200){
                            $scope.pluginunitList = res.data.data.data;
                            console.log(res);
                        }
                    }
                });
            }else{
                // alert("请登录后再试！")
                $location.path("/");

            }
        }
        // 排序（最新发布 ： id|desc 最多购买：buy_count|desc 评论最多 ： comment_count|desc ）
        function getApplications(page, per_page, order) {
            if($cookies.get("user_id")){
                services.getApplications(page, per_page, order,$cookies.get("user_id")).then(function(res) {
                    if (res.status === 200) {
                        $scope.applicationList = res.data.data.data;
                        console.log(res.data.data.data)
                    }
                });
            }else{
                // alert("请登录后再试！")
                $location.path("/");

            }

        }
        // function getDemandList(page,per_page,classification_id,order,user_id) {
        //     services.getDemandList(page,per_page,classification_id,order,user_id).then(function (res) {
        //         if(res.status===200){
        //             $scope.demandList = res.data.data.data;
        //             console.log(res)
        //         }
        //     }) ;
        // }
        function getOrderedApplication() {

            if($cookies.get("user_id")){
                services.getOrderedApplications(1 ,3,$scope.user.user_id).then(function(res){
                    if (res.status === 200) {
                        $scope.applicationList = res.data.data.data;
                        console.log(res);
                    };
                });
            }else{
                // alert("请登录后再试！")
                $location.path("/");

            }



        }
        function getFabuList() {


            if($cookies.get("user_id")){
                services.getFabuList( 1,3,$scope.user.user_id).then(function (res) {
                    if(res.status===200){
                        $scope.total = res.data.data.total; // tgd添加

                        $scope.demandList = res.data.data.data;
                        console.log(res)
                    }
                }) ;
            }else{
                // alert("请登录后再试！");
                $location.path("/");
            }
        }
        //中标的
        function getZhongbiaoList( ) {
            if($cookies.get("user_id")){
                services.getZhongbiaoList( 1,3,$scope.user.user_id).then(function (res) {
                    if(res.status===200){
                        $scope.total = res.data.data.total; // tgd添加

                        $scope.demandList = res.data.data.data;
                        console.log(res)
                    }
                }) ;
            }else{
                // alert("请登录后再试！")
                $location.path("/");

            }

        }
        //投标的
        function getToubiaoList() {
            if($cookies.get("user_id")){
                services.getToubiaoList(1,3,$scope.user.user_id).then(function (res) {
                    if(res.status===200){
                        $scope.total = res.data.data.total; // tgd添加

                        $scope.demandList = res.data.data.data;
                        console.log(res)
                    }
                }) ;
            }else{
                // alert("请登录后再试！")
                $location.path("/");

            }
        }
        getOrderedApplication();
        getOrderedPlugins();
        // getApplications(1,3,  $scope.order,$scope.lab,$scope.user_id);
        // getDemandList(1,3, 0, $scope.order,$scope.lab,$scope.user_id);
        getFabuList();
        $scope.clickPlug=function (state) {
            $scope.plugstate=state;
            if( $scope.plugstate==1){
                getOrderedPlugins();
            }else{
                getPlugins();
            }
        }
        $scope.clickapp=function (state) {
            console.log(state);
            if($scope.appState!=state){
                $scope.appState=state;
                if( $scope.appState==1){
                    getOrderedApplication();
                }else{
                    getApplications(1,3,  $scope.order,$scope.lab,$scope.user_id);
                }
            }

        };
        $scope.clickdemand=function (state) {
            if($scope.demandstate!=state){
                $scope.demandstate=state;
                if($scope.demandstate==1){
                    getFabuList();
                }else if($scope.demandstate==2){
                    getToubiaoList();
                }else{
                    getZhongbiaoList();
                }
            }

        }
    }
})

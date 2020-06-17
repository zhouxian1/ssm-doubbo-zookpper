//声明路由模块powerDetailed
angular.module('powerDetailed',[])
    .component('powerDetailed',{
        templateUrl:'app/power/power-powerDetailed.html',
        controller:powerDetailedCtrl
    });

//powerDetailedCtrl的操作
function powerDetailedCtrl($scope,$http,$routeParams,$cookies,$timeout){

    $scope.isLogined=$cookies.get('loginStatus');
    $scope.loginUserId=$cookies.get('loginUserId');
    /********* controller **********/
    $scope.apiUrl_Udetail = "/u/detail" ; //用户详情
    $scope.apiUrl_Uupdate = "/u/update_roles";//更新用户
    $scope.updata_arr = []; //空数组装压入的数组
    $scope.update_str = "";

    //通过$routeParams得到userId值,这里最开始需要获得用户自己登录时的Id
    $scope.userId=$routeParams.userId;
    $scope.paramUpdate = {}; //更新用户的参数

    if($scope.userId==null){
        $scope.userId=1;
    }
    $scope.param_Udetail = {userId:$scope.userId}; //用户详情参数
    $scope.param_Uupdate = {};
    $scope.param_Uupdate.uerId = $scope.userId;

    $scope.mod_Uupdat= {}; //model

    /********* end controller **********/
    //请求接口(地址+名称)

    //请求参数
    //开始http请求
    $http({
        //请求地址
        url:$scope.apiUrl_Udetail,
        //请求方法
        method:"POST",
        //请求头
        headers:{
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: $.param($scope.param_Udetail)
    }).success(
        function(response){

            if(200 == response.status){
                console.log(response);
                $scope.mod_Uupdate=response.data;
                console.log($scope.mod_Uupdate);

                //权限
                $scope.responseDataRoles=response.data.roles;
                console.log($scope.responseDataRoles);
                angular.forEach($scope.responseDataRoles,function(data,index,array){
                    if(data=="u"){
                        $scope.uPower=true;
                    }else if(data=="company"){
                        $scope.company=true;
                    }else if(data=="order"){
                        $scope.order=true;
                    }else if(data=="finance"){
                        $scope.finance=true;
                    }else if(data=="card"){
                        $scope.card=true;
                    }else if(data=="website"){
                        $scope.website=true;
                    }else if(data=="goods"){
                        $scope.goods=true;
                    }else if(data=="user"){
                        $scope.user=true;
                    }else if(data=="sms"){
                        $scope.sms=true;
                    }
                })
            }else if(401 == response.status){
                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
            }
        }
    ).error(
        function(){
            console.log("请求失败");
        }
    );


    $scope.addEdit = function(){
        $(".edit").css("display","block");
        $(".ok").css("display","none");
    };

    $scope.param_Udetail={
        roles:[]
    };//权限是一个数组
    //设置监听函数来监听View上数据的变化
    $scope.$watch('power',function(){
        console.log($scope.power);
    },true);

    //保存修改后的管理员信息
    $scope.saveEdit = function() {



        console.log("点击保存修改管理员!");

        angular.forEach($scope.power,function(data,index,array){

            if(data == true){

                $scope.updata_arr.push(index);

            }

        });
        $scope.update_str = $scope.updata_arr.join(",");
        //console.log($scope.update_str);
        console.log($scope.update_str);
        $scope.paramUpdate = {

            userId : $scope.userId,
            headUrl : $scope.mod_Uupdate.headUrl,
            name : $scope.mod_Uupdate.name,
            mobile: $scope.mod_Uupdate.mobile,
            email : $scope.mod_Uupdate.email,
            roles : $scope.update_str
        };

        //开始http请求
        $http({
            //请求地址
            url:$scope.apiUrl_Uupdate,
            //请求方法
            method:"POST",
            //请求头
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.paramUpdate)
        }).success(
            function(response){

                console.log("进入http请求");

                if(200 == response.status){
                    console.log(response);
                    $("#delete_or_not_box").css("display","block");
                    $timeout(function(){

                        $("#delete_or_not_box").css("display","none");

                    })


                }else if(401 == response.status){
                    $cookies.remove('loginStatus');
                    $cookies.remove('loginUserId');
                    window.location.href="/app/index.html#/";
                    window.location.reload();
                }
            }
        ).error(
            function(){
                console.log("请求失败");
            }
        );
    };

    //添加手机号成功后消失
    $scope.sure_delete_or_not = function(){

        $("#delete_or_not_box").css("display","none");
    };
    $scope.pageAdjust();


}


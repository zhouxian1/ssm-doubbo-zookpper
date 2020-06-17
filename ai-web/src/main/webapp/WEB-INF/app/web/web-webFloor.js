/**
 * Created by shane on 2016/12/21.
 */
angular.module("webFloor",[])
    .component("webFloor",{
        templateUrl : "app/web/web-webFloor.html",
        controller  : webFloorCtrl
    })
    .directive('customOnChange',function(){
        return{
            restrict:"A",
            link:function(scope,element,attrs){
                var onChangeHandler=scope.$eval(attrs.customOnChange);
                element.bind('change',onChangeHandler);
            }
        }
    });

function webFloorCtrl($scope, $http, $cookies, $timeout){
    //$scope.isLogined=$cookies.get('loginStatus');
    //$scope.loginUserId=$cookies.get('loginUserId');
    //
    //// 1、初始化请求地址
    //$scope.initQueryUrl = function(){
    //    $scope.apiUrl_website_goods_list         = "/website/website_goods_list";   //72 : 查询楼层商品
    //    $scope.apiUrl_website_add_play_img       = "/website/add_play_img";         //51 : 添加、修改轮播图或者楼层
    //    $scope.apiUrl_website_delete_play_img    = "/website/delete_play_img";      //53 : 删除轮播图或者楼层
    //    $scope.apiUrl_website_add_floor_goods    = "/website/add_floor_goods";      //52 : 添加楼层商品
    //    $scope.apiUrl_website_delete_floor_goods = "/website/delete_floor_goods";   //71 : 删除楼层商品
    //};
    //$scope.initQueryUrl();
    //
    //
    //// 2、初始化请求参数
    //$scope.initQueryParam = function(){
    //    $scope.param_website_goods_list         = { };      //72
    //    $scope.param_website_add_play_img       = { };      //51
    //    $scope.param_website_delete_play_img    = { };      //53
    //    $scope.param_website_add_floor_goods    = { };      //52
    //    $scope.param_website_delete_floor_goods = { };      //71
    //};
    //$scope.initQueryParam();
    //
    //
    //// 3、初始化绑定数据
    //$scope.initQueryMod = function(){
    //    $scope.mod_upGroundList   = [];     // 上架楼层数组
    //    $scope.mod_downGroundList = [];     // 下架楼层数据
    //    $scope.mod_goodsId        = '';     // 添加商品ID
    //};
    //$scope.initQueryMod();
    //
    //
    //// 4、查询所有楼层列表
    //$scope.query_website_play_list = function(){
    //    $http({
    //        url      : $scope.apiUrl_website_goods_list,
    //        method   : "POST",
    //        headers  : {
    //            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"// form形式提交
    //        },
    //        data     : $.param($scope.param_website_goods_list)
    //    }).success(function(response){
    //        console.log("查询楼层成功");
    //        console.log(response);
    //        $scope.floorPlayList=response.data;
    //        //console.log($scope.floorPlayList);
    //        $scope.mod_upGroundList   = [];
    //        $scope.mod_downGroundList = [];
    //        angular.forEach($scope.floorPlayList,function(data){
    //            if(data.isGrounding==1){
    //                $scope.mod_upGroundList.push(data);
    //            }else{
    //                $scope.mod_downGroundList.push(data);
    //            }
    //        });
    //        //var compare=function(obj1,obj2){
    //        //    var val1=obj1.time;
    //        //    var val2=obj2.time;
    //        //    if(val1>val2){
    //        //        return 1;
    //        //    }else if(val1<val2){
    //        //        return -1;
    //        //    }else{
    //        //        return 0;
    //        //    }
    //        //};
    //        //$scope.mod_upGroundList.sort(compare);//用sort方法进行排序
    //        //$scope.mod_downGroundList.sort(compare);
    //        angular.forEach($scope.mod_upGroundList,function(data,index){//遍历整个上架楼层
    //            data.showFloorId  = index + 1;
    //        });
    //        angular.forEach($scope.mod_downGroundList,function(data,index){
    //            data.showFloorId  = index + 1;
    //        });
    //        console.log($scope.mod_upGroundList);//上架楼层的数组
    //        console.log($scope.mod_downGroundList);//下架楼层的数组
    //    }).error(function(response){
    //        console.log("查询楼层失败");
    //        console.log(response);
    //    })
    //};
    //$scope.query_website_play_list();
    //
    //
    //// 5、下架楼层方法
    //$scope.down_this_ground = function(websiteId){
    //    //console.log(websiteId);
    //    $scope.param_website_add_play_img = {
    //        websiteId   : websiteId,
    //        isGrounding : 0
    //    };
    //    //console.log($scope.param_website_add_play_img);
    //    $scope.change_ground_http();
    //};
    //
    //
    //// 6、上架楼层方法
    //$scope.up_this_ground = function(websiteId){
    //    //console.log(websiteId);
    //    $scope.param_website_add_play_img = {
    //        websiteId   : websiteId,
    //        isGrounding : 1
    //    };
    //    //console.log($scope.param_website_add_play_img);
    //    $scope.change_ground_http();
    //};
    //
    //
    //// 7、上架、下架发送http请求
    //$scope.change_ground_http = function(){
    //    $http({
    //        url     : $scope.apiUrl_website_add_play_img,
    //        method  : "POST",
    //        headers : {
    //            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    //        },
    //        data    : $.param($scope.param_website_add_play_img)
    //    }).success(
    //        function(response){
    //            console.log(response);
    //            $scope.query_website_play_list();
    //        }
    //    ).error(
    //        function(response){
    //            console.log(response);
    //        }
    //    );
    //};
    //
    //
    //// 8.1、添加楼层弹出模态框
    //$scope.add_classify = function(){
    //    $("#add_classify").css("display","block");
    //};
    //// 8.2、取消添加楼层
    //$scope.cancel_add_classify = function(){
    //    $("#add_classify").css("display","none");
    //    $scope.clear_add_input();
    //};
    //// 8.3、确定添加新楼层
    //$scope.sure_add_new_floor = function(){
    //    //console.log($scope.mod_classifi);
    //    //console.log($scope.mod_floorId);
    //    //console.log($scope.mod_isGrounding);
    //    $scope.param_website_add_play_img = {
    //        classifi    : $scope.mod_classifi,
    //        isFloor     : 1
    //        //floorId     : $scope.mod_floorId,
    //        //isGrounding : $scope.mod_isGrounding
    //    };
    //    //console.log($scope.param_website_add_play_img);
    //    $scope.change_ground_http();
    //    $scope.cancel_add_classify();
    //};
    //// 8.4、清空添加楼层的数据
    //$scope.clear_add_input = function(){
    //    $scope.mod_classifi    = '';
    //    $scope.mod_floorId     = '';
    //    $scope.mod_isGrounding = '';
    //};
    //
    //
    //// 9.1、删除楼层弹出模态框
    //$scope.delete_this_ground = function(websiteId, floorName){
    //    $scope.mod_websiteId = websiteId;
    //    $scope.mod_floorName = floorName;
    //    $("#delete_floor").css("display","block");
    //};
    //// 9.2、取消删除楼层隐藏模态框
    //$scope.cancel_delete_this_ground = function(){
    //    $("#delete_floor").css("display","none");
    //};
    //// 9.3、确定删除楼层
    //$scope.sure_delete_this_ground = function(){
    //    $scope.param_website_delete_play_img = {
    //        websiteId : $scope.mod_websiteId
    //    };
    //    console.log($scope.param_website_delete_play_img);
    //    $http({
    //        url:$scope.apiUrl_website_delete_play_img,
    //        method:"POST",
    //        headers:{
    //            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    //        },
    //        data: $.param($scope.param_website_delete_play_img)
    //    }).success(function(response){
    //        console.log(response);
    //        $scope.query_website_play_list();
    //        $scope.cancel_delete_this_ground();
    //    }).error(function(response){
    //        console.log(response);
    //    })
    //};
    //
    //
    //// 10.1、添加商品弹出模态框
    //$scope.add_new_goods = function(websiteId){
    //    //console.log(floorId);
    //    $scope.mod_websiteId = websiteId;
    //    $("#add_floor_goods").css("display","block");
    //};
    //// 10.2、取消添加商品
    //$scope.cancel_add_new_goods = function(){
    //    $("#add_floor_goods").css("display","none");
    //    $scope.clear_add_goods_input();
    //};
    //// 10.3、确定添加商品
    //$scope.sure_add_new_goods = function(){
    //    $scope.param_website_add_floor_goods = {
    //        websiteId : $scope.mod_websiteId,
    //        goodsId : $scope.mod_goodsId
    //    };
    //    //console.log($scope.param_website_add_floor_goods);
    //    $scope.add_new_goods_http();
    //};
    //// 10.4、确定添加商品发送http请求
    //$scope.add_new_goods_http = function(){
    //    $http({
    //        url:$scope.apiUrl_website_add_floor_goods,
    //        method:"POST",
    //        headers:{
    //            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    //        },
    //        data: $.param($scope.param_website_add_floor_goods)
    //    }).success(function(response){
    //        console.log("添加商品成功!");
    //        console.log(response);
    //        $scope.query_website_play_list();
    //        $scope.cancel_add_new_goods();
    //        //$scope.clear_add_goods_input();
    //        if(200 == response.status){
    //            //alert("添加商品成功!");
    //            $("#delete_or_not_box").css("display","block");
    //            $timeout(function(){
    //                $("#delete_or_not_box").css("display","none");
    //
    //            },2000)
    //
    //        }else  if(401 == response.status){
    //
    //            $cookies.remove('loginStatus');
    //            $cookies.remove('loginUserId');
    //            window.location.href="/app/index.html#/";
    //            window.location.reload();
    //        }
    //        else{
    //            $scope.text = response.statusText;
    //            $("#delete_or_not_box_add").css("display","block");
    //            $timeout(function(){
    //                $("#delete_or_not_box_add").css("display","none");
    //
    //            },2000)
    //        }
    //    }).error(function(response){
    //        console.log("添加商品失败!");
    //        console.log(response);
    //    })
    //};
    //
    //$scope.sure_delete_or_add = function(){
    //
    //    $("#delete_or_not_box_add").css("display","none");
    //};
    ////添加手机号成功后消失
    //$scope.sure_delete_or_not = function(){
    //
    //    $("#delete_or_not_box").css("display","none");
    //};
    //// 10.5、清空添加商品的ID信息
    //$scope.clear_add_goods_input = function(){
    //    $scope.mod_goodsId = '';
    //};
    //
    //
    //// 11.1、删除商品出现红X
    //$scope.delete_these_goods = function(showFloorId){
    //    $(".delete_x"+showFloorId).css("display","block");
    //    $(".delete_these"+showFloorId).css("display","none");
    //    $(".cancel_delete_these"+showFloorId).css("display","block");
    //};
    //// 11.2、取消删除商品
    //$scope.cancel_delete_these_goods = function(showFloorId){
    //    $(".delete_x"+showFloorId).css("display","none");
    //    $(".delete_these"+showFloorId).css("display","block");
    //    $(".cancel_delete_these"+showFloorId).css("display","none");
    //};
    //// 11.3、删除某个商品出现弹框
    //$scope.delete_this_good = function(id, goodsName){
    //    $scope.mod_goodsName = goodsName;
    //    $scope.mod_id = id;
    //    $("#delete_good").css("display","block");
    //};
    //// 11.4、取消删除某个商品隐藏弹框
    //$scope.cancel_delete_this_good = function(){
    //    $("#delete_good").css("display","none");
    //};
    //// 11.5、确定删除某个商品
    //$scope.sure_delete_this_good = function(){
    //    $scope.param_website_delete_floor_goods = {
    //        id : $scope.mod_id
    //    };
    //    console.log($scope.param_website_delete_floor_goods);
    //    $http({
    //        url:$scope.apiUrl_website_delete_floor_goods,
    //        method:"POST",
    //        headers:{
    //            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    //        },
    //        data: $.param($scope.param_website_delete_floor_goods)
    //    }).success(function(response){
    //        console.log(response);
    //        $scope.query_website_play_list();
    //        $scope.cancel_delete_this_good();
    //    }).error(function(response){
    //        console.log(response);
    //    })
    //};
    //
    //
    //// 12.1、改变楼层名称弹框
    //$scope.change_floorName = function(websiteId, floorName){
    //    $("#change_floorName").css("display","block");
    //    $scope.mod_changeName_websiteId = websiteId;
    //    $scope.mod_changeName_oldName = floorName;
    //};
    //// 12.2、取消改变楼层名称
    //$scope.cancel_change_floorName = function(){
    //    $("#change_floorName").css("display","none");
    //    $scope.mod_changeName_newName = '';
    //};
    //// 12.3、确定改变楼层名称
    //$scope.sure_change_floorName = function(){
    //    $scope.param_website_add_play_img = {
    //        websiteId : $scope.mod_changeName_websiteId,
    //        classifi  : $scope.mod_changeName_newName
    //    };
    //    console.log($scope.param_website_add_play_img);
    //    $scope.change_ground_http();
    //    $scope.cancel_change_floorName();
    //};


    //1、初始化请求地址
    $scope.initQueryUrl = function(){
        $scope.apiUrl_website_webFloorList = '/website/webFloorList';   //103--楼层列表
        $scope.apiUrl_website_addFloor = '/website/addFloor';           //105--添加楼层
        $scope.apiUrl_website_updateWebfloorsStatus = '/website/updataWebfloorStatus';  //108--修改楼层状态/删除/上架/下架
        $scope.apiUrl_website_updateFloor = '/website/updateFloor';     //106--修改楼层名称
        $scope.apiUrl_website_addFloorGoods = '/website/addFloorGoods'; //107--添加楼层商品
        $scope.apiUrl_website_moveFloor = '/website/moveFloor';         //109--移动楼层
    };
    $scope.initQueryUrl();

    //2、初始化请求参数
    $scope.initQueryParam = function(){
        $scope.param_website_webFloorList = { };            //103--楼层列表
        $scope.param_website_addFloor = { };                //105--添加楼层
        $scope.param_website_updateWebfloorsStatus = { };   //108--修改楼层状态
        $scope.param_website_updateFloor = { };            //106--修改楼层名称
        $scope.param_website_addFloorGoods = { };          //107--添加楼层商品
        $scope.param_website_moveFloor = { };              //109--移动楼层
    };
    $scope.initQueryParam();

    //3、初始化绑定数据
    $scope.initQueryMod = function(){
        $scope.mod_upGroundList   = [];     // 上架楼层数组
        $scope.mod_downGroundList = [];     // 下架楼层数据
    };
    $scope.initQueryMod();

    //4、请求楼层列表
    $scope.query_website_webFloorList_http = function(param,upOrDown){
        $http({
            url : $scope.apiUrl_website_webFloorList,
            method : 'POST',
            headers : {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data : $.param(param)
        }).success(function(response){
            console.log(response);
            console.log(upOrDown);
            if(200 == response.status){
                if(1 == upOrDown){
                    $scope.mod_upGroundList = response.data;
                }else if(0 == upOrDown){
                    $scope.mod_downGroundList = response.data;
                }
            }
        }).error(function(response){
            console.log(response);
        })
    };
    $scope.query_upGround_website_webFloorList = function(){        //上架楼层列表
        $scope.param_website_webFloorList = {
            status : 1
        };
        $scope.query_website_webFloorList_http($scope.param_website_webFloorList,1);
    };
    $scope.query_upGround_website_webFloorList();
    $scope.query_dowmGround_website_webFloorList = function(){      //下架楼层列表
        $scope.param_website_webFloorList = {
            status : 0
        };
        $scope.query_website_webFloorList_http($scope.param_website_webFloorList,0);
    };
    $scope.query_dowmGround_website_webFloorList();

    //5、添加楼层
    $scope.add_classify = function(){               //显示弹框
        $("#add_classify").css("display","block");
    };
    $scope.cancel_add_classify = function(){        //隐藏弹框
        $("#add_classify").css("display","none");
        $scope.clear_add_input();
    };
    $scope.clear_add_input = function(){            //清除弹框中已填写数据
        $scope.mod_classifi = undefined;
    };
    $scope.sure_add_new_floor = function(){         //确定添加新楼层
        $scope.param_website_addFloor = {
            name : $scope.mod_classifi,
            imgUrl : $scope.param_imgUrl
        };
        console.log($scope.param_website_addFloor);
        $scope.query_website_addFloor();
    };
    $scope.query_website_addFloor = function(){     //添加新楼层的http请求
        $http({
            url : $scope.apiUrl_website_addFloor,
            method : 'POST',
            headers : {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data : $.param($scope.param_website_addFloor)
        }).success(function(response){
            console.log(response);
            if(200 == response.status){
                $scope.cancel_add_classify();
                $scope.query_dowmGround_website_webFloorList();
                $scope.alert_warning_box("添加楼层成功!");
            }else{
                $scope.cancel_add_classify();
                $scope.alert_warning_box(response.statusText);
            }
        }).error(function(response){
            console.log(response);
            $scope.cancel_add_classify();
            $scope.alert_warning_box("添加楼层失败!");
        })
    };

    //6、删除楼层
    $scope.delete_this_ground = function(id, name){     //显示弹框
        $scope.mod_websiteId = id;
        $scope.mod_floorName = name;
        $("#delete_floor").css("display","block");
    };
    $scope.cancel_delete_this_ground = function(){      //隐藏弹框
        $("#delete_floor").css("display","none");
    };
    $scope.sure_delete_this_ground = function(){        //确定删除楼层
        $scope.param_website_updateWebfloorsStatus = {
            webFloorId : $scope.mod_websiteId,
            status     : -1
        };
        console.log($scope.param_website_updateWebfloorsStatus);
        $scope.updataWebfloorStatus_http($scope.param_website_updateWebfloorsStatus);
    };
    $scope.updataWebfloorStatus_http = function(param){   //确定删除楼层的http请求
        var textSuccess,textError;
        switch (param.status) {
            case -1 :
                textSuccess = "删除楼层成功!";
                textError   = "删除楼层失败!";
                break;
            case 0  :
                textSuccess = "下架楼层成功!";
                textError   = "下架楼层失败!";
                break;
            case 1  :
                textSuccess = "上架楼层成功!";
                textError   = "上架楼层失败!";
                break;
        }

        $http({
            url : $scope.apiUrl_website_updateWebfloorsStatus,
            method : 'POST',
            headers : {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data : $.param(param)
        }).success(function(response){
            console.log(param);
            console.log(response);
            if(200 == response.status){
                $scope.cancel_delete_this_ground();
                $scope.query_dowmGround_website_webFloorList();
                $scope.query_upGround_website_webFloorList();
                $scope.alert_warning_box(textSuccess);
            }else{
                $scope.cancel_delete_this_ground();
                $scope.alert_warning_box(response.statusText);
            }
        }).error(function(response){
            console.log(response);
            $scope.cancel_delete_this_ground();
            $scope.alert_warning_box(textError);
        })
    };

    //7、修改楼层名称
    $scope.change_floorName = function(id, name){       //显示弹框
        $("#change_floorName").css("display","block");
        $scope.mod_changeName_websiteId = id;
        $scope.mod_changeName_oldName = name;
    };
    $scope.cancel_change_floorName = function(){        //取消弹框
        $("#change_floorName").css("display","none");
        $scope.mod_changeName_newName = undefined;
    };
    $scope.sure_change_floorName = function(){          //确定修改楼层名称
        $scope.param_website_updateFloor = {
            id : $scope.mod_changeName_websiteId,
            name  : $scope.mod_changeName_newName,
            imgUrl : $scope.param_imgUrl
        };
        $scope.change_ground_http();
    };
    $scope.change_ground_http = function(){             //确定修改楼层名称http请求
        $http({
            url : $scope.apiUrl_website_updateFloor,
            method : 'POST',
            headers : {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data : $.param($scope.param_website_updateFloor)
        }).success(function(response){
            console.log(response);
            if(200 == response.status){
                $scope.cancel_change_floorName();
                $scope.query_dowmGround_website_webFloorList();
                $scope.alert_warning_box("修改楼层成功!");
            }else{
                $scope.cancel_change_floorName();
                $scope.alert_warning_box(response.statusText);
            }
        }).error(function(response){
            console.log(response);
            $scope.cancel_change_floorName();
            $scope.alert_warning_box("修改楼层失败!");
        })
    };

    //8、上架楼层
    $scope.up_this_ground = function(id){
        $scope.param_website_updateWebfloorsStatus = {
            webFloorId : id,
            status     : 1
        };
        $scope.updataWebfloorStatus_http($scope.param_website_updateWebfloorsStatus);
    };

    //9、下架楼层
    $scope.down_this_ground = function(id){
        $scope.param_website_updateWebfloorsStatus = {
            webFloorId : id,
            status     : 0
        };
        $scope.updataWebfloorStatus_http($scope.param_website_updateWebfloorsStatus);
    };

    //10、添加商品
    $scope.add_new_goods = function(id){        //显示弹框
        $scope.mod_websiteId = id;
        $("#add_floor_goods").css("display","block");
    };
    $scope.cancel_add_new_goods = function(){   //隐藏弹框
        $("#add_floor_goods").css("display","none");
        $scope.clear_add_goods_input();
    };
    $scope.clear_add_goods_input = function(){  //清除输入框内容
        $scope.mod_goodsId = undefined;
    };
    $scope.sure_add_new_goods = function(){
        $scope.param_website_addFloorGoods = {
            webFloorId : $scope.mod_websiteId,
            goodsId : $scope.mod_goodsId,
            status : 1
        };
        console.log($scope.param_website_addFloorGoods);
        $scope.handle_goods_http($scope.param_website_addFloorGoods);
    };
    $scope.handle_goods_http = function(param){

        var textSuccess,textError;
        switch (param.status) {
            case 1 :
                textSuccess = "添加商品成功!";
                textError   = "添加商品失败!";
                break;
            case -1 :
                textSuccess = "删除商品成功!";
                textError   = "删除商品失败!";
                break;
        }

        $http({
            url : $scope.apiUrl_website_addFloorGoods,
            method : 'POST',
            headers : {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data : $.param(param)
        }).success(function(response){
            console.log(response);
            if(200 == response.status){
                $scope.cancel_add_new_goods();
                $scope.cancel_delete_this_good();
                $scope.query_dowmGround_website_webFloorList();
                $scope.alert_warning_box(textSuccess);
            }else{
                $scope.cancel_add_new_goods();
                $scope.alert_warning_box(response.statusText);
            }
        }).error(function(response){
            console.log(response);
            $scope.cancel_add_new_goods();
            $scope.alert_warning_box(textError);
        })
    };

    //11、删除商品
    //11.1、删除商品出现红X
    $scope.delete_these_goods = function(showFloorId){
        $(".delete_x"+showFloorId).css("display","block");
        $(".delete_these"+showFloorId).css("display","none");
        $(".cancel_delete_these"+showFloorId).css("display","block");
    };
    // 11.2、取消删除商品
    $scope.cancel_delete_these_goods = function(showFloorId){
        $(".delete_x"+showFloorId).css("display","none");
        $(".delete_these"+showFloorId).css("display","block");
        $(".cancel_delete_these"+showFloorId).css("display","none");
    };
    // 11.3、删除某个商品出现弹框
    $scope.delete_this_good = function(goodsId, goodsName, floorId){
        $scope.mod_goodsName = goodsName;
        $scope.mod_goodsId = goodsId;
        $scope.mod_floorId = floorId;
        $("#delete_good").css("display","block");
    };
    // 11.4、取消删除某个商品隐藏弹框
    $scope.cancel_delete_this_good = function(){
        $("#delete_good").css("display","none");
    };
    // 11.5、确定删除某个商品
    $scope.sure_delete_this_good = function(){
        $scope.param_website_addFloorGoods = {
            goodsId : $scope.mod_goodsId,
            webFloorId : $scope.mod_floorId,
            status : -1
        };
        console.log($scope.param_website_addFloorGoods);
        $scope.handle_goods_http($scope.param_website_addFloorGoods);
    };


    //12、楼层排序
    $scope.moveUp_this_floor = function(id){
        $scope.param_website_moveFloor = {
            webFloorId : id,
            val : -1
        };
        console.log($scope.param_website_moveFloor);
        $scope.moveFloor_http($scope.param_website_moveFloor);
    };

    $scope.moveDown_this_floor = function(id){
        $scope.param_website_moveFloor = {
            webFloorId : id,
            val : 1
        };
        console.log($scope.param_website_moveFloor);
        $scope.moveFloor_http($scope.param_website_moveFloor);
    };

    $scope.moveFloor_http = function(param){

        var textSuccess,textError;
        switch (param.val) {
            case -1 :
                textSuccess = "上移该楼层成功!";
                textError   = "上移该楼层失败!";
                break;
            case 1 :
                textSuccess = "下移该楼层成功!";
                textError   = "下移该楼层失败!";
                break;
        }

        $http({
            url : $scope.apiUrl_website_moveFloor,
            method : 'POST',
            headers : {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data : $.param(param)
        }).success(function(response){
            console.log(response);
            if(200 == response.status){
                $scope.query_dowmGround_website_webFloorList();
                $scope.query_upGround_website_webFloorList();
                $scope.alert_warning_box(textSuccess);
            }else{
                $scope.alert_warning_box(textError);
            }
        }).error(function(response){
            console.log(response);
            $scope.alert_warning_box(textError);
        })
    };

    //13、上传楼层icon
    $scope.uploadImg=function(event){
        event.stopImmediatePropagation();//阻止事件冒泡
        console.log(event);
        $scope.file = event.target.files;
        console.log($scope.file);

        //图片的宽度和高度
        var isAllow = false;
        var fileData = $scope.file[0];
        var reader = new FileReader();
        reader.onload = function(e){
            var data = e.target.result;
            var image = new Image();
            image.onload = function(){
                var width = image.width;
                var height = image.height;
                console.log(width);
                console.log(height);
                isAllow = width<=35 && height<=35;
                console.log(isAllow);
                if(isAllow){
                    console.log("开始上传图片http请求");
                    $scope.uploadImg_http();
                }else {
                    text = width + "x" + height + "图片不符合要求!";
                    $scope.cancel_add_classify();
                    //$scope.text = textError;
                    //$scope.isWarnBoxShow = true;
                    $scope.alert_warning_box(text);
                }
                //console.log($scope.text);
            };
            image.src = data;
        };
        reader.readAsDataURL(fileData);

    };

    //14、上传图片的http请求
    $scope.uploadImg_http = function(){
        $http({
            url:"/cmsComm/fileUpload",
            method:"POST",
            headers:{
                "Content-Type":undefined
            },
            data:{
                "file":$scope.file
            },
            transformRequest:function(data){
                var formData=new FormData();
                angular.forEach(data,function(value,key){
                    angular.forEach(value,function(val){
                        formData.append(key,val);
                    })
                });
                return formData;
            }
        }).success(function(response){
            console.log(response);
            if(200 == response.status){
                $scope.param_imgUrl = response.data[0];
                console.log($scope.param_imgUrl);
                //var img = new Image();
                //img.src="http://img.gxcards.com/"+$scope.param_imgUrl;
                //var width = img.width;
                //var height = img.height;
                //console.log(img);
                //console.log(width);
                //console.log(height);
            }
        }).error(function(response){
            console.log(response);
        });
    };

    //$scope.isWarnBoxShow = false;
    $scope.text = "图片不符合要求!";
    var text = "图片不符合要求!";
    //15、警告框
    $scope.alert_warning_box = function(text){
        this.text = text;
        console.log(this.text);
        $scope.text = this.text;
        console.log($scope.text);
        $("#warn_text_box").css('display','block');
        $scope.$watch('text', function(newValue, oldValue, scope){
            console.log(newValue);
            console.log(oldValue);
            $scope.text = newValue;
            this.text = newValue;

        });
        $timeout(function(){
            $("#warn_text_box").css("display","none");
        },5000)

    }
    $scope.pageAdjust();



}
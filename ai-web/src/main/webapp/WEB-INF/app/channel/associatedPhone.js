/***
 * create by liuPing 2016/12/8
 *
 * */
angular.module('associatedPhone',[])

        .component('associatedPhone',{

            templateUrl:'app/channel/associatedPhone.html',
            controller:associatedPhoneCtrl
        });

function associatedPhoneCtrl($scope, $http, $cookies ,$timeout){

    $scope.isLogined = $cookies.get('loginStatus');
    $scope.loginUserId = $cookies.get('loginUserId');

    //url
    $scope.initUrl = function(){

        $scope.apiUrl_comp_sales_list = "/company/comp_sales_list"; //98查询web大客户关联列表
        $scope.apiUrl_companyAdd_comp_sales = "/company/add_comp_sales"; //添加手机号
        $scope.apiUrl_companyDel_comp_sales ="/company/del_comp_sales"; //删除手机号
        $scope.templateSupp = "/company/company_suppOrCust_info";//请求供应商大客户的接口地址




    };


    //请求参数
    $scope.initParam = function(){

        $scope.param_compSalesList = {}; //手机列表所需要的参数
        $scope.parmSupp = {}; //大客户
        $scope.paramAdd = {}; //添加手机号
        $scope.param_deletePhone = {}; //删除列表


    };


    //初始化model
    $scope.initModule = function(){

        $scope.mod_compSalesList = [];
        $scope.paramCompCode = ""; //对应大客户的id值
        $scope.paramMobile = "";
        $scope.mod_mobiles = "";//添加参数
        $scope.mod_mobilesTwo = "";//第二个手机号
        $scope.mod_mobilesThree = "";//第三个手机号
        $scope.mod_mobilesFour = ""; //第四个手机号
        $scope.mod_mobiles_arr = [];
        $scope.mod_mobiles_str = "";
        $scope.mod_compCode = ""; //大客户id

        $scope.deletePhoneList = [];//建立一个空数组把选中的id传入


        $scope.showPone = true;
        $scope.showFirst = false;
        $scope.showLast = false;



    };

    //请求供应商 / 大客户的请求
    $scope.parmSupp = {
        suppOrCust: 1

    }; //大客户
    console.log($scope.parmSupp);
    $http({
        url:$scope.templateSupp,
        headers:{
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
        },
        method:"POST",
        data:$.param($scope.parmSupp)

    }).success(function(response){

        $scope.suppList = response.data;
        console.log($scope.suppList);
        console.log("大客户成功!");

    }).error(function(){

        console.log("请求大客户失败");
    });

    //手机号列表
    $scope.comp_sales_list = function(){

        //console.log($scope.suppList);

        // 供应商option参数选择
        var optionsSuppId = $("#gongying option:selected"); //选取供应商被选中的option
        $scope.supp = (optionsSuppId.text()); //拿到选中项的文本
        console.info($scope.supp);
        angular.forEach($scope.suppList,function(data,index,array){ //商品分类筛选
            if($scope.supp == $scope.suppList[index].comp_name){
                $scope.suppId = $scope.suppList[index].comp_id;
            }

        });
        //
        //$scope.param_compSalesList ={
        //
        //    compCode: $scope.suppList.selected
        //
        //};

        $scope.param_compSalesList.compCode = $scope.suppId;
        $scope.param_compSalesList.mobile = $scope.paramMobile;
        console.info($scope.param_compSalesList);
        $http({

            url:$scope.apiUrl_comp_sales_list,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.param_compSalesList)

        }).success(function(response){

            if(200 == response.status){

                $scope.mod_compSalesList = response.data.list;  // 接住返回的数据
                console.log("请求成功");
                console.log(response);

            }else if(response.status == 401){

                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/admin.html#/";
                window.location.reload();
            }

            //需要用到的分页信息
            $scope.totalCount = response.data.totalCount;
            console.log("商品总条数:"+response.data.totalCount);

            $scope.pageSize = response.data.pageSize;

            console.log("页面显示条数:"+response.data.pageSize);

            $scope.totalPageCount = response.data.totalPageCount;
            console.log("总页数:"+response.data.totalPageCount);

            $scope.pageNum = response.data.pageNum;
            console.log("当前页数:"+response.data.pageNum);


        }).error(function(response){

            console.log("请求失败");
            console.log(response);

        });
    };

    //查询
    $scope.queryPhoneList = function(){

        $scope.comp_sales_list();
    };

    //分页上一页

    $scope.previous = function(){

        console.log("当前页数:"+$scope.pageNum);

        if($scope.pageNum == 1){

            //alert("这已经是第一页了!");
            $scope.showPone = false;
            $scope.showFirst = true;
            $scope.showLast = false;
            //alert("添加手机号成功");
            $("#delete_or_not_box").css("display","block");
            $timeout(function(){

                $("#delete_or_not_box").css("display","none");

            },2000);

        }else{

            $scope.param_compSalesList.pageNO = $scope.pageNum-1;
            //$scope.comp_sales_list($scope.paramPage);
            //console.log($scope.param_compSalesList.pageNum);
            $scope.comp_sales_list();

        }
    };

    //分页下一页
    $scope.next = function(){

        console.log("当前页数:"+$scope.pageNum);

        if($scope.pageNum == $scope.totalPageCount){

            //alert("这已经是最后一页");
            $scope.showPone = false;
            $scope.showFirst = false;
            $scope.showLast = true;
            //alert("添加手机号成功");
            $("#delete_or_not_box").css("display","block");
            $timeout(function(){

                $("#delete_or_not_box").css("display","none");

            },2000);

        }else{

            $scope.param_compSalesList.pageNO = $scope.pageNum+1;
            //$scope.comp_sales_list($scope.paramPage);
            $scope.comp_sales_list();
            //console.log( $scope.param_compSalesList.pageNum);
        }
    };

    //跳转到指定页面
    $scope.goToPage = function(){

        console.log("跳转到以下页面:"+$scope.changePage);

        if($scope.changePage == null || $scope.changePage == undefined || $scope.changePage == ""){

            alert("不能跳转到空白页面!")
        }else if(!($scope.changePage>=1&&$scope.changePage<=$scope.totalPageCount)){

            alert("页面不能小于1,不能大于页面总数!");
        }else{

            $scope.param_compSalesList.pageNO = $scope.changePage;
            //$scope.comp_sales_list($scope.paramPage);
            //console.log( $scope.param_compSalesList.pageNum);
            $scope.comp_sales_list()


        }
    };


   //添加手机号

    $scope.addPhone = function(){


        if('' != $scope.mod_mobiles){

            $scope.mod_mobiles_arr.push($scope.mod_mobiles)
        }
        if('' != $scope.mod_mobilesTwo){

            $scope.mod_mobiles_arr.push($scope.mod_mobilesTwo)
        }
        if('' != $scope.mod_mobilesThree){

            $scope.mod_mobiles_arr.push($scope.mod_mobilesThree)
        }
        if('' != $scope.mod_mobilesFour){

            $scope.mod_mobiles_arr.push($scope.mod_mobilesFour)
        }
        $scope.mod_mobiles_str =  $scope.mod_mobiles_arr.join(",");

        console.log($scope.mod_mobiles_str);

        $scope.paramAdd = {

            mobiles : $scope.mod_mobiles_str,
            compCode: $scope.suppList.selected
        };
        console.info($scope.paramAdd);

        $http({

            url:$scope.apiUrl_companyAdd_comp_sales,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.paramAdd)

        }).success(function(response){

            console.log(response);

            if(200 == response.status){

                console.log("请求成功");
                //alert("添加手机号成功");
                $("#delete_or_not_box").css("display","block");
                $timeout(function(){

                    $("#delete_or_not_box").css("display","none");

                },2000);
                console.log(response);
                $scope.comp_sales_list();

            }else if(response.status == 401){

                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/admin.html#/";
                window.location.reload();

                console.log("对不起"+response.statusText);
            }else{

                console.log(response.status);
                $("#error").css("display","block");
                $timeout(function(){
                    $("#error").css("display","none");

                },1000);

                $scope.statustext = response.statusText;
                console.log(response.statusText);
            }

        }).error(function(response){

            console.log("请求失败");
            console.log(response);

        });

    };


    //添加手机号成功后消失
    $scope.sure_delete_or_not = function(){

        $("#delete_or_not_box").css("display","none");
    };

    $scope.sure_delete_or_error = function(){

        $("#delete_or_not_box_error").css("display","none");

    };
    //删除手机号

    $scope.phone_list_delete = function(){

        $scope.param_deletePhone = {

            userId : $scope.deletePhoneList.join(',') //传的值用逗号分隔
        };
        console.log($scope.param_deletePhone);

        $http({
            url:$scope.apiUrl_companyDel_comp_sales,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"//FORM形式提交
            },
            data:$.param($scope.param_deletePhone)//传的数据
        }).success(
            function(response){
                console.log("请求成功");
                console.log(response);
                $scope.comp_sales_list();
            }
        ).error(
            function(){
                console.log("请求删除失败");
            }
        );

    };

    //单个删除手机号
    $scope.phone_list_single = function(){

        $scope.param_deletePhone = {

            userId : $scope.deletePhoneList.join(',') //传的值用逗号分隔
        };
        console.log($scope.param_deletePhone);

        $http({
            url:$scope.apiUrl_companyDel_comp_sales,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"//FORM形式提交
            },
            data:$.param($scope.param_deletePhone)//传的数据
        }).success(
            function(response){
                console.log("请求成功");
                console.log(response);
                $scope.comp_sales_list();
            }
        ).error(
            function(){
                console.log("请求删除失败");
            }
        );
    };


    //全选手机号删除
    $scope.selectAllUser = function(){

        $scope.deletePhoneList = [];
        angular.forEach($scope.mod_compSalesList,function(data){

            data.checked = $scope.selectAll;//因为没有false true属性需要与model连接ng-model="selectAll"

            console.log(data);
            if(data.checked == true){

                $scope.deletePhoneList.push(data.userId);
            }
            console.log( $scope.deletePhoneList);
        })
    };

    //单选手机号删除
    $scope.selectOne = function(phone){

        console.info(phone);
        $scope.obj = phone;
        if(phone.checked == true){

            $scope.deletePhoneList.push(phone.userId);
            console.log( $scope.deletePhoneList);

        }else{

            var pos = $scope.deletePhoneList.indexOf(phone.userId);
            $scope.deletePhoneList.splice(pos,1);
            $scope.phone = "";
            console.log($scope.obj)
        }

    };


    //调用封装的函数
    $scope.initUrl();
    $scope.initParam();
    $scope.initModule();
    $scope.comp_sales_list();




}
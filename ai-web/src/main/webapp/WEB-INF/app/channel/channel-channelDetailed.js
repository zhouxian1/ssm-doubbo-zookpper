angular.module('channelDetailed',[])//声明路由模块channelDetailed
    .component('channelDetailed',{
        templateUrl:'app/channel/channelDetailed.html',
        controller:channelDetailedCtrl
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

function channelDetailedCtrl($scope,$http,$routeParams,$cookies,$timeout){

    $scope.isLogined=$cookies.get('loginStatus');
    $scope.loginUserId=$cookies.get('loginUserId');


    //渠道id
    $scope.compId=$routeParams.compId;


    /**********  初始化请求地址  **********/
    $scope.initQueryUrl = function(){
        $scope.apiUrl_company_company_info    = "/company/company_info";        //12.渠道详情地址
        $scope.apiUrl_company_edit_company    = "/company/edit_company";        //10.保存编辑后的渠道详情
        $scope.apiUrl_company_goods_info      = "/company/company_goods_info";  //65.查询已配置商品信息
        $scope.apiUrl_cmsComm_fileUpload      = "/cmsComm/fileUpload";          //文件上传接口
        $scope.apiUrl_company_company_APPKey  = "/company/company_APPKey";      //7.生成APPKey接口
        $scope.apiUrl_company_publisher_list  = "/company/publisher_list";      //2.发行商列表
        $scope.apiUrl_company_discount_type   = "/company/discount_type";       //获取加价类型
        $scope.apiUrl_company_add_goods_pools = "/company/add_goods_pool";      //8.普通商品配置加价方式保存更改接口
        $scope.apiUrl_company_comp_balance    = "/company/comp_balance";        //110 查询余额
    };
    $scope.initQueryUrl();


    /**********  初始化请求参数  **********/
    $scope.initQueryParam = function(){
        $scope.param_company_company_info = {           //12.渠道详情请求参数
            compId : ''
        };
        $scope.param_company_edit_company = {           //10.修改渠道请求参数
            suppOrCust  : '',    //供应商or大客户
            logo        : '',    //渠道头像
            compName    : '',    //渠道名称
            compId      :'',     //渠道ID
            pubIds      : '',    //发行商(大客户不显示)
            channelType : '',    //渠道类型
            status      : '',    //渠道状态
            linkMan     : '',    //接口人
            linkMobile  : '',    //接口人电话
            econtract   : '',    //电子合同
            appKey      : '',    //APPKey生成器
            rsaPub      : '',    //公钥
            accessHosts : '',    //白名单
            compDesc    : '',    //渠道描述
            remark      : ''     //渠道备注
        };
        $scope.param_company_company_APPKey = {         //7.生成APPKey
            compName : ''
        };
        $scope.param_company_publisher_list = {};       //2.发行商列表请求参数
        $scope.param_company_goods_info     = {         //65.渠道已配置商品请求参数
            compId : '',
            type   : ''
        };

        //账户余额
        $scope.comp_balance = {

            compId:$scope.compId
        }
    };

    //ng-show
    $scope.fade = false;
    $scope.fadeOne = true;
    $scope.initQueryParam();


    /**********  初始化绑定数据  **********/
    $scope.initQueryMod = function(){
        $scope.mod_suppOrCust      = '';        //供应商0,大客户1
        $scope.mod_logo            = '';        //渠道头像
        $scope.mod_compName        = '';        //渠道名称
        $scope.mod_balance         = 0 ;        //账户余额
        $scope.mod_compId          = '';        //渠道ID
        $scope.mod_pubIds          = '';        //发行商ID
        $scope.mod_pubIdsText      = '';        //发行商数字转文本
        $scope.mod_channelTypeText = '';        //渠道类型数字转文本
        $scope.mod_statusText      = '';        //渠道状态数字转文本
        $scope.mod_linkMan         = '';        //渠道接口人
        $scope.mod_linkMobile      = '';        //渠道接口人电话
        $scope.mod_appKey          = '';        //APPKey
        $scope.mod_rsaPub          = '';        //RSA公钥
        $scope.mod_accessHostsOne  = '';        //白名单1
        $scope.mod_accessHostsTwo  = '';        //白名单2
        $scope.mod_compDesc        = '';        //渠道描述
        $scope.mod_remark          = '';        //渠道备注
        $scope.mod_channeltype     = '';        //渠道类型
        $scope.mod_status          = '';        //渠道状态
        $scope.mod_accessHosts     = '';        //白名单
        $scope.publisherList       = [];        //发行商列表
        $scope.mod_econtract       = '';        //电子合同
        $scope.mod_balanceText     = '';        //提示账户余额
        $scope.mod_show = true;
        $scope.mod_hide = false;
    };
    $scope.initQueryMod();


    /**********  页面请求+函数  **********/

    //查询余额
    $scope.compBalance = function(){

        $http({
            url:$scope.apiUrl_company_comp_balance,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.comp_balance)
        }).success(function(response){

            if(200 == response.status){
                $scope.mod_balance = response.data;
                console.log("查询余额成功");
                console.log(response);

                if($scope.mod_balance < 0){

                    $scope.mod_show = false;
                    $scope.mod_hide = true;

                    $scope.mod_balanceText = "该上游接口暂不支持查询"

                }
            }else if(401 == response.status){

                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();

            }else{

                $scope.statustext = response.statusText;
                $("#error").css("display","block");
                $timeout(function(){
                    $("#error").css("display","none");

                },2000)
            }
        }).error(function(response){

            console.log("账户余额请求失败");
            console.log(response);
        })

    };
    $scope.compBalance();

    $scope.know = function(){

        $("#error").css("display","none");
    };
    //1、请求发行商列表
    $scope.queryPublisherList = function(){
        $http({
            url:$scope.apiUrl_company_publisher_list,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.param_company_publisher_list)
        }).success(function(response){
            console.log("2接口-发行商列表-请求成功!");
            console.log(response);
            if(200 == response.status){
                $scope.publisherList = response.data;
            }else if(401 == response.status){
                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
            }
        }).error(function(response){
            console.log("2接口-发行商列表-请求失败!");
            console.log(response);
        })
    };
    $scope.queryPublisherList();

    //2、请求渠道详情
    $scope.query_company_company_info = function(){
        $scope.param_company_company_info = {
            compId : $scope.compId
        };
        console.log($scope.param_company_company_info);
        $http({
            url     : $scope.apiUrl_company_company_info,
            method  : "POST",
            headers : {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data    : $.param($scope.param_company_company_info)
        }).success(function(response){
            console.log("12接口-渠道详情-请求成功!");
            console.log(response);
            if(200 == response.status){
                var mod               = response.data;
                $scope.mod_suppOrCust = mod.suppOrCust;     //供应商0,大客户1
                $scope.mod_logo       = mod.logo;
                $scope.mod_compName   = mod.compName;
                //$scope.mod_balance    = mod.balance;
                $scope.mod_compId     = mod.compId;
                $scope.mod_linkMan    = mod.linkMan;
                $scope.mod_linkMobile = mod.linkMobile;
                $scope.mod_appKey     = mod.appKey;
                $scope.mod_rsaPub     = mod.rsaPub;
                $scope.mod_compDesc   = mod.compDesc;
                $scope.mod_remark     = mod.remark;
                $scope.mod_pubIds     = mod.pubIds;         //发行商ID字符串
                $scope.mod_channeltype= mod.channelType ;   //渠道类型
                $scope.mod_status     = mod.status;         //渠道状态
                $scope.mod_accessHosts= mod.accessHosts;    //白名单
                $scope.mod_econtract  = mod.econtract;      //电子合同
                if(null != $scope.mod_accessHosts){
                    $scope.mod_accessHostsOne = $scope.mod_accessHosts[0];
                    $scope.mod_accessHostsTwo = $scope.mod_accessHosts[1];
                }

                if(null == $scope.mod_econtract){
                    $scope.mod_econtract = "暂无电子合同";
                    $(".mod_econtractOne").css("display","block");
                    $(".mod_econtractTwo").css("display","none");
                }else{
                    $scope.mod_econtractText = "http://tmms.gxcards.com"+$scope.mod_econtract;
                    $(".mod_econtractOne").css("display","none");
                    $(".mod_econtractTwo").css("display","block");
                }

                if(0 == $scope.mod_suppOrCust){
                    $(".appKey").css("display","none");
                    $(".rsaPub").css("display","none");
                    $(".whiteNameList").css("display","none");
                    $(".look_supp_goods").css("display","block");
                }else if(1 == $scope.mod_suppOrCust){
                    $(".publisher").css("display","none");
                    $(".look_supp_goods").css("display","none");
                }

                if(null != $scope.mod_pubIds){
                    $scope.mod_pubIds_arr = $scope.mod_pubIds.split(',');
                    angular.forEach($scope.publisherList,function(publisher){
                        angular.forEach($scope.mod_pubIds_arr,function(pubId){
                            if(pubId == publisher.pubId){
                                $scope.mod_pubIdsText += publisher.pubName+',';
                                publisher.selected = true;
                            }
                        })
                    });
                    $scope.mod_pubIdsText = $scope.mod_pubIdsText.slice(0,$scope.mod_pubIdsText.length-1);
                    console.log($scope.mod_pubIds_arr);
                }


                if(0 == $scope.mod_channeltype){
                    $scope.mod_channelTypeText = "0";
                    console.log($scope.mod_channeltype);
                    console.log($scope.mod_channelTypeText);
                }else if(1 == $scope.mod_channeltype){
                    $scope.mod_channelTypeText = "1";
                    console.log($scope.mod_channeltype);
                    console.log($scope.mod_channelTypeText);
                }

                if(0 == $scope.mod_status){
                    $scope.mod_statusText = "0";
                }else if(1 == $scope.mod_status){
                    $scope.mod_statusText = "1";
                }else if(-1 == $scope.mod_status){
                    $scope.mod_statusText = "-1";
                }
                console.log($scope.mod_statusText);

                //if(null != $scope.mod_accessHosts){
                //    $scope.mod_accessHosts_arr = $scope.mod_accessHosts.split(',');
                //    $scope.mod_accessHostsOne = $scope.mod_accessHosts_arr[0];
                //    $scope.mod_accessHostsTwo = $scope.mod_accessHosts_arr[1];
                //    console.log($scope.mod_accessHosts_arr);
                //    console.log($scope.mod_accessHostsOne);
                //    console.log($scope.mod_accessHostsTwo);
                //}

            }else if(401 == response.status){
                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
            }
        }).error(function(response){
            console.log("12接口-渠道详情-请求失败!");
            console.log(response);
        })
    };

    //3、点击编辑渠道详情
    $scope.editChannelDetail = function(){
        $(".edit").css("display","block");
        $(".ok").css("display","none");
        if(0 == $scope.mod_suppOrCust){
            $(".appKey").css("display","none");
            $(".rsaPub").css("display","none");
            $(".whiteNameList").css("display","none");
        }else if(1 == $scope.mod_suppOrCust){
            $(".publisher").css("display","none");
        }
    };

    //3.5、更改发行商选中状态
    $scope.changeSelectStatus = function(selectStatus,publisher){
        //console.log(selectStatus);
        if(true == selectStatus){
            publisher.selected = false;
        }else if(null == selectStatus){
            publisher.selected = true;
        }else if(false == selectStatus){
            publisher.selected = true;
        }
    };

    //4、点击保存修改
    $scope.saveChannelChange = function(){
        console.log($scope.publisherList);
        console.log($scope.mod_logo_two);
        console.log($scope.mod_econtract_two);
        if(null == $scope.mod_logo_two){
            $scope.mod_logo_two = $scope.mod_logo;
        }

        if(null == $scope.mod_econtract_two){
            $scope.mod_econtract_two = $scope.mod_econtract;
            console.log($scope.mod_econtract_two);
        }

        //if('' != $scope.mod_pubIdsText){
        //    $scope.mod_pubIds = [];
        //    var mod_pubIdsText_arr = $scope.mod_pubIdsText.split(',');
        //    angular.forEach(mod_pubIdsText_arr,function(pubIdsText){
        //        angular.forEach($scope.publisherList,function(publisher){
        //            if(publisher.pubName == pubIdsText){
        //                $scope.mod_pubIds.push(publisher.pubId);
        //            }
        //        })
        //    });
        //    var pubIds = $scope.mod_pubIds.join(',');
        //    $scope.mod_pubIds = pubIds;
        //}
        //console.log(pubIds);

        $scope.mod_pubIds = [];
        angular.forEach($scope.publisherList,function(publisher){
            if(true == publisher.selected){
                $scope.mod_pubIds.push(publisher.pubId);
            }
        });
        var pubIds = $scope.mod_pubIds.join(',');
        $scope.mod_pubIds = pubIds;
        console.log($scope.mod_pubIds);

        console.log($scope.mod_channelTypeText);
        if("0" == $scope.mod_channelTypeText){
            $scope.mod_channeltype = 0;
        }else if("1" == $scope.mod_channelTypeText){
            $scope.mod_channeltype = 1;
        }

        $scope.mod_status = $scope.mod_statusText;

        var mod_accessHosts_arr = [$scope.mod_accessHostsOne , $scope.mod_accessHostsTwo];
        $scope.mod_accessHosts = mod_accessHosts_arr.join(',');
        console.log(mod_accessHosts_arr);
        console.log($scope.mod_accessHosts);
        if(',' == $scope.mod_accessHosts){
            $scope.mod_accessHosts = '';
        }

        $scope.param_company_edit_company = {           //10.修改渠道请求参数
            suppOrCust  : $scope.mod_suppOrCust,        //供应商or大客户
            logo        : $scope.mod_logo_two,          //渠道头像
            compName    : $scope.mod_compName,          //渠道名称
            compId      : $scope.mod_compId,            //渠道ID
            pubIds      : $scope.mod_pubIds,            //发行商(大客户不显示)
            channelType : $scope.mod_channeltype,       //渠道类型
            status      : $scope.mod_status,            //渠道状态
            linkMan     : $scope.mod_linkMan,           //接口人
            linkMobile  : $scope.mod_linkMobile,        //接口人电话
            econtract   : $scope.mod_econtract_two,     //电子合同
            appKey      : $scope.mod_appKey,            //APPKey生成器
            rsaPub      : $scope.mod_rsaPub,            //公钥
            accessHosts : $scope.mod_accessHosts,       //白名单
            compDesc    : $scope.mod_compDesc,          //渠道描述
            remark      : $scope.mod_remark             //渠道备注
        };

        $http({
            url     : $scope.apiUrl_company_edit_company,
            method  : "POST",
            headers : {
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data    : $.param($scope.param_company_edit_company)
        }).success(function(response){
            console.log("10接口-修改渠道-请求成功!");
            console.log(response);
            console.log($scope.param_company_edit_company);
            if(200 == response.status){
                alert("修改成功!");
            }else if(401 == response.status){
                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
            }else{
                alert(response.statusText);
            }
        }).error(function(response){
            console.log("10接口-修改渠道-请求失败!");
            console.log(response);
        });


        //console.log($scope.mod_suppOrCust);     //供应商0,大客户1
        //console.log($scope.mod_logo);           //渠道头像
        //console.log($scope.mod_compName);       //渠道名称
        //console.log($scope.mod_compId);         //渠道ID
        //console.log($scope.mod_pubIds);         //发行商ID
        //console.log($scope.mod_pubIdsText);     //发行商数字转文本
        //console.log($scope.mod_channelTypeText);//渠道类型数字转文本
        //console.log($scope.mod_statusText);     //渠道状态数字转文本
        //console.log($scope.mod_linkMan);        //渠道接口人
        //console.log($scope.mod_linkMobile);     //渠道接口人电话
        //console.log($scope.mod_appKey);         //APPKey
        //console.log($scope.mod_rsaPub);         //RSA公钥
        //console.log($scope.mod_accessHostsOne); //白名单1
        //console.log($scope.mod_accessHostsTwo); //白名单2
        //console.log($scope.mod_compDesc);       //渠道描述
        //console.log($scope.mod_remark);         //渠道备注
        //console.log($scope.mod_channeltype);    //渠道类型
        //console.log($scope.mod_status);         //渠道状态
        //console.log($scope.mod_accessHosts);    //白名单
    };

    //5、上传头像
    $scope.uploadImg=function(event){
        event.stopImmediatePropagation();//阻止事件冒泡
        console.log(event);
        var file=event.target.files;
        $scope.file=[];
        for(var i=0;i<file.length;i++){
            $scope.file.push(file[i]);
        }
        console.log("选取文件:");
        console.log($scope.file);
        $http({
            url:$scope.apiUrl_cmsComm_fileUpload,
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
            console.log("上传文件请求成功");
            console.log(response);
            console.log(response.data);
            $scope.mod_logo_two=response.data[0];
            console.log("获取文件url地址成功");
        }).error(function(response){
            console.log("上传文件请求失败");
            console.log(response);
            console.log("获取文件url地址失败");
        });
    };

    //6、电子合同
    $scope.uploadFile=function(event){
        event.stopImmediatePropagation();//阻止事件冒泡
        console.log(event);
        var file=event.target.files;
        $scope.file=[];
        for(var i=0;i<file.length;i++){
            $scope.file.push(file[i]);
        }
        console.log("选取文件:");
        console.log($scope.file);
        $http({
            url:$scope.apiUrl_cmsComm_fileUpload,
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
            console.log("上传文件请求成功");
            console.log(response);
            console.log(response.data);
            $scope.mod_econtract_two=response.data[0];
            console.log("获取文件url地址成功");
        }).error(function(response){
            console.log("上传文件请求失败");
            console.log(response);
            console.log("获取文件url地址失败");
        });
    };

    ////$scope.paramQueryChannelDetail={};  //定义查询渠道详情的请求参数
    ////$scope.paramQueryChannelDetail.compId=$scope.compId;
    $scope.paramQueryNormalConfigedGoods={};  //定义查询渠道配置信息的请求参数--普通商品
    $scope.paramQueryNormalConfigedGoods.compId=$scope.compId;
    $scope.paramQueryNormalConfigedGoods.type=-1;
    $scope.paramQueryTopupConfigedGoods={}; //定义查询渠道配置信息的请求参数--充值商品
    $scope.paramQueryTopupConfigedGoods.compId=$scope.compId;
    $scope.paramQueryTopupConfigedGoods.type=1;
    //$scope.paramChangeChannel={};   //修改渠道请求参数
    //$scope.paramGenerateAPPkey={};  //生成APPKey请求参数
    //$scope.paramQueryDiscountTypeList={};   //获取加价类型请求参数
    $scope.paramAddGoodsPools={};   //保存普通商品池配置信息请求参数
    $scope.paramAddGoodsPools.goodsPools=[];
    $scope.paramAddGoodsPools_goodsPools_good={};
    $scope.paramAddTopupGoodsPools={};   //保存充值商品池配置信息请求参数
    $scope.paramAddTopupGoodsPools.goodsPools=[];
    $scope.paramAddTopupGoodsPools_goodsPools_good={};
    //
    //$scope.channelDetail={};    //渠道详情变量
    $scope.NormalConfigedGoods=[];    //配置普通商品变量
    $scope.TopupConfigedGoods=[];   //配置充值商品变量
    //$scope.publisherList=[];    //发行商列表
    $scope.NormalConfigedGoodsDiscountTypeList=[];  //变量承接普通配置商品的加价方式数组
    $scope.TopupConfigedGoodsDiscountTypeList=[];  //变量承接充值配置商品的加价方式数组
    //
    ////发行商列表请求
    //$http({
    //    url:$scope.apiUrl_company_publisher_list,
    //    method:"POST",
    //    headers:{
    //        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    //    },
    //    data:{}
    //}).success(function(response){
    //    console.log("请求发行商列表接口成功!");
    //    console.log("发行商列表请求成功后返回的信息是:");
    //    console.log(response);
    //    $scope.publisherList=response.data;
    //}).error(function(response){
    //    console.log("请求发行商列表接口失败!");
    //    console.log("发行商列表请求失败后返回的信息是:");
    //    console.log(response);
    //});
    //
    //获取加价类型
    $http({
        url:$scope.apiUrl_company_discount_type,
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
        },
        data:{}
    }).success(function(response){
        console.log("请求加价类型接口成功后返回的信息是:");
        console.log(response);
        $scope.NormalConfigedGoodsDiscountTypeList=response.data;
        $scope.TopupConfigedGoodsDiscountTypeList=response.data;
        console.log($scope.NormalConfigedGoodsDiscountTypeList);
        console.log($scope.TopupConfigedGoodsDiscountTypeList);
    }).error(function(response){
        console.log("请求加价类型接口失败后返回的信息是:");
        console.log(response);
    });
    //
    //
    ////根据渠道ID请求渠道详情
    //$http({
    //    url:$scope.apiUrl_company_company_info,
    //    method:"POST",
    //    headers:{
    //        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    //    },
    //    data: $.param($scope.paramQueryChannelDetail)
    //}).success(function(response){
    //    console.log("请求查询渠道详情接口成功!");
    //    console.log("查询渠道详情接口请求成功后返回的信息是:");
    //    console.log(response);
    //    if(response.status==200){
    //        $scope.channelDetail=response.data;
    //        $scope.paramGenerateAPPkey.compName=response.data.compName;
    //
    //        $scope.paramChangeChannel.compId=$scope.channelDetail.compId;   //修改渠道请求参数
    //        $scope.paramChangeChannel.compName=$scope.channelDetail.compName;
    //        $scope.paramChangeChannel.channelType=$scope.channelDetail.channelType;
    //        $scope.paramChangeChannel.suppOrCust=$scope.channelDetail.suppOrCust;
    //        $scope.paramChangeChannel.linkMan=$scope.channelDetail.linkMan;
    //        $scope.paramChangeChannel.linkMobile=$scope.channelDetail.linkMobile;
    //        $scope.paramChangeChannel.status=$scope.channelDetail.status;
    //        if($scope.channelDetail.status==0){
    //            $scope.paramChangeChannel.appKey=$scope.channelDetail.appKey;
    //            $scope.paramChangeChannel.rsaPub=$scope.channelDetail.rsaPub;
    //        }
    //        $scope.paramChangeChannel.pubIds=$scope.channelDetail.pubIds;
    //
    //        angular.forEach($scope.publisherList,function(data){
    //            if($scope.channelDetail.pubIds==data.pubId){
    //                $scope.channelDetail.pubIdsText+=" "+data.pubName;
    //            }
    //        });
    //        if($scope.channelDetail.channelType==1){   //渠道类型判断
    //            $scope.channelDetail.channelTypeText="线下渠道";
    //        }else if($scope.channelDetail.channelType==0){
    //            $scope.channelDetail.channelTypeText="线上渠道";
    //        }
    //        if($scope.channelDetail.status==0){
    //            $scope.channelDetail.statusText="暂停";
    //        }else if($scope.channelDetail.status==1){
    //            $scope.channelDetail.statusText="正常";
    //        }else if($scope.channelDetail.status==-1){
    //            $scope.channelDetail.statusText="异常";
    //        }
    //    }
    //    console.log($scope.channelDetail);
    //}).error(function(response){
    //    console.log("请求查询渠道详情接口失败!");
    //    console.log("查询渠道详情接口请求失败后返回的信息是:");
    //    console.log(response);
    //});
    //
    //根据渠道ID请求渠道的配置信息--普通商品
    $http({
        url:$scope.apiUrl_company_goods_info,
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: $.param($scope.paramQueryNormalConfigedGoods)
    }).success(function(response){
        console.log("请求查询配置信息接口成功!--普通商品");
        console.log("查询配置信息接口请求成功后返回的信息是:--普通商品");
        console.log(response);
        if(response.status==200){
            $scope.NormalConfigedGoods=response.data;
            console.info($scope.NormalConfigedGoods)
            angular.forEach($scope.NormalConfigedGoods,function(normalConfigedGood){
                //normalConfigedGood.outPrice=Number(normalConfigedGood.amount)+Number(normalConfigedGood.discountDetail);
                angular.forEach($scope.NormalConfigedGoodsDiscountTypeList,function(NormalDiscountType){
                    if(normalConfigedGood.discountType==NormalDiscountType.code){
                        normalConfigedGood.desc=NormalDiscountType.desc;
                    }
                    if(normalConfigedGood.discountType==0){
                        //normalConfigedGood.outPrice=Number(normalConfigedGood.amount)+Number(normalConfigedGood.amount)*Number(normalConfigedGood.discountDetail)/100;
                        normalConfigedGood.outPrice=Number(normalConfigedGood.amount)*Number(normalConfigedGood.discountDetail)/100;
                    }else if(normalConfigedGood.discountType==1){
                        normalConfigedGood.outPrice=Number(normalConfigedGood.amount)+Number(normalConfigedGood.discountDetail);
                    }else if(normalConfigedGood.discountType==2){
                        normalConfigedGood.outPrice=Number(normalConfigedGood.discountDetail);
                    }
                })
            })
        }else if(401 == response.status){
            $cookies.remove('loginStatus');
            $cookies.remove('loginUserId');
            window.location.href="/app/index.html#/";
            window.location.reload();
        }
        console.log($scope.NormalConfigedGoods);
        console.log($scope.NormalConfigedGoodsDiscountTypeList);
    }).error(function(response){
        console.log("请求查询配置信息接口失败!--普通商品");
        console.log("查询配置信息接口请求失败后返回的信息是:--普通商品");
        console.log(response);
    });

    //根据渠道ID请求渠道的配置信息--充值商品
    $http({
        url:$scope.apiUrl_company_goods_info,
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: $.param($scope.paramQueryTopupConfigedGoods)
    }).success(function(response){
        console.log("请求查询配置信息接口成功!--充值商品");
        console.log("查询配置信息接口请求成功后返回的信息是:--充值商品");
        console.log(response);
        if(response.status==200){
            $scope.TopupConfigedGoods=response.data;
            console.info($scope.TopupConfigedGoods)
            console.log("hjsgdjg")
            angular.forEach($scope.TopupConfigedGoods,function(topupConfigedGood){
                angular.forEach($scope.TopupConfigedGoodsDiscountTypeList,function(TopupDiscountType){
                    if(topupConfigedGood.discountType==TopupDiscountType.code){
                        topupConfigedGood.desc=TopupDiscountType.desc;
                    }
                    if(topupConfigedGood.discountType==0){
                        topupConfigedGood.outPrice=Number(topupConfigedGood.amount)+Number(topupConfigedGood.amount)*Number(topupConfigedGood.discountDetail)/100;
                    }else if(topupConfigedGood.discountType==1){
                        topupConfigedGood.outPrice=Number(topupConfigedGood.amount)+Number(topupConfigedGood.discountDetail);
                    }else if(topupConfigedGood.discountType==2){
                        topupConfigedGood.outPrice=Number(topupConfigedGood.discountDetail);
                    }
                })
            })
        }else if(401 == response.status){
            $cookies.remove('loginStatus');
            $cookies.remove('loginUserId');
            window.location.href="/app/index.html#/";
            window.location.reload();
        }
        console.log($scope.TopupConfigedGoods);
        console.log($scope.TopupConfigedGoodsDiscountTypeList);
    }).error(function(response){
        console.log("请求查询配置信息接口失败!--充值商品");
        console.log("查询配置信息接口请求失败后返回的信息是:--充值商品");
        console.log(response);
    });

    ////$scope.channelEdit=function(){
    ////    $(".edit1").css("display","block");
    ////    $(".ok1").css("display","none");
    ////};
    ////$scope.channelEdit2=function(){
    ////    $(".edit").css("display","block");
    ////    $(".ok").css("display","none");
    ////};
    //$scope.editChannelDetail = function(){
    //    $(".edit").css("display","block");
    //    $(".ok").css("display","none");
    //};
    $scope.editTable=function(){
        $('.edit3').css("display","block");
        $(".ok3").css("display","none");
    };
    $scope.editTable2=function(){
        $('.edit4').css("display","block");
        $(".ok4").css("display","none");
    };
    //
    ////先调用上传文件的接口,获得返回的URL,渠道logo
    //$scope.uploadImg=function(event){
    //    event.stopImmediatePropagation();//阻止事件冒泡
    //    console.log(event);
    //    var file=event.target.files;
    //    $scope.file=[];
    //    for(var i=0;i<file.length;i++){
    //        $scope.file.push(file[i]);
    //    }
    //    console.log("选取文件:");
    //    console.log($scope.file);
    //    $http({
    //        url:$scope.apiUrl_cmsComm_fileUpload,
    //        method:"POST",
    //        headers:{
    //            "Content-Type":undefined
    //        },
    //        data:{
    //            "file":$scope.file
    //        },
    //        transformRequest:function(data,headerGetter){//进行格式转换,非常关键
    //            var formData=new FormData();//将model转为表单格式
    //            angular.forEach(data,function(value,key){
    //                angular.forEach(value,function(val){
    //                    formData.append(key,val);
    //                })
    //            });
    //            return formData;
    //        }
    //    }).success(function(response){
    //        console.log("上传文件请求成功");
    //        console.log(response);
    //        console.log(response.data);
    //        $scope.paramChangeChannel.logo=response.data[0];
    //        console.log("获取文件url地址成功");
    //    }).error(function(response){
    //        console.log("上传文件请求失败");
    //        console.log(response);
    //        console.log("获取文件url地址失败");
    //    });
    //};
    //
    ////先调用上传文件的接口,获得返回的URL,电子合同
    //$scope.uploadFile=function(event){
    //    event.stopImmediatePropagation();//阻止事件冒泡
    //    console.log(event);
    //    var file=event.target.files;
    //    $scope.file=[];
    //    for(var i=0;i<file.length;i++){
    //        $scope.file.push(file[i]);
    //    }
    //    console.log("选取文件:");
    //    console.log($scope.file);
    //    $http({
    //        url:$scope.apiUrl_cmsComm_fileUpload,
    //        method:"POST",
    //        headers:{
    //            "Content-Type":undefined
    //        },
    //        data:{
    //            "file":$scope.file
    //        },
    //        transformRequest:function(data,headerGetter){//进行格式转换,非常关键
    //            var formData=new FormData();//将model转为表单格式
    //            angular.forEach(data,function(value,key){
    //                angular.forEach(value,function(val){
    //                    formData.append(key,val);
    //                })
    //            });
    //            return formData;
    //        }
    //    }).success(function(response){
    //        console.log("上传文件请求成功");
    //        console.log(response);
    //        console.log(response.data);
    //        $scope.paramChangeChannel.econtract=response.data[0];
    //        console.log("获取文件url地址成功");
    //    }).error(function(response){
    //        console.log("上传文件请求失败");
    //        console.log(response);
    //        console.log("获取文件url地址失败");
    //    });
    //};
    //
    ////生成APPKey
    $scope.generateAPPKey=function(){
        $scope.param_company_company_APPKey = {         //7.生成APPKey
            compName : $scope.mod_compName
        };
        $http({
            url:$scope.apiUrl_company_company_APPKey,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.param_company_company_APPKey)
        }).success(function(response){
            console.log("请求生成APPKey接口成功!");
            console.log("生成APPKey接口成功后返回的信息是:");
            console.log(response);
            $scope.mod_appKey=response.data;
        }).error(function(response){
            console.log("请求生成APPKey接口失败!");
            console.log("生成APPKey接口失败后返回的信息是:");
            console.log(response);
        })
    };

    ////保存修改渠道
    //$scope.saveChannelChange=function(){
    //    console.log($scope.channelDetail.compDesc);
    //    console.log($scope.channelDetail.remark);
    //    $scope.paramChangeChannel.compDesc=$scope.channelDetail.compDesc;
    //    $scope.paramChangeChannel.remark=$scope.channelDetail.remark;
    //    console.log("点击保存修改渠道!");
    //    console.log($scope.paramChangeChannel);
    //    $http({
    //        url:$scope.apiUrl_company_edit_company,
    //        method:"POST",
    //        headers:{
    //            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    //        },
    //        data: $.param($scope.paramChangeChannel)
    //    }).success(function(response){
    //        console.log("修改渠道接口请求成功!");
    //        console.log("修改渠道接口成功后返回的信息是:");
    //        console.log(response);
    //        if(200 == response.status){
    //            alert("修改渠道信息成功!");
    //        }
    //    }).error(function(response){
    //        console.log("修改渠道接口请求失败!");
    //        console.log("修改渠道接口失败后返回的信息是:");
    //        console.log(response);
    //    })
    //};
    //
    //保存普通商品配置加价方式的更改
    $scope.saveNormalConfigedGoodChange=function(){
        console.log($scope.NormalConfigedGoods);
        $scope.paramAddGoodsPools.goodsPools=[];
        angular.forEach($scope.NormalConfigedGoods,function(data){
            console.log(data)
            $scope.paramAddGoodsPools_goodsPools_good={};
            $scope.paramAddGoodsPools_goodsPools_good.channelCode=$scope.compId;
            $scope.paramAddGoodsPools_goodsPools_good.poolId=data.poolId;
            $scope.paramAddGoodsPools_goodsPools_good.goodsId=data.goodsId;
            $scope.paramAddGoodsPools_goodsPools_good.limitCount=data.limitCount;
            $scope.paramAddGoodsPools_goodsPools_good.discountDetail=data.discountDetail;
            $scope.paramAddGoodsPools_goodsPools_good.type=data.type;
            $scope.paramAddGoodsPools_goodsPools_good.recycleDiscount=data.recycleDiscount;
            console.info($scope.paramAddTopupGoodsPools_goodsPools_good.recycleDiscount)
            console.log("jshdjf")
            angular.forEach($scope.NormalConfigedGoodsDiscountTypeList,function(NormalDiscountType){
                if(data.desc==NormalDiscountType.desc){
                    $scope.paramAddGoodsPools_goodsPools_good.discountType=NormalDiscountType.code;
                }
            });
            $scope.paramAddGoodsPools.goodsPools.push($scope.paramAddGoodsPools_goodsPools_good);
        });
        console.log($scope.paramAddGoodsPools);
        console.log($scope.paramAddGoodsPools_goodsPools_good)
        var paramAddGoodsPools=angular.toJson($scope.paramAddGoodsPools);
        $http({
            url:$scope.apiUrl_company_add_goods_pools,
            method:"POST",
            headers:{
                "Content-Type":"application/json;charset=UTF-8"
            },
            data:paramAddGoodsPools
        }).success(function(response){
            console.log("修改商品配置--保存商品池接口请求成功后--返回的信息是:");
            console.log(response);
            if(200 == response.status){
                //alert("普通商品保存修改成功!");
                $scope.fadeOne = true;
                $scope.fade = false;
                $("#delete_or_not_box").css("display","block");

            }else if(401 == response.status){
                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
            }
            else{
                alert(response.statusText);
            }
        }).error(function(response){
            console.log("修改商品配置--保存商品池接口请求失败后--返回的信息是:");
            console.log(response);
            alert("普通商品保存修改失败!");
        })
    };
    //添加手机号成功后消失
    $scope.sure_delete_or_not = function(){

        $("#delete_or_not_box").css("display","none");
    };
    //保存充值商品配置加价方式的更改
    $scope.saveTopupConfigedGoodChange=function(){
        console.log($scope.TopupConfigedGoods);
        $scope.paramAddTopupGoodsPools.goodsPools=[];
        angular.forEach($scope.TopupConfigedGoods,function(data){
            $scope.paramAddTopupGoodsPools_goodsPools_good={};
            $scope.paramAddTopupGoodsPools_goodsPools_good.channelCode=$scope.compId;
            $scope.paramAddTopupGoodsPools_goodsPools_good.poolId=data.poolId;
            $scope.paramAddTopupGoodsPools_goodsPools_good.goodsId=data.goodsId;
            $scope.paramAddTopupGoodsPools_goodsPools_good.limitCount=data.limitCount;
            $scope.paramAddTopupGoodsPools_goodsPools_good.discountDetail=data.discountDetail;
            $scope.paramAddTopupGoodsPools_goodsPools_good.type=data.type;

            angular.forEach($scope.TopupConfigedGoodsDiscountTypeList,function(TopupDiscountType){
                if(data.desc==TopupDiscountType.desc){
                    $scope.paramAddTopupGoodsPools_goodsPools_good.discountType=TopupDiscountType.code;
                }
            });
            $scope.paramAddTopupGoodsPools.goodsPools.push($scope.paramAddTopupGoodsPools_goodsPools_good);
        });
        console.log($scope.paramAddTopupGoodsPools);
        var paramAddTopupGoodsPools=angular.toJson($scope.paramAddTopupGoodsPools);
        $http({
            url:$scope.apiUrl_company_add_goods_pools,
            method:"POST",
            headers:{
                "Content-Type":"application/json;charset=UTF-8"
            },
            data:paramAddTopupGoodsPools
        }).success(function(response){
            console.log("修改商品配置--保存商品池接口请求成功后--返回的信息是--充值商品:");
            console.log(response);
            if(200 == response.status){
                //alert("充值商品保存修改成功!");
                $scope.fadeOne = false;
                $scope.fade = true;
                $("#delete_or_not_box").css("display","block");

            }else if(401 == response.status){
                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
            }
            else{
                alert(response.statusText);
            }
        }).error(function(response){
            console.log("修改商品配置--保存商品池接口请求失败后--返回的信息是--充值商品:");
            console.log(response);
            alert("充值商品保存修改失败!");
        })
    };
    $scope.query_company_company_info();
}


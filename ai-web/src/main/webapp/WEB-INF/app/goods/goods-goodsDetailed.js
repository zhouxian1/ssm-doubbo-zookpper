////编辑商品
// function editGood(){
//   $(".ok").css("display","none");
//    $(".edit").css("display","block");
//};

//声明路由模块goodsDetailed
angular.module("goodsDetailed",[])
    .component("goodsDetailed",{
        templateUrl:'app/goods/goods-goodsDetailed.html',
        controller:goodsDetailedCtrl
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

//定义控制器函数goodsDetailedCtrl
function goodsDetailedCtrl($scope,$http,$routeParams,$cookies,$timeout){
    
    $scope.isLogined=$cookies.get('loginStatus');
    $scope.loginUserId=$cookies.get('loginUserId');

    var ue = UE.getEditor('ueditorCotent');

    // UE.getEditor = function (ueditorCotent, opt) {
    //     var ue = new UE.ui.Editor(opt);
    //     ue.render("ueditorCotent");
    //     return ue;
    // };

    /********** controller *************/
    $scope.goodsId = $routeParams.goodsId; //goodsId 接住前台返回的id
    $scope.apiUrl_getGoods = "/goods/get"; //接口地址
    $scope.apiUrl_editGoods = "/goods/update"; //修改商品详情接口地址
    $scope.apiUrl_getGoodsType = "/goods/supp_interfaces"; //查询上游接口地址
    $scope.apiUrl_findGoodsType = "/goods/findGoodsType"; //查询商品类型接口地址

    $scope.parm = {goodsId:$scope.goodsId};//商品详情请求参数
    $scope.paramGetGoodsType = {}; // 请求上游接口参数
    $scope.paramFindGoodsType = {}; // 请求商品类型参数
    $scope.mod_findgoodsTypeList = []; // 商品类型列表
    $scope.mod_shangyouType = "";   // 上游接口

    $scope.showGoods = true;
    $scope.showImageOne = false;
    $scope.showImageTwo = false;

    /**********end cotroller ************/
    //编辑商品改变状态

    $scope.editGood = function(){
        $(".edit").css("display","block");
        $(".ok").css("display","none");
    };
    $scope.edit=function(){
        $(".yes").css("display","block");
    };

    /************ 商品类型接口 ****************/
    $http({
        url:$scope.apiUrl_findGoodsType,
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: $.param($scope.paramFindGoodsType)
    }).success(function(response){
        if(response.status == 200){
            $scope.mod_findgoodsTypeList = response.data;
            console.log($scope.mod_findgoodsTypeList);
        }else if(response.status == 401){

            $cookies.remove('loginStatus');
            $cookies.remove('loginUserId');
            window.location.href="/app/index.html#/";
            window.location.reload();
            console.log("对不起,"+response.statusText);
        }else{
            alert("对不起,"+response.statusText);
        }

    }).error(function(){
        console.log("请求失败");
    });

    /**************** 得到商品详情 **************/
    $http({
        //请求地址
        url:$scope.apiUrl_getGoods,
        //请求方法
        method:"POST",
        //请求头
        headers:{
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: $.param($scope.parm)
    }).success(function(response){
        if(response.status == 200){
            $scope.goodsDetaileList = response.data;
            console.log($scope.goodsDetaileList);
            $scope.mod_shangyouType = response.data.cardType;

            $scope.getGoodsType();

            $scope.detLables = $scope.goodsDetaileList.goodsLabels;
            //遍历商品分类列表找到对应的分类名称
            angular.forEach($scope.goodsClassifyList,function(data,index,array){
                if(data.classifyId == $scope.goodsDetaileList.classifyId){  // 判断对象id与请求拿到的参数是否一致
                    $scope.classifyName = data.name; // 如果一致,将对应的名字赋值给classifyName变量
                    console.log($scope.goodsClassifyList);
                }
            });

            // 遍历供应商列表的名称
            angular.forEach($scope.suppList,function(data,index,array){
                if(data.comp_id == $scope.goodsDetaileList.suppId){
                    $scope.suppName = data.comp_name;
                }
            });

            // 遍历发行商列表的名称
            angular.forEach($scope.pubList,function(data,index,array){
                if(data.pubId == $scope.goodsDetaileList.pubId){
                    $scope.pub_name = data.pubName;
                }
            });

            // 遍历商品类型的名称
            angular.forEach($scope.mod_findgoodsTypeList,function(data){
                if(data.code == $scope.goodsDetaileList.type){
                    $scope.goodsTypeText = data.text;
                }
            });

            // ue 展示html代码
            var ue = UE.getEditor('ueditorCotent');
            $(document).ready(function(){
                ue.ready(function() {//编辑器初始化完成再赋值
                    ue.setContent($scope.goodsDetaileList.goodsDesc);  //赋值给UEditor
                });
            });


        }else if(response.status == 401){

            $cookies.remove('loginStatus');
            $cookies.remove('loginUserId');
            window.location.href="/app/index.html#/";
            window.location.reload();
            console.log("对不起,"+response.statusText);
        }else{
            alert("对不起,"+response.statusText);
        }

    }).error(function(){
        console.log("请求商品详情失败!")
    });


    /************ 上游接口列表****************/
    $scope.getGoodsType = function(){
        $scope.paramGetGoodsType.type = $scope.goodsDetaileList.type; // 商品类型从商品详情里面获取
        $scope.paramGetGoodsType.compId = $scope.goodsDetaileList.suppId; // 商品类型从商品详情里面获取
        console.log("查询接口列表被调用了");
        $http({
            url:$scope.apiUrl_getGoodsType,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.paramGetGoodsType)
        }).success(function(response){
            console.log($scope.paramGetGoodsType);
            console.log(response.data);
            if(response.status == 200){
                $scope.mod_getGoodsTypeList = response.data;
                console.log($scope.mod_getGoodsTypeList);

                if(response.data.length == 0){
                    $scope.mod_shangyouType = "";
                    console.log($scope.mod_shangyouType);
                    return;
                }
                else{
                    angular.forEach($scope.mod_getGoodsTypeList,function(type){
                        if($scope.goodsDetaileList.cardType == type.code){
                            $scope.goodsTypeDesc = type.desc;
                            $scope.mod_shangyouType = type.code;
                            console.info($scope.mod_shangyouType);
                        }else{
                            $scope.mod_shangyouType = $scope.mod_getGoodsTypeList[0].code;
                        }
                    });
                }

            }else if(response.status == 401){

                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
                console.log("对不起,"+response.statusText);
            }else{
                alert("对不起,"+response.statusText);
            }

        }).error(function(){
            console.log("请求失败");
        });
    };


    //修改商品信息请求
    $scope.saveGoods = function(){

        // 获取ue的内容
        var editText = UE.getEditor('ueditorCotent').getContent();


        // 商品类别选中项
        var detGoodClass=$("#detGoodClaas option:selected");  //获取选中的项
        $scope.detClassify = (detGoodClass.text());   //拿到选中项的文本
        angular.forEach($scope.goodsClassifyList,function(data,index,array){ //商品分类筛选
            if($scope.detClassify == data.name){
                $scope.detClassId = data.classifyId;
            }
        });

        //供应商选中项
        var detSuppList = $("#detSuppList option:selected");
        $scope.detSupp = (detSuppList.text());
        angular.forEach($scope.suppList,function(data,index,array){
            if($scope.detSupp == $scope.suppList[index].comp_name){
                $scope.detSuppId = $scope.suppList[index].comp_id;
            }
        });

        //发行商选中项
        var detPubList = $("#detPubList option:selected");
        $scope.detPub = (detPubList.text());
        //alert($scope.detPub);
        angular.forEach($scope.pubList,function(data,index,array){
            if($scope.detPub == $scope.pubList[index].pubName){
                $scope.detPubId = $scope.pubList[index].pubId;
            }
        });

        // 遍历当前商品标签
        $scope.labelStr = "";
        $scope.labelArray = [];
        angular.forEach($scope.detLables,function(data){
            $scope.labelArray.push(data.id);
        });
        $scope.labelStr = $scope.labelArray.join(",");
        $scope.updetParm= { //修改商品详情接口地址
            goodsId:$scope.goodsId,
            classifyId:$scope.detClassId,
            suppId:$scope.detSuppId,
            pubId:$scope.detPubId,
            cardType:$scope.mod_shangyouType,
            type:$scope.goodsDetaileList.type,
            goodsName:$scope.goodsDetaileList.goodsName,
            suppGoodsId : $scope.goodsDetaileList.suppGoodsId,
            amount:$scope.goodsDetaileList.amount,
            inPrice:$scope.goodsDetaileList.inPrice,
            outPrice:$scope.goodsDetaileList.outPrice,
            weight:$scope.goodsDetaileList.weight,
            customerMobile:$scope.goodsDetaileList.customerMobile,
            goodsLabels:$scope.labelStr,
            pictureUrls:$scope.goodsDetaileList.pictureUrls,
            fistPicUrl:$scope.goodsDetaileList.fistPicUrl,
            isHot:$scope.goodsDetaileList.isHot,
            isSeckill:$scope.goodsDetaileList.isSeckill,
            isLimited:$scope.goodsDetaileList.isLimited,
            goodsAd:$scope.goodsDetaileList.goodsAd,
            goodsDesc:editText,
            area:$scope.goodsDetaileList.area
        };
        console.log($scope.updetParm);
        $http({
            //请求地址
            url:$scope.apiUrl_editGoods,
            //请求方法
            method:"POST",
            //请求头
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.updetParm)
        }).success(function(response){
             if(response.status ==200){
                //alert("恭喜您,更新商品成功!");
                $("#delete_or_not_box").css("display","block");
                $timeout(function(){

                    $("#delete_or_not_box").css("display","none");

                },2000)

            }else if(response.status == 401){

                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href="/app/index.html#/";
                window.location.reload();
                console.log("对不起,"+response.statusText);
            }else{
                console.log(response.status);
                $("#error").css("display","block");
                $timeout(function(){
                    $("#error").css("display","none");

                },1000);

                $scope.statustext = response.statusText;
                console.log(response.statusText);
            }
            console.log(response);
        }).error(function(){
            console.log("调用修改商品详情接口失败!");
            alert("页面出错,请尝试刷新");
        })
    };

    //添加后消失
    $scope.sure_delete_or_not = function(){

        $("#delete_or_not_box").css("display","none");
    };

    //文件上传后,获得图片的url地址
    $scope.uploadImg=function(event){
        event.stopImmediatePropagation();//阻止事件冒泡
        console.log(event);
        console.log(event.target.multiple);
        var multipleStatus = event.target.multiple;
        console.log(event.target.files);
        var fileNum = event.target.files.length;
        console.log(fileNum);
        if( fileNum < 1)
        {
            //alert("太懒啦!请至少需要上传一张图片");

            $scope.showGoods = false;
            $scope.showImageOne = true;
            $scope.showImageTwo = false;
            $("#delete_or_not_box").css("display","block");
            $timeout(function(){

                $("#delete_or_not_box").css("display","none");

            },2000)

        }
        else if(fileNum > 5)
        {
            //alert("太贪心啦!最多可上传5张哦");
            $scope.showGoods = false;
            $scope.showImageOne = false;
            $scope.showImageTwo = true;
            $("#delete_or_not_box").css("display","block");
            $timeout(function(){

                $("#delete_or_not_box").css("display","none");

            },2000)

        }
        else
        {
            $scope.file = event.target.files;
            console.log($scope.file);

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
            }).success(
                function(response){
                    if(response.status == 200){
                        console.log(response.data);
                        console.log($scope.file);
                        if(fileNum == 1 && false == multipleStatus)
                        {
                            $scope.goodsDetaileList.fistPicUrl = response.data[0];
                        }
                        else if(fileNum == 1 && true == multipleStatus)
                        {
                            console.log(response.data);
                            $scope.goodsDetaileList.pictureUrls = response.data.join(",");
                            console.log($scope.goodsDetaileList.pictureUrls);
                        }
                        else if(fileNum <= 5 && fileNum > 1)
                        {
                            console.log(response.data);
                            $scope.goodsDetaileList.pictureUrls = response.data.join(",");
                            console.log($scope.goodsDetaileList.pictureUrls);
                        }
                    }
                    else if(response.status == 500) {

                        alert("对不起"+response.statusText);

                    }else if(response.status == 401){

                        $cookies.remove('loginStatus');
                        $cookies.remove('loginUserId');
                        window.location.href="/app/index.html#/";
                        window.location.reload();
                        console.log("对不起,"+response.statusText);
                    }else{
                        alert(response.statusText) ;
                    }
                }
            ).error(
                function(response){
                    console.log("上传文件请求失败");
                    console.log(response);
                    alert("获取图片url地址失败");
                }
            );
        }
    };
    $scope.pageAdjust();

}
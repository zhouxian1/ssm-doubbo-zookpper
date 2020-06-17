angular.module("webClassify",[])
    .component("webClassify",{
        templateUrl:"app/web/web-webClassify.html",
        controller:webClassifyCtrl

    })
    .directive('customOnChange',function(){//用于file上传文件,定义一个属性,执行这个方法
        return{
            restrict:"A",//表示是一个attribute是一个属性
            link:function(scope,element,attrs){
                var onChangeHandler = scope.$eval(attrs.customOnChange);//运行时赋值customOnChange或者可以用$parse(attrs,customOnChange)
                element.bind('change',onChangeHandler);//赋值绑定在这个时件上
            }
        }
    });
function webClassifyCtrl($scope,$http,$timeout){

    $scope.templateUrl = "/website/add_play_img";//添加或修改轮播图或楼层
    $scope.templateQuery = "/website/website_play_list";//查询楼层
    $scope.templateUrlImg = "/website/add_play_img";//添加图片的接口//添加楼层//编辑商品
    $scope.templateUrlDelete = "/website/delete_play_img";//删除楼层
    $scope.templateUrlAdd = "/website/add_floor_goods";//添加楼层商品


    $scope.parmGoods = {};//添加楼层商品
    $scope.parmDelete = {};//删除楼层
    $scope.parmAddCell = {};//添加楼层
    $scope.query = {isFloor:1};//查询楼层需要传一个值
    $scope.parmFloor = {};//查询楼层//编辑商品//传值为0时是下架
    $scope.addGoodsFloor = ""; //楼层id
    $scope.addGoodsId = ""; //添加商品的id号



    $scope.showImg = function(webId){
        $("#showImg").css("display","block");
        console.log(webId);
        $scope.parmFloor.websiteId=webId;
        console.info($scope.parmFloor.websiteId);
    };
    /***************下架*********************/
    $scope.shelf = function(shelfId){
        $scope.parmFloor.websiteId=shelfId;
        console.info($scope.parmFloor.websiteId);
        $scope.parmFloor.isGrounding=0;
        $http({
            url:$scope.templateUrlImg,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.parmFloor)

        }).success(
            function(response){
                console.log($scope.parmFloor);
                console.log("下架成功");
                if(response.status==200){
                    //alert("下架成功");
                    $("#delete_or_not_box").css("display","block");
                    $timeout(function(){

                    },2000)

                }else{
                    alert("下架失败"+response.statusText)
                }
                console.info(response);
                $scope.queryFloorPlayList();

            }
        ).error(
            function(response){
                console.log("下架失败");
                console.log(response);
            }
        );
    };

    //添加手机号成功后消失
    $scope.sure_delete_or_not = function(){

        $("#delete_or_not_box").css("display","none");
    };
    /*************上架******************/
    $scope.shelfAdd = function(shelfAdd){
        $scope.parmFloor.websiteId=shelfAdd;
        $scope.parmFloor.isGrounding=1;
        console.info($scope.parmFloor.websiteId);
        $http({
            url:$scope.templateUrlImg,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.parmFloor)

        }).success(
            function(response){
                console.log($scope.parmFloor);
                console.log("上架成功");
                console.info(response);
                $scope.addShelf=response.data;
                console.log($scope.addShelf);
                $scope.queryFloorPlayList();
                alert("上架成功");
                //alert("上传图片成功");

            }
        ).error(
            function(response){
                console.log("下架失败");
                console.log(response);
            }
        );
    };

    /****************上传图片***************/
    $scope.fireImg = function(){
        $("#showImg").css("display","none");
        console.log($scope.addImgUrl);
        $scope.parmFloor.imgUrl=$scope.addImgUrl;
        console.info($scope.parmFloor.imgUrl);
        $http({
            url:$scope.templateUrlImg,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.parmFloor)

        }).success(
            function(response){
                console.log($scope.parmFloor);
                console.log("添加图片成功");
                console.info(response);
                $scope.queryFloorPlayList();
                //alert("上传图片成功");

            }
        ).error(
            function(response){
                console.log("添加图片失败");
                console.log(response);
            }
        );

    };
    $scope.uploadFile = function(event){
        event.stopImmediatePropagation();//阻止事件冒泡
        var file=event.target.files[0];
        $scope.file=file;
        console.info("选取文件:");
        console.log($scope.file);

        $http({
            url:"http://tmms.gxcards.com/cmsComm/fileUpload",
            method:"POST",
            headers:{
                "Content-Type":undefined
            },
            data:{
                file:$scope.file
            },
            transformRequest:function(data){
                var formData=new FormData();
                angular.forEach(data,function(value,key){
                    formData.append(key,value);
                });
                return formData;
            }
        }).success(
            function(response){
                alert("请求上传文件接口成功");
                console.log(response);
                $scope.addImgUrl=response.data[0];
                console.log($scope.addImgUrl);
            }
        ).error(
            function(response){
                console.info("请求上传文件接口失败");
                console.info(response);
            }
        )
    };

    /**************编辑之后出现模态框*************************/
    $scope.editClass = function(index){
        console.log(index);
        $(".editOk").css("display","none");
        $scope.editShowList=$(".editShow");
        //console.log(editShowList[0]);
        var editShowNow=$scope.editShowList;
        console.log(editShowNow);
        $scope.editShowList.css("display","block");
    };
    $scope.editClass2=function(){
        $(".editOk2").css("display","none");
        $(".editShow2").css("display","block");
    };
    $scope.addGoodsAll=function(floorId){

        $("#show").css("display","block");
        console.log("商品类别是:");

        $scope.thisFloorId = floorId;
        console.log($scope.thisFloorId);

    };

    /******************添加楼层***************************/
    $scope.addCell = function(){
        $("#showCell").css("display","block");
    };
    $scope.addCellCell=function(data){
        $("#showCell").css("display","none");
        $scope.parmAddCell.imgUrl=$scope.addImgUrl;
        console.info($scope.parmFloor.imgUrl);
        $http({
            url:$scope.templateUrlImg,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.parmAddCell)

        }).success(
            function(response){
                console.log($scope.parmAddCell);
                if(response.status == 500){
                    alert("该楼层已经存在,不能添加相同楼层编号");
                }else if(401 == response.status){
                    alert("对不起"+response.statusText);
                }
                console.log("添加楼层成功");
                console.info(response);
                $scope.queryFloorPlayList();

            }
        ).error(
            function(response){
                console.log("添加楼层失败");
                console.log(response);
            }
        );
        $scope.queryFloorPlayList();
    };

    /****************添加楼层商品**********************/
    $scope.editPut = function(index){
        $(".showPutOk").css("display","none");
        $(".showPut").css("display","block");
        console.log(index);

    };
    //编辑商品
    $scope.newShop = function(wd){
        $scope.parmFloor.websiteId=wd;
        console.log($scope.parmFloor.websiteId);
        $http({
            url:$scope.templateUrlImg,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.parmFloor)

        }).success(
            function(response){
                console.info($scope.parmFloor);
                console.info("编辑商品成功");
                console.info(response);
                $scope.queryFloorPlayList();
                //alert("上传图片成功");

            }
        ).error(
            function(response){
                console.log("编辑商品失败");
                console.log(response);
            }
        );
        $scope.queryFloorPlayList();
    };

    /********************添加商品*********************/
    $scope.addGoodsShop = function(){


        $("#show").css("display","none");
        $scope.parmGoods = {

            floorId :$scope.thisFloorId,
            goodsId : $scope.addGoodsId
        };
        $http({
            url:$scope.templateUrlAdd,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.parmGoods)

        }).success(
            function(response){

               console.info(response);
                if(200 == response.status){

                    alert("请求添加商品成功");
                    console.log(response);

                }else if(401 == response.status){
                    alert("对不起"+response.statusText);
                }else{

                    alert("添加商品失败"+","+response.statusText);
                }
            }
        ).error(
            function(response){
                alert("添加商品失败");
            }
        )
    };

    /*************删除楼层*********************/
    $scope.deleteCellAll = function(index){
        console.log(index);
        console.log($scope.floorPlayList[index]);//得到这层楼层的下标
        $scope.parmDelete={
            websiteId:$scope.floorPlayList[index].websiteId
        };
        console.log($scope.parmDelete);
        $scope.floorPlayList.splice(index,1);//删除当前下标为1的楼层
        $http({
            url:$scope.templateUrlDelete,//删除接口
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.parmDelete)
        }).success(
            function(response){
                console.log(response);
                console.log("请求删除成功");
                //alert("请求删除成功")
            }
        ).error(
            function(){
                console.log("请求删除失败");
                //alert("请求删除失败")
            }
        );
        $scope.queryFloorPlayList();

    };

    /***************点击按钮消失*********************/
    $scope.fade = function(){
        $("#showImg").css("display","none");
    };
    $scope.fadeMessage = function(){
        $("#showCell").css("display","none");
    };
    $scope.fadeShop = function(){
        $("#show").css("display","none");
    };

    /**************查询楼层**************************/
    $scope.queryFloorPlayList = function(){
        $http({
            url:$scope.templateQuery,
            method: "POST",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"// form形式提交
            },
            data: $.param($scope.query)
        }).success(
            function(response){
                console.log("查询楼层成功");
                console.log(response);
                $scope.floorPlayList=response.data;
                console.log($scope.floorPlayList);//得到整个楼层的列表
                //$scope.imgPlayList.websiteId=wesiteId;
                $scope.upGroundList=[];//建立一个上架楼层的空数组
                $scope.downGroundList=[];//建立一个下架楼层的空数组
                angular.forEach($scope.floorPlayList,function(data){//遍历整个楼层
                    if(data.isGrounding==1){//如果isGrounding是1的话就把当前的数组压入上架楼层的空数组
                        $scope.upGroundList.push(data);
                    }else{
                        $scope.downGroundList.push(data);//否侧就把当前数组下架楼层的数组
                    }
                });

                var compare=function(obj1,obj2){//声明一个方法进行排序
                    var val1=obj1.floorId;
                    var val2=obj2.floorId;
                    if(val1>val2){
                        return 1;
                    }else if(val1<val2){
                        return -1;
                    }else{
                        return 0;
                    }
                };
                $scope.upGroundList.sort(compare);//用sort方法进行排序
                $scope.downGroundList.sort(compare);

                angular.forEach($scope.upGroundList,function(data,index){//遍历整个上架楼层
                    //data.floorId=index+1;//得到当前数组的楼层,遍历一次就在这个基础上加上一次
                    data.showFloorId  = index + 1;
                });
                angular.forEach($scope.downGroundList,function(data,index){

                    //data.floorId=index+1;
                    data.showFloorId  = index + 1;

                });
                console.log($scope.upGroundList);//上架楼层的数组
                console.log($scope.downGroundList);//下架楼层的数组
            }
        ).error(
            function(response){
                console.log("查询楼层失败");
                console.log(response);
            }
        )
    };
    $scope.queryFloorPlayList();
    $scope.pageAdjust();

}
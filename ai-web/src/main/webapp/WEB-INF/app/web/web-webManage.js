angular.module("webManage",[])
    .component("webManage",{
        templateUrl:"app/web.web-webManage.html",
        controller:webManageCtrl
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

function webManageCtrl($scope, $http , $timeout){
    /**************url接口***************************/
    $scope.apiUrl_addGoods="/website/add_play_img";//添加轮播图的接口
    $scope.templateDelete="/website/delete_play_img";//删除轮播图

    /********************定义变量*************************/
    $scope.parmImg={classifi:"",floorId:"",eventUrl:"",imgUrl:"",isGrounding:""};

    $scope.showFade = false;
    $scope.show = true;
    $scope.showImage = false;

    /***************点击按钮时显示*************************/
    $scope.fireAll=function(){
        $("#show").css("display","block");

    };
    $scope.editDelete=function(){
        $(".ok").css("display","block");
    };


    /******************确认上传轮播图******************/
    $scope.fireImg=function(){

        $scope.parmImg.imgUrl=$scope.addImgUrl;//把选取文件中的url地址赋值给确认上传的url地址
        $scope.parmImg.websiteId=$scope.imgPlayList.websiteId;
        $scope.parmImg.classifi=$scope.imgPlayList.classifi;
        $scope.parmImg.isFloor=-1;
        $scope.parmImg.eventUrl=$scope.imgPlayList.eventUrl;

        $("#show").css("display","none");//点击这个按钮时消失
        console.info($scope.parmImg);
        $http({
            url:$scope.apiUrl_addGoods,
            //url:templateUrlImg,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.parmImg)

        }).success(
            function(response){
                if(response.status == 200){

                    $scope.showFade = false;
                    $scope.show = false;
                    $scope.showImage = true;
                    $("#delete_or_not_box").css("display","block");
                    $timeout(function(){
                        $("#delete_or_not_box").css("display","none");
                    },2000)
                    //alert("上传图片成功");
                }else if(response.status == 403){
                    alert("对不起,客户端错误")
                }else if(401 == response.status){
                    alert("对不起"+response.statusText)
                }
                else{
                    alert("对不起"+response.statusText);
                }
                console.info(response);
                $scope.queryImgPlayList();
            }
        ).error(
            function(response){
                alert("添加图片失败");
                console.log(response);
            }
        );

    };

    /*******确认上传结束******************/

    $scope.uploadFile=function(event){
        event.stopImmediatePropagation();//阻止事件冒泡
        var file=event.target.files[0];
        $scope.file=file;
        console.log("选取文件:");
        console.log($scope.file);
    };
    //添加手机号成功后消失
    $scope.sure_delete_or_not = function(){

        $("#delete_or_not_box").css("display","none");
    };
    $scope.submitForm=function(){
        if(!$scope.file){

            $("#delete_or_not_box").css("display","block");
            $timeout(function(){
                $("#delete_or_not_box").css("display","none");
            },2000)

        }else{
            console.log("点击上传:");
            console.log($scope.file);
        };
        /*post提交数据,涉及到文件格式转换*/
        $http({
            //url:"http://101.201.51.207:8093/cmsComm/fileUpload",
            url:"/cmsComm/fileUpload",
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
                console.log("请求上传文件接口成功");
                $scope.show = false;
                $scope.showFade = true;
                $("#delete_or_not_box").css("display","block");
                $timeout(function(){
                    $("#delete_or_not_box").css("display","none");
                },2000);
                //$scope.responseImg=response;
                console.log(response);//得到一个数组里面的data数据是一个url地址
                $scope.addImgUrl=response.data[0];
                console.log($scope.addImgUrl);
                //console.info(responseImg);
            }
        ).error(
            function(response){
                console.log("请求上传文件接口失败");
                console.log(response);
            }
        );

    };
    //

    //页面加载完成过后,查询轮播的图片
    $scope.param={};
    $scope.queryImgPlayList=function(){
        $http({
            //url:"http://101.201.51.207:8093/website/website_play_list",
            url:"/website/website_play_list",
            method: "POST",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"// form形式提交
            },
            data: $.param($scope.param)
        }).success(
            function(response){
                console.log("查询轮播图成功");
                console.log(response);
                $scope.imgPlayList=response.data;
                console.log($scope.imgPlayList);
            }
        ).error(
            function(response){
                console.log("查询轮播图失败");
                console.log(response);
            }
        )
    };
    $scope.queryImgPlayList();
    /****************删除轮播图*******************/
    $scope.deleteCell=function(index){
     console.log(index);
     console.log($scope.imgPlayList[index]);
     $scope.parmIndex={
         websiteId:$scope.imgPlayList[index].websiteId
     };
     console.log($scope.parmIndex);
     $scope.imgPlayList.splice(index,1);
     $http({
         url:$scope.templateDelete,//删除接口
         method:"POST",
         headers:{
             "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
         },
         data: $.param($scope.parmIndex)
     }).success(
         function(response){
             console.log(response);
             console.log("请求删除成功");
             //alert("请求删除成功");
         }
     ).error(
         function(){
             console.log("请求删除失败");
         }
     )

    }
    $scope.pageAdjust();
}
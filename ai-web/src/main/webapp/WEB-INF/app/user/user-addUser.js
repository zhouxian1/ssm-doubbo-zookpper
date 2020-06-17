angular.module("addUser",[])
    .component("addUser",{
        templateUrl:"app/user/user-addUser.html",
        controller:addUserCtrl
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
function addUserCtrl($scope,$http,$cookies){
    $scope.isLogined=$cookies.get('loginStatus');
    $scope.loginUserId=$cookies.get('loginUserId');
    $scope.testText="addChannel页面测试文本";
    $scope.responseData=[];//设置返回结果变量
    //$scope.temlateUrl="http://101.201.51.207:8093/user/detail";//接口的路径
    $scope.temlateUrl="/user/detail";//接口的路径
    $scope.param={status:"0"};
    //$scope.save=function(){
    //    $http({
    //        url:$scope.temlateUrl,
    //        method:"POST",
    //        headers:{
    //            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"//FORM形式提交
    //        },
    //        data:$.param($scope.param)//返回的数据
    //    }).success(
    //        function(response){
    //            console.log($scope.param);
    //            console.log("请求成功");
    //            //$scope.responseData=response.data;
    //            //console.log($scope.responseData);
    //            console.log(response);//请求的内容
    //        }
    //    ).error(
    //        function(){
    //            console.log("请求失败");
    //        }
    //    );
    //};

    //文件上传后,获得图片的url地址
    $scope.uploadFile=function(event){
        event.stopImmediatePropagation();//阻止事件冒泡
        console.log(event);
        var file=event.target.files;
        $scope.file=[];
        for(var i=0;i<file.length;i++){
            $scope.file.push(file[i]);
        };
        console.log("选取文件:");
        console.log($scope.file);
        $http({
            //url:"http://101.201.51.207:8093/cmsComm/fileUpload",
            url:"/cmsComm/fileUpload",
            method:"POST",
            headers:{
//              "Content-Type":"multipart/form-data"
//              "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                "Content-Type":undefined
            },
            data:{
                //"goodsId":2,
                "file":$scope.file
            },
            transformRequest:function(data,headerGetter){//进行格式转换,非常关键
                var formData=new FormData();//将model转为表单格式
                angular.forEach(data,function(value,key){
                    //formData.append(key,value);
                    angular.forEach(value,function(val){
                        formData.append(key,val);
                    })
                });
//              var headers=headerGetter();
//              delete headers['Content-Type'];
                return formData;
            }
        }).success(
            function(response){
                if(200 == response.status){
                console.log("上传文件请求成功");
                console.log(response);
                console.log(response.data);
                //$scope.parm.pictureUrls=response.data;
                //alert("获取图片url地址成功");
                }else if(401 == response.status){
                    $cookies.remove('loginStatus');
                    $cookies.remove('loginUserId');
                    window.location.href="/app/index.html#/";
                    window.location.reload();
                }

            }
        ).error(
            function(response){
                console.log("上传文件请求失败");
                console.log(response);
                //alert("获取图片url地址失败");
            }
        );
    };
    $scope.pageAdjust();
}
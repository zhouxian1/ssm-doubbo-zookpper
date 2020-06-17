//声明路由模块addssuer
angular.module('addIssuer',[])
    .component('addIssuer',{//整个div的名称
        templateUrl:'app/channel/channel-addIssuer.html',
        controller:addIssuerCtrl//控制器叫addssuerCtrl相当于定义了一个函数
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

function addIssuerCtrl($scope,$http,$cookies,$timeout){//调用函数

    $scope.isLogined=$cookies.get('loginStatus');
    $scope.loginUserId=$cookies.get('loginUserId');
    //进行测试
    $scope.testText="addIssuer页面测试文本";
    $scope.responseData=[];//设置返回结果变量
    $scope.temlateUrl="/company/publisher_list";//接口的路径
    $scope.temlateUrl3="/company/edit_publisher";
    $scope.param2={file:""};
    $scope.param={};//即使没有参数也得写空
    $scope.param3={pubName:" ",remark:" ",desc:" "};//请求参数
    //请求发行商
    $http({
        url:$scope.temlateUrl,
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"//FORM形式提交
        },
        data:$.param($scope.param)//返回的数据
    }).success(
        function(response){
            console.log("请求成功");
            console.log(response);//请求的内容
            $scope.responseDataLength=response.data.length;//发行商的个数
            console.log("发行商个数"+$scope.responseDataLength);
            $scope.responseData=response.data;//请求内容里面的数据
            console.log($scope.responseData);//打印出返回来的数据
        }
    ).error(
        function(){
            console.log("请求失败");
        }
    );

 // 添加发行商接口
    $scope.addPublisher=function(){


        $http({
            url:$scope.temlateUrl3,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"//FORM形式提交
            },
            data:$.param($scope.param3)//返回的数据
        }).success(
            function(response){
                console.log("请求成功");
                console.log(response);//请求的内容
                if(200 == response.status){
                    //alert("添加发行商成功");
                    $("#delete_or_not_box").css("display","block");
                    $timeout(function(){
                        $("#delete_or_not_box").css("display","none");

                    },1000)

                }else if(401 == response.status){
                    $cookies.remove('loginStatus');
                    $cookies.remove('loginUserId');
                    window.location.href="/app/index.html#/";
                    window.location.reload();
                }else{

                    $scope.statustext  = response.statusText;
                    $("#error").css("display","block");
                    $timeout(function(){
                        $("#error").css("display","none");

                    },1000);


                }
            }
        ).error(
            function(){
                console.log("请求失败");
            }
        );
    };

    //添加消失
    $scope.sure_delete_or_not = function(){

        $("#delete_or_not_box").css("display","none");
    };

//文件上传后,获得发行商logo的url地址
    $scope.uploadImg=function(event){
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
            url:"/cmsComm/fileUpload",
            method:"POST",
            headers:{
                "Content-Type":undefined
            },
            data:{
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
                return formData;
            }
        }).success(
            function(response){
                console.log("上传文件请求成功");
                console.log(response.data);
                $scope.param3.logo=response.data[0];
                console.log($scope.param3.logo);
                if(response.status == 200){
                    console.log("获取发行商logo的url地址成功");
                }else  if(401 == response.status){

                    $cookies.remove('loginStatus');
                    $cookies.remove('loginUserId');
                    window.location.href="/app/index.html#/";
                    window.location.reload();
                }else{
                    console.log(response.status);
                    $("#error").css("display","block");
                    $timeout(function(){
                        $("#error").css("display","none");

                    },1000);

                    $scope.statustext = response.statusText;
                    console.log(response.statusText);
                }
            }
        ).error(
            function(response){
                console.log("上传文件请求失败");
                console.log(response);
               alert("获取发行商logo的url地址失败");
            }
        );
    };
    $scope.know = function(){
        $("#error").css("display","none");
    };

}

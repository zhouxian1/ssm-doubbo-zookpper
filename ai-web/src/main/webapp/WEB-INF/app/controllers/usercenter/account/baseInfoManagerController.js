/**
 * Created by HP on 2017/8/26.
 */
define(['app'], function(app) {

    app.controller('baseInfoManagerController', baseInfoManagerController);
    baseInfoManagerController.$inject = ['$scope','$location','userCenterService','$cookies','baseUrl','FileUploader'];

    function baseInfoManagerController($scope,$location,$userCenterService,$cookies,baseUrl,FileUploader) {

        var services = $userCenterService.lists;
        var url = baseUrl + services.uploadImg();

        $scope.user={
            access_token:$cookies.get("access_token"),
            role:$cookies.get("role"),
            user_name:$cookies.get("user_name"),
            user_id:$cookies.get("user_id")
        };
        $scope.userInfo={};
        $scope.cover_url='';
        if($cookies.get("user_id")){
            services.getUserDetail($cookies.get("user_id")).then(function (res) {
                if(res.status == 200||res.data.code==1000){
                    $scope.userInfo=res.data.data;
                    $scope.cover_url=$scope.userInfo.avatar_url;
                    console.log( $scope.userInfo);
                }else{
                    alert("请求服务器失败");
                }
            });
        }else{
            $location.path("/");
        }
        $scope.saveImg=function () {
            if($cookies.get("user_id")){
                if (!$scope.cover_url){
                    return false;
                }
                services.saveImg($cookies.get("user_id"), $scope.cover_url).then(function (res) {
                    if(res.status == 200||res.data.code==1000){
                        // $scope.userInfo=res.data.data;
                        // console.log( $scope.userInfo);
                        $scope.userInfo.avatar_url=$scope.cover_url;
                        angular.element('#myModal').css('display','none');
                        angular.element('#myModal').removeClass('in');
                        angular.element('#myModal').attr('style','display: none;');
                        angular.element('.modal-backdrop').remove();
                        angular.element('body').removeClass('modal-open');
                        angular.element('body').removeAttr('style');
                    }else{
                        alert("请求服务器失败");
                    }
                });
            }else{
                $location.path("/");
            }
        };

        // 上传封面
        $scope.uploader = new FileUploader({
            url: url,
            queueLimit: 1, // 最大上传文件数量
            formData: [{
                'classification': 'user'
            }],
            filters: [{
                name: 'imageFilter',
                fn: function(item, options) {
                    console.log(item);
                    if(item.size>1024*1024){
                        alert("图像必须小于1M！");
                    }
                    console.log(options);
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            }]
        });
        $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.log(fileItem);
            console.log(response);
            console.log(status);
            console.log(headers);
            if (response.code === 1018) {
                $scope.cover_url = response.data.remote_url;
                console.log(response.data.remote_url);
            }
            $scope.data1_cover_msg = response.msg;
        };

        console.log($scope.uploader);



    }
});
/**
 * Created by liuping on 17/8/7.
 */
//声明路由模块inStock
angular.module("addBanner",[])
    .component("addBanner",{
        templateUrl:"app/web/addBanner.html",
        controller:addBannerManageCtrl
    });
function addBannerManageCtrl($scope,$routeParams,$http,FileUploader,$location){
    $scope.bannerId = $routeParams.id;
    //url
    $scope.api_url = $scope.commonUrl+"v1/admin/rotations/store";//添加轮播图
    $scope.api_upload = $scope.commonUrl+"v1/upload"
    //轮播详情/v1/admin/labels/rotations/1
    $scope.api_rotations = $scope.commonUrl+"v1/admin/rotations/getone";//详情
    //更新v1/admin/rotations/update
    $scope.api_update = $scope.commonUrl+"v1/admin/rotations/update"

    //参数
    $scope.param_addBanner = {}
    $scope.mod_groupid = "";
    $scope.mod_name = "";
    $scope.mod_image = "";
    $scope.mod_url = "";
    $scope.mod_sort = 1;
    //详情
    $scope.rotationsDetail = function(){
        $http({
            url:$scope.api_rotations+"/"+$scope.bannerId,
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).success(function(res){
            console.log(res)
            if(res.code == 1000){
                console.log(res)
                $scope.mod_name = res.data.name;
                $scope.mod_image = res.data.image;
                console.log($scope.mod_image)
                $scope.mod_url = res.data.url


            }
        })
    };
    $scope.rotationsDetail()

    $scope.addBanner = function(){

        if($scope.bannerId == null || $scope.bannerId ==undefined || $scope.bannerId==""){
            $scope.param_addBanner.groupid = 1
            $scope.param_addBanner.name = $scope.mod_name;
            $scope.param_addBanner.image = $scope.mod_image;
            $scope.param_addBanner.url = $scope.mod_url
            $http({
                url:$scope.api_url,
                method:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                },
                data:$.param($scope.param_addBanner)
            }).success(function(res){
                if(res.code == 1000){
                    swal("添加轮播成功")
                    $location.path("/webBanner")
                    //
                }else{
                    swal(res.msg)
                }
            })
        }else{
            $scope.param_addBanner.groupid = 1
            $scope.param_addBanner.name = $scope.mod_name;
            $scope.param_addBanner.image = $scope.mod_image;
            $scope.param_addBanner.url = $scope.mod_url
            $scope.param_addBanner.id = $scope.bannerId
            $http({
                url:$scope.api_update,
                method:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                },
                data:$.param($scope.param_addBanner)
            }).success(function(res){
                if(res.code == 1000){
                    swal("更新轮播成功")
                    $location.path("/webBanner")
                }else{
                    swal(res.msg)
                }
            })
        }

    }
    $scope.uploader = new FileUploader({
        url: $scope.api_upload,
        //queueLimit: 1, // 最大上传文件数量
        formData:[{
            'classification':'other'
        }],
        filters: [{
            name:'imageFilter',
            fn: function(item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        }]
    });

    // 添加文件到上传队列失败后
    $scope.uploader.onWhenAddingFileFailed = function(item, filter, options) {
        //console.info('onWhenAddingFileFailed', item, filter, options);
    };

    // 添加文件到上传队列后
    $scope.uploader.onAfterAddingFile = function(fileItem) {
        //console.info('onAfterAddingFile', fileItem);
    };

    // 文件上传之前
    $scope.uploader.onBeforeUploadItem = function(item) {
        //console.info('onBeforeUploadItem', item);
    };

    // 文件上传中
    $scope.uploader.onProgressItem = function(fileItem, progress) {
        //console.info('onProgressItem', fileItem, progress);
    };

    // 文件上传成功后
    $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
        console.info(fileItem);
        $scope.mod_image = response.data.remote_url;
        console.log($scope.mod_image)

    };

    // 文件上传失败后
    $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
        //console.info('onErrorItem', fileItem, response, status, headers);
    };




}
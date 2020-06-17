define(['app'], function(app) {
    app.controller('releasePluginunitController', releasePluginunitController);
    releasePluginunitController.$inject = ['$scope', '$location','baseUrl', '$state', 'releasePluginunitService', 'FileUploader','$cookies'];

    function releasePluginunitController($scope, $location, baseUrl, $state, releasePluginunitService, FileUploader,$cookies) {
        var services = releasePluginunitService.lists;

        // 图片上传地址
        // var url = 'http://www.geovis.me/api/v1/upload';
        // console.log(baseUrl)
        var url = baseUrl + services.uploadImg();
        // console.log(url)

        $scope.data1 = {}; // 无服务
        $scope.data1.type = 1; // 类型默认
        $scope.data2 = {}; // 有服务
        $scope.data2.type = 1; // 类型默认

        // 获取标签 标签类型1
        services.getLabels(1).then(function(res) {
            if (res.status === 200) {
                $scope.labels_no = [];
                $scope.labels_have = [];
                $scope.labels_no = angular.copy(res.data.data.data);
                for (var i = 0, len = $scope.labels_no.length; i < len; i++) {
                    $scope.labels_have.push(angular.copy($scope.labels_no[i]));
                }
            }
        });

        // 有服务？无服务的选择
        $scope.currentOrder = 'noService';
        $scope.order = [
            { name: '有服务', active: false, type: 'haveService1' },
            { name: '无服务', active: true, type: 'noService' },
        ];
        $scope.ckOrder = function(list) {
            $scope.currentOrder = list.type;
            for (var i = 0, len = $scope.order.length; i < len; i++) {
                if ($scope.order[i].name === list.name) {
                    $scope.order[i].active = true;
                } else {
                    $scope.order[i].active = false;
                }
            }
        }
        // 下一步
        $scope.nextStep = function() {
            $scope.currentOrder = 'haveService2';
        }

        $scope.type = [
            { name: '挂件', id: 1 },
            { name: '工具', id: 2 }
        ]; // 类型数据
        // 标签点击
        $scope.data1.label_ids = []; //标签id数组
        $scope.data2.label_ids = []; //标签id数组
        $scope.labelsObj_no = []; //标签对象数组
        $scope.labelsObj_have = []; //标签对象数组
        $scope.clickLabels = function(list, index) {
            if ($scope.currentOrder === 'noService') {
                if (list.active) {
                    for (var i = 0, len = $scope.labelsObj_no.length; i < len; i++) {
                        if ($scope.labelsObj_no[i].id === list.id) {
                            $scope.labelsObj_no.splice(i, 1);
                            break;
                        }
                    }
                    // list.active = false;
                    $scope.labels_no[index].active = false;
                } else {
                    $scope.labelsObj_no.push(list);
                    // list.active = true;
                    $scope.labels_no[index].active = true;
                }
                // 用来显示选中的标签  id // 每次循环前初始化
                var label_titles = [];
                $scope.data1.label_ids = [];
                for (var i = 0, len = $scope.labelsObj_no.length; i < len; i++) {
                    label_titles.push($scope.labelsObj_no[i].title);
                    $scope.data1.label_ids.push($scope.labelsObj_no[i].id);
                }
                $scope.selectedLabel_no = label_titles.join(',');
                // console.log($scope.data1.label_ids)
            } else {
                if (list.active) {
                    for (var i = 0, len = $scope.labelsObj_have.length; i < len; i++) {
                        if ($scope.labelsObj_have[i].id === list.id) {
                            $scope.labelsObj_have.splice(i, 1);
                            break;
                        }
                    }
                    // list.active = false;
                    $scope.labels_have[index].active = false;
                } else {
                    $scope.labelsObj_have.push(list);
                    // list.active = true;
                    $scope.labels_have[index].active = true;
                }
                // 用来显示选中的标签 id // 每次循环前初始化
                $scope.data2.label_ids = [];
                var label_titles = [];
                for (var i = 0, len = $scope.labelsObj_have.length; i < len; i++) {
                    label_titles.push($scope.labelsObj_have[i].title);
                    $scope.data2.label_ids.push($scope.labelsObj_have[i].id);
                }
                $scope.selectedLabel_have = label_titles.join(',');
            }
        }
        // 取消
        $scope.cancel = function() {
            // $location.path('/usercenter/home');
            // $state.go('usercenter.home');
            history.go(-1);
        }
        // 保存
        $scope.data3 = {};
        // $scope.data3.me='1';
        $scope.save = function() {

            if ($scope.currentOrder === 'noService') {
                $scope.data1.cover_url = optionsObj_data1_cover.who1; // 封面
                $scope.data1.image_urls = []; // 图数组
                for (var i = 0, len = optionsObj_data1_image.who1.length; i < len; i++) {
                    $scope.data1.image_urls.push(optionsObj_data1_image.who1[i].url);
                }
                // $scope.data1.image_urls = "[123,312312]";
                // $scope.data1.label_ids = "[1,2,11]";
                $scope.data1.video_url = optionsObj_data1_video.who1; // 视频地址
                $scope.data1.pluginsbox_url = optionsObj_data1_pluginsbox.who1; // 插件地址
                console.log('data1')
                console.log($scope.data1)
                // $http({
                //         url: 'http://www.geovis.me/v1/app/plugins/update',
                //         method:'POST',
                //         // headers: {'Content-Type':undefined},
                //         headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
                //         // headers: {'Content-Type':'application/json; charset=UTF-8'},
                //         transformRequest: angular.identity,
                //         data:$scope.data1
                //     }).then(function (data) {
                //         console.log(data);
                //         $scope.remoteUrl = data.data.remote_url;
                //     })
                // if ($scope.data1.cover_url !== null || variable1 !== undefined || variable1 !== '') {
                //     var variable2 = variable1;
                // }
                // if ($scope.data1.title !== null || $scope.data1.title !== undefined || $scope.data1.title !== '') {
                //     var variable2 = variable1;
                // }
                // if ($scope.data1.cover_url !== null || variable1 !== undefined || variable1 !== '') {
                //     var variable2 = variable1;
                // }
                // if ($scope.data1.cover_url !== null || variable1 !== undefined || variable1 !== '') {
                //     var variable2 = variable1;
                // }
                // type:1
                // user_id:123
                // label_ids:
                //     title:插件qqq
                // cover_url:
                //     image_urls:
                //         video_url:
                //             pluginsbox_url:
                //                 version:1
                // if (//标签
                //     $scope.data1.label_ids == null ||
                //     $scope.data1.label_ids  == undefined ||
                //     $scope.data1.label_ids  == ''||
                //     $scope.data1.label_ids.length==0
                // ){
                //     alert("标签列表必须选择!");
                // }else if(//封面
                //     $scope.data1.cover_url == null ||
                //     $scope.data1.cover_url  == undefined ||
                //     $scope.data1.cover_url  == ''
                // ){
                //     alert("封面必须上传!");
                //
                // }else if (//插件包
                //     $scope.data1.pluginsbox_url == null ||
                //     $scope.data1.pluginsbox_url  == undefined ||
                //     $scope.data1.pluginsbox_url  == ''
                // ){
                //     alert("插件包必须上传!");
                // }else if(//标题
                //     $scope.data1.title == null ||
                //     $scope.data1.title  == undefined ||
                //     $scope.data1.title  == ''
                // ){
                //     alert("标题必须填写!");
                // }else if(
                //     $scope.data1.version == null ||
                //     $scope.data1.version  == undefined ||
                //     $scope.data1.version  == ''
                // ){
                //     alert("版本号必须填写!");
                // }else{
                    if($cookies.get("user_id")){
                        $scope.data1.user_id=$cookies.get("user_id");
                        services.save($scope.data1).then(function(res) {
                            if (res.data.code === 1000) {
                                // alert("发布成功!");
                                $location.path('/usercenter');
                            }else{
                                alert(res.data.msg );
                            }
                        });
                    }else{
                        alert("请登录后再试！");
                    }

                // }

            } else if ($scope.currentOrder === 'haveService1') {
                $scope.data2.cover_url = optionsObj_data2_cover.who1; // 封面
                $scope.data2.image_urls = []; // 图数组
                for (var i = 0, len = optionsObj_data2_image.who1.length; i < len; i++) {
                    $scope.data2.image_urls.push(optionsObj_data2_image.who1[i].url);
                }
                $scope.data2.video_url = optionsObj_data2_video.who1; // 视频地址
                $scope.data2.servicebox_url = optionsObj_data2_pluginsbox.who1; //服务包地址
                console.log('data2')
                console.log($scope.data2);
                // if (//标签
                // $scope.data1.label_ids == null ||
                // $scope.data1.label_ids  == undefined ||
                // $scope.data1.label_ids  == ''||
                // $scope.data1.label_ids.length==0
                // ){
                //     alert("插件列表必须选择!");
                // }else if(//封面
                // $scope.data1.cover_url == null ||
                // $scope.data1.cover_url  == undefined ||
                // $scope.data1.cover_url  == ''
                // ){
                //     alert("封面必须上传!");
                //
                // }else if (//插件包
                // $scope.data2.pluginsbox_url == null ||
                // $scope.data2.pluginsbox_url  == undefined ||
                // $scope.data2.pluginsbox_url  == ''
                // ){
                //     alert("插件包必须上传!");
                // }else if(//标题
                // $scope.data2.title == null ||
                // $scope.data2.title  == undefined ||
                // $scope.data2.title  == ''
                // ){
                //     alert("标题必须填写!");
                // }else if(
                //     $scope.data2.version == null ||
                //     $scope.data2.version  == undefined ||
                //     $scope.data2.version  == ''
                // ){
                //     alert("版本号必须填写!");
                // }else{
                        if($cookies.get("user_id")){
                            $scope.data2.user_id=$cookies.get("user_id");
                            services.save($scope.data2).then(function(res) {
                                if (res.data.code === 1000) {
                                    $scope.nextStep();
                                    $scope.data3.id = res.data.data;
                                }else{
                                    alert(res.data.msg );
                                }});
                        }else{
                            alert("请登录后再试！");
                        }
                // }

            } else if ($scope.currentOrder === 'haveService2') {
                $scope.data3.pluginsbox_url = optionsObj_data3_pluginsbox.who1; //插件包地址
                if($cookies.get("user_id")){
                    $scope.data3.user_id=$cookies.get("user_id");
                    services.save($scope.data3).then(function(res) {
                        console.log(1+res);
                        if (res.data.code === 1000) {
                            alert("发布成功!");
                            $location.path('/usercenter/pluginunitmanage');
                        }else{
                            alert(res.data.msg );
                        }
                    });
                }else{
                    alert("请登录后再试！");
                }


            }

        };
        // 上传封面 无服务 data1
        // $scope.uploader_data1_cover = new FileUploader({
        //     url: 'http://www.geovis.me/api/v1/upload',
        //     queueLimit: 1, // 最大上传文件数量
        //     formData: [{
        //         'classification': 'plug'
        //     }],
        //     filters: [{
        //         name: 'imageFilter',
        //         fn: function(item, options) {
        //             var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        //             return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        //         }
        //     }]
        // });
        // $scope.uploader_data1_cover.onSuccessItem = function(fileItem, response, status, headers) {
        //     if (response.code === 1018) {
        //         console.log(response)
        //         $scope.data1.cover_url = response.data.remote_url;
        //         console.log(response.data.remote_url);
        //     }
        //     $scope.data1_cover_msg = response.msg;
        // };

        

        // 封面 无服务 data1_cover 一张
        var optionsObj_data1_cover = {
            var: 'uploader_data1_cover',
            url: url,
            queueLimit: 1,
            formData: { 'classification': 'plug' },
            who1: '',
            who2: 'data1_cover_msg',
            type: 'img'
        }
        getImgUrl(optionsObj_data1_cover);

        // 介绍图片  无服务 data1_image  一个数组
        var optionsObj_data1_image = {
            var: 'uploader_data1_image',
            url: url,
            queueLimit: 10,
            formData: { 'classification': 'plug' },
            who1: [],
            who2: 'data1_image_msg',
            type: 'img'
        }
        getImgUrl(optionsObj_data1_image);


        // 视频 无服务 data1_video 一个
        var optionsObj_data1_video = {
            var: 'uploader_data1_video',
            url: url,
            queueLimit: 1,
            formData: { 'classification': 'plug' },
            who1: '',
            who2: 'data1_video_msg',
            type: 'video'
        }
        getImgUrl(optionsObj_data1_video);

        // 插件文件 无服务 data1_pluginsbox 一张
        var optionsObj_data1_pluginsbox = {
            var: 'uploader_data1_pluginsbox',
            url: url,
            queueLimit: 1,
            formData: { 'classification': 'plug' },
            who1: '',
            who2: 'data1_pluginsbox_msg',
            type: 'file'
        }
        getImgUrl(optionsObj_data1_pluginsbox);












        // 封面 有服务 data2_cover
        var optionsObj_data2_cover = {
            var: 'uploader_data2_cover',
            url: url,
            queueLimit: 1,
            formData: { 'classification': 'plug' },
            who1: '',
            who2: 'data2_cover_msg',
            type: 'img'
        }
        getImgUrl(optionsObj_data2_cover);

        // 介绍图片  有服务 data2_image  一个数组
        var optionsObj_data2_image = {
            var: 'uploader_data2_image',
            url: url,
            queueLimit: 10,
            formData: { 'classification': 'plug' },
            who1: [],
            who2: 'data2_image_msg',
            type: 'img'
        }
        getImgUrl(optionsObj_data2_image);

        // 视频 有服务 data2_video 一个
        var optionsObj_data2_video = {
            var: 'uploader_data2_video',
            url: url,
            queueLimit: 1,
            formData: { 'classification': 'plug' },
            who1: '',
            who2: 'data2_video_msg',
            type: 'video'
        }
        getImgUrl(optionsObj_data2_video);
        // 插件服务包文件 有服务 data2_pluginsbox 一张
        var optionsObj_data2_pluginsbox = {
            var: 'uploader_data2_pluginsbox',
            url: url,
            queueLimit: 1,
            formData: { 'classification': 'plug' },
            who1: '',
            who2: 'data2_pluginsbox_msg',
            type: 'file'
        }
        getImgUrl(optionsObj_data2_pluginsbox);

        // 插件文件 有服务 data3_pluginsbox 一张
        var optionsObj_data3_pluginsbox = {
            var: 'uploader_data3_pluginsbox',
            url: url,
            queueLimit: 1,
            formData: { 'classification': 'plug' },
            who1: '',
            who2: 'data3_pluginsbox_msg',
            type: 'file'
        }
        getImgUrl(optionsObj_data3_pluginsbox);

        // 正在上传中的处理
        $scope.data1_video_loading = false;
        $scope.data1_pluginsbox_loading = false;
        $scope.data2_video_loading = false;
        $scope.data2_pluginsbox_loading = false;
        $scope.data3_pluginsbox_loading = false;
        $scope.loading = function(id) {
            if (id === 1) {
                $scope.data1_video_loading = true;
            } else if (id === 2) {
                $scope.data1_pluginsbox_loading = true;
            } else if (id === 3){
                $scope.data2_video_loading = true;
            } else if (id === 4){
                $scope.data2_pluginsbox_loading = true;
            } else if (id === 5){
                $scope.data3_pluginsbox_loading = true;
            }

        };

        // // 添加文件到上传队列失败后
        // $scope.uploader.onWhenAddingFileFailed = function(item, filter, options) {
        //     alert("添加文件到上传队列失败后");
        // };
        // // 文件上传失败后
        // $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
        //     alert("文件上传失败后");
        // };
        // // 文件上传取消后
        // $scope.uploader.onCancelItem = function(fileItem, response, status, headers) {
        //     //console.info('onCancelItem', fileItem, response, status, headers);
        //     alert("文件上传取消后");
        // };

        // 移除图片时，对数组的处理
        $scope.removeImg = function(i, n) {
            if (i.isSuccess) {
                var name = i._file.name;
                if (n === 1) {
                    for (var i = 0, len = optionsObj_data1_image.who1.length; i < len; i++) {
                        console.log(optionsObj_data1_image.who1[i].name)
                        if (optionsObj_data1_image.who1[i].name === name) {
                            optionsObj_data1_image.who1.splice(i, 1);
                        }
                    }
                }
                if (n === 2) {
                    for (var i = 0, len = optionsObj_data2_image.who1.length; i < len; i++) {
                        console.log(optionsObj_data2_image.who1[i].name)
                        if (optionsObj_data2_image.who1[i].name === name) {
                            optionsObj_data2_image.who1.splice(i, 1);
                        }
                    }
                }
            }
        };


        // 获取图片地址的函数
        function getImgUrl(optionsObj) {
            $scope[optionsObj.var] = new FileUploader({
                url: optionsObj.url,
                queueLimit: optionsObj.queueLimit, // 最大上传文件数量
                formData: [optionsObj.formData],
                filters: [{
                    name: 'imageFilter',
                    fn: function(item, options) {
                        console.log(item);
                        //var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        var type = '';
                        console.log(type);
                        if (optionsObj.type === 'img'){
                            return '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;
                        } else if (optionsObj.type === 'video') {
                            return '|mp4|avi|swf|'.indexOf(type) !== -1;
                        } else if (optionsObj.type === 'file') {
                            return '||vnd.openxmlformats-officedocument.wordprocessingml.document|vnd.ms-excel|msword|vnd.openxmlformats-officedocument.spreadsheetml.sheet|'.indexOf(type) !== -1;
                        }
                    }
                }]
            });


            $scope[optionsObj.var].onSuccessItem = function(fileItem, response, status, headers) {
                // console.log()
                if (response.code === 1018) {
                    console.log(response)
                    img_url = response.data.remote_url;
                    if (typeof optionsObj.who1 === 'string') {
                        optionsObj.who1 = response.data.remote_url;
                    } else {
                        optionsObj.who1.push({
                            name: response.data.name,
                            url: response.data.remote_url
                        });
                    }
                }
                switch (optionsObj.var) {
                    case 'uploader_data1_video':
                        $scope.data1_video_loading = false;
                        break;
                    case 'uploader_data1_pluginsbox':
                        $scope.data1_pluginsbox_loading = false;
                        break;
                    case 'uploader_data2_video':
                        $scope.data2_video_loading = false;
                        break;
                    case 'uploader_data2_pluginsbox':
                        $scope.data2_pluginsbox_loading = false;
                        break;
                    case 'uploader_data3_pluginsbox':
                        $scope.data3_pluginsbox_loading = false;
                        break;
                }
                $scope[optionsObj.who2] = response.msg;
            };
        }











    }
})
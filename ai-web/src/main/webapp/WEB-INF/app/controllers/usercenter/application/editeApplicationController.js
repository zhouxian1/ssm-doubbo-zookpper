define(['app'], function(app) {
    app.controller('editeApplicationController', editeApplicationController);
    editeApplicationController.$inject = ['$scope', '$location', 'baseUrl', 'releaseApplicationService', 'FileUploader','$cookies'];




    function editeApplicationController($scope, $location,baseUrl, releaseApplicationService, FileUploader,$cookies) {
        var services = releaseApplicationService.lists;

        // 图片上传地址
        // var url = 'http://www.geovis.me/api/v1/upload';
        var url = baseUrl + services.uploadImg();



        // 介绍图片  无服务 data1_image  一个数组
        var optionsObj_data1_image = {
            var: 'uploader_data1_image',
            url: url,
            queueLimit: 10,
            formData: { 'classification': 'application' },
            who1: [],
            who2: 'data1_image_msg',
            type: 'img'
        }
        getImgUrl(optionsObj_data1_image);

        // 介绍图片  有服务 data2_image  一个数组
        var optionsObj_data2_image = {
            var: 'uploader_data2_image',
            url: url,
            queueLimit: 10,
            formData: { 'classification': 'application' },
            who1: [],
            who2: 'data2_image_msg',
            type: 'img'
        }
        getImgUrl(optionsObj_data2_image);

        $scope.labelsObj_no = []; //标签对象数组
        $scope.labelsObj_have = []; //标签对象数组




        // 有服务？无服务的选择
        $scope.currentOrder = 'noService'; // 默认无服务
        $scope.data1 = {}; // 无服务数据
        $scope.data2 = {}; // 有服务数据
        // $scope.data1.user_id = $scope.data2.user_id = '123'; // 用户ID

        $scope.order = [
            { name: '有服务', active: false, type: 'haveService1', show: false },
            { name: '无服务', active: true, type: 'noService', show: false },
        ];
        
        // 获取标签  应用2
        services.getLabels(2).then(function(res) {
            if (res.status === 200) {
                $scope.labels_no = [];
                $scope.labels_have = [];
                $scope.labels_no = angular.copy(res.data.data.data);
                for (var i = 0, len = $scope.labels_no.length; i < len; i++) {
                    $scope.labels_have.push(angular.copy($scope.labels_no[i]));
                }
            }

        });

        // 获取当前ID  以及对应的数据
        var id = $location.search().applicationId;
        console.log(id)
        services.getApplication(id).then(function(res) {
            console.log(res.data.data)
            if (res.data.code === 1000) {
                $scope.data = res.data.data;
                console.log($scope.data.servicebox_url)
                if ($scope.data.servicebox_url !== 'null') {
                    // 这个if判断需要后台改改
                    $scope.data2 = $scope.data;
                    console.log($scope.data2)
                    optionsObj_data2_image.who1 = [];
                    for (var i = 0, len = $scope.data2.image_urls.length; i < len; i++) {
                        optionsObj_data2_image.who1.push({
                            name: '',
                            url: $scope.data2.image_urls[i]
                        });
                    }
                    $scope.currentOrder = 'haveService1';
                    $scope.order[0].active = true;
                    $scope.order[0].show = true;
                    // 初始化标签数组
                    $scope.selectedLabel_have = [];
                    $scope.data2.label_ids = [];
                    for (var i = 0, len = $scope.data2.labels.length; i < len; i++) {
                        $scope.data2.label_ids.push($scope.data2.labels[i].id);
                        $scope.selectedLabel_have.push($scope.data2.labels[i].title);
                        $scope.labelsObj_have = $scope.data2.labels;
                        for (var j = 0, leng = $scope.labels_have.length; j < leng; j++) {
                            if ($scope.data2.labels[i].id === $scope.labels_have[j].id) {
                                $scope.labels_have[j].active = true;
                            }
                        }
                    }

                } else {
                    $scope.data1 = $scope.data;
                    console.log($scope.data1)
                    optionsObj_data1_image.who1 = [];
                    for (var i = 0, len = $scope.data1.image_urls.length; i < len; i++) {
                        optionsObj_data1_image.who1.push({
                            name: '',
                            url: $scope.data1.image_urls[i]
                        });
                    }
                    console.log(optionsObj_data1_image)
                    $scope.currentOrder = 'noService';
                    $scope.order[1].active = true;
                    $scope.order[1].show = true;
                    // 初始化标签数组
                    // $scope.data1.label_ids = JSON.parse($scope.data1.label_ids);
                    $scope.selectedLabel_no = [];
                    $scope.data1.label_ids = [];
                    $scope.labelsObj_no = $scope.data1.labels;
                    for (var i = 0, len = $scope.data1.labels.length; i < len; i++) {

                        $scope.data1.label_ids.push($scope.data1.labels[i].id);
                        $scope.selectedLabel_no.push($scope.data1.labels[i].title);
                        for (var j = 0, leng = $scope.labels_no.length; j < leng; j++) {
                            if ($scope.data1.labels[i].id === $scope.labels_no[j].id) {
                                $scope.labels_no[j].active = true;
                            }
                        }
                    }

                }

            }
        });


        //  移除以前的文件
        $scope.cover_show = false;
        $scope.image_show = [];
        if (optionsObj_data1_image.who1.length) {
            for (var i = 0, len = optionsObj_data1_image.who1.length; i < len; i++) {
                $scope.image_show[i] = false;
            }
        }
        if (optionsObj_data2_image.who1.length) {
            for (var i = 0, len = optionsObj_data2_image.who1.length; i < len; i++) {
                $scope.image_show[i] = false;
            }
        }
        $scope.video_show = false;
        $scope.pluginsbox_show = false;
        $scope.servicebox_show = false;
        $scope.remove = function(who, list, index) {
            switch (who) {
                case 'data1_cover_url':
                    $scope.data1.cover_url = '';
                    $scope.cover_show = true;
                    break;
                case 'data1_image_url':
                    optionsObj_data1_image.who1.splice(index, 1);
                    $scope.image_show[index] = true;
                    break;
                case 'data1_video_url':
                    $scope.data1.video_url = '';
                    $scope.video_show = true;
                    break;
                case 'data1_pluginsbox_url':
                    $scope.data1.appbox_url = '';
                    $scope.pluginsbox_show = true;
                    break;
                case 'data2_cover_url':
                    $scope.data2.cover_url = '';
                    $scope.cover_show = true;
                    break;
                case 'data2_image_url':
                    optionsObj_data2_image.who1.splice(index, 1);
                    $scope.image_show[index] = true;
                    break;
                case 'data2_video_url':
                    $scope.data2.video_url = '';
                    $scope.video_show = true;
                    break;
                case 'data2_servicebox_url':
                    $scope.data2.servicebox_url = '';
                    $scope.servicebox_show = true;
                    break;
                case 'data2_pluginsbox_url':
                    $scope.data2.appbox_url = '';
                    $scope.pluginsbox_show = true;
                    break;

            }

        }






        // 标签选择
        // $scope.data1.label_ids = []; //标签id数组
        // $scope.data2.label_ids = []; //标签id数组
        // $scope.labelsObj_no = []; //标签对象数组
        // $scope.labelsObj_have = []; //标签对象数组
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
        $scope.save = function() {

            if ($scope.currentOrder === 'noService') {
                if(optionsObj_data1_cover.who1){
                    $scope.data1.cover_url = optionsObj_data1_cover.who1; // 封面
                }
                
                $scope.data1.image_urls = []; // 图数组
                for (var i = 0, len = optionsObj_data1_image.who1.length; i < len; i++) {
                    $scope.data1.image_urls.push(optionsObj_data1_image.who1[i].url);
                }
                if(optionsObj_data1_video.who1){
                    $scope.data1.video_url = optionsObj_data1_video.who1; // 视频地址
                }
                if(optionsObj_data1_pluginsbox.who1){
                    $scope.data1.appbox_url = optionsObj_data1_pluginsbox.who1; // 应用地址
                }
                
                
                console.log('data1')
                console.log($scope.data1)
                if($cookies.get("user_id")){
                    $scope.data1.user_id=$cookies.get("user_id");

                    services.save($scope.data1).then(function(res) {

                        console.log(res)
                        if (res.data.code === 1000) {
                            history.go(-1);
                        }

                    });
                }else{
                    alert("请登录后再试！")
                }

            } else if ($scope.currentOrder === 'haveService1') {
                if(optionsObj_data2_cover.who1) {
                    $scope.data2.cover_url = optionsObj_data2_cover.who1; // 封面
                }
                
                $scope.data2.image_urls = []; // 图数组
                for (var i = 0, len = optionsObj_data2_image.who1.length; i < len; i++) {
                    $scope.data2.image_urls.push(optionsObj_data2_image.who1[i].url);
                }
                if(optionsObj_data2_video.who1){
                    $scope.data2.video_url = optionsObj_data2_video.who1; // 视频地址
                }
                if(optionsObj_data2_pluginsbox.who1){
                    $scope.data2.servicebox_url = optionsObj_data2_pluginsbox.who1; //服务包地址
                }
                
                console.log('data2')
                console.log($scope.data2)
                if($cookies.get("user_id")){
                    $scope.data2.user_id=$cookies.get("user_id");
                    services.save($scope.data2).then(function(res) {
                        console.log(res)
                        if (res.data.code === 1000) {
                            // $scope.nextStep();
                            $scope.currentOrder = 'haveService2';
                            $scope.data3 = {};
                            $scope.data3.id = res.data.data;
                        }
                    });
                }else{
                    alert("请登录后再试！")
                }


            } else if ($scope.currentOrder === 'haveService2') {
                if(optionsObj_data3_pluginsbox.who1){
                    $scope.data3.appbox_url = optionsObj_data3_pluginsbox.who1; //插件包地址
                } else {
                    $scope.data3.appbox_url = $scope.data2.appbox_url;
                }
                if($cookies.get("user_id")){
                    // $scope.data3.me=1;
                    $scope.data3.user_id=$cookies.get("user_id");
                    services.save($scope.data3).then(function(res) {
                        console.log(res)

                        if (res.data.code === 1000) {
                            history.go(-1);
                        }

                    });
                }else{
                    alert("请登录后再试！")
                }


            }

        }

        

        // 封面 无服务 data1_cover 一张
        var optionsObj_data1_cover = {
            var: 'uploader_data1_cover',
            url: url,
            queueLimit: 1,
            formData: { 'classification': 'application' },
            who1: '',
            who2: 'data1_cover_msg',
            type: 'img'
        }
        getImgUrl(optionsObj_data1_cover);

        


        // 视频 无服务 data1_video 一个
        var optionsObj_data1_video = {
            var: 'uploader_data1_video',
            url: url,
            queueLimit: 1,
            formData: { 'classification': 'application' },
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
            formData: { 'classification': 'application' },
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
            formData: { 'classification': 'application' },
            who1: '',
            who2: 'data2_cover_msg',
            type: 'img'
        }
        getImgUrl(optionsObj_data2_cover);

        

        // 视频 有服务 data2_video 一个
        var optionsObj_data2_video = {
            var: 'uploader_data2_video',
            url: url,
            queueLimit: 1,
            formData: { 'classification': 'application' },
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
            formData: { 'classification': 'application' },
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
            formData: { 'classification': 'application' },
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
            } else if (id === 3) {
                $scope.data2_video_loading = true;
            } else if (id === 4) {
                $scope.data2_pluginsbox_loading = true;
            } else if (id === 5) {
                $scope.data3_pluginsbox_loading = true;
            }

        }


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
            // console.log(optionsObj_data1_image.who1)
            // console.log(optionsObj_data2_image.who1)
        }


        // 获取图片地址的函数
        function getImgUrl(optionsObj) {
            $scope[optionsObj.var] = new FileUploader({
                url: optionsObj.url,
                queueLimit: optionsObj.queueLimit, // 最大上传文件数量
                formData: [optionsObj.formData],
                filters: [{
                    name: 'imageFilter',
                    fn: function(item, options) {
                        console.log(item)
                        // var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        var type = '';

                        console.log(type)
                        if (optionsObj.type === 'img') {
                            return '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;
                        } else if (optionsObj.type === 'video') {
                            return '|mp4|avi|swf|'.indexOf(type) !== -1;
                        } else if (optionsObj.type === 'file') {
                            return '||vnd.openxmlformats-officedocument.wordprocessingml.document|vnd.ms-excel|msword|vnd.openxmlformats-officedocument.spreadsheetml.sheet|'.indexOf(type) !== -1;
                            // return '|doc|docx|xls|xlsx|zip|word|'.indexOf(type) !== -1;
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
define(['app'], function(app) {
    app.controller('editeDemandController', editeDemandController);
    editeDemandController.$inject = ['$scope', '$location','baseUrl', 'releaseDemandService', 'FileUploader','$cookies'];

    function editeDemandController($scope, $location,baseUrl, releaseDemandService, FileUploader,$cookies) {
        var services = releaseDemandService.lists;
        $scope.data = {};

        // 获取当前ID  以及对应的数据
        var id = $location.search().did;

        services.getDemands(id).then(function(res){
            console.log(res)
            if(res.data.code === 1000){
                $scope.data = res.data.data;
                $scope.data.bidding_cycle = $scope.data.bidding_cycle - 0;
                $scope.data.deliver_cycle = $scope.data.deliver_cycle - 0;
                console.log($scope.data);
            }
        });


        // $scope.data.me = 1;  //

        $scope.demandType = [
            // {type: 1, name: '样本'},
            // {type: 2, name: '算法'},
            // {type: 3, name: '插件'},
            // {type: 4, name: '应用'},
            // {type: 5, name: '数据'}
        ];  // 需求类型
        function getClassifications() {
            services.getClassifications(1,100).then(function (res) {
                $scope.classificationList = res.data.data.data;
                angular.forEach($scope.classificationList, function(data,index,array){
                    console.log(data.a+'='+array[index].a);
                    var tag={
                        type:data.id,
                        name:data.title
                    }
                    $scope.demandType.push(tag);
                });
            });
        }
        getClassifications();
        // 保存
        $scope.save = function(){
            if(optionsObj_data_cover.who1){
                $scope.data.cover_url = optionsObj_data_cover.who1; // 封面
            }
            console.log($scope.data)
            if($cookies.get("user_id")){
                $scope.data.user_id=$cookies.get("user_id");

                services.save($scope.data).then(function(res){
                    console.log(res)
                    if(res.data.code === 1000){
                        history.go(-1);
                    } else {
                        alert('修改失败');
                    }
                });
            }else{
                alert("请登录后再试！");
            }

        }

        // 图片上传地址
        // var url = 'http://www.geovis.me/api/v1/upload';
        var url = baseUrl + services.uploadFile();

        // 封面  data1_cover 一张
        var optionsObj_data_cover = {
            var: 'uploader_data_cover',
            url: url,
            queueLimit: 1,
            formData: { 'classification': 'demand' },
            who1: '',
            who2: 'data_cover_msg',
            type: 'img'
        }
        getImgUrl(optionsObj_data_cover);

        // // 需求文件  data_pluginsbox 一张
        // var optionsObj_data_pluginsbox = {
        //     var: 'uploader_data_pluginsbox',
        //     url: url,
        //     queueLimit: 1,
        //     formData: { 'classification': 'demand' },
        //     who1: '',
        //     who2: 'data_pluginsbox_msg',
        //     type: 'file'
        // }
        // getImgUrl(optionsObj_data_pluginsbox);


        // 正在上传中的处理
        $scope.data_pluginsbox_loading = false;
        $scope.loading = function(id) {
            if (id === 1){
                $scope.data_pluginsbox_loading = true;
            }

        }


        //  移除以前的文件
        $scope.cover_show = false;
        $scope.remove = function(who, list, index) {
            switch (who) {
                case 'data1_cover_url':
                    $scope.data.cover_url = '';
                    $scope.cover_show = true;
                    break;
            }
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

                $scope.data_pluginsbox_loading = false;
                $scope[optionsObj.who2] = response.msg;
            };
        }

        



    }
})
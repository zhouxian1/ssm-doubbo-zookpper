
define(['app'], function(app) {
    app.controller('deliverdemandController',deliverdemandController);
    deliverdemandController.$inject = ['$scope', '$location','baseUrl','FileUploader', 'releaseDemandService','$cookies'];

    function deliverdemandController($scope,$location,baseUrl,FileUploader, releaseDemandService,$cookies) {
        var service = releaseDemandService.lists;
        //v1/app/biddings/{id}
        var id = $location.search().d_id;
        console.log(id)

        if($cookies.get("user_id")){
            service.getBiddings(id).then(function(res){
                console.log(res)
                if(res.data.code === 1000){
                    $scope.data = res.data.data;
                    console.log($scope.data)
                }
            });
        }else{
            $location.path("/");
        }

        $scope.save = function(){
            $scope.data1={};
            $scope.data1.id = $scope.data.id;
            $scope.data1.deliver_file = optionsObj_data_deliver.who1;
            console.log($scope.data1)
            if($cookies.get("user_id")){
                $scope.data1.me=1;
                $scope.data1.user_id=$cookies.get("user_id");

                service.saveBiddings($scope.data1).then(function(res){
                    console.log(res)
                    if(res.data.code === 1000){
                        history.go(-1);

                    }

                });
            }else{
                $location.path("/");
            }


        }




        // 文件上传
        var url = baseUrl + service.uploadFile();
        console.log(url)
        var optionsObj_data_deliver = {
            var: 'uploader_deliver_file',
            url: url,
            queueLimit: 1,
            formData: { 'classification': 'demand' },
            who1: '',
            who2: 'deliver_msg',
            type: 'file'
        }
        getImgUrl(optionsObj_data_deliver);

        // 正在上传中的处理
        $scope.deliver_loading = false;
        $scope.loading = function(id) {
            $scope.deliver_loading = true;

        }

        // 获取文件地址的函数
        function getImgUrl(optionsObj) {
            $scope[optionsObj.var] = new FileUploader({
                url: optionsObj.url,
                queueLimit: optionsObj.queueLimit, // 最大上传文件数量
                formData: [optionsObj.formData],
                filters: [{
                    name: 'imageFilter',
                    fn: function(item, options) {
                        console.log(item)
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
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

                $scope.deliver_loading = false;


                $scope[optionsObj.who2] = response.msg;
            };
        }
        
        
        
    }

});
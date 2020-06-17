define(['app'], function(app) {
    app.controller('accountAuthenticationContrl', accountAuthenticationContrl);
    accountAuthenticationContrl.$inject = ['$scope', 'FileUploader', '$location', 'baseUrl', 'accountAuthenticationService'];

    function accountAuthenticationContrl($scope, FileUploader, $location,baseUrl, accountAuthenticationService) {
        var services = accountAuthenticationService.lists;
        $scope.data = {};
        $scope.data.user_id = 1; // 用户ID
        $scope.data.type_id = 1; // 默认 用户类型 普通

        $scope.accountType = [
            { type: 1, name: '普通用户' },
            { type: 2, name: '企业用户' }
        ]; // 用户类型

        // 保存
        $scope.save = function() {
            if ($scope.data.type_id === 1) {
                delete $scope.data.business_license_url;
                $scope.data.ID_card_url = optionsObj_data_card.who1;
                console.log($scope.data)
                // if (!$scope.ID_card_num || !$scope.ID_card_url || !$scope.actual_name) {
                //     return false;
                // }
            }
            if ($scope.data.type_id === 2) {
                delete $scope.data.ID_card_url;
                $scope.data.business_license_url = optionsObj_data_business.who1;
                console.log($scope.data)
                // if (!$scope.business_license_num || !$scope.business_license_url || !$scope.business_name) {
                //     return false;
                // }
            }
            // console.log($scope.data)
            services.save($scope.data.user_id, $scope.data).then(function(res) {
                console.log(res)
                if (res.data.code === 1000) {
                    $location.path('/usercenter/home');
                } else if (res.data.code === 1010) {

                }
            });
        }



        // var url = 'http://www.geovis.me/api/v1/upload';
        var url = baseUrl + services.uploadImg();
        // 身份证
        var optionsObj_data_card = {
            var: 'uploader_data_card',
            url: url,
            queueLimit: 1,
            formData: { 'classification': 'user' },
            who1: '',
            who2: 'data_card_msg',
            type: 'img'
        }
        getImgUrl(optionsObj_data_card);

        // 公司
        var optionsObj_data_business = {
            var: 'uploader_data_business',
            url: url,
            queueLimit: 1,
            formData: { 'classification': 'user' },
            who1: '',
            who2: 'data_business_msg',
            type: 'img'
        }
        getImgUrl(optionsObj_data_business);



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

                // $scope.data_pluginsbox_loading = false;
                $scope[optionsObj.who2] = response.msg;
            };
        }





    }
})
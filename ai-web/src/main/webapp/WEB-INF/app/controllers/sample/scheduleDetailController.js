define(['app'], function(app) {
    app.controller('scheduleDetailController', scheduleDetailController);
    scheduleDetailController.$inject = ['$scope', 'FileUploader', 'baseUrl', '$location', 'demandService',"$cookies"];

    function scheduleDetailController($scope, FileUploader, baseUrl, $location, demandService,$cookies) {

        //  把url传过来的参数取出来的方法id
        function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            console.log( url);
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }


        var shareComplaintDetailId=GetRequest();
        $scope.demandId=shareComplaintDetailId.demandId;

        var service=demandService.lists;
        function getDemandDetail() {
            service.getDemandDetail($scope.demandId).then(function (res) {
                if(res.status===200){
                    $scope.demandDetail = res.data.data;
                    $("#content").html( $scope.demandDetail.content);
                    console.log($scope.demandDetail);
                }
            }) ;
        }
        getDemandDetail();
        $scope.data = {};
        $scope.data.demand_id = $location.search().demandId;

        // 提交
        $scope.save = function() {

            $scope.data.bidding_file = optionsObj_data_deliver.who1;
            if (!$scope.bool) {
                alert("您未同意《GEOVIS.AI网站竞标协议》");
                return false;
            }else if(!$scope.data.bidding_file){
                alert("请上传投标文件！");
                return false;
            } else{
                if($cookies.get("user_id")){
                    // console.log(JSON.stringify($scope.data));
                    $scope.data.user_id=$cookies.get("user_id");
                    service.save($scope.data).then(function(res) {
                        console.log(res);
                        if (res.data.code === 1000) {
                            console.log(res.data.data)
                            history.go(-1);
                        }else{
                            alert(res.data.msg);
                        }
                    });
                }else{
                    alert("请登录后再试！")
                }
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
})
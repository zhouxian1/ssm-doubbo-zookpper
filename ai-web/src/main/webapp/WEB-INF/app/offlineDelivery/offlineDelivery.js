/**
 * Created by shane on 2017/3/14.
 */
angular.module('offlineDelivery', [])
    .component('offlineDelivery', {
        templateUrl: 'app/offlineDelivery/offlineDelivery.html',
        controller: offlineDeliveryCtrl
    });

function offlineDeliveryCtrl($scope, $http) {

    $scope.allowContentLength = 600;
    //请求参数初始化
    $scope.paramQuerySendMessage = {    //发送内容请求参数
        //mobile : '',     //发送手机
        //content : '',   //发送内容
        //channelCode : ''    //发送渠道
    };
    $scope.startSpaceCount = 0;
    $scope.sendMessageChannel = '';     //默认发送渠道设置
    $scope.sendMessageMaxLimit = ""; //设置每日短信上线的数目
    $scope.pageSizes = [{value:20},{value:50},{value:80},{value:100}];
    $scope.pageSizeSelect = $scope.pageSizes[0].value;//获取商品类型列表


    $scope.paramQuerySendList = {       //发送记录查询参数
                                        //phoneNo : '',     //发送手机
                                        //userName : '',  //发送操作人
                                        //startDate : '', //起始时间
                                        //endDate : ''   //截止时间
        pageSize: 10       //每页显示数据条数
    };

    $scope.paramQueryGetOne = {         //查询短信详情
        longId: ''
    };

    $scope.paramQueryChannels = {};     //短信通道类型请求参数
    $scope.paramQueryGetMessage = {};//查询短信渠道的参数
    $scope.paramQueryGetMessageCode = {};//查询短信渠道的参数

    //请求地址初始化
    $scope.apiUrl_sms_send = '/sms/send';   //发送短信请求地址

    $scope.apiUrl_sms_channels = '/sms/channels';   //获取短信通道类型

    $scope.apiUrl_sms_pageList = '/sms/pageList';   //分页查询短信记录接口

    $scope.apiUrl_sms_getOne = '/sms/getOne';   //分页查询短信记录接口

    $scope.apiUrl_sms_getMessageChannels = "/sms/getMessageChannels";//查询短信渠道

    $scope.mod_GetMessage = [];//接返回来的数组
    $scope.mod_GetMessageSelect = "";
    $scope.apiUrl_sms_setMessageChannels = "/sms/setMessageChannels";//设置短信渠道

    //清空查询条件
    $scope.clear_search_pageList = function () {
        $scope.paramQuerySendList = {};
        $scope.startDate = null;
        $scope.endDate = null;
    };

    //取消发送详情弹框
    $scope.cancel_delivery_alert = function () {
        $('#delivery_alert').css('display', 'none');
    };
    $scope.show_delivery_alert = function (logId, typeS) {
        $scope.query_sms_getOne(logId, typeS);
        $('#delivery_alert').css('display', 'block');
    };

    //取消发送短信状态提示弹框
    $scope.cancel_send_message_alert = function () {
        $('#send_message_alert').css('display', 'none');
    };
    $scope.show_send_message_alert = function () {
        $('#send_message_alert').css('display', 'block');

    };

    //请求短信通道方法
    $scope.query_sms_channels = function () {
        $("#datepicker").datepicker({
            inline: true
        });
        $("#datepicker1").datepicker({
            inline: true
        });
        $http({
            url: $scope.apiUrl_sms_channels,
            method: "POST",
            headers: {"Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'},
            data: $.param($scope.paramQueryChannels)
        }).success(function (response) {
            console.log(response);
            if (200 == response.status) {
                $scope.sendChannels = response.data;
                $scope.sendMessageChannel = response.data[0].text;
                $scope.paramQuerySendMessage.channelCode = response.data[0].code;
            }
        }).error(function (response) {
            console.log(response);
        })
    };
    $scope.query_sms_channels();

    //更改发送渠道
    $scope.selectSendChannel = function () {
        console.log($scope.sendMessageChannel);
        angular.forEach($scope.sendChannels, function (data, index, array) {
            if ($scope.sendMessageChannel == data.text) {
                $scope.paramQuerySendMessage.channelCode = data.code;
            }
        });
        console.log($scope.paramQuerySendMessage);
    };
    //查询短信渠道
    $scope.getMessageChannels = function () {

        $http({
            url: $scope.apiUrl_sms_getMessageChannels,
            method: "POST",
            headers: {"Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'},
            data: $.param($scope.paramQueryGetMessage)
        }).success(function (response) {
            console.log(response);
            if (200 == response.status) {
                $scope.mod_GetMessage = response.data.channels;
                // $scope.mod_GetMessageSelect = response.data[0].text;
                angular.forEach($scope.mod_GetMessage, function (data, index, array) {
                    if (response.data.nowSelect == data.code) {
                        $scope.sendMessageMaxLimit = data.maxLimit;
                        $scope.mod_GetMessageSelect = data.code;
                    }
                });
            } else {
                swal("网络出错,请重试", "", "error")
            }
        }).error(function (response) {
            console.log(response);
            swal("网络出错,请重试", "", "error")
        })
    };

    $scope.confirmMessage = function () {
        $scope.paramQueryGetMessageCode = {

            code: $scope.mod_GetMessageSelect,
            maxLimit: $scope.sendMessageMaxLimit

        };
        if ($scope.sendMessageMaxLimit < 0) {

            swal("请输入大于0的数字");
            return;
        }
        $http({
            url: $scope.apiUrl_sms_setMessageChannels,
            method: "POST",
            headers: {"Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'},
            data: $.param($scope.paramQueryGetMessageCode)
        }).success(function (response) {
            console.log(response);
            if (200 == response.status) {
                console.log("查询短信渠道");
                // $scope.mod_GetMessageSelect = response.data[0].text;
                // $(".delete_or_not_instockRecord_warning_bg").css("display","none");
                //弹出这个框
                swal({title:"设置短信渠道成功"},function(){

                   $("#myModal").css("display","none");
                });
                // $scope.$scope.paramQueryGetMessage.channelCode = response.data[0].code;
            } else {

                swal(response.statusText, "", "error")
            }
        }).error(function (response) {
            console.log(response);
            swal("网络出错,请重试", "", "error")
        })
    };
    $scope.linkage = function () {

        console.log($scope.mod_GetMessageSelect);
        angular.forEach($scope.mod_GetMessage, function (data, index, array) {
            if ($scope.mod_GetMessageSelect == data.code) {
                $scope.sendMessageMaxLimit = data.maxLimit
            }
        })
    };
    //弹框调用这个函数
    $scope.myModal = function(){

        $scope.getMessageChannels();
    };

    //立即发送短信
    $scope.sendRightNow = function () {
        console.log($scope.paramQuerySendMessage);
        $http({
            url: $scope.apiUrl_sms_send,
            method: "POST",
            headers: {"Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'},
            data: $.param($scope.paramQuerySendMessage)
        }).success(function (response) {
            console.log(response);
            if (200 == response.status) {
                swal("发送成功")
                $scope.paramQuerySendMessage.mobile = "";
                $scope.paramQuerySendMessage.content = "";


            } else {
                swal(response.statusText, "", "error");
            }
        }).error(function () {

            swal("网络异常,请稍后重试", "", "error");
        })
    };

    //分页查询短信记录请求方法
    $scope.query_sms_pageList = function () {

        $scope.paramQuerySendList.pageSize = $scope.pageSizeSelect;
        $http({
            url: $scope.apiUrl_sms_pageList,
            method: "POST",
            headers: {"Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'},
            data: $.param($scope.paramQuerySendList)
        }).success(function (response) {
            console.log($scope.paramQuerySendList);
            console.log(response);
            if (200 == response.status) {
                $scope.pageList = response.data.list;
                console.log($scope.pageList);
                //需要用到的分页显示信息
                $scope.totalCount = response.data.totalCount;
                $scope.pageSize = response.data.pageSize;
                $scope.totalPageCount = response.data.totalPageCount;
                $scope.pageNum = response.data.pageNum;
            }
        }).error(function (response) {
            console.log(response);
        })
    };
    $scope.query_sms_pageList();

    //查询短信详情
    $scope.query_sms_getOne = function (logId, typeS) {
        $scope.paramQueryGetOne.longId = logId;
        $http({
            url: $scope.apiUrl_sms_getOne,
            method: "POST",
            headers: {"Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'},
            data: $.param($scope.paramQueryGetOne)
        }).success(function (response) {
            console.log(response);
            if (200 == response.status) {
                $scope.deliveryDetail = response.data;
                $scope.deliveryDetail.typeS = typeS;
            }
        }).error(function (response) {
            console.log(response);
        })
    };

    //按条件查询列表
    $scope.search_pageList = function () {
        if ($scope.startDate != null) {
            //var thisTime = new Date($scope.startDate).getTime();
            $scope.paramQuerySendList.startDate = $scope.startDate;
        }
        if ($scope.endDate != null) {
            //var thisTime = new Date($scope.endDate).getTime();
            $scope.paramQuerySendList.endDate = $scope.endDate;
        }
        console.log($scope.paramQuerySendList);
        $scope.query_sms_pageList();
    };

    /*********** 上一页 ****************/
    $scope.previous = function () {
        if ($scope.pageNum == 1) {
            alert("这已经是第一页了!");
        } else {
            $scope.paramQuerySendList.pageNo = $scope.pageNum - 1;
            $scope.query_sms_pageList();
        }
    };

    /*********** 下一页 ****************/
    $scope.next = function () {
        if ($scope.pageNum == $scope.totalPageCount) {
            alert("这已经是最后一页了!");
        } else {
            $scope.paramQuerySendList.pageNo = $scope.pageNum + 1;
            $scope.query_sms_pageList();
        }
    };
    /*********** 确认查询 ****************/
    $scope.confirmQuery = function () {
        // console.log($scope.pageSizeSelect);

        $scope.query_sms_pageList();
        console.log('触发这个方法');
    };

    /*********** 跳转到指定页面 ****************/
    $scope.goToPage = function () {
        console.log("跳转到以下页面:" + $scope.changePage);
        if ($scope.changePage == null || $scope.changePage == undefined || $scope.changePage == "") {
            alert("不能跳转到空白页面!");
        } else if (!($scope.changePage >= 1 && $scope.changePage <= $scope.totalPageCount)) {
            alert("页面不能小于1,不能大于页面总数!");
        } else {
            $scope.paramQuerySendList.pageNo = $scope.changePage;
            $scope.query_sms_pageList();
        }
    };

    //监听发送内容的字符数
    //$scope.$watch('paramQuerySendMessage',function(){
    //    if(null != $scope.paramQuerySendMessage.content){
    //        if ($scope.isinputMessage){
    //            console.log("watch -- ");
    //            $scope.allowContentLength = 600 - $scope.paramQuerySendMessage.content.length;
    //        }
    //
    //    }
    //},true);

    $scope.keydownChangeValue = function ($event) {
        //32空格 || 13回车
        if (($event.keyCode == 32 || $event.keyCode == 13) && ($scope.allowContentLength > 0)) {
            if (null != $scope.paramQuerySendMessage.content) {
                $scope.allowContentLength = 600 - $scope.paramQuerySendMessage.content.length;
            }
        }
        //8删除
        else if (($event.keyCode == 8) && ($scope.allowContentLength >= 0) && ($scope.allowContentLength < 600)) {
            if ($scope.paramQuerySendMessage.content != null) {
                $scope.allowContentLength = 600 - $scope.paramQuerySendMessage.content.length;
            }
        }
        ////48-57数字
        //else if(($event.keyCode>=48) && ($event.keyCode<=57) && ($scope.allowContentLength>0)){
        //    $scope.allowContentLength--;
        //}
        ////65-90字母
        //else if(($event.keyCode>=65) && ($event.keyCode<=90) && ($scope.allowContentLength>0)){
        //    $scope.allowContentLength--;
        //}
    };

    $scope.keyupChangeValue = function ($event) {
        if (null != $scope.paramQuerySendMessage.content) {
            $scope.allowContentLength = 600 - $scope.paramQuerySendMessage.content.length;
        }
    };
    $scope.pageAdjust();
}
/**
 * Created by liuping on 17/3/14.
 */
angular.module('threeStore', [])
    .component('threeStore', {

        templateUrl: 'app/order/orderManage.html',
        controller: threeStoreCtrl
    });

function threeStoreCtrl($scope, $http, $cookies, $timeout) {

    $scope.isLogined = $cookies.get('loginStatus');
    $scope.loginUserId = $cookies.get('loginUserId');

    //url
    $scope.initUrl = function () {

        //获取第三方店铺的下拉列表
        $scope.apiUrl_order_get_shops = "/order/get_shops";
        //第三方店铺二次出库
        $scope.apiUrl_order_shop_order_out = "/order/shop_order_out";
    };

    //请求参数
    $scope.initParam = function () {

        $scope.param_compCode = "";
        $scope.param_shopOrderNo = "";
        $scope.param_threeStore = {};
        $scope.param_threeStoreOut = {};
        $scope.threeStoreList = [];
        $scope.param_shopOrderNo = "";
        $scope.param_outStockCode = "";
    };

    //调用封装的函数
    $scope.initUrl();
    $scope.initParam();

    //获取第三方店铺
    $http({

        url: $scope.apiUrl_order_get_shops,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        method: "POST",
        data: $.param($scope.param_threeStore)

    }).success(function (response) {

        $scope.threeStoreList = response.data;
        // $scope.param_compCode = $scope.threeStoreList[0].code;
        // console.log($scope.param_compCode);
        console.log($scope.threeStoreList);
        console.log("请求资源成功!");

    }).error(function () {

        console.log("请求资源失败");
    });
    $scope.threeStore = function () {

        var options = $("#test option:selected");
        $scope.statuL = (options.text());
        console.log($scope.statuL);
        angular.forEach($scope.threeStoreList, function (data, index, array) {

            if ($scope.statuL == $scope.threeStoreList[index].name) {

                $scope.threeStoreCode = $scope.threeStoreList[index].code;
                console.log($scope.threeStoreCode)
            }
        })

    };


    $scope.param_threeStoreOut.compCode = $scope.threeStoreCode;

    //第三方店铺出库
    $scope.outStock = function () {

        $scope.threeStore();

        $scope.param_threeStoreOut = {

            compCode: $scope.threeStoreCode,
            shopOrderNo: $scope.param_shopOrderNo

        };

        console.log($scope.param_threeStoreOut);

        if ($scope.threeStoreCode == "" || $scope.threeStoreCode == null) {

            $scope.statustext = "请选择店铺";
            console.log("进入这个页面");
            $("#error").css("display", "block");
            $timeout(function () {

                $("#error").css("display", "none");

            }, 2000);

        }
        else if ($scope.param_shopOrderNo == "" || $scope.param_shopOrderNo == null) {

            $scope.statustext = "请输入店铺订单号";
            console.log("进入这个页面");
            $("#error").css("display", "block");
            $timeout(function () {

                $("#error").css("display", "none");

            }, 2000);


        } else {

            $http({

                url: $scope.apiUrl_order_shop_order_out,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                method: "POST",
                data: $.param($scope.param_threeStoreOut)

            }).success(function (response) {

                console.log(response);

                if (200 == response.status) {
                    swal("出库成功")
                } else if (response.status == 401) {

                    $cookies.remove('loginStatus');
                    $cookies.remove('loginUserId');
                    window.location.href = "/app/index.html#/";
                    window.location.reload();

                    console.log("对不起" + response.statusText);
                } else {
                    swal(response.statusText, "", "error")
                }

            }).error(function () {
                swal("网络异常,请稍后重试", "", "error")
            });
        }

    };

    $scope.know = function () {

        $("#error").css("display", "none");
    }


    //获取店铺营业时间
    $scope.shop_time_start = "";
    $scope.shop_time_end = "";
    $scope.shop_not_open_time_start = "";
    $scope.shop_not_open_time_end = "";
    $scope.time_shop_select = "";

    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }

    //设置店铺营业时间
    $scope.load_shop_time_info = function () {
        console.log("请求店铺详情");
        var selectOp = $scope.time_shop_select;
        if (selectOp == null || selectOp == "") {
            $scope.shop_not_open_time_start = "";
            $scope.shop_not_open_time_end = "";
            $scope.shop_time_start = ""
            $scope.shop_time_end = "";
            return;
        }
        $http({

            url: "/order/load_shop_time_info",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            method: "POST",
            data: $.param({"compCode": selectOp})

        }).success(function (res) {
            if (res.status == 200) {
                $scope.shop_time_start = res.data.shopStartTime;
                $scope.shop_time_end = res.data.shopEndTime;
                if (res.data.shopCloseStart != null) {
                    $scope.shop_not_open_time_start = new Date(parseInt(res.data.shopCloseStart)).format("yyyy/MM/dd hh:mm");
                } else {
                    $scope.shop_not_open_time_start = "";
                }
                if (res.data.shopCloseEnd != null) {
                    $scope.shop_not_open_time_end = new Date(parseInt(res.data.shopCloseEnd)).format("yyyy/MM/dd hh:mm");
                } else {
                    $scope.shop_not_open_time_end = "";
                }
                $("#openClose").prop("checked", 1 == res.data.isOpen);
                $("#weekDayWork").prop("checked", 1 == res.data.weekDayWork);
            } else {
                swal(res.statusText, "", "error")
            }
        }).error(function () {
            swal("网络出错,请重试", "", "error")
        });
    }
    $scope.set_shop_time = function () {
        console.log("保存营运时间");
        var param = new Object();
        if ($scope.time_shop_select == null || $scope.time_shop_select == '' || $scope.time_shop_select == -1) {
            swal("请选择店铺", "", "error")
            return
        }
        var isOpen = $("#openClose").is(':checked');
        var weekDayWork = $("#weekDayWork").is(':checked');
        if ($scope.shop_time_start == null || $scope.shop_time_start == '' || $scope.shop_time_end == null || $scope.shop_time_end == '') {
            swal("请设置运营时间段", "", "error")
            return
        }
        param.shopStartTime = $scope.shop_time_start;
        param.shopEndTime = $scope.shop_time_end;
        if (($scope.shop_not_open_time_start != null && $scope.shop_not_open_time_start != '' && ($scope.shop_not_open_time_end == null || $scope.shop_not_open_time_end == '')) ||
            ($scope.shop_not_open_time_end != null && $scope.shop_not_open_time_end != '') && ($scope.shop_not_open_time_start == null || $scope.shop_not_open_time_start == '')
        ) {
            swal("非运营时间段开始时间和结束时间需要同时指定", "", "error")
            return
        }
        if ($scope.shop_not_open_time_start != null && $scope.shop_not_open_time_start != '') {
            param.shopCloseStart = $scope.shop_not_open_time_start;
        }
        if ($scope.shop_not_open_time_end != null && $scope.shop_not_open_time_end != '') {
            param.shopCloseEnd = $scope.shop_not_open_time_end;
        }
        param.compCode = $scope.time_shop_select;
        param.isOpen = isOpen ? 1 : 0;
        param.weekDayWork = weekDayWork ? 1 : 0;
        $http({

            url: "/order/set_shop_time",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            method: "POST",
            data: $.param(param)

        }).success(function (res) {
            if (res.status == 200) {
                swal("保存成功", "", "success");
            } else {
                swal(res.statusText, "", "error")
            }
        }).error(function () {
            swal("网络出错,请重试", "", "error")
        });
    };
    $scope.bitch_shop_select = "";
    $scope.bitchFile = "";
    $scope.changeFile = function (event) {
        $scope.bitchFile = event.target.files[0];
    }
    $scope.bitchOutStock = function () {
        if ($scope.bitch_shop_select == null || $scope.bitch_shop_select == '' || $scope.bitch_shop_select == -1) {
            swal("请选择店铺", "", "error")
            return
        }
        if ($scope.bitchFile == null || $scope.bitchFile == "") {
            swal("请选择文件", "", "error")
            return
        }else if($scope.bitchFile.name.indexOf(".txt") < 0 && $scope.bitchFile.name.indexOf(".csv") < 0){
            swal("请使用txt或者csv文件", "其他文件可能会出现格式问题", "error")
            return
        }

        $http({
            url: "/order/shop_bitch_stock",
            method: "POST",
            headers: {
                "Content-Type": undefined
            },
            data: {
                'compCode': '' + $scope.bitch_shop_select + '',
                'file': $scope.bitchFile
            },
            transformRequest: function (data, headerGetter) {//进行格式转换,非常关键
                var formData = new FormData();//将model转为表单格式
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });
                return formData;
            }
        }).success(
            function (response) {
                if (200 == response.status) {
                    swal("正在处理", "如果有出库失败的订单,稍后会以邮件的形式发送到你的邮箱");
                    $scope.bitch_shop_select = "";
                    $scope.bitchFile = "";
                    return;
                } else {
                    swal(response.statusText, "", "error");
                    return;
                }
            }
        ).error(
            function (response) {
                swal("上传出错,请重试", "", "error");
                return;
            }
        );


    };
    $scope.pageAdjust();
}
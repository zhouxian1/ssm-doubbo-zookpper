//声明路由模块 channel-addConfig
angular.module('addConfig', [])
    .component('addConfig', {//整个div的名称
        //templateUrl: "channel/channel-config.html",
        templateUrl: "app/channel/channel-addconfig.html",
        controller: addConfigCtrl//相当于定义了一个函数
    });
function addConfigCtrl($scope, $http, $cookies, $timeout) {//调用函数

    $scope.isLogined = $cookies.get('loginStatus');
    $scope.loginUserId = $cookies.get('loginUserId');//$cookies
    // 定义controller 的变量
    $scope.paramConfig = {};
    $scope.paramConfigGoods = {};
    $scope.paramAllGoods = {};
    $scope.paramConfiged = {};
    $scope.mod_ChannelAddConfig = {};//定义整个model
    $scope.paramAddconfigedGoods = {};//保存商品池
    $scope.paramDeleteGoodsPool = {};//删除商品池

    //接口的路径
    $scope.apiUrl_company_info = "/company/company_info";// 12接口:渠道列表的请求接口地址
    $scope.apiUrl_goods_pageList = "/goods/pageList";// 16接口:商品列表的请求接口地址
    $scope.apiUrl_company_add_goods_pools = "/company/add_goods_pool";// 8接口:添加商品池的请求接口地址
    $scope.apiUrl_company_delete_goods_pools = "/company/delete_goods_pool";// 5接口:删除商品池的请求接口地址
    $scope.apiUrl_company_goods_info = "/company/company_goods_info";// 3接口:已配置商品的请求接口地址


    //给 model 初始化赋值
    $scope.left_select_all = false;

    $scope.mod_ChannelAddConfig.name = "";
    $scope.mod_ChannelAddConfig.name.canEdit = false;

    //$scope.mod_ChannelAddConfig.id = "";
    //$scope.mod_ChannelAddConfig.id.canEdit=true;

    $scope.mod_ChannelAddConfig.category = "";
    $scope.mod_ChannelAddConfig.category.canEdit = false;

    //初始化数组
    $scope.mod_ChannelAddConfig.allGoodsList = [];
    $scope.mod_ChannelAddConfig.configedList = [];
    $scope.listLeftSelected = [];
    $scope.listRightSelected = [];

    //监听渠道ID的变化
    $scope.$watch('mod_ChannelAddConfig.id', function () {
        console.log("现在的渠道ID是:");
        console.log($scope.mod_ChannelAddConfig.id);
        $scope.paramConfig.compId = $scope.mod_ChannelAddConfig.id;
        $scope.paramConfiged.compId = $scope.mod_ChannelAddConfig.id;
        $scope.addGoodsChannelCode = $scope.mod_ChannelAddConfig.id;  //保存商品池,商品的渠道ID
    });

    /***** 请求渠道信息 *************/

    $scope.getChannelInfo = function () {
        $http({
            url: $scope.apiUrl_company_info,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"//FORM形式提交
            },
            data: $.param($scope.paramConfig)//返回的数据
        }).success(function (response) {
            console.log("请求成功");
            console.log(response);  //返回的内容
            console.log($scope.paramConfig);   //请求参数
            $scope.mod_ChannelAddConfig.name = response.data.compName;
            $scope.mod_ChannelAddConfig.category = response.data.suppOrCustS;
            $scope.queryConfigedGoods();
        }).error(
            function () {
                console.log("请求失败");
            }
        );
    };

    /*********** 查询所有商品列表 ***********/
    $scope.paramAllGoods = { //商品列表请求参数
        pageSize: 20,
        pageNO: 1
    };
    $scope.queryAllConfigGoods = function (paramPage, goodsName) {
        if (paramPage != null) {
            $scope.paramAllGoods.pageNO = paramPage;    //页码
        }
        //if(goodsName){
        console.log(goodsName);
        $scope.paramAllGoods.goodsName = goodsName;
        //}
        $http({
            url: $scope.apiUrl_goods_pageList,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.paramAllGoods)
        }).success(
            function (response) {
                if (response.status == 200) {
                    console.log("商品列表请求成功");
                    console.log(response);
                    $scope.mod_ChannelAddConfig.allGoodsList = response.data.list;
                    //需要用到的分页显示信息
                    $scope.totalCount = response.data.totalCount;
                    $scope.pageSize = response.data.pageSize;
                    $scope.totalPageCount = response.data.totalPageCount;
                    $scope.pageNum = response.data.pageNum;
                } else if (401 == response.status) {

                    $cookies.remove('loginStatus');
                    $cookies.remove('loginUserId');
                    window.location.href = "/app/index.html#/";
                    window.location.reload();
                } else {
                    console.log("对不起", +response.statusText);
                }
            }
        ).error(function (response) {
            console.log("goodsManage请求失败");
            console.log(response);
        });
    };
    $scope.queryAllConfigGoods();


    /*********** 查询已配置商品列表 ***********/

    $scope.queryConfigedGoods = function () {
        $http({
            url: $scope.apiUrl_company_goods_info,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.paramConfiged)
        }).success(function (response) {
            console.log("已配置商品请求的渠道ID是:");
            console.log($scope.paramConfiged);
            if (response.status == 200) {
                console.log("商品已配置请求成功");
                console.log(response);
                if (response.data != null) {
                    $scope.mod_ChannelAddConfig.configedList = response.data;
                }
            } else if (401 == response.status) {

                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href = "/app/index.html#/";
                window.location.reload();
            } else {
                console.log("对不起," + response.statusText);
            }
        }).error(function (response) {
            console.log("商品已配置请求失败");
            console.log(response);
        });
    };

    /******* 从可配置列表添加商品到已配置列表 **********/
    $scope.addConfigGoods = function () {
        if ($scope.mod_ChannelAddConfig.configedList.length != 0) {
            console.log("从可配到已配,已配不为空");
            console.log($scope.listLeftSelected);
            console.log($scope.mod_ChannelAddConfig.configedList);
            angular.forEach($scope.listLeftSelected, function (data, index, array) {
                if ($scope.mod_ChannelAddConfig.configedList.indexOf(data) == -1) {
                    $scope.mod_ChannelAddConfig.configedList.push(data);
                } else if ($scope.mod_ChannelAddConfig.configedList.indexOf(data) != -1) {
                    data.checked = false;
                    $scope.listLeftSelected.splice(index, 1);
                }
            })
        } else {
            console.log("从可配到已配,已配为空");
            $scope.mod_ChannelAddConfig.configedList = $scope.listLeftSelected.slice(0);
        }

        console.log("打印输出现在的已配置信息是:");
        console.log($scope.mod_ChannelAddConfig.configedList);
    };

    /******* 从已配置列表删除商品到可配置列表 **********/
    $scope.removeGoodsFromConfig = function () {
        console.log($scope.listRightSelected);
        if ($scope.listRightSelected.length != 0) {
            angular.forEach($scope.listRightSelected, function (data, index, array) {
                data.isChecked = false;
                data.checked = false;
                $scope.mod_ChannelAddConfig.configedList.splice($scope.mod_ChannelAddConfig.configedList.indexOf(data), 1);
                if ($scope.listLeftSelected.indexOf(data) != -1) {
                    $scope.listLeftSelected.splice($scope.listLeftSelected.indexOf(data), 1);
                }
            });
            $scope.listRightSelected = [];
        }
        console.log($scope.mod_ChannelAddConfig.configedList);
    };

    /****** 左边全选函数 *********/
    $scope.leftSelectAll = function () {
        $scope.listLeftSelected = [];
        angular.forEach($scope.mod_ChannelAddConfig.allGoodsList, function (goods) {
            if (goods.checked = $scope.left_select_all) {
                $scope.listLeftSelected.push(goods)
            }
        });
        console.log($scope.listLeftSelected);
    };

    /*********** 右边全选函数 ****************/
    $scope.rightSelectAll = function () {
        $scope.listRightSelected = [];
        angular.forEach($scope.mod_ChannelAddConfig.configedList, function (data, index, array) {
            if (data.isChecked = $scope.right_select_all) {
                $scope.listRightSelected.push(data);
            }
        });
        console.log($scope.listRightSelected);
    };

    /****** 左边单选函数 **********/
    $scope.selectOne = function (goods) {
        console.log("现在选中的商品是:");
        console.log(goods);
        if (goods.checked == true) {
            goods.isChecked = false;
            $scope.listLeftSelected.push(goods);
        } else {
            var pos = $scope.listLeftSelected.indexOf(goods);
            $scope.listLeftSelected.splice(pos, 1);
        }
        console.log("选择的可配商品列表是:");
        console.log($scope.listLeftSelected);

        //增加判断现在是否是全选
        //全选要把全选复选框选中
        //非全选要把全选复选框不选中
    };

    $scope.selectRightOne = function (obj) {
        console.log("右边现在选中的商品是:");
        console.log(obj);
        if (obj.isChecked == true) {
            $scope.listRightSelected.push(obj);
        } else {
            var pos = $scope.listRightSelected.indexOf(obj);
            $scope.listRightSelected.splice(pos, 1);
        }
        console.log("右边现在需要取消的商品列表是:");
        console.log($scope.listRightSelected);
    };

    //保存已配置的商品列表
    $scope.saveConfigedList = function () {
        console.log("左边选择的商品是:");
        console.log($scope.listLeftSelected);

        $scope.finalAddGoodsList = [];
        console.log("点击完成按钮保存该渠道已配置的商品列表");
        console.log("最后可以配置的商品列表是:");
        console.log($scope.listLeftSelected);
        angular.forEach($scope.listLeftSelected, function (data) {
            var finalAddGoods = {};
            finalAddGoods.goodsId = data.goodsId;
            finalAddGoods.channelCode = $scope.addGoodsChannelCode;
            finalAddGoods.type = data.type;
            $scope.finalAddGoodsList.push(finalAddGoods);
        });
        $scope.paramAddconfigedGoods.goodsPools = $scope.finalAddGoodsList;
        console.log($scope.paramAddconfigedGoods);
        var paramAddConfigedGoods = angular.toJson($scope.paramAddconfigedGoods);
        $http({
            url: $scope.apiUrl_company_add_goods_pools,
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data: paramAddConfigedGoods
        }).success(function (response) {
            console.log("请求信息:");
            console.log(paramAddConfigedGoods);
            console.log("请求保存商品池接口成功!");
            console.log("保存商品池接口成功后返回的信息是:");
            console.log(response);
            if (200 == response.status) {
                //alert("保存商品池配置成功!");
                $("#delete_or_not_box").css("display", "block");
                $timeout(function () {
                    $("#delete_or_not_box").css("display", "none");

                }, 1000)

            } else if (401 == response.status) {

                $cookies.remove('loginStatus');
                $cookies.remove('loginUserId');
                window.location.href = "/app/index.html#/";
                window.location.reload();
            } else {
                console.log(response.status);
                $("#error").css("display", "block");
                $timeout(function () {
                    $("#error").css("display", "none");

                }, 1000);

                $scope.statustext = response.statusText;
                console.log(response.statusText);
            }
        }).error(function (response) {
            console.log("请求保存商品池接口失败!");
            console.log("保存商品池接口失败后返回的信息是:");
            alert("保存商品池配置失败!");
        })
    };
    $scope.know = function () {

        $("#error").css("display", "none");

    };
    //添加消失
    $scope.sure_delete_or_not = function () {

        $("#delete_or_not_box").css("display", "none");
    };
    //分页显示可配商品列表
    //上一页
    $scope.previous = function () {
        if ($scope.pageNum == 1) {
            alert("这已经是第一页了!");
        } else {
            //更改了请求参数
            $scope.paramPage = $scope.pageNum - 1;
            $scope.queryAllConfigGoods($scope.paramPage);
        }
    };
    //下一页
    $scope.next = function () {
        console.log("当前页数:" + $scope.pageNum);
        if ($scope.pageNum == $scope.totalPageCount) {
            alert("这已经是最后一页了!");
        } else {
            //更改了请求参数
            $scope.paramPage = $scope.pageNum + 1;
            $scope.queryAllConfigGoods($scope.paramPage);
        }
    };
    //跳转到指定页面
    $scope.goToPage = function () {
        console.log("跳转到以下页面:" + $scope.changePage);
        if ($scope.changePage == null || $scope.changePage == undefined || $scope.changePage == "") {
            alert("不能跳转到空白页面!");
        } else if (!($scope.changePage >= 1 && $scope.changePage <= $scope.totalPageCount)) {
            alert("页面不能小于1,不能大于页面总数!");
        } else {
            $scope.paramPage = $scope.changePage;
            $scope.queryAllConfigGoods($scope.paramPage);
        }
    }

    //从商品池中删除指定商品
    $scope.deleteGoodsPool = function (poolId,index) {
        $scope.paramDeleteGoodsPool.poolId = poolId;
        if (poolId == null || poolId == ''){
            $scope.mod_ChannelAddConfig.configedList.splice(index,1);
            return;
        }
        swal({
                title: "确认删除配置?",
                text: "",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "取消",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确认",
                closeOnConfirm: false
            },
            function () {
                $http({
                    url: $scope.apiUrl_company_delete_goods_pools,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    data: $.param($scope.paramDeleteGoodsPool)
                }).success(function (response) {
                    console.log(response);
                    if (200 == response.status) {
                        // $scope.queryConfigedGoods();
                        $scope.mod_ChannelAddConfig.configedList.splice(index,1);
                        swal("删除已配置商品成功!")
                    } else if (401 == response.status) {
                        $cookies.remove('loginStatus');
                        $cookies.remove('loginUserId');
                        window.location.href = "/app/index.html#/";
                        window.location.reload();
                    } else {
                        swal("出错!", response.statusText, "error");
                    }
                }).error(function (response) {
                    swal("出错!", "网络出错,请重试", "error");
                });
            });

    }

}


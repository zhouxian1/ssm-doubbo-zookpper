/**
 * Created by HP on 2017/8/31.
 */
define(['app'], function(app) {
    app.controller('sampleController', sampleController);
    sampleController.$inject = ['$scope','sampleService','$location'];
    function sampleController($scope,$sampleService,$location) {

        $scope.urlType=1;
        if($location.absUrl().indexOf("http://www.")>-1){//有www
            $scope.urlType=1;
        }else{
            $scope.urlType=3;
        }
        var service=$sampleService.lists;
        $scope.sampleList={};
        $scope.classificationList={};
        $scope.classificationId='';
        $scope.current=1;
        $scope.pageTotal=16;
        $scope.order_by="buy_count";
        $scope.total=6;
        // $scope.source_type_select=[];
        // $scope.data_source_select=[];//数据来源
        // $scope.imaging_type_select=[];//成像类型
        // $scope.resolution_select=[];//分辨率
        // $scope.size_select=[];//像素大小
        // $scope.coordinate_select=[];//坐标信息
        // $scope.production_time_select=[]//生产时间

        $scope.source_type_select="";
        $scope.data_source_select="";//数据来源
        $scope.imaging_type_select="";//成像类型
        $scope.resolution_select="";//分辨率
        $scope.size_select="";//像素大小
        $scope.coordinate_select="";//坐标信息
        $scope.production_time_select="";//生产时间

        $scope.filters={
            source_type:[$scope.source_type_select],
            data_source: [$scope.data_source_select],
            imaging_type:[$scope.imaging_type_select],
            resolution: {
                max:"",
                min:""
            },
            size: "",
            coordinate:[$scope.coordinate_select],
            production_time: {
                max:"",
                min:""
            }
        };
        $scope.hotSampleList={};
        $scope.hotArithmeticList={};
        // $scope.source_type=["航天","航空","近景"];//来源方式
        // $scope.data_source=["QuickBird-2","WorldView3","GF1","GF2","GF3","ZY3","有人机","无人机","街景","近景拍摄","其他"];//数据来源
        // $scope.imaging_type=["256*256","512*512","其他"];//成像类型
        // $scope.resolution=["＜0.5m","0.5m-1m","1m-2m",">2m"];//分辨率
        // $scope.size=["有","无"];//像素大小
        // $scope.coordinate=["光学","雷达","其他"];//坐标信息
        // $scope.production_time=["＜1年","1年-5年","＞5年"]//生产时间

        $scope.source_type=["航天","航空","近景"];//来源方式
        $scope.data_source=["QuickBird-2","WorldView3","GF1","GF2","GF3","ZY3","有人机","无人机","街景","近景拍摄","其他"];//数据来源
        $scope.imaging_type=["光学","雷达","其他"];//成像类型
        $scope.resolution=["＜0.5m","0.5m-1m","1m-2m",">2m"];//分辨率
        $scope.size=["256*256","512*512","其他"];//图像大小
        $scope.coordinate=["有","无"];//坐标信息
        $scope.production_time=["＜1年","1年-5年","＞5年"]//生产时间

        function getSampleList() {

            var resolution={
                max:"",
                min:""
            }
            var production_time={
                max:"",
                min:""
            }
            var size="";
            switch($scope.size_select){
                case "256*256":
                    size="256";
                    break;
                case "512*512":
                    size="512";
                    break;
                case "其他":
                    size="其他";
                break;
                default:
                    size="";
                    break;
            }
            switch($scope.production_time_select){
                case "＜1年":
                    production_time={
                        max:"1",
                        min:""
                    };
                    break;
                case "1年-5年":
                    production_time={
                        max:"5",
                        min:"1"
                    }
                    break;
                case "＞5年":
                    production_time={
                        max:"",
                        min:"5"
                    }
                    break;
                default:
                    production_time={
                        max:"",
                        min:""
                    }
                    break;
            }
            switch($scope.resolution_select){
                case "＜0.5m":
                     resolution={
                        max:"0.5",
                        min:""
                    }
                    break;
                case "0.5m-1m":
                     resolution={
                        max:"1",
                        min:"0.5"
                    }
                    break;
                case "1m-2m":
                    resolution={
                        max:"2",
                        min:"1"
                    }
                    break;
                case ">2m":
                    resolution={
                        max:"",
                        min:"2"
                    }
                    break;
                default:
                    resolution={
                        max:"",
                        min:""
                    }
                    break;
            }

            $scope.filters={
                source_type:[$scope.source_type_select],
                data_source: [$scope.data_source_select],
                imaging_type:[$scope.imaging_type_select],
                resolution: resolution,
                size: size,
                coordinate:[$scope.coordinate_select],
                production_time: production_time
            };
            service.getSampleList( $scope.current, $scope.pageTotal,$scope.classificationId,JSON.stringify($scope.filters),$scope.order_by,$scope.urlType).then(function (res) {
                $scope.total = res.data.count; // tgd添加

                $scope.sampleList=res.data.data;
                console.log($scope.sampleList);
            });
        }
        function getClassifications() {
            service.getClassifications(1,100).then(function (res) {
                $scope.classificationList = res.data.data.data;
                console.log( $scope.classificationList);
            });
        }

        /**
         * 获取热门样本开发者
         */
        function getHotSampleList() {
            service.getHotSampleList(1, 5,$scope.urlType).then(function (res) {
                console.log(res);
                $scope.hotSampleList=res.data.data;
                console.log($scope.hotSampleList);
            });
        }
        /**
         * 获取热门算法开发者
         */
        function getHotArithmeticList() {
            service.getHotArithmeticList(1, 5,$scope.urlType).then(function (res) {
                console.log(res);
                $scope.hotArithmeticList=res.data.data;
                console.log($scope.hotArithmeticList);
            });
        }
        getSampleList();
        getClassifications();
        getHotSampleList();
        getHotArithmeticList();

        // ======== tgd添加开始 ==========

        $scope.jumpPage = function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.current = $scope.search_current;
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                getPage( $scope.current,$scope.pageTotal,$scope.order,$scope.labId)
            }
        }
        $scope.search = function(bool) {
            if (bool) {
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                getPage( $scope.current,$scope.pageTotal,$scope.order,$scope.labId)
            }

        };
        // ======== tgd添加结束 ==========
        // <span>来源方式</span>
        //     <span>数据来源</span>
        //     <span>成像类型</span>
        //     <span>分辨率</span>
        //     <span>像素大小</span>
        //     <span>坐标信息</span>
        //     <span>生产时间</span>
        /*
         * 方法:Array.remove(dx) 通过遍历,重构数组
         * 功能:删除数组元素.
         * 参数:dx删除元素的下标.
         */
        function checktype(array,item) {
            var flag=1;
            var tag=[];
            for(var i = 0;i < array.length; i++) {
                if(item==array[i]) {
                    flag=2;
                    break;
                }
            }
            if(flag==1){
                array.push(item);
                return array;
            }else if (flag==2) {
                for(var i = 0;i < array.length; i++) {
                    if(item==array[i]) {
                    }else{
                        tag.push(array[i]);
                    }
                }
                return tag;
            }
        }

        // $scope.source_type_select=[];
        // $scope.data_source_select={};//数据来源
        // $scope.imaging_type_select={};//成像类型
        // $scope.resolution_select={};//分辨率
        // $scope.size_select={};//像素大小
        // $scope.coordinate_select={};//坐标信息
        // $scope.production_time_select={}//生产时间
        $scope.typeClick=function (item ,type) {
            switch(type)
            {
                case 1:
                    // $scope.source_type_select=checktype($scope.source_type_select,item)
                    if($scope.source_type_select==item){
                        $scope.source_type_select="";
                    }else{
                        $scope.source_type_select=item
                    }
                    console.log($scope.source_type_select);
                    break;
                case 2:
                    // 代码2;
                    // $scope.data_source_select=checktype($scope.data_source_select,item);
                    if($scope.data_source_select==item){
                        $scope.data_source_select="";
                    }else{
                        $scope.data_source_select=item
                    }
                    console.log($scope.data_source_select);
                    break;

                case 3://imaging_type
                    // 代码3;
                    if($scope.imaging_type_select==item){
                        $scope.imaging_type_select="";
                    }else{
                        $scope.imaging_type_select=item
                    }
                    console.log($scope.imaging_type_select);
                    break;
                case 4:
                    // 代码3;
                    // $scope.resolution_select=checktype($scope.resolution_select,item);
                    if( $scope.resolution_select==item){
                        $scope.resolution_select="";
                    }else{
                        $scope.resolution_select=item;
                    }
                    console.log($scope.resolution_select);
                    break;
                case 5:
                    // 代码3;
                    // $scope.size_select=checktype($scope.size_select,item);
                    if($scope.size_select==item){
                        $scope.size_select="";
                    }else{
                        $scope.size_select=item;
                    }
                    console.log($scope.size_select);
                    break;
                case 6:
                    // 代码3;
                    if( $scope.coordinate_select==item){
                        $scope.coordinate_select="";
                    }else {
                        $scope.coordinate_select=item;
                    }
                    // $scope.coordinate_select=checktype($scope.coordinate_select,item);
                    console.log($scope.coordinate_select);
                    break;
                case 7:
                    // 代码3;
                    if($scope.production_time_select==item){
                        $scope.production_time_select="";
                    }else{
                        $scope.production_time_select=item;
                    }
                    // $scope.production_time_select=checktype($scope.production_time_select,item);
                    console.log($scope.production_time_select);
                    break;
                default:
            }
            console.log($scope.filters);
            getSampleList();

        }
        $scope.orderClick=function (order_by) {
            if( $scope.order_by!=order_by){
                $scope.order_by=order_by
                getSampleList();
            }
        }
        $scope.clickClass=function (classificationId) {
            if( $scope.classificationId!=classificationId){
                $scope.classificationId=classificationId
                getSampleList();
            }
        }

        $scope.jumpPage = function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.current = $scope.search_current;
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                // getPage( $scope.current,$scope.pageTotal,$scope.order,$scope.classificationId)
                getSampleList();

            }
        }
        $scope.search = function(bool) {
            if (bool) {
                // getPage( $scope.current,$scope.pageTotal,$scope.classificationId)
                getSampleList();

            }
        };
    }
});
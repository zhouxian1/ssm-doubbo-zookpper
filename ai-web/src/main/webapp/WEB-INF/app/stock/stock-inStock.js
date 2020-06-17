//声明路由模块inStock
angular.module("inStock",[])
    .component("inStock",{
        templateUrl:"app/stock/stock-inStock.html",
        controller:inStockCtrl
    });
//声明控制器函数inStockCtrl
function inStockCtrl($scope,$http,$cookies){

    $scope.isLogined=$cookies.get('loginStatus');
    $scope.loginUserId=$cookies.get('loginUserId');
    $scope.testText="inStock页面测试文本";
    //$scope.templateUrl1="http://101.201.51.207:8093/card/check_card";
    //$scope.templateUrl2="http://101.201.51.207:8093/card/list";
    $scope.templateUrl1="/card/check_card";//卡号卡密校验
    $scope.templateUrlStock="/card/list";//卡片查询(入库)
    $scope.templateUrlStatus="/card/card_status";//卡片状态
    $scope.parm1={};
    $scope.parm2={};
    $scope.mod_status = "";
    $scope.pageSizes = [{value:5},{value:10},{value:20},{value:50}];
    $scope.pageSizeSelect = $scope.pageSizes[0].value;//获取商品类型列表
    //$scope.parm3={};
    $scope.parmStatus={};
    $scope.mod_checkedMoney = '';//选中时

    //请求销售状态的请
    $http({

        url:$scope.templateUrlStatus,
        headers:{
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
        },
        method:"POST",
        data: $.param($scope.parmStatus)
    }).success(function(response){

        //console.log(response.data);
        $scope.statusList = response.data;
        //console.log("请求发行商成功!");
    }).error(function(){

        console.log("请求销售状态!");
    });
    //验证卡密函数
    $scope.checkCard=function(){
        //$scope.parm={
        //    goodsName:"",
        //    cardNO:"",
        //    cardPwd:""
        //}

        console.log($scope.parm1);
        $http({
            url:$scope.templateUrl1,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.parm1)
        }).success(
            function(response){
                if(response.data=="true"){
                    alert("验证成功");
                }else{
                    alert("验证失败");
                }
                console.log(response.data);//如果返回的是false就验证失败否则就验证成功
            }
        ).error(
            function(){
                console.log("check_card请求失败");
                alert("验证失败");
            }
        )
    };
$scope.allFull=function(){
    $scope.parm1={};
    $scope.parm2={};
    $scope.statusList={};
    $scope.mod_checkedMoney =false;
};
    //封装一个销售状态的函数,点击时才触发
    $scope.xiao=function(){
    /////
    var options=$("#test option:selected");//获取选中的值
    // alert(options.val());
    // alert(options.text());
    $scope.statuL=(options.text());
    angular.forEach($scope.statusList,function(data,index,array){
        if($scope.statuL==$scope.statusList[index].text){
            $scope.statusId=$scope.statusList[index].status;
        }
    });
    console.log($scope.statusId);
    $scope.parm2.status=$scope.statusId;
    console.log($scope.parm2);

    };
    //查询商品信息函数
    $scope.queryCards=function(){
        //var options=$("#test option:selected");//获取选中的项
        //alert(options.val());//拿到选中项的值
       // alert(options.text());//拿到选中项的文本
          $scope.xiao();
        $scope.parm2.status =$scope.mod_status ;
        $scope.parm2.pageSize = $scope.pageSizeSelect;
        if($scope.mod_checkedMoney == true){

            $scope.parm2.countSum = 1;

        }
        $http({
            url:$scope.templateUrlStock,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data: $.param($scope.parm2)
        }).success(
            function(response){
                //console.log("全部商品cardList请求成功");
                console.log(response);
                $scope.cardList=response.data.list;
                console.log($scope.cardList);

                //需要用到的分页显示信息
                //console.log("商品总条数:"+response.data.totalCount);
                $scope.totalCount=response.data.totalCount;
                if (response.data.otherParam == null || response.data.otherParam.totalPrice == null){
                    $scope.totalPrice = 0;
                }else {
                    $scope.totalPrice = response.data.otherParam.totalPrice;
                }
                //console.log("页面显示条数:"+response.data.pageSize);
                $scope.pageSize=response.data.pageSize;
                //console.log("总页数:"+response.data.totalPageCount);
                $scope.totalPageCount=response.data.totalPageCount;
                //console.log("当前页数:"+response.data.pageNum);
                $scope.pageNum=response.data.pageNum;
            }
        ).error(
            function(){
                console.log("全部商品cardList请求失败");
            }
        )
    };

    //页面刚加载完成时进行一次查询全部商品信息
    $scope.queryCards();

    //点击查询特定商品信息时的函数,内部再执行一次商品查询函数
    $scope.queryCardList=function(){
        $scope.queryCards();
    };

    //上一页
    $scope.previous=function(){
        //console.log("商品总条数:"+$scope.totalCount);
        //console.log("页面显示数:"+$scope.pageSize);
        //console.log("总页数:"+$scope.totalPageCount);
        //console.log("当前页数:"+$scope.pageNum);
        if($scope.pageNum==1){
            alert("这已经是第一页了!");
        }else{
            $scope.parm2.pageNO=$scope.pageNum-1;
            $scope.queryCards();
        }
    };

    //下一页
    $scope.next=function(){
        //console.log("商品总条数:"+$scope.totalCount);
        //console.log("页面显示数:"+$scope.pageSize);
        //console.log("总页数:"+$scope.totalPageCount);
        //console.log("当前页数:"+$scope.pageNum);
        if($scope.pageNum==$scope.totalPageCount){
            alert("这已经是最后一页了!");
        }else{
            $scope.parm2.pageNO=$scope.pageNum+1;
            $scope.queryCards();
        }
    };
    /*********** 确认查询 ****************/
    $scope.confirmQuery = function () {
        // console.log($scope.pageSizeSelect);
        $scope.queryCards();
        console.log('触发这个方法');
    };
    //选中是否有金额显示
    $scope.selectMoney = function(checked){
        console.log(checked);
        if(checked == true){

            $scope.parm2 = {

                countSum:1
            };
            $scope.queryCards();

        }

    };


    //跳转到指定页面
    $scope.goToPage=function(){
        console.log("跳转到以下页面:"+$scope.changePage);
        if($scope.changePage==null||$scope.changePage==undefined||$scope.changePage==""){
            alert("不能跳转到空白页面!");
        }else if(!($scope.changePage>=1&&$scope.changePage<=$scope.totalPageCount)){
            alert("页面不能小于1,不能大于页面总数!");
        }else{
            $scope.parm2.pageNO=$scope.changePage;
            $scope.queryCards();
        }
    }
    $scope.pageAdjust();
}
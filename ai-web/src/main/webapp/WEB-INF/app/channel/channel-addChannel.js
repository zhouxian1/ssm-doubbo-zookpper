

//声明路由模块addChannel
angular.module('addChannel',[])
    .component('addChannel',{
        templateUrl:"app/channel/channel-addChannel.html",
        controller:addChannelCtrl
    })
    .directive('customOnChange',function(){
        return{
            restrict:"A",
            link:function(scope,element,attrs){
                var onChangeHandler=scope.$eval(attrs.customOnChange);
                element.bind('change',onChangeHandler);
            }
        }
    });

//声明控制器函数addChannelCtrl
function addChannelCtrl($scope,$http,$routeParams,$location){
    $scope.apiUrl_labels_store= $scope.commonUrl+"v1/admin/labels/store/";//添加标签
    ///v1/admin/labels/getone/1
    $scope.apiUrl_getone = $scope.commonUrl+"v1/admin/labels/getone";
    //v1/admin/labels/update
    $scope.apiUrl_update = $scope.commonUrl+"v1/admin/labels/update";
    $scope.param={}
    $scope.mod_title="";
    $scope.mod_introduction="";
    $scope.type="";
    $scope.addId = $routeParams.id; //goodsId 接住前台返回的id
    console.log($scope.addId)
    $scope.mod_classification_id = "";
    $scope.mod_selectList = [
        {
            id:1,
            text:"插件"
        },
        {
            id:2,
            text:"应用"
        },
        {
            id:3,
            text:"数据"
        }
    ];
    $scope.mod_classification_id = $scope.mod_selectList[0].id
    console.log($scope.mod_classification_id)
    $scope.getoneDetail = function(){
        $http({
            url:$scope.apiUrl_getone+"/"+$scope.addId,
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).success(function(res){
            console.log(res)
            $scope.mod_title = res.data.title;
            console.log(res.data.id)
            $scope.mod_introduction = res.data.introduction;
            if(res.data.type == 1){
                $scope.mod_classification_id = $scope.mod_selectList[0].id
            }
            if(res.data.type== 2){
                $scope.mod_classification_id = $scope.mod_selectList[1].id
            }
            if(res.data.type == 3){
                $scope.mod_classification_id = $scope.mod_selectList[2].id
            }
            if(res.data.type == 4){
                $scope.mod_classification_id = $scope.mod_selectList[3].id
            }
            if(res.data.type == 5){
                $scope.mod_classification_id = $scope.mod_selectList[4].id
            }
        })
    };
    $scope.getoneDetail()
    $scope.addlabe=function () {

        if($scope.addId == null || $scope.addId == undefined || $scope.addId== ""){
            $scope.param.title=$scope.mod_title;
            $scope.param.introduction=$scope.mod_introduction;
            $scope.param.type=$scope.mod_classification_id;
            $http({
                url:$scope.apiUrl_labels_store,
                method:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                },
                data:$scope.param

            }).success(function(response){
                swal("添加成功");
                $location.path("/channelManage")
                console.log(response);
            }).error(function () {
                swal("添加失败");
            });
        }else{
            $scope.param.title=$scope.mod_title;
            $scope.param.introduction=$scope.mod_introduction;
            $scope.param.type=$scope.mod_classification_id;
            $scope.param.id = $scope.addId
            $http({
                url:$scope.apiUrl_update,
                method:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                },
                data:$.param($scope.param)

            }).success(function(response){
                swal("更新成功");
                //channelManage
                $location.path("/channelManage")
                console.log(response);
            }).error(function () {
                swal("添加失败");
            });
        }

    }
}
//声明路由模块addClassify
angular.module('addClassify',[])
    .component('addClassify',{
        templateUrl:'app/goods/goods-addClassify.html',
        controller:addClassifyCtrl
    });

function addClassifyCtrl($scope,$http,$rootScope,$routeParams,$location){

    //url
    $scope.apiUrl_classify = $scope.commonUrl+"/v1/admin/classifications/store";//分类列表
    //http://api.geovis.yunxiaotui.wang/v1/admin/classifications/getone/1
    $scope.apiUrl_classify_detail = $scope.commonUrl+"v1/admin/classifications/getone";
    $scope.apiUrl_update = $scope.commonUrl+"v1/admin/classifications/update";

    $scope.mod_param = {}
    $scope.mod_title = "";
    $scope.mod_introduction = "";
    $scope.mod_parent_id = "";
    $scope.mod_classification_id = "";
    $scope.mod_show = false;
    $scope.mod_showB = true
    $scope.addId = $routeParams.id; //goodsId 接住前台返回的id
    console.log($scope.addId)
    $scope.mod_selectList = [
        {
            id:1,
            text:"资讯"
        },
        {
            id:2,
            text:"样本"
        },
        {
            id:3,
            text:"算法"
        },
        {
            id:4,
            text:"需求"
        },
        {
            id:5,
            text:"知识"
        },
        {
            id:6,
            text:"文档"
        }
    ];
    $scope.mod_classification_id = $scope.mod_selectList[0].id
    console.log($scope.mod_classification_id)
    $scope.classifyDetail = function(){
        $http({
            url:$scope.apiUrl_classify_detail+"/"+$scope.addId,
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
    }
    $scope.classifyDetail()
    $scope.addClassify = function(){
        if($scope.addId == null || $scope.addId == '' || $scope.addId == undefined){
            $scope.mod_param.title = $scope.mod_title
            $scope.mod_param.introduction =  $scope.mod_introduction
            $scope.mod_param.parent_id=   0
            $scope.mod_param.type=   $scope.mod_classification_id
            $http({
                url:$scope.apiUrl_classify,
                method:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                },
                data:$.param($scope.mod_param)
            }).success(function(res){
                if(res.code == 1000){
                    swal("添加成功")
                    $location.path("/addBatch")
                }else{
                    swal(res.msg)
                }

            })
        }else{
            $scope.mod_param.title = $scope.mod_title
            $scope.mod_param.introduction =  $scope.mod_introduction
            $scope.mod_param.parent_id=   0
            $scope.mod_param.type=   $scope.mod_classification_id
            if($scope.mod_param.id!=null || $scope.mod_param.id!=undefined || $scope.mod_param.id!=""){
                $scope.mod_param.id = $scope.addId
            }
            $http({
                url:$scope.apiUrl_update,
                method:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
                },
                data:$.param($scope.mod_param)
            }).success(function(res){
                if(res.code == 1000){
                    swal("更新成功")
                    $location.path("/addBatch")
                }else{
                    swal(res.msg)
                }

            })
        }
     }


}
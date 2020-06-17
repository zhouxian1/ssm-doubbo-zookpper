
angular.module("addOrder",[])
    .component("addOrder",{
        templateUrl:"app/order/order-addOrder.html",
        controller:addOrderCtrl
    });
//addOrderCtrl 操作
function addOrderCtrl($scope,$http,$cookies,$timeout,$routeParams,$location){
    UE.delEditor('ueditorCotent');
    // ueditor 开始调用
    // var ue = UE.getEditor('ueditorCotent');
    var ue = new baidu.editor.ui.Editor('ueditorCotent');
    ue.render('ueditorCotent');

    //url
    $scope.apiUrl_classify = $scope.commonUrl+"/v1/admin/classifications";//分类列表
    //"http://api.geovis.yunxiaotui.wang/v1/upload";
    $scope.apiUrl_add = $scope.commonUrl+"v1/admin/knowledges/update";//添加知识
    //v1/admin/knowledges/{id}添加知识详情
    $scope.apiUrl_knowledges = $scope.commonUrl+"v1/admin/knowledges";
    $scope.apiUrl_classifications= $scope.commonUrl+"v1/admin/classifications";//分类

    $scope.addId = $routeParams.id;
    console.log($scope.addId)
    //参数
    $scope.responseList =[];
    $scope.mod_title = "";
    $scope.mod_content = "";
    $scope.mod_classification_id = "";
    $scope.mod_paramKnow = {};
    $scope.classifyList = [];
    $scope.mod_selectList = [];
    $scope.mod_classify_type = 5;
    $scope.mod_select_text = "";
    console.log($scope.mod_classification_id)
    $scope.classifyListTypeSelect = function(){
        $http({
            url:$scope.apiUrl_classifications+"?type="+$scope.mod_classify_type ,
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).success(function(res){
            if(res.code == 1000){
                console.log(res.data.data)
                $scope.mod_selectList = res.data.data;
                $scope.mod_classification_id = $scope.mod_selectList[0].id
                console.log($scope.mod_classification_id)

            }
        })
    }
    $scope.classifyListTypeSelect()
    //知识详情
    $scope.knowledges = function(){
        $http({
            url:$scope.apiUrl_knowledges+"/"+$scope.addId,
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).success(function(res){
            if(res.code == 1000){
                console.log(res)
                $scope.mod_title = res.data.title;
                // $scope.mod_content = res.data.content;

                // UE.delEditor('ueditorCotent');
                // // ueditor 开始调用
                // var ue = UE.getEditor('ueditorCotent');
                // ue.addListener("ready", function () {
                //     // editor准备好之后才可以使用
                //     $scope.mod_content = ue.setContent(res.data.content);
                //
                // });classification_id
                ue.ready(function() {
                    // editor_a.setContent($('#content').val());
                    $scope.mod_content = ue.setContent(res.data.content);

                });
                $scope.mod_classification_id = res.data.classification_id;

                angular.forEach($scope.mod_selectList,function(data){
                    if(data.id ==$scope.mod_classification_id ){
                        // $scope.mod_classification_id = data.id
                        data.id = $scope.mod_classification_id
                    }
                })
            }
        })
    };
    $scope.knowledges()
    //点击添加
    $scope.addKnowledge = function(){
        $scope.mod_content = ue.getContent();
        console.log($scope.mod_content);
        $scope.mod_paramKnow.title = $scope.mod_title;
        $scope.mod_paramKnow.content = $scope.mod_content;
        $scope.mod_paramKnow.classification_id = $scope.mod_classification_id;
        if($scope.mod_paramKnow.id!=null || $scope.mod_paramKnow.id!=undefined || $scope.mod_paramKnow.id!=""){
            $scope.mod_paramKnow.id = $scope.addId
        }
        $http({
            url:$scope.apiUrl_add,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data:$.param($scope.mod_paramKnow)
        }).success(function(res){
            if(res.code == 1000){
                swal("添加成功")
                $location.path("/orderManage")
            }else{
                swal(res.msg)
            }
        })

    }
    //详情
    $scope.addKnowDetail = function(){

    }

}
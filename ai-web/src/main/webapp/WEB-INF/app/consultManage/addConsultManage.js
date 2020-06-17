/**
 * Created by liuping on 17/8/23.
 */
angular.module("addConsult",[])
    .component("addConsult",{
        templateUrl:"app/consultManage/addConsultManage.html",
        controller:addConsultManageCtrl
    });
function addConsultManageCtrl($scope,$http,$routeParams,$location){
    UE.delEditor('ueditorCotent');
    // ueditor 开始调用
    //     var ue = UE.getEditor('ueditorCotent');
    var ue = new baidu.editor.ui.Editor('ueditorCotent');
    ue.render('ueditorCotent');
    // ue.ready(function() {
    //     // editor_a.setContent($('#content').val());
    //     $scope.mod_content = ue.setContent(res.data.content);
    //
    // });
    //ur
    $scope.apiUrl_classify = $scope.commonUrl+"/v1/admin/classifications";//分类列表
    //"http://api.geovis.yunxiaotui.wang/v1/upload";
    $scope.apiUrl_add = $scope.commonUrl+"v1/admin/articles/update";//添加知识
    //v1/admin/articles/{id}
    $scope.apiUrl_articles = $scope.commonUrl+"v1/admin/articles";
    $scope.apiUrl_classifications= $scope.commonUrl+"v1/admin/classifications";//分类




    //参数
    $scope.responseList =[];
    $scope.mod_title = "";
    $scope.mod_content = "";
    $scope.mod_classification_id = "";
    $scope.mod_paramKnow = {};
    $scope.classifyList = [];
    $scope.addId = $routeParams.id; //goodsId 接住前台返回的id
    $scope.show = false
    $scope.mod_selectList = [
    ];
    // var timer1 = window.setTimeout(function(){
    //     window.location.reload();
    // },5000)
    // window.clearTimeout(timer1)
    // $scope.mod_classification_id = $scope.mod_selectList[0].id
    console.log($scope.mod_classification_id)
    $scope.mod_classify_type = 1;
    // $scope.mod_select_text = "";
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
    $scope.consultsDetail = function(){
        $http({
            url:$scope.apiUrl_articles+"/"+$scope.addId,
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).success(function(res){
            console.log(res)
            // clearTimeout(i)
            $scope.mod_title = res.data.title;
            console.log(res.data.id)
            console.log(res.data.content)

            // UE.delEditor('ueditorCotent');
            // ueditor 开始调用
            // var ue = UE.getEditor('ueditorCotent');
            // ue.addListener("ready", function () {
            //     // editor准备好之后才可以使用
            //     $scope.mod_content = ue.setContent(res.data.content);
            //
            //
            // });
            // var editor_a = new baidu.editor.ui.Editor('ueditorCotent');
            // editor_a.render('ueditorCotent');
            ue.ready(function() {
                // editor_a.setContent($('#content').val());
                $scope.mod_content = ue.setContent(res.data.content);

            });
            // UE.getEditor('ueditorCotent').destroy();
            $scope.mod_introduction = res.data.introduction;
            $scope.mod_classification_id = res.data.classification_id;

            angular.forEach($scope.mod_selectList,function(data){
                if(data.id ==$scope.mod_classification_id ){
                    // $scope.mod_classification_id = data.id
                    data.id = $scope.mod_classification_id
                }
            })
        })
    }
    $scope.consultsDetail()
    $scope.classificationsList = function(){
        $http({
            url:$scope.apiUrl_classify,
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).success(function(res){
            console.log(res)
            $scope.classifyList = res.data;
            console.log($scope.classifyList)

        })
    }
    $scope.classificationsList()
    //点击添加
    $scope.addKnowledge = function(){
        $scope.mod_content = ue.getContent();
        console.log($scope.mod_content);
        $scope.mod_paramKnow.title = $scope.mod_title;
        $scope.mod_paramKnow.content = $scope.mod_content;
        $scope.mod_paramKnow.classification_id = $scope.mod_classification_id
        $scope.mod_paramKnow.user_id = 1;
        if($scope.addId!=null || $scope.addId!=undefined || $scope.addId!=""){
            $scope.mod_paramKnow.id = $scope.addId;
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
                $location.path("/consultManage")
            }else{
                swal(res.msg)
            }
        })

    }
    //详情
    $scope.addKnowDetail = function(){

    }
}
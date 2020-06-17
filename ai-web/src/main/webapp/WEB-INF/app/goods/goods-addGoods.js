//声明路由模块addGoods
angular.module("addGoods",[])
    .component("addGoods",{
        templateUrl:'app/goods/goods-addGoods.html',
        controller:addGoodsCtrl
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
function addGoodsCtrl($scope,$http,$location,$routeParams){

    UE.delEditor('ueditorCotent');

    var ue = UE.getEditor('ueditorCotent');
    $scope.addId = $routeParams.id; //goodsId 接住前台返回的id
    console.log($scope.addId)
    //url v1/app/documents/{id}
    $scope.apiUrl_update = $scope.commonUrl+"v1/admin/documents/update";
    $scope.apiUrl_detailDocuments = $scope.commonUrl+"v1/app/documents";

    //参数
    $scope.mod_title = "";
    $scope.mod_content = "";
    $scope.mod_addArticle = {};
    $scope.mod_classification_id = "";
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
            text:"需求"
        },
        {
            id:4,
            text:"知识"
        },
        {
            id:5,
            text:"文档"
        }
    ];
    $scope.mod_classification_id = $scope.mod_selectList[0].id
    console.log($scope.mod_classification_id)
    $scope.mod_show = ""

    $scope.detailDocuments = function(){
        $http({
            url:$scope.apiUrl_detailDocuments+"/"+$scope.addId,
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).success(function(res){
            if(res.code == 1000){
                console.log(res)
                $scope.mod_title = res.data.title;
                // $scope.mod_content = res.data.content;
                console.log(res.data.content)

                var ue = UE.getEditor('ueditorCotent');

                ue.addListener("ready", function () {
                    // editor准备好之后才可以使用
                    $scope.mod_content = ue.setContent(res.data.content);

                });
                if(res.data.classification_id == 1){
                    $scope.mod_classification_id = $scope.mod_selectList[0].id
                }
                if(res.data.classification_id == 2){
                    $scope.mod_classification_id = $scope.mod_selectList[1].id
                }
                if(res.data.classification_id == 3){
                    $scope.mod_classification_id = $scope.mod_selectList[2].id
                }
                if(res.data.classification_id == 4){
                    $scope.mod_classification_id = $scope.mod_selectList[3].id
                }
                if(res.data.classification_id == 5){
                    $scope.mod_classification_id = $scope.mod_selectList[4].id
                }
            }
        })
    };

    $scope.detailDocuments()
    $scope.addGoodArticle = function(){
        $scope.mod_addArticle.title = $scope.mod_title
        $scope.mod_content = UE.getEditor('ueditorCotent').getContent();
        $scope.mod_addArticle.content = $scope.mod_content
        $scope.mod_addArticle.classification_id = $scope.mod_classification_id;
        if($scope.mod_addArticle.id!=null || $scope.mod_addArticle.id!=undefined || $scope.mod_addArticle.id!=""){
            $scope.mod_addArticle.id = $scope.addId
        }
        $http({
            url:$scope.apiUrl_update,
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
            data:$.param($scope.mod_addArticle)
        }).success(function(res){
            if(res.code == 1000){
                swal("添加成功")
                $location.path("/goodsManage")
            }else{
                swal(res.msg)
            }
        })
    }

    $scope.selectClassify = function(){
        var selectOp = $scope.mod_classification_id
        console.log(selectOp)
    }

}
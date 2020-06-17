
define(['app'], function(app) {
    app.controller('documentListController', documentListController);
    documentListController.$inject = ['$scope','$location','doucumentListService'];

    function documentListController($scope,$location,doucumentListService) {

        var services = doucumentListService.lists;
        $scope.doucumentList={};
        $scope.classificationList={};
        $scope.detail={};

        function getList (page,per_page,classification,k) {
            services.getDocuments(page,per_page,classification.id).then(function (res) {
                console.log(res);
                if(res.status === 200){
                    console.log(res.data.data.data)
                    $scope.doucumentList=res.data.data.data;
                    $scope.classificationList[k].doucumentList= $scope.doucumentList;
                }
            });
        }
        function getDetail (id) {
            services.getDetail(id).then(function (res) {
                if(res.status === 200){
                    $scope.detail=res.data.data;
                    console.log($scope.detail)
                    $("#content").html( $scope.detail.content);

                }
            });
        }
        // getDocuments
        services.getClassifications(1,10,5).then(function (res) {
            console.log(res);
            if(res.status === 200){
                console.log(res.data.data.data)
                $scope.classificationList=res.data.data.data;
                for (var k = 0, length = $scope.classificationList.length; k < length; k++) {
                    // alert($scope.classificationList[k]);
                    getList(1,10,$scope.classificationList[k],k);
                }
            }
        });
        $scope.list = function(id){
            console.log(id);
            getDetail(id);
        }
    }
});
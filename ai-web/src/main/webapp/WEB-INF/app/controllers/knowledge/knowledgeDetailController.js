define(['app'], function(app) {
    app.controller('knowledgeDetailController', knowledgeDetailController);
    knowledgeDetailController.$inject = ['$scope','$location','knowledgeDetailService'];
    function knowledgeDetailController($scope, $location, $knowledgeDetailService) {
        //  把url传过来的参数取出来的方法id
        function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            console.log( url);
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
        var shareComplaintDetailId=GetRequest();
        $scope.knowledgeId="";
        $scope.knowledgeId = shareComplaintDetailId.knowledgeId;
        console.log( $scope.knowledgeId);

        $scope.knowledgeDetail={};
        $scope.content="";
        var services = $knowledgeDetailService.lists;
        services.getDetailPage($scope.knowledgeId).then(function (res) {
            if(res.status===200){
                $scope.knowledgeDetail = res.data.data;
                console.log( $scope.knowledgeDetail);
                $scope.content = $scope.knowledgeDetail.content;
                $("#content").html( $scope.content );
            }
        }) ;
    }
})

   



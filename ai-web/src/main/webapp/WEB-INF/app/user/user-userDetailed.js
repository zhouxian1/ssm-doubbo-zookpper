angular.module("userDetailed",[])
    .component("userDetailed",{
        templateUrl:"app/user/user-userDetailed.html",
        controller:userDetailedCtrl
    });
function userDetailedCtrl($scope,$http,$routeParams,$cookies,$location,$rootScope){

    //url
    $scope.api_url_home = $scope.commonUrl+"v1/admin/users";
    //v1/app/home/users/{user_id}/certification
    $scope.api_certification = $scope.commonUrl+"v1/admin/users"
    //参数

    $scope.detailId =$routeParams.id;
    $scope.user_info={};
    // $scope.mod_userName = "";
    // $scope.mod_actual_name = "";
    // $scope.mod_userNi = "";
    // $scope.mod_avatar_ur= "";
    // $scope.mod_type = "";
    // $scope.mod_factory = "";
    // $scope.mod_fire = "";
    // $scope.mod_id_card = "";
    // $scope.mod_id_image = "";
    // $scope.mod_sheng = "";
    // $scope.param_check = {}
    console.log($scope.detailId)
    $scope.userDetail = function(){
        $http({
            url:$scope.api_url_home+"/"+$scope.detailId,
            method:"GET",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).success(function(res){
            // console.log(res.data.nickName)
            // $scope.mod_userNi = res.data.nickname;
            // console.log($scope.mod_userNi)
            // $scope.mod_actual_name = res.data.actual_name;
            // $scope.mod_avatar_ur = res.data.avatar_url;
            // $scope.mod_type = res.data.type_id;
            //
            // $scope.mod_factory = res.data.company;
            // $scope.mod_fire = res.data.position;
            // $scope.mod_id_card = res.data.ID_card_num;
            // $scope.mod_sheng = res.data.ID_card_url

            // $scope.mod_userPhone = res.data
            $scope.user_info = res.data;


        })
    }
    $scope.userDetail()

}
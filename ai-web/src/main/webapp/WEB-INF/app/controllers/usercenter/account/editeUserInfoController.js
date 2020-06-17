/**
 * Created by HP on 2017/9/12.
 */
define(['app'], function(app) {

    app.controller('editeUserInfoController', editeUserInfoController);

    editeUserInfoController.$inject = ['$scope','$location','$cookies','editeUserService'];
    function editeUserInfoController($scope,$location,$cookies,editeUserService) {

        var services = editeUserService.lists;
        $scope.userInfo={
            nickname:"",
            signature:"",
            company:"",
            position:"",
            sex:"",
            user_id:$cookies.get("user_id")
        };

        if($cookies.get("user_id")){
            services.getUserDetail($cookies.get("user_id")).then(function (res) {
                console.log( res);
                if(res.status === 200){
                    $scope.userInfo=res.data.data;
                }
            });
        }else{
            $location.path("/");
        }
        // user_id,data
      $scope.save=function () {
          services.save($cookies.get("user_id"), $scope.userInfo).then(function (res) {
              console.log( res);
              if(res.status === 200&&res.data.code==1000){
                  $location.path("/usercenter");
              }
          });
      };
      $scope.cancel=function () {
          $location.path("/usercenter/home");

      }
    }
});
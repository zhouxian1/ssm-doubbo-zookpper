/**
 * Created by liuping on 17/4/17.
 */
angular.module("comeOnCardList",[])
    .component("comeOnCardList",{

        templateUrl : 'app/order/order-comeOnCardList.html',
        controller : comeOnCardListCtrl
    });

function comeOnCardListCtrl($scope,$http,$routeParams,$cookies,$timeout,$rootScope){

    $scope.isLogined = $cookies.get("loginStatus");
    $scope.loginUserId = $cookies.get("loginUserId");


}
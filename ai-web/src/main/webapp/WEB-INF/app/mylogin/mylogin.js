/**
 * Created by liuping on 17/8/7.
 */
//声明路由模块inStock
angular.module("mylogin",[])
    .component("mylogin",{
        templateUrl:"app/mylogin/mylogin.html",
        controller:myloginCtrl
    });
function myloginCtrl($scope,$http,$timeout,$route,$cookies){

};
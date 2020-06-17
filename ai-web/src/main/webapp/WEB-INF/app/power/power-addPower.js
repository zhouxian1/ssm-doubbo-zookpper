//声明路由模块addPower
angular.module('addPower',[])
    .component('addPower',{
        templateUrl:'app/power/power-addPower.html',
        controller:addPowerCtrl
    })
    .directive('customOnChange',function(){//用于file上传文件,定义一个属性,执行这个方法
        return{
            restrict:"A",//表示是一个attribute是一个属性
            link:function(scope,element,attrs){
                var onChangeHandler = scope.$eval(attrs.customOnChange);//运行时赋值customOnChange或者可以用$parse(attrs,customOnChange)
                element.bind('change',onChangeHandler);//赋值绑定在这个事件上
            }
        }
    });

function addPowerCtrl($scope,$http,$cookies){


    $scope.pageAdjust();
}
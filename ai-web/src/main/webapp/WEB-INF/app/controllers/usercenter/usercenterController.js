define(['app'], function(app) {
    app.controller('usercenterController', usercenterController);

    usercenterController.$inject = ['$scope', '$location', '$state','userCenterService'];
    function usercenterController($scope, $location, $state,$userCenterService) {
        // $location.path('/usercenter/home')
        console.log(12321321312);
        $state.go('usercenter.home');
    }
})
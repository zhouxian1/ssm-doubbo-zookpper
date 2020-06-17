define([
    'angular',
    'uiroute'
], function(angular, uiroute) {
  return angular.module("webapp",
    // 加载angular应用的依赖模块
        [
            'ui.router',
            'ui.bootstrap',
            'angularFileUpload',
            'ngCookies'
        ]
  )
});


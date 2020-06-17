// define('app', function (app) {
//     alert(1);
//      app.filter('trust2Html', trust2Html);
//     trust2Html.$inject = ['$sce'];
//     function trust2Html($sce) {
//           return function(val) {
//               console.log(val)
//             return $sce.trustAsHtml(val);
//         };
//     }
define(['app'], function (app) {
    app.filter('trust2Html', function ($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    });
})
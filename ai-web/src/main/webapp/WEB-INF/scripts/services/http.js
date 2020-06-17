/**
 * $http基本方法封装
 */
define(['app'], function(app) {
    app.factory('http', http);
    // , '$uibModal'
    http.$inject = ['$http', 'baseUrl', 'baseUrl2','baseUrl4'];

    function http($http, baseUrl, baseUrl2,baseUrl4) {
        var methods = {
            'call': function(type, url, param, data) {
                var vals = {
                    method: type,
                    url: url,
                    // transformRequest: angular.identity,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    // headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    // headers: { 'Content-Type': undefined },
                    params: param,
                    data: data,
                    transformRequest: function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                };
                return $http(vals).then(methods.success);
            },
            'success': function(data) {
                return data;
            },
            // 'errorModal': function(data) {
            //     $modal.open({
            //         templateUrl: 'scripts/directive/errorModal.html ',
            //         size:'sm',
            //         backdrop: "static", 
            //         controller: "errorModal",
            //         resolve: {
            //             error: function() {
            //                 return data;
            //             }
            //         }
            //     });
            // },
            'get': function(url, param) {
                if(url.indexOf('http://')==0){
                    console.log(url + ",param=" + param);
                    return methods.call('GET', url, param || null);
                }else {
                    if (param == 1) {//王浩然接口
                        console.log(baseUrl2 + url + ",param=" + param);
                        return methods.call('GET', baseUrl2 + url, param || null);
                    } else if (param == 2) {//深度学习平台接口接口
                        console.log(baseUrl4 + url + ",param=" + param);

                        return methods.call('GET', baseUrl4 + url, param || null);
                    } else if (param == 3) {//王浩然接口,没有www，
                        console.log(baseUrl2.replace("www.", '') + url + ",param=" + param);
                        return methods.call('GET', baseUrl2.replace("www.", '') + url, param || null);
                    } else if (param == 4) {//深度学习平台接口接口,没有www，
                        console.log(baseUrl4.replace("www.", '') + url + ",param=" + param);
                        return methods.call('GET', baseUrl4.replace("www.", '') + url, param || null);
                    } else {//默认API接口
                        return methods.call('GET', baseUrl + url, param || null);
                    }
                }
            },
            'put': function(url, data) {
                return methods.call('PUT', baseUrl + url, null, data);
            },
            'post': function(url, data) {
                if(url.startsWith("http://")){
                    return methods.call('POST',url, null, data);
                }else{
                    return methods.call('POST', baseUrl + url, null, data);
                }
            },
            'patch': function(url, data) {
                return methods.call('patch', baseUrl + url, null, data);
            },
            'delete': function(url, data) {
                return methods.call('delete', baseUrl + url, null, data);
            },
            'getBaseUrl': function() {
                return baseUrl;
            },
            // 'postAllUrl': function(url, data) {
            //     return methods.call('POST',url, null, data);
            // },
            // 'getAllUrl': function(url, param) {
            //     return methods.call('GET',url, param || null);
            // },
        };
        return methods;
    } //http
    app.factory('utils', utils);
    utils.$inject = ['toastr'];

    function utils(toastr) {
        var methods = {
            notifySuccess: function(content, title) {
                toastr.success(content, title, {
                    progressBar: true,
                    timeOut: 3000,
                    closeButton: true
                });
            },
            notifyInfo: function(content, title) {
                toastr.info(content, title, {
                    progressBar: true,
                    timeOut: 3000,
                    closeButton: true
                });
            },
            notifyError: function(content, title) {
                toastr.error(content, title, {
                    progressBar: true,
                    timeOut: 3000,
                    closeButton: true
                });
            },
            notifyWarning: function(content, title) {
                toastr.warning(content, title, {
                    progressBar: true,
                    timeOut: 3000,
                    closeButton: true
                });
            },
            notifyNotitle: function(content, title) {
                toastr.success(content, {
                    progressBar: true,
                    timeOut: 3000,
                    closeButton: true
                });
            }
        };
        return methods;
    } //utils

    app.controller("errorModal", ['$scope', '$uibModalInstance', 'error', function($scope, $uibModalInstance, error) {
        $scope.error = error.data.Message;
        // console.log($scope.error);
        var methods = {
            cancel: function() {
                $uibModalInstance.dismiss(true);
            },
            report: function() {
                $uibModalInstance.close(true);
            }
        }
        angular.extend($scope, methods, error);
    }]);
})

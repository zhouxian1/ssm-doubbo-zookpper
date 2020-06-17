define(['app'], function(app) {

    app.controller('headerController', headerController);//定义contorller
    headerController.$inject = ['$scope','$location', 'headService','$cookies',"baseUrl"];//参数

    function headerController($scope, $location, headService,$cookies,baseUrl) {
        // a.indexOf("l")
        $scope.lists = [
            { sref: 'index', name: '首页', active: true },
            { sref: 'article', name: '资讯', active: false },
            { sref: 'sample', name: '样本', active: false },
            { sref: 'data', name: '数据', active: false },
            { sref: 'pluginunit', name: '插件', active: false },
            { sref: 'application', name: '应用', active: false },
            { sref: 'demand', name: '需求', active: false },
            { sref: 'knowledgelist', name: '知识', active: false},
            { sref: 'document', name: '文档', active: false},
            { href: 'http://bbs.geovis.ai/', sref: 'http://bbs.geovis.ai/', target:"_blank", name: '论坛', active: false },
            // { href: false, sref: 'download', name: '下载', active: false }
        ];
        function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
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
        $scope.code= shareComplaintDetailId.code;
        $scope.userCode= shareComplaintDetailId.user;
        $scope.userCodeResult={};
        console.log( $scope.userCode);

        $scope.user={
            access_token:$cookies.get("access_token"),
            role:$cookies.get("role"),
            user_name:$cookies.get("user_name"),
            user_id:$cookies.get("user_id")
        };
        // console.log( $scope.loginUrl);
        // var currentUrl= $location.absUrl();
        var services = headService.lists;
        function getUserDetail() {
            services.getUserDetail($cookies.get("user_id")).then(function (res) {
                console.log( res);
                if (res.status === 200) {
                    if(res.data.code==1000){
                        $cookies.put("avatar_url",res.data.data.avatar_url);
                        $cookies.put("nickname",res.data.data.nickname);
                    }else{
                        alert("登录失败"+res.data.msg);
                    }
                    // var user_name= $cookies.get("user_name");
                    // console.log(user_name);
                }else{
                    alert("登录失败，错误信息为"+res.statusText);
                }
            });
        }
        function login() {
            services.login($scope.code).then(function (res) {
                console.log( res);
                if (res.status === 200) {
                    if(res.data.code==1000){
                        $scope.user=  res.data.data;
                        $cookies.put("access_token",$scope.user.access_token);
                        $cookies.put("role",$scope.user.role);
                        $cookies.put("user_name",$scope.user.user_name);
                        $cookies.put("user_id",$scope.user.user_id);
                        getUserDetail($scope.user.user_id);
                    }else{
                        alert("登录失败");
                    }
                    // var user_name= $cookies.get("user_name");
                    // console.log(user_name);
                }else{
                    alert("登录失败，错误信息为"+res.statusText);
                }
            });
        };
        if($scope.code&&(!$scope.user.access_token||!$scope.user.user_name||!$scope.user.user_id)){
            login();
        }else if($scope.userCode){
            // var base64=new Base64();
            // $scope.userCodeResult= toJson(base64.decode($scope.userCode ));
            window.location.href=baseUrl+"/v1/authorize?redirect_uri="+$location.absUrl();
        }

        $scope.loginClick=function () {
            if($cookies.get("user_id")){//退出登录
                    $cookies.remove('access_token');
                    $cookies.remove('role');
                    $cookies.remove('user_name');
                    $cookies.remove('user_id');
                    $scope.user={
                        access_token:$cookies.get("access_token"),
                        role:$cookies.get("role"),
                        user_name:$cookies.get("user_name"),
                        user_id:$cookies.get("user_id")
                    };
            }else{//登录
                window.location.href=baseUrl+"/v1/authorize?redirect_uri="+$location.absUrl();
            }
        }

        $scope.searchClick = function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.current = $scope.search_current;
                // getPage($scope.current, $scope.pageTotal, $scope.classification_id);
                // getPage( $scope.current,$scope.pageTotal,$scope.order,$scope.labId)
                var search = document.getElementById("searchInput").value;
                if (search){
                    window.location.href = '/search?search=' + search;
                }
            }
        }
        $scope.register=function () {
            window.location.href=baseUrl+"/v1/register?redirect_uri="+$location.absUrl();
        }
        function toJson(str){
            var json = (new Function("return " + str))();
            return json;
        }
        /**
         *
         * Base64 encode / decode
         *
         * @author haitao.tu
         * @date 2010-04-26
         * @email tuhaitao@foxmail.com
         *
         */
        function Base64() {

            // private property
            _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

            // public method for encoding
            this.encode = function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
                input = _utf8_encode(input);
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output +
                        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
                }
                return output;
            }

            // public method for decoding
            this.decode = function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                while (i < input.length) {
                    enc1 = _keyStr.indexOf(input.charAt(i++));
                    enc2 = _keyStr.indexOf(input.charAt(i++));
                    enc3 = _keyStr.indexOf(input.charAt(i++));
                    enc4 = _keyStr.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                }
                output = _utf8_decode(output);
                return output;
            }

            // private method for UTF-8 encoding
            _utf8_encode = function (string) {
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";
                for (var n = 0; n < string.length; n++) {
                    var c = string.charCodeAt(n);
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }
                return utftext;
            }

            // private method for UTF-8 decoding
            _utf8_decode = function (utftext) {
                var string = "";
                var i = 0;
                var c = c1 = c2 = 0;
                while ( i < utftext.length ) {
                    c = utftext.charCodeAt(i);
                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    } else if((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i+1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    } else {
                        c2 = utftext.charCodeAt(i+1);
                        c3 = utftext.charCodeAt(i+2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
                }
                return string;
            }
        }
    }
})

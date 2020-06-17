define(['app','moment'], function (app,moment) {
  // 顶部导航点击选中状态
  app.directive('sideBar', function () {
        return {
            restrict: 'A',
            link: function (scope, ele, attr) {
                angular.element(ele).find('li').on('click', function () {
                    $(this).addClass('active').siblings().removeClass('active');
                    console.log($(this))
                })

            }
        }
    });
  // 上传图片处理
  app.directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]);

  //年月日 时分秒
    app.directive('date', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                element.on('focus', function() {
                    WdatePicker({
                        dateFmt: 'yyyy-MM-dd HH:mm:ss',
                        minTime:'00:00:00',
                        maxTime:'23:59:59',
                        el: this
                    });
                    ngModel.$setViewValue(element.val());
                })
            }
        };
    });


    app.directive('ymd', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                element.on('focus', function() {
                    WdatePicker({
                        dateFmt: 'yyyy-MM-dd',
                        minTime:'00:00:00',
                        maxTime:'23:59:59',
                        el: this
                    });
                    if (attrs.start) {
                        var diff = moment(moment(element.val())).diff(scope.$eval(attrs.start), 'days');
                        if (diff < 0) {
                            element.parents('.form-group').addClass('has-error');
                            element.val('');
                            ngModel.$setViewValue('');
                            return false;
                        } else {
                            element.parents('.form-group').removeClass('has-error');
                        }
                    }
                    if (attrs.end) {
                        var diff = moment(scope.$eval(attrs.end)).diff(moment(element.val()), 'days');
                        if (diff < 0) {
                            element.parents('.form-group').addClass('has-error');
                            element.val('');
                            ngModel.$setViewValue('');
                            return false;
                        } else {
                            element.parents('.form-group').removeClass('has-error');
                        }
                    }
                    ngModel.$setViewValue(element.val());
                })
            }
        };
    });











});

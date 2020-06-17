$(function() {
	// Waves初始化
	Waves.displayEffect();
	// 输入框获取焦点后出现下划线
	$('.form-control').focus(function() {
		$(this).parent().addClass('fg-toggled');
	}).blur(function() {
		$(this).parent().removeClass('fg-toggled');
	});
});
Checkbix.init();
$(function() {
	// 点击登录按钮
	$('#login-bt').click(function() {
		login();
	});
	// 回车事件
	$('#username, #password').keypress(function (event) {
		if (13 == event.keyCode) {
			login();
		}
	});
});
// 登录
function login() {
	$.ajax({
		url: basePath + '/sso/checkIsDel',
		type: 'POST',
		dataType:"text",
		data: {
			username: trim($('#username').val()),
		},
		beforeSend: function() {
			if ($('#username').val() == '') {
                $('#username').focus();
                return false;
            }
            if ($('#password').val() == '' ) {
                $('#password').focus();
                return false;
            }
		},
		success: function(json){
			if(json=="1"){
				alert("该用户已被禁止无法登录!!!");
			}else if(json=="2"){
				alert("用户名不存在!!!");				
			}else{
				$.ajax({
				url: basePath + '/sso/login',
				type: 'POST',
				data: {
					username: trim($('#username').val()),
					password: trim($('#password').val()),
					rememberMe: $('#rememberMe').is(':checked'),
					backurl: basePath +'/manage/index'
				},
				beforeSend: function() {
					
				},
				success: function(json){
					if (json.code == 200) {
						location.href = json.data;
					} else {
						if (401 == json.code) {
							alert(json.data);
							//$('#username').focus();
						}
						if (10102 == json.code) {
							$('#password').focus();
						}
					}
				},
				error: function(error){
					console.log(error);
				}
			});
			}
		},
		error: function(error){
			console.log(error);
		}
	});

}

function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
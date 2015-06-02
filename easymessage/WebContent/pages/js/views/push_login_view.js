window.ADF = window.ADF || {};

ADF.PushLoginView = Backbone.View.extend({
	events : {
		"click #login-login-btn" : "login",
		"keypress #login-id-input" : "idEnter",
		"keypress #login-pass-input" : "passEnter"
	},

	initialize : function() {

		_.bindAll(this, 'beforeRender', 'render', 'afterRender', 'login',
				'loginFormCheck', 'idEnter', 'passEnter');
		var _this = this;
		this.render = _.wrap(this.render, function(render) {
			_this.beforeRender();
			render();
			_this.afterRender();
			return _this;

		});
		this.login = _.wrap(this.login, function(login) {
			var loginFormCheck = _this.loginFormCheck();
			if (loginFormCheck) {
				login();
			}

		});
	},
	el : '.main-content-inner',
	beforeRender : function() {
		$('#sidebar-shortcuts').hide();
		$('#sidebar-ul-list').hide();
		$('#login-user-info-div').hide();
		
	},
	render : function() {
		console.log("login view render..");
		var that = this;
		$.get('pages/js/template/push_login_template.html', function(data) {
			var template = _.template(data, {});
			that.$el.html(template);
		}, 'html');

	},
	afterRender : function() {
		console.log('after render..');
	},

	loginFormCheck : function() {
		var loginId = $('#login-id-input').val();
		var loginPass = $('#login-pass-input').val();
		if (loginId == null || loginId == "") {
			alert("아이디 입력해주세요");
			$('#login-id-input').focus();
			return false;
		}
		if (loginPass == null || loginPass == "") {
			alert("비밀번호를  입력해주세요");
			$('#login-pass-input').focus();
			return false;
		}
		return true;
	},
	idEnter : function(e) {
		if (e.keyCode == 13) {
			$('#login-pass-input').focus();
			return false;
		}

	},
	passEnter : function(e) {
		console.log('pass endter');
		if (e.keyCode == 13) {
			console.log('로그인버튼 클릭');
			$('#login-login-btn').click();
			return false;
		}

	},

	login : function() {
		var loginInfo = new Object();
		var loginId = $('#login-id-input').val();
		var loginPass = $('#login-pass-input').val();
		loginInfo.userId = loginId;
		loginInfo.password = loginPass;
		var loginReq = JSON.stringify(loginInfo);

		$.ajax({
			url : '/v1/pms/adm/cmm/auth',
			type : 'POST',
			contentType : "application/json",
			headers : {
				'X-Application-Token' : 'admauth'
			},
			dataType : 'json',
			async : false,
			data : loginReq,
			success : function(data) {
				if (!data.result.errors) {
					var role = data.result.data.role;
					var token = data.result.data.token;
					var userId = data.result.data.userId;
					var ufmi = data.result.data.ufmi;
					var groupTopic = data.result.data.groupTopic;
					var userName = data.result.data.userName;

					if (ufmi != null) {
						sessionStorage.setItem("ufmi", ufmi);

					}
					if (groupTopic != null) {
						sessionStorage.setItem("groupTopic", groupTopic);
					}
					sessionStorage.setItem("role", role);
					sessionStorage.setItem("token", token);
					sessionStorage.setItem("userId", userId);
					sessionStorage.setItem("userName", userName);

					if (userName == null || userName == "") {

						pushRouter.navigate('user_info', {
							trigger : true
						});
						return false;
					}

					if (role == "svc") {
						pushRouter.navigate('msg_send', {
							trigger : true
						});
					} else {
						alert('해당 계정으로는 로그인 할 수 없습니다!');

					}

				} else {

					alert('로그인에 실패 하였습니다.');
				}

			},
			error : function(data, textStatus, request) {

				alert('로그인에 실패 하였습니다.');

			}

		});
	}
});

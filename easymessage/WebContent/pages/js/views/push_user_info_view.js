window.ADF = window.ADF || {};
ADF.PushUserInfoView = Backbone.View.extend({
	// user-info-modify-btn

	events : {
		"click #user-info-modify-btn" : "userInfoModify",
		"click #user-info-confirm-btn" : "userInfoConfirm"
	},

	initialize : function() {
		_.bindAll(this, 'render', 'beforeRender', 'afterRender',
				'userInfoModify', 'userInfoConfirm');
		var _this = this;
		this.render = _.wrap(this.render, function(render) {
			_this.beforeRender();
			render();
			_this.afterRender();
			return _this;
		});

	},

	el : '.main-content-inner',
	beforeRender : function() {
		console.log('before render...');
		$('#sidebar-shortcuts').show();
		$('#sidebar-ul-list').show();
		$('#login-user-info-div').show();
		

	},
	afterRender : function() {
		console.log('after render..');

	},

	render : function() {
		console.log("user Info view render..");
		var that = this;
		var token = sessionStorage.getItem("token");
		var userId = sessionStorage.getItem("userId");
		var userName = sessionStorage.getItem("userName");
		var ufmi = sessionStorage.getItem("ufmi");

		console.log(token);
		console.log(userId);
		console.log(ufmi);
		console.log(userName);
		if (token == null || token == "" || token == "null" || userId == null
				|| userId == "" || userId == "null" || ufmi == "null"
				|| ufmi == null || ufmi == "") {
			alert('사용시간이 만료 되었거나 해당 정보가 올바르지 않아 자동로그 아웃됩니다!');
			pushRouter.navigate('login', {
				trigger : true
			});
			return false;
		}

		$.get('pages/js/template/push_user_info_template.html', function(data) {
			var template = _.template(data, {});
			that.$el.html(template);
			$('#user-info-ufmi-input').val(ufmi);
			if (userName == "" || userName == null || userName == "null") {
				console.log('사용자 정보 이프');
				$('#user-info-sendnum-input').val("");
			} else {
				$('#user-info-sendnum-input').val(userName);
			}

			$('#user-info-id-input').val(userId);
		}, 'html');
	},
	userInfoModify : function() {
		console.log('사용자 정보 수정 버튼 클릭');

		var checkInput = $('#user-info-sendnum-input').prop('disabled');
		if (checkInput == true) {
			$('#user-info-sendnum-input').prop('disabled', false);
		} else {
			$('#user-info-sendnum-input').prop('disabled', true);
		}

	},
	userInfoConfirm : function() {
		var sessionSendNum = sessionStorage.getItem("userName");
		var token = sessionStorage.getItem("token");
		var sendNumInput = $('#user-info-sendnum-input').val();
		if (sendNumInput == null || sendNumInput == "") {
			alert('발송 번호가 없습니다! 발송번호를 입력해주세요.');
			$('#user-info-sendnum-input').focus();
			return false;
		} else {
			if (sessionSendNum != sendNumInput) {
				if (confirm('입력하신 발송번호로 수정하시겠습니까?') == true) {
					var user_Info_sendnum_input = $('#user-info-sendnum-input').val();
					
					var userNameUpdate = new Object();
					userNameUpdate.userName = user_Info_sendnum_input;
					var userNameUpdateReq = JSON.stringify(userNameUpdate);

					$.ajax({
						url : '/v1/pms/adm/svc/users/name',
						type : 'PUT',
						contentType : "application/json",
						headers : {
							'X-Application-Token' : token
						},
						dataType : 'json',
						data : userNameUpdateReq,

						async : false,
						success : function(data) {
							if (!data.result.errors) {
								alert('발송번호를 수정 하였습니다.');
								sessionStorage.setItem("userName",
										user_Info_sendnum_input);
								$('#user-info-sendnum-input').prop('disabled', true);
							} else {
								alert('발송번호 수정에 실패 하였습니다.');
								// console.log('이름 업데이트 실패');
							}

						},
						error : function(data, textStatus, request) {
							alert('발송번호 수정에 실패 하였습니다.');
							// console.log('이름 업데이트 실패');
						}
					});

				} else {
					return false;
				}
			}
		}

	}

});

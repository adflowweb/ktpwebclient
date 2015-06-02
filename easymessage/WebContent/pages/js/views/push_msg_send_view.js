window.ADF = window.ADF || {};
ADF.PushMsgSendView = Backbone.View
		.extend({

			events : {
				"change #msg-send-private-user-repeat-check" : "msgRepeatCheck",
				"input #send-private-input" : "checkSendPrivateInput",
				"input #send-private-fleep-bunch-input" : "checkSendBunchInput",
				"click #msg-send-private-plus-span" : "plusUfmiCheck",
				"input #msg-send-private-content-textarea" : "checkContentArea",
				"input #msg-send-private-repeat-time-input" : "checkRepeatTime",
				"click #msg-send-private-btn" : "msgSend",
				"click #msg-send-private-cancel-btn" : "msgSendCancel"

			// "click #msg-list-detail-btn":"getDetailList"
			},

			initialize : function() {
				_.bindAll(this, 'render', 'beforeRender', 'afterRender',
						'msgRepeatCheck', 'plusUfmiCheck',
						'checkSendBunchInput', 'checkSendPrivateInput',
						'checkContentArea', 'msgSend', 'msgSendFormCheck',
						'checkRepeatTime', 'msgSendCancel');
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
			msgSendCancel : function() {
				$('#send-private-fleep-bunch-input').val("");
				$('#send-private-input').val("");
				$('#msg-send-private-user-target-show-input').val("");
				$('#msg-send-private-user-target-show-div').hide();
				$('#msg-send-private-content-textarea').val("");
				$('#msg-send-private-user-repeat-check').attr('checked', false);
				$('#msg-send-private-reservation-date-input').val("");
				$('#msg-send-private-repeat-div').hide();
				$('#msg-send-private-repeat-cnt-select').val(0);
				$('#msg-send-private-repeat-time-input').val("");

			},

			checkRepeatTime : function() {
				console.log('asdf');
				var num_check = /^[0-9]*$/;
				var private_input = $("#msg-send-private-repeat-time-input")
						.val();

				if (!num_check.test(private_input)) {
					alert('숫자 만 입력 가능합니다!');
					$("#msg-send-private-repeat-time-input").focus();
					return false;
				}
			},

			msgSend : function() {
				var userName = sessionStorage.getItem('userName');
				if (userName == null || userName == "" || userName == "null") {
					alert('발송번호를 등록해야 정상 사용이 가능합니다.!');
					pushRouter.navigate('user_info', {
						trigger : true
					});
					return false;
				}
				if (this.msgSendFormCheck()) {

					var messageTarget = $('#msg-send-private-user-target-show-input').val();
					console.log(messageTarget);
					console.log('123123123123');
					messageTarget = pushUtil.compactTrim(messageTarget);
					console.log('123');
					var messageContent = $('#msg-send-private-content-textarea')
							.val();
					var input_reservation = $(
							'#msg-send-private-reservation-date-input')
							.val();
					var input_resendCount = $(
							'#msg-send-private-repeat-cnt-select').val();
					var input_resendInterval = $(
							'#msg-send-private-user-resendInterval-input')
							.val();
					var dateResult = "";
					var messageData = new Object();
					console.log('34666');
					if (input_reservation != "") {

						dateResult = pushUtil.dateFormating(input_reservation);
						dateResult = dateResult.toISOString();
					}

					if (dateResult != "") {
						messageData.reservationTime = dateResult;

					}

					if (input_resendCount != 0) {
						messageData.resendMaxCount = input_resendCount;
					}
					if (input_resendInterval != "") {
						messageData.resendInterval = input_resendInterval;
					}

					console.log('346123123');
					messageContent = pushUtil.utf8_to_b64(messageContent);
					messageTarget = messageTarget.split(",");
					// console.log('메지시 수신자 변경');
					// messageTarget[0] = 'mms/P1/82/50/g130';

					messageData.receivers = messageTarget;
					messageData.content = messageContent;
					messageData.contentType = "application/base64";

					// end 전송대상 체크

					var contentLength = $('#msg-send-private-length-strong')
							.text();
					messageData.contentLength = contentLength;
					console.log('메시지 전송전 길이');
					console.log(messageData.contentLength);

					var messageDataResult = JSON.stringify(messageData);

					/*
					 * if (utf8ByteLength(messageDataResult) > 512000) {
					 * alert('메시지 사이즈가 너무 큽니다.'); return false; }
					 */

					var sendCount;
					if (messageData.resendMaxCount) {
						console.log('반복 있음');

						messageData.receivers.length = messageData.receivers.length * 1;
						messageData.resendMaxCount = messageData.resendMaxCount * 1;
						sendCount = (messageData.receivers.length * messageData.resendMaxCount)
								+ messageData.receivers.length

					} else {
						sendCount = messageData.receivers.length;

					}

					if (messageData.reservationTime) {
						if (confirm(messageData.receivers + " 해당 무전번호로 총 "
								+ sendCount + "건의 메시지가 예약발송 됩니다. 전송 하시겠습니까?") == true) {
							$('#msg-send-private-user-target-show-input').val("");
							$('#msg-send-private-user-textarea').val("");
							$('#msg-send-private-length-strong').text("0");
							$('#msg-send-private-user-reservationdate-input').val(
									"");
							$('#msg-send-private-user-resendCount-input').val("");
							$('#msg-send-private-user-resendInterval-input')
									.val("");
						} else {
							return false;
						}
					} else {
						if (confirm(messageData.receivers + " 해당 무전번호로 총 "
								+ sendCount + "건의 메시지가 전송 됩니다. 전송 하시겠습니까?") == true) {
							$('#msg-send-private-user-target-show-input').val("");
							$('#msg-send-private-user-textarea').val("");
							$('#msg-send-private-length-strong').text("0");
							$('#msg-send-private-user-reservationdate-input').val(
									"");
							$('#msg-send-private-user-resendCount-input').val("");
							$('#msg-send-private-user-resendInterval-input')
									.val("");
						} else {
							return false;
						}
					}

					var token = sessionStorage.getItem("token");

					$.ajax({
						url : '/v1/pms/adm/svc/messages',
						type : 'POST',
						headers : {
							'X-Application-Token' : token
						},
						contentType : "application/json",
						dataType : 'json',
						async : false,
						data : messageDataResult,

						success : function(data) {

							if (!data.result.errors) {
								alert(messageData.receivers.length
										+ '건의 메시지를 발송하였습니다.');

							} else {
								alert('메시지 전송에 실패 하였습니다.');

							}

						},
						error : function(data, textStatus, request) {
							if (data.status == 401) {
								alert("사용시간이 경과되어 자동 로그아웃 됩니다.");
								sessionStorage.removeItem("token");
								sessionStorage.removeItem("userId");
								sessionStorage.removeItem("role");

								sessionStorage.removeItem("groupTopic");
								sessionStorage.removeItem("ufmi");
								sessionStorage.removeItem("userName");
								pushRouter.navigate('login', {
									trigger : true
								});
								return false;
							}
							alert('메시지 전송에 실패 하였습니다.');

						}
					});

				}

			},
			msgSendFormCheck : function() {

				var messageTarget = $(
						'#msg-send-private-user-target-show-input').val();
				messageTarget = pushUtil.compactTrim(messageTarget);
				var messageContent = $('#msg-send-private-content-textarea')
						.val();
				var input_reservation = $(
						'#msg-send-private-reservation-date-input').val();

				if (messageTarget == null || messageTarget == "") {
					alert("+ 버튼을 눌러 무전번호를 추가해 주세요!");
					$('#send-private-input').focus();
					return false;
				}
				if (messageContent == null || messageContent == "") {
					alert("메세지 보낼 내용을 입력해주세요");
					$('#msg-send-private-content-textarea').focus();
					return false;
				}

				var checkedLength = $('input[id="msg-send-private-user-repeat-check"]:checked').length;
				if (checkedLength != 0) {
					var selectValue = $('#msg-send-private-repeat-cnt-select')
							.val();
					if (selectValue == 0) {
						alert('반복 횟수를 입력해주세요!');
						$('#msg-send-private-repeat-cnt-select').focus();
						return false;
					}

					var repeatValue = $('#msg-send-private-repeat-time-input')
							.val();
					if (repeatValue == null || repeatValue == "") {
						alert('반복 시간을 입력해주세요!');
						$('#msg-send-private-repeat-time-input').focus();
						return false;
					} else {
						repeatValue = repeatValue * 1;
						if (repeatValue > 1440) {
							alert('반복시간은 최대 24시간(1440)분을 넘을 수 없습니다!');
							$('#msg-send-private-repeat-time-input').focus();
							return false;
						}
					}

				}

				if (input_reservation == null || input_reservation == "") {
					console.log('예약 메시지 없음');
				} else {

					if (input_reservation) { // 예약 메세지
						var convertDate = input_reservation;

						input_reservation = pushUtil
								.compactTrim(input_reservation);

						input_reservation = input_reservation.substring(0, 10);

						convertDate = pushUtil.dateFormating(convertDate);
						var nowDateTime = new Date();
						var nowTime = nowDateTime.getTime() + 300000;
						var convertPickerTime = convertDate.getTime();
						if (nowTime > convertPickerTime) {
							alert('예약메세지는 현재 시각기준보다 5분 이상 설정 되어야 합니다.');
							return false;
						}

					}
				}

				return true;

			},

			checkContentArea : function() {
				var input_messageContent = $(
						'#msg-send-private-content-textarea').val();
				input_messageContent = input_messageContent.trim();
				console.log(input_messageContent.Length());
				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-private-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-private-length-max').text("");
					$('#msg-send-private-length-byte').text("MMS");
					$('#msg-send-private-length-strong').text(strongLength);
				} else {
					$('#msg-send-private-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-private-length-max').text("140");
					$('#msg-send-private-length-byte').text("byte");
					$('#msg-send-private-length-strong').text(strongLength);
				}

			},

			plusUfmiCheck : function() {
				var ufmiVerCheck_radio = $(
						'input:radio[name="send-private-pnum-radio"]:checked')
						.val();
				var private_input = $('#send-private-input').val();
				var fleep_bunch_input = $('#send-private-fleep-bunch-input')
						.val();

				if (fleep_bunch_input == null || fleep_bunch_input == "") {
					alert('fleep번호 또는 bunch 번호 를 입력해주세요!');
					$('#send-private-fleep-bunch-input').focus();
					return false;
				}
				if (private_input == null || private_input == "") {
					alert('개별 번호를 입력해주세요!');
					$('#send-private-input').focus();
					return false;
				}

				var ufmiResult = ufmiVerCheck_radio + "*" + fleep_bunch_input
						+ "*" + private_input;

				console.log('무전번호 결과');
				console.log(ufmiResult);

				$('#msg-send-private-user-target-show-div').show();
				var showInputVal = $('#msg-send-private-user-target-show-input')
						.val();
				if (showInputVal == "" || showInputVal == null) {
					$('#msg-send-private-user-target-show-input').val(
							showInputVal + ufmiResult);
				} else {
					$('#msg-send-private-user-target-show-input').val(
							showInputVal + "," + ufmiResult);
				}
				$('#send-private-input').val("");
			},

			checkSendPrivateInput : function() {
				console.log('asdf');
				var num_check = /^[0-9]*$/;
				var private_input = $("#send-private-input").val();
				var ufmiVerCheck_radio = $(
						'input:radio[name="send-private-pnum-radio"]:checked')
						.val();

				if (ufmiVerCheck_radio == "01") {
					$("#send-private-input").attr('maxlength', '4');
				}

				if (!num_check.test(private_input)) {
					alert('숫자 만 입력 가능합니다!');
					$("#send-private-input").focus();
					return false;
				}

			},
			checkSendBunchInput : function() {
				console.log('fikfkfkf');
				var num_check = /^[0-9]*$/;
				// resend-fleep-bunch-input
				var fleep_bunch_input = $("#send-private-fleep-bunch-input")
						.val();
				var ufmiVerCheck_radio = $(
						'input:radio[name="send-private-pnum-radio"]:checked')
						.val();

				if (ufmiVerCheck_radio == "1") {
					$("#send-private-fleep-bunch-input").attr('maxlength', '4');
				}
				if (!num_check.test(fleep_bunch_input)) {
					alert('숫자 만 입력 가능합니다!');
					$("#send-private-fleep-bunch-inputt").focus();
					return false;
				}

			},

			msgRepeatCheck : function() {
				var checkedLength = $('input[id="msg-send-private-user-repeat-check"]:checked').length;
				if (checkedLength == 0) {
					// $("#messagelist-search-date-start-input").prop('disabled',
					// true);
					$('#msg-send-private-repeat-div').hide();
					$('#msg-send-private-repeat-cnt-select').val(0);
					$('#msg-send-private-repeat-time-input').val("");

					return false;
				} else {
					$('#msg-send-private-repeat-div').show();
					$('#msg-send-private-repeat-time-input').prop('disabled',
							false);

					return false;
				}
			},

			render : function() {

				var that = this;
				$
						.get(
								'pages/js/template/push_msg_send_template.html',
								function(data) {
									var template = _.template(data, {});
									that.$el.html(template);
									var nowDate = new Date();
									var today = new Date(nowDate.getFullYear(),
											nowDate.getMonth(), nowDate
													.getDate(), 0, 0, 0, 0);
									var today_30 = new Date(nowDate
											.getFullYear(), nowDate.getMonth(),
											nowDate.getDate() + 30, 0, 0, 0, 0);
									$('#msg-send-private-reservation-div')
											.datetimepicker({
												format : "YYYY/MM/DD hh:mm a",
												minDate : today,
												maxDate : today_30
											});

								}, 'html');
			}

		});
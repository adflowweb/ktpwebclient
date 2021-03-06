window.ADF = window.ADF || {};

// 메시지 리스트 뷰
ADF.PushMsgListView = Backbone.View
		.extend({

			// 메시지 리스트 이벤트 목록
			events : {
				"dp.change #msg-list-date-time-picker-div" : "monthDatePickerChange",
				"change #msg-list-search-select" : "searchSelectChange",
				"click #msg-list-search-btn" : "searchBtnClick",
				"click #msg-list-csv-btn" : "csvFileDown",
				"click #msg-list-table tbody #msg-list-detail-btn" : "getDetailList",
				"click #msg-list-detail-confirm-btn" : "confirmDetailTable",
				"click #msg-list-resend-btn" : "msgResendModal",
				"input #resend-private-input" : "checkPrivateInput",
				"input #resend-fleep-bunch-input" : "checkBunchInput",
				"input #msg-resend-content-textarea" : "checkContentArea",
				"click #msg-resend-plus-span" : "replusUfmiCheck",
				"click #msg-resend-btn" : "msgResend",
				"click #modal-header-close" : "modalHeaderClick",
				"click #modal-footer-cancel" : "modalFooterClick",
				"click #msg-resend-minus-span" : "resendMinusClick",
				"change input[name='resend-check-radio']" : "recheckRadioGroupPrivate",
				"change input[name='resend-pnum-radio']" : "recheckPtalkRadio",

			},

			initialize : function() {
				_.bindAll(this, 'render', 'beforeRender', 'afterRender',
						'monthDatePickerChange', 'changeDateInput',
						'searchSelectChange', 'searchFormCheck', "csvFileDown",
						"checkPrivateInput", "msgResendModal",
						"confirmDetailTable", "getDetailList",
						"checkBunchInput", "replusUfmiCheck", "msgResend",
						"resendFormCheck", "modalFooterClick",
						"modalHeaderClick", "resendMinusClick",
						"recheckRadioGroupPrivate", "recheckPtalkRadio");
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
				$('#sidebar-shortcuts').show();
				$('#sidebar-ul-list').show();
				$('#login-user-info-div').show();
				var userId = sessionStorage.getItem('easy-userId');
				$('#user-id-span').text(userId);

			},
			afterRender : function() {

			},

			// 재전송 체크 피톡버전
			recheckPtalkRadio : function() {
				var privateGroupCheck = $(
						'input:radio[name="resend-check-radio"]:checked').val();
				var p1p2Radio = $(
						'input:radio[name="resend-pnum-radio"]:checked').val();

				// 개인
				if (privateGroupCheck == 0) {

					// p1
					if (p1p2Radio == "82") {
						$('#resend-fleet-label').text('fleet 번호');
						$('#resend-fleet-span').text('무전번호의 fleet번호를 입력해주세요!');
						$('#resend-private-label').text('개별 번호');
						$('#resend-private-span').text('무전번호의 개별 ID를 입력해주세요!');
						// p2
					} else {
						$('#resend-fleet-label').text('국번');
						$('#resend-fleet-span').text('무전번호의 국번을 입력해주세요!');
						$('#resend-private-label').text('개별 번호');
						$('#resend-private-span').text('무전번호의 개별 ID를 입력해주세요!');
					}

					// 그룹
				} else {
					// p1
					if (p1p2Radio == "82") {
						$('#resend-fleet-label').text('fleet 번호');
						$('#resend-fleet-span').text('무전번호의 fleet번호를 입력해주세요!');
						$('#resend-private-label').text('그룹 번호');
						$('#resend-private-span').text('무전번호의 그룹번호를 입력해주세요!');
						// p2
					} else {
						$('#resend-fleet-label').text('번치 ID');
						$('#resend-fleet-span').text('번치 ID를  입력해주세요!');
						$('#resend-private-label').text('그룹 번호');
						$('#resend-private-span').text('무전번호의 그룹번호를 입력해주세요!');
					}

				}
			},
			// 재전송 체크 그룹/개인
			recheckRadioGroupPrivate : function() {
				var privateGroupCheck = $(
						'input:radio[name="resend-check-radio"]:checked').val();
				var p1p2Radio = $(
						'input:radio[name="resend-pnum-radio"]:checked').val();

				// 개인
				if (privateGroupCheck == 0) {

					// p1
					if (p1p2Radio == "82") {
						$('#resend-fleet-label').text('fleet 번호');
						$('#resend-fleet-span').text('무전번호의 fleet번호를 입력해주세요!');
						$('#resend-private-label').text('개별 번호');
						$('#resend-private-span').text('무전번호의 개별 ID를 입력해주세요!');
						// p2
					} else {
						$('#resend-fleet-label').text('국번');
						$('#resend-fleet-span').text('무전번호의 국번을 입력해주세요!');
						$('#resend-private-label').text('개별 번호');
						$('#resend-private-span').text('무전번호의 개별 ID를 입력해주세요!');
					}

					// 그룹
				} else {
					// p1
					if (p1p2Radio == "82") {
						$('#resend-fleet-label').text('fleet 번호');
						$('#resend-fleet-span').text('무전번호의 fleet번호를 입력해주세요!');
						$('#resend-private-label').text('그룹 번호');
						$('#resend-private-span').text('무전번호의 그룹번호를 입력해주세요!');
						// p2
					} else {
						$('#resend-fleet-label').text('번치 ID');
						$('#resend-fleet-span').text('번치 ID를  입력해주세요!');
						$('#resend-private-label').text('그룹 번호');
						$('#resend-private-span').text('무전번호의 그룹번호를 입력해주세요!');
					}

				}

			},
			// 수신 목록 -버튼 클릭 이벤트
			resendMinusClick : function() {

				$("#msg-resend-user-target-select option:last").remove();

			},
			// 메시지 리스트 테이블
			msgListTable : {

			},

			modalFooterClick : function() {
				$('#msg-resend-user-target-select').find('option').remove();
			},

			modalHeaderClick : function() {
				$('#msg-resend-user-target-select').find("option").remove();

			},
			// 메시지 재전송
			msgResend : function() {

				var userName = sessionStorage.getItem('easy-userName');
				if (userName == null || userName == "" || userName == "null") {
					alert('발송번호를 등록해야 정상 사용이 가능합니다.!');
					pushRouter.navigate('user_info', {
						trigger : true
					});
					return false;
				}
				if (this.resendFormCheck()) {
					var token = sessionStorage.getItem("easy-token");
					var messageTarget = [];
					$("#msg-resend-user-target-select option").each(function() {
						messageTarget.push($(this).val());

					});

					var messageContent = $('#msg-resend-content-textarea')
							.val();
					messageContent = pushUtil.utf8_to_b64(messageContent);
					var messageData = new Object();
					messageData.receivers = messageTarget;
					messageData.content = messageContent;
					messageData.contentType = "application/base64";

					var contentLength = $('#msg-resend-length-strong').text();
					messageData.contentLength = contentLength;
					var fileName = $('#resend-file-name-hidden').val();
					var fileFormat = $('#resend-file-format-hidden').val();
					if (fileName != "" && fileFormat != "") {
						messageData.fileName = fileName;
						messageData.fileFormat = fileFormat;
						messageData.mms = true;
					}
					$('#resend-file-format-hidden').val();

					var groupTopicCount = 0;
					var privateUfmi = 0;
					// for ( var i in messageData.receivers) {
					// if (messageData.receivers[i].indexOf("mms") != -1) {
					// $
					// .ajax({
					// url : '/v1/pms/adm/svc/subscribe/count?topic='
					// + messageData.receivers[i],
					// type : 'GET',
					// headers : {
					// 'X-Application-Token' : token
					// },
					// contentType : "application/json",
					// dataType : 'json',
					// async : false,
					//
					// success : function(data) {
					//
					// if (!data.result.errors) {
					// groupTopicCount = groupTopicCount
					// + data.result.data;
					//
					// }
					//
					// },
					// error : function(data, textStatus,
					// request) {
					// if (data.status == 401) {
					//
					// alert("사용시간이 경과되어 자동 로그아웃 됩니다.");
					// sessionStorage
					// .removeItem("easy-token");
					// sessionStorage
					// .removeItem("easy-userId");
					// sessionStorage
					// .removeItem("easy-role");
					// sessionStorage
					// .removeItem("easy-groupTopic");
					// sessionStorage
					// .removeItem("easy-ufmi");
					// sessionStorage
					// .removeItem("easy-userName");
					// pushRouter.navigate('login', {
					// trigger : true
					// });
					// return false;
					// }
					//
					// alert('그룹 대상조회에 실패 했습니다!');
					// return false;
					// }
					// });
					//
					// if (groupTopicCount == 0) {
					//
					// }
					//
					// } else {
					// privateUfmi++;
					// }
					// }

					var messageDataResult = JSON.stringify(messageData);
					// var sendCount = groupTopicCount + privateUfmi;
					// if (sendCount == 0) {
					// alert('수신 대상자가 없습니다!');
					// return false;
					//
					// }

					if (confirm("메시지가 전송 됩니다. 전송 하시겠습니까?") == true) {
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
									alert('메시지를 발송하였습니다.');
									window.location.reload();
								} else {
									alert('메시지 전송에 실패 하였습니다.');

								}

							},
							error : function(data, textStatus, request) {
								if (data.status == 401) {
									alert("사용시간이 경과되어 자동 로그아웃 됩니다.");
									sessionStorage.removeItem("easy-token");
									sessionStorage.removeItem("easy-userId");
									sessionStorage.removeItem("easy-role");

									sessionStorage
											.removeItem("easy-groupTopic");
									sessionStorage.removeItem("easy-ufmi");
									sessionStorage.removeItem("easy-userName");
									pushRouter.navigate('login', {
										trigger : true
									});
									return false;
								}
								alert('메시지 전송에 실패 하였습니다.');

							}
						});

					} else {

					}

				}

			},
			// 메시지 재전송 form check
			resendFormCheck : function() {
				var messageTargetSize = $(
						'#msg-resend-user-target-select option').size();
				var messageContent = $('#msg-resend-content-textarea').val();
				if (messageTargetSize == 0) {
					alert("+ 버튼을 눌러 번호를 추가해 주세요!");
					$('#resend-private-input').focus();
					return false;
				}
				if (messageContent == null || messageContent == "") {
					alert("메세지 보낼 내욜을 입력해주세요");
					$('#msg-resend-content-textarea').focus();
					return false;
				}

				return true;
			},
			// 메시지 내용 체크
			checkContentArea : function() {
				var input_messageContent = $('#msg-resend-content-textarea')
						.val();
				input_messageContent = input_messageContent.trim();

				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-resend-content-textarea').css('background-color',
							'#ddd');
					$('#msg-resend-length-max').text("");
					$('#msg-resend-length-byte').text("MMS");
					$('#msg-resend-length-strong').text(strongLength);
				} else {
					$('#msg-resend-content-textarea').css('background-color',
							'white');
					$('#msg-resend-length-max').text("140");
					$('#msg-resend-length-byte').text("byte");
					$('#msg-resend-length-strong').text(strongLength);
				}
			},
			// 개별 번호 체크
			checkPrivateInput : function() {
				var num_check = /^[0-9]*$/;
				var private_input = $("#resend-private-input").val();
				var ufmiVerCheck_radio = $(
						'input:radio[name="resend-pnum-radio"]:checked').val();

				if (ufmiVerCheck_radio == "1") {
					$("#resend-private-input").attr('maxlength', '4');
				} else {
					$("#resend-private-input").attr('maxlength', '6');
				}

				if (!num_check.test(private_input)) {
					alert('숫자 만 입력 가능합니다!');
					$("#resend-private-input").focus();
					return false;
				}
			},
			// 번치 번호 체크
			checkBunchInput : function() {
				var num_check = /^[0-9]*$/;
				var fleep_bunch_input = $("#resend-fleep-bunch-input").val();
				var ufmiVerCheck_radio = $(
						'input:radio[name="resend-pnum-radio"]:checked').val();

				if (ufmiVerCheck_radio == "1") {
					$("#resend-fleep-bunch-input").attr('maxlength', '4');
				} else {
					$("#resend-fleep-bunch-input").attr('maxlength', '6');
				}
				if (!num_check.test(fleep_bunch_input)) {
					alert('숫자 만 입력 가능합니다!');
					$("#resend-fleep-bunch-input").focus();
					return false;
				}
			},
			// 플러스 버튼 체크
			replusUfmiCheck : function() {
				var privateGroupCheck = $(
						'input:radio[name="resend-check-radio"]:checked').val();

				var num_check = /^[0-9]*$/;
				var private_input_check = $('#resend-private-input').val();
				var fleep_bunch_input_check = $('#resend-fleep-bunch-input')
						.val();

				if (!num_check.test(private_input_check)) {
					alert('숫자 만 입력 가능합니다!');
					$("#resend-private-input").focus();
					return false;
				}

				if (!num_check.test(fleep_bunch_input_check)) {
					alert('숫자 만 입력 가능합니다!');
					$("#resend-fleep-bunch-input").focus();
					return false;
				}

				if (privateGroupCheck == 0) {
					var userText = "";

					var ufmiVerCheck_radio = $(
							'input:radio[name="resend-pnum-radio"]:checked')
							.val();
					var private_input = $('#resend-private-input').val();
					var fleep_bunch_input = $('#resend-fleep-bunch-input')
							.val();

					if (fleep_bunch_input == null || fleep_bunch_input == "") {
						alert('번호 를 입력해주세요!');
						$('#resend-fleep-bunch-input').focus();
						return false;
					}
					if (private_input == null || private_input == "") {
						alert('번호를 입력해주세요!');
						$('#resend-private-input').focus();
						return false;
					}

					if (fleep_bunch_input.substring(0, 1) == "0"
							&& fleep_bunch_input.length > 1) {
						alert('번호 첫자리는 0을 입력할수 없습니다.');
						$('#resend-fleep-bunch-input').focus();
						return false;
					}

					if (private_input.substring(0, 1) == "0"
							&& private_input.length > 1) {
						alert('번호 첫자리는 0을 입력할수 없습니다.');
						$('#resend-private-input').focus();
						return false;
					}

					if (ufmiVerCheck_radio == "82") {
						userText = "Ptalk1.0 : ";

					} else if (ufmiVerCheck_radio == "1") {
						userText = "Ptalk2.0 : ";
					}

					var ufmiResult = ufmiVerCheck_radio + "*"
							+ fleep_bunch_input + "*" + private_input;
					userText = userText + fleep_bunch_input + "*"
							+ private_input;

					$('#msg-resend-user-target-select').append(
							'<option value=' + ufmiResult + '>' + userText
									+ '</option>');
					$('#resend-private-input').val("");

				} else {
					var userText = "";
					var ufmiVerCheck_radio = $(
							'input:radio[name="resend-pnum-radio"]:checked')
							.val();
					var private_input = $('#resend-private-input').val();
					var fleep_bunch_input = $('#resend-fleep-bunch-input')
							.val();

					if (fleep_bunch_input == null || fleep_bunch_input == "") {
						alert('번호 를 입력해주세요!');
						$('#resend-fleep-bunch-input').focus();
						return false;
					}
					if (private_input == null || private_input == "") {
						alert('번호를 입력해주세요!');
						$('#resend-private-input').focus();
						return false;
					}
					if (fleep_bunch_input.substring(0, 1) == "0"
							&& fleep_bunch_input.length > 1) {
						alert('번호 첫자리는 0을 입력할수 없습니다.');
						$('#resend-fleep-bunch-input').focus();
						return false;
					}

					if (private_input.substring(0, 1) == "0"
							&& private_input.length > 1) {
						alert('번호 첫자리는 0을 입력할수 없습니다.');
						$('#resend-private-input').focus();
						return false;
					}

					if (ufmiVerCheck_radio == "82") {
						userText = "Ptalk1.0 : ";

					} else if (ufmiVerCheck_radio == "1") {
						userText = "Ptalk2.0 : ";
					}

					var groupTopic = "";
					if (ufmiVerCheck_radio == "82") {
						groupTopic = "mms/P1/82/" + fleep_bunch_input + "/g"
								+ private_input;

					} else {
						groupTopic = "mms/P2/1/b" + fleep_bunch_input + "/g"
								+ private_input;
					}
					userText = userText + "그룹" + fleep_bunch_input + "("
							+ private_input + ")";

					var checkTopic = true;
					var token = sessionStorage.getItem('easy-token');
					// $.ajax({
					// url : '/v1/pms/adm/svc/subscribe/count?topic='
					// + groupTopic,
					// type : 'GET',
					// headers : {
					// 'X-Application-Token' : token
					// },
					// contentType : "application/json",
					// dataType : 'json',
					// async : false,
					//
					// success : function(data) {
					//
					// if (!data.result.errors) {
					//
					// if (data.result.data != 0) {
					// checkTopic = true;
					// } else {
					//
					// alert(userText + "는 수신자가 없는 그룹입니다.");
					// }
					//
					// } else {
					//
					// alert(userText + "는 수신자가 없는 그룹입니다.");
					//
					// }
					//
					// },
					// error : function(data, textStatus, request) {
					// if (data.status == 401) {
					//
					// alert("사용시간이 경과되어 자동 로그아웃 됩니다.");
					// sessionStorage.removeItem("easy-token");
					// sessionStorage.removeItem("easy-userId");
					// sessionStorage.removeItem("easy-role");
					// sessionStorage.removeItem("easy-groupTopic");
					// sessionStorage.removeItem("easy-ufmi");
					// sessionStorage.removeItem("easy-userName");
					// pushRouter.navigate('login', {
					// trigger : true
					// });
					// return false;
					// }
					//
					// alert('그룹 대상조회에 실패 했습니다!');
					// return false;
					// }
					// });

					if (checkTopic == true) {
						$('#msg-resend-user-target-select').append(
								'<option value=' + groupTopic + '>' + userText
										+ '</option>');
					}
					$('#resend-private-input').val("");
				}
			},
			// 메시지 재전송 버튼 클릭
			msgResendModal : function(e) {
				var aData = msgListTable.fnGetData($(e.target).parents('tr')); // fails
				var groupCheck = aData.groupId;
				var messageListContent = "";
				if (groupCheck.indexOf("개인") != -1) {

					var receiver_split = aData.receiver.split('*');
					var receiver_ver_check = aData.retained;
					// p1

					$('#resend-check-radio-private').prop("checked", true);
					if (receiver_ver_check == "Ptalk1.0") {
						$('#resend-pnum-p1-radio').prop("checked", true);

						// p2
					} else {
						$('#resend-pnum-p2-radio').prop("checked", true);

					}
					$('#resend-fleep-bunch-input').val(receiver_split[0]);
					$('#resend-private-input').val(receiver_split[1]);
				} else {
					$('#resend-check-radio-group').prop("checked", true);
					var topicP1P2Check = aData.receiver;
					var receiver_ver_check = aData.retained;
					// p1
					if (receiver_ver_check == "Ptalk1.0") {
						$('#resend-pnum-p1-radio').prop("checked", true);

						$('#resend-fleep-bunch-input').val(
								topicP1P2Check.substring((topicP1P2Check
										.indexOf("(") + 1), topicP1P2Check
										.indexOf(")")));
						$('#resend-private-input').val(
								topicP1P2Check.substring(2, topicP1P2Check
										.indexOf("(")));
						// p2
					} else {
						$('#resend-pnum-p2-radio').prop("checked", true);

						$('#resend-fleep-bunch-input').val(
								topicP1P2Check.substring((topicP1P2Check
										.indexOf("(") + 2), topicP1P2Check
										.indexOf(")")));
						$('#resend-private-input').val(
								topicP1P2Check.substring(2, topicP1P2Check
										.indexOf("(")));

					}

				}

				messageListContent = aData.contentType;
				$('#msg-resend-content-textarea').val(messageListContent);
				messageListContent = messageListContent.trim();

				if (messageListContent.Length() > 140) {
					$('#msg-resend-content-textarea').css('background-color',
							'#ddd');
					$('#msg-resend-length-max').text("");
					$('#msg-resend-length-byte').text("MMS");
					$('#msg-resend-length-strong').text(
							messageListContent.Length());
				} else {
					$('#msg-resend-content-textarea').css('background-color',
							'white');
					$('#msg-resend-length-max').text("140");
					$('#msg-resend-length-byte').text("byte");
					$('#msg-resend-length-strong').text(
							messageListContent.Length());
				}

				if (aData.fileName != null && aData.fileFormat != null) {

					// console.log('서버에 파일 네임과 포맷 이 있음');
					// // head check
					//
					// var token = sessionStorage.getItem('easy-token');
					// var userId = sessionStorage.getItem('easy-userId');
					// var xhrHeadReq = new XMLHttpRequest();
					// xhrHeadReq.open("HEAD", "/cts/v1/users/" + userId,
					// false);
					// xhrHeadReq.setRequestHeader("md5", aData.fileName);
					// xhrHeadReq.setRequestHeader("token", token);
					// xhrHeadReq.setRequestHeader("file", aData.fileFormat);
					// xhrHeadReq.send();
					// if (xhrHeadReq.status == 404) {
					// console.log('해당파일없음');
					// $('#resend-file-name-hidden').val("");
					// $('#resend-file-format-hidden').val("");
					// $('#resend-file').hide();
					// } else if (xhrHeadReq.status == 409) {
					//					
					// }
					// console.log('파일좀재함');
					$('#resend-file').show();
					$('#resend-file-name-hidden').val(aData.fileName);
					$('#resend-file-format-hidden').val(aData.fileFormat);
				} else {
					$('#resend-file-name-hidden').val("");
					$('#resend-file-format-hidden').val("");
					$('#resend-file').hide();
				}
				this.recheckPtalkRadio();
				this.recheckRadioGroupPrivate();

			},

			// 상세 보기 테이블 확인 버튼
			confirmDetailTable : function() {
				$('#msg-list-detail-div').hide();
			},

			// 상세 리스트
			getDetailList : function(e) {

				var aData = msgListTable.fnGetData($(e.target).parents('tr')); // fails
				$('#msg-list-detail-div').show();
				$("#msg-list-detail-div").attr("tabindex", -1).focus(
						function() {
							$(this).parent('div').css('background-color',
									'white');
						});
				$('#msg-list-detail-div').focus();
				var reqMsgId = aData.msgId;
				var reqMonth = $('#msg-list-month-date-input').val();
				var splitMonth = reqMonth.split('/');
				reqMonth = splitMonth[0] + splitMonth[1];
				var token = sessionStorage.getItem('easy-token');
				var detailTableData = new Array();

				$.ajax({
					url : '/v1/pms/adm/svc/messages/' + reqMsgId + '?keyMon='
							+ reqMonth,
					type : 'GET',
					contentType : "application/json",
					headers : {
						'X-Application-Token' : token
					},
					dataType : 'json',

					async : false,
					success : function(data) {
						if (!data.result.errors) {
							var resultData = data.result.data.data;
							if (resultData.length == 0) {
								$('#msg-list-detail-div').hide();
								alert('수신되지 않은 메시지 입니다.\n상세 내용을 확인 할 수 없습니다.');
								return false;
							}
							for ( var i in resultData) {
								var receiverType = resultData[i].receiver;
								if (receiverType.substring(0, 2) == "82") {
									var splitReceiver = resultData[i].receiver;
									splitReceiver = splitReceiver.split('*');
									resultData[i].receiver = splitReceiver[1]
											+ "*" + splitReceiver[2];
									receiverType = "Ptalk1.0";

								} else {
									var splitReceiver = resultData[i].receiver;
									splitReceiver = splitReceiver.split('*');
									resultData[i].receiver = splitReceiver[1]
											+ "*" + splitReceiver[2];
									receiverType = "Ptalk2.0";
								}

								if (resultData[i].pmaAckType == null) {

									resultData[i].pmaAckType = '응답없음';
								} else {
									resultData[i].pmaAckType = '수신확인';
									var dateTime = resultData[i].pmaAckTime;
									resultData[i].pmaAckTime = new Date(
											dateTime).toLocaleString();
								}

								if (resultData[i].appAckType == null) {

									resultData[i].appAckType = '응답없음';
								} else {
									resultData[i].appAckType = '메시지확인';
									var dateTime = resultData[i].appAckTime;
									resultData[i].appAckTime = new Date(
											dateTime).toLocaleString();
								}

								detailTableData.push({
									receiverType : receiverType,
									receiver : resultData[i].receiver,
									pmaAckType : resultData[i].pmaAckType,
									pmaAckTime : resultData[i].pmaAckTime,
									appAckType : resultData[i].appAckType,
									appAckTime : resultData[i].appAckTime

								});

							}
						} else {
							alert('상세조회에 실패 하였습니다.');

						}

					},
					error : function(data) {
						if (data.status == 401) {
							alert("사용시간이 경과되어 자동 로그아웃 됩니다.");
							sessionStorage.removeItem("easy-token");
							sessionStorage.removeItem("easy-userId");
							sessionStorage.removeItem("easy-role");
							sessionStorage.removeItem("easy-groupTopic");
							sessionStorage.removeItem("easy-ufmi");
							sessionStorage.removeItem("easy-userName");
							pushRouter.navigate('login', {
								trigger : true
							});
							return false;
						}
						alert('상세조회에 실패 하였습니다.');

					}
				});

				var detailTable = $('#msg-list-detail-table').dataTable({
					aaData : detailTableData,
					'bSort' : false,
					bJQueryUI : true,
					bDestroy : true,
					"bPaginate" : false,
					"pageLength" : 25,
					"bInfo" : false,
					bScrollCollapse : true,
					"autoWidth" : false,
					scrollX : true,
					"bLengthChange" : false,
					"dom" : 'T<"clear">lrtip',

					aoColumns : [ {
						mData : 'receiverType',
						"sWidth" : "15%"
					}, {
						mData : 'receiver',
						"sWidth" : "15%"
					}, {
						mData : 'pmaAckType',
						"sWidth" : "15%"
					}, {
						mData : 'pmaAckTime',
						"sWidth" : "20%"
					}, {
						mData : 'appAckType',
						"sWidth" : "15%"
					}, {
						mData : 'appAckTime',
						"sWidth" : "20%"
					} ]
				});

				detailTable.fnDestroy();
			},

			// csv 파일 다운로드
			csvFileDown : function() {
				var messageCount = $('#msg-list-excel-cnt').val();
				messageCount = messageCount * 1;

				if (messageCount == 0) {
					alert('다운로드할 데이터가 없습니다.');
					return false;
				}

				if (messageCount <= 10000) {
					if (confirm("총 " + messageCount
							+ "건에 대해서 csv 파일로 다운로드 하시겠습니까?") == true) {
						var searchSelectValue = $('#msg-list-search-select')
								.val();
						var searchSelectText = $(
								'#msg-list-search-select option:selected')
								.text();
						var searchInputValue = $('#msg-list-search-input')
								.val();
						var searchDateStart = $('#msg-list-start-date-input')
								.val();
						var searchDateEnd = $('#msg-list-end-date-input').val();
						var messageMonth = $('#msg-list-month-date-input')
								.val();
						var searchSelectPtalk = $(
								'#msg-list-search-ptalk-select option:selected')
								.val();

						var requestUrl = '?';
						var csvCSearchStatus = "";

						if (searchInputValue != "") {

							// 그룹
							if (searchInputValue.indexOf("그룹") > -1) {
								if (searchSelectPtalk == "1") {
									var groupNum = searchInputValue.substring(
											2, searchInputValue.indexOf('('));
									var fleet = searchInputValue
											.substring((searchInputValue
													.indexOf('(') + 1),
													searchInputValue
															.indexOf(')'));
									searchInputValue = "mms/P1/82/" + fleet
											+ "/g" + groupNum;

								} else if (searchSelectPtalk == "2") {
									var groupNum = searchInputValue.substring(
											2, searchInputValue.indexOf('('));
									var fleet = searchInputValue
											.substring((searchInputValue
													.indexOf('(') + 1),
													searchInputValue
															.indexOf(')'));
									searchInputValue = "mms/P2/1/b" + fleet
											+ "/g" + groupNum;
								}

								// 개인
							} else {

								if (searchSelectPtalk == "1") {
									var pnum = searchInputValue.split('*');

									searchInputValue = "82*" + pnum[0] + "*"
											+ pnum[1];

								} else if (searchSelectPtalk == "2") {
									var pnum = searchInputValue.split('*');

									searchInputValue = "1*" + pnum[0] + "*"
											+ pnum[1];
								}

							}

						}

						if (messageMonth == null || messageMonth == "") {
							var nowDate = new Date();
							var year = nowDate.getFullYear();
							var month = nowDate.getMonth() + 1;
							if (month < 10) {
								month = '0' + month;
							}

							messageMonth = year + "/" + month;
						}

						messageMonth = messageMonth.replace("/", "");

						requestUrl = requestUrl + 'cSearchDate=' + messageMonth;

						if (searchDateStart != "") {
							searchDateStart = pushUtil
									.dateFormatingStart(searchDateStart);
							if (searchDateStart) {
								searchDateStart = searchDateStart.toISOString();
								requestUrl = requestUrl + '&cSearchDateStart='
										+ searchDateStart;
							}
						}

						if (searchDateEnd != "") {
							searchDateEnd = pushUtil
									.dateFormatingEnd(searchDateEnd);

							if (searchDateEnd) {
								searchDateEnd = searchDateEnd.toISOString();
								requestUrl = requestUrl + '&cSearchDateEnd='
										+ searchDateEnd;
							}
						}

						searchSelectValue = searchSelectValue * 1;

						switch (searchSelectValue) {
						case 0:
							csvCSearchStatus = 'ALL';
							requestUrl = requestUrl + '&cSearchStatus='
									+ csvCSearchStatus;
							break;
						// status
						case 1:
							var statusValue = $(
									'#msg-list-search-status-select option:selected')
									.val();

							requestUrl = requestUrl + '&cSearchStatus='
									+ statusValue;

							break;
						// receiver
						case 2:
							searchSelectText = "receiver";
							requestUrl = requestUrl + '&cSearchFilter='
									+ searchSelectText;
							requestUrl = requestUrl + '&cSearchContent='
									+ searchInputValue;
							csvCSearchStatus = "ALL";
							requestUrl = requestUrl + '&cSearchStatus='
									+ csvCSearchStatus;

							break;
						// ack
						case 3:
							var ackValue = $(
									'#msg-list-search-ack-select option:selected')
									.val();
							searchSelectText = "ack";
							csvCSearchStatus = "ALL";
							requestUrl = requestUrl + '&cSearchFilter='
									+ searchSelectText;
							requestUrl = requestUrl + '&cSearchContent='
									+ ackValue;
							requestUrl = requestUrl + '&cSearchStatus='
									+ csvCSearchStatus;
							break;

						default:

							break;
						}

						var xmlhttp = new XMLHttpRequest();
						xmlhttp.onreadystatechange = function() {

							if (xmlhttp.readyState == 4
									&& xmlhttp.status == 200) {
								if (navigator.userAgent.indexOf('MSIE') !== -1
										|| navigator.appVersion
												.indexOf('Trident/') > 0) {

									var a = document.createElement('a');
									if (window.navigator.msSaveOrOpenBlob) {
										blobObject = new Blob(
												[ xmlhttp.responseText ]);
										a.onclick = function() {
											window.navigator.msSaveOrOpenBlob(
													blobObject, 'message.csv');
										};
									}
									a
											.appendChild(document
													.createTextNode('Click to Download'));
									document.body.appendChild(a);
									a.click();
								} else {
									var isSafari = /Safari/
											.test(navigator.userAgent)
											&& /Apple Computer/
													.test(navigator.vendor);
									if (isSafari) {

										var a = document.createElement('a');

										a.href = 'data:attachment/csv;charset=utf-8,%EF%BB%BF'
												+ encodeURIComponent(xmlhttp.responseText);
										document.body.appendChild(a);
										var evObj = document
												.createEvent('MouseEvents');
										evObj.initMouseEvent('click', true,
												true, window);
										a.dispatchEvent(evObj);
									} else {

										var a = document.createElement('a');
										a.href = 'data:attachment/csv;charset=utf-8,%EF%BB%BF'
												+ encodeURIComponent(xmlhttp.responseText);
										a.target = '_blank';
										a.download = 'message.csv';
										document.body.appendChild(a);
										a.click();
									}

								}

							} else if (xmlhttp.status == 401) {
								alert("사용시간이 경과되어 자동 로그아웃 됩니다.");
								sessionStorage.removeItem("easy-token");
								sessionStorage.removeItem("easy-userId");
								sessionStorage.removeItem("easy-role");

								sessionStorage.removeItem("easy-groupTopic");
								sessionStorage.removeItem("easy-ufmi");
								sessionStorage.removeItem("easy-userName");
								pushRouter.navigate('login', {
									trigger : true
								});

								return false;
							} else if (xmlhttp.status == 500) {
								alert('파일 다운로드에 실패 하였습니다(서버 문제)');
								return false;
							} else if (xmlhttp.status == 404) {
								alert('파일 다운로드에 실패 하였습니다(Not Found)');
								return false;
							}
						};
						var token = sessionStorage.getItem("easy-token");
						xmlhttp.open("GET", '/v1/pms/adm/svc/messages/csv'
								+ requestUrl, true);
						xmlhttp.setRequestHeader("X-Application-Token", token);
						xmlhttp.setRequestHeader("Content-Type",
								"application/json; charset = UTF-8");
						xmlhttp.send();

					}

				} else {
					alert('다운로드는 10000개의 목록 까지만 가능합니다.');
					return false;
				}

			},
			// 검색 버튼 클릭
			searchBtnClick : function() {
				var formCheck = this.searchFormCheck();
				if (formCheck) {
					msgListTable.fnFilter();
				}
			},
			// 검색 form check
			searchFormCheck : function() {
				var selectOptionValue = $('#msg-list-search-select').val();
				var inputSearchValue = $('#msg-list-search-input').val();
				var searchDateStart = $('#msg-list-start-date-input').val();
				var defaultMonth = $('#msg-list-month-date-input').val();

				if (defaultMonth.substring(5, 6) == 0) {
					defaultMonth = defaultMonth.substring(6);
					defaultMonth = defaultMonth - 1;

				} else {
					defaultMonth = defaultMonth.substring(5);
					defaultMonth = defaultMonth - 1;
				}
				searchDateStart = pushUtil.dateFormatingStart(searchDateStart);

				if (typeof searchDateStart === undefined
						|| typeof searchDateStart === 'undefined') {
					searchDateStart = "";
				}

				var searchDateEnd = $('#msg-list-end-date-input').val();

				searchDateEnd = pushUtil.dateFormatingEnd(searchDateEnd);
				if (typeof searchDateEnd === undefined
						|| typeof searchDateEnd === 'undefined') {
					searchDateEnd = "";
				}

				if (selectOptionValue == 2) {
					if (inputSearchValue == null || inputSearchValue == "") {
						alert('검색할 수신번호를 입력해 주세요');
						$('#msg-list-search-input').focus();
						return false;
					}
				}

				if (searchDateStart != null && searchDateStart != "") {
					if (searchDateEnd == null || searchDateEnd == "") {
						alert('검색 종료일을 입력해 주세요');
						return false;
					} else {
						if (searchDateStart >= searchDateEnd) {
							alert('검색 시작일이 종료일보다 클 수 없습니다');
							return false;
						} else if (searchDateStart.getMonth() === searchDateEnd
								.getMonth()
								&& defaultMonth === searchDateEnd.getMonth()
								&& defaultMonth === searchDateStart.getMonth()) {
							return true;
						} else if (searchDateStart.getMonth() !== searchDateEnd
								.getMonth()
								|| defaultMonth !== searchDateEnd.getMonth()
								|| defaultMonth !== searchDateStart.getMonth()) {

							var startDate = new Date();
							startDate.setHours(0, 0, 0, 0);
							return false;
						} else {
							return true;
						}

					}

				}
			},
			// 검색 select box 변경시
			searchSelectChange : function() {
				var selectOptionValue = $('#msg-list-search-select').val();
				selectOptionValue = selectOptionValue * 1;
				switch (selectOptionValue) {

				// 선택
				case 0:
					$('#msg-list-search-content-div').hide();
					$('#msg-list-ack-status-div').hide();
					$('#msg-list-send-status-div').hide();
					$('#msg-list-search-ptalk-div').hide();
					$('#msg-list-search-input').prop('disabled', true);
					break;

				// 발송상태
				case 1:
					$('#msg-list-search-content-div').hide();
					$('#msg-list-ack-status-div').hide();
					$('#msg-list-search-ptalk-div').hide();
					$('#msg-list-send-status-div').show();
					$('#msg-list-search-input').prop('disabled', true);
					break;
				// 수신번호
				case 2:
					$('#msg-list-search-content-div').show();
					$('#msg-list-search-ptalk-div').show();
					$('#msg-list-ack-status-div').hide();
					$('#msg-list-send-status-div').hide();
					$('#msg-list-search-input').prop('disabled', false);
					break;

				// 응답상태
				case 3:
					$('#msg-list-search-content-div').hide();
					$('#msg-list-search-ptalk-div').hide();
					$('#msg-list-ack-status-div').show();
					$('#msg-list-send-status-div').hide();
					$('#msg-list-search-input').prop('disabled', true);
					break;
				default:

					break;
				}

			},

			// 날자 변경 이벤트
			monthDatePickerChange : function() {
				setTimeout(this.changeDateInput, 500);
			},
			// 날짜 변경
			changeDateInput : function() {
				var messagelist_Picker = $("#msg-list-month-date-input").val();
				var messageList_Result = [];
				messageList_Result = messagelist_Picker.split("/");
				$('#msg-list-start-date-time-picker-div').datetimepicker()
						.data("DateTimePicker").setDate(
								pushUtil.chageDateF(messageList_Result[0],
										messageList_Result[1]));
				$('#msg-list-end-date-time-picker-div').datetimepicker().data(
						"DateTimePicker").setDate(
						pushUtil.chageDateL(messageList_Result[0],
								messageList_Result[1]));
				$('#msg-list-start-date-time-picker-div').datetimepicker()
						.data("DateTimePicker").setMinDate(
								pushUtil.chageDateF(messageList_Result[0],
										messageList_Result[1]));
				$('#msg-list-start-date-time-picker-div').datetimepicker()
						.data("DateTimePicker").setMaxDate(
								pushUtil.chageDateL(messageList_Result[0],
										messageList_Result[1]));
				$('#msg-list-end-date-time-picker-div').datetimepicker().data(
						"DateTimePicker").setMinDate(
						pushUtil.chageDateF(messageList_Result[0],
								messageList_Result[1]));
				$('#msg-list-end-date-time-picker-div').datetimepicker().data(
						"DateTimePicker").setMaxDate(
						pushUtil.chageDateL(messageList_Result[0],
								messageList_Result[1]));
			},
			// 메시지 리스트 화변 생성
			render : function() {
				var that = this;
				var token = sessionStorage.getItem("easy-token");
				$
						.get(
								'pages/js/template/push_msg_list_template.html',
								function(data) {
									var template = _.template(data, {});
									that.$el.html(template);
									var defaultMonth = $(
											'#msg-list-date-time-picker-div')
											.val();
									if (defaultMonth == null
											|| defaultMonth == "") {
										var nowDate = new Date();
										var year = nowDate.getFullYear();
										var month = nowDate.getMonth() + 1;

										if (month < 10) {
											month = '0' + month;
										}

										defaultMonth = year + "/" + month;

										$('#msg-list-month-date-input').val(
												defaultMonth);
									}

									$('#msg-list-date-time-picker-div')
											.datetimepicker({
												viewMode : 'years',
												format : 'YYYY/MM',
												minViewMode : "months",
												pickTime : false
											});

									$('#msg-list-start-date-time-picker-div')
											.datetimepicker(
													{
														format : "YYYY/MM/DD",
														defaultDate : pushUtil
																.getCurrentDayF(),
														minDate : pushUtil
																.getCurrentDayF(),
														maxDate : pushUtil
																.getCurrentDayL(),
														pickTime : false

													});

									$('#msg-list-end-date-time-picker-div')
											.datetimepicker(
													{
														format : "YYYY/MM/DD",
														defaultDate : pushUtil
																.getCurrentDayL(),
														minDate : pushUtil
																.getCurrentDayF(),
														maxDate : pushUtil
																.getCurrentDayL(),
														pickTime : false
													});

									msgListTable = $('#msg-list-table')
											.dataTable(
													{
														'bAutoWidth' : false,
														'bSort' : false,
														'bServerSide' : true,
														'bFilter' : false,
														bScrollCollapse : true,
														// "autoWidth" : false,
														scrollX : true,
														"oLanguage" : {
															"oPaginate" : {
																"sFirst" : "처음",
																"sLast" : "끝",
																"sNext" : "다음",
																"sPrevious" : "이전"
															}
														},//		
														"pageLength" : 25,
														'columns' : [
																{
																	"data" : "updateTime",
																	'sClass' : 'one-line'
																},
																{
																	"data" : "retained"
																},

																{
																	"data" : "receiver"
																},
																{
																	"data" : "status"
																},

																{
																	"data" : "resendInterval"

																},
																{
																	"data" : "resendCount"

																},
																{
																	"data" : "content"

																},
																{
																	"data" : "groupId"

																},

																{
																	"data" : null,
																	"defaultContent" : '<a class="blue"  data-tooltip="tooltip" title="상세보기" id="msg-list-detail-btn"   ><i class="ace-icon fa fa-search-plus  bigger-130"></i></a>&nbsp;&nbsp;<a class="green"  data-tooltip="tooltip" title="재전송" id="msg-list-resend-btn" data-target="#msg-resend-modal" class="btn btn-xs btn-white" data-toggle="modal"><i class="ace-icon fa fa-pencil-square-o  bigger-130"></i></a>'
																},
																{
																	"data" : "fileFormat",
																	"visible" : false
																},
																{
																	"data" : "fileName",
																	"visible" : false

																},

														],
														'sPaginationType' : 'full_numbers',
														'sAjaxSource' : '/v1/pms/adm/svc/messages2',

														'fnServerData' : function(
																sSource,
																aoData,
																fnCallback) {
															$
																	.ajax({
																		dataType : 'json',
																		contentType : 'application/json;charset=UTF-8',
																		type : 'GET',
																		url : sSource,
																		headers : {
																			'X-Application-Token' : token
																		},
																		data : aoData,

																		success : function(
																				data) {

																			if (!data.result.errors) {
																				var dataResult = data.result.data;
																				dataResult = data.result.data.data;
																				messageListResult = data.result.data.data;

																				$(
																						'#msg-list-excel-cnt')
																						.val(
																								data.result.data.recordsTotal);
																				for ( var i in dataResult) {
																					dataResult[i].retained = dataResult[i].receiver;

																					// 그룹
																					if (dataResult[i].receiver
																							.indexOf("mms") > -1) {

																						var topicArr = [];
																						topicArr = dataResult[i].receiver
																								.split('/');
																						console
																								.log(topicArr);
																						// p1체크
																						if (dataResult[i].receiver
																								.indexOf("P1") > -1) {

																							dataResult[i].receiver = "그룹"
																									+ topicArr[4]
																											.substring(1)
																									+ "("
																									+ topicArr[3]
																									+ ")";

																							dataResult[i].retained = "Ptalk1.0";
																							// p2
																							// 그룹
																						} else if (dataResult[i].retained
																								.indexOf("P2") > -1) {
																							dataResult[i].receiver = "그룹"
																									+ topicArr[4]
																											.substring(1)
																									+ "("
																									+ topicArr[3]
																									+ ")";
																							dataResult[i].retained = "Ptalk2.0";
																						}
																						// 개인
																					} else {

																						if (dataResult[i].retained
																								.substring(
																										0,
																										2) == "82") {
																							dataResult[i].receiver = dataResult[i].receiver
																									.substring(
																											3,
																											dataResult[i].receiver.length);
																							dataResult[i].retained = "Ptalk1.0";

																						} else {
																							dataResult[i].receiver = dataResult[i].receiver
																									.substring(
																											2,
																											dataResult[i].receiver.length);
																							dataResult[i].retained = "Ptalk2.0";
																						}

																					}
																					dataResult[i].content = pushUtil
																							.b64_to_utf8(dataResult[i].content);
																					dataResult[i].contentType = dataResult[i].content;
																					if (dataResult[i].content.length > 15) {

																						dataResult[i].content = dataResult[i].content
																								.substring(
																										0,
																										15)
																								+ "..";
																					}
																					if (dataResult[i].groupId == null) {
																						dataResult[i].groupId = '<i data-tooltip="tooltip" title="개인" class="fa fa-user">(개인)</i>';
																					} else {
																						dataResult[i].groupId = '<i data-tooltip="tooltip" title="그룹" class="fa fa-users">(그룹)</i>';
																					}
																					switch (dataResult[i].status) {
																					case -99:
																						dataResult[i].status = "발송오류";
																						var dateTime = dataResult[i].updateTime;
																						dataResult[i].updateTime = new Date(
																								dateTime)
																								.toLocaleString();
																						break;
																					case -2:
																						dataResult[i].status = "수신자없음";
																						var dateTime = dataResult[i].updateTime;
																						dataResult[i].updateTime = new Date(
																								dateTime)
																								.toLocaleString();
																						break;
																					case -1:
																						dataResult[i].status = "허용갯수초과";
																						var dateTime = dataResult[i].updateTime;
																						dataResult[i].updateTime = new Date(
																								dateTime)
																								.toLocaleString();
																						break;
																					case 0:
																						dataResult[i].status = "발송중";
																						if (dataResult[i].reservationTime == null) {
																							var dateTime = dataResult[i].updateTime;
																							dataResult[i].updateTime = new Date(
																									dateTime)
																									.toLocaleString();
																						} else {
																							var dateTime = dataResult[i].reservationTime;
																							dataResult[i].updateTime = new Date(
																									dateTime)
																									.toLocaleString()
																									+ "(예약)";
																						}

																						break;
																					case 1:
																						dataResult[i].status = "발송됨";
																						var dateTime = dataResult[i].updateTime;
																						dataResult[i].updateTime = new Date(
																								dateTime)
																								.toLocaleString();
																						break;
																					case 2:
																						dataResult[i].status = "예약취소됨";
																						var dateTime = dataResult[i].updateTime;
																						dataResult[i].updateTime = new Date(
																								dateTime)
																								.toLocaleString();
																						break;

																					}

																					dataResult[i].resendInterval = dataResult[i].resendInterval
																							+ "분";

																				}

																				data.result.data.data = dataResult;
																				fnCallback(data.result.data);

																			} else {

																				alert('발송 메시지 목록을 가지고 오는데 실패 하였습니다.');

																			}
																			$(
																					'[data-tooltip="tooltip"]')
																					.tooltip(
																							{
																								placement : 'top'
																							});
																		},

																		error : function(
																				data) {
																			if (data.status == 401) {
																				alert("사용시간이 경과되어 자동 로그아웃 됩니다.");
																				sessionStorage
																						.removeItem("easy-token");
																				sessionStorage
																						.removeItem("easy-userId");
																				sessionStorage
																						.removeItem("easy-role");

																				sessionStorage
																						.removeItem("easy-groupTopic");
																				sessionStorage
																						.removeItem("easy-ufmi");
																				sessionStorage
																						.removeItem("easy-userName");
																				pushRouter
																						.navigate(
																								'login',
																								{
																									trigger : true
																								});
																				return false;
																			}

																			alert('발송 메시지 목록을 가지고 오는데 실패 하였습니다.');
																		}
																	});
														},
														'fnServerParams' : function(
																aoData) {
															var searchSelectValue = $(
																	'#msg-list-search-select')
																	.val();
															var searchSelectText = $(
																	'#msg-list-search-select option:selected')
																	.text();
															// 수신번호
															var searchInputValue = $(
																	'#msg-list-search-input')
																	.val();

															var searchDateStart = $(
																	'#msg-list-start-date-input')
																	.val();
															var searchDateEnd = $(
																	'#msg-list-end-date-input')
																	.val();

															var messageMonth = $(
																	'#msg-list-month-date-input')
																	.val();

															var searchSelectPtalk = $(
																	'#msg-list-search-ptalk-select option:selected')
																	.val();

															searchSelectValue = searchSelectValue * 1;

															if (searchInputValue != "") {

																// 그룹
																if (searchInputValue
																		.indexOf("그룹") > -1) {
																	if (searchSelectPtalk == "1") {
																		var groupNum = searchInputValue
																				.substring(
																						2,
																						searchInputValue
																								.indexOf('('));
																		var fleet = searchInputValue
																				.substring(
																						(searchInputValue
																								.indexOf('(') + 1),
																						searchInputValue
																								.indexOf(')'));
																		searchInputValue = "mms/P1/82/"
																				+ fleet
																				+ "/g"
																				+ groupNum;

																	} else if (searchSelectPtalk == "2") {
																		var groupNum = searchInputValue
																				.substring(
																						2,
																						searchInputValue
																								.indexOf('('));
																		var fleet = searchInputValue
																				.substring(
																						(searchInputValue
																								.indexOf('(') + 1),
																						searchInputValue
																								.indexOf(')'));
																		searchInputValue = "mms/P2/1/b"
																				+ fleet
																				+ "/g"
																				+ groupNum;
																	}

																	// 개인
																} else {

																	if (searchSelectPtalk == "1") {
																		var pnum = searchInputValue
																				.split('*');

																		searchInputValue = "82*"
																				+ pnum[0]
																				+ "*"
																				+ pnum[1];

																	} else if (searchSelectPtalk == "2") {
																		var pnum = searchInputValue
																				.split('*');

																		searchInputValue = "1*"
																				+ pnum[0]
																				+ "*"
																				+ pnum[1];
																	}

																}

															}

															switch (searchSelectValue) {
															case 0:
																aoData
																		.push({
																			'name' : 'cSearchStatus',
																			'value' : 'ALL'
																		});
																break;
															// status
															case 1:
																var statusValue = $(
																		'#msg-list-search-status-select option:selected')
																		.val();
																aoData
																		.push({
																			'name' : 'cSearchStatus',
																			'value' : statusValue
																		});
																break;

															case 2:
																searchSelectText = "receiver";

																aoData
																		.push({
																			'name' : 'cSearchFilter',
																			'value' : searchSelectText
																		});
																aoData
																		.push({
																			'name' : 'cSearchContent',
																			'value' : searchInputValue
																		});
																aoData
																		.push({
																			'name' : 'cSearchStatus',
																			'value' : 'ALL'
																		});

																break;
															// ack
															case 3:
																var ackValue = $(
																		'#msg-list-search-ack-select option:selected')
																		.val();
																searchSelectText = "ack";

																aoData
																		.push({
																			'name' : 'cSearchFilter',
																			'value' : searchSelectText
																		});
																aoData
																		.push({
																			'name' : 'cSearchContent',
																			'value' : ackValue
																		});
																aoData
																		.push({
																			'name' : 'cSearchStatus',
																			'value' : 'ALL'
																		});

																break;

															default:

																break;
															}

															if (messageMonth == null
																	|| messageMonth == "") {
																var nowDate = new Date();
																var year = nowDate
																		.getFullYear();
																var month = nowDate
																		.getMonth() + 1;
																if (month < 10) {
																	month = '0'
																			+ month;
																}
																messageMonth = year
																		+ "/"
																		+ month;

																$(
																		'#messagelist-date-input')
																		.val(
																				messageMonth);

															}

															messageMonth = messageMonth
																	.replace(
																			"/",
																			"");

															aoData
																	.push({
																		'name' : 'cSearchDate',
																		'value' : messageMonth
																	});

															if (searchDateStart != "") {
																searchDateStart = pushUtil
																		.dateFormatingStart(searchDateStart);
																// 시작일
																if (searchDateStart) {

																	searchDateStart = searchDateStart
																			.toISOString();

																	aoData
																			.push({
																				'name' : 'cSearchDateStart',
																				'value' : searchDateStart
																			});
																}
															}

															if (searchDateEnd != "") {
																searchDateEnd = pushUtil
																		.dateFormatingEnd(searchDateEnd);

																// 종료일
																if (searchDateEnd) {
																	searchDateEnd = searchDateEnd
																			.toISOString();
																	aoData
																			.push({
																				'name' : 'cSearchDateEnd',
																				'value' : searchDateEnd
																			});
																}
															}
														}
													});
									$('[data-tooltip="tooltip"]').tooltip({
										placement : 'top'
									});
								}, 'html');

			}

		});
window.ADF = window.ADF || {};
ADF.PushMsgSendView = Backbone.View
		.extend({

			events : {
				"change #msg-send-private-user-repeat-check" : "msgRepeatCheck",
				"input #send-private-input" : "checkSendPrivateInput",
				"input #send-private-fleep-bunch-input" : "checkSendBunchInput",
				"input #contact-add-private-input" : "checkContactPrivateInput",
				"input #contact-add-fleep-bunch-input" : "checkContactBunchInput",
				"click #msg-send-private-plus-span" : "plusUfmiCheck",
				"click #contact-add-plus-span" : "plusContactUfmiCheck",
				"input #msg-send-private-content-textarea" : "checkContentArea",
				"input #msg-send-private-content-save-textarea" : "checkContentSaveArea",
				"input #msg-send-private-content-edit-textarea" : "checkContentEditArea",
				"input #msg-send-private-repeat-time-input" : "checkRepeatTime",
				"click #msg-send-private-btn" : "msgSend",
				"click #msg-send-private-cancel-btn" : "msgSendCancel",
				"click #msg-send-private-save-btn" : "msgSaveBtnClick",
				"click #msg-save-btn" : "msgSave",
				"click #modal-footer-cancel" : "msgSaveCancel",
				"change #msg-send-private-content-load-select" : "selectContentList",
				"click a[href=#msg-content-edit-modal]" : "clickHrefEdit",
				"click a[href=#msg-content-delete-modal]" : "clickHrefDelete",
				"click #msg-edit-btn" : "msgEdit",
				"click #modal-footer-edit-cancel" : "msgEditCancel",
				"click #msg-delete-btn" : "msgDelete",
				"click #contact-add-btn" : "contactAdd",
				"click #contact-add-footer-cancel" : "contactAddCancel",
				"click #contact-delete-id" : "contactAllCheckBox",
				"click #contact-delete-btn" : "contactDelete"

			// "click #msg-list-detail-btn":"getDetailList"
			},

			initialize : function() {
				_.bindAll(this, 'render', 'beforeRender', 'afterRender',
						'msgRepeatCheck', 'plusUfmiCheck',
						'checkSendBunchInput', 'checkSendPrivateInput',
						'checkContentArea', 'msgSend', 'msgSendFormCheck',
						'checkRepeatTime', 'msgSendCancel', 'msgSaveBtnClick',
						'checkContentSaveArea', 'msgSave', "msgSaveFormCheck",
						"msgSaveCancel", "msgSaveFormCheck",
						"selectContentList", "clickHrefEdit",
						"checkContentEditArea", "msgEdit", "msgEditFormCheck",
						"msgEditCancel", "clickHrefDelete", "msgDelete",
						"plusContactUfmiCheck", "checkContactPrivateInput",
						"checkContactBunchInput", "contactAdd",
						"contactAddFormCheck", "contactAllCheckBox",
						"contactDelete");
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
				var userId = sessionStorage.getItem('userId');
				$('#user-id-span').text(userId);
			},
			afterRender : function() {
				console.log('after render..');
				// contentListView.render();

			},

			contactDelete : function() {

				var that = this;
				var checkedLength = $('input[name="contact-delete-checkbox"]:checked').length;
				var token = sessionStorage.getItem("token");
				if (checkedLength == 0) {
					alert('삭제할 대상을 선택해주세요');
					return false;
				} else {
					var contactDelete = new Object();
					contactDelete.ufmi = new Array();
					$('input[name="contact-delete-checkbox"]:checked').each(
							function() {

								if (this.value != "on") {

									contactDelete.ufmi.push(this.value);
								}
							});

					if (contactDelete.ufmi.length == 0) {
						alert('취소할 대상이 없습니다.');
						return false;
					}
					reservationReq = JSON.stringify(reservationReq);

					if (confirm("예약 메시지를 취소합니다.") == true) {

						$.ajax({
							url : '/v1/pms/adm/svc/messages/cancel',
							type : 'POST',
							headers : {
								'X-Application-Token' : token
							},
							contentType : "application/json",
							dataType : 'json',
							async : false,
							data : reservationReq,

							success : function(data) {

								if (!data.result.errors) {

									var dataResult = data.result.data;
									alert(dataResult + "건의 예약 메시지를 취소하였습니다.");
									that.reservationSearch();

								} else {
									alert("예약 메시지 취소에 실패 하였습니다.");

								}

							},
							error : function(data, textStatus, request) {
								if (data.status == 401) {
									alert("사용시간이 경과되어 자동 로그아웃 됩니다.");
									sessionStorage.removeItem("token");
									sessionStorage.removeItem("userId");
									sessionStorage.removeItem("role");
									sessionStorage
											.removeItem("monitoringStatus");
									sessionStorage.removeItem("groupTopic");
									sessionStorage.removeItem("ufmi");
									sessionStorage.removeItem("userName");
									pushRouter.navigate('login', {
										trigger : true
									});
									return false;
								}
								alert("예약 메시지 취소에 실패 하였습니다.");

							}
						});

					} else {
						return false;
					}

				}

			},

			contactAllCheckBox : function() {
				console.log('asdf');
				checkboxes = document
						.getElementsByName('contact-delete-checkbox');
				for (var i = 0, n = checkboxes.length; i < n; i++) {
					if (checkboxes[i].checked == true) {
						checkboxes[i].checked = false;
					} else {
						checkboxes[i].checked = true;
					}

				}
			},

			contactAddCancel : function() {
				$('#contact-add-pnum-p1-radio').prop("checked", "checked");
				$('#contact-add-fleep-bunch-input').val("");
				$('#contact-add-private-input').val("");
				$('#contact-add-user-target-show-input').val("");
				$('#contact-add-user-name-input').val("");
				$('#contact-add-user-item1-input').val("");
				$('#contact-add-user-item2-input').val("");
				$('#contact-add-user-item3-input').val("");
			},

			contactAddFormCheck : function() {
				console.log('form check');
				var contactUfmi = $('#contact-add-user-target-show-input')
						.val();
				var contactName = $('#contact-add-user-name-input').val();
				if (contactUfmi == null || contactUfmi == "") {

					alert('+ 버튼을 눌러 수신번호를 등록해 주세요!');
					$('#contact-add-private-input').focus();
					return false;
				}
				if (contactName == null || contactName == "") {

					alert('이름을 입력하세요!');
					$('#contact-add-user-name-input').focus();
					return false;
				}
				return true;

			},

			contactAdd : function() {
				console.log('주소록 등록 버튼 크릭');
				if (this.contactAddFormCheck()) {
					var token = sessionStorage.getItem('token');
					var contactUfmi = $('#contact-add-user-target-show-input')
							.val();
					var contactName = $('#contact-add-user-name-input').val();
					var contactItem1 = $('#contact-add-user-item1-input').val();
					var contactItem2 = $('#contact-add-user-item2-input').val();
					var contactItem3 = $('#contact-add-user-item3-input').val();

					var contactData = new Object();
					contactData.ufmi = contactUfmi;
					contactData.ufmiName = contactName;

					if (contactItem1 != null && contactItem1 != "") {
						contactData.item1 = contactItem1;
					}
					if (contactItem2 != null && contactItem2 != "") {
						contactData.item2 = contactItem2;
					}
					if (contactItem3 != null && contactItem3 != "") {
						contactData.item3 = contactItem3;
					}

					var contactDataReq = JSON.stringify(contactData);
					console.log(contactDataReq);
					if (confirm("해당 내용을 등록 하시겠습니까?") == true) {

						$.ajax({
							url : '/v1/pms/adm/svc/address',
							type : 'POST',
							headers : {
								'X-Application-Token' : token
							},
							contentType : "application/json",
							dataType : 'json',
							async : false,
							data : contactDataReq,

							success : function(data) {

								if (!data.result.errors) {
									$('#contact-add-footer-cancel').click();
									alert('주소록을 등록 하였습니다.');
									window.location.reload();
								} else {
									alert('주소록 등록에 실패 하였습니다.');

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
								alert('주소록 등록에 실패 하였습니다.');

							}
						});
					} else {
						return false;
					}

				}
			},

			checkContactBunchInput : function() {
				console.log('fikfkfkf');
				var num_check = /^[0-9]*$/;
				// resend-fleep-bunch-input
				var fleep_bunch_input = $("#contact-add-fleep-bunch-input")
						.val();
				var ufmiVerCheck_radio = $(
						'input:radio[name="contact-add-pnum-radio"]:checked')
						.val();

				if (ufmiVerCheck_radio == "1") {
					$("#contact-add-fleep-bunch-input").attr('maxlength', '4');
				}
				if (!num_check.test(fleep_bunch_input)) {
					alert('숫자 만 입력 가능합니다!');
					$("#contact-add-fleep-bunch-input").focus();
					return false;
				}

			},

			checkContactPrivateInput : function() {
				console.log('asdf');
				var num_check = /^[0-9]*$/;
				var private_input = $("#contact-add-private-input").val();
				var ufmiVerCheck_radio = $(
						'input:radio[name="contact-add-pnum-radio"]:checked')
						.val();

				if (ufmiVerCheck_radio == "01") {
					$("#contact-add-private-input").attr('maxlength', '4');
				}

				if (!num_check.test(private_input)) {
					alert('숫자 만 입력 가능합니다!');
					$("#contact-add-private-input").focus();
					return false;
				}

			},

			msgDelete : function() {
				var msgId = $('#msg-delete-btn').attr('name');
				if (msgId != null) {
					var token = sessionStorage.getItem('token');
					$.ajax({
						url : '/v1/pms/adm/svc/template/' + msgId,
						type : 'DELETE',
						headers : {
							'X-Application-Token' : token
						},
						contentType : "application/json",
						dataType : 'json',

						async : false,

						success : function(data) {

							if (!data.result.errors) {
								var dataResult = data.result.data;
								alert('메시지 내용을 삭제 하였습니다!');
								$('#modal-footer-delete-cancel').click();
								window.location.reload();

							} else {
								alert('메시지 내용 삭제에 실패  하였습니다!');
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

						}
					});

				}

			},

			clickHrefDelete : function(e) {

				var msgId = $(e.currentTarget).attr('class');
				console.log(msgId);
				if (msgId != null) {
					$('#msg-delete-btn').attr('name', msgId);
				}
			},

			msgEditCancel : function() {
				$('#send-private-title-edit-input').val("");
				$('#msg-send-private-content-edit-textarea').val("");
			},

			msgEditFormCheck : function() {

				var editInput = $('#send-private-title-edit-input').val();
				var editContentArea = $(
						'#msg-send-private-content-edit-textarea').val();
				if (editInput == null || editInput == "") {

					alert('제목을 입력하세요!');
					$('#send-private-title-edit-input').focus();
					return false;
				}
				if (editContentArea == null || editContentArea == "") {

					alert('내용을 입력하세요!');
					$('#msg-send-private-content-edit-textarea').focus();
					return false;
				}
				return true;
			},

			msgEdit : function() {

				if (this.msgEditFormCheck()) {
					var msgTitle = $('#send-private-title-edit-input').val();
					var msgContent = $(
							'#msg-send-private-content-edit-textarea').val();
					var token = sessionStorage.getItem('token');
					var msgId = $("#msg-edit-btn").attr("name");
					var templateData = new Object();
					templateData.templateId = msgId;
					templateData.templateName = msgTitle;
					templateData.templateMsg = msgContent;
					var templateDataReq = JSON.stringify(templateData);
					console.log(templateDataReq);

					if (confirm("해당 내용으로 수정 하시겠습니까?") == true) {

						$.ajax({
							url : '/v1/pms/adm/svc/template',
							type : 'PUT',
							headers : {
								'X-Application-Token' : token
							},
							contentType : "application/json",
							dataType : 'json',
							data : templateDataReq,
							async : false,

							success : function(data) {

								if (!data.result.errors) {
									var dataResult = data.result.data;
									alert('메시지 내용을 수정 하였습니다!');
									$('#modal-footer-edit-cancel').click();

									window.location.reload();

								} else {
									alert('메시지 내용 수정에 실패  하였습니다!');
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

							}
						});
					} else {
						return false;
					}

				}
			},

			clickHrefEdit : function(e) {
				console.log('test123');
				console.log(e.currentTarget);
				var msgId = $(e.currentTarget).attr('class');
				console.log(msgId);

				var title = $('h5.' + msgId).text();
				var content = $('p.' + msgId).text();
				console.log(title);
				console.log(content);
				$('#send-private-title-edit-input').val(title);
				$('#msg-send-private-content-edit-textarea').val(content);
				var input_messageContent = $(
						'#msg-send-private-content-edit-textarea').val();
				input_messageContent = input_messageContent.trim();
				console.log(input_messageContent.Length());
				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-private-content-edit-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-private-length-edit-max').text("");
					$('#msg-send-private-length-edit-byte').text("MMS");
					$('#msg-send-private-length-edit-strong')
							.text(strongLength);
				} else {
					$('#msg-send-private-content-edit-textarea').css(
							'background-color', 'white');
					$('#msg-send-private-length-edit-max').text("140");
					$('#msg-send-private-length-edit-byte').text("byte");
					$('#msg-send-private-length-edit-strong')
							.text(strongLength);
				}

				$('#msg-edit-btn').attr("name", msgId);

			},

			selectContentList : function() {
				console.log('change select ');
				var contentSelect = $('#msg-send-private-content-load-select')
						.val();
				console.log(contentSelect);
				var contentMsg = $('p.' + contentSelect).text();
				console.log(contentMsg);
				$('#msg-send-private-content-textarea').val(contentMsg);
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

			checkContentEditArea : function() {
				var input_messageContent = $(
						'#msg-send-private-content-edit-textarea').val();
				input_messageContent = input_messageContent.trim();
				console.log(input_messageContent.Length());
				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-private-content-edit-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-private-length-edit-max').text("");
					$('#msg-send-private-length-edit-byte').text("MMS");
					$('#msg-send-private-length-edit-strong')
							.text(strongLength);
				} else {
					$('#msg-send-private-content-edit-textarea').css(
							'background-color', 'white');
					$('#msg-send-private-length-edit-max').text("140");
					$('#msg-send-private-length-edit-byte').text("byte");
					$('#msg-send-private-length-edit-strong')
							.text(strongLength);
				}

			},
			checkContentSaveArea : function() {

				var input_messageContent = $(
						'#msg-send-private-content-save-textarea').val();
				input_messageContent = input_messageContent.trim();
				console.log(input_messageContent.Length());
				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-private-content-save-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-private-length-save-max').text("");
					$('#msg-send-private-length-save-byte').text("MMS");
					$('#msg-send-private-length-save-strong')
							.text(strongLength);
				} else {
					$('#msg-send-private-content-save-textarea').css(
							'background-color', 'white');
					$('#msg-send-private-length-save-max').text("140");
					$('#msg-send-private-length-save-byte').text("byte");
					$('#msg-send-private-length-save-strong')
							.text(strongLength);
				}

			},

			msgSaveCancel : function() {
				console.log('123123123');
				$('#send-private-title-save-input').val("");
				$('#msg-send-private-content-save-textarea').val("");

			},

			msgSave : function() {
				var selectSize = $(
						'#msg-send-private-content-load-select option').size();

				if (selectSize > 12) {
					alert('내용저장은 12개까지만 가능합니다');
					return false;
				}

				if (this.msgSaveFormCheck()) {
					console.log('메시지 저장');
					var token = sessionStorage.getItem("token");
					var saveInput = $('#send-private-title-save-input').val();
					var saveContentArea = $(
							'#msg-send-private-content-save-textarea').val();
					var templateData = new Object();
					templateData.templateName = saveInput;
					templateData.templateMsg = saveContentArea;
					var templateDataReq = JSON.stringify(templateData);
					console.log(templateDataReq);
					if (confirm("해당 내용을 저장 하시겠습니까?") == true) {

						$.ajax({
							url : '/v1/pms/adm/svc/template',
							type : 'POST',
							headers : {
								'X-Application-Token' : token
							},
							contentType : "application/json",
							dataType : 'json',
							async : false,
							data : templateDataReq,

							success : function(data) {

								if (!data.result.errors) {
									$('#modal-footer-cancel').click();
									alert('내용을 저장 하였습니다.');
									window.location.reload();
								} else {
									alert('내용에 저장에 실패 하였습니다.');

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
								alert('내용에 저장에 실패 하였습니다.');

							}
						});
					} else {
						return false;
					}
				}

			},

			msgSaveFormCheck : function() {
				var saveInput = $('#send-private-title-save-input').val();
				var saveContentArea = $(
						'#msg-send-private-content-save-textarea').val();
				if (saveInput == null || saveInput == "") {

					alert('제목을 입력하세요!');
					$('#send-private-title-save-input').focus();
					return false;
				}
				if (saveContentArea == null || saveContentArea == "") {

					alert('내용을 입력하세요!');
					$('#msg-send-private-content-save-textarea').focus();
					return false;
				}
				return true;
			},

			msgSaveBtnClick : function() {
				console.log('msgCaaa');
				var contentTextAreaVal = $('#msg-send-private-content-textarea')
						.val();
				if (contentTextAreaVal != null && contentTextAreaVal != "") {
					$('#msg-send-private-content-save-textarea').val(
							contentTextAreaVal);
					var input_messageContent = $(
							'#msg-send-private-content-save-textarea').val();
					input_messageContent = input_messageContent.trim();
					console.log(input_messageContent.Length());
					var strongLength = input_messageContent.Length();
					if (strongLength > 140) {
						$('#msg-send-private-content-save-textarea').css(
								'background-color', '#ddd');
						$('#msg-send-private-length-save-max').text("");
						$('#msg-send-private-length-save-byte').text("MMS");
						$('#msg-send-private-length-save-strong').text(
								strongLength);
					} else {
						$('#msg-send-private-content-save-textarea').css(
								'background-color', 'white');
						$('#msg-send-private-length-save-max').text("140");
						$('#msg-send-private-length-save-byte').text("byte");
						$('#msg-send-private-length-save-strong').text(
								strongLength);
					}
				}

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

					var messageTarget = $(
							'#msg-send-private-user-target-show-input').val();
					console.log(messageTarget);
					console.log('123123123123');
					messageTarget = pushUtil.compactTrim(messageTarget);
					console.log('123');
					var messageContent = $('#msg-send-private-content-textarea')
							.val();
					var input_reservation = $(
							'#msg-send-private-reservation-date-input').val();
					var input_resendCount = $(
							'#msg-send-private-repeat-cnt-select').val();
					var input_resendInterval = $(
							'#msg-send-private-repeat-time-input').val();
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
					console.log('메시시 발송 데이터');
					console.log(messageDataResult);
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
							$('#msg-send-private-user-target-show-input').val(
									"");
							$('#msg-send-private-user-textarea').val("");
							$('#msg-send-private-length-strong').text("0");
							$('#msg-send-private-user-reservationdate-input')
									.val("");
							$('#msg-send-private-user-resendCount-input').val(
									"");
							$('#msg-send-private-user-resendInterval-input')
									.val("");
						} else {
							return false;
						}
					} else {
						if (confirm(messageData.receivers + " 해당 무전번호로 총 "
								+ sendCount + "건의 메시지가 전송 됩니다. 전송 하시겠습니까?") == true) {
							$('#msg-send-private-user-target-show-input').val(
									"");
							$('#msg-send-private-user-textarea').val("");
							$('#msg-send-private-length-strong').text("0");
							$('#msg-send-private-user-reservationdate-input')
									.val("");
							$('#msg-send-private-user-resendCount-input').val(
									"");
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

			plusContactUfmiCheck : function() {

				var ufmiVerCheck_radio = $(
						'input:radio[name="contact-add-pnum-radio"]:checked')
						.val();
				var private_input = $('#contact-add-private-input').val();
				var fleep_bunch_input = $('#contact-add-fleep-bunch-input')
						.val();

				if (fleep_bunch_input == null || fleep_bunch_input == "") {
					alert('fleep번호 또는 bunch 번호 를 입력해주세요!');
					$('#contact-add-fleep-bunch-input').focus();
					return false;
				}
				if (private_input == null || private_input == "") {
					alert('개별 번호를 입력해주세요!');
					$('#contact-add-private-input').focus();
					return false;
				}

				var ufmiResult = ufmiVerCheck_radio + "*" + fleep_bunch_input
						+ "*" + private_input;

				console.log('무전번호 결과');
				console.log(ufmiResult);

				var showInputVal = $('#contact-add-user-target-show-input')
						.val();
				if (showInputVal == "" || showInputVal == null) {
					$('#contact-add-user-target-show-div').show();

					$('#contact-add-user-target-show-input').val(
							showInputVal + ufmiResult);
				} else {
					alert('한개의 무전번호만 등록 가능합니다!');
					return false;
				}
				$('#contact-add-private-input').val("");

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
					$("#send-private-fleep-bunch-input").focus();
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
									var token = sessionStorage.getItem('token');
									$
											.ajax({
												url : '/v1/pms/adm/svc/template',
												type : 'GET',
												headers : {
													'X-Application-Token' : token
												},
												contentType : "application/json",
												dataType : 'json',
												async : false,

												success : function(data) {

													if (!data.result.errors) {
														var dataResult = data.result.data;
														console.log(dataResult);
														var contentHtml = "";
														if (dataResult.length > 0) {
															$(
																	'#msg-content-list-div')
																	.show();
															for ( var i in dataResult) {
																contentHtml = contentHtml
																		.concat('<div class="'
																				+ dataResult[i].templateId
																				+ ' col-xs-6 col-sm-3 pricing-box" ><div class="widget-box"><div class="widget-header"><h5 class="'
																				+ dataResult[i].templateId
																				+ ' widget-title bigger lighter">'
																				+ dataResult[i].templateName
																				+ '</h5><div class="widget-toolbar"><a class="'
																				+ dataResult[i].templateId
																				+ '" data-toggle="modal" href="#msg-content-edit-modal"> <i class="ace-icon fa fa-pencil bigger-130"></i></a> <a class="'
																				+ dataResult[i].templateId
																				+ '"  data-toggle="modal" href="#msg-content-delete-modal"> <i class="ace-icon fa fa-trash-o bigger-130"></i></a></div></div><div class="widget-body"><div class="widget-main"><div class="form-group"></div><p class="'
																				+ dataResult[i].templateId
																				+ '">'
																				+ dataResult[i].templateMsg
																				+ '</p></div></div></div></div>');
																$(
																		"#msg-send-private-content-load-select")
																		.append(
																				'<option value='
																						+ dataResult[i].templateId
																						+ '>'
																						+ dataResult[i].templateName
																						+ '</option>');
															}
															$(
																	'#msg-content-list-box-div')
																	.html(
																			contentHtml);
														} else {
															$(
																	'#msg-content-list-div')
																	.hide();
														}

													} else {

													}

												},
												error : function(data,
														textStatus, request) {
													if (data.status == 401) {
														alert("사용시간이 경과되어 자동 로그아웃 됩니다.");
														sessionStorage
																.removeItem("token");
														sessionStorage
																.removeItem("userId");
														sessionStorage
																.removeItem("role");

														sessionStorage
																.removeItem("groupTopic");
														sessionStorage
																.removeItem("ufmi");
														sessionStorage
																.removeItem("userName");
														pushRouter
																.navigate(
																		'login',
																		{
																			trigger : true
																		});
														return false;
													}

												}
											});

									// v1/pms/adm/svc/address
									// >
									// Request Headers
									// *{
									// "X-Application-Token":
									// "24d09fe9c4864a8f82d1224",
									// "Content-Type":
									// "application/json;charset=utf-8"
									// }*
									// >
									// Response BodySelect body
									// *{"result": {
									// "success": true,
									// "data": [
									// {
									// "userId": "easyConn04",
									// "ufmi": "82*50*1033",
									// "ufmiName": "testName",
									// "item1": "test1",
									// "item2": "test2",
									// "item3": "test3",
									// "issueTime": 1431947842000,
									// "issueId": "easyConn04"

									var contactTableData = new Array();

									$
											.ajax({
												url : '/v1/pms/adm/svc/address/',
												type : 'GET',
												contentType : "application/json",
												headers : {
													'X-Application-Token' : token
												},
												dataType : 'json',

												async : false,
												success : function(data) {
													if (!data.result.errors) {
														console.log('ajax 호출');

														var resultData = data.result.data;
														if (resultData.length == 0) {

															contactTableData
																	.push({
																		ufmi : '등록된 번호가 없습니다!',
																		ufmiName : '',
																		item1 : '',
																		item2 : '',
																		item3 : '',
																		item4 : ''
																	});
														}
														for ( var i in resultData) {

															resultData[i].ufmi = '<input name="contact-delete-checkbox" type="checkbox" value="'
																	+ resultData[i].ufmi
																	+ '"/>&nbsp'
																	+ resultData[i].ufmi;
															contactTableData
																	.push({
																		ufmi : resultData[i].ufmi,
																		ufmiName : resultData[i].ufmiName,
																		item1 : resultData[i].item1,
																		item2 : resultData[i].item2,
																		item3 : resultData[i].item3,
																		item4 : '<button type="button" name="editContactBtn"  data-target="#msg-resend-modal"  data-toggle="modal" class="btn btn-xs btn-white">수정하기</button>',
																	});

														}
													} else {
														alert('주소록을 읽기에 실패하였습니다.');
														console.log(data);
													}

												},
												error : function(data) {
													if (data.status == 401) {
														alert("사용시간이 경과되어 자동 로그아웃 됩니다.");
														sessionStorage
																.removeItem("token");
														sessionStorage
																.removeItem("userId");
														sessionStorage
																.removeItem("role");
														sessionStorage
																.removeItem("monitoringStatus");
														sessionStorage
																.removeItem("groupTopic");
														sessionStorage
																.removeItem("ufmi");
														sessionStorage
																.removeItem("userName");
														pushRouter
																.navigate(
																		'login',
																		{
																			trigger : true
																		});
														return false;
													}
													alert('주소록을 읽기에 실패하였습니다.');

												}
											});

									var detailTable = $('#contact-list-table')
											.dataTable({
												aaData : contactTableData,
												'bSort' : true,
												bJQueryUI : true,
												bDestroy : true,
												"bPaginate" : true,
												"pageLength" : 25,
												"bInfo" : true,

												bScrollCollapse : true,
												"autoWidth" : false,
												scrollX : true,
												"bLengthChange" : true,
												"dom" : 'T<"clear">lrftip',
												aoColumns : [ {
													mData : 'ufmi'

												}, {
													mData : 'ufmiName'

												}, {
													mData : 'item1'

												}, {
													mData : 'item2'

												}, {
													mData : 'item3'

												}, {
													mData : 'item4'
												}

												]

											});

								}, 'html');
			}

		});
window.ADF = window.ADF || {};
// 상용구 뷰
ADF.PushMsgContentView = Backbone.View
		.extend({
			// 상용구 뷰 이벤트 목록
			events : {
				"click a[href=#msg-content-edit-modal]" : "clickHrefEdit",
				"click a[href=#msg-content-delete-modal]" : "clickHrefDelete",
				"click #msg-edit-btn" : "msgEdit",
				"click #modal-footer-edit-cancel" : "msgEditCancel",
				"click #msg-save-btn" : "msgSave",
				"click #modal-footer-cancel" : "msgSaveCancel",
				"input #msg-send-private-content-save-textarea" : "checkContentSaveArea"
			},

			initialize : function() {
				_.bindAll(this, 'render', 'clickHrefEdit', 'clickHrefDelete',
						'msgEdit', 'msgEditFormCheck', 'msgEditCancel',
						'msgSave', 'msgSaveCancel', 'msgSaveFormCheck',
						'checkContentSaveArea');
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
				console.log('after render..');

			},

			// 상용구 메시지 입력 창
			checkContentSaveArea : function() {

				var input_messageContent = $(
						'#msg-send-private-content-save-textarea').val();
				input_messageContent = input_messageContent.trim();
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
			// 상용구 수정 취소
			msgEditCancel : function() {
				$('#send-private-title-edit-input').val("");
				$('#msg-send-private-content-edit-textarea').val("");
			},
			// 상용구 수정 form check
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
			// 상용구 수정
			msgEdit : function() {
				if (this.msgEditFormCheck()) {
					var msgTitle = $('#send-private-title-edit-input').val();
					var msgContent = $(
							'#msg-send-private-content-edit-textarea').val();
					var token = sessionStorage.getItem('easy-token');
					var msgId = $("#msg-edit-btn").attr("name");
					var templateData = new Object();
					templateData.templateId = msgId;
					templateData.templateName = msgTitle;
					templateData.templateMsg = msgContent;
					var templateDataReq = JSON.stringify(templateData);

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

							}
						});
					} else {
						return false;
					}

				}
			},
			// 상용구 저장 취소
			msgSaveCancel : function() {
				$('#send-private-title-save-input').val("");
				$('#msg-send-private-content-save-textarea').val("");

			},
			// 상용구 저장 form check
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
			// 상용구 저장
			msgSave : function() {

				var selectSize = $('#msg-content-list-box-div > div').length;
				if (selectSize >= 12) {
					alert('내용저장은 12개까지만 가능합니다');
					return false;
				}

				if (this.msgSaveFormCheck()) {
					var token = sessionStorage.getItem("easy-token");
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
								alert('내용에 저장에 실패 하였습니다.');

							}
						});
					} else {
						return false;
					}
				}

			},
			// 상용구 수정 버튼 클릭
			clickHrefEdit : function(e) {
				var msgId = $(e.currentTarget).attr('class');
				var title = $('h5.' + msgId).text();
				var content = $('p.' + msgId).text();
				$('#send-private-title-edit-input').val(title);
				$('#msg-send-private-content-edit-textarea').val(content);
				var input_messageContent = $(
						'#msg-send-private-content-edit-textarea').val();
				input_messageContent = input_messageContent.trim();
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
			// 상용구 삭제 버튼 클릭
			clickHrefDelete : function(e) {
				var msgId = $(e.currentTarget).attr('class');
				if (msgId != null) {
					$('#msg-delete-btn').attr('name', msgId);
				}
			},
			// 상용구 화면 생성
			render : function() {
				var that = this;
				var token = sessionStorage.getItem("easy-token");
				var userId = sessionStorage.getItem("easy-userId");
				var userName = sessionStorage.getItem("easy-userName");
				var ufmi = sessionStorage.getItem("easy-ufmi");

				console.log(token);
				console.log(userId);
				console.log(ufmi);
				console.log(userName);
				if (token == null || token == "" || token == "null"
						|| userId == null || userId == "" || userId == "null"
						|| ufmi == "null" || ufmi == null || ufmi == "") {
					alert('사용시간이 만료 되었거나 해당 정보가 올바르지 않아 자동로그 아웃됩니다!');
					pushRouter.navigate('login', {
						trigger : true
					});
					return false;
				}

				$
						.get(
								'pages/js/template/push_content_template.html',
								function(data) {
									var template = _.template(data, {});
									that.$el.html(template);
									var token = sessionStorage
											.getItem('easy-token');
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
																		.concat('<div style="word-break: break-all;" class="'
																				+ dataResult[i].templateId
																				+ 'col-xs-6 col-sm-3 pricing-box"><div class="widget-box"><div class="widget-header"><h5 class="'
																				+ dataResult[i].templateId
																				+ ' widget-title bigger lighter">'
																				+ dataResult[i].templateName
																				+ '</h5><div class="widget-toolbar"><a class="'
																				+ dataResult[i].templateId
																				+ '"data-toggle="modal" href="#msg-content-edit-modal"><i class="ace-icon fa fa-pencil bigger-130"></i></a><a class="'
																				+ dataResult[i].templateId
																				+ '"data-toggle="modal" href="#msg-content-delete-modal"><i class="ace-icon fa fa-trash-o bigger-130"></i></a></div></div><div class="widget-body"><div class="widget-main"><div class="form-group"></div><p class="'
																				+ dataResult[i].templateId
																				+ '">'
																				+ dataResult[i].templateMsg
																				+ '</p></div></div></div></div>');

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

												}
											});
								}, 'html');
			}

		});

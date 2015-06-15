window.ADF = window.ADF || {};
ADF.PushMsgSendView = Backbone.View
		.extend({

			events : {
				"change #msg-send-private-user-repeat-check" : "msgRepeatCheck",
				"change #msg-send-group-user-repeat-check" : "msgGroupRepeatCheck",
				"change #msg-send-contact-private-user-repeat-check" : "msgRepeatCheckContact",
				"input #send-private-input" : "checkSendPrivateInput",
				"input #send-group-input" : "checkSendGroupInput",
				"input #send-private-fleep-bunch-input" : "checkSendBunchInput",
				"input #send-group-fleep-bunch-input" : "checkSendGroupBunchInput",
				"input #contact-add-private-input" : "checkContactPrivateInput",
				"input #contact-add-fleep-bunch-input" : "checkContactBunchInput",
				"click #msg-send-private-plus-span" : "plusUfmiCheck",
				"click #contact-add-plus-span" : "plusContactUfmiCheck",
				"click #msg-send-group-plus-span" : "plusGroupTopicCheck",
				"input #msg-send-private-content-textarea" : "checkContentArea",
				"input #msg-send-group-content-textarea" : "checkGroupContentArea",
				"input #msg-send-contact-private-content-textarea" : "checkContactContentArea",
				"input #msg-send-private-content-save-textarea" : "checkContentSaveArea",
				"input #msg-send-private-content-edit-textarea" : "checkContentEditArea",
				"input #msg-send-private-repeat-time-input" : "checkRepeatTime",
				"input #msg-send-contact-private-repeat-time-input" : "checkRepeatTimeContact",
				"click #msg-send-private-btn" : "msgSend",
				"click #msg-send-group-btn" : "msgSendGroup",
				"click #msg-send-private-cancel-btn" : "msgSendCancel",
				"click #msg-send-group-cancel-btn" : "msgGroupSendCancel",
				"click #msg-send-contact-private-cancel-btn" : "msgSendCancelContact",
				"click #msg-send-private-save-btn" : "msgSaveBtnClick",
				"click #msg-send-group-save-btn" : "msgSaveGroupBtnClick",
				"click #msg-send-contact-private-save-btn" : "msgSaveContactBtnClick",
				"click #msg-save-btn" : "msgSave",
				"click #modal-footer-cancel" : "msgSaveCancel",
				"change #msg-send-private-content-load-select" : "selectContentList",
				"change #msg-send-group-content-load-select" : "selectGroupContentList",
				"change #msg-send-contact-private-content-load-select" : "selectContactContentList",
				"click a[href=#msg-content-edit-modal]" : "clickHrefEdit",
				"click a[href=#msg-content-delete-modal]" : "clickHrefDelete",
				"click #msg-edit-btn" : "msgEdit",
				"click #modal-footer-edit-cancel" : "msgEditCancel",
				"click #msg-delete-btn" : "msgDelete",
				"click #contact-add-btn" : "contactAdd",
				"click #contact-add-footer-cancel" : "contactAddCancel",
				"click #contact-delete-id" : "contactAllCheckBox",
				"click #contact-delete-btn" : "contactDelete",
				"click button[name='editContactBtn']" : "editContactModal",
				"click #contact-edit-footer-cancel" : "cancelContactModal",
				"click #contact-edit-btn" : "editContactBtn",
				"click #msg-send-contact-change-name-btn" : "changeNameBtn",
				"click #msg-send-contact-change-item1-btn" : "changeItem1Btn",
				"click #msg-send-contact-change-item2-btn" : "changeItem2Btn",
				"click #msg-send-contact-change-item3-btn" : "changeItem3Btn",
				"click #msg-send-contact-private-btn" : "msgSendContact",
				"click #msg-send-private-div" : "clickPrivateSendDiv",
				"click #msg-send-contact-div" : "clickContactSendDiv",
				"click #msg-send-group-div" : "clickGroupSendDiv",
				"change #contact-image-upload-input" : "changeFile",
				"change #group-image-upload-input" : "changeFile",
				"change #private-image-upload-input" : "changeFile"
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
						"contactDelete", "cancelContactModal",
						"editContactBtn", "editContactBtnFormCheck",
						"checkContactContentArea", "changeNameBtn",
						"changeItem1Btn", "changeItem2Btn", "changeItem3Btn",
						"selectContactContentList", "msgRepeatCheckContact",
						"checkRepeatTimeContact", "msgSendCancelContact",
						"msgSendContactFormCheck", "msgSendContact",
						"clickPrivateSendDiv", "clickContactSendDiv",
						"clickGroupSendDiv", "msgSaveContactBtnClick",
						"checkSendGroupInput", "checkSendGroupBunchInput",
						"plusGroupTopicCheck", "checkGroupContentArea",
						"msgSaveGroupBtnClick", "selectGroupContentList",
						"msgGroupRepeatCheck", "msgGroupSendCancel",
						"msgSendGroup", "msgSendGroupFormCheck", "changeFile");
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

			changeFile : function(e) {
				console.log(e.target.files[0].size);
				var maxSize = 3 * 1024 * 1024;
				if (e.target.files[0].size > maxSize) {
					alert('파일 첨부 용량을 초과 하였습니다(3MB 이하)');
					$('.remove').click();
					return false;

				}

				// create md5
				var blobSlice = File.prototype.slice || File.prototype.mozSlice
						|| File.prototype.webkitSlice, file = e.target.files[0], chunkSize = 3 * 1024 * 1024, // read
				chunks = Math.ceil(file.size / chunkSize), currentChunk = 0, spark = new SparkMD5.ArrayBuffer(), frOnload = function(
						e) {
					console
							.log("read chunk nr", currentChunk + 1, "of",
									chunks);
					spark.append(e.target.result); // append array buffer
					currentChunk++;
					if (currentChunk < chunks) {
						loadNext();
					} else {
						console.log("finished loading");
						var md5Result = spark.end();
						console.info("computed hash", md5Result); // compute

						$('#file-md5').val(md5Result);

						// hash
					}
				}, frOnerror = function() {
					console.warn('oops, something went wrong.');
				};
				function loadNext() {
					var fileReader = new FileReader();
					fileReader.onload = frOnload;
					fileReader.onerror = frOnerror;
					var start = currentChunk * chunkSize, end = ((start + chunkSize) >= file.size) ? file.size
							: start + chunkSize;
					fileReader.readAsArrayBuffer(blobSlice.call(file, start,
							end));
				}
				;
				loadNext();

				// get thumbnail
				function GetThumbnail(e) {
					var myCan = document.createElement('canvas');
					var img = new Image();
					img.src = e.target.result;
					img.onload = function() {

						myCan.id = "myTempCanvas";
						var tsize = 128;
						myCan.width = Number(tsize);
						myCan.height = Number(tsize);
						if (myCan.getContext) {
							var cntxt = myCan.getContext("2d");
							cntxt.drawImage(img, 0, 0, myCan.width,
									myCan.height);
							var dataURL = myCan.toDataURL("image/png");

							if (dataURL != null && dataURL != undefined) {
								// var nImg = document.createElement('img');
								// nImg.src = dataURL;
								// document.body.appendChild(nImg);
								console.log('썸네일 이미지');
								console.log(dataURL);
								$('#file-thumbnail').val(dataURL);

							} else
								console.log('unable to get context');

						}

					}

				}
				;

				// create thumbnail
				if (e.target.files == null || e.target.files == undefined) {
					document
							.write("This Browser has no support for HTML5 FileReader yet!");
					return false;
				}

				for (var i = 0; i < e.target.files.length; i++) {
					var file = e.target.files[i];
					var imageType = /image.*/;

					if (!file.type.match(imageType)) {
						console.log('이미지가 아님');
						$('#file-thumbnail')
								.val(
										'						data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA6klEQVRYR+2W0Q3CMAxErxuwCWwAbASTwEbABmUTRkBGDWrBTs9xkJCafFXtNe/Vqhx34NcVwJaM3wDsmGzHhIZME2gVaBVoFVhGBc4A1kZ33ABYkZ3zAaA3sncAh/TssxULQEptSZB8MyZwOSNE8LW0s+BXEl9wS0Du15ZQ4TmBmhImfE6ghkQWzghEJGbhrECJBAX3CHgkaLhXgJFwwUsEchJueKmAJlEEjwiMJeR60l49/dozlmv7psPp3ds98GgFvCw1H61AWOKvBGTgOIU/idvgmAaWcQXkT75w74dT+2HwmQwkyxR4AlZFRiG75B1tAAAAAElFTkSuQmCC');

						continue;

					}

					var reader = new FileReader();

					if (reader != null) {

						reader.onload = GetThumbnail;
						reader.readAsDataURL(file);
					}

				}

			},

			// contactFileChange : function() {
			// console.log('파일 변경');
			// $('#contact-image-upload-input').ace_file_input({
			// no_file : 'No File ...',
			// btn_choose : 'Choose',
			// btn_change : 'Change',
			// droppable : false,
			// onchange : null,
			// thumbnail : false
			// // | true | large
			// // whitelist:'gif|png|jpg|jpeg'
			// // blacklist:'exe|php'
			// // onchange:''
			// //
			// });
			//
			// },

			clickPrivateSendDiv : function() {
				console.log('개인발송 클릭');
				$('#contact-list-div').fadeOut();
				$("#tab-div").removeClass('col-lg-4');
				$("#tab-div").addClass('col-lg-8');
			},

			clickContactSendDiv : function() {
				console.log('개인발송 클릭');
				$('#contact-list-div').fadeIn();
				$("#tab-div").removeClass('col-lg-8');
				$("#tab-div").addClass('col-lg-4');
			},

			clickGroupSendDiv : function() {
				console.log('개인발송 클릭');
				$('#contact-list-div').fadeOut();
				$("#tab-div").removeClass('col-lg-4');
				$("#tab-div").addClass('col-lg-8');
			},

			changeItem1Btn : function() {
				var contentValue = $(
						'#msg-send-contact-private-content-textarea').val();
				contentValue = contentValue + "$항목1$";
				$('#msg-send-contact-private-content-textarea').val(
						contentValue);
				var input_messageContent = $(
						'#msg-send-contact-private-content-textarea').val();
				input_messageContent = input_messageContent.trim();
				console.log(input_messageContent.Length());
				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-contact-private-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-contact-private-length-max').text("");
					$('#msg-send-contact-private-length-byte').text("MMS");
					$('#msg-send-contact-private-length-strong').text(
							strongLength);
				} else {
					$('#msg-send-contact-private-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-contact-private-length-max').text("140");
					$('#msg-send-contact-private-length-byte').text("byte");
					$('#msg-send-contact-private-length-strong').text(
							strongLength);
				}

			},
			changeItem2Btn : function() {
				var contentValue = $(
						'#msg-send-contact-private-content-textarea').val();
				contentValue = contentValue + "$항목2$";
				$('#msg-send-contact-private-content-textarea').val(
						contentValue);
				var input_messageContent = $(
						'#msg-send-contact-private-content-textarea').val();
				input_messageContent = input_messageContent.trim();
				console.log(input_messageContent.Length());
				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-contact-private-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-contact-private-length-max').text("");
					$('#msg-send-contact-private-length-byte').text("MMS");
					$('#msg-send-contact-private-length-strong').text(
							strongLength);
				} else {
					$('#msg-send-contact-private-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-contact-private-length-max').text("140");
					$('#msg-send-contact-private-length-byte').text("byte");
					$('#msg-send-contact-private-length-strong').text(
							strongLength);
				}

			},
			changeItem3Btn : function() {
				var contentValue = $(
						'#msg-send-contact-private-content-textarea').val();
				contentValue = contentValue + "$항목3$";
				$('#msg-send-contact-private-content-textarea').val(
						contentValue);
				var input_messageContent = $(
						'#msg-send-contact-private-content-textarea').val();
				input_messageContent = input_messageContent.trim();
				console.log(input_messageContent.Length());
				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-contact-private-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-contact-private-length-max').text("");
					$('#msg-send-contact-private-length-byte').text("MMS");
					$('#msg-send-contact-private-length-strong').text(
							strongLength);
				} else {
					$('#msg-send-contact-private-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-contact-private-length-max').text("140");
					$('#msg-send-contact-private-length-byte').text("byte");
					$('#msg-send-contact-private-length-strong').text(
							strongLength);
				}
			},

			changeNameBtn : function() {
				var contentValue = $(
						'#msg-send-contact-private-content-textarea').val();
				contentValue = contentValue + "$이름$";
				$('#msg-send-contact-private-content-textarea').val(
						contentValue);
				var input_messageContent = $(
						'#msg-send-contact-private-content-textarea').val();
				input_messageContent = input_messageContent.trim();
				console.log(input_messageContent.Length());
				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-contact-private-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-contact-private-length-max').text("");
					$('#msg-send-contact-private-length-byte').text("MMS");
					$('#msg-send-contact-private-length-strong').text(
							strongLength);
				} else {
					$('#msg-send-contact-private-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-contact-private-length-max').text("140");
					$('#msg-send-contact-private-length-byte').text("byte");
					$('#msg-send-contact-private-length-strong').text(
							strongLength);
				}

			},

			editContactBtnFormCheck : function() {
				var editName = $('#contact-edit-user-name-input').val();

				if (editName == null || editName == "") {
					alert('수정할 이름을 입력해 주세요!');
					return flase;
				}
				return true;
			},

			editContactBtn : function() {

				if (this.editContactBtnFormCheck()) {
					var token = sessionStorage.getItem('token');
					var contactUfmi = $('#contact-edit-user-target-show-input')
							.val();
					var contactName = $('#contact-edit-user-name-input').val();
					var contactItem1 = $('#contact-edit-user-item1-input')
							.val();
					var contactItem2 = $('#contact-edit-user-item2-input')
							.val();
					var contactItem3 = $('#contact-edit-user-item3-input')
							.val();

					var contactEditData = new Object();
					contactEditData.ufmi = contactUfmi;
					contactEditData.ufmiName = contactName;

					if (contactItem1 != null && contactItem1 != "") {
						contactEditData.item1 = contactItem1;
					}
					if (contactItem2 != null && contactItem2 != "") {
						contactEditData.item2 = contactItem2;
					}
					if (contactItem3 != null && contactItem3 != "") {
						contactEditData.item3 = contactItem3;
					}

					var contactEditDataReq = JSON.stringify(contactEditData);
					console.log(contactEditDataReq);
					// /v1/pms/adm/svc/address

					if (confirm("해당내용을 수정 하시겠습니까?") == true) {

						$.ajax({
							url : '/v1/pms/adm/svc/address',
							type : 'PUT',
							headers : {
								'X-Application-Token' : token
							},
							contentType : "application/json",
							dataType : 'json',
							async : false,
							data : contactEditDataReq,

							success : function(data) {

								if (!data.result.errors) {

									alert('주소록을 수정 하였습니다!');
									$('#contact-edit-footer-cancel').click();
									window.location.reload();

								} else {

									alert('주소록을 수정에 실패 하였습니다!');

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
								alert('주소록을 수정 하였습니다!');

							}
						});

					} else {
						return false;
					}
				}

			},

			cancelContactModal : function() {
				$('#contact-edit-user-target-show-input').val("");
				$('#contact-edit-user-name-input').val("");
				$('#contact-edit-user-item1-input').val("");
				$('#contact-edit-user-item2-input').val("");
				$('#contact-edit-user-item3-input').val("");
			},

			editContactModal : function(e) {
				console.log('수정하기 이벤트0');
				console.log(e.target);
				var aData = contactTable.fnGetData($(e.target).parents('tr'));
				console.log(aData);
				$('#contact-edit-user-target-show-input').val(aData.hiddenUfmi);
				$('#contact-edit-user-name-input').val(aData.ufmiName);
				$('#contact-edit-user-item1-input').val(aData.item1);
				$('#contact-edit-user-item2-input').val(aData.item2);
				$('#contact-edit-user-item3-input').val(aData.item3);

				// /v1/pms/adm/svc/address

			},

			contactTable : {

			},

			contactDelete : function() {

				var that = this;
				var checkedLength = $('input[name="contact-list-checkbox"]:checked').length;
				var token = sessionStorage.getItem("token");
				if (checkedLength == 0) {
					alert('삭제할 대상을 선택해주세요');
					return false;
				} else {
					var contactDelete = new Object();
					contactDelete.ufmiArray = new Array();
					$('input[name="contact-list-checkbox"]:checked').each(
							function() {

								if (this.value != "on") {

									contactDelete.ufmiArray.push(this.value);
								}
							});

					if (contactDelete.ufmiArray.length == 0) {
						alert('삭제할 대상이 없습니다.');
						return false;
					}
					contactDelete = JSON.stringify(contactDelete);

					if (confirm("선택된 목록을 삭제 하시겠습니까?") == true) {

						$.ajax({
							url : '/v1/pms/adm/svc/address/delete',
							type : 'POST',
							headers : {
								'X-Application-Token' : token
							},
							contentType : "application/json",
							dataType : 'json',
							async : false,
							data : contactDelete,

							success : function(data) {

								if (!data.result.errors) {

									var dataResult = data.result.data;
									alert(dataResult + "개의 목록을  삭제 하였습니다.");
									window.location.reload();

								} else {
									alert("목록 삭제에 실패하였습니다.");

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
								alert("목록 삭제에 실패하였습니다.");

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
						.getElementsByName('contact-list-checkbox');
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

						$
								.ajax({
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
											$('#contact-add-footer-cancel')
													.click();
											alert('주소록을 등록 하였습니다.');
											window.location.reload();
										} else {
											if (data.result.errors[0] == 'DuplicateKeyException') {
												alert('이미 등록된 무전 번호가 있습니다!');
												return false;
											}
											alert('주소록 등록에 실패 하였습니다!');
											// DuplicateKeyException

										}

									},
									error : function(data, textStatus, request) {
										if (data.status == 401) {
											alert("사용시간이 경과되어 자동 로그아웃 됩니다.");
											sessionStorage.removeItem("token");
											sessionStorage.removeItem("userId");
											sessionStorage.removeItem("role");

											sessionStorage
													.removeItem("groupTopic");
											sessionStorage.removeItem("ufmi");
											sessionStorage
													.removeItem("userName");
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
				} else {
					$("#contact-add-fleep-bunch-input").attr('maxlength', '6');
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

				if (ufmiVerCheck_radio == "1") {
					$("#contact-add-private-input").attr('maxlength', '4');
				} else {
					$("#contact-add-private-input").attr('maxlength', '6');
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

			selectContactContentList : function() {
				console.log('change select ');
				var contentSelect = $(
						'#msg-send-contact-private-content-load-select').val();
				console.log(contentSelect);
				var contentMsg = $('p.' + contentSelect).text();
				console.log(contentMsg);
				$('#msg-send-contact-private-content-textarea').val(contentMsg);
				var input_messageContent = $(
						'#msg-send-contact-private-content-textarea').val();
				input_messageContent = input_messageContent.trim();
				console.log(input_messageContent.Length());
				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-contact-private-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-contact-private-length-max').text("");
					$('#msg-send-contact-private-length-byte').text("MMS");
					$('#msg-send-contact-private-length-strong').text(
							strongLength);
				} else {
					$('#msg-send-contact-private-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-contact-private-length-max').text("140");
					$('#msg-send-contact-private-length-byte').text("byte");
					$('#msg-send-contact-private-length-strong').text(
							strongLength);
				}

			},

			selectGroupContentList : function() {
				console.log('change select ');
				var contentSelect = $('#msg-send-group-content-load-select')
						.val();
				console.log(contentSelect);
				var contentMsg = $('p.' + contentSelect).text();
				console.log(contentMsg);
				$('#msg-send-group-content-textarea').val(contentMsg);
				var input_messageContent = $('#msg-send-group-content-textarea')
						.val();
				input_messageContent = input_messageContent.trim();
				console.log(input_messageContent.Length());
				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-group-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-group-length-max').text("");
					$('#msg-send-group-length-byte').text("MMS");
					$('#msg-send-group-length-strong').text(strongLength);
				} else {
					$('#msg-send-group-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-group-length-max').text("140");
					$('#msg-send-group-length-byte').text("byte");
					$('#msg-send-group-length-strong').text(strongLength);
				}

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
				console.log('메시지 저장');
				var selectSize = $(
						'#msg-send-private-content-load-select option').size();

				console.log(selectSize);
				if (selectSize >= 13) {
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

			msgSaveGroupBtnClick : function() {
				console.log('msgCaaa');
				var contentTextAreaVal = $('#msg-send-group-content-textarea')
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

			msgSaveContactBtnClick : function() {
				console.log('msgCaaa');
				var contentTextAreaVal = $(
						'#msg-send-contact-private-content-textarea').val();
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
				$('#msg-send-private-content-load-select').val(0);
				$('.remove').click();
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

			msgGroupSendCancel : function() {
				$('#send-group-fleep-bunch-input').val("");
				$('#send-group-input').val("");
				$('#msg-send-group-user-target-show-input').val("");
				$('#msg-send-group-user-target-show-div').hide();
				$('#msg-send-group-content-textarea').val("");
				$('#msg-send-group-user-repeat-check').attr('checked', false);
				$('#msg-send-group-reservation-date-input').val("");
				$('#msg-send-group-repeat-div').hide();
				$('#msg-send-group-repeat-cnt-select').val(0);
				$('#msg-send-group-repeat-time-input').val("");
				$('.remove').click();
				$('#msg-send-group-content-load-select').val(0);
				$('#msg-send-group-repeat-div').fadeOut();
				$('#msg-send-group-user-target-show-div').fadeOut();

				var input_messageContent = $('#msg-send-group-content-textarea')
						.val();
				input_messageContent = input_messageContent.trim();
				console.log(input_messageContent.Length());
				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-group-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-group-length-max').text("");
					$('#msg-send-group-length-byte').text("MMS");
					$('#msg-send-group-length-strong').text(strongLength);
				} else {
					$('#msg-send-group-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-group-length-max').text("140");
					$('#msg-send-group-length-byte').text("byte");
					$('#msg-send-group-length-strong').text(strongLength);
				}

			},

			msgSendCancelContact : function() {
				$('#msg-send-contact-private-content-textarea').val("");
				$('#msg-send-contact-private-user-repeat-check').attr(
						'checked', false);
				$('#msg-send-contact-private-reservation-date-input').val("");
				$('#msg-send-contact-private-repeat-div').hide();
				$('#msg-send-contact-private-repeat-cnt-select').val(0);
				$('#msg-send-contact-private-repeat-time-input').val("");
				$('#msg-send-contact-private-content-load-select').val(0);
				$('.remove').click();
				var checkboxes = document
						.getElementsByName('contact-list-checkbox');
				for (var i = 0, n = checkboxes.length; i < n; i++) {

					checkboxes[i].checked = false;

				}

				var input_messageContent = $(
						'#msg-send-contact-private-content-textarea').val();
				input_messageContent = input_messageContent.trim();
				console.log(input_messageContent.Length());
				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-contact-private-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-contact-private-length-max').text("");
					$('#msg-send-contact-private-length-byte').text("MMS");
					$('#msg-send-contact-private-length-strong').text(
							strongLength);
				} else {
					$('#msg-send-contact-private-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-contact-private-length-max').text("140");
					$('#msg-send-contact-private-length-byte').text("byte");
					$('#msg-send-contact-private-length-strong').text(
							strongLength);
				}

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
			checkRepeatTimeContact : function() {
				console.log('asdf');
				var num_check = /^[0-9]*$/;
				var private_input = $(
						"#msg-send-contact-private-repeat-time-input").val();

				if (!num_check.test(private_input)) {
					alert('숫자 만 입력 가능합니다!');
					$("#msg-send-contact-private-repeat-time-input").focus();
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
					$('#private-send-before-i').hide();
					$('#private-send-after-i').show();
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
					var token = sessionStorage.getItem("token");

					var sendCount = 0;
					// /file attache
					var fileName = document
							.getElementById("private-image-upload-input").value;
					var fileData = document
							.getElementById("private-image-upload-input").files[0];

					var userId = sessionStorage.getItem("userId");
					if (fileName != null && fileData != null) {
						var fileFormat = fileName.substr(fileName
								.lastIndexOf('.') + 1);
						var replaceImageText = fileName.replace(/^.*\\/, "");
						console.log(fileFormat);
						var md5 = $('#file-md5').val();
						replaceImageText = encodeURIComponent(replaceImageText);
						var formdata = new FormData();
						formdata.append("fileData", fileData);
						var xhr = new XMLHttpRequest();
						xhr.open("POST", "/cts/v1/users/" + userId, false);
						xhr.setRequestHeader("md5", md5);
						xhr.setRequestHeader("token", token);
						xhr.setRequestHeader("file", replaceImageText);
						xhr.send(formdata);
						messageData.mms = true;
						messageData.fileName = md5;
						messageData.fileFormat = fileFormat;
						console.log('파일 포맷');
						console.log(fileFormat);
						console.log('파일 네임');
						console.log(replaceImageText);
						console.log('파일 data');
						console.log(fileData);
						console.log("md5");
						console.log(md5);

						if (xhr.status == 200 || xhr.status == 409) {
							console.log(xhr.status);
							// 썸네일 전송
							var thumbNail = $('#file-thumbnail').val();
							console.log('썸네일');
							console.log(thumbNail);
							thumbNail = pushUtil.dataURItoBlob(thumbNail);
							console.log(thumbNail);
							var formdaThumb = new FormData();
							formdaThumb.append("fileData", thumbNail);
							var xhrThumb = new XMLHttpRequest();
							xhrThumb.open("POST", "/cts/v1/users/" + userId
									+ "/thumb", false);
							xhrThumb.setRequestHeader("md5", md5);
							xhrThumb.setRequestHeader("token", token);
							xhrThumb.setRequestHeader("file", replaceImageText);
							xhrThumb.send(formdaThumb);
							if (xhrThumb.status == 200
									|| xhrThumb.status == 409) {
								console.log('썸네일 파일 전송 성공');
								console.log(xhrThumb.status);

							} else {
								console.log(xhrThumb.status);
								$('#private-send-before-i').show();
								$('#private-send-after-i').hide();
								alert('첨부 파일 전송에 실패 하였습니다!');
								return false;
							}
						} else {
							console.log(xhr.status);
							$('#private-send-before-i').show();
							$('#private-send-after-i').hide();
							alert('첨부 파일 전송에 실패 하였습니다!');
							return false;
						}

					}

					// /file end

					var messageDataResult = JSON.stringify(messageData);
					console.log('메시시 발송 데이터');
					console.log(messageDataResult);

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
								+ sendCount + "건의 메시지가 예약전송 됩니다. 전송 하시겠습니까?") == true) {

							// msg-send-private-content-textarea
							$('.remove').click();
							$('#msg-send-private-user-target-show-input').val(
									"");
							$('#msg-send-private-content-textarea').val("");
							$('#msg-send-private-length-strong').text("0");
							$('#msg-send-private-reservation-date-input').val(
									"");
							$('#msg-send-private-repeat-cnt-select').val(0);
							$('#msg-send-private-content-load-select').val(0);
							$('#msg-send-private-repeat-time-input').val("");
							$('#msg-send-private-user-repeat-check').prop(
									'checked', false);
							$('#msg-send-private-length-max').val('140');
							$('#msg-send-private-length-byte').val('byte');
							$('#msg-send-private-content-textarea').css(
									'background-color', 'white');

							$('#msg-send-private-repeat-div').fadeOut();
							$('#msg-send-private-content-load-select').val(0);
							$('.remove').click();
							$('#msg-send-private-user-target-show-div')
									.fadeOut();
							// msg-send-private-user-repeat-check

						} else {
							$('#private-send-before-i').show();
							$('#private-send-after-i').hide();
							return false;
						}
					} else {
						if (confirm(messageData.receivers + " 해당 무전번호로 총 "
								+ sendCount + "건의 메시지가 전송 됩니다. 전송 하시겠습니까?") == true) {
							$('.remove').click();
							$('#msg-send-private-user-target-show-input').val(
									"");
							$('#msg-send-private-content-textarea').val("");
							$('#msg-send-private-length-strong').text("0");
							$('#msg-send-private-reservation-date-input').val(
									"");
							$('#msg-send-private-repeat-cnt-select').val(0);
							$('#msg-send-private-content-load-select').val(0);
							$('#msg-send-private-repeat-time-input').val("");
							$('#msg-send-private-user-repeat-check').prop(
									'checked', false);
							$('#msg-send-private-length-max').val('140');
							$('#msg-send-private-length-byte').val('byte');
							$('#msg-send-private-content-textarea').css(
									'background-color', 'white');

							$('#msg-send-private-content-load-select').val(0);
							$('.remove').click();
							$('#msg-send-private-repeat-div').fadeOut();
							$('#msg-send-private-user-target-show-div')
									.fadeOut();
						} else {
							$('#private-send-before-i').show();
							$('#private-send-after-i').hide();
							return false;
						}
					}

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
								$('#private-send-before-i').show();
								$('#private-send-after-i').hide();
								alert('메시지를 전송 하였습니다.');

							} else {
								$('#private-send-before-i').show();
								$('#private-send-after-i').hide();
								alert('메시지 전송에 실패 하였습니다.');

							}

						},
						error : function(data, textStatus, request) {
							if (data.status == 401) {
								$('#private-send-before-i').show();
								$('#private-send-after-i').hide();
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
							$('#private-send-before-i').show();
							$('#private-send-after-i').hide();
							alert('메시지 전송에 실패 하였습니다.');

						}
					});

				}

			},

			msgSendGroup : function() {
				var userName = sessionStorage.getItem('userName');
				var token = sessionStorage.getItem("token");
				if (userName == null || userName == "" || userName == "null") {
					alert('발송번호를 등록해야 정상 사용이 가능합니다.!');
					pushRouter.navigate('user_info', {
						trigger : true
					});
					return false;
				}
				if (this.msgSendGroupFormCheck()) {
					$('#group-send-before-i').hide();
					$('#group-send-after-i').show();
					var messageTarget = $(
							'#msg-send-group-user-target-show-input').val();
					console.log(messageTarget);
					messageTarget = pushUtil.compactTrim(messageTarget);
					var messageContent = $('#msg-send-group-content-textarea')
							.val();
					var input_reservation = $(
							'#msg-send-group-reservation-date-input').val();
					var input_resendCount = $(
							'#msg-send-group-repeat-cnt-select').val();
					var input_resendInterval = $(
							'#msg-send-group-repeat-time-input').val();
					var dateResult = "";
					var messageData = new Object();
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
					messageContent = pushUtil.utf8_to_b64(messageContent);
					messageTarget = messageTarget.split(",");
					messageData.receivers = messageTarget;
					messageData.content = messageContent;
					messageData.contentType = "application/base64";
					var contentLength = $('#msg-send-group-length-strong')
							.text();
					messageData.contentLength = contentLength;
					console.log('메시지 전송전 길이');
					console.log(messageData.contentLength);

					// /file attache
					var fileName = document
							.getElementById("group-image-upload-input").value;

					var fileData = document
							.getElementById("group-image-upload-input").files[0];

					var userId = sessionStorage.getItem("userId");
					if (fileName != null && fileData != null) {

						var fileFormat = fileName.substr(fileName
								.lastIndexOf('.') + 1);
						console.log(fileFormat);
						var replaceImageText = fileName.replace(/^.*\\/, "");
						var md5 = $('#file-md5').val();
						replaceImageText = encodeURIComponent(replaceImageText);
						var formdata = new FormData();
						formdata.append("fileData", fileData);
						var xhr = new XMLHttpRequest();
						xhr.open("POST", "/cts/v1/users/" + userId, false);
						xhr.setRequestHeader("md5", md5);
						xhr.setRequestHeader("token", token);
						xhr.setRequestHeader("file", replaceImageText);
						xhr.send(formdata);
						messageData.mms = true;
						messageData.fileName = md5;
						messageData.fileFormat = fileFormat;
						console.log('파일 포맷');
						console.log(fileFormat);
						console.log('파일 네임');
						console.log(replaceImageText);
						console.log('파일 data');
						console.log(fileData);
						console.log("md5");
						console.log(md5);

						if (xhr.status == 200 || xhr.status == 409) {
							console.log(xhr.status);
							// 썸네일 전송
							var thumbNail = $('#file-thumbnail').val();
							console.log('썸네일');
							console.log(thumbNail);
							thumbNail = pushUtil.dataURItoBlob(thumbNail);
							console.log(thumbNail);
							var formdaThumb = new FormData();
							formdaThumb.append("fileData", thumbNail);
							var xhrThumb = new XMLHttpRequest();
							xhrThumb.open("POST", "/cts/v1/users/" + userId
									+ "/thumb", false);
							xhrThumb.setRequestHeader("md5", md5);
							xhrThumb.setRequestHeader("token", token);
							xhrThumb.setRequestHeader("file", replaceImageText);
							xhrThumb.send(formdaThumb);
							if (xhrThumb.status == 200
									|| xhrThumb.status == 409) {
								console.log('썸네일 파일 전송 성공');
								console.log(xhrThumb.status);

							} else {
								console.log(xhrThumb.status);
								$('#group-send-before-i').show();
								$('#group-send-after-i').hide();
								alert('첨부 파일 전송에 실패 하였습니다!');
								return false;
							}
						} else {
							console.log(xhr.status);
							$('#group-send-before-i').show();
							$('#group-send-after-i').hide();
							alert('첨부 파일 전송에 실패 하였습니다!');
							return false;
						}

					}

					// /file end

					var messageDataResult = JSON.stringify(messageData);
					console.log('메시시 발송 데이터');
					console.log(messageDataResult);
					var groupTopicCount = 0;

					$.ajax({
						url : '/v1/pms/adm/svc/subscribe/count?topic='
								+ messageData.receivers[0],
						type : 'GET',
						headers : {
							'X-Application-Token' : token
						},
						contentType : "application/json",
						dataType : 'json',
						async : false,
						data : messageDataResult,

						success : function(data) {

							if (!data.result.errors) {
								// groupTopicCount add
								console.log(data.result.data);
								groupTopicCount = data.result.data;

							} else {
								$('#msg-send-group-user-target-show-input')
										.val("");
								$('#group-send-before-i').show();
								$('#group-send-after-i').hide();
								alert('해당 그룹에 수신자가 없습니다. 다른 그룹을 입력해 주세요!');
								return false;
							}

						},
						error : function(data, textStatus, request) {
							if (data.status == 401) {
								$('#group-send-before-i').show();
								$('#group-send-after-i').hide();
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
							$('#group-send-before-i').show();
							$('#group-send-after-i').hide();
							alert('그룹 대상조회에 실패 했습니다!');
							return false;
						}
					});

					if (groupTopicCount == 0) {
						return false;
					}
					var sendCount = 0;
					var fileName = document
							.getElementById("group-image-upload-input").value;
					var fileData = document
							.getElementById("group-image-upload-input").files[0];
					var replaceImageText = fileName.replace(/^.*\\/, "");

					// if (fileName != null && fileData != null) {
					//
					// console.log('파일 네임');
					// console.log(replaceImageText);
					//
					// console.log('파일 데잍');
					// console.log(fileData);
					// var hash = hex_md5(fileData);
					// var formdata = new FormData();
					// console.log("hash");
					// console.log(hash);
					//
					// formdata.append("md5", hash);
					// formdata.append("token", token);
					//
					// var xhr = new XMLHttpRequest();
					// xhr
					// .open(
					// "POST",
					// "http://14.63.224.160:8080/v1/users/easyConn03",
					// true);
					// xhr.send(formdata);
					// xhr.onload = function(e) {
					//
					// if (this.status == 200) {
					//
					// console.log('image send res code 200 return');
					//
					// } else {
					// console.log('image send res code 900 return');
					// return false;
					// }
					//
					// };
					// return false;
					// }

					if (messageData.resendMaxCount) {
						console.log('반복 있음');

						groupTopicCount = groupTopicCount * 1;
						messageData.resendMaxCount = messageData.resendMaxCount * 1;
						sendCount = (groupTopicCount * messageData.resendMaxCount)
								+ groupTopicCount;

					} else {
						sendCount = groupTopicCount;

					}

					// 인원체크

					if (messageData.reservationTime) {
						if (confirm("총 " + sendCount
								+ "건의 메시지가 예약전송 됩니다. 전송 하시겠습니까?") == true) {
							$('.remove').click();
							$('#msg-send-group-user-target-show-input').val("");
							$('#msg-send-group-content-textarea').val("");
							$('#msg-send-group-length-strong').text("0");
							$('#msg-send-group-reservation-date-input').val("");
							$('#msg-send-group-repeat-cnt-select').val(0);
							$('#msg-send-group-content-load-select').val(0);
							$('#msg-send-group-repeat-time-input').val("");
							$('#msg-send-group-length-max').val('140');
							$('#msg-send-group-length-byte').val('byte');
							$('#msg-send-group-content-textarea').css(
									'background-color', 'white');
							$('#msg-send-group-user-repeat-check').prop(
									'checked', false);
							$('#msg-send-group-repeat-div').fadeOut();
							$('#msg-send-group-user-target-show-div').fadeOut();
						} else {
							$('#group-send-before-i').show();
							$('#group-send-after-i').hide();
							return false;
						}
					} else {
						if (confirm(" 총 " + sendCount
								+ "건의 메시지가 전송 됩니다. 전송 하시겠습니까?") == true) {
							$('.remove').click();
							$('#msg-send-group-user-target-show-input').val("");
							$('#msg-send-group-content-textarea').val("");
							$('#msg-send-group-length-strong').text("0");
							$('#msg-send-group-reservation-date-input').val("");
							$('#msg-send-group-repeat-cnt-select').val(0);
							$('#msg-send-group-content-load-select').val(0);
							$('#msg-send-group-length-max').val('140');
							$('#msg-send-group-length-byte').val('byte');
							$('#msg-send-group-content-textarea').css(
									'background-color', 'white');
							$('#msg-send-group-repeat-time-input').val("");
							$('#msg-send-group-user-repeat-check').prop(
									'checked', false);
							$('#msg-send-group-repeat-div').fadeOut();
							$('#msg-send-group-user-target-show-div').fadeOut();
						} else {
							$('#group-send-before-i').show();
							$('#group-send-after-i').hide();
							return false;
						}
					}

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
								$('#group-send-before-i').show();
								$('#group-send-after-i').hide();
								alert('메시지를 전송 하였습니다.');

							} else {
								$('#group-send-before-i').show();
								$('#group-send-after-i').hide();
								alert('메시지 전송에 실패 하였습니다.');

							}

						},
						error : function(data, textStatus, request) {
							if (data.status == 401) {
								$('#group-send-before-i').show();
								$('#group-send-after-i').hide();
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
							$('#group-send-before-i').show();
							$('#group-send-after-i').hide();
							alert('메시지 전송에 실패 하였습니다.');

						}
					});

				}

			},

			msgSendGroupFormCheck : function() {
				var messageTarget = $('#msg-send-group-user-target-show-input')
						.val();
				messageTarget = pushUtil.compactTrim(messageTarget);
				var messageContent = $('#msg-send-group-content-textarea')
						.val();
				var input_reservation = $(
						'#msg-send-group-reservation-date-input').val();

				if (messageTarget == null || messageTarget == "") {
					alert("+ 버튼을 눌러 그룹번호를 추가해 주세요!");
					$('#send-group-input').focus();
					return false;
				}
				if (messageContent == null || messageContent == "") {
					alert("메세지 보낼 내용을 입력해주세요");
					$('#msg-send-group-content-textarea').focus();
					return false;
				}

				var checkedLength = $('input[id="msg-send-group-user-repeat-check"]:checked').length;
				if (checkedLength != 0) {
					var selectValue = $('#msg-send-group-repeat-cnt-select')
							.val();
					if (selectValue == 0) {
						alert('반복 횟수를 입력해주세요!');
						$('#msg-send-group-repeat-cnt-select').focus();
						return false;
					}

					var repeatValue = $('#msg-send-group-repeat-time-input')
							.val();
					if (repeatValue == null || repeatValue == "") {
						alert('반복 시간을 입력해주세요!');
						$('#msg-send-group-repeat-time-input').focus();
						return false;
					} else {
						repeatValue = repeatValue * 1;
						if (repeatValue > 1440) {
							alert('반복시간은 최대 24시간(1440)분을 넘을 수 없습니다!');
							$('#msg-send-group-repeat-time-input').focus();
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

			msgSendContactFormCheck : function() {
				var checkedLength = $('input[name="contact-list-checkbox"]:checked').length;
				if (checkedLength == 0) {
					alert('전송할 대상을 주소록에서 선택해주세요');
					return false;

				}

				var messageContent = $(
						'#msg-send-contact-private-content-textarea').val();
				var input_reservation = $(
						'#msg-send-contact-private-reservation-date-input')
						.val();

				if (messageContent == null || messageContent == "") {
					alert("메세지 보낼 내용을 입력해주세요");
					$('#msg-send-contact-private-content-textarea').focus();
					return false;
				}

				var checkedLength = $('input[id="msg-send-contact-private-user-repeat-check"]:checked').length;
				if (checkedLength != 0) {
					var selectValue = $(
							'#msg-send-contact-private-repeat-cnt-select')
							.val();

					if (selectValue == 0) {
						alert('반복 횟수를 입력해주세요!');
						$('#msg-send-contact-private-repeat-cnt-select')
								.focus();
						return false;
					}

					var repeatValue = $(
							'#msg-send-contact-private-repeat-time-input')
							.val();
					if (repeatValue == null || repeatValue == "") {
						alert('반복 시간을 입력해주세요!');
						$('#msg-send-contact-private-repeat-time-input')
								.focus();
						return false;
					} else {
						repeatValue = repeatValue * 1;
						if (repeatValue > 1440) {
							alert('반복시간은 최대 24시간(1440)분을 넘을 수 없습니다!');
							$('#msg-send-contact-private-repeat-time-input')
									.focus();
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

			msgSendContact : function() {
				var userName = sessionStorage.getItem('userName');

				if (userName == null || userName == "" || userName == "null") {
					alert('발송번호를 등록해야 정상 사용이 가능합니다.!');
					pushRouter.navigate('user_info', {
						trigger : true
					});
					return false;
				}
				var messageData = new Object();
				var token = sessionStorage.getItem('token');
				messageData.addressMessageArray = new Array();
				messageData.contentType = "application/base64";
				var mmsCount = 0;
				var smsCount = 0;

				var input_resendCount = $(
						'#msg-send-contact-private-repeat-cnt-select').val();
				var input_resendInterval = $(
						'#msg-send-contact-private-repeat-time-input').val();

				var input_reservation = $(
						'#msg-send-contact-private-reservation-date-input')
						.val();
				var dateResult = "";
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

				if (this.msgSendContactFormCheck()) {
					$('#contact-send-before-i').hide();
					$('#contact-send-after-i').show();
					$('input[name="contact-list-checkbox"]:checked')
							.each(
									function() {
										if (this.value != "on") {
											var messageDataDetail = new Object();
											var aData = contactTable
													.fnGetData($(this).parents(
															'tr'));
											var messageContent = $(
													'#msg-send-contact-private-content-textarea')
													.val();
											messageDataDetail.receiver = aData.hiddenUfmi;

											var name = aData.ufmiName;
											var item1 = aData.item1;
											var item2 = aData.item2;
											var item3 = aData.item3;
											if (messageContent.indexOf("$이름$") > -1) {
												messageContent = messageContent
														.replace('$이름$', name);
											}

											if (messageContent.indexOf("$항목1$") > -1) {
												messageContent = messageContent
														.replace('$항목1$', item1);
											}
											if (messageContent.indexOf("$항목2$") > -1) {
												messageContent = messageContent
														.replace('$항목2$', item2);
											}
											if (messageContent.indexOf("$항목3$") > -1) {
												messageContent = messageContent
														.replace('$항목3$', item3);
											}

											if (messageContent.indexOf("null") > -1) {
												messageContent = messageContent
														.replace(/null/gi, '');
											}

											messageDataDetail.content = messageContent
													.trim();
											messageDataDetail.contentLength = messageDataDetail.content
													.Length();
											if (messageDataDetail.contentLength > 140) {
												mmsCount++;

											} else {
												smsCount++;
											}
											console.log('메시지 내용');
											console
													.log(messageDataDetail.content);
											messageDataDetail.content = pushUtil
													.utf8_to_b64(messageDataDetail.content);

											messageData.addressMessageArray
													.push(messageDataDetail);
										}
									});

					var sendCount = 0;
					var repeatCount = 0;

					// /file attache
					var fileName = document
							.getElementById("contact-image-upload-input").value;

					var fileData = document
							.getElementById("contact-image-upload-input").files[0];

					var userId = sessionStorage.getItem("userId");
					if (fileName != null && fileData != null) {

						mmsCount = mmsCount + smsCount;
						smsCount = 0;
						var fileFormat = fileName.substr(fileName
								.lastIndexOf('.') + 1);
						console.log(fileFormat);
						var replaceImageText = fileName.replace(/^.*\\/, "");
						var md5 = $('#file-md5').val();
						replaceImageText = encodeURIComponent(replaceImageText);
						var formdata = new FormData();
						formdata.append("fileData", fileData);
						var xhr = new XMLHttpRequest();
						xhr.open("POST", "/cts/v1/users/" + userId, false);
						xhr.setRequestHeader("md5", md5);
						xhr.setRequestHeader("token", token);
						xhr.setRequestHeader("file", replaceImageText);
						xhr.send(formdata);
						messageData.mms = true;
						messageData.fileName = md5;
						messageData.fileFormat = fileFormat;
						console.log('파일 포맷');
						console.log(fileFormat);
						console.log('파일 네임');
						console.log(replaceImageText);
						console.log('파일 data');
						console.log(fileData);
						console.log("md5");
						console.log(md5);

						if (xhr.status == 200 || xhr.status == 409) {
							console.log(xhr.status);
							// 썸네일 전송

							var thumbNail = $('#file-thumbnail').val();

							console.log('썸네일');
							console.log(thumbNail);
							thumbNail = pushUtil.dataURItoBlob(thumbNail);
							console.log(thumbNail);
							var formdaThumb = new FormData();
							formdaThumb.append("fileData", thumbNail);
							var xhrThumb = new XMLHttpRequest();
							xhrThumb.open("POST", "/cts/v1/users/" + userId
									+ "/thumb", false);
							xhrThumb.setRequestHeader("md5", md5);
							xhrThumb.setRequestHeader("token", token);
							xhrThumb.setRequestHeader("file", ".png");
							xhrThumb.send(formdaThumb);
							if (xhrThumb.status == 200
									|| xhrThumb.status == 409) {
								console.log('썸네일 파일 전송 성공');
								console.log(xhrThumb.status);

							} else {
								console.log(xhrThumb.status);
								$('#contact-send-before-i').show();
								$('#contact-send-after-i').hide();
								alert('첨부 파일 전송에 실패 하였습니다!');
								return false;
							}
						} else {
							console.log(xhr.status);
							$('#contact-send-before-i').show();
							$('#contact-send-after-i').hide();
							alert('첨부 파일 전송에 실패 하였습니다!');
							return false;
						}

					}

					// /file end

					var messageDataReq = JSON.stringify(messageData);
					console.log('발송 데이터 ');
					console.log(messageDataReq);
					if (messageData.resendMaxCount) {
						console.log('반복 있음');
						messageData.resendMaxCount = messageData.resendMaxCount * 1;
						sendCount = (messageData.addressMessageArray.length * messageData.resendMaxCount)
								+ messageData.addressMessageArray.length;
						mmsCount = (mmsCount * messageData.resendMaxCount)
								+ mmsCount;

						smsCount = (smsCount * messageData.resendMaxCount)
								+ smsCount;

					} else {
						sendCount = messageData.addressMessageArray.length;

					}

					if (messageData.reservationTime) {

						if (confirm(sendCount + "건의 메시지가 예약전송 됩니다.(mms:"
								+ mmsCount + ",sms:" + smsCount
								+ "). 전송 하시겠습니까?") == true) {

						} else {
							$('#contact-send-before-i').show();
							$('#contact-send-after-i').hide();
							return false;
						}
					} else {

						if (confirm(sendCount + "건의 메시지가 전송 됩니다.(mms:"
								+ mmsCount + ",sms:" + smsCount
								+ ") 전송 하시겠습니까?") == true) {

						} else {
							$('#contact-send-before-i').show();
							$('#contact-send-after-i').hide();
							return false;
						}
					}

					$.ajax({
						url : '/v1/pms/adm/svc/address/messages',
						type : 'POST',
						headers : {
							'X-Application-Token' : token
						},
						contentType : "application/json",
						dataType : 'json',
						async : false,
						data : messageDataReq,

						success : function(data) {

							if (!data.result.errors) {

								console.log('전송 갯수');

								$('.remove').click();
								$('#msg-send-contact-private-cancel-btn')
										.click();
								$('#contact-send-before-i').show();
								$('#contact-send-after-i').hide();
								/*
								 * $(
								 * '#msg-send-contact-private-user-target-show-input')
								 * .val(""); $(
								 * '#msg-send-contact-private-content-load-select')
								 * .val(0); $(
								 * '#msg-send-contact-private-content-textarea')
								 * .val(""); $(
								 * '#msg-send-contact-private-length-strong')
								 * .text("0"); $(
								 * '#msg-send-contact-private-length-max')
								 * .text("140"); $(
								 * '#msg-send-contact-private-length-byte')
								 * 
								 * .text("byte"); $(
								 * '#msg-send-contact-private-content-textarea')
								 * .css('background-color', 'white'); //
								 * msg-send-contact-private-repeat-cnt-select //
								 * msg-send-contact-private-repeat-time-input $(
								 * '#msg-send-contact-private-reservation-date-input')
								 * .val(""); $(
								 * '#msg-send-contact-private-repeat-time-input')
								 * .val(""); $(
								 * '#msg-send-contact-private-user-resendInterval-input')
								 * .val("");
								 */
								/*
								 * var checkboxes = document
								 * .getElementsByName('contact-list-checkbox');
								 * for (var i = 0, n = checkboxes.length; i < n;
								 * i++) {
								 * 
								 * checkboxes[i].checked = false; }
								 */

								alert('메시지를 전송 하였습니다.');

							} else {
								$('#contact-send-before-i').show();
								$('#contact-send-after-i').hide();

								alert('메시지 전송에 실패 하였습니다.');

							}

						},
						error : function(data, textStatus, request) {
							if (data.status == 401) {
								$('#contact-send-before-i').show();
								$('#contact-send-after-i').hide();
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
							$('#contact-send-before-i').show();
							$('#contact-send-after-i').hide();

							alert('메시지 전송에 실패 하였습니다.');

						}
					});
				}
			},

			checkContactContentArea : function() {
				console.log('주소록 발송 내용 변d');
				var input_messageContent = $(
						'#msg-send-contact-private-content-textarea').val();
				input_messageContent = input_messageContent.trim();
				console.log(input_messageContent.Length());
				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-contact-private-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-contact-private-length-max').text("");
					$('#msg-send-contact-private-length-byte').text("MMS");
					$('#msg-send-contact-private-length-strong').text(
							strongLength);
				} else {
					$('#msg-send-contact-private-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-contact-private-length-max').text("140");
					$('#msg-send-contact-private-length-byte').text("byte");
					$('#msg-send-contact-private-length-strong').text(
							strongLength);
				}
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

			checkGroupContentArea : function() {
				var input_messageContent = $('#msg-send-group-content-textarea')
						.val();
				input_messageContent = input_messageContent.trim();
				console.log(input_messageContent.Length());
				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-group-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-group-length-max').text("");
					$('#msg-send-group-length-byte').text("MMS");
					$('#msg-send-group-length-strong').text(strongLength);
				} else {
					$('#msg-send-group-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-group-length-max').text("140");
					$('#msg-send-group-length-byte').text("byte");
					$('#msg-send-group-length-strong').text(strongLength);
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

				if (fleep_bunch_input.substring(0, 1) == "0"
						&& fleep_bunch_input.length > 1) {
					alert('fleep번호 또는 bunch번호 첫자리는 0을 입력할수 없습니다.');
					$('#send-private-fleep-bunch-input').focus();
					return false;
				}

				if (private_input.substring(0, 1) == "0"
						&& private_input.length > 1) {
					alert('개별번호 첫자리는 0을 입력할수 없습니다.');
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
				if (fleep_bunch_input.substring(0, 1) == "0"
						&& fleep_bunch_input.length > 1) {
					alert('fleep번호 또는 bunch번호 첫자리는 0을 입력할수 없습니다.');
					$('#contact-add-fleep-bunch-input').focus();
					return false;
				}

				if (private_input.substring(0, 1) == "0"
						&& private_input.length > 1) {
					alert('개별번호 첫자리는 0을 입력할수 없습니다.');
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

			plusGroupTopicCheck : function() {

				var ufmiVerCheck_radio = $(
						'input:radio[name="send-group-pnum-radio"]:checked')
						.val();
				var private_input = $('#send-group-input').val();
				var fleep_bunch_input = $('#send-group-fleep-bunch-input')
						.val();

				if (fleep_bunch_input == null || fleep_bunch_input == "") {
					alert('fleep번호 또는 bunch 번호 를 입력해주세요!');
					$('#send-group-fleep-bunch-input').focus();
					return false;
				}
				if (private_input == null || private_input == "") {
					alert('그룹 번호를 입력해주세요!');
					$('#send-group-input').focus();
					return false;
				}
				if (fleep_bunch_input.substring(0, 1) == "0"
						&& fleep_bunch_input.length > 1) {
					alert('fleep번호 또는 bunch번호 첫자리는 0을 입력할수 없습니다.');
					$('#send-group-fleep-bunch-input').focus();
					return false;
				}

				if (private_input.substring(0, 1) == "0"
						&& private_input.length > 1) {
					alert('그룹번호 첫자리는 0을 입력할수 없습니다.');
					$('#send-group-input').focus();
					return false;
				}

				var groupTopic = "";
				if (ufmiVerCheck_radio == "82") {
					groupTopic = "mms/P1/82/" + fleep_bunch_input + "/g"
							+ private_input;

				} else {
					groupTopic = "mms/P2/1/b" + fleep_bunch_input + "/g"
							+ private_input;
				}

				console.log('그룹 토픽 결과');
				console.log(groupTopic);

				var showInputVal = $('#msg-send-group-user-target-show-input')
						.val();
				if (showInputVal == "" || showInputVal == null) {
					$('#msg-send-group-user-target-show-div').show();

					$('#msg-send-group-user-target-show-input').val(
							showInputVal + groupTopic);
				} else {
					alert('한개의 그룹만 등록 가능합니다!');
					return false;
					// $('#msg-send-group-user-target-show-input').val(
					// showInputVal + "," + groupTopic);
				}
				$('#send-group-input').val("");

			},

			checkSendGroupInput : function() {
				console.log('asdf');
				var num_check = /^[0-9]*$/;
				var group_input = $("#send-group-input").val();
				var ufmiVerCheck_radio = $(
						'input:radio[name="send-group-pnum-radio"]:checked')
						.val();

				if (ufmiVerCheck_radio == "1") {
					$("#send-group-input").attr('maxlength', '4');
				} else {
					$("#send-group-input").attr('maxlength', '6');
				}

				if (!num_check.test(group_input)) {
					alert('숫자 만 입력 가능합니다!');
					$("#send-group-input").focus();
					return false;
				}

			},

			checkSendPrivateInput : function() {
				console.log('asdf');
				var num_check = /^[0-9]*$/;
				var private_input = $("#send-private-input").val();
				var ufmiVerCheck_radio = $(
						'input:radio[name="send-private-pnum-radio"]:checked')
						.val();

				if (ufmiVerCheck_radio == "1") {
					$("#send-private-input").attr('maxlength', '4');
				} else {
					$("#send-private-input").attr('maxlength', '6');
				}

				if (!num_check.test(private_input)) {
					alert('숫자 만 입력 가능합니다!');
					$("#send-private-input").focus();
					return false;
				}

			},
			checkSendGroupBunchInput : function() {
				console.log('fikfkfkf');
				var num_check = /^[0-9]*$/;
				// resend-fleep-bunch-input
				var group_fleep_bunch_input = $("#send-group-fleep-bunch-input")
						.val();
				var ufmiVerCheck_radio = $(
						'input:radio[name="send-group-pnum-radio"]:checked')
						.val();

				if (ufmiVerCheck_radio == "1") {
					$("#send-group-fleep-bunch-input").attr('maxlength', '4');
				} else {
					$("#send-group-fleep-bunch-input").attr('maxlength', '6');
				}
				if (!num_check.test(group_fleep_bunch_input)) {
					alert('숫자 만 입력 가능합니다!');
					$("#send-group-fleep-bunch-input").focus();
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
				} else {
					$("#send-private-fleep-bunch-input").attr('maxlength', '6');
				}
				if (!num_check.test(fleep_bunch_input)) {
					alert('숫자 만 입력 가능합니다!');
					$("#send-private-fleep-bunch-input").focus();
					return false;
				}

			},

			msgRepeatCheckContact : function() {
				var checkedLength = $('input[id="msg-send-contact-private-user-repeat-check"]:checked').length;
				if (checkedLength == 0) {
					// $("#messagelist-search-date-start-input").prop('disabled',
					// true);
					$('#msg-send-contact-private-repeat-div').hide();
					$('#msg-send-contact-private-repeat-cnt-select').val(0);
					$('#msg-send-contact-private-repeat-time-input').val("");

					return false;
				} else {
					$('#msg-send-contact-private-repeat-div').show();
					$('#msg-send-contact-private-repeat-time-input').prop(
							'disabled', false);

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

			msgGroupRepeatCheck : function() {
				var checkedLength = $('input[id="msg-send-group-user-repeat-check"]:checked').length;
				if (checkedLength == 0) {
					// $("#messagelist-search-date-start-input").prop('disabled',
					// true);
					$('#msg-send-group-repeat-div').hide();
					$('#msg-send-group-repeat-cnt-select').val(0);
					$('#msg-send-group-repeat-time-input').val("");

					return false;
				} else {
					$('#msg-send-group-repeat-div').show();
					$('#msg-send-group-repeat-time-input').prop('disabled',
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

									$('#contact-image-upload-input')
											.ace_file_input({
												no_file : 'No File ...',
												btn_choose : 'Choose',
												btn_change : 'Change',
												droppable : false,
												onchange : null,
												thumbnail : false,
												// | true | large
												// whitelist : 'gif|png|jpeg',
												// blacklist : 'exe|php|jpg',
												onchange : ''

											});
									$('#private-image-upload-input')
											.ace_file_input({
												no_file : 'No File ...',
												btn_choose : 'Choose',
												btn_change : 'Change',
												droppable : false,
												onchange : null,
												thumbnail : false,
												// | true | large
												// whitelist : 'gif|png|jpeg',
												// blacklist : 'exe|php|jpg',
												onchange : ''

											});
									$('#group-image-upload-input')
											.ace_file_input({
												no_file : 'No File ...',
												btn_choose : 'Choose',
												btn_change : 'Change',
												droppable : false,
												onchange : null,
												thumbnail : false,
												// | true | large
												// whitelist : 'gif|png|jpeg',
												// blacklist : 'exe|php|jpg',
												onchange : ''

											});
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

									$(
											'#msg-send-contact-private-reservation-div')
											.datetimepicker({
												format : "YYYY/MM/DD hh:mm a",
												minDate : today,
												maxDate : today_30
											});

									$('#msg-send-group-reservation-div')
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
																$(
																		"#msg-send-contact-private-content-load-select")
																		.append(
																				'<option value='
																						+ dataResult[i].templateId
																						+ '>'
																						+ dataResult[i].templateName
																						+ '</option>');

																$(
																		"#msg-send-group-content-load-select")
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
													// if (data.status == 401) {
													// alert("사용시간이 경과되어 자동 로그아웃
													// 됩니다.");
													// sessionStorage
													// .removeItem("token");
													// sessionStorage
													// .removeItem("userId");
													// sessionStorage
													// .removeItem("role");
													//
													// sessionStorage
													// .removeItem("groupTopic");
													// sessionStorage
													// .removeItem("ufmi");
													// sessionStorage
													// .removeItem("userName");
													// pushRouter
													// .navigate(
													// 'login',
													// {
													// trigger : true
													// });
													// return false;
													// }

												}
											});

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
															var hiddenUfmi = resultData[i].ufmi;
															resultData[i].ufmi = '<input name="contact-list-checkbox" type="checkbox" value="'
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
																		item4 : '<button type="button" name="editContactBtn"  data-target="#contact-edit-modal"  data-toggle="modal" class="btn btn-xs btn-white">수정하기</button>',
																		hiddenUfmi : hiddenUfmi
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

									contactTable = $('#contact-list-table')
											.dataTable({
												aaData : contactTableData,
												'bSort' : true,
												bJQueryUI : true,
												bDestroy : true,
												"bPaginate" : true,
												"pageLength" : 25,
												"bInfo" : true,
												"oLanguage" : {
													"oPaginate" : {
														"sFirst" : "처음",
														"sLast" : "끝",
														"sNext" : "다음",
														"sPrevious" : "이전"
													}
												},
												bScrollCollapse : true,
												"autoWidth" : false,
												scrollX : true,
												"bLengthChange" : true,
												// "dom" : 'T<"clear">lrftip',
												"columnDefs" : [ {
													"targets" : 0,
													"orderable" : false
												} ],
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
												}, {
													mData : 'hiddenUfmi',
													"visible" : false
												}

												]
											});
								}, 'html');
			}
		});
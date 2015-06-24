window.ADF = window.ADF || {};
ADF.PushMsgSendView = Backbone.View
		.extend({

			events : {
				"change #msg-send-private-user-repeat-check" : "msgRepeatCheck",
				"change input[name='send-check-radio']" : "checkRadioGroupPrivate",
				"change input[name='send-group-pnum-radio']" : "checkPtalkRadio",
				"change input[name='contact-check-radio']" : "checkRadioContactPrivate",
				"change input[name='contact-add-pnum-radio']" : "checkContactPtalkRadio",
				"change #msg-send-group-user-repeat-check" : "msgGroupRepeatCheck",
				"change #msg-send-contact-option-check" : "optionCheckContact",
				"change #msg-send-group-option-check" : "optionCheckGroup",
				"change #msg-send-contact-private-user-repeat-check" : "msgRepeatCheckContact",
				"input #send-private-input" : "checkSendPrivateInput",
				"input #send-group-input" : "checkSendGroupInput",
				"input #send-private-fleep-bunch-input" : "checkSendBunchInput",
				"input #send-group-fleep-bunch-input" : "checkSendGroupBunchInput",
				"input #contact-add-private-input" : "checkContactPrivateInput",
				"input #contact-add-fleep-bunch-input" : "checkContactBunchInput",
				"click #msg-send-private-plus-span" : "plusUfmiCheck",
				"click #msg-send-group-minus-span" : "groupMiunsClick",
				// "click #contact-add-plus-span" : "plusContactUfmiCheck",
				"click #msg-send-group-plus-span" : "plusGroupTopicCheck",
				"input #msg-send-private-content-textarea" : "checkContentArea",
				"input #msg-send-group-content-textarea" : "checkGroupContentArea",
				"input #msg-send-contact-private-content-textarea" : "checkContactContentArea",
				/*
				 * "input #msg-send-private-content-save-textarea" :
				 * "checkContentSaveArea",
				 */
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
				/* "click #msg-save-btn" : "msgSave", */
				/* "click #modal-footer-cancel" : "msgSaveCancel", */
				"change #msg-send-private-content-load-select" : "selectContentList",
				"change #msg-send-group-content-load-select" : "selectGroupContentList",
				"change #msg-send-contact-private-content-load-select" : "selectContactContentList",

				"click #msg-delete-btn" : "msgDelete",
				"click #contact-add-btn" : "contactAdd",
				"click #contact-add-footer-cancel" : "contactAddCancel",
				"click #contact-delete-id" : "contactAllCheckBox",
				"click #contact-delete-btn" : "contactDelete",
				"click a[name='editContactBtn']" : "editContactModal",
				"click a[name='name-contact-delete-a']" : "deleteContactIcon",
				"click #contact-edit-footer-cancel" : "cancelContactModal",
				"click #contact-edit-btn" : "editContactBtn",
				"click #msg-send-contact-change-name-btn" : "changeNameBtn",
				"click #msg-send-contact-change-item1-btn" : "changeItem1Btn",
				"click #msg-send-contact-change-item2-btn" : "changeItem2Btn",
				"click #msg-send-contact-change-item3-btn" : "changeItem3Btn",
				"click #msg-send-contact-private-btn" : "msgSendContact",
				"click #msg-send-excel-div" : "clickExcelSendDiv",
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
						"selectContentList", "checkContentEditArea",
						"msgDelete", "checkContactPrivateInput",
						"checkContactBunchInput", "contactAdd",
						"contactAddFormCheck", "contactAllCheckBox",
						"contactDelete", "cancelContactModal",
						"editContactBtn", "editContactBtnFormCheck",
						"checkContactContentArea", "changeNameBtn",
						"changeItem1Btn", "changeItem2Btn", "changeItem3Btn",
						"selectContactContentList", "msgRepeatCheckContact",
						"checkRepeatTimeContact", "msgSendCancelContact",
						"msgSendContactFormCheck", "msgSendContact",
						"clickExcelSendDiv", "clickContactSendDiv",
						"clickGroupSendDiv", "msgSaveContactBtnClick",
						"checkSendGroupInput", "checkSendGroupBunchInput",
						"plusGroupTopicCheck", "checkGroupContentArea",
						"msgSaveGroupBtnClick", "selectGroupContentList",
						"msgGroupRepeatCheck", "msgGroupSendCancel",
						"msgSendGroup", "msgSendGroupFormCheck", "changeFile",
						"optionCheckContact", "optionCheckGroup",
						"checkRadioGroupPrivate", "checkPtalkRadio",
						"checkRadioContactPrivate", "checkContactPtalkRadio",
						"deleteContactIcon", "groupMiunsClick");
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
				var userId = sessionStorage.getItem('easy-userId');
				$('#user-id-span').text(userId);
			},
			afterRender : function() {
				console.log('after render..');
				// contentListView.render();

			},

			groupMiunsClick : function() {
				console.log('마이너스 클릭');
				// var deleteList = $('#msg-send-group-user-target-show-input')
				// .val();
				// if (deleteList != null && deleteList != "") {
				//
				// if (deleteList.lastIndexOf(',') > -1) {
				// var lastIndex = deleteList.lastIndexOf(',');
				// console.log(deleteList);
				// console.log(deleteList.length);
				// deleteList = deleteList.substring(0, lastIndex);
				// $('#msg-send-group-user-target-show-input').val(
				// deleteList);
				// } else {
				// $('#msg-send-group-user-target-show-input').val("");
				//
				// }
				//
				// }

				$("#msg-send-group-user-target-select option:last").remove();

			},
			checkRadioContactPrivate : function() {

				var privateGroupCheck = $(
						'input:radio[name="contact-check-radio"]:checked')
						.val();
				var p1p2Radio = $(
						'input:radio[name="contact-add-pnum-radio"]:checked')
						.val();

				// 개인
				if (privateGroupCheck == 0) {

					// p1
					if (p1p2Radio == "82") {
						$('#contact-fleet-label').text('fleet 번호');
						$('#contact-fleet-span').text('무전번호의 fleet번호를 입력해주세요!');
						$('#contact-private-label').text('개별 번호');
						$('#contact-private-span').text('무전번호의 개별 ID를 입력해주세요!');
					} else {
						$('#contact-fleet-label').text('국번');
						$('#contact-fleet-span').text('무전번호의 국번을 입력해주세요!');
						$('#contact-private-label').text('개별 번호');
						$('#contact-private-span').text('무전번호의 개별 ID를 입력해주세요!');
					}

					// 그룹
				} else {
					// p1
					if (p1p2Radio == "82") {
						$('#contact-fleet-label').text('fleet 번호');
						$('#contact-fleet-span').text('무전번호의 fleet번호를 입력해주세요!');
						$('#contact-private-label').text('그룹 번호');
						$('#contact-private-span').text('무전번호의 그룹번호를 입력해주세요!');
						// p2
					} else {
						$('#contact-fleet-label').text('번치 ID');
						$('#contact-fleet-span').text('번치 ID를  입력해주세요!');
						$('#contact-private-label').text('그룹 번호');
						$('#contact-private-span').text('무전번호의 그룹번호를 입력해주세요!');
					}

				}

			},

			checkContactPtalkRadio : function() {
				var privateGroupCheck = $(
						'input:radio[name="contact-check-radio"]:checked')
						.val();
				var p1p2Radio = $(
						'input:radio[name="contact-add-pnum-radio"]:checked')
						.val();

				// 개인
				if (privateGroupCheck == 0) {

					// p1
					if (p1p2Radio == "82") {
						$('#contact-fleet-label').text('fleet 번호');
						$('#contact-fleet-span').text('무전번호의 fleet번호를 입력해주세요!');
						$('#contact-private-label').text('개별 번호');
						$('#contact-private-span').text('무전번호의 개별 ID를 입력해주세요!');
					} else {
						$('#contact-fleet-label').text('국번');
						$('#contact-fleet-span').text('무전번호의 국번을 입력해주세요!');
						$('#contact-private-label').text('개별 번호');
						$('#contact-private-span').text('무전번호의 개별 ID를 입력해주세요!');
					}

					// 그룹
				} else {
					// p1
					if (p1p2Radio == "82") {
						$('#contact-fleet-label').text('fleet 번호');
						$('#contact-fleet-span').text('무전번호의 fleet번호를 입력해주세요!');
						$('#contact-private-label').text('그룹 번호');
						$('#contact-private-span').text('무전번호의 그룹번호를 입력해주세요!');
						// p2
					} else {
						$('#contact-fleet-label').text('번치 ID');
						$('#contact-fleet-span').text('번치 ID를  입력해주세요!');
						$('#contact-private-label').text('그룹 번호');
						$('#contact-private-span').text('무전번호의 그룹번호를 입력해주세요!');
					}

				}

			},

			checkPtalkRadio : function() {
				console.log('피톡 버전');
				var privateGroupCheck = $(
						'input:radio[name="send-check-radio"]:checked').val();
				var p1p2Radio = $(
						'input:radio[name="send-group-pnum-radio"]:checked')
						.val();

				// 개인
				if (privateGroupCheck == 0) {

					// p1
					if (p1p2Radio == "82") {
						$('#group-fleet-label').text('fleet 번호');
						$('#group-fleet-span').text('무전번호의 fleet번호를 입력해주세요!');
						$('#group-private-label').text('개별 번호');
						$('#group-private-span').text('무전번호의 개별 ID를 입력해주세요!');
					} else {
						$('#group-fleet-label').text('국번');
						$('#group-fleet-span').text('무전번호의 국번을 입력해주세요!');
						$('#group-private-label').text('개별 번호');
						$('#group-private-span').text('무전번호의 개별 ID를 입력해주세요!');
					}

					// 그룹
				} else {
					// p1
					if (p1p2Radio == "82") {
						$('#group-fleet-label').text('fleet 번호');
						$('#group-fleet-span').text('무전번호의 fleet번호를 입력해주세요!');
						$('#group-private-label').text('그룹 번호');
						$('#group-private-span').text('무전번호의 그룹번호를 입력해주세요!');
						// p2
					} else {
						$('#group-fleet-label').text('번치 ID');
						$('#group-fleet-span').text('번치 ID를  입력해주세요!');
						$('#group-private-label').text('그룹 번호');
						$('#group-private-span').text('무전번호의 그룹번호를 입력해주세요!');
					}

				}
			},

			checkRadioGroupPrivate : function() {
				console.log('그룹');
				var privateGroupCheck = $(
						'input:radio[name="send-check-radio"]:checked').val();
				var p1p2Radio = $(
						'input:radio[name="send-group-pnum-radio"]:checked')
						.val();
				console.log(p1p2Radio);

				// 개인
				if (privateGroupCheck == 0) {

					// p1
					if (p1p2Radio == "82") {
						$('#group-fleet-label').text('fleet 번호');
						$('#group-fleet-span').text('무전번호의 fleet번호를 입력해주세요!');
						$('#group-private-label').text('개별 번호');
						$('#group-private-span').text('무전번호의 개별 ID를 입력해주세요!');
					} else {
						$('#group-fleet-label').text('국번');
						$('#group-fleet-span').text('무전번호의 국번을 입력해주세요!');
						$('#group-private-label').text('개별 번호');
						$('#group-private-span').text('무전번호의 개별 ID를 입력해주세요!');
					}

					// 그룹
				} else {
					// p1
					if (p1p2Radio == "82") {
						console.log('이상함');
						$('#group-fleet-label').text('fleet 번호');
						$('#group-fleet-span').text('무전번호의 fleet번호를 입력해주세요!');
						$('#group-private-label').text('그룹 번호');
						$('#group-private-span').text('무전번호의 그룹번호를 입력해주세요!');
						// p2
					} else {
						$('#group-fleet-label').text('번치 ID');
						$('#group-fleet-span').text('번치 ID를  입력해주세요!');
						$('#group-private-label').text('그룹 번호');
						$('#group-private-span').text('무전번호의 그룹번호를 입력해주세요!');
					}

				}

			},

			optionCheckContact : function() {

				var checkedLength = $('input[id="msg-send-contact-option-check"]:checked').length;
				if (checkedLength == 0) {
					$('#option-i').addClass('fa-caret-right');
					$('#option-i').removeClass('fa-caret-down');
					$('#contact-option-div').hide();
					return false;
				} else {
					$('#option-i').addClass('fa-caret-down');
					$('#option-i').removeClass('fa-caret-right');
					$('#contact-option-div').show();
					return false;
				}
			},

			optionCheckGroup : function() {

				var checkedLength = $('input[id="msg-send-group-option-check"]:checked').length;
				if (checkedLength == 0) {
					$('#option-group-i').addClass('fa-caret-right');
					$('#option-group-i').removeClass('fa-caret-down');
					$('#group-option-div').hide();

					return false;
				} else {
					$('#option-group-i').addClass('fa-caret-down');
					$('#option-group-i').removeClass('fa-caret-right');
					$('#group-option-div').show();
					return false;
				}
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
						$('#file-thumbnail').val("");
						// $('#file-thumbnail')
						// .val(
						// '
						// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA6klEQVRYR+2W0Q3CMAxErxuwCWwAbASTwEbABmUTRkBGDWrBTs9xkJCafFXtNe/Vqhx34NcVwJaM3wDsmGzHhIZME2gVaBVoFVhGBc4A1kZ33ABYkZ3zAaA3sncAh/TssxULQEptSZB8MyZwOSNE8LW0s+BXEl9wS0Du15ZQ4TmBmhImfE6ghkQWzghEJGbhrECJBAX3CHgkaLhXgJFwwUsEchJueKmAJlEEjwiMJeR60l49/dozlmv7psPp3ds98GgFvCw1H61AWOKvBGTgOIU/idvgmAaWcQXkT75w74dT+2HwmQwkyxR4AlZFRiG75B1tAAAAAElFTkSuQmCC');
						//
						// continue;

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

			clickExcelSendDiv : function() {
				console.log('엑셀발송 클릭');
				$('#contact-list-div').fadeOut();
				// $('#excel-list-div')
				$('#send-list-div').fadeOut();
				$("#tab-div").removeClass('col-lg-8');
				$("#tab-div").addClass('col-lg-4');
				// $("#tab-div").removeClass('col-lg-4');
				// $("#tab-div").addClass('col-lg-8');
			},

			clickContactSendDiv : function() {
				console.log('주소록 발송 클릭');
				$('#contact-list-div').fadeIn();
				$('#send-list-div').fadeOut();
				$("#tab-div").removeClass('col-lg-8');
				$("#tab-div").addClass('col-lg-4');
			},

			clickGroupSendDiv : function() {
				console.log('직접 발송 클릭');
				$('#contact-list-div').fadeOut();
				$('#send-list-div').fadeIn();
				$("#tab-div").removeClass('col-lg-8');
				$("#tab-div").addClass('col-lg-4');
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
					var token = sessionStorage.getItem('easy-token');
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

			deleteContactIcon : function(e) {
				var aData = contactTable.fnGetData($(e.target).parents('tr'));
				console.log(aData);
				var token = sessionStorage.getItem("easy-token");
				var contactDelete = new Object();
				contactDelete.ufmiArray = new Array();
				contactDelete.ufmiArray.push(aData.hiddenUfmi);

				contactDelete = JSON.stringify(contactDelete);

				if (confirm("해당 주소록을 삭제 하시겠습니까?") == true) {

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

								alert("삭제 하였습니다.");
								window.location.reload();

							} else {
								alert("목록 삭제에 실패하였습니다.");

							}

						},
						error : function(data, textStatus, request) {
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
							alert("목록 삭제에 실패하였습니다.");

						}
					});

				} else {
					return false;
				}

			},

			contactDelete : function() {

				// var that = this;
				// var checkedLength =
				// $('input[name="contact-list-checkbox"]:checked').length;
				// var token = sessionStorage.getItem("easy-token");
				// if (checkedLength == 0) {
				// alert('삭제할 대상을 선택해주세요');
				// return false;
				// } else {
				// var contactDelete = new Object();
				// contactDelete.ufmiArray = new Array();
				// $('input[name="contact-list-checkbox"]:checked').each(
				// function() {
				//
				// if (this.value != "on") {
				//
				// contactDelete.ufmiArray.push(this.value);
				// }
				// });
				//
				// if (contactDelete.ufmiArray.length == 0) {
				// alert('삭제할 대상이 없습니다.');
				// return false;
				// }
				// contactDelete = JSON.stringify(contactDelete);
				//
				// if (confirm("선택된 목록을 삭제 하시겠습니까?") == true) {
				//
				// $.ajax({
				// url : '/v1/pms/adm/svc/address/delete',
				// type : 'POST',
				// headers : {
				// 'X-Application-Token' : token
				// },
				// contentType : "application/json",
				// dataType : 'json',
				// async : false,
				// data : contactDelete,
				//
				// success : function(data) {
				//
				// if (!data.result.errors) {
				//
				// var dataResult = data.result.data;
				// alert(dataResult + "개의 목록을 삭제 하였습니다.");
				// window.location.reload();
				//
				// } else {
				// alert("목록 삭제에 실패하였습니다.");
				//
				// }
				//
				// },
				// error : function(data, textStatus, request) {
				// if (data.status == 401) {
				// alert("사용시간이 경과되어 자동 로그아웃 됩니다.");
				// sessionStorage.removeItem("easy-token");
				// sessionStorage.removeItem("easy-userId");
				// sessionStorage.removeItem("easy-role");
				//
				// sessionStorage
				// .removeItem("easy-groupTopic");
				// sessionStorage.removeItem("easy-ufmi");
				// sessionStorage.removeItem("easy-userName");
				// pushRouter.navigate('login', {
				// trigger : true
				// });
				// return false;
				// }
				// alert("목록 삭제에 실패하였습니다.");
				//
				// }
				// });
				//
				// } else {
				// return false;
				// }
				//
				// }

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
				var contactCheck_radio = $(
						'input:radio[name="contact-check-radio"]:checked')
						.val();
				var contactUserName = $('#contact-add-user-name-input').val();
				var ufmiVerCheck_radio = $(
						'input:radio[name="contact-add-pnum-radio"]:checked')
						.val();
				var private_input = $('#contact-add-private-input').val();
				var fleep_bunch_input = $('#contact-add-fleep-bunch-input')
						.val();

				if (contactUserName == null || contactUserName == "") {
					alert('이름을 입력해 주세요!');
					$('#contact-add-user-name-input').focus();
					return false;
				}

				if (fleep_bunch_input == null || fleep_bunch_input == "") {
					alert('번호 를 입력해주세요!');
					$('#contact-add-fleep-bunch-input').focus();
					return false;
				}
				if (private_input == null || private_input == "") {
					alert('번호를 입력해주세요!');
					$('#contact-add-private-input').focus();
					return false;
				}
				if (fleep_bunch_input.substring(0, 1) == "0"
						&& fleep_bunch_input.length > 1) {
					alert('번호 첫자리는 0을 입력할수 없습니다.');
					$('#contact-add-fleep-bunch-input').focus();
					return false;
				}

				if (private_input.substring(0, 1) == "0"
						&& private_input.length > 1) {
					alert('번호 첫자리는 0을 입력할수 없습니다.');
					$('#contact-add-private-input').focus();
					return false;
				}
				return true;
			},

			contactAdd : function() {
				console.log('주소록 등록 버튼 크릭');
				var checkTopic = true;
				if (this.contactAddFormCheck()) {
					var contactCheck_radio = $(
							'input:radio[name="contact-check-radio"]:checked')
							.val();

					var ufmiVerCheck_radio = $(
							'input:radio[name="contact-add-pnum-radio"]:checked')
							.val();
					var private_input = $('#contact-add-private-input').val();
					var fleep_bunch_input = $('#contact-add-fleep-bunch-input')
							.val();
					var ufmiResult = "";
					if (contactCheck_radio == 0) {
						ufmiResult = ufmiVerCheck_radio + "*"
								+ fleep_bunch_input + "*" + private_input;
					} else {
						// 그룹 체크

						if (ufmiVerCheck_radio == "82") {
							ufmiResult = "mms/P1/82/" + fleep_bunch_input
									+ "/g" + private_input;

						} else {
							ufmiResult = "mms/P2/1/b" + fleep_bunch_input
									+ "/g" + private_input;
						}

						var token = sessionStorage.getItem('easy-token');
						$.ajax({
							url : '/v1/pms/adm/svc/subscribe/count?topic='
									+ ufmiResult,
							type : 'GET',
							headers : {
								'X-Application-Token' : token
							},
							contentType : "application/json",
							dataType : 'json',
							async : false,

							success : function(data) {

								if (!data.result.errors) {
									// // groupTopicCount add
									// console.log(data.result.data);
									// groupTopicCount = groupTopicCount
									// + data.result.data;
									if (data.result.data == 0) {
										checkTopic = false;
										alert("입력하신 번호는 수신자가 없는 그룹입니다!");
									}

								} else {
									/* console.log(messageData.receivers[i]); */
									console.log('alert');
									checkTopic = false;
									alert("입력하신 번호는 수신자가 없는 그룹입니다!");

									// return false;
									// $(
									// '#msg-send-group-user-target-show-input')
									// .val("");
									//
									// alert('해당 그룹에 수신자가 없습니다. 다른
									// 그룹을 입력해 주세요!');
									// return false;
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

								alert('그룹 대상조회에 실패 했습니다!');
								return false;
							}
						});

					}

					if (checkTopic == true) {

						var token = sessionStorage.getItem('easy-token');
						var contactUfmi = ufmiResult;
						var contactName = $('#contact-add-user-name-input')
								.val();
						var contactItem1 = $('#contact-add-user-item1-input')
								.val();
						var contactItem2 = $('#contact-add-user-item2-input')
								.val();
						var contactItem3 = $('#contact-add-user-item3-input')
								.val();

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
										error : function(data, textStatus,
												request) {
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
					var token = sessionStorage.getItem('easy-token');
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

						}
					});

				}

			},

			selectContactContentList : function() {
				console.log('change select ');
				var contentSelect = $(
						'#msg-send-contact-private-content-load-select').val();
				console.log(contentSelect);
				var contentMsg = contentSelect;
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
				var contentMsg = contentSelect;
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
				var contentMsg = contentSelect;
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
				var userName = sessionStorage.getItem('easy-userName');
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

						dateResult = pushUtil
								.dateFormatingRes(input_reservation);
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
					var token = sessionStorage.getItem("easy-token");

					var sendCount = 0;
					// /file attache
					var fileName = document
							.getElementById("private-image-upload-input").value;
					var fileData = document
							.getElementById("private-image-upload-input").files[0];

					var userId = sessionStorage.getItem("easy-userId");
					if (fileName != null && fileData != null) {

						var fileFormat = fileName.substr(fileName
								.lastIndexOf('.') + 1);
						var replaceImageText = fileName.replace(/^.*\\/, "");
						console.log(fileFormat);
						var md5 = $('#file-md5').val();
						replaceImageText = encodeURIComponent(replaceImageText);
						messageData.mms = true;
						messageData.fileName = md5;
						messageData.fileFormat = fileFormat;

						// head check
						var xhrHeadReq = new XMLHttpRequest();
						xhrHeadReq.open("HEAD", "/cts/v1/users/" + userId,
								false);
						xhrHeadReq.setRequestHeader("md5", md5);
						xhrHeadReq.setRequestHeader("token", token);
						xhrHeadReq.setRequestHeader("file", replaceImageText);
						xhrHeadReq.send();

						if (xhrHeadReq.status == 404) {
							console.log(xhrHeadReq.status);

							var formdata = new FormData();
							formdata.append("fileData", fileData);
							var xhrFileReq = new XMLHttpRequest();
							xhrFileReq.open("POST", "/cts/v1/users/" + userId,
									false);
							xhrFileReq.setRequestHeader("md5", md5);
							xhrFileReq.setRequestHeader("token", token);
							xhrFileReq.setRequestHeader("file",
									replaceImageText);
							xhrFileReq.send(formdata);
							if (xhrFileReq.status == 200) {
								console.log('파일 전송 성공');

								console.log(xhrFileReq.status);

							} else {
								console.log(xhrFileReq.status);

								alert('첨부 파일 전송에 실패 하였습니다!');
								return false;
							}
						} else if (xhrHeadReq.status == 409) {

							console.log(xhrHeadReq.status);
							console.log('파일이 존재함');
						} else {

							console.log(xhrHeadReq.status);

							alert('첨부 파일 전송에 실패 하였습니다!');
							return false;
						}

						// 이미지 파일일 경우 thumbnail 전송
						if (fileFormat == "jpg" || fileFormat == "jpeg"
								|| fileFormat == "png") {

							var xhrHeadThumReq = new XMLHttpRequest();
							xhrHeadThumReq.open("HEAD", "/cts/v1/users/"
									+ userId + "/thumb", false);
							xhrHeadThumReq.setRequestHeader("md5", md5);
							xhrHeadThumReq.setRequestHeader("token", token);
							xhrHeadThumReq.setRequestHeader("file", ".png");
							xhrHeadThumReq.send();
							if (xhrHeadThumReq.status == 404) {
								console.log(xhrHeadThumReq.status);
								var thumbNail = $('#file-thumbnail').val();
								console.log('썸네일');
								console.log(thumbNail);
								if (thumbNail == null || thumbNail == "") {

									alert('첨부 파일 전송에 실패 하였습니다!');
									return false;
								}
								thumbNail = pushUtil.dataURItoBlob(thumbNail);
								var formDataThumb = new FormData();
								formDataThumb.append("fileData", thumbNail);
								var xhrFileThumReq = new XMLHttpRequest();
								xhrFileThumReq.open("POST", "/cts/v1/users/"
										+ userId + "/thumb", false);
								xhrFileThumReq.setRequestHeader("md5", md5);
								xhrFileThumReq.setRequestHeader("token", token);
								xhrFileThumReq.setRequestHeader("file", ".png");
								xhrFileThumReq.send(formDataThumb);
								if (xhrFileThumReq.status == 200) {
									console.log('썸 파일 전송 성공');
									console.log(xhrFileThumReq.status);

								} else {
									console.log(xhrFileThumReq.status);

									alert('첨부 파일 전송에 실패 하였습니다!');
									return false;
								}
							} else if (xhrHeadThumReq.status == 409) {
								console.log(xhrHeadThumReq.status);
								console.log('파일이 존재함');
							} else {
								console.log(xhrHeadThumReq.status);

								alert('첨부 파일 전송에 실패 하였습니다!');
								return false;
							}

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

					if (sendCount == 0) {
						alert('수신 대상자가 없습니다!');
						return false;

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

								alert('메시지를 전송 하였습니다.');

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

								sessionStorage.removeItem("easy-groupTopic");
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

				}

			},

			msgSendGroup : function() {
				var userName = sessionStorage.getItem('easy-userName');
				var token = sessionStorage.getItem("easy-token");
				if (userName == null || userName == "" || userName == "null") {
					alert('발송번호를 등록해야 정상 사용이 가능합니다.!');
					pushRouter.navigate('user_info', {
						trigger : true
					});
					return false;
				}
				if (this.msgSendGroupFormCheck()) {

					// var messageTarget = $(
					// '#msg-send-group-user-target-show-input').val();
					// console.log(messageTarget);
					// messageTarget = pushUtil.compactTrim(messageTarget);
					var messageTarget = [];
					$("#msg-send-group-user-target-select option").each(
							function() {
								messageTarget.push($(this).val());
								// Add $(this).val() to your list
							});
					console.log('전송대상 타겟');
					console.log(messageTarget);

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

						dateResult = pushUtil
								.dateFormatingRes(input_reservation);
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

					var userId = sessionStorage.getItem("easy-userId");
					if (fileName != null && fileData != null) {
						$('#fileprogress').show();
						if (confirm('첨부된 파일이 있습니다 파일을 업로드 하시겠습니까?') == true) {

							var fileFormat = fileName.substr(fileName
									.lastIndexOf('.') + 1);
							var replaceImageText = fileName
									.replace(/^.*\\/, "");
							console.log(fileFormat);
							var md5 = $('#file-md5').val();
							replaceImageText = encodeURIComponent(replaceImageText);

							// head check
							var xhrHeadReq = new XMLHttpRequest();
							xhrHeadReq.open("HEAD", "/cts/v1/users/" + userId,
									false);
							xhrHeadReq.setRequestHeader("md5", md5);
							xhrHeadReq.setRequestHeader("token", token);
							xhrHeadReq.setRequestHeader("file",
									replaceImageText);
							xhrHeadReq.send();
							messageData.mms = true;
							messageData.fileName = md5;
							messageData.fileFormat = fileFormat;
							if (xhrHeadReq.status == 404) {
								console.log(xhrHeadReq.status);

								var formdata = new FormData();
								formdata.append("fileData", fileData);
								var xhrFileReq = new XMLHttpRequest();
								xhrFileReq.open("POST", "/cts/v1/users/"
										+ userId, false);
								xhrFileReq.setRequestHeader("md5", md5);
								xhrFileReq.setRequestHeader("token", token);
								xhrFileReq.setRequestHeader("file",
										replaceImageText);
								xhrFileReq.send(formdata);
								if (xhrFileReq.status == 200) {

									console.log('파일 전송 성공');
									console.log(xhrFileReq.status);

								} else {

									console.log(xhrFileReq.status);

									alert('첨부 파일 전송에 실패 하였습니다!');
									return false;
								}
							} else if (xhrHeadReq.status == 409) {

								console.log(xhrHeadReq.status);
								console.log('파일이 존재함');
							} else {

								console.log(xhrHeadReq.status);

								alert('첨부 파일 전송에 실패 하였습니다!');
								return false;
							}

							// 이미지 파일일 경우 thumbnail 전송
							if (fileFormat == "jpg" || fileFormat == "jpeg"
									|| fileFormat == "png") {
								var xhrHeadThumReq = new XMLHttpRequest();
								xhrHeadThumReq.open("HEAD", "/cts/v1/users/"
										+ userId + "/thumb", false);
								xhrHeadThumReq.setRequestHeader("md5", md5);
								xhrHeadThumReq.setRequestHeader("token", token);
								xhrHeadThumReq.setRequestHeader("file", ".png");
								xhrHeadThumReq.send();
								if (xhrHeadThumReq.status == 404) {
									console.log(xhrHeadThumReq.status);
									var thumbNail = $('#file-thumbnail').val();
									console.log('썸네일');
									console.log(thumbNail);
									if (thumbNail == null || thumbNail == "") {

										alert('첨부 파일 전송에 실패 하였습니다!');
										return false;
									}
									thumbNail = pushUtil
											.dataURItoBlob(thumbNail);
									var formDataThumb = new FormData();
									formDataThumb.append("fileData", thumbNail);
									var xhrFileThumReq = new XMLHttpRequest();
									xhrFileThumReq.open("POST",
											"/cts/v1/users/" + userId
													+ "/thumb", false);
									xhrFileThumReq.setRequestHeader("md5", md5);
									xhrFileThumReq.setRequestHeader("token",
											token);
									xhrFileThumReq.setRequestHeader("file",
											".png");
									xhrFileThumReq.send(formDataThumb);
									if (xhrFileThumReq.status == 200) {
										console.log('썸 파일 전송 성공');
										console.log(xhrFileThumReq.status);

									} else {
										console.log(xhrFileThumReq.status);

										alert('첨부 파일 전송에 실패 하였습니다!');
										return false;
									}
								} else if (xhrHeadThumReq.status == 409) {
									console.log(xhrHeadThumReq.status);
									console.log('파일이 존재함');
								} else {
									console.log(xhrHeadThumReq.status);

									alert('첨부 파일 전송에 실패 하였습니다!');
									return false;
								}

							}
						} else {
							$('#fileprogress').hide();
							$('.remove').click();
						}

					}

					// /file end

					var groupTopicCount = 0;
					var privateUfmi = 0;
					// 그룹 인원체크

					for ( var i in messageData.receivers) {

						if (messageData.receivers[i].indexOf("mms") > -1) {
							// 그룹 대상
							console.log('포문');
							console.log(messageData.receivers[i]);
							$
									.ajax({
										url : '/v1/pms/adm/svc/subscribe/count?topic='
												+ messageData.receivers[i],
										type : 'GET',
										headers : {
											'X-Application-Token' : token
										},
										contentType : "application/json",
										dataType : 'json',
										async : false,

										success : function(data) {

											if (!data.result.errors) {
												// groupTopicCount add
												console.log(data.result.data);
												groupTopicCount = groupTopicCount
														+ data.result.data;

											}

										},
										error : function(data, textStatus,
												request) {
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
												pushRouter.navigate('login', {
													trigger : true
												});
												return false;
											}

											alert('그룹 대상조회에 실패 했습니다!');
											return false;
										}
									});

							if (groupTopicCount == 0) {
								// return false;
							}

						} else {
							privateUfmi++;
						}
					}

					var messageDataResult = JSON.stringify(messageData);
					console.log('메시시 발송 데이터');
					console.log(messageDataResult);
					var sendCount = groupTopicCount + privateUfmi;
					var fileName = document
							.getElementById("group-image-upload-input").value;
					var fileData = document
							.getElementById("group-image-upload-input").files[0];
					var replaceImageText = fileName.replace(/^.*\\/, "");

					if (messageData.resendMaxCount) {
						console.log('반복 있음');

						sendCount = sendCount * 1;
						messageData.resendMaxCount = messageData.resendMaxCount * 1;
						sendCount = (sendCount * messageData.resendMaxCount)
								+ sendCount;
						groupTopicCount = (groupTopicCount * messageData.resendMaxCount)
								+ groupTopicCount;
					} else {

					}

					// 인원체크

					if (sendCount == 0) {
						alert('수신 대상자가 없습니다!');
						return false;

					}
					if (messageData.reservationTime) {
						if (confirm("총 " + sendCount + "건(그룹 수신자:"
								+ groupTopicCount
								+ ")의 메시지가 예약전송 됩니다. 전송 하시겠습니까?") == true) {
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
							$('#msg-send-group-user-target-select').html('');

						} else {

							return false;
						}
					} else {
						if (confirm(" 총 " + sendCount + "건(그룹 수신자:"
								+ groupTopicCount
								+ ")의 메시지가 전송 됩니다. 전송 하시겠습니까?") == true) {
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
							$('#msg-send-group-user-target-select').html('');
						} else {

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

								alert('메시지를 전송 하였습니다.');

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

								sessionStorage.removeItem("easy-groupTopic");
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

				}

			},

			msgSendGroupFormCheck : function() {

				// messageTarget = pushUtil.compactTrim(messageTarget);
				var messageContent = $('#msg-send-group-content-textarea')
						.val();
				var input_reservation = $(
						'#msg-send-group-reservation-date-input').val();
				var messageTargetSize = $(
						'#msg-send-group-user-target-select option').size();
				if (messageTargetSize == 0) {
					alert("+ 버튼을 눌러 번호를 추가해 주세요!");
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

						convertDate = pushUtil.dateFormatingRes(convertDate);
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

						convertDate = pushUtil.dateFormatingRes(convertDate);
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

						convertDate = pushUtil.dateFormatingRes(convertDate);
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
				var userName = sessionStorage.getItem('easy-userName');

				if (userName == null || userName == "" || userName == "null") {
					alert('발송번호를 등록해야 정상 사용이 가능합니다.!');
					pushRouter.navigate('user_info', {
						trigger : true
					});
					return false;
				}
				var messageData = new Object();
				var token = sessionStorage.getItem('easy-token');
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
					dateResult = pushUtil.dateFormatingRes(input_reservation);
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
												// mmsCount++;

											} else {
												// smsCount++;
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

					var repeatCount = 0;

					// /file attache
					var fileName = document
							.getElementById("contact-image-upload-input").value;

					var fileData = document
							.getElementById("contact-image-upload-input").files[0];

					var userId = sessionStorage.getItem("easy-userId");
					if (fileName != null && fileData != null) {
						$('#fileprogress').show();
						if (confirm('첨부된 파일이 있습니다 파일을 업로드 하시겠습니까?') == true) {

							mmsCount = mmsCount + smsCount;
							smsCount = 0;

							var fileFormat = fileName.substr(fileName
									.lastIndexOf('.') + 1);
							var replaceImageText = fileName
									.replace(/^.*\\/, "");
							console.log(fileFormat);
							var md5 = $('#file-md5').val();
							replaceImageText = encodeURIComponent(replaceImageText);
							messageData.mms = true;
							messageData.fileName = md5;
							messageData.fileFormat = fileFormat;

							// /

							// head check
							var xhrHeadReq = new XMLHttpRequest();
							xhrHeadReq.open("HEAD", "/cts/v1/users/" + userId,
									false);
							xhrHeadReq.setRequestHeader("md5", md5);
							xhrHeadReq.setRequestHeader("token", token);
							xhrHeadReq.setRequestHeader("file",
									replaceImageText);
							xhrHeadReq.send();

							if (xhrHeadReq.status == 404) {

								console.log('test');

								console.log(xhrHeadReq.status);
								var formdata = new FormData();
								formdata.append("fileData", fileData);
								var xhrFileReq = new XMLHttpRequest();
								xhrFileReq.open("POST", "/cts/v1/users/"
										+ userId, false);
								xhrFileReq.setRequestHeader("md5", md5);
								xhrFileReq.setRequestHeader("token", token);
								xhrFileReq.setRequestHeader("file",
										replaceImageText);
								xhrFileReq.send(formdata);
								if (xhrFileReq.status == 200) {
									$('#fileprogress').hide();

									console.log('파일 전송 성공');
									console.log(xhrFileReq.status);

								} else {
									$('#fileprogress').hide();

									console.log(xhrFileReq.status);

									alert('첨부 파일 전송에 실패 하였습니다!');
									return false;
								}
							} else if (xhrHeadReq.status == 409) {
								$('#fileprogress').hide();

								console.log(xhrHeadReq.status);
								console.log('파일이 존재함');
							} else {
								$('#fileprogress').hide();

								console.log(xhrHeadReq.status);

								alert('첨부 파일 전송에 실패 하였습니다!');
								return false;
							}

							// 이미지 파일일 경우 thumbnail 전송
							if (fileFormat == "jpg" || fileFormat == "jpeg"
									|| fileFormat == "png") {
								var xhrHeadThumReq = new XMLHttpRequest();
								xhrHeadThumReq.open("HEAD", "/cts/v1/users/"
										+ userId + "/thumb", false);
								xhrHeadThumReq.setRequestHeader("md5", md5);
								xhrHeadThumReq.setRequestHeader("token", token);
								xhrHeadThumReq.setRequestHeader("file", ".png");
								xhrHeadThumReq.send();
								if (xhrHeadThumReq.status == 404) {
									console.log(xhrHeadThumReq.status);
									var thumbNail = $('#file-thumbnail').val();
									console.log('썸네일');
									console.log(thumbNail);
									if (thumbNail == null || thumbNail == "") {
										$('#fileprogress').hide();
										alert('첨부 파일 전송에 실패 하였습니다!');
										return false;
									}
									thumbNail = pushUtil
											.dataURItoBlob(thumbNail);
									var formDataThumb = new FormData();
									formDataThumb.append("fileData", thumbNail);
									var xhrFileThumReq = new XMLHttpRequest();
									xhrFileThumReq.open("POST",
											"/cts/v1/users/" + userId
													+ "/thumb", false);
									xhrFileThumReq.setRequestHeader("md5", md5);
									xhrFileThumReq.setRequestHeader("token",
											token);
									xhrFileThumReq.setRequestHeader("file",
											".png");
									xhrFileThumReq.send(formDataThumb);
									if (xhrFileThumReq.status == 200) {

										console.log('썸 파일 전송 성공');
										console.log(xhrFileThumReq.status);

									} else {

										console.log(xhrFileThumReq.status);

										alert('첨부 파일 전송에 실패 하였습니다!');
										return false;
									}
								} else if (xhrHeadThumReq.status == 409) {

									console.log(xhrHeadThumReq.status);
									console.log('파일이 존재함');
								} else {

									console.log(xhrHeadThumReq.status);

									alert('첨부 파일 전송에 실패 하였습니다!');
									return false;
								}

							}
						} else {
							$('#fileprogress').hide();
							$('.remove').click();
						}

					}

					// /file end

					var messageDataReq = JSON.stringify(messageData);
					console.log('발송 데이터 ');
					console.log(messageDataReq);

					var groupTopicCount = 0;
					var privateUfmi = 0;
					// 그룹 인원체크

					for ( var i in messageData.addressMessageArray) {
						if (messageData.addressMessageArray[i].receiver
								.indexOf("mms") != -1) {
							// 그룹 대상
							console
									.log(messageData.addressMessageArray[i].receiver);
							$
									.ajax({
										url : '/v1/pms/adm/svc/subscribe/count?topic='
												+ messageData.addressMessageArray[i].receiver,
										type : 'GET',
										headers : {
											'X-Application-Token' : token
										},
										contentType : "application/json",
										dataType : 'json',
										async : false,

										success : function(data) {

											if (!data.result.errors) {
												// groupTopicCount add
												console.log(data.result.data);

												if (data.result.data != 0) {
													groupTopicCount = groupTopicCount
															+ data.result.data;
												} else {
													var convertText = messageData.addressMessageArray[i].receiver;
													convertText = convertText
															.substring(
																	convertText
																			.lastIndexOf("g") + 1,
																	convertText.length);
													alert("그룹"
															+ convertText
															+ "은 수신자가 없는 그룹입니다.");
												}

											} else {
												var convertText = messageData.addressMessageArray[i].receiver;
												convertText = convertText
														.substring(
																convertText
																		.lastIndexOf("g") + 1,
																convertText.length);
												alert("그룹" + convertText
														+ "은 수신자가 없는 그룹입니다.");
												return false;
											}

										},
										error : function(data, textStatus,
												request) {
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
												pushRouter.navigate('login', {
													trigger : true
												});
												return false;
											}

											alert('그룹 대상조회에 실패 했습니다!');
											return false;
										}
									});

							// if (groupTopicCount == 0) {
							// return false;
							// }

						} else {
							console
									.log(messageData.addressMessageArray[i].receiver);
							privateUfmi++;
						}
					}
					var sendCount = groupTopicCount + privateUfmi;
					/*
					 * if (groupTopicCount != 0) { mmsCount = mmsCount *
					 * groupTopicCount; smsCount = smsCount * groupTopicCount; }
					 */
					if (messageData.resendMaxCount) {
						console.log('반복 있음');
						messageData.resendMaxCount = messageData.resendMaxCount * 1;
						sendCount = (sendCount * messageData.resendMaxCount)
								+ sendCount;

						// mmsCount = (mmsCount *
						// messageData.resendMaxCount)+mmsCount;

						// smsCount = (smsCount *
						// messageData.resendMaxCount)+smsCount;

					} else {

					}

					if (sendCount == 0) {
						alert('수신 대상자가 없습니다!');
						return false;

					}

					if (messageData.reservationTime) {

						if (confirm(sendCount + "건(그룹 수신자:" + groupTopicCount
								+ ")의 메시지가 예약 전송 됩니다. 전송 하시겠습니까?") == true) {

						} else {

							return false;
						}
					} else {

						if (confirm(sendCount + "건(그룹 수신자:" + groupTopicCount
								+ ")의 메시지가 전송 됩니다. 전송 하시겠습니까?") == true) {

						} else {

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

								alert('메시지 전송에 실패 하였습니다.');

							}

						},
						error : function(data, textStatus, request) {
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
					alert('번호 를 입력해주세요!');
					$('#send-private-fleep-bunch-input').focus();
					return false;
				}
				if (private_input == null || private_input == "") {
					alert('번호를 입력해주세요!');
					$('#send-private-input').focus();
					return false;
				}

				if (fleep_bunch_input.substring(0, 1) == "0"
						&& fleep_bunch_input.length > 1) {
					alert('번호 첫자리는 0을 입력할수 없습니다.');
					$('#send-private-fleep-bunch-input').focus();
					return false;
				}

				if (private_input.substring(0, 1) == "0"
						&& private_input.length > 1) {
					alert('번호 첫자리는 0을 입력할수 없습니다.');
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

				// console.log('무전번호 결과');
				// console.log(ufmiResult);

				// var showInputVal = $('#contact-add-user-target-show-input')
				// .val();
				// if (showInputVal == "" || showInputVal == null) {
				// $('#contact-add-user-target-show-div').show();
				//
				// $('#contact-add-user-target-show-input').val(
				// showInputVal + ufmiResult);
				// } else {
				// alert('한개의 무전번호만 등록 가능합니다!');
				// return false;
				// }
				// $('#contact-add-private-input').val("");

			},

			// 직접 입력
			plusGroupTopicCheck : function() {
				// plusGroupTopicCheck

				// Ptalk1.0:그룹130(50)
				// Ptalk1.0:50*1212
				var privateGroupCheck = $(
						'input:radio[name="send-check-radio"]:checked').val();

				if (privateGroupCheck == 0) {
					var userText = "";

					var ufmiVerCheck_radio = $(
							'input:radio[name="send-group-pnum-radio"]:checked')
							.val();
					var private_input = $('#send-group-input').val();
					var fleep_bunch_input = $('#send-group-fleep-bunch-input')
							.val();

					if (fleep_bunch_input == null || fleep_bunch_input == "") {
						alert('번호 를 입력해주세요!');
						$('#send-group-fleep-bunch-input').focus();
						return false;
					}
					if (private_input == null || private_input == "") {
						alert('번호를 입력해주세요!');
						$('#send-group-input').focus();
						return false;
					}

					if (fleep_bunch_input.substring(0, 1) == "0"
							&& fleep_bunch_input.length > 1) {
						alert('번호 첫자리는 0을 입력할수 없습니다.');
						$('#send-group-fleep-bunch-input').focus();
						return false;
					}

					if (private_input.substring(0, 1) == "0"
							&& private_input.length > 1) {
						alert('번호 첫자리는 0을 입력할수 없습니다.');
						$('#send-group-input').focus();
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
							+ private_input

					console.log('무전번호 결과');
					console.log(ufmiResult);

					$('#msg-send-group-user-target-show-div').show();
					// var targetLength =
					// $('#msg-send-group-user-target-select')
					// .length();

					$('#msg-send-group-user-target-select').append(
							'<option value=' + ufmiResult + '>' + userText
									+ '</option>');

					// if (showInputVal == "" || showInputVal == null) {
					// $('#msg-send-group-user-target-show-input').val(
					// showInputVal + ufmiResult);
					// $('#msg-send-group-user-target-show-input-hidden').val(showInputVal
					// + ufmiResult);
					// } else {
					// $('#msg-send-group-user-target-show-input').val(
					// showInputVal + "," + ufmiResult);
					// }
					$('#send-group-input').val("");

				} else {
					var userText = "";
					var ufmiVerCheck_radio = $(
							'input:radio[name="send-group-pnum-radio"]:checked')
							.val();
					var private_input = $('#send-group-input').val();
					var fleep_bunch_input = $('#send-group-fleep-bunch-input')
							.val();

					if (fleep_bunch_input == null || fleep_bunch_input == "") {
						alert('번호 를 입력해주세요!');
						$('#send-group-fleep-bunch-input').focus();
						return false;
					}
					if (private_input == null || private_input == "") {
						alert('번호를 입력해주세요!');
						$('#send-group-input').focus();
						return false;
					}
					if (fleep_bunch_input.substring(0, 1) == "0"
							&& fleep_bunch_input.length > 1) {
						alert('번호 첫자리는 0을 입력할수 없습니다.');
						$('#send-group-fleep-bunch-input').focus();
						return false;
					}

					if (private_input.substring(0, 1) == "0"
							&& private_input.length > 1) {
						alert('번호 첫자리는 0을 입력할수 없습니다.');
						$('#send-group-input').focus();
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

					console.log('그룹 토픽 결과');
					console.log(groupTopic);
					var checkTopic = false;
					// groupTopic check

					var token = sessionStorage.getItem('easy-token');
					$.ajax({
						url : '/v1/pms/adm/svc/subscribe/count?topic='
								+ groupTopic,
						type : 'GET',
						headers : {
							'X-Application-Token' : token
						},
						contentType : "application/json",
						dataType : 'json',
						async : false,

						success : function(data) {

							if (!data.result.errors) {
								// // groupTopicCount add
								// console.log(data.result.data);
								// groupTopicCount = groupTopicCount
								// + data.result.data;
								if (data.result.data != 0) {
									checkTopic = true;
								} else {
									console.log('alert');
									alert(userText + "는 수신자가 없는 그룹입니다.");
								}

							} else {
								/* console.log(messageData.receivers[i]); */
								console.log('alert');
								alert(userText + "는 수신자가 없는 그룹입니다.");

								// return false;
								// $(
								// '#msg-send-group-user-target-show-input')
								// .val("");
								//
								// alert('해당 그룹에 수신자가 없습니다. 다른
								// 그룹을 입력해 주세요!');
								// return false;
							}

						},
						error : function(data, textStatus, request) {
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

							alert('그룹 대상조회에 실패 했습니다!');
							return false;
						}
					});

					if (checkTopic == true) {

						$('#msg-send-group-user-target-select').append(
								'<option value=' + groupTopic + '>' + userText
										+ '</option>');
					}
					$('#send-group-input').val("");
				}

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
														// var contentHtml = "";
														if (dataResult.length > 0) {
															// $(
															// '#msg-content-list-div')
															// .show();
															for ( var i in dataResult) {

																$(
																		"#msg-send-private-content-load-select")
																		.append(
																				'<option value='
																						+ dataResult[i].templateMsg
																						+ '>'
																						+ dataResult[i].templateName
																						+ '</option>');
																$(
																		"#msg-send-contact-private-content-load-select")
																		.append(
																				'<option value='
																						+ dataResult[i].templateMsg
																						+ '>'
																						+ dataResult[i].templateName
																						+ '</option>');

																$(
																		"#msg-send-group-content-load-select")
																		.append(
																				'<option value='
																						+ dataResult[i].templateMsg
																						+ '>'
																						+ dataResult[i].templateName
																						+ '</option>');
															}
															// $(
															// '#msg-content-list-box-div')
															// .html(
															// contentHtml);
														} else {
															// $(
															// '#msg-content-list-div')
															// .hide();
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
																		reveiverType : '',
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
															var receiverType = resultData[i].ufmi;
															// 그룹토픽 체크

															// 그룹
															if (resultData[i].ufmi
																	.indexOf("mms") > -1) {

																var topicArr = [];
																topicArr = resultData[i].ufmi
																		.split('/');
																console
																		.log(topicArr);
																// p1체크
																if (resultData[i].ufmi
																		.indexOf("P1") > -1) {

																	resultData[i].ufmi = "그룹"
																			+ topicArr[4]
																					.substring(1)
																			+ "("
																			+ topicArr[3]
																			+ ")";

																	receiverType = "Ptalk1.0";
																	// p2
																	// 그룹
																} else if (dataResult[i].retained
																		.indexOf("P2") > -1) {
																	resultData[i].ufmi = "그룹"
																			+ topicArr[4]
																					.substring(1)
																			+ "("
																			+ topicArr[3]
																			+ ")";
																	receiverType = "Ptalk2.0";
																}
																// 개인
															} else {

																if (receiverType
																		.substring(
																				0,
																				2) == "82") {
																	resultData[i].ufmi = resultData[i].ufmi
																			.substring(
																					3,
																					resultData[i].ufmi.length);
																	receiverType = "Ptalk1.0";

																} else {
																	resultData[i].ufmi = resultData[i].ufmi
																			.substring(
																					2,
																					resultData[i].ufmi.length);
																	receiverType = "Ptalk2.0";
																}

															}

															receiverType = '<input name="contact-list-checkbox" type="checkbox" value="'
																	+ resultData[i].ufmi
																	+ '"/>&nbsp'
																	+ receiverType;

															contactTableData
																	.push({
																		receiverType : receiverType,
																		ufmi : resultData[i].ufmi,
																		ufmiName : resultData[i].ufmiName,
																		item1 : resultData[i].item1,
																		item2 : resultData[i].item2,
																		item3 : resultData[i].item3,
																		//
																		// '<button
																		// type="button"
																		// name="editContactBtn"
																		// data-target="#contact-edit-modal"
																		// data-toggle="modal"
																		// class="btn
																		// btn-xs
																		// btn-white">수정하기</button>'
																		item4 : '<a class="green " name="editContactBtn" data-target="#contact-edit-modal"   data-tooltip="tooltip" data-toggle="modal" title="수정"><i class="ace-icon fa fa-pencil bigger-130"></i></a> &nbsp;<a name="name-contact-delete-a" class="red" data-tooltip="tooltip" data-toggle="modal" title="삭제"><i class="ace-icon fa fa-trash-o bigger-130"></i></a>',
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
																.removeItem("easy-token");
														sessionStorage
																.removeItem("easy-userId");
														sessionStorage
																.removeItem("easy-role");

														sessionStorage
																.removeItem("easy-roupTopic");
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
												}, {

													"targets" : 5,
													"orderable" : false
												} ],
												"aaSorting" : [ [ 0, 'dec' ] ],

												aoColumns : [ {
													mData : 'receiverType'
												}, {
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

									$('[data-tooltip="tooltip"]').tooltip({
										placement : 'top'
									});
								}, 'html');
			}
		});
window.ADF = window.ADF || {};
// 메시지 전송 뷰
ADF.PushMsgSendView = Backbone.View
		.extend({
			// 메시지 전송 이벤트 목록
			events : {
				"change #msg-send-excel-user-repeat-check" : "msgExcelRepeatCheck",
				"change input[name='send-check-radio']" : "checkRadioGroupPrivate",
				"change input[name='send-group-pnum-radio']" : "checkPtalkRadio",
				"change input[name='contact-check-radio']" : "checkRadioContactPrivate",
				"change input[name='contact-add-pnum-radio']" : "checkContactPtalkRadio",
				"change #msg-send-group-user-repeat-check" : "msgGroupRepeatCheck",
				"change #msg-send-contact-option-check" : "optionCheckContact",
				"change #msg-send-group-option-check" : "optionCheckGroup",
				"change #msg-send-contact-private-user-repeat-check" : "msgRepeatCheckContact",
				"click #msg-send-excel-all-delete" : "handsontableRemove",
				"click #msg-send-excel-handson-save" : "handsontableSave",
				"input #send-group-input" : "checkSendGroupInput",
				"input #send-group-fleep-bunch-input" : "checkSendGroupBunchInput",
				"input #contact-add-private-input" : "checkContactPrivateInput",
				"input #contact-add-fleep-bunch-input" : "checkContactBunchInput",
				"click #msg-send-group-minus-span" : "groupMiunsClick",
				"click #msg-send-group-plus-span" : "plusGroupTopicCheck",
				"click #msg-send-excel-validation" : "excelHandDataCheck",
				"input #msg-send-excel-content-textarea" : "checkExcelContentArea",
				"input #msg-send-group-content-textarea" : "checkGroupContentArea",
				"input #msg-send-contact-private-content-textarea" : "checkContactContentArea",
				"input #msg-send-excel-repeat-time-input" : "checkExcelRepeatTime",
				"input #msg-send-contact-private-repeat-time-input" : "checkRepeatTimeContact",
				"input #msg-send-group-repeat-time-input" : "checkRepeatTimeGroup",
				"click #msg-send-group-btn" : "msgSendGroup",
				"click #msg-send-excel-cancel-btn" : "msgSendExcelCancel",
				"click #msg-send-group-cancel-btn" : "msgGroupSendCancel",
				"click #msg-send-contact-private-cancel-btn" : "msgSendCancelContact",
				"click #msg-send-private-save-btn" : "msgSaveBtnClick",
				"click #msg-send-group-save-btn" : "msgSaveGroupBtnClick",
				"click #msg-send-contact-private-save-btn" : "msgSaveContactBtnClick",
				"change #msg-send-excel-content-load-select" : "selectExcelContentList",
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
				"click #msg-send-excel-change-name-btn" : "changeExcelNameBtn",
				"click #msg-send-excel-change-item1-btn" : "changeExcelItem1Btn",
				"click #msg-send-excel-change-item2-btn" : "changeExcelItem2Btn",
				"click #msg-send-excel-change-item3-btn" : "changeExcelItem3Btn",
				"click #msg-send-contact-private-btn" : "msgSendContact",
				"click #msg-send-excel-btn" : "msgSendExcel",
				"click #msg-send-excel-div" : "clickExcelSendDiv",
				"click #msg-send-contact-div" : "clickContactSendDiv",
				"click #msg-send-group-div" : "clickGroupSendDiv",
				"change #contact-image-upload-input" : "changeFile",
				"change #group-image-upload-input" : "changeFile",
				"change #excel-image-upload-input" : "changeFile"
			},

			initialize : function() {
				_.bindAll(this, 'render', 'beforeRender', 'afterRender',
						'msgExcelRepeatCheck', 'checkExcelContentArea',
						'msgSendFormCheck', 'checkExcelRepeatTime',
						'msgSendExcelCancel', 'msgSaveBtnClick',
						"selectExcelContentList", "msgDelete",
						"checkContactPrivateInput", "checkContactBunchInput",
						"contactAdd", "contactAddFormCheck",
						"contactAllCheckBox", "contactDelete",
						"cancelContactModal", "editContactBtn",
						"editContactBtnFormCheck", "checkContactContentArea",
						"changeNameBtn", "changeItem1Btn", "changeItem2Btn",
						"changeItem3Btn", "changeExcelNameBtn",
						"changeExcelItem1Btn", "changeExcelItem2Btn",
						"changeExcelItem3Btn", "selectContactContentList",
						"msgRepeatCheckContact", "checkRepeatTimeContact",
						"msgSendCancelContact", "msgSendContactFormCheck",
						"msgSendContact", "clickExcelSendDiv",
						"clickContactSendDiv", "clickGroupSendDiv",
						"msgSaveContactBtnClick", "checkSendGroupInput",
						"checkSendGroupBunchInput", "plusGroupTopicCheck",
						"checkGroupContentArea", "msgSaveGroupBtnClick",
						"selectGroupContentList", "msgGroupRepeatCheck",
						"msgGroupSendCancel", "msgSendGroup",
						"msgSendGroupFormCheck", "changeFile",
						"optionCheckContact", "optionCheckGroup",
						"checkRadioGroupPrivate", "checkPtalkRadio",
						"checkRadioContactPrivate", "checkContactPtalkRadio",
						"deleteContactIcon", "groupMiunsClick", "msgSendExcel",
						"msgSendExcelFormCheck", "calculateSize",
						"excelHandDataCheck", "handsontableRemove",
						"handsontableSave", "checkRepeatTimeGroup");
				var _this = this;
				this.render = _.wrap(this.render, function(render) {
					_this.beforeRender();
					render();
					_this.afterRender();
					return _this;
				});
				Handsontable.Dom.addEvent(window, 'resize', this.calculateSize);
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

			// 엑셀 시트 저장(사용안함)
			handsontableSave : function() {
				var dataResult = this.handsonTableData;
				handsontable2csv.download(dataResult, "filename.csv");
			},
			// 엑셀 시트 삭제(사용 안함)
			handsontableRemove : function() {
				var dataResult = this.handsonTableData.getData();
				for (var i = 0; i < dataResult.length; i++) {
					this.handsonTableData.alter('remove_row', i);

				}

			},
			// 엑셀 시트 데이터 체크
			excelHandDataCheck : function() {
				var dataResult = this.handsonTableData.getData();
				for ( var i in dataResult) {
					var ptalkVer = dataResult[i][0];
					var ufmiNum = dataResult[i][1];
					var name = dataResult[i][2];
					var item1 = dataResult[i][3];
					var item2 = dataResult[i][4];
					var item3 = dataResult[i][5];
					if ((ptalkVer == null || ptalkVer == "")
							&& (ufmiNum == null || ufmiNum == "")
							&& (name == null || name == "")
							&& (item1 == null || item1 == "")
							&& (item2 == null || item2 == "")
							&& (item3 == null || item3 == "")) {

					} else {
						if (ptalkVer == null || ptalkVer == "") {
							$('#error-small').hide();
							var cell = i * 1;
							this.handsonTableData.selectCell(cell, 0);
							alert((cell + 1) + '번째 열 : Ptalk 버전을 입력해주세요');

							return false;
						} else if (ptalkVer == 1 || ptalkVer == 2) {

							$('#error-small').show();
						} else {
							$('#error-small').hide();
							var cell = i * 1;
							this.handsonTableData.selectCell(cell, 0);
							alert((cell + 1)
									+ '번째 열 : Ptalk 1.0 버전은 숫자 1, 버전 2.0은 숫자 2를 입력해주세요');
							return false;
						}

						// 무전 번호 체크
						if (ufmiNum == null || ufmiNum == "") {
							$('#error-small').hide();
							var cell = i * 1;
							this.handsonTableData.selectCell(cell, 1);
							alert((cell + 1) + '번째 열 : 무전 번호를 입력해 주세요');
							// this.handsonTableData.selectCell(i,0);
							return false;
						} else {

							var num_check = /^[0-9,*]*$/;

							if (ufmiNum.length > 13) {
								$('#error-small').hide();
								var cell = i * 1;
								this.handsonTableData.selectCell(cell, 1);
								alert((cell + 1)
										+ '번째 열 : 무전 번호의 길이가 너무 깁니다! (최대 13자리 입력 가능)');

								return false;
							}

							if (!num_check.test(ufmiNum)) {
								$('#error-small').hide();
								var cell = i * 1;
								this.handsonTableData.selectCell(cell, 1);
								alert((cell + 1)
										+ '번째 열 :  숫자 또는 * 만 입력 가능 합니다');

								return false;
							}

							if (ufmiNum.indexOf('*') > -1) {
								var ufmiNumSplit = ufmiNum.split('*');
								if (ufmiNumSplit[0].substring(0, 1) == "0"
										|| ufmiNumSplit[1].substring(0, 1) == "0") {
									$('#error-small').hide();
									var cell = i * 1;
									this.handsonTableData.selectCell(cell, 1);
									alert((cell + 1)
											+ '번째 열 : 무전번호의 첫자리는 0이 올수 없습니다!');

									return false;
								}

							} else {
								$('#error-small').hide();
								var cell = i * 1;
								this.handsonTableData.selectCell(cell, 1);
								alert((cell + 1)
										+ '번째 열 : 무전 번호의 형태를 올바르게 입력해주세요! ex)50*1234');

								return false;
							}

						}

						if (name != null && name != "") {

							if (name.length > 30) {
								$('#error-small').hide();

								var cell = i * 1;
								this.handsonTableData.selectCell(cell, 2);
								alert((cell + 1)
										+ '번째 열 : 이름의 길이가 너무 깁니다 (최대 30자리 입력 가능)');
								return false;
							}
						}
						if (item1 != null && item1 != "") {
							if (item1.length > 30) {
								$('#error-small').hide();
								var cell = i * 1;
								this.handsonTableData.selectCell(cell, 3);
								alert((cell + 1)
										+ '번째 열 : 항목1의 길이가 너무 깁니다 (최대 30자리 입력 가능)');
								return false;
							}
						}

						if (item2 != null && item2 != "") {
							if (item2.length > 30) {
								$('#error-small').hide();
								var cell = i * 1;
								this.handsonTableData.selectCell(cell, 4);
								alert((cell + 1)
										+ '번째 열 : 항목2의  길이가 너무 깁니다 (최대 30자리 입력 가능)');
								return false;
							}
						}
						if (item3 != null && item3 != "") {
							if (item3.length > 30) {
								$('#error-small').hide();
								var cell = i * 1;
								this.handsonTableData.selectCell(cell, 5);
								alert((cell + 1)
										+ '번째 열 : 항목3의  길이가 너무 깁니다 (최대 30자리 입력 가능)');
								return false;
							}
						}

					}

				}

			},
			// 직접 입력 발송 - 버튼 클릭
			groupMiunsClick : function() {
				$("#msg-send-group-user-target-select option:last").remove();

			},
			// 주소록 발송 체크 개인/그룹
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
			// 주소록 발송 체크 버전
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

			// 사용안함
			checkPtalkRadio : function() {
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

			// 사용 안함
			checkRadioGroupPrivate : function() {
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
			// 반복 옵션 체크 (주소록)
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
			// 반복 옵션 체크 (직접입력)
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
			// 파일 변경 이벤트(공통)
			changeFile : function(e) {

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
						var md5Result = spark.end();
						$('#file-md5').val(md5Result);

						// hash
					}
				}, frOnerror = function() {

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
								$('#file-thumbnail').val(dataURL);

							} else {

							}

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
						$('#file-thumbnail').val("");
					}

					var reader = new FileReader();

					if (reader != null) {

						reader.onload = GetThumbnail;
						reader.readAsDataURL(file);
					}

				}

			},
			// 엑셀 발송메뉴 클릭
			clickExcelSendDiv : function() {
				$('#contact-list-div').hide();
				$('#excel-list-div').show();
				$('#send-list-div').hide();
				$("#tab-div").removeClass('col-lg-8');
				$("#tab-div").addClass('col-lg-4');
			},
			// 주소록 발송 메뉴 클릭
			clickContactSendDiv : function() {
				$('#contact-list-div').show();
				$('#send-list-div').hide();
				$('#excel-list-div').hide();
				$("#tab-div").removeClass('col-lg-8');
				$("#tab-div").addClass('col-lg-4');
			},
			// 직접 입력 발송 메뉴 클릭
			clickGroupSendDiv : function() {
				$('#contact-list-div').hide();
				$('#send-list-div').show();
				$('#excel-list-div').hide();
				$("#tab-div").removeClass('col-lg-8');
				$("#tab-div").addClass('col-lg-4');
			},
			// 주소록 항목1 버튼 클릭시 내용체크
			changeItem1Btn : function() {
				var contentValue = $(
						'#msg-send-contact-private-content-textarea').val();
				contentValue = contentValue + "$항목1$";
				$('#msg-send-contact-private-content-textarea').val(
						contentValue);
				var input_messageContent = $(
						'#msg-send-contact-private-content-textarea').val();
				input_messageContent = input_messageContent.trim();

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
			// 주소록 항목2 버튼 클릭시 내용체크
			changeItem2Btn : function() {
				var contentValue = $(
						'#msg-send-contact-private-content-textarea').val();
				contentValue = contentValue + "$항목2$";
				$('#msg-send-contact-private-content-textarea').val(
						contentValue);
				var input_messageContent = $(
						'#msg-send-contact-private-content-textarea').val();
				input_messageContent = input_messageContent.trim();

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
			// 주소록 항목3 버튼 클릭시 내용체크
			changeItem3Btn : function() {
				var contentValue = $(
						'#msg-send-contact-private-content-textarea').val();
				contentValue = contentValue + "$항목3$";
				$('#msg-send-contact-private-content-textarea').val(
						contentValue);
				var input_messageContent = $(
						'#msg-send-contact-private-content-textarea').val();
				input_messageContent = input_messageContent.trim();

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
			// 주소록 이름 버튼 클릭시 내용체크
			changeNameBtn : function() {
				var contentValue = $(
						'#msg-send-contact-private-content-textarea').val();
				contentValue = contentValue + "$이름$";
				$('#msg-send-contact-private-content-textarea').val(
						contentValue);
				var input_messageContent = $(
						'#msg-send-contact-private-content-textarea').val();
				input_messageContent = input_messageContent.trim();

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
			// 엑셀 항목1 버튼 클릭시
			changeExcelItem1Btn : function() {
				var contentValue = $('#msg-send-excel-content-textarea').val();
				contentValue = contentValue + "$항목1$";
				$('#msg-send-excel-content-textarea').val(contentValue);
				var input_messageContent = $('#msg-send-excel-content-textarea')
						.val();
				input_messageContent = input_messageContent.trim();

				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-excele-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-excel-length-max').text("");
					$('#msg-send-excel-length-byte').text("MMS");
					$('#msg-send-excel-length-strong').text(strongLength);
				} else {
					$('#msg-send-excel-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-excel-length-max').text("140");
					$('#msg-send-excel-length-byte').text("byte");
					$('#msg-send-excel-length-strong').text(strongLength);
				}

			},
			// 엑셀 항목2 버튼 클릭시
			changeExcelItem2Btn : function() {
				var contentValue = $('#msg-send-excel-content-textarea').val();
				contentValue = contentValue + "$항목2$";
				$('#msg-send-excel-content-textarea').val(contentValue);
				var input_messageContent = $('#msg-send-excel-content-textarea')
						.val();
				input_messageContent = input_messageContent.trim();

				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-excel-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-excel-length-max').text("");
					$('#msg-send-excel-length-byte').text("MMS");
					$('#msg-send-excel-length-strong').text(strongLength);
				} else {
					$('#msg-send-excel-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-excel-length-max').text("140");
					$('#msg-send-excel-length-byte').text("byte");
					$('#msg-send-excel-length-strong').text(strongLength);
				}

			},
			// 엑셀 항목3 버튼 클릭시
			changeExcelItem3Btn : function() {
				var contentValue = $('#msg-send-excel-content-textarea').val();
				contentValue = contentValue + "$항목3$";
				$('#msg-send-excel-content-textarea').val(contentValue);
				var input_messageContent = $('#msg-send-excel-content-textarea')
						.val();
				input_messageContent = input_messageContent.trim();

				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-excel-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-excel-length-max').text("");
					$('#msg-send-excel-length-byte').text("MMS");
					$('#msg-send-excel-length-strong').text(strongLength);
				} else {
					$('#msg-send-excel-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-excel-length-max').text("140");
					$('#msg-send-excel-length-byte').text("byte");
					$('#msg-send-excel-length-strong').text(strongLength);
				}
			},
			// 엑셀 이름 항목 클릭시

			changeExcelNameBtn : function() {
				var contentValue = $('#msg-send-excel-content-textarea').val();
				contentValue = contentValue + "$이름$";
				$('#msg-send-excel-content-textarea').val(contentValue);
				var input_messageContent = $('#msg-send-excel-content-textarea')
						.val();
				input_messageContent = input_messageContent.trim();

				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-excel-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-excel-length-max').text("");
					$('#msg-send-excel-length-byte').text("MMS");
					$('#msg-send-excel-length-strong').text(strongLength);
				} else {
					$('#msg-send-excel-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-excel-length-max').text("140");
					$('#msg-send-excel-length-byte').text("byte");
					$('#msg-send-excel-length-strong').text(strongLength);
				}

			},
			// 주소록 수정 form check
			editContactBtnFormCheck : function() {
				var editName = $('#contact-edit-user-name-input').val();

				if (editName == null || editName == "") {
					alert('수정할 이름을 입력해 주세요!');
					return flase;
				}
				return true;
			},
			// 주소록 수정
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
			// 주소록 수정 취소
			cancelContactModal : function() {
				$('#contact-edit-user-target-show-input').val("");
				$('#contact-edit-user-name-input').val("");
				$('#contact-edit-user-item1-input').val("");
				$('#contact-edit-user-item2-input').val("");
				$('#contact-edit-user-item3-input').val("");
			},
			// 주소록 수정하기 버튼
			editContactModal : function(e) {
				var aData = contactTable.fnGetData($(e.target).parents('tr'));
				$('#contact-edit-user-target-show-input').val(aData.hiddenUfmi);
				$('#contact-edit-user-name-input').val(aData.ufmiName);
				$('#contact-edit-user-item1-input').val(aData.item1);
				$('#contact-edit-user-item2-input').val(aData.item2);
				$('#contact-edit-user-item3-input').val(aData.item3);

			},

			// 주소록 삭제 버튼
			deleteContactIcon : function(e) {
				var aData = contactTable.fnGetData($(e.target).parents('tr'));

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
			// 사용 안함
			contactDelete : function() {

			},

			// 주소록 체크 박스
			contactAllCheckBox : function() {
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

			// 주소록 추가 취소
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

			// 주소록 추가 form check
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

			// 주소록 추가
			contactAdd : function() {
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

						console.log('주소록 추가');
						console.log(ufmiResult);
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
									if (data.result.data == 0) {
										checkTopic = false;
										alert("입력하신 번호는 수신자가 없는 그룹입니다!");
									}

								} else {
									checkTopic = false;
									alert("입력하신 번호는 수신자가 없는 그룹입니다!");

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

			// 주소록 input check
			checkContactBunchInput : function() {
				var num_check = /^[0-9]*$/;
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

			// 주소록 input check
			checkContactPrivateInput : function() {

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

			// 사용안함
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

			// 주소록 상용구 List Change
			selectContactContentList : function() {
				var contentSelect = $(
						'#msg-send-contact-private-content-load-select').val();
				var contentMsg = pushUtil.b64_to_utf8(contentSelect);
				$('#msg-send-contact-private-content-textarea').val(contentMsg);
				var input_messageContent = $(
						'#msg-send-contact-private-content-textarea').val();
				input_messageContent = input_messageContent.trim();
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

			// 직접 입력 발송 상용구 리스트 Change
			selectGroupContentList : function() {
				var contentSelect = $('#msg-send-group-content-load-select')
						.val();
				var contentMsg = pushUtil.b64_to_utf8(contentSelect);
				$('#msg-send-group-content-textarea').val(contentMsg);
				var input_messageContent = $('#msg-send-group-content-textarea')
						.val();
				input_messageContent = input_messageContent.trim();
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

			// 엑셀 발송 상용구 list Change
			selectExcelContentList : function() {
				var contentSelect = $('#msg-send-excel-content-load-select')
						.val();
				var contentMsg = pushUtil.b64_to_utf8(contentSelect);
				$('#msg-send-excel-content-textarea').val(contentMsg);
				var input_messageContent = $('#msg-send-excel-content-textarea')
						.val();
				input_messageContent = input_messageContent.trim();
				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-excel-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-excel-length-max').text("");
					$('#msg-send-excel-length-byte').text("MMS");
					$('#msg-send-excel-length-strong').text(strongLength);
				} else {
					$('#msg-send-excel-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-excel-length-max').text("140");
					$('#msg-send-excel-length-byte').text("byte");
					$('#msg-send-excel-length-strong').text(strongLength);
				}

			},

			// 사용안함
			checkContentEditArea : function() {
				// var input_messageContent = $(
				// '#msg-send-private-content-edit-textarea').val();
				// input_messageContent = input_messageContent.trim();
				// console.log(input_messageContent.Length());
				// var strongLength = input_messageContent.Length();
				// if (strongLength > 140) {
				// $('#msg-send-private-content-edit-textarea').css(
				// 'background-color', '#ddd');
				// $('#msg-send-private-length-edit-max').text("");
				// $('#msg-send-private-length-edit-byte').text("MMS");
				// $('#msg-send-private-length-edit-strong')
				// .text(strongLength);
				// } else {
				// $('#msg-send-private-content-edit-textarea').css(
				// 'background-color', 'white');
				// $('#msg-send-private-length-edit-max').text("140");
				// $('#msg-send-private-length-edit-byte').text("byte");
				// $('#msg-send-private-length-edit-strong')
				// .text(strongLength);
				// }

			},

			// 사용안함
			msgSaveGroupBtnClick : function() {

				var contentTextAreaVal = $('#msg-send-group-content-textarea')
						.val();
				if (contentTextAreaVal != null && contentTextAreaVal != "") {
					$('#msg-send-private-content-save-textarea').val(
							contentTextAreaVal);
					var input_messageContent = $(
							'#msg-send-private-content-save-textarea').val();
					input_messageContent = input_messageContent.trim();

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

			// 사용안함
			msgSaveBtnClick : function() {

				var contentTextAreaVal = $('#msg-send-private-content-textarea')
						.val();
				if (contentTextAreaVal != null && contentTextAreaVal != "") {
					$('#msg-send-private-content-save-textarea').val(
							contentTextAreaVal);
					var input_messageContent = $(
							'#msg-send-private-content-save-textarea').val();
					input_messageContent = input_messageContent.trim();

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

			// 사용안함
			msgSaveContactBtnClick : function() {

				var contentTextAreaVal = $(
						'#msg-send-contact-private-content-textarea').val();
				if (contentTextAreaVal != null && contentTextAreaVal != "") {
					$('#msg-send-private-content-save-textarea').val(
							contentTextAreaVal);
					var input_messageContent = $(
							'#msg-send-private-content-save-textarea').val();
					input_messageContent = input_messageContent.trim();

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

			// 엑셀 전송 취소
			msgSendExcelCancel : function() {

				$('#msg-send-excel-content-textarea').val("");
				$('#msg-send-excel-user-repeat-check').attr('checked', false);
				$('#msg-send-excel-reservation-date-input').val("");
				$('#msg-send-excel-repeat-div').hide();
				$('#msg-send-excel-repeat-cnt-select').val(0);
				$('#msg-send-excel-repeat-time-input').val("");
				$('#msg-send-excel-content-load-select').val(0);
				$('.remove').click();
				var input_messageContent = $('#msg-send-excel-content-textarea')
						.val();
				input_messageContent = input_messageContent.trim();

				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-excel-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-excel-length-max').text("");
					$('#msg-send-excel-length-byte').text("MMS");
					$('#msg-send-excel-length-strong').text(strongLength);
				} else {
					$('#msg-send-excel-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-excel-length-max').text("140");
					$('#msg-send-excel-length-byte').text("byte");
					$('#msg-send-excel-length-strong').text(strongLength);
				}

			},

			// 직접 입력 발송 취소
			msgGroupSendCancel : function() {
				$('#send-group-fleep-bunch-input').val("");
				$('#send-group-input').val("");
				$('#msg-send-group-user-target-show-input').val("");
				// $('#msg-send-group-user-target-show-div').hide();
				$('#msg-send-group-content-textarea').val("");
				$('#msg-send-group-user-repeat-check').attr('checked', false);
				$('#msg-send-group-reservation-date-input').val("");
				$('#msg-send-group-repeat-div').hide();
				$('#msg-send-group-repeat-cnt-select').val(0);
				$('#msg-send-group-repeat-time-input').val("");
				$('.remove').click();
				$('#msg-send-group-content-load-select').val(0);
				$('#msg-send-group-repeat-div').fadeOut();
				// $('#msg-send-group-user-target-show-div').fadeOut();

				var input_messageContent = $('#msg-send-group-content-textarea')
						.val();
				input_messageContent = input_messageContent.trim();

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

			// 주소록 발송 취소
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

			// 엑셀 반복 시간 체크
			checkExcelRepeatTime : function() {

				var num_check = /^[0-9]*$/;
				var private_input = $("#msg-send-excel-repeat-time-input")
						.val();

				if (!num_check.test(private_input)) {
					alert('숫자 만 입력 가능합니다!');
					$("#msg-send-excel-repeat-time-input").focus();
					return false;
				}

				console.log(private_input);
				if (pushUtil.compactTrim(private_input) != "") {
					console.log(private_input);
					if (private_input == 0) {
						alert('0은 입력할 수 없습니다');
						return false;
					}
				}
			},

			// 주소록 반복 시간 체크
			checkRepeatTimeContact : function() {

				var num_check = /^[0-9]*$/;
				var private_input = $(
						"#msg-send-contact-private-repeat-time-input").val();

				if (!num_check.test(private_input)) {
					alert('숫자 만 입력 가능합니다!');
					$("#msg-send-contact-private-repeat-time-input").focus();
					return false;
				}

				console.log(private_input);
				if (pushUtil.compactTrim(private_input) != "") {
					console.log(private_input);
					if (private_input == 0) {
						alert('0은 입력할 수 없습니다');
						return false;
					}
				}
			},

			checkRepeatTimeGroup : function() {
				var num_check = /^[0-9]*$/;
				var private_input = $("#msg-send-group-repeat-time-input")
						.val();

				if (!num_check.test(private_input)) {
					alert('숫자 만 입력 가능합니다!');
					$("#msg-send-group-repeat-time-input").focus();
					return false;
				}
				console.log(private_input);
				if (pushUtil.compactTrim(private_input) != "") {
					console.log(private_input);
					if (private_input == 0) {
						alert('0은 입력할 수 없습니다');
						return false;
					}
				}
			},

			// 사용안함
			msgSend : function() {
				// var userName = sessionStorage.getItem('easy-userName');
				// if (userName == null || userName == "" || userName == "null")
				// {
				// alert('발송번호를 등록해야 정상 사용이 가능합니다.!');
				// pushRouter.navigate('user_info', {
				// trigger : true
				// });
				// return false;
				// }
				// if (this.msgSendFormCheck()) {
				//
				// var messageTarget = $(
				// '#msg-send-private-user-target-show-input').val();
				// console.log(messageTarget);
				// console.log('123123123123');
				// messageTarget = pushUtil.compactTrim(messageTarget);
				// console.log('123');
				// var messageContent = $('#msg-send-private-content-textarea')
				// .val();
				// var input_reservation = $(
				// '#msg-send-private-reservation-date-input').val();
				// var input_resendCount = $(
				// '#msg-send-private-repeat-cnt-select').val();
				// var input_resendInterval = $(
				// '#msg-send-private-repeat-time-input').val();
				// var dateResult = "";
				// var messageData = new Object();
				// console.log('34666');
				// if (input_reservation != "") {
				//
				// dateResult = pushUtil
				// .dateFormatingRes(input_reservation);
				// dateResult = dateResult.toISOString();
				// }
				//
				// if (dateResult != "") {
				// messageData.reservationTime = dateResult;
				//
				// }
				//
				// if (input_resendCount != 0) {
				// messageData.resendMaxCount = input_resendCount;
				// }
				// if (input_resendInterval != "") {
				// messageData.resendInterval = input_resendInterval;
				// }
				//
				// console.log('346123123');
				// messageContent = pushUtil.utf8_to_b64(messageContent);
				// messageTarget = messageTarget.split(",");
				// // console.log('메지시 수신자 변경');
				// // messageTarget[0] = 'mms/P1/82/50/g130';
				//
				// messageData.receivers = messageTarget;
				// messageData.content = messageContent;
				// messageData.contentType = "application/base64";
				//
				// // end 전송대상 체크
				//
				// var contentLength = $('#msg-send-private-length-strong')
				// .text();
				// messageData.contentLength = contentLength;
				// console.log('메시지 전송전 길이');
				// console.log(messageData.contentLength);
				// var token = sessionStorage.getItem("easy-token");
				//
				// var sendCount = 0;
				// // /file attache
				// var fileName = document
				// .getElementById("private-image-upload-input").value;
				// var fileData = document
				// .getElementById("private-image-upload-input").files[0];
				//
				// var userId = sessionStorage.getItem("easy-userId");
				// if (fileName != null && fileData != null) {
				//
				// var fileFormat = fileName.substr(fileName
				// .lastIndexOf('.') + 1);
				// var replaceImageText = fileName.replace(/^.*\\/, "");
				// console.log(fileFormat);
				// var md5 = $('#file-md5').val();
				// replaceImageText = encodeURIComponent(replaceImageText);
				// messageData.mms = true;
				// messageData.fileName = md5;
				// messageData.fileFormat = fileFormat;
				//
				// // head check
				// var xhrHeadReq = new XMLHttpRequest();
				// xhrHeadReq.open("HEAD", "/cts/v1/users/" + userId,
				// false);
				// xhrHeadReq.setRequestHeader("md5", md5);
				// xhrHeadReq.setRequestHeader("token", token);
				// xhrHeadReq.setRequestHeader("file", replaceImageText);
				// xhrHeadReq.send();
				//
				// if (xhrHeadReq.status == 404) {
				// console.log(xhrHeadReq.status);
				//
				// var formdata = new FormData();
				// formdata.append("fileData", fileData);
				// var xhrFileReq = new XMLHttpRequest();
				// xhrFileReq.open("POST", "/cts/v1/users/" + userId,
				// false);
				// xhrFileReq.setRequestHeader("md5", md5);
				// xhrFileReq.setRequestHeader("token", token);
				// xhrFileReq.setRequestHeader("file",
				// replaceImageText);
				// xhrFileReq.send(formdata);
				// if (xhrFileReq.status == 200) {
				// console.log('파일 전송 성공');
				//
				// console.log(xhrFileReq.status);
				//
				// } else {
				// console.log(xhrFileReq.status);
				//
				// alert('첨부 파일 전송에 실패 하였습니다!');
				// return false;
				// }
				// } else if (xhrHeadReq.status == 409) {
				//
				// console.log(xhrHeadReq.status);
				// console.log('파일이 존재함');
				// } else {
				//
				// console.log(xhrHeadReq.status);
				//
				// alert('첨부 파일 전송에 실패 하였습니다!');
				// return false;
				// }
				//
				// // 이미지 파일일 경우 thumbnail 전송
				// if (fileFormat == "jpg" || fileFormat == "jpeg"
				// || fileFormat == "png") {
				//
				// var xhrHeadThumReq = new XMLHttpRequest();
				// xhrHeadThumReq.open("HEAD", "/cts/v1/users/"
				// + userId + "/thumb", false);
				// xhrHeadThumReq.setRequestHeader("md5", md5);
				// xhrHeadThumReq.setRequestHeader("token", token);
				// xhrHeadThumReq.setRequestHeader("file", ".png");
				// xhrHeadThumReq.send();
				// if (xhrHeadThumReq.status == 404) {
				// console.log(xhrHeadThumReq.status);
				// var thumbNail = $('#file-thumbnail').val();
				// console.log('썸네일');
				// console.log(thumbNail);
				// if (thumbNail == null || thumbNail == "") {
				//
				// alert('첨부 파일 전송에 실패 하였습니다!');
				// return false;
				// }
				// thumbNail = pushUtil.dataURItoBlob(thumbNail);
				// var formDataThumb = new FormData();
				// formDataThumb.append("fileData", thumbNail);
				// var xhrFileThumReq = new XMLHttpRequest();
				// xhrFileThumReq.open("POST", "/cts/v1/users/"
				// + userId + "/thumb", false);
				// xhrFileThumReq.setRequestHeader("md5", md5);
				// xhrFileThumReq.setRequestHeader("token", token);
				// xhrFileThumReq.setRequestHeader("file", ".png");
				// xhrFileThumReq.send(formDataThumb);
				// if (xhrFileThumReq.status == 200) {
				// console.log('썸 파일 전송 성공');
				// console.log(xhrFileThumReq.status);
				//
				// } else {
				// console.log(xhrFileThumReq.status);
				//
				// alert('첨부 파일 전송에 실패 하였습니다!');
				// return false;
				// }
				// } else if (xhrHeadThumReq.status == 409) {
				// console.log(xhrHeadThumReq.status);
				// console.log('파일이 존재함');
				// } else {
				// console.log(xhrHeadThumReq.status);
				//
				// alert('첨부 파일 전송에 실패 하였습니다!');
				// return false;
				// }
				//
				// }
				//
				// }
				//
				// // /file end
				//
				// var messageDataResult = JSON.stringify(messageData);
				// console.log('메시시 발송 데이터');
				// console.log(messageDataResult);
				//
				// if (messageData.resendMaxCount) {
				// console.log('반복 있음');
				//
				// messageData.receivers.length = messageData.receivers.length *
				// 1;
				// messageData.resendMaxCount = messageData.resendMaxCount * 1;
				// sendCount = (messageData.receivers.length *
				// messageData.resendMaxCount)
				// + messageData.receivers.length
				//
				// } else {
				// sendCount = messageData.receivers.length;
				//
				// }
				//
				// if (sendCount == 0) {
				// alert('수신 대상자가 없습니다!');
				// return false;
				//
				// }
				//
				// if (messageData.reservationTime) {
				// if (confirm(messageData.receivers + " 해당 무전번호로 총 "
				// + sendCount + "건의 메시지가 예약전송 됩니다. 전송 하시겠습니까?") == true) {
				//
				// // msg-send-private-content-textarea
				// $('.remove').click();
				// $('#msg-send-private-user-target-show-input').val(
				// "");
				// $('#msg-send-private-content-textarea').val("");
				// $('#msg-send-private-length-strong').text("0");
				// $('#msg-send-private-reservation-date-input').val(
				// "");
				// $('#msg-send-private-repeat-cnt-select').val(0);
				// $('#msg-send-private-content-load-select').val(0);
				// $('#msg-send-private-repeat-time-input').val("");
				// $('#msg-send-private-user-repeat-check').prop(
				// 'checked', false);
				// $('#msg-send-private-length-max').val('140');
				// $('#msg-send-private-length-byte').val('byte');
				// $('#msg-send-private-content-textarea').css(
				// 'background-color', 'white');
				//
				// $('#msg-send-private-repeat-div').fadeOut();
				// $('#msg-send-private-content-load-select').val(0);
				// $('.remove').click();
				// // $('#msg-send-private-user-target-show-div')
				// // .fadeOut();
				// // msg-send-private-user-repeat-check
				//
				// } else {
				//
				// return false;
				// }
				// } else {
				// if (confirm(messageData.receivers + " 해당 무전번호로 총 "
				// + sendCount + "건의 메시지가 전송 됩니다. 전송 하시겠습니까?") == true) {
				// $('.remove').click();
				// $('#msg-send-private-user-target-show-input').val(
				// "");
				// $('#msg-send-private-content-textarea').val("");
				// $('#msg-send-private-length-strong').text("0");
				// $('#msg-send-private-reservation-date-input').val(
				// "");
				// $('#msg-send-private-repeat-cnt-select').val(0);
				// $('#msg-send-private-content-load-select').val(0);
				// $('#msg-send-private-repeat-time-input').val("");
				// $('#msg-send-private-user-repeat-check').prop(
				// 'checked', false);
				// $('#msg-send-private-length-max').val('140');
				// $('#msg-send-private-length-byte').val('byte');
				// $('#msg-send-private-content-textarea').css(
				// 'background-color', 'white');
				//
				// $('#msg-send-private-content-load-select').val(0);
				// $('.remove').click();
				// $('#msg-send-private-repeat-div').fadeOut();
				// // $('#msg-send-private-user-target-show-div')
				// // .fadeOut();
				// } else {
				//
				// return false;
				// }
				// }
				//
				// $.ajax({
				// url : '/v1/pms/adm/svc/messages',
				// type : 'POST',
				// headers : {
				// 'X-Application-Token' : token
				// },
				// contentType : "application/json",
				// dataType : 'json',
				// async : false,
				// data : messageDataResult,
				//
				// success : function(data) {
				//
				// if (!data.result.errors) {
				//
				// alert('메시지를 전송 하였습니다.');
				//
				// } else {
				//
				// alert('메시지 전송에 실패 하였습니다.');
				//
				// }
				//
				// },
				// error : function(data, textStatus, request) {
				// if (data.status == 401) {
				//
				// alert("사용시간이 경과되어 자동 로그아웃 됩니다.");
				//
				// sessionStorage.removeItem("easy-token");
				// sessionStorage.removeItem("easy-userId");
				// sessionStorage.removeItem("easy-role");
				//
				// sessionStorage.removeItem("easy-groupTopic");
				// sessionStorage.removeItem("easy-ufmi");
				// sessionStorage.removeItem("easy-userName");
				// pushRouter.navigate('login', {
				// trigger : true
				// });
				// return false;
				// }
				//
				// alert('메시지 전송에 실패 하였습니다.');
				//
				// }
				// });
				//
				// }

			},
			// 직접 입력 발송
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
					var messageTarget = [];
					$("#msg-send-group-user-target-select option").each(
							function() {
								messageTarget.push($(this).val());

							});

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

					// /file attache
					var fileName = document
							.getElementById("group-image-upload-input").value;

					var fileData = document
							.getElementById("group-image-upload-input").files[0];

					var userId = sessionStorage.getItem("easy-userId");
					if (fileName != null && fileData != null) {
						$('#group-fileprogress').show();
						if (confirm('첨부된 파일이 있습니다 파일을 업로드 하시겠습니까?') == true) {

							var fileFormat = fileName.substr(fileName
									.lastIndexOf('.') + 1);
							var replaceImageText = fileName
									.replace(/^.*\\/, "");

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
									$('#group-fileprogress').hide();

								} else {
									$('#group-fileprogress').hide();

									alert('첨부 파일 전송에 실패 하였습니다!');
									return false;
								}
							} else if (xhrHeadReq.status == 409) {
								$('#group-fileprogress').hide();

							} else {
								$('#group-fileprogress').hide();

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

									var thumbNail = $('#file-thumbnail').val();

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

									} else {

										alert('첨부 파일 전송에 실패 하였습니다!');
										return false;
									}
								} else if (xhrHeadThumReq.status == 409) {

								} else {

									alert('첨부 파일 전송에 실패 하였습니다!');
									return false;
								}

							}
						} else {
							$('#group-fileprogress').hide();
							$('.remove').click();
						}

					}

					// /file end

					var groupTopicCount = 0;
					var privateUfmi = 0;
					// 그룹 인원체크

					for ( var i in messageData.receivers) {

						if (messageData.receivers[i].indexOf("mms") > -1) {

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

					var sendCount = groupTopicCount + privateUfmi;
					var fileName = document
							.getElementById("group-image-upload-input").value;
					var fileData = document
							.getElementById("group-image-upload-input").files[0];
					var replaceImageText = fileName.replace(/^.*\\/, "");

					if (messageData.resendMaxCount) {

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

			// 직접 입력 발송 form check
			msgSendGroupFormCheck : function() {

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

			// 사용안함
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

			// 주소록 전송 form check
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

			// 주소록 발송
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

								} else {
									$('#fileprogress').hide();

									alert('첨부 파일 전송에 실패 하였습니다!');
									return false;
								}
							} else if (xhrHeadReq.status == 409) {
								$('#fileprogress').hide();

							} else {
								$('#fileprogress').hide();

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

									var thumbNail = $('#file-thumbnail').val();

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

									} else {

										alert('첨부 파일 전송에 실패 하였습니다!');
										return false;
									}
								} else if (xhrHeadThumReq.status == 409) {

								} else {

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

					var groupTopicCount = 0;
					var privateUfmi = 0;
					// 그룹 인원체크

					for ( var i in messageData.addressMessageArray) {
						if (messageData.addressMessageArray[i].receiver
								.indexOf("mms") != -1) {
							// 그룹 대상

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

						} else {
							console
									.log(messageData.addressMessageArray[i].receiver);
							privateUfmi++;
						}
					}
					var sendCount = groupTopicCount + privateUfmi;

					if (messageData.resendMaxCount) {

						messageData.resendMaxCount = messageData.resendMaxCount * 1;
						sendCount = (sendCount * messageData.resendMaxCount)
								+ sendCount;

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

								$('.remove').click();
								$('#msg-send-contact-private-cancel-btn')
										.click();

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

			// 엑셀 전송 form check
			msgSendExcelFormCheck : function() {
				var checkResult = this.excelHandDataCheck();

				if (checkResult == false) {
					return false;

				}

				var dataResult = this.handsonTableData.getData();
				var dataSize = 0;
				for ( var i in dataResult) {
					var ptalkVer = dataResult[i][0];
					var ufmiNum = dataResult[i][1];

					var name = dataResult[i][2];
					var item1 = dataResult[i][3];
					var item2 = dataResult[i][4];
					var item3 = dataResult[i][5];
					if ((ptalkVer == null || ptalkVer == "")
							&& (ufmiNum == null || ufmiNum == "")
							&& (name == null || name == "")
							&& (item1 == null || item1 == "")
							&& (item2 == null || item2 == "")
							&& (item3 == null || item3 == "")) {

					} else {
						dataSize++;
					}

				}

				if (dataSize == 0) {

					alert('엑셀 테이블에 전송할 대상 정보를 입력해주세요');
					return false;
				}

				var messageContent = $('#msg-send-excel-content-textarea')
						.val();
				var input_reservation = $(
						'#msg-send-excel-reservation-date-input').val();

				if (messageContent == null || messageContent == "") {
					alert("메세지 보낼 내용을 입력해주세요");
					$('#msg-send-excel-content-textarea').focus();
					return false;
				}

				var checkedLength = $('input[id="msg-send-excel-user-repeat-check"]:checked').length;
				if (checkedLength != 0) {
					var selectValue = $('#msg-send-excel-repeat-cnt-select')
							.val();

					if (selectValue == 0) {
						alert('반복 횟수를 입력해주세요!');
						$('#msg-send-excel-repeat-cnt-select').focus();
						return false;
					}

					var repeatValue = $('#msg-send-excel-repeat-time-input')
							.val();
					if (repeatValue == null || repeatValue == "") {
						alert('반복 시간을 입력해주세요!');
						$('#msg-send-excel-repeat-time-input').focus();
						return false;
					} else {
						repeatValue = repeatValue * 1;
						if (repeatValue > 1440) {
							alert('반복시간은 최대 24시간(1440)분을 넘을 수 없습니다!');
							$('#msg-send-excel-repeat-time-input').focus();
							return false;
						}
					}

				}

				if (input_reservation == null || input_reservation == "") {

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

			// 엑셀 발송
			msgSendExcel : function() {

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

				var input_resendCount = $('#msg-send-excel-repeat-cnt-select')
						.val();
				var input_resendInterval = $(
						'#msg-send-excel-repeat-time-input').val();

				var input_reservation = $(
						'#msg-send-excel-reservation-date-input').val();
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

				if (this.msgSendExcelFormCheck()) {

					var resultUfmi = "";
					var dataResult = this.handsonTableData.getData();
					for ( var i in dataResult) {
						var ptalkVer = dataResult[i][0];
						var ufmiNum = dataResult[i][1];

						var name = dataResult[i][2];
						var item1 = dataResult[i][3];
						var item2 = dataResult[i][4];
						var item3 = dataResult[i][5];
						if ((ptalkVer == null || ptalkVer == "")
								&& (ufmiNum == null || ufmiNum == "")
								&& (name == null || name == "")
								&& (item1 == null || item1 == "")
								&& (item2 == null || item2 == "")
								&& (item3 == null || item3 == "")) {

						} else {
							// 개별 번호
							ptalkVer = ptalkVer * 1;

							switch (ptalkVer) {
							case 1:
								resultUfmi = "82*" + ufmiNum;
								break;
							case 2:
								resultUfmi = "1*" + ufmiNum;
								break;

							default:
								break;
							}

							// 그룹 토픽

							var messageDataDetail = new Object();

							var messageContent = $(
									'#msg-send-excel-content-textarea').val();
							messageDataDetail.receiver = resultUfmi;

							if (messageContent.indexOf("$이름$") > -1) {
								messageContent = messageContent.replace('$이름$',
										name);
							}

							if (messageContent.indexOf("$항목1$") > -1) {
								messageContent = messageContent.replace(
										'$항목1$', item1);
							}
							if (messageContent.indexOf("$항목2$") > -1) {
								messageContent = messageContent.replace(
										'$항목2$', item2);
							}
							if (messageContent.indexOf("$항목3$") > -1) {
								messageContent = messageContent.replace(
										'$항목3$', item3);
							}

							if (messageContent.indexOf("null") > -1) {
								messageContent = messageContent.replace(
										/null/gi, '');
							}

							messageDataDetail.content = messageContent.trim();
							messageDataDetail.contentLength = messageDataDetail.content
									.Length();
							if (messageDataDetail.contentLength > 140) {

							} else {

							}

							messageDataDetail.content = pushUtil
									.utf8_to_b64(messageDataDetail.content);

							messageData.addressMessageArray
									.push(messageDataDetail);

						}

					}

					var repeatCount = 0;

					// /file attache
					var fileName = document
							.getElementById("excel-image-upload-input").value;

					var fileData = document
							.getElementById("excel-image-upload-input").files[0];

					var userId = sessionStorage.getItem("easy-userId");
					if (fileName != null && fileData != null) {
						$('#excel-fileprogress').show();
						if (confirm('첨부된 파일이 있습니다 파일을 업로드 하시겠습니까?') == true) {

							mmsCount = mmsCount + smsCount;
							smsCount = 0;

							var fileFormat = fileName.substr(fileName
									.lastIndexOf('.') + 1);
							var replaceImageText = fileName
									.replace(/^.*\\/, "");

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
									$('#excel-fileprogress').hide();

								} else {
									$('#excel-fileprogress').hide();

									alert('첨부 파일 전송에 실패 하였습니다!');
									return false;
								}
							} else if (xhrHeadReq.status == 409) {
								$('#excel-fileprogress').hide();

							} else {
								$('#excel-fileprogress').hide();

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

									var thumbNail = $('#file-thumbnail').val();

									if (thumbNail == null || thumbNail == "") {
										$('#excel-fileprogress').hide();
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

									} else {

										alert('첨부 파일 전송에 실패 하였습니다!');
										return false;
									}
								} else if (xhrHeadThumReq.status == 409) {

								} else {

									alert('첨부 파일 전송에 실패 하였습니다!');
									return false;
								}

							}
						} else {
							$('#excel-fileprogress').hide();
							$('.remove').click();
						}

					}

					// /file end

					var messageDataReq = JSON.stringify(messageData);

					var privateUfmi = messageData.addressMessageArray.length;

					// 그룹 인원체크

					var sendCount = privateUfmi;

					if (messageData.resendMaxCount) {

						messageData.resendMaxCount = messageData.resendMaxCount * 1;
						sendCount = (sendCount * messageData.resendMaxCount)
								+ sendCount;

					} else {

					}

					if (sendCount == 0) {
						alert('수신 대상자가 없습니다!');
						return false;

					}

					if (messageData.reservationTime) {

						if (confirm(sendCount + "건의 메시지가 예약 전송 됩니다. 전송 하시겠습니까?") == true) {

						} else {

							return false;
						}
					} else {

						if (confirm(sendCount + "건의 메시지가 전송 됩니다. 전송 하시겠습니까?") == true) {

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

								$('.remove').click();
								$('#msg-send-excel-cancel-btn').click();

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

			// 주소록 발송 내용 check
			checkContactContentArea : function() {

				var input_messageContent = $(
						'#msg-send-contact-private-content-textarea').val();
				input_messageContent = input_messageContent.trim();

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

			// 엑셀 발송 내용 check
			checkExcelContentArea : function() {
				var input_messageContent = $('#msg-send-excel-content-textarea')
						.val();
				input_messageContent = input_messageContent.trim();

				var strongLength = input_messageContent.Length();
				if (strongLength > 140) {
					$('#msg-send-excel-content-textarea').css(
							'background-color', '#ddd');
					$('#msg-send-excel-length-max').text("");
					$('#msg-send-excel-length-byte').text("MMS");
					$('#msg-send-excel-length-strong').text(strongLength);
				} else {
					$('#msg-send-excel-content-textarea').css(
							'background-color', 'white');
					$('#msg-send-excel-length-max').text("140");
					$('#msg-send-excel-length-byte').text("byte");
					$('#msg-send-excel-length-strong').text(strongLength);
				}

			},

			// 직접 입력 발송 내용 check
			checkGroupContentArea : function() {
				var input_messageContent = $('#msg-send-group-content-textarea')
						.val();
				input_messageContent = input_messageContent.trim();

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

			// 사용안함
			plusUfmiCheck : function() {
				// var ufmiVerCheck_radio = $(
				// 'input:radio[name="send-private-pnum-radio"]:checked')
				// .val();
				// var private_input = $('#send-private-input').val();
				// var fleep_bunch_input = $('#send-private-fleep-bunch-input')
				// .val();
				//
				// if (fleep_bunch_input == null || fleep_bunch_input == "") {
				// alert('번호 를 입력해주세요!');
				// $('#send-private-fleep-bunch-input').focus();
				// return false;
				// }
				// if (private_input == null || private_input == "") {
				// alert('번호를 입력해주세요!');
				// $('#send-private-input').focus();
				// return false;
				// }
				//
				// if (fleep_bunch_input.substring(0, 1) == "0"
				// && fleep_bunch_input.length > 1) {
				// alert('번호 첫자리는 0을 입력할수 없습니다.');
				// $('#send-private-fleep-bunch-input').focus();
				// return false;
				// }
				//
				// if (private_input.substring(0, 1) == "0"
				// && private_input.length > 1) {
				// alert('번호 첫자리는 0을 입력할수 없습니다.');
				// $('#send-private-input').focus();
				// return false;
				// }
				//
				// var ufmiResult = ufmiVerCheck_radio + "*" + fleep_bunch_input
				// + "*" + private_input;
				//
				// console.log('무전번호 결과');
				// console.log(ufmiResult);
				//
				// $('#msg-send-private-user-target-show-div').show();
				// var showInputVal =
				// $('#msg-send-private-user-target-show-input')
				// .val();
				// if (showInputVal == "" || showInputVal == null) {
				// $('#msg-send-private-user-target-show-input').val(
				// showInputVal + ufmiResult);
				// } else {
				// $('#msg-send-private-user-target-show-input').val(
				// showInputVal + "," + ufmiResult);
				// }
				// $('#send-private-input').val("");
			},

			// 사용안함
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

			// 직접 입력 발송 plus
			plusGroupTopicCheck : function() {

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

					$('#msg-send-group-user-target-show-div').show();

					$('#msg-send-group-user-target-select').append(
							'<option value=' + ufmiResult + '>' + userText
									+ '</option>');

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
					userText = userText + "그룹" + private_input + "("
							+ fleep_bunch_input + ")";

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

								if (data.result.data != 0) {
									checkTopic = true;
								} else {

									alert(userText + "는 수신자가 없는 그룹입니다.");
									return false;
								}

							} else {

								alert(userText + "는 수신자가 없는 그룹입니다.");
								return false;

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

			// 직접 입력 발송 input check
			checkSendGroupInput : function() {

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
			// 사용안함
			checkSendPrivateInput : function() {
				// console.log('asdf');
				// var num_check = /^[0-9]*$/;
				// var private_input = $("#send-private-input").val();
				// var ufmiVerCheck_radio = $(
				// 'input:radio[name="send-private-pnum-radio"]:checked')
				// .val();
				//
				// if (ufmiVerCheck_radio == "1") {
				// $("#send-private-input").attr('maxlength', '4');
				// } else {
				// $("#send-private-input").attr('maxlength', '6');
				// }
				//
				// if (!num_check.test(private_input)) {
				// alert('숫자 만 입력 가능합니다!');
				// $("#send-private-input").focus();
				// return false;
				// }

			},
			// 직접 입력 발송 input check
			checkSendGroupBunchInput : function() {

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

			// 사용안함
			checkSendBunchInput : function() {
				// console.log('fikfkfkf');
				// var num_check = /^[0-9]*$/;
				// // resend-fleep-bunch-input
				// var fleep_bunch_input = $("#send-private-fleep-bunch-input")
				// .val();
				// var ufmiVerCheck_radio = $(
				// 'input:radio[name="send-private-pnum-radio"]:checked')
				// .val();
				//
				// if (ufmiVerCheck_radio == "1") {
				// $("#send-private-fleep-bunch-input").attr('maxlength', '4');
				// } else {
				// $("#send-private-fleep-bunch-input").attr('maxlength', '6');
				// }
				// if (!num_check.test(fleep_bunch_input)) {
				// alert('숫자 만 입력 가능합니다!');
				// $("#send-private-fleep-bunch-input").focus();
				// return false;
				// }

			},
			// 주소록 발송 반복 체크
			msgRepeatCheckContact : function() {
				var checkedLength = $('input[id="msg-send-contact-private-user-repeat-check"]:checked').length;
				if (checkedLength == 0) {

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

			// 엑셀 발송 반복 체크
			msgExcelRepeatCheck : function() {
				var checkedLength = $('input[id="msg-send-excel-user-repeat-check"]:checked').length;
				if (checkedLength == 0) {

					$('#msg-send-excel-repeat-div').hide();
					$('#msg-send-excel-repeat-cnt-select').val(0);
					$('#msg-send-excel-repeat-time-input').val("");

					return false;
				} else {
					$('#msg-send-excel-repeat-div').show();
					$('#msg-send-excel-repeat-time-input').prop('disabled',
							false);

					return false;
				}
			},

			// 직접 입력 발송 반복 체크
			msgGroupRepeatCheck : function() {
				var checkedLength = $('input[id="msg-send-group-user-repeat-check"]:checked').length;
				if (checkedLength == 0) {

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

			// 엑셀 테이블 div
			container : {

			},

			// 엑셀 테이블 사이즈 체크
			calculateSize : function() {
				var offset;

				offset = Handsontable.Dom.offset(this.container);
				availableWidth = Handsontable.Dom.innerWidth(document.body)
						- offset.left + window.scrollX;
				availableHeight = Handsontable.Dom.innerHeight(document.body)
						- offset.top + window.scrollY;

				this.container.style.width = availableWidth + 'px';
				this.container.style.height = availableHeight + 'px';

			},
			// 엑셀 테이블
			handsonTableData : {

			},

			// 메시지 전송 화면 생성
			render : function() {

				var that = this;
				$
						.get(
								'pages/js/template/push_msg_send_template.html',
								function(data) {
									var template = _.template(data, {});
									that.$el.html(template);

									that.container = document
											.getElementById('excel-handson');
									that.handsonTableData = new Handsontable(
											that.container,
											{

												rowHeaders : true,
												startCols : 6,
												minSpareRows : 25,

												colHeaders : [
														'<i class="ace-icon blue" data-tooltip="tooltip" data-placement="bottom" title="PTalk 버전 1.0 은 숫자 1,버전2.0은 숫자 2입력">Ptalk유형</i> <i class="ace-icon fa fa-question-circle blue" data-tooltip="tooltip" data-placement="bottom" title="PTalk 버전 1.0 은 숫자 1,버전2.0은 숫자 2입력"></i>',
														'<i class="ace-icon blue" data-tooltip="tooltip" data-placement="bottom" title="50*1234 형태로입력">무전번호</i> <i class="ace-icon fa fa-question-circle blue" data-tooltip="tooltip" data-placement="bottom" title="50*1234 형태로입력"></i>',
														"이름", "항목1", "항목2",
														"항목3" ],
												colWidths : [ 100, 100, 100,
														100, 100, 100 ],
												contextMenu : [ 'row_below',
														'remove_row' ],
												fixedColumnsLeft : 3,
												manualColumnFreeze : true,
												nativeScrollbars : true

											});

									$('#contact-image-upload-input')
											.ace_file_input({
												no_file : 'No File ...',
												btn_choose : 'Choose',
												btn_change : 'Change',
												droppable : false,
												onchange : null,
												thumbnail : false,

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

												onchange : ''

											});
									$('#excel-image-upload-input')
											.ace_file_input({
												no_file : 'No File ...',
												btn_choose : 'Choose',
												btn_change : 'Change',
												droppable : false,
												onchange : null,
												thumbnail : false,

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

												onchange : ''

											});
									var nowDate = new Date();
									var today = new Date(nowDate.getFullYear(),
											nowDate.getMonth(), nowDate
													.getDate(), 0, 0, 0, 0);
									var today_30 = new Date(nowDate
											.getFullYear(), nowDate.getMonth(),
											nowDate.getDate() + 30, 0, 0, 0, 0);
									$('#msg-send-excel-reservation-div')
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

														if (dataResult.length > 0) {

															for ( var i in dataResult) {
																dataResult[i].templateMsg = pushUtil
																		.utf8_to_b64(dataResult[i].templateMsg);

																$(
																		"#msg-send-excel-content-load-select")
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

														} else {

														}

													} else {

													}

												},
												error : function(data,
														textStatus, request) {

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
															console
																	.log(resultData);
															// 그룹
															if (resultData[i].ufmi
																	.indexOf("mms") > -1) {

																var topicArr = [];
																topicArr = resultData[i].ufmi
																		.split('/');

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
																} else if (resultData[i].ufmi
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

																		item4 : '<a class="green " name="editContactBtn" data-target="#contact-edit-modal"   data-tooltip="tooltip" data-toggle="modal" title="수정"><i class="ace-icon fa fa-pencil bigger-130"></i></a> &nbsp;<a name="name-contact-delete-a" class="red" data-tooltip="tooltip" data-toggle="modal" title="삭제"><i class="ace-icon fa fa-trash-o bigger-130"></i></a>',
																		hiddenUfmi : hiddenUfmi
																	});

														}
													} else {
														alert('주소록을 읽기에 실패하였습니다.');

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
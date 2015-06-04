window.ADF = window.ADF || {};
ADF.PushMsgListView = Backbone.View
		.extend({

			// defaultContent": "<button>Click!</button>"
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
				"click #modal-footer-cancel" : "modalFooterClick"

			// "click #msg-list-detail-btn":"getDetailList"
			},

			initialize : function() {
				_.bindAll(this, 'render', 'beforeRender', 'afterRender',
						'monthDatePickerChange', 'changeDateInput',
						'searchSelectChange', 'searchFormCheck', "csvFileDown",
						"checkPrivateInput", "msgResendModal",
						"confirmDetailTable", "getDetailList",
						"checkBunchInput", "replusUfmiCheck", "msgResend",
						"resendFormCheck", "modalFooterClick",
						"modalHeaderClick");
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

			},

			msgListTable : {

			},

			modalFooterClick : function() {
				$('#msg-resend-user-target-show-div').hide();
				$('#msg-resend-user-target-show-input').val("");
			},

			modalHeaderClick : function() {
				$('#msg-resend-user-target-show-div').hide();
				$('#msg-resend-user-target-show-input').val("");

			},

			msgResend : function() {

				var userName = sessionStorage.getItem('userName');
				if (userName == null || userName == "" || userName == "null") {
					alert('발송번호를 등록해야 정상 사용이 가능합니다.!');
					pushRouter.navigate('user_info', {
						trigger : true
					});
					return false;
				}
				if (this.resendFormCheck()) {

					var messageTarget = $('#msg-resend-user-target-show-input')
							.val();
					messageTarget = pushUtil.compactTrim(messageTarget);
					var messageContent = $('#msg-resend-content-textarea')
							.val();

					messageContent = pushUtil.utf8_to_b64(messageContent);
					messageTarget = messageTarget.split(",");
					// console.log('메지시 수신자 변경');
					// messageTarget[0] = 'mms/P1/82/50/g130';
					var messageData = new Object();
					messageData.receivers = messageTarget;
					messageData.content = messageContent;
					messageData.contentType = "application/base64";

					// end 전송대상 체크

					var contentLength = $('#msg-resend-length-strong').text();
					messageData.contentLength = contentLength;
					console.log('메시지 전송전 길이');
					console.log(messageData.contentLength);

					var messageDataResult = JSON.stringify(messageData);

					/*
					 * if (utf8ByteLength(messageDataResult) > 512000) {
					 * alert('메시지 사이즈가 너무 큽니다.'); return false; }
					 */
					var sendCount = messageData.receivers.length;
					var token = sessionStorage.getItem("token");
					if (confirm(messageData.receivers + " 해당 무전번호로 총 "
							+ sendCount + "건의 메시지가 전송 됩니다. 전송 하시겠습니까?") == true) {
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

					} else {

					}

				}

			},
			resendFormCheck : function() {
				var messageTarget = $('#msg-resend-user-target-show-input')
						.val();
				messageTarget = pushUtil.compactTrim(messageTarget);
				var messageContent = $('#msg-resend-content-textarea').val();

				if (messageTarget == null || messageTarget == "") {
					alert("+ 버튼을 눌러 무전번호를 추가해 주세요!");
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
			checkContentArea : function() {
				var input_messageContent = $('#msg-resend-content-textarea')
						.val();
				input_messageContent = input_messageContent.trim();
				console.log(input_messageContent.Length());
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
			checkPrivateInput : function() {
				console.log('asdf');
				var num_check = /^[0-9]*$/;
				var private_input = $("#resend-private-input").val();
				var ufmiVerCheck_radio = $(
						'input:radio[name="resend-pnum-radio"]:checked').val();

				if (ufmiVerCheck_radio == "01") {
					$("#resend-private-input").attr('maxlength', '4');
				}

				if (!num_check.test(private_input)) {
					alert('숫자 만 입력 가능합니다!');
					$("#resend-private-input").focus();
					return false;
				}
			},
			checkBunchInput : function() {
				console.log('fikfkfkf');
				var num_check = /^[0-9]*$/;
				// resend-fleep-bunch-input
				var fleep_bunch_input = $("#resend-fleep-bunch-input").val();
				var ufmiVerCheck_radio = $(
						'input:radio[name="resend-pnum-radio"]:checked').val();

				if (ufmiVerCheck_radio == "1") {
					$("#resend-fleep-bunch-input").attr('maxlength', '4');
				}
				if (!num_check.test(fleep_bunch_input)) {
					alert('숫자 만 입력 가능합니다!');
					$("#resend-fleep-bunch-input").focus();
					return false;
				}
			},

			replusUfmiCheck : function() {
				var ufmiVerCheck_radio = $(
						'input:radio[name="resend-pnum-radio"]:checked').val();
				var private_input = $('#resend-private-input').val();
				var fleep_bunch_input = $('#resend-fleep-bunch-input').val();

				if (fleep_bunch_input == null || fleep_bunch_input == "") {
					alert('fleep번호 또는 bunch 번호 를 입력해주세요!');
					$('#resend-fleep-bunch-input').focus();
					return false;
				}
				if (private_input == null || private_input == "") {
					alert('개별 번호를 입력해주세요!');
					$('#resend-private-input').focus();
					return false;
				}

				var ufmiResult = ufmiVerCheck_radio + "*" + fleep_bunch_input
						+ "*" + private_input;

				console.log('무전번호 결과');
				console.log(ufmiResult);

				$('#msg-resend-user-target-show-div').show();
				var showInputVal = $('#msg-resend-user-target-show-input')
						.val();
				if (showInputVal == "" || showInputVal == null) {
					$('#msg-resend-user-target-show-input').val(
							showInputVal + ufmiResult);
				} else {
					$('#msg-resend-user-target-show-input').val(
							showInputVal + "," + ufmiResult);
				}
				$('#resend-private-input').val("");
			},

			msgResendModal : function(e) {
				console.log('이벤트 발생');
				console.log(e.target);
				var aData = msgListTable.fnGetData($(e.target).parents('tr')); // fails
				console.log(aData);

				var messageListContent = "";
				var receiver_split = aData.receiver.split('*');
				if (receiver_split[0] == "82") {
					$('input:radio[id="resend-pnum-p1-radio"]').attr("checked",
							true);
				} else {
					$('input:radio[id="resend-pnum-p2-radio"]').attr("checked",
							true);
				}
				$('#resend-fleep-bunch-input').val(receiver_split[1]);
				$('#resend-private-input').val(receiver_split[2]);

				messageListContent = aData.contentType;
				console.log('메시지 내용입니다.');
				console.log(messageListContent);

				/*
				 * <p id="msg-resend-length-p"> <strong
				 * id="msg-resend-length-strong">0</strong>/<span
				 * id="msg-resend-length-max">140</span><span
				 * id="msg-resend-length-byte">byte</span>
				 * 
				 * </p>
				 */

				$('#msg-resend-content-textarea').val(messageListContent);
				// $('#msg-resend-length-p').show();
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

				// $('#remessage-send-serviceid').val(clickData.serviceId);

			},

			confirmDetailTable : function() {
				$('#msg-list-detail-div').hide();
			},

			getDetailList : function(e) {
				console.log('이벤트 발생');
				console.log(e.target);
				var aData = msgListTable.fnGetData($(e.target).parents('tr')); // fails
				$('#msg-list-detail-div').show();
				$("#msg-list-detail-div").attr("tabindex", -1).focus(
						function() {
							$(this).parent('div').css('background-color',
									'white');
						});
				$('#msg-list-detail-div').focus();

				console.log(aData.msgId);
				var reqMsgId = aData.msgId;
				var reqMonth = $('#msg-list-month-date-input').val();
				var splitMonth = reqMonth.split('/');
				reqMonth = splitMonth[0] + splitMonth[1];
				console.log(reqMonth);

				var token = sessionStorage.getItem('token');
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
							console.log('ajax 호출');
							console.log(data.result.data.data);
							var resultData = data.result.data.data;
							if (resultData.length == 0) {
								$('#msg-list-detail-div').hide();
								alert('상세 내용이 없습니다.');
								return false;
							}
							for ( var i in resultData) {
								console.log(resultData[i].pmaAckType);

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
									receiver : resultData[i].receiver,
									pmaAckType : resultData[i].pmaAckType,
									pmaAckTime : resultData[i].pmaAckTime,
									appAckType : resultData[i].appAckType,
									appAckTime : resultData[i].appAckTime

								});

							}
						} else {
							alert('상세조회에 실패 하였습니다.');
							console.log(data);
						}

					},
					error : function(data) {
						if (data.status == 401) {
							alert("사용시간이 경과되어 자동 로그아웃 됩니다.");
							sessionStorage.removeItem("token");
							sessionStorage.removeItem("userId");
							sessionStorage.removeItem("role");
							sessionStorage.removeItem("monitoringStatus");
							sessionStorage.removeItem("groupTopic");
							sessionStorage.removeItem("ufmi");
							sessionStorage.removeItem("userName");
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
						mData : 'receiver',
						"sWidth" : "10%"
					}, {
						mData : 'pmaAckType',
						"sWidth" : "20%"
					}, {
						mData : 'pmaAckTime',
						"sWidth" : "25%"
					}, {
						mData : 'appAckType',
						"sWidth" : "20%"
					}, {
						mData : 'appAckTime',
						"sWidth" : "25%"
					} ]
				});

				detailTable.fnDestroy();
			},

			// parents messageTable.fnGetData($(this).parents('tr'));

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

						var requestUrl = '?';
						var csvCSearchStatus = "";
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
									.dateFormating(searchDateStart);
							if (searchDateStart) {
								searchDateStart = searchDateStart.toISOString();
								requestUrl = requestUrl + '&cSearchDateStart='
										+ searchDateStart;
							}
						}

						if (searchDateEnd != "") {
							searchDateEnd = pushUtil
									.dateFormating(searchDateEnd);

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
										a.href = 'data:attachment/csv,'
												+ encodeURI(xmlhttp.responseText);
										document.body.appendChild(a);
										var evObj = document
												.createEvent('MouseEvents');
										evObj.initMouseEvent('click', true,
												true, window);
										a.dispatchEvent(evObj);
									} else {

										var a = document.createElement('a');
										a.href = 'data:attachment/csv,'
												+ encodeURI(xmlhttp.responseText);
										a.target = '_blank';
										a.download = 'message.csv';
										document.body.appendChild(a);
										a.click();
									}

								}

							} else if (xmlhttp.status == 401) {
								alert("사용시간이 경과되어 자동 로그아웃 됩니다.");
								sessionStorage.removeItem("token");
								sessionStorage.removeItem("userId");
								sessionStorage.removeItem("role");
								sessionStorage.removeItem("monitoringStatus");
								sessionStorage.removeItem("groupTopic");
								sessionStorage.removeItem("ufmi");
								sessionStorage.removeItem("userName");
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
						var token = sessionStorage.getItem("token");
						xmlhttp.open("GET", '/v1/pms/adm/svc/messages/csv'
								+ requestUrl, true);
						xmlhttp.setRequestHeader("X-Application-Token", token);
						xmlhttp.send();

					}

				} else {
					alert('다운로드는 10000개의 목록 까지만 가능합니다.');
					return false;
				}

			},

			searchBtnClick : function() {
				var formCheck = this.searchFormCheck();
				if (formCheck) {
					msgListTable.fnFilter();
				}
			},

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
				searchDateStart = pushUtil.dateFormating(searchDateStart);

				if (typeof searchDateStart === undefined
						|| typeof searchDateStart === 'undefined') {
					searchDateStart = "";
				}

				var searchDateEnd = $('#msg-list-end-date-input').val();

				searchDateEnd = pushUtil.dateFormating(searchDateEnd);
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
							alert('같은 달에서만 검색이 가능합니다');
							return false;
						} else {
							return true;
						}

					}

				}
			},

			searchSelectChange : function() {
				var selectOptionValue = $('#msg-list-search-select').val();
				selectOptionValue = selectOptionValue * 1;
				switch (selectOptionValue) {

				// 선택
				case 0:
					$('#msg-list-search-content-div').hide();
					$('#msg-list-ack-status-div').hide();
					$('#msg-list-send-status-div').hide();
					$('#msg-list-search-input').prop('disabled', true);
					break;

				// 발송상태
				case 1:
					$('#msg-list-search-content-div').hide();
					$('#msg-list-ack-status-div').hide();
					$('#msg-list-send-status-div').show();
					$('#msg-list-search-input').prop('disabled', true);
					break;
				// 수신번호
				case 2:
					$('#msg-list-search-content-div').show();
					$('#msg-list-ack-status-div').hide();
					$('#msg-list-send-status-div').hide();
					$('#msg-list-search-input').prop('disabled', false);
					break;

				// 응답상태
				case 3:
					$('#msg-list-search-content-div').hide();
					$('#msg-list-ack-status-div').show();
					$('#msg-list-send-status-div').hide();
					$('#msg-list-search-input').prop('disabled', true);
					break;
				default:

					break;
				}

			},

			monthDatePickerChange : function() {
				console.log('월선택 체인지..펑션');
				setTimeout(this.changeDateInput, 500);
			},

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

			render : function() {
				console.log("msg list view render..");
				var that = this;
				var token = sessionStorage.getItem("token");
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
														format : "YYYY/MM/DD hh:mm a",
														defaultDate : pushUtil
																.getCurrentDayF(),
														minDate : pushUtil
																.getCurrentDayF(),
														maxDate : pushUtil
																.getCurrentDayL()

													});

									$('#msg-list-end-date-time-picker-div')
											.datetimepicker(
													{
														format : "YYYY/MM/DD hh:mm a",
														defaultDate : pushUtil
																.getCurrentDayL(),
														minDate : pushUtil
																.getCurrentDayF(),
														maxDate : pushUtil
																.getCurrentDayL()
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
														/*
														 * <th>발송시간</th> <th>수신번호</th>
														 * <th>발송상태</th> <th>반복시간</th>
														 * <th>반복횟수</th> <th>내용</th>
														 * 
														 * <th></th>
														 */
														'columns' : [
																{
																	"data" : "updateTime",
																	'sClass' : 'one-line'
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
																	"data" : null,
																	"defaultContent" : '<button type="button" id="msg-list-detail-btn" class="btn btn-xs btn-white">상세보기</button>&nbsp;<button id="msg-list-resend-btn" data-target="#msg-resend-modal" class="btn btn-xs btn-white" data-toggle="modal">재전송 </button>'
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
																				console
																						.log('데이터 result');
																				console
																						.log(messageListResult);
																				$(
																						'#msg-list-excel-cnt')
																						.val(
																								data.result.data.recordsTotal);
																				for ( var i in dataResult) {
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

																		},

																		error : function(
																				data) {
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
															console.log('월선택');
															console
																	.log(messageMonth);
															searchSelectValue = searchSelectValue * 1;

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
																console
																		.log('이푸');
															}

															console.log('월월월');
															console
																	.log(messageMonth);
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
																		.dateFormating(searchDateStart);
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
																		.dateFormating(searchDateEnd);

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
								}, 'html');

			}

		});
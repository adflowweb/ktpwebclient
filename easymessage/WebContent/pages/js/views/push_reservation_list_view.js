window.ADF = window.ADF || {};
ADF.PushReservationListView = Backbone.View
		.extend({
			events : {
				"click #reservation-cancel-btn" : "reservationCancel",
				"click #reservation-search-btn" : "reservationSearch",
				"click #reservaton-checkbox-id" : "reservationCheckbox",
				"click #reservation-reset-btn" : "resetSearch",
				"change #reservation-search-select" : "searchSelectChange"
			},

			initialize : function() {
				_.bindAll(this, 'render', 'beforeRender', 'afterRender',
						'reservationCancel', 'reservationSearch',
						'searchFormCheck', 'reservationCheckbox');
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

				console.log('예약 리스트');
				$('#sidebar-shortcuts').show();
				$('#sidebar-ul-list').show();
				$('#login-user-info-div').show();
				var userId = sessionStorage.getItem('easy-userId');
				$('#user-id-span').text(userId);

			},
			afterRender : function() {
				console.log('after render..');

			},

			reservationListTable : {

			},

			searchSelectChange : function() {
				console.log('change select..');
				var selectOptionValue = $('#reservation-search-select').val();
				selectOptionValue = selectOptionValue * 1;
				if (selectOptionValue == 1) {
					$('#reservation-search-input').prop('disabled', false);
					$('#reservation-search-div').show();
					$("#reservation-search-ptalk-div").show();

				} else {
					$('#reservation-search-input').prop('disabled', true);
					$('#reservation-search-input').val("");
					$('#reservation-search-div').hide();
					$("#reservation-search-ptalk-div").hide();
				}
			},

			resetSearch : function() {
				$('#reservation-search-select').val("0").attr("selected",
						"selected");
				$('#reservation-search-input').val("");
				$('#reservation-search-input').prop('disabled', true);
			},

			reservationCancel : function() {
				var that = this;
				var checkedLength = $('input[name="reservatoin-checkbox"]:checked').length;
				var token = sessionStorage.getItem("easy-token");
				if (checkedLength == 0) {
					alert('취소할 메시지를 선택해주세요');
					return false;
				} else {
					var reservationReq = new Object();
					reservationReq.msgIds = new Array();
					$('input[name="reservatoin-checkbox"]:checked').each(
							function() {

								if (this.value != "on") {

									reservationReq.msgIds.push(this.value);
								}
							});

					if (reservationReq.msgIds.length == 0) {
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
								alert("예약 메시지 취소에 실패 하였습니다.");

							}
						});

					} else {
						return false;
					}

				}

			},

			reservationSearch : function() {

				var formCheck = this.searchFormCheck();

				if (formCheck) {
					reservationListTable.fnFilter();
				} else {

				}

			},

			reservationCheckbox : function() {
				console.log('asdf');
				checkboxes = document.getElementsByName('reservatoin-checkbox');
				for (var i = 0, n = checkboxes.length; i < n; i++) {
					if (checkboxes[i].checked == true) {
						checkboxes[i].checked = false;
					} else {
						checkboxes[i].checked = true;
					}

				}
			},

			searchFormCheck : function() {

				var selectOptionValue = $('#reservation-search-select').val();
				var inputSearchValue = $('#reservation-search-input').val();
				var defaultMonth = $('#reservation-date-input').val();

				if (defaultMonth.substring(5, 6) == 0) {
					defaultMonth = defaultMonth.substring(6);
					defaultMonth = defaultMonth - 1;

				} else {
					defaultMonth = defaultMonth.substring(5);
					defaultMonth = defaultMonth - 1;
				}

				if (selectOptionValue == 1) {
					if (inputSearchValue == null || inputSearchValue == "") {
						alert('검색할 내용을 입력해 주세요');
						$('#reservation-search-input').focus();
						return false;
					}
				}

				return true;

			},

			render : function() {
				console.log("reservation view  render..");
				var that = this;
				var token = sessionStorage.getItem("easy-token");

				$
						.get(
								'pages/js/template/push_reservation_list_template.html',
								function(data) {
									var template = _.template(data, {});
									that.$el.html(template);
									$('#reservation-date-time-picker')
											.datetimepicker({
												viewMode : 'years',
												format : 'YYYY/MM',
												minViewMode : "months",
												pickTime : false
											});
									reservationListTable = $(
											'#reservation-list-table')
											.dataTable(
													{
														'bSort' : false,
														'bServerSide' : true,
														'bFilter' : false,
														"pageLength" : 25,
														"bScrollCollapse" : true,
														"autoWidth" : true,
														"scrollX" : true,
														"oLanguage" : {
															"oPaginate" : {
																"sFirst" : "처음",
																"sLast" : "끝",
																"sNext" : "다음",
																"sPrevious" : "이전"
															}
														},
														'columns' : [
																{
																	"data" : "reservationTime"
																},
																{
																	"data" : "retained"
																},

																{
																	"data" : "receiver"
																},
																{
																	"data" : "content"
																},
																{
																	"data" : "contentType",
																	"visible" : false
																},
																{
																	"data" : "msgId",
																	"visible" : false
																} ],
														'sPaginationType' : 'full_numbers',
														'sAjaxSource' : '/v1/pms/adm/svc/messages/reservations',
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

																				var dataResult = data.result.data.data;

																				if (dataResult.length == 0) {
																					$(
																							"#reservaton-checkbox-id")
																							.hide();
																					$(
																							'#reservation-cancel-div')
																							.hide();
																				} else {
																					reservationListResult = dataResult;
																					$(
																							'#reservation-cancel-div')
																							.show();
																					$(
																							"#reservaton-checkbox-id")
																							.show();
																				}
																				$(
																						'#reservationListCnt_div')
																						.text(
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
																					if (dataResult[i].issueName == null) {
																						dataResult[i].issueName = dataResult[i].updateId;
																					}

																					var dateTime = dataResult[i].reservationTime;

																					if (dateTime != null) {
																						dataResult[i].reservationTime = '<input name="reservatoin-checkbox" type="checkbox" value="'
																								+ dataResult[i].msgId
																								+ '"/>&nbsp;'
																								+ new Date(
																										dateTime)
																										.toLocaleString();
																					}
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
																	'#reservation-search-select')
																	.val();
															var searchSelectText = $(
																	'#reservation-search-select option:selected')
																	.text();
															var searchInputValue = $(
																	'#reservation-search-input')
																	.val();
															var messageMonth = $(
																	'#reservation-date-input')
																	.val();
															var searchSelectPtalk = $(
																	'#reservation-search-ptalk-select')
																	.val();

															searchSelectValue = searchSelectValue * 1;

															if (searchInputValue != "") {
																console
																		.log('검색 수신번호 내용');
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
															case 1:
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
																		'#reservation-date-input')
																		.val(
																				messageMonth);
															}

															var reservationStartDate = "";
															var reservationEndDate = "";
															var reservationMonth = messageMonth
																	.split('/');

															reservationStartDate = new Date(
																	reservationMonth[0],
																	reservationMonth[1] - 1,
																	1)
																	.toISOString();
															reservationEndDate = new Date(
																	reservationMonth[0],
																	reservationMonth[1],
																	0)
																	.toISOString();
															console
																	.log('예약메시지 시작 끝');
															console
																	.log(reservationStartDate);
															console
																	.log(reservationEndDate);
															messageMonth = messageMonth
																	.replace(
																			"/",
																			"");

															aoData
																	.push({
																		'name' : 'cSearchDateStart',
																		'value' : reservationStartDate
																	});
															//					
															aoData
																	.push({
																		'name' : 'cSearchDateEnd',
																		'value' : reservationEndDate
																	});
														}
													});
								}, 'html');
			}

		});
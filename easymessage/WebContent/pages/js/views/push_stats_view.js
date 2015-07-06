window.ADF = window.ADF || {};
// 통계 뷰
ADF.PushStatsView = Backbone.View.extend({
	// 통계 이벤트 목록
	events : {
		"dp.change #msg-stats-date-time-picker-div" : "statsDatePickerChange",
		"click #msg-stats-search-btn" : "clickStatsSearch"
	},

	initialize : function() {
		_.bindAll(this, 'render', 'beforeRender', 'afterRender',
				'statsDatePickerChange', 'clickStatsSearch',
				'clickStatsSearchFormCheck');
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

	// 통계 날짜 변경 이벤트
	statsDatePickerChange : function() {
		setTimeout(this.statsChangeDateInput, 500);
	},
	// 통계 검색 form check
	clickStatsSearchFormCheck : function() {
		var searchDateStart = $('#msg-stats-start-date-input').val();
		var searchDateEnd = $('#msg-stats-end-date-input').val();
		var inputMonthValue = $('#msg-stats-month-date-input').val();
		searchDateStart = pushUtil.dateFormatingStart(searchDateStart);
		inputMonthValue = pushUtil.compactTrim(inputMonthValue);

		if (inputMonthValue == null | inputMonthValue == "") {
			alert('검색할 기간 입력해 주세요');
			return false;
		}
		if (inputMonthValue.substring(5, 6) == 0) {
			inputMonthValue = inputMonthValue.substring(6);
			inputMonthValue = inputMonthValue - 1;

		} else {
			inputMonthValue = inputMonthValue.substring(5);
			inputMonthValue = inputMonthValue - 1;
		}

		if (typeof searchDateStart === undefined
				|| typeof searchDateStart === 'undefined') {

			searchDateStart = "";
		}

		searchDateEnd = pushUtil.dateFormatingEnd(searchDateEnd);
		if (typeof searchDateEnd === undefined
				|| typeof searchDateEnd === 'undefined') {

			searchDateEnd = "";
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
						&& inputMonthValue === searchDateEnd.getMonth()
						&& inputMonthValue === searchDateStart.getMonth()) {

					return true;
				} else {
					return true;
				}

			}

		}
	},

	// 통계 검색
	clickStatsSearch : function() {
		$('#stats-reservation-div').fadeIn();
		$('#stats-div').fadeIn();
		var token = sessionStorage.getItem('easy-token');
		if (this.clickStatsSearchFormCheck()) {
			var input_month_value = $('#msg-stats-month-date-input').val();
			input_month_value = input_month_value.replace("/", "");

			var searchDateStart = $('#msg-stats-start-date-input').val();
			var searchDateEnd = $('#msg-stats-end-date-input').val();
			var ajaxUrl = "";

			if (searchDateStart != "") {
				searchDateStart = pushUtil.dateFormatingStart(searchDateStart);
				searchDateEnd = pushUtil.dateFormatingEnd(searchDateEnd);
				searchDateStart = searchDateStart.toISOString();
				searchDateEnd = searchDateEnd.toISOString();
				ajaxUrl = '/v1/pms/adm/svc/messages/summary/'
						+ input_month_value + "?cSearchDateStart="
						+ searchDateStart + "&cSearchDateEnd=" + searchDateEnd;
			} else {

				ajaxUrl = '/v1/pms/adm/svc/messages/summary/'
						+ input_month_value;
			}
			var statsTable, statsReservationTable = "";

			$.ajax({
				url : ajaxUrl,
				type : 'GET',
				contentType : "application/json",
				headers : {
					'X-Application-Token' : token
				},
				dataType : 'json',

				async : false,
				success : function(data) {

					if (!data.result.errors) {
						var dataResult = data.result.data;

						var monthTableData = new Array();
						var monthTableDataRes = new Array();
						var statusD99Cnt = 0;
						var statusD2Cnt = 0;
						var statusD1Cnt = 0;
						var statusP0Cnt = 0;
						var statusP1Cnt = 0;
						var statusP2Cnt = 0;
						var totalMsgCnt = 0;
						var tms = 0;
						var mms = 0;

						var appAck = 0;
						var pmaAck = 0;
						var statusRD99Cnt = 0;
						var statusRD2Cnt = 0;
						var statusRD1Cnt = 0;
						var statusRP0Cnt = 0;
						var statusRP1Cnt = 0;
						var statusRP2Cnt = 0;
						var totalMsgCntR = 0;
						var appAckR = 0;
						var pmaAckR = 0;
						for ( var i in data.result.data) {
							var successData = data.result.data[i];

							switch (dataResult[i].status) {
							case -99:

								// "발송오류"
								if (successData.media_type == 0) {
									tms = tms + successData.msgCnt;
								} else {
									mms = mms + successData.msgCnt;
								}

								statusD99Cnt = statusD99Cnt
										+ successData.msgCnt;
								totalMsgCnt += successData.msgCnt;
								break;
							case -2:

								// "수신자없음"
								if (successData.media_type == 0) {
									tms = tms + successData.msgCnt;
								} else {
									mms = mms + successData.msgCnt;
								}
								usD2Cnt = statusD2Cnt + successData.msgCnt;
								totalMsgCnt += successData.msgCnt;
								break;

							case 0:
								if (successData.media_type == 0) {
									tms = tms + successData.msgCnt;
								} else {
									mms = mms + successData.msgCnt;
								}

								// "발송중"

								statusP0Cnt = statusP0Cnt + successData.msgCnt;
								totalMsgCnt += successData.msgCnt;
								break;
							case 1:
								if (successData.media_type == 0) {
									tms = tms + successData.msgCnt;
								} else {
									mms = mms + successData.msgCnt;
								}

								// "발송됨"

								statusP1Cnt = statusP1Cnt + successData.msgCnt;
								appAck = appAck + successData.appAckCnt;
								pmaAck = pmaAck + successData.pmaAckCnt;
								totalMsgCnt += successData.msgCnt;

								break;
							case 2:
								if (successData.media_type == 0) {
									tms = tms + successData.msgCnt;
								} else {
									mms = mms + successData.msgCnt;
								}

								// "예약취소됨"
								statusP2Cnt = statusP2Cnt + successData.msgCnt;
								totalMsgCnt += successData.msgCnt;
								break;

							}

						}

						monthTableData.push({
							"totalMsgCnt" : totalMsgCnt,
							"msgCnt" : statusP1Cnt,
							"sending" : statusP0Cnt,
							"TMS" : tms,
							"MMS" : mms,
							/* "limitOver" : statusD1Cnt, */
							"userNotFound" : statusD2Cnt,
							"resCancel" : statusP2Cnt,
							"serverError" : statusD99Cnt,
							"pmaAck" : pmaAck,
							"appAck" : appAck
						});

						statsTable = $('#msg-stats-table').dataTable({
							aaData : monthTableData,
							'bSort' : false,
							bJQueryUI : true,
							"pageLength" : 25,
							bDestroy : true,
							bScrollCollapse : true,
							"autoWidth" : false,
							scrollX : true,
							"bLengthChange" : false,
							"bPaginate" : false,
							"bInfo" : false,
							"bLengthChange" : false,
							"dom" : 'T<"clear">lrtip',
							aoColumns : [ {
								mData : 'totalMsgCnt',
								"sWidth" : "10%"
							}, {
								mData : 'msgCnt',
								"sWidth" : "10%"
							}, {
								mData : 'sending',
								"sWidth" : "10%"
							}, {
								mData : 'TMS',
								"sWidth" : "10%"
							}, {
								mData : 'MMS',
								"sWidth" : "10%"
							},

							{
								mData : 'userNotFound',
								"sWidth" : "10%"
							}, {
								mData : 'resCancel',
								"sWidth" : "10%"
							},

							{
								mData : 'serverError',
								"sWidth" : "10%"
							}, {
								mData : 'pmaAck',
								"sWidth" : "10%"
							}, {
								mData : 'appAck',
								"sWidth" : "10%"
							} ]
						});
					} else {

						alert('통계 목록을 가지고오는데 실패하였습니다.');
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

					alert('통계 목록을 가지고오는데 실패하였습니다.');
				}
			});

		}

	},
	// 통계 날짜 변경
	statsChangeDateInput : function() {
		var messagelist_Picker = $("#msg-stats-month-date-input").val();
		var messageList_Result = [];
		messageList_Result = messagelist_Picker.split("/");
		$('#msg-stats-start-date-time-picker-div').datetimepicker().data(
				"DateTimePicker").setDate(
				pushUtil.chageDateF(messageList_Result[0],
						messageList_Result[1]));
		$('#msg-stats-end-date-time-picker-div').datetimepicker().data(
				"DateTimePicker").setDate(
				pushUtil.chageDateL(messageList_Result[0],
						messageList_Result[1]));
		$('#msg-stats-start-date-time-picker-div').datetimepicker().data(
				"DateTimePicker").setMinDate(
				pushUtil.chageDateF(messageList_Result[0],
						messageList_Result[1]));
		$('#msg-stats-start-date-time-picker-div').datetimepicker().data(
				"DateTimePicker").setMaxDate(
				pushUtil.chageDateL(messageList_Result[0],
						messageList_Result[1]));
		$('#msg-stats-end-date-time-picker-div').datetimepicker().data(
				"DateTimePicker").setMinDate(
				pushUtil.chageDateF(messageList_Result[0],
						messageList_Result[1]));
		$('#msg-stats-end-date-time-picker-div').datetimepicker().data(
				"DateTimePicker").setMaxDate(
				pushUtil.chageDateL(messageList_Result[0],
						messageList_Result[1]));
	},
	// 통계 화면 생성
	render : function() {
		var that = this;
		$.get('pages/js/template/push_stats_template.html', function(data) {
			var template = _.template(data, {});
			that.$el.html(template);

			var defaultMonth = $('#msg-stats-date-time-picker-div').val();
			if (defaultMonth == null || defaultMonth == "") {
				var nowDate = new Date();
				var year = nowDate.getFullYear();
				var month = nowDate.getMonth() + 1;

				if (month < 10) {
					month = '0' + month;
				}

				defaultMonth = year + "/" + month;

				$('#msg-stats-month-date-input').val(defaultMonth);
			}

			$('#msg-stats-date-time-picker-div').datetimepicker({
				viewMode : 'years',
				format : 'YYYY/MM',
				minViewMode : "months",
				pickTime : false
			});

			$('#msg-stats-start-date-time-picker-div').datetimepicker({
				format : "YYYY/MM/DD",
				defaultDate : pushUtil.getCurrentDayF(),
				minDate : pushUtil.getCurrentDayF(),
				maxDate : pushUtil.getCurrentDayL(),
				pickTime : false

			});

			$('#msg-stats-end-date-time-picker-div').datetimepicker({
				format : "YYYY/MM/DD",
				defaultDate : pushUtil.getCurrentDayL(),
				minDate : pushUtil.getCurrentDayF(),
				maxDate : pushUtil.getCurrentDayL(),
				pickTime : false
			});
		}, 'html');
	}

});
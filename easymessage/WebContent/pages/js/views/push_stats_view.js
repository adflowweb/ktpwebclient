window.ADF = window.ADF || {};
ADF.PushStatsView = Backbone.View.extend({

	// defaultContent": "<button>Click!</button>"
	events : {
		"dp.change #msg-stats-date-time-picker-div" : "statsDatePickerChange",
		"click #msg-stats-search-btn" : "clickStatsSearch"
	// "change #msg-list-search-select" : "searchSelectChange",
	// "click #msg-list-search-btn" : "searchBtnClick",
	// "click #msg-list-csv-btn" : "csvFileDown",
	// "click #msg-list-table tbody #msg-list-detail-btn" :
	// "getDetailList",
	// "click #msg-list-detail-confirm-btn" : "confirmDetailTable",
	// "click #msg-list-resend-btn" : "msgResendModal",
	// "input #resend-private-input" : "checkPrivateInput",
	// "input #resend-fleep-bunch-input" : "checkBunchInput",
	// "input #msg-resend-content-textarea" : "checkContentArea",
	// "click #msg-resend-plus-span" : "replusUfmiCheck",
	// "click #msg-resend-btn" : "msgResend",
	// "click #modal-header-close" : "modalHeaderClick",
	// "click #modal-footer-cancel" : "modalFooterClick"

	// "click #msg-list-detail-btn":"getDetailList"
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
		console.log('before render...');
		$('#sidebar-shortcuts').show();
		$('#sidebar-ul-list').show();
		$('#login-user-info-div').show();
		var userId = sessionStorage.getItem('easy-userId');
		$('#user-id-span').text(userId);

	},
	afterRender : function() {
		console.log('after render..');

	},

	statsDatePickerChange : function() {
		console.log('월선택 체인지..펑션');
		setTimeout(this.statsChangeDateInput, 500);
	},

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

	clickStatsSearch : function() {
		console.log('test123123');
		$('#stats-reservation-div').fadeIn();
		$('#stats-div').fadeIn();
		// <script type="text/javascript"
		// src="assets/js/dataTables/extensions/TableTools/js/dataTables.tableTools.js"></script>

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
							console.log(successData);

							// if (successData.isReservation == false) {
							switch (dataResult[i].status) {
							case -99:
								// dataResult[i].status =
								// "발송오류";
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
								// dataResult[i].status =
								// "수신자없음";
								if (successData.media_type == 0) {
									tms = tms + successData.msgCnt;
								} else {
									mms = mms + successData.msgCnt;
								}
								usD2Cnt = statusD2Cnt + successData.msgCnt;
								totalMsgCnt += successData.msgCnt;
								break;
							/*
							 * case -1: // dataResult[i].status = "허용갯수초과";
							 * statusD1Cnt = successData.msgCnt; totalMsgCnt +=
							 * successData.msgCnt; break;
							 */
							case 0:
								if (successData.media_type == 0) {
									tms = tms + successData.msgCnt;
								} else {
									mms = mms + successData.msgCnt;
								}
								// dataResult[i].status =
								// "발송중";
								// statusP0Cnt = successData.msgCnt;
								statusP0Cnt = statusP0Cnt + successData.msgCnt;
								totalMsgCnt += successData.msgCnt;
								break;
							case 1:
								if (successData.media_type == 0) {
									tms = tms + successData.msgCnt;
								} else {
									mms = mms + successData.msgCnt;
								}
								// dataResult[i].status =
								// "발송됨";

								// statusP1Cnt = successData.msgCnt;
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
								// dataResult[i].status =
								// "예약취소됨";
								statusP2Cnt = statusP2Cnt + successData.msgCnt;
								totalMsgCnt += successData.msgCnt;
								break;

							}

							// }
							// else {
							// switch (dataResult[i].status) {
							// case -99:
							// // dataResult[i].status =
							// // "발송오류";
							// statusRD99Cnt = successData.msgCnt;
							// totalMsgCntR += successData.msgCnt;
							// break;
							// case -2:
							// // dataResult[i].status =
							// // "수신자없음";
							// statusRD2Cnt = successData.msgCnt;
							// totalMsgCntR += successData.msgCnt;
							// break;
							// /*
							// * case -1: // dataResult[i].status = "허용갯수초과";
							// * statusRD1Cnt = successData.msgCnt;
							// * totalMsgCntR += successData.msgCnt; break;
							// */
							// case 0:
							// // dataResult[i].status =
							// // "발송중";
							// statusRP0Cnt = successData.msgCnt;
							// totalMsgCntR += successData.msgCnt;
							// break;
							// case 1:
							// // dataResult[i].status =
							// // "발송됨";
							//
							// statusRP1Cnt = successData.msgCnt;
							// appAckR = successData.appAckCnt;
							// pmaAckR = successData.pmaAckCnt;
							// totalMsgCntR += successData.msgCnt;
							//
							// break;
							// case 2:
							// // dataResult[i].status =
							// // "예약취소됨";
							// statusRP2Cnt = successData.msgCnt;
							// totalMsgCntR += successData.msgCnt;
							// break;
							//
							// }
							//
							// }

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

						// monthTableDataRes.push({
						// "totalMsgCnt" : totalMsgCntR,
						// "msgCnt" : statusRP1Cnt,
						// "resCancel" : statusRP2Cnt,
						// "sending" : statusRP0Cnt,
						// /* "limitOver" : statusRD1Cnt, */
						// "userNotFound" : statusRD2Cnt,
						// "serverError" : statusRD99Cnt,
						// "pmaAck" : pmaAckR,
						// "appAck" : appAckR
						// });

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
							// "tableTools" : {
							// "sSwfPath" :
							// "assets/js/dataTables/extensions/TableTools/swf/copycsvxlspdf.swf",
							// "aButtons" : [
							//
							// {
							// "sExtends" : "csv",
							// "sToolTip" : "Export to CSV",
							// "sButtonClass" : "btn btn-white
							// btn-primary btn-bold pull-right",
							// "sButtonText" : "<i class='fa
							// fa-file-excel-o bigger-110 green'></i>",
							// "sFileName" : "*.csv"
							// }
							//
							// ]
							// },
							// "sFileName" :
							// "*.csv"

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
							/*
							 * { mData : 'limitOver' },
							 */
							{
								mData : 'userNotFound',
								"sWidth" : "10%"
							}, {
								mData : 'resCancel',
								"sWidth" : "10%"
							},

							// "resCancel" : statusP2Cnt,
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
						/*
						 * statsReservationTable = $(
						 * '#msg-stats-reservation-table').dataTable({ aaData :
						 * monthTableDataRes, 'bSort' : false, bJQueryUI : true,
						 * bDestroy : true, "bPaginate" : false, "pageLength" :
						 * 25, "bInfo" : false, bScrollCollapse : true,
						 * "autoWidth" : false, scrollX : true, "bLengthChange" :
						 * false,
						 * 
						 * "bLengthChange" : false, "dom" : 'T<"clear">lrtip', //
						 * "tableTools" : { // "sSwfPath" : //
						 * "assets/js/dataTables/extensions/TableTools/swf/copycsvxlspdf.swf", //
						 * "aButtons" : [ // // { // "sExtends" : "csv", //
						 * "sToolTip" : "Export to CSV", // "sButtonClass" :
						 * "btn btn-white // btn-primary btn-bold pull-right", //
						 * "sButtonText" : "<i class='fa // fa-file-excel-o
						 * bigger-110 // green'></i>", // "sFileName" : "*.csv" // } // // ] // },
						 * aoColumns : [ { mData : 'totalMsgCnt', "sWidth" :
						 * "15%" }, { mData : 'msgCnt', "sWidth" : "15%" }, {
						 * mData : 'resCancel', "sWidth" : "15%" }, { mData :
						 * 'sending', "sWidth" : "15%" }, { mData : 'limitOver' }, {
						 * mData : 'userNotFound', "sWidth" : "10%" }, { mData :
						 * 'serverError', "sWidth" : "10%" }, { mData :
						 * 'pmaAck', "sWidth" : "10%" }, { mData : 'appAck',
						 * "sWidth" : "10%" } ] });
						 */

						// $('#month_svc_msgsend_div').text(totalMsgCnt);
						// $('#month_svc_msgres_div').text(totalMsgCntR);
						// $('#month-svc-msgcnt-panel-head').show();
						// $('#month-svc-msgcnt-panel-body').show();
						// $('#month-svc-res-panel-body').show();
						// $('#month-svc-res-panel-head').show();
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
			// statsTable.fnDestroy();
			// statsReservationTable.fnDestroy();
		}

	},

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

	render : function() {
		console.log("stats view render..");
		var that = this;

		// $(function() {
		// var script = document.createElement("script");
		// script.type = "text/javascript";
		//
		// if (script.readyState) { // IE
		// script.onreadystatechange = function() {
		// if (script.readyState == "loaded"
		// || script.readyState == "complete") {
		// script.onreadystatechange = null;
		// callback();
		// }
		// };
		// } else { // Others
		// script.onload = function() {
		// callback();
		// };
		// }
		//
		// script.src =
		// "assets/js/dataTables/extensions/TableTools/js/dataTables.tableTools.js";
		// document.getElementsByTagName("head")[0]
		// .appendChild(script);
		//
		// function callback() {
		//
		// }
		// ;
		// });
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
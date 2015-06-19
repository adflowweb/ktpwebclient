window.ADF = window.ADF || {};

ADF.PUSHRouter = Backbone.Router.extend({

	// initialize

	initialize : function() {
		console.log('라우터 생성자');

	},

	routes : {
		'' : 'main',
		'login' : 'login',
		'msg_send' : 'msg_send',
		'msg_list' : 'msg_list',
		"msg_content" : 'msg_content',
		'reservation_list' : 'reservation_list',
		'msg_stats' : 'msg_stats',
		'user_info' : 'user_info',
		'logout' : 'logout'
	},

});

if (/msie [6-9]./.test(navigator.userAgent.toLowerCase())) {

	console.log('ie 버전 check');
	alert('현재 페이지는 Chrome 브라우저에 최적화 되어 있으며 Internet Explorer 는 10 버전 이상부터 지원 합니다!');
	console.log(navigator.userAgent);
} else {
	var pushRouter = new ADF.PUSHRouter();
	var loginView = new ADF.PushLoginView();
	var msgSendView = new ADF.PushMsgSendView();
	var reservationListView = new ADF.PushReservationListView();
	var msgListView = new ADF.PushMsgListView();
	var statsView = new ADF.PushStatsView();
	var userInfoView = new ADF.PushUserInfoView();
	var msgContentView = new ADF.PushMsgContentView();
	// var contentListView= new ADF.PushContentListView();

	pushRouter.on('route:main', function() {
		var token = sessionStorage.getItem("easy-token");

		if (token == "null" || token == null || token == "") {
			pushRouter.navigate('login', {
				trigger : true
			});
			return false;
		}
		$("li[name='sidebar_li']").removeClass("active");
		$('#sidebar_li_msg_send').addClass("active");
		msgSendView.render();

	});

	pushRouter.on('route:login', function() {
		console.log("메시지 로그인 라우터 작동");

		loginView.render();

	});

	pushRouter.on('route:msg_send', function() {
		console.log("메시지 전송 라우터 작동");
		var token = sessionStorage.getItem("easy-token");

		if (token == "null" || token == null || token == "") {
			pushRouter.navigate('login', {
				trigger : true
			});
			return false;
		}
		$("li[name='sidebar_li']").removeClass("active");
		$('#sidebar_li_msg_send').addClass("active");

		msgSendView.render();
	});

	pushRouter.on('route:msg_list', function() {
		console.log("메시지 리스트 라우터 작동");
		var token = sessionStorage.getItem("easy-token");

		if (token == "null" || token == null || token == "") {
			pushRouter.navigate('login', {
				trigger : true
			});
			return false;
		}
		$("li[name='sidebar_li']").removeClass("active");
		$('#sidebar_li_msg_list').addClass("active");

		msgListView.render();
	});

	pushRouter.on('route:msg_content', function() {
		console.log("메시지 리스트 라우터 작동");
		var token = sessionStorage.getItem("easy-token");

		if (token == "null" || token == null || token == "") {
			pushRouter.navigate('login', {
				trigger : true
			});
			return false;
		}
		$("li[name='sidebar_li']").removeClass("active");
		$('#sidebar_li_msg_content').addClass("active");

		msgContentView.render();
	});

	pushRouter.on('route:reservation_list', function() {
		console.log("예약 리스트 라우터 작동");
		var token = sessionStorage.getItem("easy-token");

		if (token == "null" || token == null || token == "") {
			pushRouter.navigate('login', {
				trigger : true
			});
			return false;
		}
		$("li[name='sidebar_li']").removeClass("active");
		$('#sidebar_li_reservation_list').addClass("active");

		reservationListView.render();
	});

	pushRouter.on('route:msg_stats', function() {
		console.log("통계 라우터 작동");
		var token = sessionStorage.getItem("easy-token");

		if (token == "null" || token == null || token == "") {
			pushRouter.navigate('login', {
				trigger : true
			});
			return false;
		}
		$("li[name='sidebar_li']").removeClass("active");
		$('#sidebar_li_stats').addClass("active");

		statsView.render();
	});

	pushRouter.on('route:user_info', function() {
		console.log("사용자 정보조회");
		var token = sessionStorage.getItem("easy-token");

		if (token == "null" || token == null || token == "") {
			pushRouter.navigate('login', {
				trigger : true
			});
			return false;
		}
		// var statsView = new ADF.PushStatsView();
		// statsView.render();
		//
		$("li[name='sidebar_li']").removeClass("active");
		$('#sidebar_li_user_info').addClass("active");

		userInfoView.render();

		console.log('사용자 정보 조회');
	});

	pushRouter.on('route:logout', function() {
		console.log("사용자 정보조회");

		if (confirm('로그아웃 하시겠습니까?') == true) {
			sessionStorage.removeItem("easy-token");
			sessionStorage.removeItem("easy-userId");
			sessionStorage.removeItem("easy-role");
			sessionStorage.removeItem("easy-groupTopic");
			sessionStorage.removeItem("easy-ufmi");
			sessionStorage.removeItem("easy-userName");
			pushRouter.navigate('login', {
				trigger : true
			});
		}

	});

	$('#sidebar_btn_msg_send').click(function() {
		console.log('심플 아이콘 msg_send');
		pushRouter.navigate('msg_send', {
			trigger : true
		});
	});
	$('#sidebar_btn_msg_list').click(function() {
		console.log('심플 아이콘 msg_list');
		pushRouter.navigate('msg_list', {
			trigger : true
		});
	});
	$('#sidebar_btn_reservation_list').click(function() {
		console.log('심플 아이콘 reservation_list');
		pushRouter.navigate('reservation_list', {
			trigger : true
		});
	});
	$('#sidebar_btn_content').click(function() {
		console.log('심플 아이콘 msg_stats');
		pushRouter.navigate('msg_content', {
			trigger : true
		});
	});
	$('#msg-count-li')
			.click(
					function() {
						console.log('li check..');
						console.log('test123123');
						// $('#stats-reservation-div').fadeIn();
						// $('#stats-div').fadeIn();
						// <script type="text/javascript"
						// src="assets/js/dataTables/extensions/TableTools/js/dataTables.tableTools.js"></script>

						var token = sessionStorage.getItem('easy-token');

						// var input_month_value =
						// $('#msg-stats-month-date-input').val();
						// input_month_value = input_month_value.replace("/",
						// "");
						//
						// var searchDateStart =
						// $('#msg-stats-start-date-input').val();
						// var searchDateEnd =
						// $('#msg-stats-end-date-input').val();

						var dateObj = new Date();
						var month = dateObj.getMonth() + 1;
						var year = dateObj.getFullYear();
						var startDate = new Date();
						startDate.setHours(0, 0, 0, 0);

						var endDate = new Date();
						endDate.setHours(23, 59, 59, 999);

						if (month < 10) {
							month = "0" + month;
						}
						var inputMonth = "";
						month = month + "";

						year = year + "";
						inputMonth = year + month;
						console.log(inputMonth);
						console.log('달');
						// 시작일 종료일 월 체크
						var ajaxUrlMonth = "";

						startDate = startDate.toISOString();
						endDate = endDate.toISOString();
						ajaxUrl = '/v1/pms/adm/svc/messages/summary/'
								+ inputMonth + "?cSearchDateStart=" + startDate
								+ "&cSearchDateEnd=" + endDate;

						ajaxUrlMonth = '/v1/pms/adm/svc/messages/summary/'
								+ inputMonth;

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
									var totalMsgCnt = 0;
									for ( var i in data.result.data) {
										var successData = data.result.data[i];

										switch (dataResult[i].status) {

										case 1:
											totalMsgCnt += successData.msgCnt;

											break;

										}

									}
									$('#today-count-span').text(totalMsgCnt);
								} else {
									$('#today-count-span').text(0);
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

								// alert('통계 목록을 가지고오는데 실패하였습니다.');
							}
						});

						$.ajax({
							url : ajaxUrlMonth,
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
									var totalMsgCnt = 0;
									for ( var i in data.result.data) {
										var successData = data.result.data[i];

										switch (dataResult[i].status) {

										case 1:
											totalMsgCnt += successData.msgCnt;

											break;

										}

									}
									$('#month-count-span').text(totalMsgCnt);
								} else {
									$('#month-count-span').text(0);
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

								// alert('통계 목록을 가지고오는데 실패하였습니다.');
							}
						});

					});

	Backbone.history.start();

}

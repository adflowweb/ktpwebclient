window.ADF = window.ADF || {};

// Router
ADF.PUSHRouter = Backbone.Router.extend({
	initialize : function() {
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

// 브라우저 버전 체크
if (/msie [6-9]./.test(navigator.userAgent.toLowerCase())) {

	alert('현재 페이지는 Chrome 브라우저에 최적화 되어 있으며 Internet Explorer 는 10 버전 이상부터 지원 합니다!');

} else {
	var pushRouter = new ADF.PUSHRouter();
	var loginView = new ADF.PushLoginView();
	var msgSendView = new ADF.PushMsgSendView();
	var reservationListView = new ADF.PushReservationListView();
	var msgListView = new ADF.PushMsgListView();
	var statsView = new ADF.PushStatsView();
	var userInfoView = new ADF.PushUserInfoView();
	var msgContentView = new ADF.PushMsgContentView();

	// 메인 페이지 라우터
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
	// 로그인 페이지 라우터
	pushRouter.on('route:login', function() {
		loginView.render();

	});
	// 메시지 전송 라우터
	pushRouter.on('route:msg_send', function() {
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
	// 메시지 리스트 라우터
	pushRouter.on('route:msg_list', function() {
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
	// 상용구 라우터
	pushRouter.on('route:msg_content', function() {
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
	// 예약 리스트 라우터
	pushRouter.on('route:reservation_list', function() {
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

	// 통계 라우터
	pushRouter.on('route:msg_stats', function() {
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
	// 유저 정보 라우터
	pushRouter.on('route:user_info', function() {

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

	});

	// 로그 아웃 라우터
	pushRouter.on('route:logout', function() {

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
	// 좌측 상단 메시지 전송 아이콘
	$('#sidebar_btn_msg_send').click(function() {

		pushRouter.navigate('msg_send', {
			trigger : true
		});
	});
	// 좌측 상단 메시지 리스트 아이콘
	$('#sidebar_btn_msg_list').click(function() {

		pushRouter.navigate('msg_list', {
			trigger : true
		});
	});
	// 좌측 상단 예약 리스트 아이콘
	$('#sidebar_btn_reservation_list').click(function() {

		pushRouter.navigate('reservation_list', {
			trigger : true
		});
	});
	// 좌측 상단 상용구 아이콘
	$('#sidebar_btn_content').click(function() {

		pushRouter.navigate('msg_content', {
			trigger : true
		});
	});
	// 우측 상단 메시지 전송 건수
	$('#msg-count-li')
			.click(
					function() {

						var token = sessionStorage.getItem('easy-token');
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

							}
						});

					});

	Backbone.history.start();

}

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
		'reservation_list' : 'reservation_list',
		'msg_stats' : 'msg_stats',
		'user_info' : 'user_info',
		'logout' : 'logout'
	}
});

var pushRouter = new ADF.PUSHRouter();
var loginView = new ADF.PushLoginView();
var msgSendView = new ADF.PushMsgSendView();
var reservationListView = new ADF.PushReservationListView();
var msgListView = new ADF.PushMsgListView();
var statsView = new ADF.PushStatsView();
var userInfoView = new ADF.PushUserInfoView();
//var contentListView= new ADF.PushContentListView();

pushRouter.on('route:main', function() {
	var token = sessionStorage.getItem("token");

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
	var token = sessionStorage.getItem("token");

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
	var token = sessionStorage.getItem("token");

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

pushRouter.on('route:reservation_list', function() {
	console.log("예약 리스트 라우터 작동");
	var token = sessionStorage.getItem("token");

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
	var token = sessionStorage.getItem("token");

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
	var token = sessionStorage.getItem("token");

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
$('#sidebar_btn_stats').click(function() {
	console.log('심플 아이콘 msg_stats');
	pushRouter.navigate('msg_stats', {
		trigger : true
	});
});

Backbone.history.start();

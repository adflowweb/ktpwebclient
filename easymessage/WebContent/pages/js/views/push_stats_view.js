window.ADF = window.ADF || {};
ADF.PushStatsView = Backbone.View.extend({

	initialize : function() {
		_.bindAll(this, 'render', 'beforeRender', 'afterRender');
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
		var userId=sessionStorage.getItem('userId');
		$('#user-id-span').text(userId);
		
	},
	afterRender : function() {
		console.log('after render..');

	},

	render : function() {
		console.log("stats view render..");
		var that = this;
		$.get('pages/js/template/push_stats_template.html', function(data) {
			var template = _.template(data, {});
			that.$el.html(template);
		}, 'html');
	}

});
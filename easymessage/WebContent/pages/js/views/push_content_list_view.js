//window.ADF = window.ADF || {};
//ADF.PushContentListView = Backbone.View.extend({
//
//	initialize : function() {
//		_.bindAll(this, 'render', 'beforeRender', 'afterRender');
//		var _this = this;
//		this.render = _.wrap(this.render, function(render) {
//			_this.beforeRender();
//			render();
//			_this.afterRender();
//			return _this;
//		});
//
//	},
//
//	el : '.main-content-inner',
//	beforeRender : function() {
//		console.log('before render...');
//
//	},
//	afterRender : function() {
//		console.log('after render..');
//
//	},
//
//	render : function() {
//		console.log("msgContent list view render..");
//		var that = this;
//		var PushContentListModel = Backbone.Model.extend({
//
//			contentType : "application/json",
//			urlRoot : '/v1/pms/adm/svc/template'
//
//		});
//
//		var contentListModel = new PushContentListModel();
//
//		var sendToken = function(xhr) {
//			console.log('in sendToken..');
//			var token = sessionStorage.getItem('token');
//
//			xhr.setRequestHeader('X-Application-Token', token);
//		};
//
//		contentListModel.fetch({
//			beforeSend : sendToken,
//			success : function(contentListModel) {
//				$.get('pages/js/template/push_content_list_template.html',
//						function(data) {
//							console.log('success');
//							var template = _.template(data, {});
//							that.$el.html(template);
//						}, 'html');
//
//			},
//			error : function(data) {
//				console.log('fail');
//				console.log(data);
//			}
//
//		});
//
//	}
//
//});
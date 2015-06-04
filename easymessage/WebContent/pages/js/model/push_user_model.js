window.ADF = window.ADF || {};
// user Model
ADF.PushContentListModel = Backbone.Model.extend({

	contentType : "application/json",
	urlRoot : '/v1/pms/adm/cmm/auth',

	defaults : {
		userId : '',
		password : ''

	}

});

var contentListModel = new ADF.PushContentListModel();

var Session = Backbone.Model.extend({
	defaults : {
		accessToken : '',
		userId : '',
	},

	isAuthenticated : function() {
		if (this.get('accessToken') != null) {
			return true;
		}
		return false;
	}
});

var Schritt = Backbone.RelationalModel.extend({
	defaults : {
		schrittTitel : 'Titel',
		beschreibung : 'Beschreibung',
	},
	initialize : function() {
		console.log("Schritt initialized");
	},
});

var SchritteList = Backbone.Collection.extend({
	model : Schritt,

});

var Material = Backbone.RelationalModel.extend({
	defaults : {
		number : '0',
		url : 'http://url.com',
		beschreibung : 'Beschreibung'
	}

});

var MaterialList = Backbone.Collection.extend({
	model : Material,

});

var Anleitung = Backbone.RelationalModel.extend({

	relations : [ {
		type : Backbone.HasMany,
		key : 'schritte',
		relatedModel : 'Schritt',
		collectionType : 'SchritteList',
	}, {
		type : Backbone.HasMany,
		key : 'material',
		relatedModel : 'Material',
		collectionType : 'MaterialList',
	}

	],

	urlRoot : 'rest/anleitungen',

	parse : function(response) {
		response.id = response._id['$oid'];
		return response;
	},

	defaults : {
		haupttitel : 'Haupttitel',

		untertitel : 'Untertitel',
	},

});

var Anleitungen = Backbone.Collection.extend({
	model : Anleitung,

	url : 'rest/anleitungen',
});

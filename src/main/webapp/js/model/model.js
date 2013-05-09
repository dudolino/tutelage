var Schritt = Backbone.Model.extend({
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

var Material = Backbone.Model.extend({
	defaults : {
		url : 'URL',
		beschreibung : 'Beschreibung',
	},

});

var MaterialList = Backbone.Collection.extend({
	model : Material,

});

var Anleitung = Backbone.Model.extend({

	// idAttribute : 'id',
	urlRoot : 'rest/anleitungen',
	// urlRoot : function() {
	// if (this.isNew()) {
	// return "rest/anleitungen";
	// } else {
	// return "rest/anleitungen/" + this.id;
	// }
	// },

	parse : function(response) {
		// response.id = parseInt(response._id['$oid']);
		response.id = response._id['$oid'];
		return response;
	},

	defaults : {

		id : '',

		haupttitel : 'Haupttitel',

		untertitel : 'Untertitel',

		schritte : [],

		material : [],
	},

	initialize : function() {
		this.schritte = new SchritteList();
		// var schritteList = new SchritteList();
		// var schritt = new Schritt();
		// this.schritte.add(schritt);
		this.set("schritte", this.schritte);
		//
		// var materialListe = new MaterialList();
		// this.set("material", materialListe);

		console.log("Anleitung initialized");
		console.log(this.toJSON());
		// this.createTestData();
	},

	createTestData : function() {
		var schritt = new Schritt();
		var schritt2 = new Schritt();
		var schritteList = new SchritteList();
		schritteList.add(schritt);
		schritteList.add(schritt2);
		this.set("schritte", schritteList);
		var material1 = new Material();
		var material2 = new Material();
		var materialListe = new MaterialList();
		materialListe.add(material1);
		materialListe.add(material2);
		this.set("material", materialListe);

	},

});

var Anleitungen = Backbone.Collection.extend({
	model : Anleitung,

	url : 'rest/anleitungen',
});

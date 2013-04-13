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
	
	
	defaults : {
		haupttitel : 'Haupttitel',

		untertitel : 'Untertitel',
		
		schritte:[],
		
		material:[],
	},

	initialize : function() {
		this.schritte=new SchritteList();
		this.material=new MaterialList();
		this.createTestData();
	},
	
	createTestData: function(){
		var schritt = new Schritt();
		var schritt2 = new Schritt();
		var schritteList = new SchritteList();
		schritteList.add(schritt);
		schritteList.add(schritt2);
		this.set("schritte", schritteList);
		var material1=new Material();
		var material2=new Material();
		var materialListe=new MaterialList();
		materialListe.add(material1);
		materialListe.add(material2);
		this.set("material", materialListe);

		
	},
	
});


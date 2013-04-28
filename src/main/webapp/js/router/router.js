var NavigationView = Backbone.View.extend({
	events : {
		'click a' : 'navigate'
	},

	navigate : function(el) {
		Backbone.history.navigate($(el.target).attr('href'), {
			trigger : true
		});
		return false;
	}
});

var App = Backbone.Router.extend({
	routes : {
		'' : 'home',
		'add' : 'add',
		'edit/:id' : 'edit',
	},

	view : null,

	highestID : 0,

	initialize : function() {
		this.anleitungen = new Anleitungen();
	},

	switchView : function(view) {
		if (this.view) {
			if (this.view.destroy) {
				this.view.destroy();
			}
			this.view = null;
		}
		this.view = view;
		$('#main').empty().append(view.render().el);
		return view;
	},

	home : function() {
		var listView = new AnleitungListView({
			model : this.anleitungen
		});
		this.switchView(listView);
		this.anleitungen.fetch({
			success : function() {
				console.log("Anleitungen fetched...");
				listView.render();
			}
		});
	},

	show : function(id) {
		var a = new Anleitung({
			id : id
		});
		a.fetch();
		this.switchView(new AnleitungView({
			model : a
		}));
	},

	edit : function(aid) {
		console.log("edit with " + aid);

		var intId = parseInt(aid);

		this.anleitungen.each(function(anleitung) {
			console.log(anleitung.get("_id"));
			console.log(anleitung.get("id"));
		}, this);

		var a = this.anleitungen.findWhere({
			id : intId
		});

		var b = this.anleitungen.findWhere({
			id : intId
		});
		console.log(b);

		var c = this.anleitungen.findWhere({
			id : "1366919355000"
		});
		console.log(c);
		console.log(a);
		console.log(a.get("id"));
		this.switchView(new AnleitungEditView({
			model : a
		}));
	},

	add : function() {
		var app = this;
		var a = new Anleitung();
		this.anleitungen.create(a);
		var editView = new AnleitungEditView({
			model : a
		});
		this.switchView(editView);
		this.view.on('finished', function() {
			app.anleitungCol.push(this.model);
			Backbone.history.navigate('/', {
				trigger : true
			});
		});
	},

});
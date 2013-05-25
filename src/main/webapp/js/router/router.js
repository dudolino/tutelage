var NavigationView = Backbone.View.extend({
	events : {
		'click a' : 'navigate'
	},

	navigate : function(el) {
		console.log("navigate");
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
		// this.anleitungen.fetch();
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
		console.log("edit called");
		var anleitung = Anleitung.findOrCreate({
			id : aid,
		});
		this.switchView(new AnleitungEditView({
			model : anleitung
		}));
	},

	add : function() {
		// var app = this;
		var a = new Anleitung();

		// this.anleitungen.add(a);
		var editView = new AnleitungEditView({
			model : a
		});
		this.switchView(editView);
		// this.view.on('finished', function() {
		// app.anleitungCol.push(this.model);
		// Backbone.history.navigate('/', {
		// trigger : true
		// });
		// });
	},

});
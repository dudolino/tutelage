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
		'edit' : 'edit',
	},

	view : null,

	highestID : 0,

	initialize : function() {
		this.anleitungCol = new Anleitungen();
		this.anleitungCol.add(new Anleitung());
		this.anleitungCol.add(new Anleitung());
		this.anleitungCol.add(new Anleitung());
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
		var listView = new AnleitungListView({model : this.anleitungCol });
		this.switchView(listView);
	},

	show : function() {
		this.switchView(new AnleitungView({
			model : this.anleitungCol[0]
		}));
	},

	edit : function() {
		this.switchView(new AnleitungEditView({
			model : this.anleitungCol[0]
		}));
	},

	add : function() {
		var app = this;
		var editView = new AnleitungEditView({
			model : new Anleitung({
				id : ++this.highestID
			})
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
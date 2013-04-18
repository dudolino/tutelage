var NavigationView = Backbone.View.extend({
    events: {
        'click a': 'navigate'
    },

    navigate: function(el) {
        Backbone.history.navigate($(el.target).attr('href'), { trigger: true });
        return false;
    }
});


var App = Backbone.Router.extend({
	routes : {
		'' : 'home',
		'add' : 'add',
	},

	view : null,

	highestID : 0,

	initialize : function() {
		this.anleitung = new Anleitung();
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
		this.switchView(new AnleitungView({
			model : this.anleitung
		}));
	},

	add : function() {
		var app = this;
		this.switchView(new AnleitungEditView({
			model : new Anleitung({
				id : ++this.highestID
			})
		}));
		this.view.on('finished', function() {
			app.cookbook.add(this.model);
			Backbone.history.navigate('/', {
				trigger : true
			});
		});
	},

});
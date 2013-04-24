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
		var a=new Anleitungen();
		var listView = new AnleitungListView({model :  a});
		this.switchView(listView);
		a.fetch({success:function(){
	       console.log("Anleitungen fetched...");
	       listView.render();
	    }});
	},

	show : function(id) {
		var a=new Anleitung({_id:id});
		a.fetch();
		this.switchView(new AnleitungView({
			model : a
		}));
	},

	edit : function(id) {
		console.log("edit");
		var a=new Anleitung({_id:id});
		a.fetch();
		this.switchView(new AnleitungEditView({
			model : a
		}));
	},

	add : function() {
		var app = this;
		var editView = new AnleitungEditView({
			model : new Anleitung()
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
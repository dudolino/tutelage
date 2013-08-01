var NavigationView = Backbone.View.extend({
	events : {
		'click a' : 'navigate'
	},

	navigate : function(el) {
		console.log("navigate");
		var target = $(el.target).attr('href');
		if (target != undefined) {
			Backbone.history.navigate(target, {
				trigger : true
			});
		}

		return false;
	}
});

var App = Backbone.Router.extend({
	routes : {
		'' : 'home',
		'add' : 'add',
		'edit/:aid' : 'edit',
		'show/:aid' : 'show',
		'login' : 'login',
		'auth?code=:code' : 'auth'
	},

	view : null,

	highestID : 0,

	initialize : function() {
		this.anleitungen = new Anleitungen();
		this.session = new Session();
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

	show : function(aid) {
        var anleitung = Anleitung.findOrCreate({
            id : aid
        });

		this.switchView(new AnleitungView({
			model : anleitung
		}));
	},

	edit : function(aid) {
		if (this.session.isAuthenticated()) {
			console.log("isAuthenticated");
		}
		console.log("edit called");
		var anleitung = Anleitung.findOrCreate({
			id : aid
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

	login : function() {
		console.log("Login 1");
		$.get("rest/authUrl").done(function(data) {
			window.location.href = data;
		});
	},

	auth : function(code) {
		console.log("Login 2");
		if (typeof code != 'undefined') {
			console.log(code);
			$.post("rest/auth", code).done(function(data) {
				this.session.set('accessToken', data);
				console.log(this.session.isAuthenticated());
			});
		} else {
			console.log("bla");
		}

	}

});
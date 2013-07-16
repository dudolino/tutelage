var AnleitungTitelView = Backbone.View.extend({

	tagName : "div",

	className : "page-header",

	template : _.template($('#template-TitelHeader').html()),

	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var TitelEditView = Backbone.View.extend({

	tagName : "div",

	templateEdit : _.template($('#template-TitelEdit').html()),

	read : function() {
		var h = this.$el.find('#haupttitel').val();
		var u = this.$el.find('#untertitel').val();
		this.model.set({
			haupttitel : h,
			untertitel : u,
		});
	},

	render : function() {
		this.$el.html(this.templateEdit(this.model.toJSON()));
		return this;
	}

});

var SchrittView = Backbone.View.extend({

	tagName : "div",

	className : "hero-unit",

	template : _.template($('#template-Schritt').html()),

	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var SchrittEditView = Backbone.View.extend({

	tagName : "div",

	templateEdit : _.template($('#template-SchrittEdit').html()),

	events : {
		'click #saveSchritt' : 'read',
		'click #deleteSchritt' : 'deleteModel',
	},

	switchToEditView : function() {
		this.renderEdit();
		return this;
	},

	read : function() {
		var t = this.$el.find('#schrittTitelIn').val();
		var b = this.$el.find('#wysihtml5-textarea').val();
		console.log(t);
		this.model.set({
			schrittTitel : t,
			beschreibung : b
		});
	},

	deleteModel : function() {
		this.model.destroy();
		this.$el.html("<div></div>");
		return this;
	},

	render : function() {
		this.$el.html(this.templateEdit(this.model.toJSON()));

		// var editor = new wysihtml5.Editor("wysihtml5-textarea", {
		// toolbar : "wysihtml5-toolbar",
		// parserRules : wysihtml5ParserRules
		// });
		return this;
	},

});

var SchritteView = Backbone.View.extend({

	render : function() {
		if (this.model.length) {
			this.model.each(function(schritt) {
				this.$el.append(new SchrittView({
					model : schritt
				}).render().el);
			}, this);
			return this;
		}
	}
});

var MaterialView = Backbone.View.extend({

	tagName : "tr",

	template : _.template($('#template-Material').html()),

	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var MaterialListeView = Backbone.View.extend({

	tagName : "table",

	className : "table",

	render : function() {
		if (this.model.length) {
			this.model.each(function(material) {
				this.$el.append(new MaterialView({
					model : material
				}).render().el);
			}, this);
			return this;
		}
	}
});

var AnleitungView = Backbone.View.extend({

	render : function() {
		this.$el.append(new AnleitungTitelView({
			model : this.model
		}).render().el);
		this.$el.append(new SchritteView({
			model : this.model.get("schritte")
		}).render().el);
		this.$el.append(new MaterialListeView({
			model : this.model.get("material")
		}).render().el);
		return this;

	}

});

var AnleitungEditView = Backbone.View.extend({

	tagName : "div",

	templateEdit : _.template($('#template-TitelEdit').html()),

	initialize : function() {
		this.model.bind('change', this.render, this);
		this.schritte = this.model.get("schritte");
		this.schritteEditView = [];
	},

	events : {
		'click #addSchritt' : 'addSchritt',
		'click #speichern' : 'saveAnleitung',

	},

	saveAnleitung : function() {
		var h = this.$el.find('#haupttitel').val();
		var u = this.$el.find('#untertitel').val();
		this.model.set({
			haupttitel : h,
			untertitel : u,
		});
		if (this.schritteEditView.length) {
			console.log("Es gibt Schritte zu speichern: "
					+ this.schritteEditView.length);
			_.each(this.schritteEditView, function(schrittEditView) {
				console.log("read Schritt");
				schrittEditView.read();
			});
		}
		this.model.save();
	},

	addSchritt : function() {
		var schritt = new Schritt();
		this.schritte.add(schritt);
		var view = new SchrittEditView({
			model : schritt
		});
		this.schritteEditView.push(view);
		this.$el.append(view.render().el);
		return this;
	},

	render : function() {
		this.$el.empty();
		this.$el.append(this.templateEdit(this.model.toJSON()));
		this.renderSchritte();
		return this;
	},

	renderSchritte : function() {
		if (this.schritte.length) {
			this.schritte.each(function(schritt) {
				var view = new SchrittEditView({
					model : schritt
				});
				this.$el.append(view.render().el);
				this.schritteEditView.push(view);
			}, this);
			return this;
		}
		;
	},

});

var AnleitungListViewItem = Backbone.View.extend({

	tagName : "li",

	templateList : _.template($('#template-AnleitungList').html()),

	render : function() {
		this.$el.html(this.templateList(this.model.toJSON()));
		return this;
	}
});

var AnleitungListView = Backbone.View.extend({

	initialize : function() {
		this.model.bind('change', this.render, this);
	},

	render : function() {
		this.$el.empty();
		if (this.model.length) {
			new NavigationView({
				el : $('#main')
			});
			this.model.each(function(anleitung) {
				this.$el.append(new AnleitungListViewItem({
					model : anleitung
				}).render().el);
			}, this);
		}
		return this;
	}
});
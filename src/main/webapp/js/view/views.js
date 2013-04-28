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

	templateShow : _.template($('#template-TitelHeader').html()),

	events : {
		'blur #haupttitel' : 'save',
		'blur #untertitel' : 'save',
		'dblclick #titel' : 'switchToEditView',
	},

	switchToEditView : function() {
		this.$el.html(this.templateEdit(this.model.toJSON()));
		return this;
	},

	save : function() {
		var h = this.$el.find('#haupttitel').val();
		var u = this.$el.find('#untertitel').val();
		this.model.set({
			haupttitel : h,
			untertitel : u,
		});
		this.$el.html(this.templateShow(this.model.toJSON()));
		return this;
	},

	render : function() {
		this.$el.html(this.templateShow(this.model.toJSON()));
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

	templateShow : _.template($('#template-Schritt').html()),
	templateEdit : _.template($('#template-SchrittEdit').html()),

	events : {
		'click #saveSchritt' : 'save',
		'click #deleteSchritt' : 'deleteModel',
		'dblclick #schrittTitel' : 'switchToEditView',
	},

	switchToEditView : function() {
		this.renderEdit();
		return this;
	},

	save : function() {
		var t = this.$el.find('#schrittTitelIn').val();
		var b = this.$el.find('#wysihtml5-textarea').val();
		this.model.set({
			schrittTitel : t,
			beschreibung : b
		});
		this.$el.html(this.templateShow(this.model.toJSON()));
		return this;
	},

	deleteModel : function() {
		this.model.destroy();
		this.$el.html("<div></div>");
		return this;
	},

	renderEdit : function() {
		this.$el.html(this.templateEdit(this.model.toJSON()));

		var editor = new wysihtml5.Editor("wysihtml5-textarea", { // id of
			// textarea
			// element
			toolbar : "wysihtml5-toolbar", // id of toolbar element
			parserRules : wysihtml5ParserRules
		// defined in parser rules set
		});
		return this;
	},

	render : function() {
		this.$el.html(this.templateShow(this.model.toJSON()));
		return this;
	}

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
		this.schritte = this.model.get("schritte");
		this.schritteEditView = [];
	},

	events : {
		'blur #haupttitel' : 'saveTitel',
		'blur #untertitel' : 'saveTitel',
		'click #addSchritt' : 'addSchritt',

	},

	saveTitel : function() {
		var h = this.$el.find('#haupttitel').val();
		var u = this.$el.find('#untertitel').val();
		this.model.set({
			haupttitel : h,
			untertitel : u,
		});
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

	render : function() {
		if (this.model.length) {
			var nav = new NavigationView({
				el : $('#main')
			});
			this.model.each(function(anleitung) {
				this.$el.append(new AnleitungListViewItem({
					model : anleitung
				}).render().el);
			}, this);
			return this;
		}
		return this;
	}
});
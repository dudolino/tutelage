var AnleitungTitelView = Backbone.View.extend({

	tagName : "div",

	className : "page-header",

	template : _.template($('#template-TitelHeader').html()),

	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var SchrittView = Backbone.View.extend({

	tagName : "table",

	className : "hero-unit",

	template : _.template($('#template-Schritt').html()),

	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
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
var SchrittEditView = Backbone.View.extend({

	tagName : "div",

	templateEdit : _.template($('#template-SchrittEdit').html()),
	templateMaterialUse : _.template($('#template-materialUseEntry').html()),

	initialize : function(attrs) {
		this.material = attrs.material;
		this.editor = null;
	},

	events : {
		'click #saveSchritt' : 'save',
		'click #deleteSchritt' : 'deleteModel',
		'click #materialUse' : 'useMaterial'
	},

	save : function() {
		var t = this.$el.find('#schrittTitelIn').val();
		var b = this.$el.find('#schritt-textarea').val();
		this.model.set({
			schrittTitel : t,
			beschreibung : b
		});
        var dialog= this.$el.find('#schrittEditModal');
        dialog.modal('hide');
        dialog.trigger('hidden');
	},

	deleteModel : function() {
		this.model.destroy();
		var dialog= this.$el.find('#schrittEditModal');
        dialog.modal('hide');
        dialog.trigger('hidden');
	},

	render : function() {
		this.$el.html(this.templateEdit(this.model.toJSON()));
		this.renderMaterialUseList();
		return this;
	},

	renderMaterialUseList : function() {
		var area = this.$el.find('#materialUseList');
		if (this.material.length) {
			this.material.each(function(ma) {
				area.append(this.templateMaterialUse(ma.toJSON()));
			}, this);
		}
		;

	},

	createTextarea : function() {
		this.editor = new wysihtml5.Editor("schritt-textarea", { // id of
			// textarea
			// element
			toolbar : "toolbar", // id of toolbar element
			parserRules : wysihtml5ParserRules
		// defined in parser rules set
		});
	},

	useMaterial : function() {
		var selectedMaterial = this.material.findWhere({
			beschreibung : arguments[0].currentTarget.name
		});
		this.editor.composer.commands.exec("createLink", {
			id : selectedMaterial.get('beschreibung'),
			text : selectedMaterial.get('beschreibung'),
			name : selectedMaterial.get('beschreibung'),
			href : selectedMaterial.get('url')
		});
	}

});

var MaterialListEditView = Backbone.View.extend({

	tagName : "tr",

	templateEdit : _.template($('#template-MaterialListEdit').html()),

	events : {
		'click #editMaterial' : 'editMaterial',
		'click #removeMaterial' : 'removeMaterial'

	},

	editMaterial : function() {
		var materialEdit = new MaterialEditView({
			model : this.model
		});
		this.$el.append(materialEdit.render().el);
		var modal = this.$el.find('#materialEditModal');
		modal.modal('show');
		var self = this;
		modal.on('hidden', function() {
			modal.remove();
			self.$el.html(self.templateEdit(self.model.toJSON()));
		});
	},

	removeMaterial : function() {
		this.model.destroy();
		this.$el.html("");
	},

	render : function() {
		this.$el.html(this.templateEdit(this.model.toJSON()));
		return this;
	}
});

var MaterialEditView = Backbone.View.extend({
	tagName : "div",

	templateEdit : _.template($('#template-MaterialEdit').html()),

	events : {
		'click #saveMaterial' : 'saveMaterial',
		'click #delete' : 'deleteMaterial'

	},

	saveMaterial : function() {
		var bes = this.$el.find('#matBeschreibung').val();
		var url = this.$el.find('#matURL').val();
		this.model.set({
			beschreibung : bes,
			url : url
		});
		var dialog = this.$el.find('#materialEditModal');
		dialog.modal('hide');
        dialog.trigger('hidden'); // TODO bootstrap bug
	},

	deleteMaterial : function() {
		this.model.destroy();
		var dialog = this.$el.find('#materialEditModal').modal('hide');
        dialog.trigger('hidden');
	},

	render : function() {
		this.$el.html(this.templateEdit(this.model.toJSON()));
		return this;
	}
});

var AnleitungEditView = Backbone.View.extend({

	tagName : "div",

	templateEdit : _.template($('#template-TitelEdit').html()),

	initialize : function() {
		this.schritte = this.model.get("schritte");
		this.material = this.model.get("material");
		// this.material.on("add", this.renderMaterial, this);
		// this.material.on("change", this.renderMaterial, this);
		// this.material.on("destroy", this.renderMaterial, this);
		this.schritte.on("add", this.renderSchritte, this);
		this.schritte.on("change", this.renderSchritte, this);
		this.schritte.on("destroy", this.renderSchritte, this);
	},

	events : {
		'click #addSchritt' : 'addSchritt',
		'click #speichern' : 'saveAnleitung',
		'click #addMaterial' : 'addMaterial'

	},

	saveAnleitung : function() {
		var h = this.$el.find('#haupttitel').val();
		var u = this.$el.find('#untertitel').val();
		this.model.set({
			haupttitel : h,
			untertitel : u
		});
		this.model.save();
	},

	addSchritt : function() {
		var schritt = new Schritt();
		this.schritte.add(schritt);
		var view = new SchrittEditView({
			model : schritt,
			material : this.material
		});
		this.$el.append(view.render().el);
		view.createTextarea();
		var modal = this.$el.find('#schrittEditModal');
		modal.modal('show');
		modal.on('hidden', function() {
			modal.remove();
		});
	},

	addMaterial : function() {
		var mat = new Material();
		var materialEdit = new MaterialEditView({
			model : mat
		});
		this.material.add(mat);
		this.$el.append(materialEdit.render().el);
		var modal = this.$el.find('#materialEditModal');
		modal.modal('show');
		var self = this;
		modal.on('hidden', function() {
            console.log("Hier");
			modal.remove();
			self.renderMaterial();
		});
	},

	render : function() {
		this.$el.empty();
		this.$el.append(this.templateEdit(this.model.toJSON()));
		this.renderMaterial();
		this.renderSchritte();
		return this;
	},

	renderSchritte : function() {
		var area = this.$el.find('#schrittContainer');
		area.empty();
		if (this.schritte.length) {
			this.schritte.each(function(schritt) {
				var view = new SchrittView({
					model : schritt
				});
				area.append(view.render().el);
			}, this);
			return this;
		}
	},

	renderMaterial : function() {
		var area = this.$el.find('#materialContainer');
		area.empty();
		if (this.material.length) {
			this.material.each(function(material) {
				var view = new MaterialListEditView({
					model : material
				});
				area.append(view.render().el);
			}, this);
			return this;
		}
		;
	}

});

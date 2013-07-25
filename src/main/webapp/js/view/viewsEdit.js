var SchrittEditView = Backbone.View.extend({

    tagName: "div",

    templateEdit: _.template($('#template-SchrittEdit').html()),

    events: {
        'click #saveSchritt': 'read',
        'click #deleteSchritt': 'deleteModel'
    },

    read: function () {
        var t = this.$el.find('#schrittTitelIn').val();
        var b = this.$el.find('#schritt-textarea').val();
        this.model.set({
            schrittTitel: t,
            beschreibung: b
        });
        this.$el.find('#schrittEditModal').modal('hide');
        this.$el.html("");
    },

    deleteModel: function () {
        this.$el.find('#schrittEditModal').modal('hide');
        this.model.destroy();
        this.$el.html("");
    },

    render: function () {
        this.$el.html(this.templateEdit(this.model.toJSON()));
        return this;
    },

    createTextarea: function () {

        $('#schritt-textarea').wysihtml5({
            "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
            "emphasis": true, //Italics, bold, etc. Default true
            "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
            "html": false, //Button which allows you to edit the generated HTML. Default false
            "link": true, //Button to insert a link. Default true
            "image": true, //Button to insert an image. Default true,
            "color": false //Button to change color of font
        });


    }

});

var MaterialListEditView = Backbone.View.extend({

    tagName:"tr",

    templateEdit: _.template($('#template-MaterialListEdit').html()),

    events: {
        'click #editMaterial': 'editMaterial',
        'click #removeMaterial': 'removeMaterial'

    },

    editMaterial: function () {
        var materialEdit = new MaterialEditView({model: this.model});
        this.$el.append(materialEdit.render().el);
        this.$el.find('#materialEditModal').modal('show');
    },

    removeMaterial: function () {
        this.model.destroy();
        this.$el.html("<div></div>");
        return this;
    },

    render: function () {
        this.$el.html(this.templateEdit(this.model.toJSON()));
        return this;
    }
})

var MaterialEditView = Backbone.View.extend({
    tagName: "div",

    templateEdit: _.template($('#template-MaterialEdit').html()),

    events: {
        'click #saveMaterial': 'saveMaterial',
        'click #delete': 'delete'


    },

    saveMaterial: function () {
        var bes = this.$el.find('#matBeschreibung').val();
        var url = this.$el.find('#matURL').val();

        this.model.set({
            beschreibung: bes,
            url: url
        });
        this.$el.find('#materialEditModal').modal('hide');
        this.$el.html("");
    },

    delete: function () {
        this.$el.find('#materialEditModal').modal('hide');
        this.model.destroy();
        this.$el.html("");
    },

    render: function () {
        this.$el.html(this.templateEdit(this.model.toJSON()));
        return this;
    }
})

var AnleitungEditView = Backbone.View.extend({

    tagName: "div",

    templateEdit: _.template($('#template-TitelEdit').html()),

    initialize: function () {
        this.schritte = this.model.get("schritte");
        this.material = this.model.get("material");
        this.material.on("add", this.renderMaterial, this);
        this.material.on("change", this.renderMaterial, this);
        this.material.on("destroy", this.renderMaterial, this);
        this.schritte.on("add", this.renderSchritte, this);
        this.schritte.on("change", this.renderSchritte, this);
        this.schritte.on("destroy", this.renderSchritte, this);
    },

    events: {
        'click #addSchritt': 'addSchritt',
        'click #speichern': 'saveAnleitung',
        'click #addMaterial': 'addMaterial'

    },

    saveAnleitung: function () {
        var h = this.$el.find('#haupttitel').val();
        var u = this.$el.find('#untertitel').val();
        this.model.set({
            haupttitel: h,
            untertitel: u
        });
        this.model.save();
    },

    addSchritt: function () {
        var schritt = new Schritt();
        this.schritte.add(schritt);
        var view = new SchrittEditView({
            model: schritt
        });
        this.$el.append(view.render().el);
        view.createTextarea();
        console.log("Material " + this.material.length);
        this.$el.find('#schrittEditModal').modal('show');
    },

    addMaterial: function () {
        var mat = new Material();
        var materialEdit = new MaterialEditView({model: mat});
        this.material.add(mat);
        this.$el.append(materialEdit.render().el);
        this.$el.find('#materialEditModal').modal('show');
    },

    render: function () {
        this.$el.empty();
        this.$el.append(this.templateEdit(this.model.toJSON()));
        this.renderMaterial();
        this.renderSchritte();
        return this;
    },

    renderSchritte: function () {
        console.log("Test");
        var area = $('#schrittContainer');
        area.empty();
        if (this.schritte.length) {
            this.schritte.each(function (schritt) {
                var view = new SchrittView({
                    model: schritt
                });
                area.append(view.render().el);
            }, this);
            return this;
        }
    },

    renderMaterial: function () {
        var area = $('#materialContainer');
        area.empty();
        if (this.material.length) {
            this.material.each(function (material) {
                var view = new MaterialListEditView({
                    model: material
                });
                area.append(view.render().el);
            }, this);
            return this;
        }
        ;
    }

});


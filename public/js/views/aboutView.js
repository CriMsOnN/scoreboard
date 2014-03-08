// HomeView
define(['jquery', 'underscore', 'backbone', 'text!aboutTemplate'], function($, _, Backbone, aboutTemplate){

    return Backbone.View.extend({
        template: _.template(aboutTemplate),
		teams: {},
		tagName: "section",
		className: 'page',
		id: 'about',

        initialize:function () {
            this.render();
        },

        render:function () {
            $(this.el).html(this.template());
            return this;
        },
        close: function (event) {
			console.log('close')
		}

    });
});




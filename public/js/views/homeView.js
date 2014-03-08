// HomeView
define(['jquery', 'underscore', 'backbone', 'text!homeTemplate'], function($, _, Backbone, homeTemplate){

    return Backbone.View.extend({
        template: _.template(homeTemplate),
		teams: {},
		tagName: "section",
		className: 'page',
		id: 'home',

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




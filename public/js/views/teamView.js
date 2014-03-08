define(['jquery', 'underscore', 'backbone', 'utils', 'text!TeamTemplate'], 
function($, _, Backbone, utils, TeamTemplate){

    return Backbone.View.extend({
        template: _.template(TeamTemplate),
		tagName: "div",
		className: 'team-container',
		$score: {},
		game_id: null,
		
		initialize: function () { 
			this.listenTo(this.model, "change", this.render);
			this.model.game_id = this.options.game_id;
			this.render();
			_.bindAll(this);
        },

        events: {
            "click .btn-score-up"     : "addScore",
            "click .btn-score-down"   : "subtractScore"
        },

        render: function () {
 			this.$el.html(this.template(this.model.toJSON()));
			this.$score = this.$el.find('.team-points');
            return this;
        },

        addScore: function (e) {
			this.model.addScore(1);
        },

        subtractScore: function (e) {
			this.model.subtractScore(1)
        }

    });
});




define(['jquery', 'underscore', 'backbone', 'utils', 'TeamsCollection', 'TeamView',  'text!GameTemplate'], 
function($, _, Backbone, utils, TeamsCollection, TeamView,  GameTemplate){

    return Backbone.View.extend({
		template: _.template(GameTemplate),
		tagName: "section",
		className: 'page',
		id: 'game',
		
		// Join the game throug socket, then listen for the success event before rendering.
		initialize: function () {
			_.bindAll(this);
			var self = this;
			this.model.joinGame();
			self.render();
        },


		// create TeamView for each team.  let it handle itself
        render: function () {
			console.log(this.model.toJSON() );
			this.$el.html(this.template(this.model.toJSON()));
			
			var gameid = this.model.id;
			
			var scoreboard = this.$el.find('#scoreboard');
			
			var self = this;
			
			var teams = new TeamsCollection(this.model.toJSON().teams);
			
			teams.each( function(team){
				var t = new TeamView( {model: team , game_id: gameid});
				self.$el.find('#scoreboard').append(t.el);
			});
			
            return this;
        },

		// Clean UP
	    close: function (event) {
			this.model.exitGame();
		}


    });
});




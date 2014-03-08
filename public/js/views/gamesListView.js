// VIEW: gamesListView.js
define(['jquery', 'underscore', 'backbone', 'text!gamesListTemplate'], function($, _, Backbone, gamesListTemplate){

    return Backbone.View.extend({
		tagName: "section",
		className: 'page',
		id: 'games-list',
		
        initialize: function () {
            this.render();
        },

        template: _.template(gamesListTemplate),

        render: function () {
			var gamesCollection = this.model.toJSON(),
				games = {},
				heading = "";
				
			for( var i=0; i<gamesCollection.length; i++ )
			{
				var game = gamesCollection[i],
					first = game.title.charAt(0);
				if( first != heading ) {
					heading = first;
					games[heading] = [];
				}
				games[heading].push(game);
			}
			$(this.el).html(this.template({games: games}));
            return this;
        },

        close: function (event) {
			console.log('close')
		}

    });
    
});

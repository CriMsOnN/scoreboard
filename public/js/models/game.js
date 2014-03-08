define(['jquery', 'underscore', 'backbone'], 
function($, _, Backbone){

    return Backbone.Model.extend({
        urlRoot: "/games",
        idAttribute: "_id",
		socket: {},
	
		defaults:{
			teams: [],
			title: ''
		},
		
		initialize: function () {},

		validate: function(attrs, options) {
			console.log( attrs );
		  if (attrs.title = "" || !attrs.title ) {
			alert('no name');
		    return "Need a title!";
		  }
		  if ( attrs.teams.length < 2) {
			alert('no name');
		    return "Need 2 teams or more";
		  }
		},
		
	
		// called by view,  once joined set the app's current_game var so that only one game at a time is listened to.
		joinGame: function(){
			var self = this;
			this.socket = window.app.socket;
			this.socket.emit('join_game', { game_id: this.id });
			this.listenToOnce(self.socket, 'game_joined', function(){
				window.app.current_game=self.id; 
			});
		},
		
		// called by view,  this is required so that joining another game is possible.
		exitGame: function(){
			this.socket.emit('leave_game', { game_id: window.app.current_game });
		}

    });

});

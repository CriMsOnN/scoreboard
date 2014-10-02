define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

	return Backbone.Model.extend({
		socket: {},
		
		game_id: null,
		
		defaults: {
			team_id: 0,
			name: "",
			score: 0,
		},

		initialize: function() {
			_.bindAll(this);
			this.socket = window.app.socket;
			this.socket.on('score_updated', this.updateScore);
		},

		// from view
		addScore: function(n) {
			var data = this.toJSON();
			data.score += n;
			data.game_id = this.game_id;
			this.socket.emit('update_score', data);
		},
		
		// from view
		subtractScore: function(n) {
			var data = this.toJSON();
			data.score -= n;
			data.game_id = this.game_id;
			this.socket.emit('update_score', data);
		},
		
		
		// data back from websocket
		updateScore: function(data) {
			if (this.get('_id') == data._id) {
				this.set(data);
			}
		},


	});

});

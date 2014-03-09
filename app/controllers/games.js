var mongoose = require('mongoose'),
    Game = require('../models/game'),
	utils = require ('../../libs/sb_utils')
	config = {};



/**
*======================================
* INITIALIZE
*======================================
**/
exports.init = function(_io, config) {
	initWebSocket(_io);
	config = config;
};




/**
*======================================
*  connect to Socket.io
*======================================
**/
var initWebSocket = function(_io){
	
	_io.sockets.on('connection', function (socket) {
		console.log("games.js::  initWebSocket:  connection");
		socket.on('join_game', function (data) {
			console.log("games.js::  initWebSocket:  connected..  data.game_id = " + data.game_id);
			
		 	socket.join(data.game_id);
			_io.sockets.socket(socket.id).emit("game_joined"); 
		});

		
		socket.on('leave_game', function (data) {
		 	socket.leave(data.game_id);
			_io.sockets.socket(socket.id).emit("game_exited"); 
		});
		
		
		socket.on('update_score', function(data){
			var query = Game.findById(data.game_id, function(err, game){
				if( err ) console.log(err)
				console.log("games.js::  initWebSocket:  update_score..  findById:: game= " + game);
				game.updateScore(data, function(_team){
					_io.sockets.in(data.game_id).emit('score_updated', _team);
				})
			});
		});
		
	});
}





/**
*======================================
*  ROUTES 
*======================================
**/

// List all games
exports.list = function(req, res) {
	Game.list({}, function(err, items) {
		console.log( req.session );
		res.send(items);
	})
};



// Display One Game 
exports.load = function(req, res) {
	Game.load(req.params.slug, function(err, item) {
		var output = item;
		output.user = req.session.user || null;
		res.json(item);
	});
};


// Create 
exports.newGame = function(req, res) {
	
	if( config.user_auth ){
		if( !req.session.user ){
			res.json({err:"Terribly sorry, but you must be logged in"});
			return false;
		}
	}
	var gameData = req.body;

	var game = new Game(gameData);

	game.slug = utils.slug(gameData.title);

	game.save(function (err, data) {
		if( err ){
			res.json(err);
		}else{
			res.json(data);
		}
	})

};


// Common.js
// require.js is the only file loaded on index.html.  It points to this as the main file, allowing me to config all my other files
require.config({
    paths: {
        'jquery': 			'lib/jquery-1.8.2.min',
        'underscore': 		'lib/underscore-min',
        'backbone': 		'lib/backbone-min',
        'bootstrap': 		'lib/bootstrap.min',
		'socketio': 		'/socket.io/socket.io.js',
        'text': 			'lib/text',
        'utils': 			'utils',

		'UserModel': 		'models/user',
        'SignupView': 		'views/signupView',
        'SignupTemplate': 	'../templates/signupTemplate.html',
		
		'GameModel': 		'models/game',
  		'GamesCollection': 	'collections/games',
        'GameView': 		'views/gameView',
        'GameTemplate': 	'../templates/gameTemplate.html',
        
		'TeamView': 		'views/teamView',
        'TeamTemplate': 	'../templates/teamTemplate.html',
		'TeamModel': 		'models/team',
  		'TeamsCollection': 	'collections/teams',

        'GamesListView': 	'views/gamesListView',
        'gamesListTemplate':'../templates/gamesListTemplate.html',

        'HomeView': 		'views/homeView',
        'homeTemplate': 	'../templates/homeTemplate.html',

        'AboutView': 		'views/aboutView',
        'aboutTemplate': 	'../templates/aboutTemplate.html',

        'NewGameView': 		'views/newGameView',
        'NewgameTemplate': 	'../templates/newgameTemplate.html'
    },
	// the shim is for adding dependancies, and aliases 
    shim: {
        'jquery': {
            exports: "$"
        },
        'underscore': {
            exports: "_"
        },
        'socketio': {
            exports: "io"
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});


require(['jquery', 'underscore', 'socketio', 'backbone', 'approuter'], function($, _, io, Backbone, AppRouter){
  
 	$(function(){
		
		window.app = new AppRouter();

       	Backbone.history.start();

   });


});




var env = process.env.NODE_ENV || 'development'
	, config = require ('./config').items[env]
 	, express = require('express')
	, MongoStore = require('connect-mongo')(express)
	, mongoose = require('mongoose')
    , path = require('path')
    , http = require('http')
    , games = require('./app/controllers/games')
    , users = require('./app/controllers/users')
	, app = express()
	, srvrconf = config.real_time_server
	, server; 


/**
*======================================
*  ::: Mongoose Connect  ::: 
*======================================
**/
mongoose.connect(config.db)

var sessionStore = new MongoStore({
  	url: config.db
});


/**
*======================================
*  ::: Configure Express  ::: 
*======================================
**/
app.configure(function () {
    app.set('port', srvrconf.port);
    app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({
	    secret: config.cookie_secret,
		secure: true,
	    store: sessionStore
	  }));
    app.use(express.static(path.join(__dirname, 'public')));
    // app.use(express.static(path.join(__dirname, (env === 'production') ? 'public-built' : 'public')));
});

server = http.createServer(app).listen(app.get('port'), function () {
    console.log("EXPRESS PORT:: " + app.get('port'));
});




/**
*======================================
*  ::: Open Web Socket ::: 
*  auth help from https://gist.github.com/bobbydavid/2640463
*======================================
**/
var io = require('socket.io').listen(server, {'log level':1});



/**
*======================================
*  ::: INIT ::: 
*======================================
**/

games.init(io,config);





/**
*======================================
*  ::: Routes ::: 
*======================================
**/
app.get('/games', games.list);
app.get('/games/:slug', games.load);
app.post('/games', games.newGame);
app.post('/users', users.signup);

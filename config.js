// export NODE_ENV=development 
exports.items={	
	production : {
		real_time_server : {port: process.env.PORT ||  3001, host: '127.0.0.1'},
		db : process.env.MONGOLAB_URI || 'mongodb://localhost:27017/scoreboard',
		cookie_secret : "cookiemonsterlovecookies"
	},
	development : {
		real_time_server : {port: process.env.PORT ||  3001, host: '127.0.0.1'},
		db : process.env.MONGOLAB_URI || 'mongodb://localhost:27017/scoreboard',
		cookie_secret : "cookiemonsterlovecookies"
	}
};

exports.info = {
	version: '0.0.1'
}
var mongoose = require('mongoose'),
	env = process.env.NODE_ENV || 'development',
	config = require('../../config').items[env],
	Schema = mongoose.Schema;


var TeamSchema = new Schema({
	name: String,
	score: Number
});

TeamSchema.path('name').validate(function(name) {
	return name.length > 0
}, 'Teams must have a name');


module.exports =  mongoose.model('TeamSchema	', TeamSchema);

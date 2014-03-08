var mongoose = require('mongoose')
	, env = process.env.NODE_ENV || 'development'
	, config = require('../../config').items[env]
	, Schema = mongoose.Schema
	, Team;




/**
 *======================================
 *  ::: Schemas  :::
 *======================================
 **/


var TeamSchema = new Schema({
	name: String,
	score: Number
});

TeamSchema.path('name').validate(function(name) {
	return name.length > 0
}, 'Teams must have a name');

Team =  mongoose.model('TeamSchema	', TeamSchema);





var GameSchema = new Schema({
	title: {
		type: String,
		trim: true
	},
	slug: {
		type: String,
		trim: true
	},
	teams: [TeamSchema],
	createdAt: {
		type: Date,
		default: Date.now
	}
	// ,scorekeeper: {
	// 	type: Schema.ObjectId,
	// 	ref: 'User'
	// }
})

GameSchema.path('title').validate(function(title) {
	return title.length > 0
}, 'Game must have a name');

GameSchema.path('teams').validate(function(teams) {
	return teams.length > 1
}, 'Game must have at least 2 teams');



/**
 *======================================
 *  ::: Model Methods  :::
 *======================================
 **/
GameSchema.methods.updateScore = function(team, cb) {
	var t = this.teams.id(team._id);
	t.score = team.score;
	this.save(cb(t));
}





/**
 *======================================
 *  ::: Model Statics  :::
 *======================================
 **/

GameSchema.statics = {
	
	/**
	 * List Games
	 *  - optional parameters to refine list,  otherwise all
	 */
	list: function(options, cb) {
		var criteria = options.criteria || {}

		this.find(criteria).populate('user', 'name username').sort({
			'title': 1
		}) // sort by title
		.exec(cb)
	},
	
	
	/* Find by Id  */
	load: function(slug, cb) {  
		this.findOne({
			slug: slug
		}).exec(cb)
	}



}



module.exports =  mongoose.model('GameSchema', GameSchema);

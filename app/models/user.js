var mongoose = require('mongoose')
	, crypto = require("crypto")
	, env = process.env.NODE_ENV || 'development'
	, config = require('../../config').items[env]
	, Schema = mongoose.Schema
	, Validations = require('../../libs/sb_validations.js')
	, salt = 'SaltString';


var	hashPw = function (pass) {
	var h = crypto.createHash('sha512');
	h.update(pass);
	h.update(salt);
	return h.digest('base64');
};

var UserSchema = new Schema({
	name: 		  {type: String, required: true,  trim: true }
  , email       : {type: String, required: true, unique: true, trim: true, lowercase: true }
  , password    : {type: String, set: hashPw, required: true }
});
 


module.exports =  mongoose.model('User', UserSchema);


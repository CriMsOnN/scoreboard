var mongoose = require('mongoose'),
    User = require('../models/user'),
	utils = require ('../../libs/sb_utils')


/**
*======================================
*  ROUTES 
*======================================
**/

exports.signup = function(req, res) {
	
	if( !req.body ){
        return res.redirect('/Err404')
    }

	var user = new User(req.body);
    user.save( function(err) {
        if( err ){ 
			console.log(err)
        } else { 
			req.session.user = {
				id: user.get('id'),
				email: user.get('email'),
			}
			res.json(user);
        }
    })
	
};



exports.signIn = function(req,res,next) {
};



exports.signOut = function(req, res) {
};


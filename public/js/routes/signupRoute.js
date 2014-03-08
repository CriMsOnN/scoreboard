define(['jquery', 'underscore', 'UserModel', 'SignupView'], function($, _, UserModel, SignupView){
    return {
        init: function(){
            return new SignupView({model: new UserModel()});
        }
    }
});
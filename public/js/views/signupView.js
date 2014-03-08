// HomeView
define(['jquery', 'underscore', 'backbone', 'text!SignupTemplate'], function($, _, Backbone, SignupTemplate){

    return Backbone.View.extend({
        template: _.template(SignupTemplate),
		teams: {},
		tagName: "section",
		className: 'page',
		id: 'signup',

        initialize:function () {
            this.render();
        },

        render:function () {
            $(this.el).html(this.template());
            return this;
        },

        close: function (event) {
			console.log('close')
		},

        events: {
            "click #submit-new-user"   : "submitUser"
        },

		change: function(){
			this.render();
		},

        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },

		validate: function(){
			return true;
		},

		submitUser: function(e){
			e.preventDefault();
			
			if( ! this.validate() ) return false;
			
			this.model.save(
				{	
					name:$("#name").val() ,  
					email: $("#email").val() ,
					password: $("#password").val()
				}, 
				{	
					success: function(model, response) {
						console.log('success:: ' + response );
						console.log( response )
	  					// window.app.navigate( 'games/'+slug,  {trigger: true})
					},
					error: function() {
					},
					wait: true
				}
			);
		}


    });
});




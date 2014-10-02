// AppRouter
define(['jquery', 'underscore', 'backbone'], function($, _, Backbone){

    return Backbone.Router.extend({

		socket : {},
		
		current_game : null,
		
        routes: {
            ""                  : "home",
            "home"              : "home",
            "about"				: "about",
            "games"				: "gamesList",
            "games/new"      	: "newGame",
            "games/:id"         : "viewGame",
            "signup"         	: "signup",
            "signin"         	: "signin",
            "signout"         	: "signout"
        },

        initialize: function () {
            this.$navItems = $('.nav-btn');
			this.socket =  io.connect();
        },

		
		// Replaces the view with new content...
        setContent: function(view){
		
			if (this.currentView){
	        	this.currentView.close();
	      	}
	    
	  		this.currentView = view;
            $('#content').html(view.el)
						 .stop()
						 .animate({opacity:1}, 200,function(){});
	    },
	
		// Page Transition
        transition: function( clback ){
			$('#content').stop().animate({opacity:0},200, clback );
        },

        selectMenuItem: function(menuItem){
            $('.nav-btn').removeClass('active');
            
			if (menuItem) {
                this.$navItems.filter('.' + menuItem).addClass('active');
            }    
        },


		/**********************
		*** BEGIN  ROUTES *****
		**********************/
		
		
        home: function () {
            var self = this;
			
			this.selectMenuItem('nav-home');
			
			this.transition(function(){
				require(['routes/homeRoute'], function(view){
	                self.setContent(view);
	            });
			});
        },

        about: function () {
            var self = this;
			
			this.selectMenuItem('nav-about');
			
			this.transition(function(){
				require(['routes/aboutRoute'], function(view){
	                self.setContent(view);
	            });
			});
        },

        gamesList: function() {
            var self = this;
		
			this.selectMenuItem('nav-find-game');
		
			this.transition(function(){
	 			require(['routes/gamesListRoute'], function(view){
	    			view.init().done(function(view){
	                    self.setContent(view);
	                });
	            });
			});
        },


        viewGame: function (id) {
            var self = this;
			this.selectMenuItem();
			this.transition(function(){
	    		require(['routes/gameRoute'], function(view){
	                view.init(id).done(function(view){
						self.current_game = id;
	                    self.setContent(view);
	                });
	            });
			});
        },

        newGame: function() {
            var self = this;
           
 			this.selectMenuItem('nav-new-game');

			this.transition(function(){
	            require(['routes/newGameRoute'], function(view){
	                var view = view.init();
	                self.setContent(view);
	            });
			});
        },


        signup: function() {
            var self = this;
           
 			this.selectMenuItem('nav-login');

			this.transition(function(){
	            require(['routes/signupRoute'], function(view){
	                var view = view.init();
	                self.setContent(view);
	            });
			});
        },
        signin: function() {
        },
        signout: function() {
        },

    });

});

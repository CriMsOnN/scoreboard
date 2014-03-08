// GameView
define(['jquery', 'underscore', 'backbone', 'utils', 'text!NewgameTemplate'], function($, _, Backbone, utils, NewgameTemplate){

    return Backbone.View.extend({
		template: _.template(NewgameTemplate),
		teams: {},
		tagName: "section",
		className: 'page',
		id: 'new-game',
		teams: [],

        initialize: function () {
			this.teams = [];
			this.listenTo(this.model, 'change:teams', this.change );
            this.render();
        },

        close: function (event) {
			console.log('close new game view')
		},
		
        events: {
            "click #add-team"   : "addTeam",
            "click .remove-team"   : "removeTeam",
            "click #submit-new-game"   : "submitGame"
        },

		change: function(){
			this.render();
		},
		
        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },

		submitGame: function(e){
			e.preventDefault();
			var t = $("#title").val();
			
			this.model.save(
				{	
					title:t ,  
					teams: this.teams 
				}, 
				{	
					success: function(model, response) {
	  					window.app.navigate( 'games/'+response.slug,  {trigger: true})
					},
					error: function(err) {
						alert( err )
					},
					wait: true
				}
			);
		},
		
        addTeam: function (e) {
			e.preventDefault();
			var t = $("#team").val();
			$("#team").val('').attr('placeholder', 'add more');
			if( t.length  ){
				var li = $('<li class="team-li"><span class="team-name">'+t+'</span> <span class="remove-team">X</span></li>')
				$("#teams-list").append(li);
					this.teams.push({
					name: t, 
					score: 0, 
					team_id: 0 + this.teams.length
				});
			}
			this.checkButton();
        },

        removeTeam: function (e) {
			e.preventDefault();
			var index = $(e.target).index();
			this.teams.splice( index, 1);
			$('.team-li').eq(index).remove();
			this.checkButton();
        },

		checkButton: function(e){
			if( this.teams.length >= 2){
				$("#submit-new-game").removeClass('hidden');
			}else{
				$("#submit-new-game").addClass('hidden');
			}
		}

    });
});

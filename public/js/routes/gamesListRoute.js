define(['jquery','underscore', 'GamesCollection',  'GamesListView'], 
function($, _, GamesCollection, GamesListView){
    return {
        init: function(id){
			var gamesList = new GamesCollection(),
			defer = $.Deferred(),
			renderPromise = defer.then(function(){
               	return new GamesListView({model: gamesList});
            });
			gamesList.fetch({success: function(){
	            defer.resolve();
	        }});
	        return renderPromise;
        }
    }

});

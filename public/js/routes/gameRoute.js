define(['jquery', 'underscore', 'GameModel', 'GameView'], 
function($, _, Game, GameView){
    return {
		init: function(id){
            var game = new Game({_id: id}),
            defer = $.Deferred(),
            renderPromise = defer.then(function(){
                return new GameView({model: game});
            });
            game.fetch({success: function(){
                defer.resolve();
            }});
            return renderPromise;
        }
    }
});
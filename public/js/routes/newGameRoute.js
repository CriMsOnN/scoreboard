define(['jquery', 'underscore', 'GameModel', 'NewGameView'], function($, _, GameModel, NewGameView){
    return {
        init: function(){
            return new NewGameView({model: new GameModel()});
        }

    }
});
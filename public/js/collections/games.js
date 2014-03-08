// GamesCollection
define(['jquery', 'underscore', 'backbone', 'GameModel'], function($, _, Backbone, GameModel){
    return Backbone.Collection.extend({
        model: GameModel,
        url: "/games"
    });
});

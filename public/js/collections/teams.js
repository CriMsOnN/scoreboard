// GamesCollection
define(['jquery', 'underscore', 'backbone', 'TeamModel'], function($, _, Backbone, TeamModel){
    return Backbone.Collection.extend({
        model: TeamModel
    });
});

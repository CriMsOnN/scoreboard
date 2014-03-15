Scoreboard
=========

Scoreboard is a very simple scorekeeping app, that lets you keep score in real time.  Just create a new game, add players/teams and start keeping score.  Nothing fancy.

####disclaimer
This is in development, this is by no means a finished product or tested in any real life situation.


Tech
---------
Basic list of tech/libraries used:
  - Built with Node.js Server
  - Socket.io for sweet realtime fun
  - MongoDB for storage
  - Backbone.js for frontend architecture

ToDo - roadmap
---------
Like I said, still in development
  1. User Auth: Currently logging in does nothing. I only want the creator of the game to have control of changing scores.  I'm looking into Token-based Authentication for use with socket.io.

  2. Design: Currently it's ugly (purposly) so I don't get distracted. I need to add a design and spend some time thinking about usability.

  3. Bower & Grunt: Build Process and concat/minification of files.  I'm not doing anything right now.

  4. Refactor 

  5. Test

  6. Brainstorm possible Enhancements:
    - messaging (chatroom-esque).  Think Play-by-play
    - social integration? post scores to twitter/facebook with link back to game
    - email? welcome email, change password, invitation to check out game when created
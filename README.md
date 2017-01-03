# pokerapp

***NOTE: This app is seeded with a full deck of cards and fake user.  Due to a bug, when npm.start is run for the first time, 
the database does not seed properly. This resolves by running npm.start a second time.

This is a poker game app with user signup and login. Players start with 500 chips upon signup, with some random players 
recieving 1000 chips.  The account management page allows users to add payment information and purchase additional chips. 
The leaderboard page has a button that displays all users with 1000+ chips.  

When the logged in user enters the game, their chips are loaded into the game.  The poker game evalutes pairs, three of a kind, 
and four of a kind without evaluating card rank.  Players can bet chips and their totals are adjusted accordingly.  



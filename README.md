# pokerapp

**The app is seeded with a deck of cards and a fake user. Due to a minor bug, when the app runs for the first time the database doesn't seed properly.  This resolve by running npm start a second time.  

This is a poker game app with user signup and login. Players start with 500 chips upon signup, with some random players 
recieving 1000 chips. The account management page allows users to add payment information, purchase additional chips, or delete their account.

The leaderboard page has a button that displays all users with 1000+ chips.  

When a logged in user enters the game, their chips are loaded into the game.  The poker game evalutes pairs, three of a kind, 
and four of a kind.  Player and opponent are dealt 2 random cards from a deck of 52. Three random community cards are also dealt, and players combine these cards with their own to make the best possible hand. The poker game evalutes pairs, three of a kind, and four of a kind.  Rank is not evaluated, so similar hand strengths evaluate as ties. Players can bet chips and their totals are adjusted accordingly.  



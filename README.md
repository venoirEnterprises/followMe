# General
FollowMe - communicate with and save the enemies all around you. Shooting is bad. A game engine built from scratch in jQuery, .NET with mongoDB | CSV loading. Full of all the features you'd expect, including online play. Please see readme for setup instructions on how to run the game locally. It is built to look like an 8bit platformer, but with so many more features

# Current features and overview
8bit graphics platformer with checkpoints
Level editor and % complete
Ability to lock levels based on finishing other levels, or % complete
Achievement badges and levelling up which also improves your powers
Level selector
Configurable keys, CSV based level loading

The system will remember your level state, such as the checkpoint, your character name and so forth, so if you are loading the project a second time, you can just reload the page, and it'll continue as normal
If you don't have any of this state information, then you're thrown back to the registration page - or at least you should be, then you can register

# Future ideas
Harvesting money and construction scraps
Level editor and as a power up
Enhanced level features
Bosses
Social interaction with characters
Shop and further power-ups including sonar

# Functional overview
jQuery as the logic engine, displayed if a page is set as .isGame in what's known as the "routing" logic
"Routing" being the system .NET MVC uses to show you a page based on a link such as http://localhost:43809/EndingTheBeginning/youllKnowWhatToDo which is what URL the first level will run on when it starts
The entire game is built from a single sprite sheet, which is browsed from the jQuery
The database is called mongo, and can be installed below. It's tiny, and takes a few seconds to load
Using CSV, which is just a load of commas separating different entries with headers, we build the entire database for the game, including the level design. This loading is all scripted

# Setup
Firstly, you're going to need visual studio. If you don't already have it, this link will download it. https://www.visualstudio.com/thank-you-downloading-visual-studio/?sku=Community&rel=15
Next, you'll need mongo, so you can have a database to put all the data into the game. Here is the place https://www.mongodb.com/download-center?jmp=nav#community
Once you've got that, clone the code from git, and in visual studio open the solution
In \followMe\mDB files\ there are two bat files.
You'll need to edit these to point at the locations of mongod. This is usually C:\Program Files\MongoDB\Server\3.4\bin but of course that depends on the version
Please copy the bat files and amned them somewhere else, this must not be part of a commit
Then you run mongoLocal.bat to build the database, and mongoImport.bat to then actually put the data into that database itself
Then in visual studio, click "Google Chrome" or whichever browser pops up, and the project will run

There is a small problem here, and I'm not sure if you'll get it in your version.
When the project runs, copy the URL, and paste it into your normal browser, as visual studio will create its own version.
Don't close the browser visual studio creates, it will just stop the game running. It's easier if you run the game in a different browser, so you can use the state saving to keep playing
Register, and you're off, after the registration which has some issues you're free to resolve. Bootstrap was there once, but it's all gone for some reason I can't track
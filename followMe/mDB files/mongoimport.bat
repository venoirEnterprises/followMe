cd\
cd "C:\Program Files\MongoDB\Server\3.4\bin"

mongoimport -h 127.0.0.1:27017 -d followme -c weapons --file "C:\Users\nvsib\Source\Repos\Venoir_Git\Venoir\followMe\followMe\mDB files\weapons.csv" --headerline --type csv --drop


mongoimport -h 127.0.0.1:27017  -d followme -c levelSelectImagesDefinition --file "%~dp0\0_checkpoint.csv" --headerline --type csv --drop

mongoimport -h 127.0.0.1:27017  -d followme -c levelSelectImagesDefinition --file "%~dp0\0_items.csv" --headerline --type csv

mongoimport -h 127.0.0.1:27017  -d followme -c levelSelectImagesDefinition --file "%~dp0\0_surface.csv" --headerline --type csv

mongoimport -h 127.0.0.1:27017  -d followme -c levelSelectImagesDefinition --file "%~dp0\0_teleports.csv" --headerline --type csv


mongoimport -h 127.0.0.1:27017  -d followme -c youllKnowWhatToDoImagesDefinition --file "%~dp0\1_surface.csv" --headerline --type csv --drop

mongoimport -h 127.0.0.1:27017  -d followme -c youllKnowWhatToDoImagesDefinition --file "%~dp0\1_caves.csv" --headerline --type csv

mongoimport -h 127.0.0.1:27017  -d followme -c youllKnowWhatToDoImagesDefinition --file "%~dp0\1_checkpoint.csv" --headerline --type csv

mongoimport -h 127.0.0.1:27017  -d followme -c youllKnowWhatToDoImagesDefinition --file "%~dp0\1_enemies.csv" --headerline --type csv



mongoimport -h 127.0.0.1:27017  -d followme -c theEnemiesAreComingImagesDefinition --file "%~dp0\2_caves.csv" --drop --headerline --type csv

mongoimport -h 127.0.0.1:27017  -d followme -c theEnemiesAreComingImagesDefinition --file "%~dp0\2_enemies.csv" --headerline --type csv

mongoimport -h 127.0.0.1:27017  -d followme -c theEnemiesAreComingImagesDefinition --file "%~dp0\2_checkpoint.csv" --headerline --type csv

mongoimport -h 127.0.0.1:27017  -d followme -c theEnemiesAreComingImagesDefinition --file "%~dp0\2_surface.csv" --headerline --type csv


mongoimport -h 127.0.0.1:27017  -d followme -c levelList --file "%~dp0\levelList.csv" --headerline --type csv --drop

mongoimport -h 127.0.0.1:27017  -d followme -c statsToRank --file "%~dp0\statsToRank.csv" --headerline --type csv --drop

mongoimport -h 127.0.0.1:27017  -d followme -c xpStats --file "%~dp0\xpStats.csv" --headerline --type csv --drop

mongoimport -h 127.0.0.1:27017  -d followme -c xpToRank --file "%~dp0\xpToRank.csv" --headerline --type csv --drop

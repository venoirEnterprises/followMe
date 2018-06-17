using followMe.Models;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System;
using System.Collections.Generic;
using System.Linq;

namespace followMe.Services
{
    public class userMethods : advancedServices
    {
        NavigationServices move = new NavigationServices();
        public void updateAccessTime(string action, string username)
        {
            var db = getDB();
            var users = db.GetCollection<userDefined>("userDefined");
            userDefined userToUpdate = users.FindOne(Query.EQ("username", username));
            switch (action)
            {
                case "newAccess":
                    userToUpdate.lastActive = DateTime.Now;
                    break;
                case "exit":
                    userToUpdate.lastLoggedOut = DateTime.Now;
                    break;
            }
            users.Save(userToUpdate);
        }

        public void quitUser(string username)
        {
            var server = getMongoClient();
            var mongo = server.GetServer();
            var db = mongo.GetDatabase("followme");
            var users = db.GetCollection<userDefined>("userDefined");
            var resetUserCheckpoint = users.FindOne(Query.EQ("username", username));
            if (resetUserCheckpoint != null)//invalid username change locally
            {
                username = changeStringDots(username, false);
                updateAccessTime("exit", username);
                resetUserCheckpoint.checkpoint = 0;
                users.Save(resetUserCheckpoint);

                var loginLog = db.GetCollection("loginLog");
                loginLog.Remove(Query.And(Query.EQ("username", username), Query.EQ("loggedIn", true)));
            }
            //Clients.All.userQuitting(username);
        }
        public void getWeapons(string username)
        {
            var server = getMongoClient();
            var mongo = server.GetServer();
            var db = mongo.GetDatabase("followme");
            //using (mongo.RequestStart(db))
            //{
            var collection = db.GetCollection<weapon>("weapons");
            var result = collection.FindAll();
            foreach (var item in result)
            {
                Clients.All.getWeapons(username, item);
            }
            //}
        }
        public void getWeapon(string username, bool online, bool community)
        {
            var username2 = changeStringDots(username, false);
            var server = getMongoClient();
            var mongo = server.GetServer();
            var db = mongo.GetDatabase("followme");
            //using (mongo.RequestStart(db))
            //{
            var collection = db.GetCollection<userDefined>("userDefined");
            var theUser = collection.FindOne(Query.EQ("username", username2));
            if (theUser != null)
            {
                int weaponID = theUser.weaponID;
                var weaponDefinition = db.GetCollection<weapon>("weapons");
                var theirWeapon = weaponDefinition.FindOne(Query.EQ("identifierToSee", weaponID));
                if (theUser.personType != "3")
                {
                    Clients.All.getWeapon(username, theirWeapon, online, community);
                }
            }
        }

        public void getUserStats(bool leader, string username, string levelName, string sessionID)
        {
            var server = getMongoClient();
            var mongo = server.GetServer();
            var db = mongo.GetDatabase("followme");
            var person = db.GetCollection<userDefined>("userDefined");
            var statsForRank = db.GetCollection<statsForRank>("statsToRank");
            var statsForXpAll = db.GetCollection<statsForXP>("xpStats");
            var statsUserLog = db.GetCollection<xpStatsUserLog>("xpStatsUserLog");
            var xptoRankAll = db.GetCollection<xpToRank>("xpToRank");
            var loginLog = db.GetCollection<loginLog>("loginLog");

            var username2 = changeStringDots(username, false);
            List<loginLog> validLoginCount = getLoginLogSessionID_username(username);
            var sessionIDToCompare = "";
            if (validLoginCount.Count == 1)
            {
                sessionIDToCompare = validLoginCount.First()._id.ToString();
            }
            if (username != null && sessionID != null && sessionIDToCompare == sessionID)//#70
            {
                var showPrizes = true;
                var userToQuery = person.FindOne(Query.EQ("username", username2));
                var statsToQuery = statsForRank.FindOne(Query.EQ("rank", userToQuery.rank));
                var statsXPlist = new List<statsForXP>();
                foreach (var item in statsForXpAll.FindAll().ToList())
                {
                    if (item.action == "allPrizes")//List of those conditional items, change to switch
                    {
                        if (levelName != "" && statsToQuery != null)
                        {
                            item.numberToDo = getTypeOfObjectForLevel(levelName, "EndingTheBeginning", "bonuses");  //As of 1.12.5 there is no concept of worlds yet [would need regions too]                   
                        }
                        showPrizes = false;
                    }

                    foreach (var userLog in statsUserLog.Find(Query.EQ("username", username2)).ToList())
                    {
                        if (userLog.actionType == item.action + item.type && userLog.isBlocker)
                        {
                            if (item.oncePerLevel && userLog.nonSpecialDefinition == levelName || item.special)
                            {
                                item.type = "done";
                            }
                            //else {
                            //    item.type = item.type;
                            //}                                                     
                        }
                        if (/*(item.oncePerLevel == false) ||*/ (userLog.actionType == "prizefind" || userLog.actionType == "allPrizesFind") && showPrizes == false && item.type == "find" && userLog.numberDone >= item.numberToDo)
                        {
                            item.type = "done";
                        }
                    }
                    statsXPlist.Add(item);
                }

                var xpToRankForPlayer = xptoRankAll.FindOne(Query.EQ("rank", userToQuery.rank));
                if (userToQuery != null)
                {
                    long howManyNotifications = db.GetCollection("notifications").Find(Query.And(
                        Query.EQ("to", username2),
                        Query.EQ("read", false))).Count();

                    Clients.All.displaydesign(leader, userToQuery.head, userToQuery.chest, userToQuery.legs,
                        userToQuery, username, statsToQuery, xpToRankForPlayer.maxXP, howManyNotifications);
                    Clients.All.getXPAllocationArray(username, statsXPlist);
                    //Should be statsToRank
                }
            }
            else
            {
                //#70 invalid sessionID relationship destroys the user's active session, just in case
                quitUser(username);
                Clients.All.forceQuitPlayer(username, sessionID);
            }
        }
        public void updateHealth(string username, int newhealth, int oldHealth, bool dying, int maxLives)
        {
            username = changeStringDots(username, false);
            var db = getDB();
            var person = db.GetCollection<userDefined>("userDefined");
            var levelList = db.GetCollection<levelList>("levelList");
            var userToQuery = person.FindOne(Query.EQ("username", username));
            var levelToQuery = levelList.FindOneAs<levelList>(Query.And(
                Query.EQ("worldNumber", userToQuery.world),
                Query.EQ("identifier", userToQuery.level)
                ));
            //var levelToQuery = levelList.FindOne(Query.EQ("_id", userToQuery.world));
            string levelName = levelToQuery.fullName.ToString();
            var queryingString = levelName + "Imagessurface";
            var startpoint = db.GetCollection<image>(queryingString);
            var startpoint2 = startpoint.FindOne(Query.EQ("startpoint", true));
            if (dying)
            {
                userToQuery.lives = userToQuery.lives - 1;
                if (userToQuery.lives <= 0)
                {
                    userToQuery.lives = maxLives;
                }
                userToQuery.health = oldHealth;
                //Clients.All.updateMemberLives(userToQuery, startpoint2, username);
                //All back calls need to be removed
            }
            userToQuery.health = newhealth;
            person.Save(userToQuery);
        }
        public void gameOver(string username, int lifeCount, int maxHealth)
        {
            username = changeStringDots(username, false);
            var db = getDB();
            var person = db.GetCollection<userDefined>("userDefined");
            var userToQuery = person.FindOne(Query.EQ("username", username));
            userToQuery.lives = lifeCount;
            userToQuery.checkpoint = 0;
            userToQuery.health = maxHealth;
            person.Save(userToQuery);
        }
        public void surrender(string username)
        {
            username = changeStringDots(username, false);
            var db = getDB();
            var person = db.GetCollection<userDefined>("userDefined");
            var userToQuery = person.FindOne(Query.EQ("username", username));
            userToQuery.checkpoint = 0;
            userToQuery.levelPlayTime = 0;
            person.Save(userToQuery);
        }
        public void updateXPorLevel(string username, int xp)
        {
            username = changeStringDots(username, false);
            var db = getDB();
            var person = db.GetCollection<userDefined>("userDefined");
            var userToQuery = person.FindOne(Query.EQ("username", username));
            var xptoRankAll = db.GetCollection<xpToRank>("xpToRank");
            var xpToRankDefined = xptoRankAll.FindOne(Query.EQ("rank", userToQuery.rank));
            var statsForRankAll = db.GetCollection<statsForRank>("statsToRank");
            var statsToQuery = statsForRankAll.FindOne(Query.EQ("rank", userToQuery.rank + 1));
            if (xpToRankDefined.maxXP <= xp)
            {
                userToQuery.rank += 1;
                userToQuery.health = statsToQuery.health;
                userToQuery.maxHealth = statsToQuery.health;
            }



            userToQuery.XP = xp;
            person.Save(userToQuery);
            var xpNextRank = xptoRankAll.FindOne(Query.EQ("rank", userToQuery.rank));
            Clients.All.playerNewXPAndRank(changeStringDots(username, true), userToQuery.XP, userToQuery.rank, xpNextRank.maxXP, statsToQuery);
        }
        public void updateXPLogForUser(string username, string XPStatsAction, string XPStatsType, string levelName)
        {
            username = changeStringDots(username, false);
            var db = getDB();
            var person = db.GetCollection<userDefined>("userDefined");
            var userToQuery = person.FindOne(Query.EQ("username", username));
            var statsForXPAll = db.GetCollection<statsForXP>("xpStats");
            var statToLog = statsForXPAll.FindOne(Query.And(Query.EQ("type", XPStatsType), Query.EQ("action", XPStatsAction)));
            var personStatToAdd = db.GetCollection<xpStatsUserLog>("xpStatsUserLog");
            var userLogForXP = personStatToAdd.FindOne(Query.And(Query.EQ("actionType", XPStatsAction + XPStatsType), Query.EQ("username", username)));

            if (statToLog.oncePerLevel && (userLogForXP == null || userLogForXP.nonSpecialDefinition != levelName))
            {
                userLogForXP = null;// for now until world names, 
            }

            bool isBlocking = false;
            if (statToLog.special || statToLog.oncePerLevel)
            {
                isBlocking = true;
            }
            var insertThisLog = new xpStatsUserLog
            {
                username = username,
                actionType = XPStatsAction + XPStatsType,
                forSpecial = statToLog.type,
                isBlocker = isBlocking,
                nonSpecialDefinition = levelName,
                numberDone = statToLog.numberToDo
            };

            if (userLogForXP == null)
            {
                personStatToAdd.Insert(insertThisLog);
                personStatToAdd.Save(insertThisLog);
            }
            else
            {
                userLogForXP.numberDone += 1;
                personStatToAdd.Save(userLogForXP);
            }
        }



        public int getTypeOfObjectForLevel(string levelName, string worldName, string objectType)//as of 1.12.4 no "worlds"
        {
            int returnThis = 0;
            var db = getDB();
            levelList levelDefinition = db.GetCollection<levelList>("levelList").FindOne(Query.And(Query.EQ("fullName", levelName), Query.EQ("worldName", worldName)));
            playerProgressInLevel playerProg = db.GetCollection<playerProgressInLevel>("playerProgressInLevel").FindOne(Query.And(Query.EQ("levelIdentifier", levelName), Query.EQ("worldName", worldName)));

            if (playerProg != null && levelDefinition != null)//stop non game levels getting here
            {
                switch (objectType)
                {
                    case "allies":
                        returnThis = levelDefinition.alliesToSave - playerProg.alliesSaved;
                        break;
                    case "bonuses":
                        returnThis = levelDefinition.bonusesIncluded - playerProg.bonusesFound;
                        break;
                    case "checkpoints":
                        returnThis = levelDefinition.checkpointsToCross - playerProg.checkpointsCrossed;
                        break;
                    case "caves":
                        returnThis = levelDefinition.cavesToOpen - playerProg.cavesOpened;
                        break;
                }
            }
            return returnThis;

        }

        public void updateUserSettings(userDefined myModel, string username)
        {
            bool hasErrored = false;
            try
            {
                var db = getDB();
                db.GetCollection<userDefined>("userDefined").Save(myModel);
            }
            catch
            {
                hasErrored = true;
                Clients.All.returnSettingsSave("failure:username");
            }
            if (!hasErrored)
            {
                Clients.All.returnSettingsSave("success:username");
            }
        }

        public List<loginLog> getLoginLogSessionID_username(string username)
        {
            var db = getDB();
            var loginLog = db.GetCollection<loginLog>("loginLog");
            List<loginLog> returnedLogin = new List<Models.loginLog>();
            loginLog addedLog = loginLog.Find(Query.And(Query.EQ("username", username), Query.EQ("loggedIn", true))).FirstOrDefault();
            if (addedLog != null)
            {
                returnedLogin.Add(addedLog);
            }
            return returnedLogin;
        }

        public void Login(string Username, bool GoOnline)
        {
            var db = getDB();
            var person = db.GetCollection<userDefined>("userDefined");
            var personToUpdate = person.FindOne(Query.EQ("username", Username));
            personToUpdate.online = GoOnline;
            person.Save(personToUpdate);
            loginLog newLog = createLoginLog(Username);
            move.NavigateToGame(Username, newLog._id.ToString(), true, false);
        }

        public loginLog createLoginLog(string Username)
        {
            var db = getDB();
            var loginLog = db.GetCollection<loginLog>("loginLog");
            var newlog = new loginLog();
            if (getLoginLogSessionID_username(Username).Count() > 0)
            {
                return loginLog.Find(Query.And(Query.EQ("username", Username), Query.EQ("isLoggedIn", true))).FirstOrDefault();
            }
            newlog.loggedIn = true;
            newlog.username = Username;
            loginLog.Insert(newlog);
            return newlog;
        }

        public void registerUser(string username, MongoCollection loginLog, string password, bool second, string email, bool isVenoir, bool online)
        {
            deployment deploy = new deployment();
            var database = deploy.getDB();
            var collection = database.GetCollection<userDefined>("userDefined");

            int left = 65; int right = 68; int up = 87; int surrender = 83; int enter = 13; int build = 16;
            //see keyboard.js

            var userToAdd = new QueryDocument("username", username);
            userToAdd["level"] = "1st";
            userToAdd["world"] = 1;
            userToAdd["checkpoint"] = 0;
            userToAdd["head"] = 0;
            userToAdd["chest"] = 0;
            userToAdd["legs"] = 0;
            userToAdd["health"] = 100;
            userToAdd["maxHealth"] = 100;
            userToAdd["lives"] = 3;
            userToAdd["weaponID"] = -1;
            //keyboard
            userToAdd["left"] = left;
            userToAdd["right"] = right;
            userToAdd["up"] = up;
            userToAdd["surrender"] = surrender;
            userToAdd["enter"] = enter;
            userToAdd["build"] = build;
            //keyboard
            userToAdd["rank"] = 1;
            userToAdd["XP"] = 0;
            userToAdd["levelPlayTime"] = 0;
            if (email != null)
            {
                userToAdd["email"] = email;
            }
            //COMMUNITY
            userToAdd["isVenoir"] = isVenoir;
            userToAdd["online"] = online;
            userToAdd["lastActive"] = DateTime.Now;
            userToAdd["difficulty"] = 1;
            //COMMUNITY end
            //SOCIAL
            userToAdd["friendlyFire"] = false;
            userToAdd["socialOnly"] = false;
            userToAdd["rankOnline"] = true;
            userToAdd["shareXPInHelp"] = true;
            //SOCIAL end

            if (password != "")
            {
                userToAdd["password"] = password.GetHashCode();
                userToAdd["usesPassword"] = true;
            }
            collection.Insert(userToAdd);
            var loginLogAdd = new loginLog();
            loginLogAdd.username = username;
            loginLogAdd.loggedIn = true;
            loginLog.Insert(loginLogAdd);
            //collection.Save(userToAdd);
            //loginLog.Save(loginLogAdd);
            newLevelAccess(username, "1st", 1);
            move.NavigateToGame(username, loginLogAdd._id.ToString(), false, true);
        }
        public void newLevelAccess(string username, string level, int world)
        {
            deployment deploy = new deployment();
            var db = deploy.getDB();
            var levelAccessing = db.GetCollection<levelAccess>("levelAccess");
            if (hasAccessToLevel(username, level, world) == false)
            {
                var levelAccessLog = new QueryDocument("username", username);
                levelAccessLog["level"] = level;
                levelAccessLog["world"] = world;
                levelAccessing.Insert(levelAccessLog);
                //levelAccessing.Save(levelAccessLog);
            }

        }
        public bool hasAccessToLevel(string username, string level, int world)
        {
            deployment deploy = new deployment();
            var db = deploy.getDB();
            var levelAcces = db.GetCollection<levelAccess>("levelAccess");
            var countHasAccess = levelAcces.Find(Query.EQ("username", username))
                .Where(m => m.level == level)
                .Where(m => m.world == world)
                .Count();

            if (countHasAccess > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public bool checkpassword(string username, int password)
        {
            deployment deploy = new deployment();
            var db = deploy.getDB();
            var person = db.GetCollection<userDefined>("userDefined");
            var userToQuery = person.FindOne(Query.EQ("username", username));
            if (password == 0 && userToQuery.usesPassword == false)
            {
                return true;
            }

            if (userToQuery.password.GetHashCode() == password)
            {
                return true;
            }

            return false;
        }
    }
}
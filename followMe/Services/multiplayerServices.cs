﻿using followMe.Models;
using MongoDB.Driver.Builders;

namespace followMe.Services
{
    public class shot
    {
        public bool behind { get; set; }
        public int hurt { get; set; }
        public float x { get; set; }
        public float y { get; set; }
        public string identifier { get; set; }
    }

    public class multiplayerServices : advancedServices
    {
        public void shareXP(string shareUsername, string helpRequest, int newXPValueForShow, string message)
        {
            var db = getDB();
            var person = db.GetCollection<userDefined>("userDefined");
            userDefined personToReward = person.FindOne(Query.EQ("username", shareUsername));
            Clients.All.sharedXP(shareUsername, helpRequest, personToReward.XP, newXPValueForShow, message);

        }
        public void showOtherPlayer(int x, int y, string username, string caveName, bool stealth, string helpRequestString)//Only see people in a specific cave
        {

            var database = getDB();
            var userDefined = database.GetCollection<userDefined>("userDefined").FindOneAs<userDefined>(Query.EQ("username", username));
            var xpStats = database.GetCollection<statsForRank>("statsToRank").FindOneAs<statsForRank>(Query.EQ("rank", userDefined.rank));
            var weaponDefinition = database.GetCollection<weapon>("weapons").FindOne(Query.EQ("identifierToSee", userDefined.weaponID));

            Clients.All.showPlayers(x, y, userDefined, xpStats, caveName, weaponDefinition, stealth, helpRequestString);
        }
        public void fireOnlineBullet(int shotID, string down, string moveEachTime, float mouseX, float mouseY, bool behind, int weaponClass, string username, string caveName, shot shotDefinition)
        {
            Clients.All.onlineShotFired(shotID, down, moveEachTime, mouseX, mouseY, behind, weaponClass, username, caveName, shotDefinition);
        }

        public void showPrimaryHealth(float health, string username, float lives)
        {
            var dying = false;
            var database = getDB();
            var userDefined = database.GetCollection<userDefined>("userDefined").FindOneAs<userDefined>(Query.EQ("username", username));
            var xpStats = database.GetCollection<statsForRank>("statsToRank").FindOneAs<statsForRank>(Query.EQ("rank", userDefined.rank));
            if (userDefined.health <= 0)
            {
                dying = true;
                userDefined.health = userDefined.maxHealth;
                userDefined.lives -= 1;
            }
            if (userDefined.lives <= 0)
            {
                userDefined.lives = xpStats.numberOfLives;
            }
            Clients.All.showLocalStatsFromShot(username, userDefined.health, userDefined.lives, dying);
        }
    }
}
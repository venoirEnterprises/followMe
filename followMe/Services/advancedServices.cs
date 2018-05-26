using followMe.Models;
using Microsoft.AspNet.SignalR;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace followMe.Services
{
    public class advancedServices : Hub
    {
        public string changeStringDots(string email, bool recover)
        {
            var returnString = "";
            var checkForThis = ".";
            var replaceCharacter = ",";
            if (email != null)
            {
                for (int i = 0; i < email.Length; i++)
                {
                    var characterToCheck = email.Substring(i, 1);
                    var newCharacter = "";
                    if (characterToCheck == checkForThis)
                    {
                        newCharacter = replaceCharacter;
                    }
                    else
                    {
                        newCharacter = characterToCheck;
                    }
                    returnString += newCharacter;

                }
            }
            return returnString;

        }

        public levelList redirectToWorld(int worldName, string levelName, string username)
        {
            var db = getDB();
            var levels = db.GetCollection<levelList>("levelList");
            if (levelName == "" || levelName == null)//Come from JS
            {
                userDefined userToQuery = db.GetCollection<userDefined>("userDefined").FindOne(Query.EQ("username", username));
                var world = levels.FindOne(Query.And(
                    Query.EQ("worldNumber", userToQuery.world),
                    Query.EQ("identifier", userToQuery.level)
                    ));
                return world;
            }
            else
            {
                var world = levels.FindOne(Query.And(
                    Query.EQ("worldNumber", worldName),
                    Query.EQ("identifier", levelName)
                    ));
                return world;
            }
        }
        public MongoClient getMongoClient()
        {
            var server = new MongoClient("mongodb://127.0.0.1:27017");
            //var server = new MongoClient("mongodb://admin:Password12@ds039880.mongolab.com:39880/followme");
            //PUBLISH - var server = new MongoClient((System.Environment.GetEnvironmentVariable("mongo_login")));
            return server;
        }

        public MongoDatabase getDB()
        {
            var server = getMongoClient();
            var mongo = server.GetServer();
            return mongo.GetDatabase("followme");
        }
    }
}
using followMe.Models;
using MongoDB.Driver.Builders;

namespace followMe.Services
{
    public class NavigationServices : advancedServices
    {

        public void NavigateToGame(string username)
        {
            var db = getDB();
            var levels = db.GetCollection<levelList>("levelList");
            var person = db.GetCollection<userDefined>("userDefined");
            var userToQuery = person.FindOne(Query.EQ("username", username));
            levelList world = redirectToWorld(userToQuery.world, userToQuery.level, "");//username should just comefrom cient
            Clients.All.returnGameNavigation(world.fullName, world.worldName, username);
        }
    }
}
using followMe.Models;
using Microsoft.AspNet.SignalR;
using MongoDB.Driver.Builders;

namespace followMe.Services
{
    public class NavigationServices : advancedServices
    {
        public void NavigateToGame(string username, string sessionID, bool isDesign)
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<NavigationServices>();//As this is likely to be called by external methods
            var db = getDB();
            var person = db.GetCollection<userDefined>("userDefined");
            var userToQuery = person.FindOne(Query.EQ("username", username));
            levelList world = redirectToWorld(userToQuery.world, userToQuery.level, "");//username should just comefrom cient
            context.Clients.All.returnGameNavigation(world.fullName, world.worldName, username, sessionID, isDesign);
        }
    }
}
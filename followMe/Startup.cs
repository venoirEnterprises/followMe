using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(followMe.Startup))]
namespace followMe
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
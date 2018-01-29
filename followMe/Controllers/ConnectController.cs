using followMe.Models;
using followMe.Services;
using followMe.ViewModels;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System.Web.Mvc;


namespace followMe.Controllers
{
    public class ConnectController : Controller
    {
        userMethods userChange = new Services.userMethods();
        authServices auth = new authServices();
        deployment deploy = new deployment();
        communityServices comm = new communityServices();
        levelServices level = new levelServices();

        public JsonResult getRedirection(string username)
        {
            return Json(level.redirectToWorld(-1, null, username), JsonRequestBehavior.AllowGet);
        }

        //GET: /options/
        [HttpGet]
        public ActionResult options()
        {
            ViewBag.isGame = "no";
            return View();
        }
        [HttpPost]
        public ActionResult options(userDefined model)
        {
            var db = deploy.getDB();
            var levels = db.GetCollection<levelList>("levelList");
            var person = db.GetCollection<userDefined>("userDefined");
            var userToQuery = person.FindOne(Query.EQ("username", userChange.changeStringDots(model.username, false)));
            //We need to check the model isn't passing 0 because it takes a second for the UI to load the actual parameters with the dropdowns and so on
            //Or the UI might not keep up
            //Otherwise submit as normal
            //If it is 0, continue with the model
            if (model.up > 0) { userToQuery.up = model.up; }
            if (model.right > 0) { userToQuery.right = model.right; }
            if (model.surrender > 0) { userToQuery.surrender = model.surrender; }
            if (model.left > 0) { userToQuery.left = model.left; }
            if (model.enter > 0) { userToQuery.enter = model.enter; }
            if (model.special > 0) { userToQuery.special = model.special; }

            if (model.difficulty > 0)
            {
                userToQuery.difficulty = model.difficulty;
            }
            userToQuery.isVenoir = model.isVenoir;
            userToQuery.online = model.online;
            if (model.online)
            {
                userToQuery.email = model.email;
                //Community
                userToQuery.friendlyFire = model.friendlyFire;
                userToQuery.socialOnly = model.socialOnly;
                userToQuery.rankOnline = model.rankOnline;
                userToQuery.shareXPInHelp = model.shareXPInHelp;
                //Community end
            }

            person.Save(userToQuery);

            levelList world = level.redirectToWorld(userToQuery.world, userToQuery.level, "");//username should just comefrom cient

            return RedirectToAction(world.fullName, world.worldName);
        }

        //GET: /levelSelect/      
        public ActionResult levelSelect()
        {
            ViewBag.isGame = "yes";
            return View();
        }

        public ActionResult achievementsAwards()
        {
            ViewBag.isGame = "no";
            return View(new achievementsAwardsViewModel());
        }

        //GET: /Design/
        [HttpGet]
        public ActionResult design(bool? isRegistering)
        {
            ViewBag.regitration = isRegistering;
            ViewBag.isGame = "no";
            return View();
        }
        //POST: /Design/
        [HttpPost]
        public ActionResult design(userDefined model)
        {
            if (model.personType == null || model.personType == "")
            {
                ViewBag.isGame = "no";
                ViewBag.regitration = true;
                ViewBag.connectError = "You must select a person type";
                return View();
            }
            else
            {

                var db = deploy.getDB();
                var person = db.GetCollection<userDefined>("userDefined");
                var userToQuery = person.FindOne(Query.EQ("username", userChange.changeStringDots(model.username, false)));
                userToQuery.head = model.head;
                userToQuery.chest = model.chest;
                userToQuery.legs = model.legs;
                userToQuery.weaponID = model.weaponID;
                userToQuery.personType = model.personType;



                if (userToQuery.personType != "1")
                {
                    userToQuery.special = 48;
                    if (userToQuery.personType == "2")
                    {
                        userToQuery.health *= 0.75f;
                        userToQuery.maxHealth *= 0.75f;
                    }
                }

                else
                {
                    userToQuery.health *= 2;
                    userToQuery.maxHealth *= 2;
                }
                person.Save(userToQuery);
                var levels = db.GetCollection<levelList>("levelList");
                var world = levels.FindOne(Query.And(
                    Query.EQ("worldNumber", userToQuery.world),
                    Query.EQ("identifier", userToQuery.level)
                    ));

                comm.addPlayerProgress(model.username, world.fullName, world.worldName);

                return RedirectToAction(world.fullName, world.worldName);
            }
        }
        // GET: /Welcome/
        [HttpGet]
        public ActionResult Welcome()
        {
            ViewBag.isGame = "no";
            return View();
        }
        [HttpPost]
        public ActionResult Welcome(connection model)
        {
            string userFirstPassword = model.firstPassword;
            if (!ModelState.IsValid)
            {
                ViewBag.connectError = "Please check your data, there appears to be an error";
                return View();
            }
            else
            {
                if (model.email != null && model.email != "")//Can't store email "."'s, so will need to have translation service back and to email
                {
                    model.email = userChange.changeStringDots(model.email, false);
                }



                if (model.username != "" && model.username != null && model.username.Contains("."))
                {
                    ViewBag.connectError = "Sorry, but a username can't contain a '.'";
                    return View();
                }

                if (model.username == "" || model.username == null)
                {
                    model.username = model.email;
                    if (model.email == "" || model.email == null)
                    {
                        ViewBag.connectError = "Your username or email is required";
                        return View();
                    }
                }

                if ((model.username == "" || model.username == null) || (model.email == "" && model.email == null))
                {
                    ViewBag.connectError = "Your username or email is required";
                    return View();
                }


                if (model.register && model.isVenoir && (model.email == null || model.email == ""))
                {
                    ViewBag.connectError = "If you want to be in the community, you must have an email address";
                    return View();
                }

                var db = deploy.getDB();
                var collection = db.GetCollection<userDefined>("userDefined");
                var loginLog = db.GetCollection("loginLog");
                var levels = db.GetCollection("levelList");
                var userExistsCount = collection.Count(Query.EQ("username", model.username));
                bool firstpasswordValid = false;

                if (model.register == false && userExistsCount > 0)
                {
                    var toCheckPassword = 0;
                    if (model.firstPassword != null) { toCheckPassword = model.firstPassword.GetHashCode(); }
                    firstpasswordValid = auth.checkpassword(model.username, toCheckPassword);
                    if (firstpasswordValid == false) { ViewBag.connectError = "Leader password invalid"; return View(); }

                }
                long passwordcount = collection.Count(Query.EQ("password", model.firstPassword.GetHashCode()));
                long usercount = collection.Count(Query.EQ("username", model.username));

                long emailcount = 0;
                if (model.email != null && model.email != "")//Otherwise they don't have an email and we don't care if it's unique
                {
                    emailcount = collection.Count(Query.EQ("email", model.email));
                }

                if ((usercount > 0 || emailcount > 0) && model.register)
                {
                    ViewBag.connectError = "Your username or email already exists, please check your details and login if that's what you want";
                    return View();
                }
                if (usercount < 0 && firstpasswordValid && emailcount == 0)
                {
                    userExistsCount = 0;
                }



                if (userExistsCount == 0 && model.register == true)
                {
                    auth.registerUser(model.username, loginLog, userFirstPassword, false, model.email, model.isVenoir, model.goOnline);

                    return RedirectToAction("design", "Connect", new { isRegistering = true });
                }
                //need to count loginLog for single user now, as this is going to be a login here
                var loginLogCount = loginLog.Count(Query.Exists(model.username));

                if (loginLogCount > 0)//They are already connected, user probably wrong
                {
                    ViewBag.connectError = "You are already connected, check your usernames";
                    return View();
                }
                if (model.register == false)
                {
                    if (userExistsCount == 0)
                    {
                        ViewBag.connectError = "That user does not exist, please register";
                        return View();
                    }
                }
                //If the count is 0 then they are allowed to connect
                if (userExistsCount > 0 && model.register == false && loginLogCount == 0)
                {
                    model.username = userChange.changeStringDots(model.username, false);
                    var person = db.GetCollection<userDefined>("userDefined");
                    var personToUpdate = person.FindOne(Query.EQ("username", model.username));
                    personToUpdate.online = model.goOnline;
                    person.Save(personToUpdate);
                    var newlog = new QueryDocument(model.username, 1);
                    loginLog.Insert(newlog);

                    return RedirectToAction("levelSelect", "Connect");
                }
                //Invalid settings
                if (userExistsCount > 0 && model.register)
                {
                    ViewBag.connectError = "That user already exists";
                    return View();
                }
                return View();
            }
        }
        public ActionResult Help()
        {
            return View();
        }

        public ActionResult plan()
        {
            return View();
        }

    }
}

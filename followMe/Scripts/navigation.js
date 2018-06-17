$(function () {
    $("#goBack").click(function () {
        followMe.navigationServicesDefined.server.navigateToGame(localStorage.getItem("username"), localStorage.getItem("sessionID"), false, false);
    })

    followMe.navigationServicesDefined.client.returnGameNavigation = function (level, world, username, sessionID, design, register)
    {
        localStorage.setItem("sessionID", sessionID);
        if (localStorage.getItem("username") === username)
        {
            if (design) {
                window.location.href = "/Connect/LevelSelect";
            }
            else if (register) {
                window.location.href = "/Connect/Design?isRegistering=true";
            }
            else 
            {
                window.location.href = "/" + world + "/" + level
            }
        }        
    }

    followMe.userServicesDefined.client.forceQuitPlayer = function (username, sessionID) {//only going to catch "bad" or correct people here, as per #70
        if (localStorage.getItem("username") === username) {
            window.location.href = "/";
            alert("Due to a security risk, you have been kicked off the game. Sorry for the inconvenience, please try again")
        }
    }
})
$(function () {
    $("#goBack").click(function () {
        followMe.moveServer.server.navigateToGame(localStorage.getItem("username"))
    })

    followMe.moveServer.client.returnGameNavigation = function (level, world, username)
    {
        if (localStorage.getItem("username") === username)
        {
            window.location.href = "/" + world + "/" + level
        }        
    }

    followMe.memServer.client.forceQuitPlayer = function (username, sessionID) {//only going to catch "bad" or correct people here, as per #70
        if (localStorage.getItem("username") === username) {
            window.location.href = "/";
            alert("Due to a security risk, you have been kicked off the game. Sorry for the inconvenience, please try again")
        }
    }
})
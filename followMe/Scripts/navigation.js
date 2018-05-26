$(function () {
    $("#goBack").click(function () {
        followMe.memServer.server.navigateToGame(localStorage.getItem("username"))
    })

    followMe.memServer.client.returnGameNavigation = function (level, world, username)
    {
        if (localStorage.getItem("username") === username)
        {
            window.location.href = "/" + world + "/" + level
        }        
    }
})
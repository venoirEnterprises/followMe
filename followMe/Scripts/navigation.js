$(function () {
    $("#goBack").click(function () {
        followMe.memServer.server.navigateToGame(localStorage.getItem("username"))
    })

    followme.memserver.client.returnGameNavigation = function (world, level)
    {
        window.location.href = "/"+ world +"/" + level
    }
})
$(function () {
    var numberx = 0;
    var numbery = 0;
    followMe.teleportPicture = -562;
    localStorage.setItem("fanHit", "00000")
    followMe.teleports = [];
    followMe.enemies = [];

    followMe.gameObject = function (options) {//generic local object must match server, and array filtering will apply to logic of followMe.surfaces e.g.
        var defaultValues =
            {
                type: "",
                _id: ""
            }
        $.extend(this, defaultValues, options);
    }
    followMe.gameObjects = [];

    followMe.setTypeFilter = function (filter) {
        followMe.currentObjType = filter;
    }

    //followMe.currentObjType is overridden above, then used for filtering
    function filterGameObjectsByType(obj) { return obj.type === followMe.currentObjType }

    followMe.teleport = function (options) {
        var defaultValues =
            {
                world: 0,
                level: 0,
                x: 0,
                y: 0,
                maxx: 0,
                maxy: 0
            }
        $.extend(this, defaultValues, options);
    }

    //"replacepoint", "checkpoint" 
    followMe.imagesToPreload = [];
    followMe.addImage = function (url) {
        if ($.inArray(url, followMe.imagesToPreload) < 0) {
            followMe.imagesToPreload.push();
        }
        followMe.imagesToPreload.push(url)
    }
    followMe.animation = function (options) {
        var defaultValues =
            {
                url: false, width: 64, numberOfFrames: 2, currentFrame: 0, rate: 200, pace: 3,
                top: 100,
                id: ""
            };
        $.extend(this, defaultValues, options);
        if (this.url) {
            followMe.addImage(this.url)
        }
    };

    function addItemMessage(message, x, y, id) {
        var newmessage = $("<p>").css("left", (x * 64) + 64)
            .css("top", y * 64)
            .css("position", "absolute")
            .attr("id", "newmessage")
            .css("width", "64px")
            .css("border", "1px dashed black")
            .text(message)
            .attr("id", id + "message")
            .hide();
        return newmessage;
    }

    followMe.levelServicesDefined.client.addImageFromServer = function (serveranimation, type, username, canAccess, totalLevelToDo, playerDone, countGameObjects) {//last param specifically for teleports                

        if (username == localStorage.getItem("username")) {
            if (type == "Items") {
                $(followMe.addImage2("readitem", "item", serveranimation, canAccess)
                    .appendTo($("#game")))
            }


            if (type == "teleports") {
                //alert("Total for level: " + totalLevelToDo + ", " + serveranimation.level + ", player has done: " + playerDone)
                $("range#" + serveranimation.level).remove();
                $("<progress title ='Detail in Options and Achievements' id='" + serveranimation.level + "' max='" + totalLevelToDo + "' value='" + playerDone + "' style='left:" + parseInt(parseInt((parseInt(serveranimation.x) * 64)) + 64) + "px;top:" + parseInt(parseInt((parseInt(serveranimation.y) * 64)) + 32) + "px;position:absolute;' class='xp'>").appendTo($("#game"));
            }
            var whatToAdd = followMe.addImage2(
                false,
                type,
                serveranimation,
                canAccess
            )
            if (whatToAdd != false) {
                $(whatToAdd.appendTo($("#game")))
            }
            if (type == "Items") {
                addItemMessage(
                    serveranimation.message,
                    serveranimation.x,
                    serveranimation.y,
                    $("." + type + ":last").attr("id"))
                    .appendTo($("#game"));
            }
            if ((serveranimation.xend > 0 || serveranimation.yend > 0) && serveranimation.type != "caves") {//&&( serveranimation.xend >0 || serveranimation.yend >0) ) {
                //1.13.1.4 extension made, surfaces can now move too
                //Method named changed from enemyIsAnimated, as surfaces etc. should be able to move too [dependent on difficulty in futures]
                followMe.animateObject(serveranimation.uniqueIdenitifer, serveranimation.type)


            }
            if (type == "background" && serveranimation.inCave) {
                addDownloadKey(followMe.checkpoints[serveranimation.checkpoint]);                
            }
            followMe.showCaveContents(false)
        }

        if (followMe.gameObjects.length === countGameObjects)//The final addition has taken place in addImage2
        {
            followMe.testObj = serveranimation                        
        }
    };

    followMe.surfaces = [];

    followMe.surface = function (options) {
        var defaultValues =
            {
                miny: -1,
                minx: -1,
                widthX: -1,
                heightY: -1,
                startFrame: -1,
                checkpoint: "",
                maxx: -1,
                maxy: -1,
                backToStartPoint: false,
                xend: 0,
                yend: 0,
                surfaceAnimationCollection: ""
            }
        $.extend(this, defaultValues, options);
    };

    followMe.caves = [];



    followMe.cave = function (options) {
        var defaultValues =
            {
                parentName: "notSet",
                height: "-1px",
                width: "-1px",
                xMove: -1,
                yMove: -1,
                entrance: false,
                x: 0,
                maxx: 0,
                y: 0,
                maxy: 0,
                isWall: false
            }
        $.extend(this, defaultValues, options);
    };


    followMe.surfaceID = 0;
    followMe.addImage2 = function (isUpdate, type, object, hasAccess) {
        //64px restriction of size dividing        
        //hasAccess for teleport lock show
        var message = "";
        var classToUse = type;
        var alt = 0;
        var stop = false;

        var startFrame = (-64 * object.startFrame) + "px 0px";

        var iduse = (parseInt(object.x) * 64) + "_" + (parseInt(object.y) * 64)
            + "-" + parseInt(parseInt((parseInt(object.x) * 64)) + (parseInt(object.widthX) * 64)) + "y"
            + parseInt(parseInt((parseInt(object.y) * 64)) + (parseInt(object.heightY) * 64))

        //Feb 14th, generic object declaration to override specific objects, then just use array filter to create followMe.surfaces e.g.
        followMe.gameObjects[followMe.gameObjects.length] = new followMe.gameObject({
            type: type,
            _id: object._id
        });

        if (type == "surface" || object.fan == true) {


            iduse = "surface" + object.uniqueIdenitifer;
            followMe.surfaces[object.uniqueIdenitifer] = new followMe.surface({
                miny: parseFloat(object.y) * 64,
                minx: parseFloat(object.x) * 64,
                widthX: parseFloat(object.widthX) * 64,
                heightY: parseFloat(object.heightY) * 64,
                startFrame: object.startFrame,
                checkpoint: object.checkpoint,
                maxx: (parseFloat(object.x) * 64) + (parseFloat(object.widthX) * 64),
                maxy: (parseFloat(object.y) * 64) + (parseFloat(object.heightY) * 64),
                fan: object.fan,
                backToStartPoint: object.backToStartPoint,
                xend: object.xend,
                yend: object.yend,
                surfaceAnimationCollection: object.surfaceAnimationCollection
            });

            followMe.surfaceID += 1;

        }

        if (type == "background") {

            startFrame = (-64 * object.startFrame) + "px -64px";


            var y = parseFloat(object.y * 64);
            var x = parseFloat(object.x * 64);
            if (object.heightY == 0) {
                object.heightY = 1
            }
            followMe.checkpoints[object.checkpoint] = new followMe.checkpoint(
                {
                    identifier: object.checkpoint,
                    x: x,
                    maxx: parseFloat(x + parseFloat(object.widthX * 64)),
                    y: y,
                    maxy: parseFloat(y + parseFloat(object.heightY * 64)),
                    unityLevel: object.uniqueIdenitifer,
                    messageForKey: object.message,
                    caveName: object.caveName,
                    levelName: object.newLevel
                });

            iduse = "checkpoint" + object.checkpoint


        }


        if (type == "checkpoint") {
            type = "background";


        }
        var url = "url('/images/spriteSheet.png')"

        if (isUpdate == "readitem") {
            startFrame = "0px 0px";
            url = "url('/images/spriteSheet.png')";
            classToUse = object.message + " " + "items"
            iduse = "";
        }

        var valueToAdd = 1
        var imageDefined = $("<aside>").css("backgroundImage", url)
            .css("left", object.x * 64 + "px")
            .css("top", object.y * 64 + "px")
            .css("width", (object.widthX * 64) + "px")
            .css("height", (object.heightY * 64) + "px")
            .css("position", "absolute")
            .css("marginLeft", "0px!important")
            .css("backgroundPosition", startFrame)
            .attr("id", iduse)
            .attr("class", classToUse)
            .attr("alt", alt);

        if (object.caveName == null) {
            object.caveName = "";
        }

        if (type == "enemies") {
            followMe.enemies[object.uniqueIdenitifer] = new followMe.enemy(
                {
                    identifier: object.uniqueIdenitifer,
                    hurt: object.hurt,
                    maxHealth: object.maxHealth,
                    currentHealth: object.maxHealth,
                    x: object.x,
                    y: object.y * 64,
                    caveName: object.caveName,
                    xend: object.xend,//flying animation start
                    yend: object.yend,
                    backToStartPoint: object.backToStartPoint,
                    fly: object.fly
                });
            imageDefined.attr("id", object.uniqueIdenitifer);
            imageDefined.attr("alt", object.hurt);
            imageDefined.css("height", ((object.heightY * 64) + 8) + "px")




            imageDefined.append("<progress class='standard' max='" + object.maxHealth +
                "' value='" + object.maxHealth + "' min='0' style=margin-top:" + (object.heightY * 64) +
                "px;position:absolute;width:" + (object.widthX * 64) + "px!important" + "/>"
            )

        }

        //This is to deal with the fact that the original render thinks 0,0 is where to start
        //Due to default in followMe.Animation, as most likely object is surface
        //START
        if (object.fan == true) {
            //alert()
            imageDefined.css("backgroundPosition", (-64 * object.startFrame) + "px " + followMe.imageDefintion.fan)
            imageDefined.css("top", (parseFloat(object.y) - 2) * 64 + "px")
            imageDefined.css("height", "192px")
            imageDefined.attr("class", "surface fan")
        }
        if (type == "teleports") {
            var y = parseFloat(object.y * 64);
            var x = parseFloat(object.x * 64);
            imageDefined.css("backgroundPosition", (-64 * object.startFrame) + "px " + followMe.teleportPicture + "px")
            var identifier = object.level.substring(0, 1) + object.world
            imageDefined.attr("id", identifier);
            //alert(identifier)
            followMe.teleports[identifier] = new followMe.teleport({
                world: object.world,
                level: object.level,
                x: x,
                maxx: parseFloat(x + parseFloat(object.widthX * 64)),
                y: y,
                maxy: parseFloat(y + parseFloat(object.heightY * 64)),
                teleportAllowed: hasAccess,
                whyLocked: object.whyLocked
            });
            var teleportId = followMe.teleports[identifier];
            iduse = identifier
            if (hasAccess == false) {
                var teleportBlocked = $("<aside>")
                    .attr("id", (parseFloat(teleportId.x) - 64) + "_" + (parseFloat(teleportId.y) - 64)
                    + "-" + parseFloat(teleportId.maxx - 64) + "y"
                    + parseFloat(teleportId.maxy - 64))
                    .css("left", teleportId.x - 80).css("top", teleportId.y - 62).css("position", "absolute")
                    .css("backgroundPosition", "-256px " + followMe.teleportPicture + "px").css("height", "126px").css("width", "64px")
                    .attr("class", "background block").css("backgroundImage", url)
                    .css("position", "absolute")

                //should be OO surfaces soon
                $("#game").append(teleportBlocked);
            }
        }
        else {

            //Enemies
            if (object.index == 5) {
                imageDefined.css("backgroundPosition", (-64 * object.startFrame) + "px -192px")
            }

            if (object.message != null && type == "ITems") {
                imageDefined.css("backgroundPosition", (-64 * object.startFrame) + "px -384px")
            }
            if (isUpdate == "readitem") {
                imageDefined.css("backgroundPosition", "-128px -884px")
            }

            if (type == "caves") {
                var imageX = -320
                if (object.xMove != undefined && object.xMove != 0 && object.xMove < 4) {
                    imageX -= parseFloat(object.xMove * 32)
                }

                var imageY = -560
                if (object.yMove != undefined && object.yMove != 0 && object.yMove < 5) {
                    imageY -= parseFloat(object.yMove * 32)
                }

                imageDefined.css("backgroundPosition", imageX + "px " + imageY + "px").attr("id", "cave" + object.uniqueIdenitifer)

                var y = parseFloat(object.y * 64);
                var x = parseFloat(object.x * 64);


                followMe.caves[parseFloat(object.uniqueIdenitifer)] = new followMe.cave({
                    caveName: object.caveName,
                    height: object.heightY * 64 + "px",
                    width: object.widthX * 64 + "px",
                    xMove: object.xMove,
                    yMove: object.yMove,
                    entrance: object.entrance,
                    x: x,
                    maxx: parseFloat(x + parseFloat(object.widthX * 64)),
                    y: y,
                    maxy: parseFloat(y + parseFloat(object.heightY * 64)),
                    isWall: object.caveWall,
                    isCeiling: object.caveCeiling
                });
            }
            if (object.checkpoint != "" || type == "background" || object.newLevel != null
            ) {


                imageDefined.addClass("checkpoint")
                imageDefined.attr("alt", object.checkpoint)
                imageDefined.css("backgroundPosition", (-64 * object.startFrame) + "px -64px")

                //if (object.inCave) {
                //    alert(imageDefined.css("backgroundPosition"))
                //}

            }
        }

        //Cave check - add the class if inCave
        if (object.inCave) {
            imageDefined.addClass("insideCave")
            imageDefined.addClass("caveName" + object.caveName)
        }

        if (type == "caves") {
            imageDefined.addClass("isCave " + object.caveName)
        }

        if ((object.inCave == false || object.inCave == undefined) && type != "caves") {
            imageDefined.addClass("outsideCave")
            imageDefined.addClass("caveName")

        }


        //END

        if (type == "background" && object.checkpoint == localStorage.getItem("checkpoint")
            || isUpdate == "startpoint") {

            startFrame = (-64 * (object.startFrame + 1)) + "px -64px";
            imageDefined.css("backgroundPosition", startFrame)
            //Purely for the one which is the user's checkpoint
            imageDefined.attr("id", "checkpoint" + object.checkpoint);
        }

        if (object.animate == true) {
            var frameCount = parseFloat(object.endFrame) - parseFloat(object.startFrame)
            if (parseFloat(object.checkpoint) == 0) { rateDefined = 200 }
            var animationDefined = new followMe.animation(
                {

                    url: "/images/spriteSheet.png", numberOfFrames: frameCount,
                    currentFrame: object.startFrame, startFrame: object.startFrame, spriteY: object.spriteY * 64
                });



            setInterval(function () {

                animationDefined.currentFrame += 1
                if (animationDefined.currentFrame - animationDefined.startFrame > animationDefined.numberOfFrames) {
                    animationDefined.currentFrame = animationDefined.startFrame
                }
                setFrame(iduse, animationDefined);

                setSpeed(iduse, animationDefined, animationDefined.pace + 1);
            }, animationDefined.rate)
        }
        if (isUpdate == "gameover") {

        }
        if (object.inCave && type == "background") {


            //alert (imageDefined.css("backgroundPosition") + ", " + imageDefined.attr("id"))
        }
        if ($("#" + imageDefined.attr("id")).length > 0) {
            if (type != "surface" || object.fan == "1") {
                $("#" + imageDefined.attr("id")).remove();
            }
            else {
                //if (followMe.surfaceID > 1) {
                //    //for (var i = 0; i < followMe.surfaceID; i++) {

                //    //    if (followMe.surface[i].index == object.index) {
                //    //        alert()
                //    //        stop = true;
                //    //    }

                //    //}
                //}

            }
        }
        followMe.setTypeFilter(type);
        switch (type) {
            case "enemies":
                followMe.enemies2 = followMe.gameObjects.filter(filterGameObjectsByType);
                break;
            case "surface":
                followMe.surfaces2 = followMe.gameObjects.filter(filterGameObjectsByType);
                break;
            case "background":
                followMe.backgrounds2 = followMe.gameObjects.filter(filterGameObjectsByType);
                break;
            case "caves":
                followMe.caves2 = followMe.gameObjects.filter(filterGameObjectsByType);
                break;
        }

        if (stop == false || type != "surface") {
            return imageDefined
        }
        else {
            return false;
        }

        
    }

    followMe.enemy = function (options) {
        var defaultValues =
            {
                identifier: 1,
                hurt: 0,
                maxHealth: 20,
                currentHealth: 20,
                x: 0,
                y: 0,
                caveName: "",
                xend: 0,//flying animation start
                yend: 0,
                backToStartPoint: false,
                fly: false//flying animation end
            }
        $.extend(this, defaultValues, options);
    }
    followMe.animation = function (options) {
        var defaultValues =
            {
                url: false, width: 64, numberOfFrames: 2, currentFrame: 0, rate: 500, pace: 3,
                top: 100,
                spriteY: 0,
                id: "",
                startFrame: 0
            };
        $.extend(this, defaultValues, options);
        if (this.url) {
            followMe.addImage(this.url)
        }
    };
    followMe.addSprite = function (parentId, divId, options) {
        var options = $.extend({
            x: 0, y: 0, width: 64, height: 64
        }, options);
    }
    setFrame = function (divId, animation) {
        $("#" + divId).css("backgroundImage", "url('" + animation.url + "')");
        $("#" + divId).css("backgroundPosition", "-" + animation.currentFrame * animation.width + "px " + animation.spriteY + "px");
    };
    setSpeed = function (divId, animation, pace) {
        $("#" + divId).css("marginLeft", animation.pace * pace);
    }

    //DEFINE THE ITEMS
    var firstSprite = new followMe.animation(
        {
            url: '/Images/spriteSheet.png', numberOfFrames: 2, rate: 700

        });
    if ($("#isGame").val() != "no") {
        setInterval(function () {
            var x = 1
            setFrame("spriteAlert", firstSprite);
            firstSprite.currentFrame = (firstSprite.currentFrame + 1) % firstSprite.numberOfFrames;
            setSpeed("spriteAlert", firstSprite, firstSprite.pace + 1);

        }, firstSprite.rate);

        if (followMe.helpRequest != null) {

        }
        $.connection.hub.start("~/signalr").done(function () {
            if ($("#isGame").val() == "yes") {  
                //alert()
                followMe.communityServices.server.checkLevelAttendanceForHelp(
                    $("#welcome").text(),
                    localStorage.getItem("username"),
                    true//For helper
                );
                if (followMe.helpRequest != null) {//You're helping, let's tell the person that asked
                    followMe.communityServices.server.checkLevelAttendanceForHelp(
                        $("#welcome").text(),
                        followMe.helpUsername,
                        false
                    );
                }
                followMe.levelServicesDefined.server.getImages(
                    $("#welcome").text(),
                    localStorage.getItem("username"),
                    followMe.helpUsername
                );
                

                followMe.levelServicesDefined.server.sendMessage("test");
            }
        });
    }

    function addDownloadKey(checkpointObject) {
        $("<p>" + checkpointObject.messageForKey + "</p>")
            .css("position", "absolute")
            .css("top", checkpointObject.y - 8)
            .css("left", checkpointObject.x + 20)
            .css("fontSize", "10pt")
            .attr("id", checkpointObject.identifier + "key")
            .appendTo($("#game"))
    }
    //1.13.1.4 extension made, surfaces can now move too
    //We'e dealing with the local objects now
    followMe.animateObject = function (iduse, objectName) {
        var object = followMe.enemies[iduse];
        var myY = 0;
        var myMaxY = 0;
        var myX = 0;
        var myMaxX = 0;
        var timeToMove = 500;
        switch (objectName) {
            case "surface":
                object = followMe.surfaces[iduse];
                myY = object.miny;
                myMaxY = object.maxy;
                myX = object.minx;
                myMaxX = object.maxx;
                iduse = objectName + iduse;
                timeToMove = 500;
                break;
            case "enemies":
                myY = object.y;
                myX = object.x;
                break;
        }
        var top = $("." + objectName + "#" + iduse).css("top")
        var left = $("." + objectName + "#" + iduse).css("left")
        left = left.substring(0, left.length - 2)
        var left2 = left
        var code = 65;
        var direction = "left"//could be an option in the future
        var x = object.xend
        var newleft2 = parseFloat(left) + 64 + "px"

        if (object.backToStartPoint) {
            setInterval(function () {
                //The loop is right, down, left, up


                if (object.xend > 0) {
                    moveObjectOnLoop(object.xend, top, left, object, iduse, objectName, timeToMove, code, myX, myY, false, false);
                }
                if (object.yend > 0 && (object.fly || objectName != "enemies")) {
                    moveObjectOnLoop(object.yend, top, left, object, iduse, objectName, timeToMove, code, myX, myY, true, false);
                }
                if (object.xend > 0) {
                    moveObjectOnLoop(object.xend, top, left, object, iduse, objectName, timeToMove, code, myX, myY, false, true);
                }
                if (object.yend > 0 && (object.fly || objectName != "enemies")) {
                    moveObjectOnLoop(object.yend, top, left, object, iduse, objectName, timeToMove, code, myX, myY, true, true);
                }
            }, 1000)
        }
        //sleep(500)
        //Not back to startpoint
        else {
            if (object.xend > 0) {
                moveObjectOnLoop(object.xend, top, left, object, iduse, objectName, timeToMove, code, myX, myY, false, false);
            }
            if (object.yend > 0 && (object.fly || objectName != "enemies")) {
                moveObjectOnLoop(object.yend, top, left, object, iduse, objectName, timeToMove, code, myX, myY, true, false);
            }
        }
    }

    //based on surface collection, set the max and min coordinates of the "surfaceAnimationCollection"
    function checksurfaceAnimationCollection(surfaces) {
        return surfaces.surfaceAnimationCollection === followMe.checkSurfaceAnimationCollection;
    }


    //27/01/18 code centralised for object animation looping, called above
    function moveObjectOnLoop(valueToLoop, top, left, object, iduse, objectName, timeToMove, code, myX, myY, isY, reverse) {
        for (var i = 0; i < valueToLoop; i++) {
            var newattribute = parseFloat(left) + 64 /** (i+1)*/ + "px"
            if (reverse) {
                newattribute = parseFloat(left) - 64 /** (i+1)*/ + "px"
            }
            var newattribute2 = newattribute.substring(0, newattribute.length - 2);
            var identifier = "." + objectName + "#" + iduse;

            var attributeToChange = "top";
            if (!isY) {
                attributeToChange = "left";
            }
            var animationProperties = {}; animationProperties[attributeToChange] = "+=64px";
            if (reverse) {
                animationProperties = {}; animationProperties[attributeToChange] = "-=64px";
            }

            $(identifier).animate(animationProperties,
                {
                    duration: timeToMove
                    ,
                    step: function (now, fx) {
                        switch (objectName) {
                            case "enemies":
                                if (!isY) {
                                    followMe.enemyDrop(code, fx.end, ".enemies#" + iduse, object.fly)
                                    object.x = fx.end;
                                }
                                if (isY) {
                                    object.y = fx.end;
                                }
                                followMe.enemyHurt(fx.end, iduse, object)

                                break;
                            case "surface":

                                object.miny = myY;
                                var playerObj = followMe.players[1];
                                if (!isY) {
                                    if (object.surfaceAnimationCollection !== "")//This should always be true for surfaces, we're in an animation collection, the min and max x forced by the overall width
                                    {
                                        //Got to make it wider for the matching to take place less harshly as they do if the surface isn't moving'
                                        followMe.checkSurfaceAnimationCollection = object.surfaceAnimationCollection;
                                        var arrayToModifyXCoords = followMe.surfaces.filter(checksurfaceAnimationCollection);
                                        //object.minx = arrayToModifyXCoords[0].minx;
                                        //object.maxx = arrayToModifyXCoords[arrayToModifyXCoords.length - 1].maxx
                                        if (reverse) {
                                            object.minx = fx.end;
                                            object.maxx = fx.end + 128;
                                        }
                                        else {
                                            object.minx = fx.end - 128;
                                            object.maxx = fx.end;
                                        }
                                    }


                                }
                                else {
                                    object.miny = fx.end
                                    object.maxy = fx.end + 64;
                                }
                                if (playerObj.currentSurfaceID == iduse) {
                                    iduse2 = ".surface#" + iduse
                                    var realTop = $(iduse2).css("top");//will need to get the current x as it animates, so the player moves along
                                    var realLeft = $(iduse2).css("left");
                                    if (!isY) {
                                        followMe.x("player", realLeft.substring(0, realLeft.length - 2) - 10, true);
                                    }
                                    else {
                                        followMe.y("player", realTop.substring(0, realTop.length - 2) - 96, 0, true);//Set the physical here, the other one will just move when an animation ends
                                    }
                                }
                                break;
                        }
                        //Special behaviour is needed here, as they are "dynamic" objects that know where the floor is


                    }
                })
            if (!isY) {
                left = newattribute2;
            }
            else {
                top = newattribute2;
            }
        }
    }
});
///   <reference path="declareClasses.ts"/>

function typeScriptFile() {
    console.log("typeScripthit")
}

let gameProperties = new FollowMeDefinition();


let weapon = new Weapon(50,12,1);
weapon.setPassiveObjectProperties("id here", 5, 10, "", 0, 0);
weapon.setType();
gameProperties.addWeapon(weapon);

let weapon2 = new Weapon(100,0,1);
weapon2.setPassiveObjectProperties("id hurrah", 2, 25, "cave test", 2, 5);
weapon2.setType();
gameProperties.addWeapon(weapon2)

let item = new Item("this is a message");
item.setPassiveObjectProperties("item here", 17, 4, "", 0, 0);
item.setType();
gameProperties.addItem(item);


function getObjectsByType(type) {
    switch (type) {
        case "surface":
            return gameProperties.getSurfaces();
        case "weapon":
            return gameProperties.getWeapons();
        case "Item":
            return gameProperties.getItems();
        case "Checkpoint":
            return gameProperties.getCheckpoints();
    }
}


function addGameObject(ObjIncoming) {

    switch (ObjIncoming.type)
    {
        case "surface":
            let newSurface = new Surface(ObjIncoming.fan, ObjIncoming.surfaceAnimationCollection);
            newSurface.setType();
            newSurface.setPassiveObjectProperties(ObjIncoming._id, ObjIncoming.x, ObjIncoming.y, ObjIncoming.caveName, ObjIncoming.hideMinimumDifficulty, ObjIncoming.showMinimumDifficulty);
            gameProperties.addSurface(newSurface);
            break;
        case "Item":
            let newMessage = new Item(ObjIncoming.message);
            newMessage.setType();
            newMessage.setPassiveObjectProperties(ObjIncoming._id, ObjIncoming.x, ObjIncoming.y, ObjIncoming.caveName, ObjIncoming.hideMinimumDifficulty, ObjIncoming.showMinimumDifficulty);
            break;
        case "Weapon":
            let newWeapon = new Weapon(ObjIncoming.hurt, ObjIncoming.rate, ObjIncoming.weaponLevel);
            newWeapon.setType();
            break;
        case "Checkpoint":
            let newCheckpoint = new Checkpoint(ObjIncoming.startpoint, ObjIncoming.checkpoint);
            newCheckpoint.setPassiveObjectProperties(ObjIncoming._id, ObjIncoming.x, ObjIncoming.y, ObjIncoming.caveName, ObjIncoming.hideMinimumDifficulty, ObjIncoming.showMinimumDifficulty);
            break;
    }    
}

window.console.log(getObjectsByType("weapon"));
window.console.log(getObjectsByType("Item"));
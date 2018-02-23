///   <reference path="declareClasses.ts"/>
function typeScriptFile() {
    console.log("typeScripthit");
}
var gameProperties = new FollowMeDefinition();
function getObjectsByType(type) {
    switch (type.toUpperCase()) {
        case "SURFACE":
            return gameProperties.getSurfaces();
        case "ENEMIES":
            return gameProperties.getEnemies();
        case "WEAPON":
            return gameProperties.getWeapons();
        case "ITEM":
            return gameProperties.getItems();
        case "CHECKPOINT":
            return gameProperties.getCheckpoints();
        case "TELEPORT":
            return gameProperties.getTeleports();
        case "CAVE":
            return gameProperties.getCaves();
    }
}
function getCheckpointByPlayerCheckpoint(identifier) {
    return gameProperties.getCheckpoints().filter(function (m) { return m.checkpoint == identifier; })[0];
}
function addGameObject(ObjIncoming) {
    switch (ObjIncoming.type) {
        case "surface":
            var newSurface = new Surface(ObjIncoming.fan, ObjIncoming.surfaceAnimationCollection);
            newSurface.setPassiveObjectProperties(ObjIncoming._id, ObjIncoming.x, ObjIncoming.y, ObjIncoming.caveName, ObjIncoming.hideMinimumDifficulty, ObjIncoming.showMinimumDifficulty, ObjIncoming.spriteY);
            newSurface.setAnimationProperties(ObjIncoming.animate, ObjIncoming.startFrame, ObjIncoming.endFrame);
            gameProperties.addSurface(newSurface);
            break;
        case "Item":
            var newItem = new Item(ObjIncoming.message);
            newItem.setPassiveObjectProperties(ObjIncoming._id, ObjIncoming.x, ObjIncoming.y, ObjIncoming.caveName, ObjIncoming.hideMinimumDifficulty, ObjIncoming.showMinimumDifficulty, ObjIncoming.spriteY);
            newItem.setAnimationProperties(ObjIncoming.animate, ObjIncoming.startFrame, ObjIncoming.endFrame);
            gameProperties.addItem(newItem);
            break;
        case "Weapon":
            var newWeapon = new Weapon(ObjIncoming.hurt, ObjIncoming.rate, ObjIncoming.weaponLevel);
            newWeapon.setPassiveObjectProperties(ObjIncoming._id, ObjIncoming.x, ObjIncoming.y, ObjIncoming.caveName, ObjIncoming.hideMinimumDifficulty, ObjIncoming.showMinimumDifficulty, ObjIncoming.spriteY);
            gameProperties.addWeapon(newWeapon);
            break;
        case "checkpoint":
            var newCheckpoint = new Checkpoint(ObjIncoming.checkpoint, ObjIncoming.newLevel, 1, ObjIncoming.messageForKey, ObjIncoming.levelName);
            newCheckpoint.setPassiveObjectProperties(ObjIncoming._id, ObjIncoming.x, ObjIncoming.y, ObjIncoming.caveName, ObjIncoming.hideMinimumDifficulty, ObjIncoming.showMinimumDifficulty, ObjIncoming.spriteY);
            newCheckpoint.setAnimationProperties(ObjIncoming.animate, ObjIncoming.startFrame, ObjIncoming.endFrame);
            gameProperties.addCheckpoint(newCheckpoint);
            break;
        case "Teleport":
            var newTeleport = new Teleport(ObjIncoming.world, ObjIncoming.level, ObjIncoming.whyLocked, ObjIncoming.teleportAllowed);
            newTeleport.setPassiveObjectProperties(ObjIncoming._id, ObjIncoming.x, ObjIncoming.y, ObjIncoming.caveName, ObjIncoming.hideMinimumDifficulty, ObjIncoming.showMinimumDifficulty, ObjIncoming.spriteY);
            newTeleport.setAnimationProperties(ObjIncoming.animate, ObjIncoming.startFrame, ObjIncoming.endFrame);
            gameProperties.addTeleport(newTeleport);
            break;
        case "Cave":
            var newCave = new Cave(ObjIncoming.entrance, ObjIncoming.caveWall, ObjIncoming.caveCeiling, ObjIncoming.xMove, ObjIncoming.yMove);
            newCave.setPassiveObjectProperties(ObjIncoming._id, ObjIncoming.x, ObjIncoming.y, ObjIncoming.caveName, ObjIncoming.hideMinimumDifficulty, ObjIncoming.showMinimumDifficulty, ObjIncoming.spriteY);
            gameProperties.addCave(newCave);
            break;
        case "enemies":
            var newEnemy = new Enemy(ObjIncoming.hurt, ObjIncoming.maxHealth, ObjIncoming.fly);
            newEnemy.setPassiveObjectProperties(ObjIncoming._id, ObjIncoming.x, ObjIncoming.y, ObjIncoming.caveName, ObjIncoming.hideMinimumDifficulty, ObjIncoming.showMinimumDifficulty, ObjIncoming.spriteY);
            gameProperties.addEnemy(newEnemy);
    }
}
;
//# sourceMappingURL=ClassLoader.js.map
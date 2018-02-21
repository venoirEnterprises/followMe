///   <reference path="declareClasses.ts"/>
function typeScriptFile() {
    console.log("typeScripthit");
}
var gameProperties = new FollowMeDefinition();
var weapon = new Weapon(50, 12, 1);
weapon.setPassiveObjectProperties("id here", 5, 10, "", 0, 0);
weapon.setType();
gameProperties.addWeapon(weapon);
var weapon2 = new Weapon(100, 0, 1);
weapon2.setPassiveObjectProperties("id hurrah", 2, 25, "cave test", 2, 5);
weapon2.setType();
gameProperties.addWeapon(weapon2);
var item = new Item("this is a message");
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
    }
}
function addGameObject(Objncoming) {
    switch (Objncoming.type) {
        case "surface":
            var newSurface = new Surface(Objncoming.fan);
            newSurface.setType();
            newSurface.setPassiveObjectProperties(Objncoming._id, Objncoming.x, Objncoming.y, Objncoming.caveName, Objncoming.hideMinimumDifficulty, Objncoming.showMinimumDifficulty);
            gameProperties.addSurface(newSurface);
            break;
        case "Item":
            var newMessage = new Item(Objncoming.message);
            newMessage.setType();
            newMessage.setPassiveObjectProperties(Objncoming._id, Objncoming.x, Objncoming.y, Objncoming.caveName, Objncoming.hideMinimumDifficulty, Objncoming.showMinimumDifficulty);
            break;
        case "Weapon":
            var newWeapon = new Weapon(Objncoming.hurt, Objncoming.rate, Objncoming.weaponLevel);
            newWeapon.setType();
            newWeapon.setPassiveObjectProperties(Objncoming._id, Objncoming.x, Objncoming.y, Objncoming.caveName, Objncoming.hideMinimumDifficulty, Objncoming.showMinimumDifficulty);
            break;
    }
}
window.console.log(getObjectsByType("weapon"));
window.console.log(getObjectsByType("Item"));
//# sourceMappingURL=ClassLoader.js.map
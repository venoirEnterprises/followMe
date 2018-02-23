/*
index and uniqueIdentifier to be removed, in place of server-side _id
xMove replaced by maxx
yMove replaced my maxy
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject() {
        this._id = "";
        this.x = 0;
        this.y = 0;
    }
    return GameObject;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(health, maxHealth, lives, username, local) {
        var _this = _super.call(this) || this;
        _this.health = health;
        _this.maxHealth = maxHealth;
        _this.lives = lives;
        _this.username = username;
        _this.local = local;
        return _this;
    }
    return Player;
}(GameObject));
var PassiveGameObject = (function (_super) {
    __extends(PassiveGameObject, _super);
    function PassiveGameObject() {
        var _this = _super.call(this) || this;
        _this.widthX = 64;
        _this.heightY = 64;
        _this.hideMinimumDifficulty = 0;
        _this.showMinimumDifficulty = 0;
        _this.type = "";
        _this.caveName = "";
        _this.inCave = false;
        _this.spriteY = 0;
        return _this;
    }
    PassiveGameObject.prototype.giveType = function () {
        console.log(this.type + "  is my type");
    };
    PassiveGameObject.prototype.setWidthHeight = function (width, height) {
        this.widthX = width * 64;
        this.heightY = height * 64;
    };
    PassiveGameObject.prototype.setPassiveObjectProperties = function (_id, x, y, caveName, hideMinimumDifficulty, showMinimumDifficulty, spriteY) {
        this.hideMinimumDifficulty = hideMinimumDifficulty;
        this.showMinimumDifficulty = showMinimumDifficulty;
        this._id = _id;
        this.x = x * 64;
        this.y = y * 64;
        this.spriteY = spriteY;
        this.caveName = caveName;
        this.inCave = this.caveName.length > 0 ? true : false;
    };
    PassiveGameObject.prototype.getCaveDetails = function () {
        console.log(this.caveName.length > 0 ? this.caveName + ", in cave? " + this.inCave : "[no cave]");
    };
    return PassiveGameObject;
}(GameObject));
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(hurt, maxHealth, fly) {
        var _this = _super.call(this) || this;
        _this.hurt = hurt;
        _this.maxHealth = maxHealth;
        _this.fly = fly;
        return _this;
    }
    return Enemy;
}(PassiveGameObject));
var Weapon = (function (_super) {
    __extends(Weapon, _super);
    function Weapon(hurt, rate, weaponLevel) {
        var _this = _super.call(this) || this;
        _this.hurt = hurt;
        _this.rate = rate;
        _this.weaponLevel = weaponLevel;
        return _this;
    }
    ;
    return Weapon;
}(PassiveGameObject));
;
var Cave = (function (_super) {
    __extends(Cave, _super);
    function Cave(entrance, caveWall, caveCeiling, xMove, //image manipulations
        yMove) {
        var _this = _super.call(this) || this;
        _this.entrance = entrance;
        _this.caveWall = caveWall;
        _this.caveCeiling = caveCeiling;
        _this.xMove = xMove;
        _this.yMove = yMove;
        return _this;
    }
    ;
    return Cave;
}(PassiveGameObject));
;
var AnimatedGameObject = (function (_super) {
    __extends(AnimatedGameObject, _super);
    function AnimatedGameObject(animate, startFrame, endFrame) {
        if (animate === void 0) { animate = false; }
        if (startFrame === void 0) { startFrame = 0; }
        if (endFrame === void 0) { endFrame = 0; }
        var _this = _super.call(this) || this;
        _this.animate = animate;
        _this.startFrame = startFrame;
        _this.endFrame = endFrame;
        return _this;
    }
    AnimatedGameObject.prototype.giveAnimate = function () {
        console.log(this.animate);
    };
    AnimatedGameObject.prototype.setAnimationProperties = function (animate, startFrame, endFrame) {
        if (animate) {
            this.animate = true;
            this.startFrame = startFrame;
            this.endFrame = endFrame;
        }
    };
    return AnimatedGameObject;
}(PassiveGameObject));
var Item = (function (_super) {
    __extends(Item, _super);
    function Item(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        return _this;
    }
    return Item;
}(AnimatedGameObject));
var Checkpoint = (function (_super) {
    __extends(Checkpoint, _super);
    function Checkpoint(startpoint, checkpoint, newLevel) {
        if (startpoint === void 0) { startpoint = false; }
        var _this = _super.call(this) || this;
        _this.startpoint = startpoint;
        _this.checkpoint = checkpoint;
        _this.newLevel = newLevel;
        return _this;
    }
    return Checkpoint;
}(AnimatedGameObject));
var Teleport = (function (_super) {
    __extends(Teleport, _super);
    function Teleport(world, level, whyLocked, teleportAllowed) {
        var _this = _super.call(this) || this;
        _this.world = world;
        _this.level = level;
        _this.whyLocked = whyLocked;
        _this.teleportAllowed = teleportAllowed;
        return _this;
    }
    return Teleport;
}(AnimatedGameObject));
var AnimatedMovementGameObject = (function (_super) {
    __extends(AnimatedMovementGameObject, _super);
    function AnimatedMovementGameObject(xend, yend, backToStartPoint) {
        if (xend === void 0) { xend = 0; }
        if (yend === void 0) { yend = 0; }
        if (backToStartPoint === void 0) { backToStartPoint = 0; }
        var _this = _super.call(this) || this;
        _this.xend = xend;
        _this.yend = yend;
        _this.backToStartPoint = backToStartPoint;
        return _this;
    }
    return AnimatedMovementGameObject;
}(AnimatedGameObject));
var AnimatedHurtingGameObjectWithHealth = (function (_super) {
    __extends(AnimatedHurtingGameObjectWithHealth, _super);
    function AnimatedHurtingGameObjectWithHealth(maxHealth) {
        if (maxHealth === void 0) { maxHealth = 100; }
        var _this = _super.call(this) || this;
        _this.maxHealth = maxHealth;
        return _this;
    }
    return AnimatedHurtingGameObjectWithHealth;
}(AnimatedMovementGameObject));
var Surface = (function (_super) {
    __extends(Surface, _super);
    function Surface(fan, surfaceAnimationCollection) {
        var _this = _super.call(this) || this;
        _this.fan = fan;
        _this.surfaceAnimationCollection = surfaceAnimationCollection;
        return _this;
    }
    return Surface;
}(AnimatedHurtingGameObjectWithHealth));
var FollowMeDefinition = (function () {
    function FollowMeDefinition(Weapons, Items, Surfaces, Checkpoints, Teleports, Caves, Players) {
        if (Weapons === void 0) { Weapons = new Array(); }
        if (Items === void 0) { Items = new Array(); }
        if (Surfaces === void 0) { Surfaces = new Array(); }
        if (Checkpoints === void 0) { Checkpoints = new Array(); }
        if (Teleports === void 0) { Teleports = new Array(); }
        if (Caves === void 0) { Caves = new Array(); }
        if (Players === void 0) { Players = new Array(); }
        this.Weapons = Weapons;
        this.Items = Items;
        this.Surfaces = Surfaces;
        this.Checkpoints = Checkpoints;
        this.Teleports = Teleports;
        this.Caves = Caves;
        this.Players = Players;
    }
    FollowMeDefinition.prototype.addWeapon = function (weapon) { this.Weapons.push(weapon); };
    FollowMeDefinition.prototype.addItem = function (item) { this.Items.push(item); };
    FollowMeDefinition.prototype.addSurface = function (surface) { this.Surfaces.push(surface); };
    FollowMeDefinition.prototype.addCheckpoint = function (checkpoint) { this.Checkpoints.push(checkpoint); };
    FollowMeDefinition.prototype.addTeleport = function (teleport) { this.Teleports.push(teleport); };
    FollowMeDefinition.prototype.addCave = function (cave) { this.Caves.push(cave); };
    FollowMeDefinition.prototype.addPlayer = function (player) { this.Players.push(player); };
    FollowMeDefinition.prototype.getWeapons = function () { return this.Weapons; };
    FollowMeDefinition.prototype.getItems = function () { return this.Items; };
    FollowMeDefinition.prototype.getSurfaces = function () { return this.Surfaces; };
    FollowMeDefinition.prototype.getCheckpoints = function () { return this.Checkpoints; };
    FollowMeDefinition.prototype.getTeleports = function () { return this.Teleports; };
    FollowMeDefinition.prototype.getCaves = function () { return this.Caves; };
    FollowMeDefinition.prototype.getPlayer = function () { return this.Players.filter(function (m) { return m.local == true; }); };
    FollowMeDefinition.prototype.getOnlinePlayers = function () { return this.Players.filter(function (m) { return m.local == true; }); };
    return FollowMeDefinition;
}());
//# sourceMappingURL=declareClasses.js.map
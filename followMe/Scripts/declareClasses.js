/*
index and uniqueIdentifier to be removed, in place of server-side _id
xMove replaced by maxx
yMove replaced my maxy
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PassiveGameObject = /** @class */ (function () {
    function PassiveGameObject() {
        this.widthX = 64;
        this.heightY = 64;
        this.hideMinimumDifficulty = 0;
        this.showMinimumDifficulty = 0;
        this._id = "";
        this.x = 0;
        this.y = 0;
        this.type = "";
        this.caveName = "";
        this.inCave = false;
    }
    PassiveGameObject.prototype.setType = function (type) {
        this.type = type;
    };
    PassiveGameObject.prototype.giveType = function () {
        console.log(this.type + "  is my type");
    };
    PassiveGameObject.prototype.setWidthHeight = function (width, height) {
        this.widthX = width;
        this.heightY = height;
    };
    PassiveGameObject.prototype.setPassiveObjectProperties = function (_id, x, y, caveName, hideMinimumDifficulty, showMinimumDifficulty) {
        this.hideMinimumDifficulty = hideMinimumDifficulty;
        this.showMinimumDifficulty = showMinimumDifficulty;
        this._id = _id;
        this.x = x * 64;
        this.y = y * 64;
        this.caveName = caveName;
        this.inCave = this.caveName.length > 0 ? true : false;
    };
    PassiveGameObject.prototype.getCaveDetails = function () {
        console.log(this.caveName.length > 0 ? this.caveName + ", in cave? " + this.inCave : "[no cave]");
    };
    return PassiveGameObject;
}());
var Weapon = /** @class */ (function (_super) {
    __extends(Weapon, _super);
    function Weapon(hurt, rate, weaponLevel) {
        var _this = _super.call(this) || this;
        _this.hurt = hurt;
        _this.rate = rate;
        _this.weaponLevel = weaponLevel;
        return _this;
    }
    ;
    Weapon.prototype.setType = function (type) {
        if (type === void 0) { type = "weapon"; }
        _super.prototype.setType.call(this, type);
    };
    return Weapon;
}(PassiveGameObject));
;
var AnimatedGameObject = /** @class */ (function (_super) {
    __extends(AnimatedGameObject, _super);
    function AnimatedGameObject(animate, startFrame, endFrame, spriteY) {
        if (animate === void 0) { animate = false; }
        if (startFrame === void 0) { startFrame = 0; }
        if (endFrame === void 0) { endFrame = 0; }
        if (spriteY === void 0) { spriteY = 0; }
        var _this = _super.call(this) || this;
        _this.animate = animate;
        _this.startFrame = startFrame;
        _this.endFrame = endFrame;
        _this.spriteY = spriteY;
        return _this;
    }
    AnimatedGameObject.prototype.giveAnimate = function () {
        console.log(this.animate);
    };
    return AnimatedGameObject;
}(PassiveGameObject));
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        return _this;
    }
    Item.prototype.setType = function (type) {
        if (type === void 0) { type = "Item"; }
        _super.prototype.setType.call(this, type);
    };
    return Item;
}(AnimatedGameObject));
var AnimatedMovementGameObject = /** @class */ (function (_super) {
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
var AnimatedHurtingGameObjectWithHealth = /** @class */ (function (_super) {
    __extends(AnimatedHurtingGameObjectWithHealth, _super);
    function AnimatedHurtingGameObjectWithHealth(maxHealth) {
        if (maxHealth === void 0) { maxHealth = 100; }
        var _this = _super.call(this) || this;
        _this.maxHealth = maxHealth;
        return _this;
    }
    return AnimatedHurtingGameObjectWithHealth;
}(AnimatedMovementGameObject));
var Surface = /** @class */ (function (_super) {
    __extends(Surface, _super);
    function Surface(fan) {
        var _this = _super.call(this) || this;
        _this.fan = fan;
        return _this;
    }
    Surface.prototype.setType = function (type) {
        if (type === void 0) { type = "Surface"; }
        _super.prototype.setType.call(this, type);
    };
    return Surface;
}(AnimatedHurtingGameObjectWithHealth));
var FollowMeDefinition = /** @class */ (function () {
    function FollowMeDefinition(Weapons, Items, Surfaces) {
        if (Weapons === void 0) { Weapons = new Array(); }
        if (Items === void 0) { Items = new Array(); }
        if (Surfaces === void 0) { Surfaces = new Array(); }
        this.Weapons = Weapons;
        this.Items = Items;
        this.Surfaces = Surfaces;
    }
    FollowMeDefinition.prototype.addWeapon = function (weapon) { this.Weapons.push(weapon); };
    FollowMeDefinition.prototype.addItem = function (item) { this.Items.push(item); };
    FollowMeDefinition.prototype.addSurface = function (surface) { this.Surfaces.push(surface); };
    FollowMeDefinition.prototype.getWeapons = function () { return this.Weapons; };
    FollowMeDefinition.prototype.getItems = function () { return this.Items; };
    FollowMeDefinition.prototype.getSurfaces = function () { return this.Surfaces; };
    return FollowMeDefinition;
}());
//# sourceMappingURL=declareClasses.js.map
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
    function PassiveGameObject(hideMinimumDifficulty, showMinimumDifficulty, widthX, heightY) {
        if (hideMinimumDifficulty === void 0) { hideMinimumDifficulty = 0; }
        if (showMinimumDifficulty === void 0) { showMinimumDifficulty = 0; }
        if (widthX === void 0) { widthX = 64; }
        if (heightY === void 0) { heightY = 64; }
        this.hideMinimumDifficulty = hideMinimumDifficulty;
        this.showMinimumDifficulty = showMinimumDifficulty;
        this.widthX = widthX;
        this.heightY = heightY;
        this._id = "";
        this.x = 0;
        this.y = 0;
        this.type = "";
        this.caveName = "";
        this.inCave = false;
    }
    PassiveGameObject.prototype.set_id = function (id) {
        this._id = id;
    };
    PassiveGameObject.prototype.setType = function (type) {
        this.type = type;
    };
    PassiveGameObject.prototype.giveType = function () {
        console.log(this.type + "  is my type");
    };
    PassiveGameObject.prototype.setX = function (thisValue) {
        this.x = thisValue * 64;
    };
    PassiveGameObject.prototype.setY = function (thisValue) {
        this.y = thisValue * 64;
    };
    PassiveGameObject.prototype.setCaveDetails = function (caveName) {
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
    function Weapon(hurt) {
        var _this = _super.call(this, 0, 0, 0, 0) || this;
        _this.hurt = hurt;
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
var AnimatedMovementGameObject = /** @class */ (function (_super) {
    __extends(AnimatedMovementGameObject, _super);
    function AnimatedMovementGameObject(animate, startFrame, endFrame, spriteY, xend, yend) {
        if (animate === void 0) { animate = false; }
        if (startFrame === void 0) { startFrame = 0; }
        if (endFrame === void 0) { endFrame = 0; }
        if (spriteY === void 0) { spriteY = 0; }
        if (xend === void 0) { xend = 0; }
        if (yend === void 0) { yend = 0; }
        var _this = _super.call(this, animate, startFrame, endFrame, spriteY) || this;
        _this.animate = animate;
        _this.startFrame = startFrame;
        _this.endFrame = endFrame;
        _this.spriteY = spriteY;
        _this.xend = xend;
        _this.yend = yend;
        return _this;
    }
    return AnimatedMovementGameObject;
}(AnimatedGameObject));
var weapon = new Weapon(50);
weapon.set_id("id1");
weapon.setCaveDetails("");
weapon.setType();
weapon.giveType();
weapon.getCaveDetails();
var weapon2 = new Weapon(100);
weapon2.set_id("id2");
weapon2.setCaveDetails("caveTest");
weapon2.setType();
weapon2.getCaveDetails();
var animate = new AnimatedGameObject(false, 1, 2, 4);
animate.setType("surface");
animate.giveAnimate();
//# sourceMappingURL=declareClasses.js.map
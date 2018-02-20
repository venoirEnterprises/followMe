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
    function PassiveGameObject(caveName, hideMinimumDifficulty, showMinimumDifficulty, widthX, heightY, //defaulted end, expected value
    inCave) {
        if (caveName === void 0) { caveName = ""; }
        if (hideMinimumDifficulty === void 0) { hideMinimumDifficulty = 0; }
        if (showMinimumDifficulty === void 0) { showMinimumDifficulty = 0; }
        if (widthX === void 0) { widthX = 64; }
        if (heightY === void 0) { heightY = 64; }
        if (inCave === void 0) { inCave = caveName.length > 0 ? true : false; }
        this.caveName = caveName;
        this.hideMinimumDifficulty = hideMinimumDifficulty;
        this.showMinimumDifficulty = showMinimumDifficulty;
        this.widthX = widthX;
        this.heightY = heightY;
        this.inCave = inCave;
        this.x = 0;
        this.y = 0;
        this.type = "";
    }
    PassiveGameObject.prototype.setType = function (type) {
        this.type = type;
    };
    PassiveGameObject.prototype.giveType = function () {
        console.log(this.type + " is my type");
    };
    PassiveGameObject.prototype.setX = function (thisValue) {
        this.x = thisValue * 64;
    };
    PassiveGameObject.prototype.setY = function (thisValue) {
        this.y = thisValue * 64;
    };
    PassiveGameObject.prototype.giveCoords = function () {
        console.log(this.x + ", " + this.y);
    };
    PassiveGameObject.prototype.getCaveDetails = function () {
        console.log(this.caveName.length > 0 ? this.caveName : "[no cave]" + ", in cave? " + this.inCave);
    };
    return PassiveGameObject;
}());
var Weapon = /** @class */ (function (_super) {
    __extends(Weapon, _super);
    function Weapon(_id, hurt, caveName) {
        if (_id === void 0) { _id = ""; }
        if (caveName === void 0) { caveName = ""; }
        var _this = _super.call(this, caveName, 0, 0, 0, 0, false) || this;
        _this._id = _id;
        _this.hurt = hurt;
        _this.caveName = caveName;
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
    function AnimatedGameObject(_id, animate, startFrame, endFrame, spriteY) {
        if (_id === void 0) { _id = ""; }
        if (animate === void 0) { animate = false; }
        if (startFrame === void 0) { startFrame = 0; }
        if (endFrame === void 0) { endFrame = 0; }
        if (spriteY === void 0) { spriteY = 0; }
        var _this = _super.call(this, _id) || this;
        _this._id = _id;
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
var weapon = new Weapon("id", 50, "");
weapon.setType();
weapon.giveType();
weapon.getCaveDetails();
var weapon2 = new Weapon("id2", 100, "caveTest");
weapon2.setType();
weapon2.getCaveDetails();
var animate = new AnimatedGameObject("id3", false, 1, 2, 4);
animate.setType("surface");
animate.giveAnimate();
//# sourceMappingURL=declareClasses.js.map
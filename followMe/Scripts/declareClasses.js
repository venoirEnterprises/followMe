var GameObject = (function () {
    function GameObject(_id, name) {
        this._id = _id;
        this.name = name;
    }
    GameObject.prototype.giveName = function () {
        console.log(this.name + " is my name");
    };
    return GameObject;
}());
var gameObj1 = new GameObject("1", "me");
gameObj1.giveName();
//# sourceMappingURL=declareClasses.js.map
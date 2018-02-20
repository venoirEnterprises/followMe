
abstract class PassiveGameObject {
    constructor(
        public caveName: string = "",
        public hideMinimumDifficulty: number = 0,
        public showMinimumDifficulty: number = 0,
        public widthX: number = 64,
        public heightY: number = 64,//defaulted end, expected value
        public inCave: boolean = caveName.length > 0 ? true : false,
    ) { }

    private x = 0;
    private y = 0;
    private type ="";

    setType(type : string) {
        this.type = type;
    }

    giveType() {
        console.log(this.type + " is my type");
    }

    setX(thisValue) {
        this.x = thisValue * 64;
    }
    setY(thisValue) {
        this.y = thisValue * 64;
    }
    giveCoords() {
        console.log(this.x + ", " + this.y);
    }
    getCaveDetails() {
        console.log(this.caveName.length>0?this.caveName:"[no cave]" + ", in cave? " + this.inCave);
    }
}

class Weapon extends PassiveGameObject {
    constructor(
        public _id: string = "",
        public hurt: number,
        public caveName: string = "",
    ) {
        super(caveName, 0, 0, 0, 0, false)
    };
    setType(type = "weapon") {
        super.setType(type);
    }
};

class AnimatedGameObject extends PassiveGameObject {
    constructor(
        public _id: string = "",
        public animate: boolean = false,
        public startFrame: number = 0,
        public endFrame: number = 0,
        public spriteY: number = 0,
    ) { super(_id) }
    giveAnimate() {
        console.log(this.animate);
    }
}

let weapon = new Weapon("id", 50, "");
weapon.setType();
weapon.giveType();
weapon.getCaveDetails();

let weapon2 = new Weapon("id2", 100, "caveTest");
weapon2.setType();
weapon2.getCaveDetails();

let animate = new AnimatedGameObject("id3", false, 1, 2, 4);
animate.setType("surface");
animate.giveAnimate();
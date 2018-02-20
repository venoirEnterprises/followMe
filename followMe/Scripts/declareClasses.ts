
abstract class PassiveGameObject {
    constructor(
        
        public hideMinimumDifficulty: number = 0,
        public showMinimumDifficulty: number = 0,
        public widthX: number = 64,
        public heightY: number = 64,//defaulted end, expected value
    ) { }

    private _id = "";
    private x = 0;
    private y = 0;
    private type = "";
    private caveName: string = "";
    private inCave: boolean = false;

    set_id(id)
    {
        this._id = id;
    }

    setType(type: string) {
        this.type = type;
    }

    giveType() {
        console.log(`${this.type}  is my type`);
    }

    setX(thisValue) {
        this.x = thisValue * 64;
    }
    setY(thisValue) {
        this.y = thisValue * 64;
    }
    setCaveDetails(caveName)
    {
        this.caveName = caveName;
        this.inCave = this.caveName.length > 0 ? true : false;
    }

    getCaveDetails() {
        console.log(this.caveName.length > 0 ? this.caveName + ", in cave? " + this.inCave : "[no cave]");
    }
}

class Weapon extends PassiveGameObject {
    constructor(
        public hurt: number,
    ) {
        super(0, 0, 0, 0)
    };
    setType(type = "weapon") {
        super.setType(type);
    }
};

class AnimatedGameObject extends PassiveGameObject {
    constructor(
        public animate: boolean = false,
        public startFrame: number = 0,
        public endFrame: number = 0,
        public spriteY: number = 0,
    ) { super() }    
    giveAnimate() {
        console.log(this.animate);
    }
}

class AnimatedMovementGameObject extends AnimatedGameObject {
    constructor(
        public animate: boolean = false,
        public startFrame: number = 0,
        public endFrame: number = 0,
        public spriteY: number = 0,
        public xend: number = 0,
        public yend: number = 0,
    ) { super(animate, startFrame, endFrame, spriteY) }
}


let weapon = new Weapon(50);
weapon.set_id("id1");
weapon.setCaveDetails("");
weapon.setType();
weapon.giveType();
weapon.getCaveDetails();

let weapon2 = new Weapon(100);
weapon2.set_id("id2");
weapon2.setCaveDetails("caveTest");
weapon2.setType();
weapon2.getCaveDetails();

let animate = new AnimatedGameObject(false, 1, 2, 4);
animate.setType("surface");
animate.giveAnimate();
/*
index and uniqueIdentifier to be removed, in place of server-side _id
xMove replaced by maxx
yMove replaced my maxy
*/

abstract class GameObject {
    constructor(
    ) { }
    public _id: string = "";
    public x: number = 0;
    public y: number = 0;
}

class Player extends GameObject {
    constructor(
        public health: number,
        public maxHealth: number,
        public lives: number,
        public username: string,
        public local: boolean,
    ) { super() }
}

abstract class PassiveGameObject extends GameObject {
    constructor(                        
    ) { super()}

    private widthX:number = 64;
    private heightY: number = 64;
    private hideMinimumDifficulty: number = 0;
    private showMinimumDifficulty: number = 0;    
    private type:string = "";
    private caveName: string = "";
    private inCave: boolean = false;

    setType(type: string) {
        this.type = type;
    }

    giveType() {
        console.log(`${this.type}  is my type`);
    }

    setWidthHeight(width, height)
    {
        this.widthX = width;
        this.heightY = height;
    }

    setPassiveObjectProperties(_id: string, x:number, y:number, caveName:string, hideMinimumDifficulty:number, showMinimumDifficulty:number)
    {
        this.hideMinimumDifficulty = hideMinimumDifficulty;
        this.showMinimumDifficulty = showMinimumDifficulty;
        this._id = _id;
        this.x = x * 64;
        this.y = y * 64;
        this.caveName = caveName;
        this.inCave = this.caveName.length > 0 ? true : false;
    }
    
    getCaveDetails() {
        console.log(this.caveName.length > 0 ? this.caveName + ", in cave? " + this.inCave : "[no cave]");
    }
}

class Enemy extends PassiveGameObject {
    constructor(
        public hurt: number,
        public maxHealth: number,
        public fly: boolean,
    ) {
        super()
    }

    setType(type = "Enemy") {
        super.setType(type);
    }
}

class Weapon extends PassiveGameObject {
    constructor(
        public hurt: number,
        public rate: number,
        public weaponLevel: number,
    ) {
        super()
    };
    setType(type = "weapon") {
        super.setType(type);
    }
};


abstract class AnimatedGameObject extends PassiveGameObject {
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

class Item extends AnimatedGameObject {
    constructor(
        public message: string,
    ) { super() }
    setType(type = "Item") {
        super.setType(type);
    }
}

class Checkpoint extends AnimatedGameObject {
    constructor(
        public startpoint: boolean = false,
        public checkpoint: number,
        public newLevel: boolean = false,
    ) { super() }
    setType(type = "Checkpoint") {
        super.setType(type);
    }
}



abstract class AnimatedMovementGameObject extends AnimatedGameObject {
    constructor(
        public xend: number = 0,
        public yend: number = 0,
        public backToStartPoint: number = 0,
    ) { super() }
}

abstract class AnimatedHurtingGameObjectWithHealth extends AnimatedMovementGameObject {
    constructor(
        public maxHealth: number = 100,
    ) {super() }
}

class Surface extends AnimatedHurtingGameObjectWithHealth {
    constructor(
        public fan: boolean,
        public surfaceAnimationCollection: string,
    ) { super() }
    setType(type = "Surface") {
        super.setType(type);
    }
}



class FollowMeDefinition {
    constructor(
        public Weapons: Array<Weapon> = new Array<Weapon>(),
        public Items: Array<Item> = new Array<Item>(),
        public Surfaces: Array<Surface> = new Array<Surface>(),
        public Checkpoints: Array<Checkpoint> = new Array<Checkpoint>(),
        public Players: Array<Player> = new Array<Player>(),
    ) { }
    addWeapon(weapon) { this.Weapons.push(weapon); }
    addItem(item) { this.Items.push(item); }
    addSurface(surface) { this.Surfaces.push(surface); }
    addCheckpoint(checkpoint) { this.Checkpoints.push(checkpoint); }
    addPlayer(player) { this.Players.push(player); }

    getWeapons() { return this.Weapons; }
    getItems() { return this.Items }
    getSurfaces() { return this.Surfaces; }
    getCheckpoints() { return this.Checkpoints; }
    getPlayer() { return this.Players.filter(m => m.local == true) }
    getOnlinePlayers() { return this.Players.filter(m => m.local == true) }
}

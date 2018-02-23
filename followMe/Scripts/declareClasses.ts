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
    ) { super() }

    public widthX: number = 64;
    public heightY: number = 64;
    public hideMinimumDifficulty: number = 0;
    public showMinimumDifficulty: number = 0;
    public type: string = "";
    public caveName: string = "";
    public inCave: boolean = false;
    public spriteY: number = 0;

    giveType() {
        console.log(`${this.type}  is my type`);
    }

    setWidthHeight(width: number, height: number) {
        this.widthX = width * 64;
        this.heightY = height * 64;
    }

    setPassiveObjectProperties(_id: string, x: number, y: number, caveName: string, hideMinimumDifficulty: number, showMinimumDifficulty: number, spriteY: number) {
        this.hideMinimumDifficulty = hideMinimumDifficulty;
        this.showMinimumDifficulty = showMinimumDifficulty;
        this._id = _id;
        this.x = x * 64;
        this.y = y * 64;
        this.spriteY = spriteY;
        this.caveName = caveName || "";
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
}

class Weapon extends PassiveGameObject {
    constructor(
        public hurt: number,
        public rate: number,
        public weaponLevel: number,
    ) {
        super()
    };
};

class Cave extends PassiveGameObject {
    constructor(
        public entrance: boolean,
        public caveWall: boolean,
        public caveCeiling: boolean,
        public xMove: number,//image manipulations
        public yMove: number,
    ) {
        super()
    };
};

abstract class AnimatedGameObject extends PassiveGameObject {
    constructor(
        public animate: boolean = false,
        public startFrame: number = 0,
        public endFrame: number = 0,        
    ) { super() }
    giveAnimate() {
        console.log(this.animate);
    }
    setAnimationProperties(animate: boolean,startFrame: number,endFrame: number) {
        if (animate)
        {
            this.animate = true;
            this.startFrame = startFrame;
            this.endFrame = endFrame;
        }
    }
}

class Item extends AnimatedGameObject {
    constructor(
        public message: string,
    ) { super() }
}

class Checkpoint extends AnimatedGameObject {
    constructor(
        public checkpoint: number,
        public newLevel: string,//supposed to name the level
        public unityLevel: number,
        public messageForKey: string,
        public levelName: string,
    ) { super() }
}

class Teleport extends AnimatedGameObject {
    constructor(
        public world: string,
        public level: string,
        public whyLocked: string,
        public teleportAllowed: boolean,
    ) { super() }
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
    ) { super() }
}

class Surface extends AnimatedHurtingGameObjectWithHealth {
    constructor(
        public fan: boolean,
        public surfaceAnimationCollection: string,
    ) { super() }
}



class FollowMeDefinition {
    constructor(
        public Enemies: Array<Enemy> = new Array<Enemy>(),
        public Weapons: Array<Weapon> = new Array<Weapon>(),
        public Items: Array<Item> = new Array<Item>(),
        public Surfaces: Array<Surface> = new Array<Surface>(),
        public Checkpoints: Array<Checkpoint> = new Array<Checkpoint>(),
        public Teleports: Array<Teleport> = new Array<Teleport>(),
        public Caves: Array<Cave> = new Array<Cave>(),
        public Players: Array<Player> = new Array<Player>(),
    ) { }
    addEnemy(enemy: Enemy) { this.Enemies.push(enemy); }
    addWeapon(weapon: Weapon) { this.Weapons.push(weapon); }
    addItem(item: Item) { this.Items.push(item); }
    addSurface(surface: Surface) { this.Surfaces.push(surface); }
    addCheckpoint(checkpoint: Checkpoint) { this.Checkpoints.push(checkpoint); }
    addTeleport(teleport: Teleport) { this.Teleports.push(teleport); }
    addCave(cave: Cave) { this.Caves.push(cave); }
    addPlayer(player: Player) { this.Players.push(player); }

    getEnemies() { return this.Enemies; }
    getWeapons() { return this.Weapons; }
    getItems() { return this.Items }
    getSurfaces() { return this.Surfaces; }
    getCheckpoints() { return this.Checkpoints; }    
    getTeleports() { return this.Teleports; }
    getCaves() { return this.Caves; }
    getPlayer() { return this.Players.filter(m => m.local == true) }
    getOnlinePlayers() { return this.Players.filter(m => m.local == true) }
}

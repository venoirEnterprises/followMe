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
    ) { super() }
    public difficulty: number = 1;
    public checkpoint: number = 0;
    public xp: number = 0;
    public rank: number = 0
    //community start
    public isVenoir: boolean = false;
    public local: boolean = true;
    public hasSurvived: boolean = false;
    public email: string;
    public friendlyFire: boolean = false;
    public online: boolean = false;
    public shareXPInHelp: boolean = false;
    public socialOnly: boolean = false;
    public username: string;
    //community end
    //keys start
    public build: number = 0;
    public left: number = 0;
    public enter: number = 0;
    public right: number = 0;
    public special: number = 0;
    public surrender: number = 0;
    public up: number = 0;
    //keys end
    //display start
    public chest: number = 0;
    public head: number = 0;
    public legs: number = 0;
    public health: number = 0;
    public maxHealth: number = 0;
    public lives: number = 0;
    public weaponID: number = 0;
    public personType: number = 1;
    //display end
    //progress start
    public levelPlayTime: number = 0;//seconds
    public level: string = "";
    public world: number = 0
    //progress end


    //setters start
    setCoreFields(difficulty, checkpoint, xp, rank, _id, username)
    {
        this.difficulty = difficulty;
        this.checkpoint = checkpoint;
        this.xp = xp;
        this.rank = rank;
        this._id = _id//unique for array discovery in addPlayer() []
        this.username = username;
    }

    setCommunityFields(isVenoir, hasSurvived, email, friendlyFire, online, shareXPInHelp, socialOnly,username)
    {
        this.isVenoir = isVenoir;
        this.local = this.username == username ? true : false;
        this.hasSurvived = hasSurvived;
        this.email = email;
        this.friendlyFire = friendlyFire;
        this.online = online;
        this.shareXPInHelp = shareXPInHelp;
        this.socialOnly = socialOnly;        
    }

    setDisplayFields(maxHealth, currentHealth, chest, head, legs, lives, weaponID, personType) {
        this.maxHealth = maxHealth;
        this.health = currentHealth;
        this.chest = chest;
        this.head = head;
        this.legs = legs;
        this.lives = lives;
        this.weaponID = weaponID;
        this.personType = personType;
    }

    setProgressFields(levelPlayTime, level, world)
    {
        this.levelPlayTime = levelPlayTime;
        this.level = level;
        this.world = world;
    }
    //setters end
    //getters start
    getUsername()
    {
        return this.username;
    }
}

abstract class PassiveGameObject extends GameObject {
    constructor(
    ) { super() }

    public widthX: number = 64;
    public heightY: number = 64;
    public hideMinimumDifficulty: number = 0;
    public showMinimumDifficulty: number = 0;
    public caveName: string = "";
    public inCave: boolean = false;
    public spriteY: number = 0;

    setPassiveObjectProperties(type: string, _id: string, x: number, y: number, caveName: string, hideMinimumDifficulty: number, showMinimumDifficulty: number, spriteY: number, width: number, height: number) {
        this.hideMinimumDifficulty = hideMinimumDifficulty;
        this.showMinimumDifficulty = showMinimumDifficulty;
        this._id = _id;
        this.x = x * 64;
        this.y = y * 64;
        this.widthX = width * 64;
        this.heightY = height * 64;
        if (type === "enemies") {
            this.heightY += 8;
        }
        this.spriteY = spriteY;
        this.caveName = caveName || "";
        this.inCave = this.caveName.length > 0 ? true : false;
    }

    getCaveDetails() {
        console.log(this.caveName.length > 0 ? this.caveName + ", in cave? " + this.inCave : "[no cave]");
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
        public startFrame: string = "",
        public endFrame: number = 0,
    ) { super() }
    giveAnimate() {
        console.log(this.animate);
    }
    setAnimationProperties(animate: boolean, startFrame: number, endFrame: number, type: string) {
        this.animate = animate;
        switch (type) {
            case "checkpoint":
                this.startFrame = (-64 * startFrame) + "px -64px";
                break;
            case "enemies":
                this.startFrame = (-64 * startFrame) + "px -192px";
                break;
            case "surface":
                this.startFrame = (-64 * startFrame) + "px 0px";
                break;
        }
        this.endFrame = endFrame;
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
    setMovementProperties(xend: number, yend: number, backToStartPoint: number) {
        this.xend = xend;
        this.yend = yend;
        this.backToStartPoint = backToStartPoint;
    }
}

abstract class AnimatedHurtingGameObjectWithHealth extends AnimatedMovementGameObject {
    constructor(
        public maxHealth: number = 0,
        public currentHealth: number = 0,
    ) { super() }
    setHealth(maxHealth, currentHealth) {
        this.maxHealth = maxHealth;
        this.currentHealth = currentHealth;
    }
}

class Enemy extends AnimatedHurtingGameObjectWithHealth {
    constructor(
        public hurt: number,
        public fly: boolean,
    ) {
        super()
    }
}

class Surface extends AnimatedHurtingGameObjectWithHealth {
    constructor(
        public fan: boolean,
        public surfaceAnimationCollection: string,
    ) { super() }

    setSurfaceCollisionProperties() {
        this.minx = this.x;
        this.miny = this.y;
        this.maxx = this.x + this.widthX;
        this.maxy = this.y + this.heightY;
    }
    private minx: number;
    private miny: number;
    private maxx: number;
    private maxy: number;
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
        public localPlayers: Array<Player> = new Array<Player>(),
        public onlinePlayers: Array<Player> = new Array<Player>(),
    ) { }

    //add start
    addEnemy(enemy: Enemy) { this.Enemies[enemy._id] = enemy; }
    addWeapon(weapon: Weapon) { this.Weapons[weapon._id] = weapon }
    addItem(item: Item) { this.Items[item._id] = item; }
    addSurface(surface: Surface) { this.Surfaces[surface._id] = surface; }
    addCheckpoint(checkpoint: Checkpoint) { this.Checkpoints[checkpoint._id] = checkpoint; }
    addTeleport(teleport: Teleport) { this.Teleports[teleport._id] = teleport; }
    addCave(cave: Cave) { this.Caves[cave._id] = cave; }
    addPlayer(player: Player) {
        if (localStorage.getItem("username") === player.getUsername()) {
            this.localPlayers[player._id] = player;
        }
        else {
            this.onlinePlayers[player._id] = player;
        }
    }
    //add end
    //get start
    getEnemies() { return this.Enemies; }
    getWeapons() { return this.Weapons; }
    getItems() { return this.Items }
    getSurfaces() { return this.Surfaces; }
    getCheckpoints() { return this.Checkpoints; }
    getTeleports() { return this.Teleports; }
    getCaves() { return this.Caves; }
    getPlayer() { return this.localPlayers }
    getOnlinePlayers() { return this.onlinePlayers }
    //get end
}

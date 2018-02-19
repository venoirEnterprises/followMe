

class GameObject {
    constructor(public _id: string, public name: string) { }
    giveName() {
        console.log(this.name +" is my name");
    }
} 

let gameObj1 = new GameObject("1", "me");
gameObj1.giveName();

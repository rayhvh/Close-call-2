/// <reference path="gameobject.ts" />
/// <reference path="wheel.ts" />



class Car extends gameobject {

    public speed: number;
    private isBraking: boolean = false;
    private isHalted:boolean = false;
    private height: number = 45;
    private width: number = 145;

    wheel1: Wheel;
    wheel2: Wheel;

    constructor(x: number, y: number, speed: number) {
        super(document.getElementById("container"), "car", x, y);


        this.speed = 1+ speed;
        console.log(this.speed);

        this.wheel1 = new Wheel(this.div, 20, 35);
        this.wheel2 = new Wheel(this.div, 105, 35);

        this.div.addEventListener("click",(e:MouseEvent) => this.onKeyDown(e));

    }

    public move(): void {
        if (this.isBraking) {
            this.speed *= 0.9;
        }
        else {
            this.speed *= 1.002;
        }

        if (this.speed < 1) { // kan ook door collision 
            this.halted();
        }
        this.wheel1.turn(this.speed);
        this.wheel2.turn(this.speed);

        // de snelheid bij de x waarde optellen
        //
        this.x = this.x + this.speed;
        // tekenen
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    }


    private onKeyDown(event: MouseEvent): void {
        this.isBraking = true;
    }

    private halted(): void {
        if(!this.isHalted){
            this.isHalted = true;
             let g: Game = Game.getInstance();
             g.score += this.x;
             g.addScore();
        } 
    }

    public getLocation() {
        let location = { x: this.x, y: this.y, height: this.height, width: this.width };
        return location;
    }

}
class Rock extends gameobject {

    private speedX: number;
    private speedY: number;
    private ismoving: Boolean = false;
    private height: number = 62;
    private width: number = 62;

    constructor(x:number,y:number) {
        super(document.getElementById("container"), "rock", x, y);
        this.speedX = 0;
        this.speedY = 0;
    }


 

    public end(): void {
        let g: Game = Game.getInstance();
        g.endGame();
    }

    public getLocation() {
        let location = { x: this.x, y: this.y, height: this.height, width: this.width };
        return location;
    }
}
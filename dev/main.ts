/// <reference path="car.ts"/>
/// <reference path="rock.ts"/>

class Game {

    private static instance: Game;
    private cars: Array<Car> = [];
    private rocks: Array<Rock> = [];
    private gamerunning: boolean = true;
    public score: number = 1;

    private constructor() {

    }
    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
    startGame() {
        let cars: Array<Car> = new Array<Car>();
        for (var i = 0; i < 5; i++) {

            let randomSpeed = Math.random();
            let randomXcar = Math.floor(Math.random() * (135 - 250)) + 250;
            this.cars.push(new Car(-randomXcar, 100 * i + 50, randomSpeed));

            let randomXrock = Math.floor(Math.random() * (250 - 700)) + 700;
            this.rocks.push(new Rock(randomXrock, 100 * i + 50));
        }


        // this.rock = new Rock();
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop() {
        if (this.gamerunning == true) {
            for (let car of this.cars) {
                car.move();
                for (let rock of this.rocks) {
                    if (util.collision(car.getLocation(), rock.getLocation())) {
                        car.speed = 0;
                        console.log("boom");
                        this.gamerunning = false;
                        document.getElementById("score").innerHTML = "You crashed!";
                    }
                }
               
            }
            requestAnimationFrame(() => this.gameLoop());
        }

    }
    public addScore(){
         document.getElementById("score").innerHTML = "Score : " + this.score;
    }

    public endGame() {
        this.gamerunning = false;
        document.getElementById("score").innerHTML = "Score : 0";
    }
    // public showScore() {
    //     this.gamerunning = false;
    // }
}


// load
window.addEventListener("load", function () {
    let g: Game = Game.getInstance();
    g.startGame();
});
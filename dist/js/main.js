var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameobject = (function () {
    function gameobject(targetElement, htmlString, x, y) {
        this.div = document.createElement(htmlString);
        console.log(targetElement);
        targetElement.appendChild(this.div);
        this.x = x;
        this.y = y;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    }
    return gameobject;
}());
var Wheel = (function (_super) {
    __extends(Wheel, _super);
    function Wheel(superHTMLelement, x, y) {
        return _super.call(this, superHTMLelement, "wheel", x, y) || this;
    }
    Wheel.prototype.turn = function (speed) {
        this.div.style.transform += "rotate(" + speed * 10 + "deg)";
    };
    return Wheel;
}(gameobject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(supergame) {
        var _this = _super.call(this, document.getElementById("container"), "car", 0, 215) || this;
        _this.braking = false;
        _this.game = supergame;
        _this.speed = 1.35;
        _this.wheel1 = new Wheel(_this.div, 20, 35);
        _this.wheel2 = new Wheel(_this.div, 105, 35);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        return _this;
    }
    Car.prototype.move = function (rock) {
        if (this.braking) {
            this.speed *= 0.9;
        }
        else {
            this.speed *= 1.02;
        }
        if (this.x > 363) {
            this.speed = 0;
            rock.move();
        }
        else if (this.speed < 1) {
            this.halted();
        }
        this.wheel1.turn(this.speed);
        this.wheel2.turn(this.speed);
        this.x = this.x + this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    Car.prototype.onKeyDown = function (event) {
        this.braking = true;
    };
    Car.prototype.halted = function () {
        var _this = this;
        var score = document.getElementById("score");
        score.innerHTML = "Score : " + this.x;
        setTimeout(function () {
            if (score.innerHTML == "Score : " + _this.x) {
                _this.game.showScore();
            }
        }, 100);
    };
    return Car;
}(gameobject));
var Rock = (function (_super) {
    __extends(Rock, _super);
    function Rock(supergame) {
        var _this = _super.call(this, document.getElementById("container"), "rock", 508, 208) || this;
        _this.ismoving = false;
        _this.speedX = 0;
        _this.speedY = 0;
        _this.game = supergame;
        return _this;
    }
    Rock.prototype.move = function () {
        if (this.ismoving == false) {
            this.ismoving = true;
            this.speedX = 1;
            this.speedY = 3;
            console.log("speed rock on");
            this.x = this.x + 20;
            this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        }
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
        if (this.y == 538) {
            this.end();
        }
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    Rock.prototype.end = function () {
        this.speedX = 0;
        this.speedY = 0;
        this.game.endGame();
    };
    return Rock;
}(gameobject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.gamerunning = true;
        this.car = new Car(this);
        this.rock = new Rock(this);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (this.gamerunning == true) {
            this.car.move(this.rock);
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
    };
    Game.prototype.endGame = function () {
        this.gamerunning = false;
        document.getElementById("score").innerHTML = "Score : 0";
    };
    Game.prototype.showScore = function () {
        this.gamerunning = false;
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
//# sourceMappingURL=main.js.map
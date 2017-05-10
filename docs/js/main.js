var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameobject = (function () {
    function gameobject(targetElement, htmlString, x, y) {
        this.div = document.createElement(htmlString);
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
    function Car(x, y, speed) {
        var _this = _super.call(this, document.getElementById("container"), "car", x, y) || this;
        _this.isBraking = false;
        _this.isHalted = false;
        _this.height = 45;
        _this.width = 145;
        _this.speed = 1 + speed;
        console.log(_this.speed);
        _this.wheel1 = new Wheel(_this.div, 20, 35);
        _this.wheel2 = new Wheel(_this.div, 105, 35);
        _this.div.addEventListener("click", function (e) { return _this.onKeyDown(e); });
        return _this;
    }
    Car.prototype.move = function () {
        if (this.isBraking) {
            this.speed *= 0.9;
        }
        else {
            this.speed *= 1.002;
        }
        if (this.speed < 1) {
            this.halted();
        }
        this.wheel1.turn(this.speed);
        this.wheel2.turn(this.speed);
        this.x = this.x + this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    Car.prototype.onKeyDown = function (event) {
        this.isBraking = true;
    };
    Car.prototype.halted = function () {
        if (!this.isHalted) {
            this.isHalted = true;
            var g = Game.getInstance();
            g.score += this.x;
            g.addScore();
        }
    };
    Car.prototype.getLocation = function () {
        var location = { x: this.x, y: this.y, height: this.height, width: this.width };
        return location;
    };
    return Car;
}(gameobject));
var Rock = (function (_super) {
    __extends(Rock, _super);
    function Rock(x, y) {
        var _this = _super.call(this, document.getElementById("container"), "rock", x, y) || this;
        _this.ismoving = false;
        _this.height = 62;
        _this.width = 62;
        _this.speedX = 0;
        _this.speedY = 0;
        return _this;
    }
    Rock.prototype.end = function () {
        var g = Game.getInstance();
        g.endGame();
    };
    Rock.prototype.getLocation = function () {
        var location = { x: this.x, y: this.y, height: this.height, width: this.width };
        return location;
    };
    return Rock;
}(gameobject));
var Game = (function () {
    function Game() {
        this.cars = [];
        this.rocks = [];
        this.gamerunning = true;
        this.score = 1;
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.startGame = function () {
        var _this = this;
        var cars = new Array();
        for (var i = 0; i < 5; i++) {
            var randomSpeed = Math.random();
            var randomXcar = Math.floor(Math.random() * (135 - 250)) + 250;
            this.cars.push(new Car(-randomXcar, 100 * i + 50, randomSpeed));
            var randomXrock = Math.floor(Math.random() * (250 - 700)) + 700;
            this.rocks.push(new Rock(randomXrock, 100 * i + 50));
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (this.gamerunning == true) {
            for (var _i = 0, _a = this.cars; _i < _a.length; _i++) {
                var car = _a[_i];
                car.move();
                for (var _b = 0, _c = this.rocks; _b < _c.length; _b++) {
                    var rock = _c[_b];
                    if (util.collision(car.getLocation(), rock.getLocation())) {
                        car.speed = 0;
                        console.log("boom");
                        this.gamerunning = false;
                        document.getElementById("score").innerHTML = "You crashed!";
                    }
                }
            }
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
    };
    Game.prototype.addScore = function () {
        document.getElementById("score").innerHTML = "Score : " + this.score;
    };
    Game.prototype.endGame = function () {
        this.gamerunning = false;
        document.getElementById("score").innerHTML = "Score : 0";
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = Game.getInstance();
    g.startGame();
});
var util = (function () {
    function util() {
    }
    util.collision = function (instance1, instance2) {
        if (instance1.x < instance2.x + instance2.width &&
            instance1.x + instance1.width > instance2.x &&
            instance1.y < instance2.y + instance2.height &&
            instance1.height + instance1.y > instance2.y) {
            return true;
        }
    };
    return util;
}());
//# sourceMappingURL=main.js.map
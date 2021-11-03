//Simple Vector2 class that has vector addition, subtraction, scalar multiplication, and division. It also includes magnitude and direction functions.
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.add = function (vec) {
        return new Vector2(this.x + vec.x, this.y + vec.y);
    };
    Vector2.prototype.sub = function (vec) {
        return new Vector2(this.x - vec.x, this.y - vec.y);
    };
    Vector2.prototype.mult = function (scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    };
    Vector2.prototype.div = function (scalar) {
        return new Vector2(this.x / scalar, this.y / scalar);
    };
    Vector2.prototype.getMag = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };
    Vector2.prototype.getDirection = function () {
        return Math.atan(this.y / this.x);
    };
    return Vector2;
}());
//simple Vector3 class that has vector addition, subtraction, scalar multiplication, and division. It also includes a magnitude function.
var Vector3 = /** @class */ (function () {
    function Vector3(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector3.prototype.add = function (vec) {
        return new Vector3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    };
    Vector3.prototype.sub = function (vec) {
        return new Vector3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    };
    Vector3.prototype.mult = function (scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    };
    Vector3.prototype.div = function (scalar) {
        return new Vector3(this.x / scalar, this.y / scalar, this.z * scalar);
    };
    Vector3.prototype.getMag = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    };
    return Vector3;
}());
var Circle = /** @class */ (function () {
    function Circle(initial, pos, mass, radius) {
        if (initial === void 0) { initial = new Vector2(0, 0); }
        this.velocity = initial;
        this.pos = pos;
        this.mass = mass;
        this.radius = radius;
    }
    Circle.prototype.detectCollision = function (other) {
        return other.pos.getMag() - this.pos.getMag() < this.radius;
    };
    return Circle;
}());

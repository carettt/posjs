var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
    Vector2.prototype.dot = function (other) {
        return this.x * other.x + (this.y - other.y);
    };
    Vector2.prototype.mult = function (scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    };
    Vector2.prototype.div = function (scalar) {
        return new Vector2(this.x / scalar, this.y / scalar);
    };
    Vector2.prototype.limitMag = function (max) {
        if (this.getMag() > max) {
            this.x = max * Math.cos(this.getDirection());
            this.y = max * Math.sin(this.getDirection());
        }
    };
    Vector2.prototype.limitComponents = function (maxX, maxY) {
        this.x = this.x > maxX ? maxX : this.x;
        this.y = this.y > maxY ? maxY : this.y;
    };
    Vector2.prototype.norm = function () {
        if (this.getMag() !== 0) {
            return this.mult(1 / this.getMag());
        }
    };
    Vector2.prototype.reflect = function (normal) {
        normal = normal.norm();
        return this.sub(normal.mult(2 * this.dot(normal)));
    };
    Vector2.prototype.lerp = function (other, amt) {
        return new Vector2((1 - amt) * this.x + amt * other.x, (1 - amt) * this.y + amt * other.y);
    };
    Vector2.prototype.getMag = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };
    Vector2.prototype.setMag = function (scalar) {
        return this.norm().mult(scalar);
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
    Vector3.prototype.norm = function () {
        if (this.getMag() !== 0) {
            return this.mult(1 / this.getMag());
        }
    };
    Vector3.prototype.lerp = function (other, amt) {
        return new Vector3(amt * (other.x - this.x) + this.x, amt * (other.y - this.y) + this.y, amt * (other.z - this.z) + this.z);
    };
    Vector3.prototype.div = function (scalar) {
        return new Vector3(this.x / scalar, this.y / scalar, this.z * scalar);
    };
    Vector3.prototype.getMag = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    };
    Vector3.prototype.setMag = function (scalar) {
        return this.norm().mult(scalar);
    };
    return Vector3;
}());
//Environment class to contain all shapes in project for collisions and other queries.
var Environment2D = /** @class */ (function () {
    function Environment2D(collideOnEdge, canvasSize) {
        if (canvasSize === void 0) { canvasSize = null; }
        this.objects = [];
        this.collideOnEdge = collideOnEdge;
        this.canvasSize = canvasSize;
    }
    Environment2D.prototype.addCircle = function (pos, mass, radius, initial, maxSpeed) {
        if (initial === void 0) { initial = new Vector2(0, 0); }
        if (maxSpeed === void 0) { maxSpeed = null; }
        var newCircle = new Circle(initial, maxSpeed, pos, mass, radius, this.objects.length);
        this.objects.push(newCircle);
        return newCircle;
    };
    Environment2D.prototype.remove = function (index) {
        try {
            this.objects.splice(index, 1);
            return true;
        }
        catch (err) {
            return false;
        }
    };
    Environment2D.prototype.getShape = function (index) {
        return this.objects[index];
    };
    Environment2D.prototype.update = function () {
        var _this = this;
        var collidedObjects = [];
        var _loop_1 = function (i) {
            //detect and react to collisions for every other object (may optimize in the future)
            var otherObjects = __spreadArray([], this_1.objects, true);
            otherObjects.splice(i, 1);
            otherObjects.forEach(function (shape) {
                if (shape instanceof Circle) {
                    shape.detectCollisionWithCircle(_this.objects[i]);
                }
            });
            if (this_1.collideOnEdge) {
                this_1.objects[i].detectCollisionWithEdge(this_1.canvasSize);
            }
            this_1.objects[i].update();
        };
        var this_1 = this;
        for (var i = 0; i < this.objects.length; i++) {
            _loop_1(i);
        }
    };
    return Environment2D;
}());
var Circle = /** @class */ (function () {
    function Circle(initial, maxSpeed, pos, mass, radius, index) {
        if (initial === void 0) { initial = new Vector2(0, 0); }
        this.velocity = new Vector2(0, 0);
        this.maxSpeed = maxSpeed;
        this.acceleration = new Vector2(0, 0);
        this.pos = pos;
        this.mass = mass;
        this.radius = radius;
        this.index = index;
        this.impulse(initial);
    }
    Circle.prototype.impulse = function (impulse) {
        if (impulse === void 0) { impulse = new Vector2(0, 0); }
        this.velocity = this.velocity.add(impulse);
        if (this.maxSpeed !== null) {
            this.velocity.limitMag(this.maxSpeed);
        }
        this.pos = this.pos.add(this.velocity);
    };
    Circle.prototype.detectCollisionWithCircle = function (other) {
        if (other.pos.sub(this.pos).getMag() <= this.radius) {
            //Correct overlap
            this.pos = this.pos.sub(other.pos.sub(this.pos));
            other.pos = other.pos.sub(this.pos.sub(other.pos));
            //Collide with other circle
            var initialVelocity = this.velocity;
            this.velocity = other.velocity
                .mult(this.mass)
                .sub(this.velocity.mult(other.mass))
                .add(other.velocity.mult(other.mass * 2))
                .div(this.mass + other.mass);
            other.velocity = initialVelocity
                .add(this.velocity)
                .sub(other.velocity);
            this.impulse();
            other.impulse();
            return true;
        }
    };
    Circle.prototype.detectCollisionWithEdge = function (canvasSize) {
        if (this.pos.x < this.radius ||
            this.pos.x > canvasSize.x - this.radius) {
            //reflect velocity about a normal (this.pos.x, 1)
            this.velocity = this.velocity.reflect(new Vector2(this.pos.x, 1));
        }
        else if (this.pos.y < this.radius ||
            this.pos.y > canvasSize.y - this.radius) {
            //reflect velocity about a normal (1, this.pos.y)
            this.velocity = this.velocity.reflect(new Vector2(1, this.pos.y));
        }
        this.pos.limitComponents(canvasSize.x - this.radius, canvasSize.y - this.radius);
    };
    Object.defineProperty(Circle.prototype, "getIndex", {
        get: function () {
            return this.index;
        },
        enumerable: false,
        configurable: true
    });
    Circle.prototype.respond = function (other) {
        if (other === this) {
        }
    };
    Circle.prototype.update = function () {
        this.impulse();
        this.velocity = this.velocity.lerp(new Vector2(0, 0), 0.1);
    };
    return Circle;
}());

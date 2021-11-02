//declare class interfaces
interface Vector2 {
    x: number;
    y: number;
}

interface Vector3 {
    x: number;
    y: number;
    z: number;
}

interface Circle {
    velocity: Vector2;
    pos: Vector2;
    mass: number;
    radius: number;
}

type Shape = Circle;

//Simple Vector2 class that has vector addition, subtraction, scalar multiplication, and division. It also includes magnitude and direction functions.
class Vector2 {
    x: number;
    y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vec: Vector2): Vector2 {
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }

    sub(vec: Vector2): Vector2 {
        return new Vector2(this.x - vec.x, this.y - vec.y);
    }

    mult(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    div(scalar: number): Vector2 {
        return new Vector2(this.x / scalar, this.y / scalar);
    }

    getMag() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    getDirection() {
        return Math.atan(this.y / this.x);
    }
}

//simple Vector3 class that has vector addition, subtraction, scalar multiplication, and division. It also includes a magnitude function.
class Vector3 {
    x: number;
    y: number;
    z: number;

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(vec: Vector3): Vector3 {
        return new Vector3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    }

    sub(vec: Vector3): Vector3 {
        return new Vector3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    }

    mult(scalar: number): Vector3 {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    div(scalar: number): Vector3 {
        return new Vector3(this.x / scalar, this.y / scalar, this.z * scalar);
    }

    getMag() {
        return Math.sqrt(
            Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
        );
    }
}

//circle collision class
class Circle {
    velocity: Vector2;
    pos: Vector2;
    mass: number;
    radius: number;

    constructor(
        initial: Vector2 = new Vector2(0, 0),
        pos: Vector2,
        mass: number,
        radius: number
    ) {
        this.velocity = initial;
        this.pos = pos;
        this.mass = mass;
        this.radius = radius;
    }

    detectCollision(other: Circle): boolean {
        return other.pos.getMag() - this.pos.getMag() < this.radius;
    }
}

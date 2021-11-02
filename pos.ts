//declare class interfaces
// interface Vector2D {
//     x: number;
//     y: number;
// }

// interface Vector3D {
//     x: number;
//     y: number;
//     z: number;
// }

// interface CircleShape {
//     velocity: Vector2D;
//     pos: Vector2D;
//     mass: number;
//     radius: number;
// }

type Shape = typeof Circle;

//Simple Vector2 class that has vector addition, subtraction, scalar multiplication, and division. It also includes magnitude and direction functions.
class Vector2 {
    x: number;
    y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vec: typeof Vector2): typeof Vector2 {
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }

    sub(vec: typeof Vector2): typeof Vector2 {
        return new Vector2(this.x - vec.x, this.y - vec.y);
    }

    mult(scalar: number): typeof Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    div(scalar: number): typeof Vector2 {
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

    add(vec: typeof Vector3): typeof Vector3 {
        return new Vector3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    }

    sub(vec: typeof Vector3): typeof Vector3 {
        return new Vector3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    }

    mult(scalar: number): typeof Vector3 {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    div(scalar: number): typeof Vector3 {
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
    velocity: typeof Vector2;
    pos: typeof Vector2;
    mass: number;
    radius: number;

    constructor(
        initial: typeof Vector2 = new Vector2(0, 0),
        pos: typeof Vector2,
        mass: number,
        radius: number
    ) {
        this.velocity = initial;
        this.pos = pos;
        this.mass = mass;
        this.radius = radius;
    }

    detectCollision(other: typeof Circle): boolean {
        return other.pos.getMag() - this.pos.getMag() < this.radius;
    }
}

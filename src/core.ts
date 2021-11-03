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

//Environment class to contain all shapes in project for collisions and other queries.
class Environment2D {
    objects: Array<Shape2D>;

    constructor() {
        this.objects = [];
    }

    add(shape: Shape2D): void {
        this.objects.push(shape);
    }

    remove(index: number): boolean {
        try {
            this.objects.splice(index, 1);
            return true;
        } catch (err) {
            return false;
        }
    }

    update() {}
}

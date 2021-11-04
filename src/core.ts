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

    limit(max: number): void {
        if (this.getMag() > max) {
            this.x = max * Math.cos(this.getDirection());
            this.y = max * Math.sin(this.getDirection());
        }
    }

    lerp(other: Vector2, amt: number) {
        return new Vector2(
            amt * (other.x - this.x) + this.x,
            amt * (other.y - this.y) + this.y
        );
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

    public add(vec: Vector3): Vector3 {
        return new Vector3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    }

    public sub(vec: Vector3): Vector3 {
        return new Vector3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    }

    public mult(scalar: number): Vector3 {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    public div(scalar: number): Vector3 {
        return new Vector3(this.x / scalar, this.y / scalar, this.z * scalar);
    }

    public getMag() {
        return Math.sqrt(
            Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
        );
    }
}

//Environment class to contain all shapes in project for collisions and other queries.
class Environment2D {
    objects: Array<Shape2D>;
    collideOnEdge: boolean;

    constructor(collideOnEdge: boolean) {
        this.objects = [];
    }

    public addCircle(
        initial: Vector2 = new Vector2(0, 0),
        maxSpeed: number = null,
        pos: Vector2,
        mass: number,
        radius: number
    ): void {
        this.objects.push(
            new Circle(
                initial,
                maxSpeed,
                pos,
                mass,
                radius,
                this.objects.length
            )
        );
    }

    public remove(index: number): boolean {
        try {
            this.objects.splice(index, 1);
            return true;
        } catch (err) {
            return false;
        }
    }

    public getShape(index: number): Shape2D {
        return this.objects[index];
    }

    public update() {
        for (let i = 0; i < this.objects.length; i++) {
            //detect and react to collisions for every other object (may optimize in the future)
            let otherObjects = [...this.objects];
            otherObjects.splice(i, 1);

            otherObjects.forEach((shape: Shape2D) => {
                if (shape.detectCollision(this.objects[i]) != null) {
                    shape.respond(this.objects[i].velocity);
                }
            });

            this.objects[i].update();
        }
    }
}

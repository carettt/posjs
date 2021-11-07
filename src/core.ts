//Simple Vector2 class that has vector addition, subtraction, scalar multiplication, and division. It also includes magnitude and direction functions.
class Vector2 {
    x: number;
    y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    public add(vec: Vector2): Vector2 {
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }

    public sub(vec: Vector2): Vector2 {
        return new Vector2(this.x - vec.x, this.y - vec.y);
    }

    public dot(other: Vector2): number {
        return this.x * other.x + (this.y - other.y);
    }

    public mult(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    public div(scalar: number): Vector2 {
        return new Vector2(this.x / scalar, this.y / scalar);
    }

    public limitMag(max: number): void {
        if (this.getMag() > max) {
            this.x = max * Math.cos(this.getDirection());
            this.y = max * Math.sin(this.getDirection());
        }
    }

    public limitComponents(maxX: number, maxY: number): void {
        this.x = this.x > maxX ? maxX : this.x;
        this.y = this.y > maxY ? maxY : this.y;
    }

    public norm(): Vector2 {
        if (this.getMag() !== 0) {
            return this.mult(1 / this.getMag());
        }
    }

    public reflect(normal: Vector2): Vector2 {
        normal = normal.norm();
        return this.sub(normal.mult(2 * this.dot(normal)));
    }

    public lerp(other: Vector2, amt: number): Vector2 {
        return new Vector2(
            (1 - amt) * this.x + amt * other.x,
            (1 - amt) * this.y + amt * other.y
        );
    }

    public getMag(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    public setMag(scalar: number): Vector2 {
        return this.norm().mult(scalar);
    }

    public getDirection(): number {
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

    public norm(): Vector3 {
        if (this.getMag() !== 0) {
            return this.mult(1 / this.getMag());
        }
    }

    lerp(other: Vector3, amt: number): Vector3 {
        return new Vector3(
            amt * (other.x - this.x) + this.x,
            amt * (other.y - this.y) + this.y,
            amt * (other.z - this.z) + this.z
        );
    }

    public div(scalar: number): Vector3 {
        return new Vector3(this.x / scalar, this.y / scalar, this.z * scalar);
    }

    public getMag() {
        return Math.sqrt(
            Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
        );
    }

    public setMag(scalar: number): Vector3 {
        return this.norm().mult(scalar);
    }
}

//Environment class to contain all shapes in project for collisions and other queries.
class Environment2D {
    objects: Array<Shape2D>;
    collideOnEdge: boolean;
    canvasSize: Vector2;
    frameRate: number;
    lastUpdate: number;
    timeNow: number;
    delta: number;

    constructor(collideOnEdge: boolean, canvasSize: Vector2 = null) {
        this.objects = [];
        this.collideOnEdge = collideOnEdge;
        this.canvasSize = canvasSize;
        this.timeNow = Date.now();
        this.lastUpdate = Date.now();
        this.delta = 0;
    }

    public addCircle(
        pos: Vector2,
        mass: number,
        radius: number,
        initial: Vector2 = new Vector2(0, 0),
        maxSpeed: number = null
    ): Circle {
        let newCircle = new Circle(
            maxSpeed,
            pos,
            mass,
            radius,
            this.objects.length,
            this.delta,
            initial
        );

        this.objects.push(newCircle);

        return newCircle;
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
        this.timeNow = Date.now();
        this.delta = (this.timeNow - this.lastUpdate) / 1000;
        this.lastUpdate = this.timeNow;

        let collidedObjects = [];
        for (let i = 0; i < this.objects.length; i++) {
            //detect and react to collisions for every other object (may optimize in the future)
            let otherObjects = [...this.objects];
            otherObjects.splice(i, 1);

            otherObjects.forEach((shape: Shape2D) => {
                if (shape instanceof Circle) {
                    shape.detectCollisionWithCircle(this.objects[i]);
                }
            });
            if (this.collideOnEdge) {
                this.objects[i].detectCollisionWithEdge(this.canvasSize);
            }
            this.objects[i].update(this.delta);
        }
    }
}

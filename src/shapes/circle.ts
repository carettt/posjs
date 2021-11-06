class Circle {
    velocity: Vector2;
    acceleration: Vector2;
    maxSpeed: number;
    pos: Vector2;
    mass: number;
    radius: number;
    index: number;

    constructor(
        initial: Vector2 = new Vector2(0, 0),
        maxSpeed: number,
        pos: Vector2,
        mass: number,
        radius: number,
        index: number
    ) {
        this.velocity = new Vector2(0, 0);
        this.maxSpeed = maxSpeed;
        this.acceleration = new Vector2(0, 0);
        this.pos = pos;
        this.mass = mass;
        this.radius = radius;
        this.index = index;

        this.impulse(initial);
    }

    public impulse(impulse: Vector2 = new Vector2(0, 0)): void {
        this.velocity = this.velocity.add(impulse);
        if (this.maxSpeed !== null) {
            this.velocity.limitMag(this.maxSpeed);
        }
        this.pos = this.pos.add(this.velocity);
    }

    public detectCollisionWithCircle(other: Shape2D): boolean {
        if (other.pos.sub(this.pos).getMag() <= this.radius) {
            //Correct overlap
            this.pos = this.pos.sub(other.pos.sub(this.pos));
            other.pos = other.pos.sub(this.pos.sub(other.pos));

            //Collide with other circle
            let initialVelocity = this.velocity;

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
    }

    public detectCollisionWithEdge(canvasSize: Vector2): void {
        if (
            this.pos.x < this.radius ||
            this.pos.x > canvasSize.x - this.radius
        ) {
            //reflect velocity about a normal (this.pos.x, 1)
            this.velocity = this.velocity.reflect(new Vector2(this.pos.x, 1));
        } else if (
            this.pos.y < this.radius ||
            this.pos.y > canvasSize.y - this.radius
        ) {
            //reflect velocity about a normal (1, this.pos.y)
            this.velocity = this.velocity.reflect(new Vector2(1, this.pos.y));
        }
        this.pos.limitComponents(
            canvasSize.x - this.radius,
            canvasSize.y - this.radius
        );
    }

    public get getIndex(): number {
        return this.index;
    }

    public respond(other: Shape2D) {
        if (other === this) {
        }
    }

    public update() {
        this.impulse();
        this.velocity = this.velocity.lerp(new Vector2(0, 0), 0.1);
    }
}

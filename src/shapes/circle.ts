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
        this.velocity = initial;
        this.maxSpeed = maxSpeed;
        this.acceleration = new Vector2(0, 0);
        this.pos = pos;
        this.mass = mass;
        this.radius = radius;
        this.index = index;
    }

    public impulse(impulse: Vector2 = new Vector2(0, 0)): void {
        this.velocity = this.velocity.add(impulse);
        if (this.maxSpeed != null) {
            this.velocity.limit(this.maxSpeed);
        }
        this.velocity = this.velocity.lerp(new Vector2(0, 0), 0.01);
        this.pos = this.pos.add(this.velocity);
    }

    public detectCollision(other: Shape2D): number {
        return other.pos.getMag() - this.pos.getMag() < this.radius
            ? other.getIndex
            : null;
    }

    public get getIndex(): number {
        return this.index;
    }

    public respond(velocity: Vector2) {}

    public update() {}
}

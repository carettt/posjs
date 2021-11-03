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

    detectCollision(other: Shape2D): boolean {
        return other.pos.getMag() - this.pos.getMag() < this.radius;
    }
}

class Player extends Rectangle
{

    can_fall = true;

    constructor(x, y, width, height, color, gravity, speed, jump_force)
    {
        super(x, y, width, height, color);

        this.gravity = gravity;
        this.speed = speed;
        this.jump_force = jump_force;

        this.velocity = {x: 0, y: 0};
    }

    render(canvas_context)
    {
        super.render(canvas_context);

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.velocity.y += this.gravity;
    }

    //-1 for left, and +1 for right
    startMove(direction)
    {
        this.velocity.x += direction * this.speed;
    }

    stopMove()
    {
        this.velocity.x = 0;
    }

    //when player falls on platform, between them should be no gap
    stop(new_y)
    {
        this.velocity.y = 0;
        this.y = new_y;
    }

    jump()
    {
        if(this.velocity.y == 0)
        {
            this.velocity.y -= this.jump_force;
        }
    }
}
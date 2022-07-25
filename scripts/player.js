class Player extends Rectangle
{
    paralax_scroll = 0;
    can_fall = true;

    constructor(x, y, width, height, color, gravity, speed, jump_force, paralax_borders, engine)
    {
        super(x, y, width, height, color);

        this.gravity = gravity;
        this.speed = speed;
        this.jump_force = jump_force;
        this.paralax_borders = paralax_borders;
        this.engine = engine;

        this.velocity = {x: 0, y: 0};
    }

    render(canvas_context)
    {
        super.render(canvas_context);

        if(this.x + this.velocity.x > 0)
        {
            if(this.x + this.velocity.x >= this.paralax_borders[1])
            {
                this.paralax_scroll += Math.abs(this.velocity.x);
                this.engine.paralaxMoveX(-1 * Math.abs(this.velocity.x));
            }
            else if(this.x + this.velocity.x <= this.paralax_borders[0] && this.paralax_scroll - Math.abs(this.velocity.x) >= 0)
            {
                this.paralax_scroll -= Math.abs(this.velocity.x);
                this.engine.paralaxMoveX(Math.abs(this.velocity.x));
            }
            else
            {
                this.x += this.velocity.x;
            }
        }
        
        this.y += this.velocity.y;

        this.velocity.y += this.gravity;
        //console.log('Scroll: ', this.paralax_scroll);
    }

    //-1 for left, and +1 for right
    startMove(direction)
    {
        this.velocity.x = direction * this.speed;
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
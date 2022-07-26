class Enemy extends Rectangle
{
    paralax_force = 1;
    direction = 1;
    
    constructor(x, y, width, height, color, speed, moving_borders)
    {
        super(x, y, width, height, color);

        this.speed = speed;
        this.moving_borders = moving_borders;
    }

    render(canvas_context)
    {
        super.render(canvas_context);

        this.x += this.direction * this.speed;

        if(this.x + this.width - this.paralax_scroll >= this.moving_borders[1] && this.direction == 1) this.direction = -1;
        else if(this.x - this.paralax_scroll <= this.moving_borders[0] && this.direction == -1) this.direction = 1;

    }
}
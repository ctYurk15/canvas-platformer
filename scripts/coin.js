class Coin extends Rectangle
{
    paralax_force = 1;

    constructor(x, y, width, height, sprite)
    {
        super(x, y, width, height, 'yellow');

        this.sprite = sprite;
        this.sprite.startAnimation();
    }

    draw(canvas_context)
    {
        this.sprite.draw(canvas_context, this.x, this.y, this.width, this.height);
    }

    onDelete(event_name)
    {
        if(event_name == 'clearScene')
        {
            this.sprite.stopAnimation();
        }
    }
}
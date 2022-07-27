class Platform extends Rectangle
{
    paralax_force = 1;
    
    constructor(x, y, width, height, sprite)
    {
        super(x, y, width, height, 'gray');

        this.sprite = sprite;
    }

    draw(canvas_context)
    {
        this.sprite.draw(canvas_context, this.x, this.y, this.width, this.height);
    }
}
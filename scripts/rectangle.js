class Rectangle extends GameObject
{
    constructor(x, y, width, height, color)
    {
        super(x, y);
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(canvas_context)
    {
        canvas_context.rect(this.x, this.y, this.width, this.height);
        canvas_context.fillStyle = this.color;
    }
}
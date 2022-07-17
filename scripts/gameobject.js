class GameObject
{
    id = null;

    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    draw(canvas_context)
    {
        // ...
    }

    render(canvas_context)
    {
        canvas_context.beginPath();
        this.draw(canvas_context);
        canvas_context.fill();
    }
}
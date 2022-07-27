class Sprite
{
    current_frame = 0;
    animation_interval = null;

    constructor(image, frames, frame_time, crop_width, crop_height)
    {
        this.image = image;
        this.frames = frames;
        this.frame_time = frame_time;
        this.crop_width = crop_width;
        this.crop_height = crop_height;

        if(this.frames > 1)
        {
            this.startAnimation();
        }
    }

    draw(canvas_context, x, y, width, height)
    {
        canvas_context.drawImage(this.image, this.crop_width*this.current_frame, 0, this.crop_width,  this.crop_height, x, y, width, height);
    }

    stopAnimation()
    {
        if(this.animation_interval != null) clearInterval(this.animation_interval);
    }

    startAnimation()
    {
        const self = this;

        self.animation_interval = setInterval(function(){
            self.current_frame++;
            if(self.current_frame > self.frames) self.current_frame = 0;
            console.log(1);
        }, self.frame_time);
    }
}
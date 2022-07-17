class Engine
{
    game_objects = [];
    keys = {};
    button_actions = [];
    frame_actions = [];
    is_working = false;

    constructor(canvas, background_color)
    {
        this.canvas = canvas;
        this.background_color = background_color;
        this.context = canvas.getContext('2d');

        this.registerEvents();
    }

    registerEvents()
    {
        this.checkButtonsPress();
    }

    start()
    {
        this.is_working = true;
        this.registerEvents();
    }

    stop()
    {
        this.is_working = false;
    }

    addButtonPressEvent(button, action)
    {
        this.button_actions.push({key: button, action: action});
    }

    addFrameAction(action)
    {
        this.frame_actions.push(action);
    }

    render()
    {
        if(this.is_working)
        {
            this.clear();

            const context = this.context;

            this.game_objects.forEach(function(game_object){
                game_object.render(context);
            });

            this.frame_actions.forEach(function(frame_action){
                frame_action();
            });
        }
    }

    clear()
    {
        this.context.fillStyle = this.background_color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    addObject(game_object)
    {
        game_object.id = this.game_objects.length;
        this.game_objects.push(game_object);
        return game_object.id;
    }

    deleteObject(object_index)
    {
        this.game_objects = this.game_objects.filter(function(game_object){
            return game_object.id != object_index
        });
    }

    checkButtonsPress()
    {
        const self = this;

        if(this.is_working)
        {
            window.addEventListener('keydown', (e) => {
            
                self.keys[e.key] = true;
                
                self.button_actions.forEach(function(button_action){
                    
                    if(self.keys[button_action.key])
                    {
                        button_action.action();
                    }
    
                });
            });
    
            window.addEventListener('keyup', (e) => {
                self.keys[e.key] = false;
    
            });
        }
    }

}
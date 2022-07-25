let player = null;
let platforms = [];

function start(engine, platforms_map)
{
    player = null;
    platforms = [];

    platforms_map.forEach(platform => {
        platforms.push(new Platform(platform.x, platform.y, platform.width, platform.height, platform.color));
    });

    platforms.forEach(platform => {
        engine.addObject(platform);
    });

    player = new Player(120, 90, 50, 100, 'red', 5, 10, 65, [100, 500], engine);
    engine.addObject(player);
    
    engine.start();
}

const canvas = document.querySelector('canvas');
const win_model = document.querySelector('.win-container');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const win_distance = 2600;
const death_interval = 450;

const engine = new Engine(canvas, 'white');

//creating gamemap
const platforms_map = [
    new Platform(0, canvas.height-20, 250, 20, 'green'),
    new Platform(300, canvas.height-100, 400, 20, 'green'),
    new Platform(850, canvas.height-100, 175, 20, 'green'),
    new Platform(1100, canvas.height-200, 250, 20, 'green'),
    new Platform(1500, canvas.height-300, 230, 20, 'green'),
    new Platform(1900, canvas.height-375, 175, 20, 'green'),
    new Platform(2350, canvas.height-50, 200, 20, 'green'),
    new Platform(2750, canvas.height-100, 400, 20, 'green'),
];

//adding collision checks
engine.addFrameAction(function(){
    let player_can_fall = true;
    let new_player_y = player.y;

    for(let platform of platforms)
    {
        if(player.y + player.height <= platform.y
            && player.y + player.height + player.velocity.y >= platform.y
            && player.x + player.width >= platform.x
            && player.x <= platform.x + platform.width)
        {
            player_can_fall = false;
            new_player_y = platform.y - player.height;
            break;

        }
    }

    if(!player_can_fall) player.stop(new_player_y);
});

//check for winning
engine.addFrameAction(function(){
    if(player.paralax_scroll >= win_distance)
    {
        engine.stop();
        win_model.classList.remove('hidden');
    }
});

//check for loosing
engine.addFrameAction(function(){
    if(player.y - 2 * player.width >= canvas.height)
    {
        engine.stop();

        setTimeout(function(){
            engine.clearObjects();
            start(engine, platforms_map);
        }, death_interval);
    }
});

//adding controls
engine.addButtonPressEvent('KeyA', function() {  player.startMove(-1); });
engine.addButtonReleaseEvent('KeyA', function(){ player.stopMove(); });

engine.addButtonPressEvent('KeyD', function(){  player.startMove(1); });
engine.addButtonReleaseEvent('KeyD', function(){ player.stopMove(); });

engine.addButtonPressEvent('KeyW', function(){  player.jump(); });

start(engine, platforms_map);

//engine.start();
let animation_frame;
function loop()
{
    animation_frame = requestAnimationFrame(loop);
    engine.render();
}

loop();
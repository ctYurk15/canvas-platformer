let player = null;
let platforms = [];
let coins = [];
let coins_collected = 0;

function start(engine, level_map)
{
    //reset values
    player = null;
    platforms = [];
    coins = [];
    coins_collected = 0;

    //reset ui
    coins_container.innerHTML = 'Coins: 0';

    //rebuild level
    level_map.platforms.forEach(platform => {
        platforms.push(new Platform(platform.x, platform.y, platform.width, platform.height, platform.color));
        engine.addObject(platforms[platforms.length-1]);
    });

    level_map.coins.forEach(coin => {
        coins.push(new Coin(coin.x, coin.y, coin.width, coin.height, coin.color));
        engine.addObject(coins[coins.length-1]);
    });

    //respawn player
    player = new Player(120, 120, 50, 100, 'red', 5, 10, 65, [100, 500], engine);
    engine.addObject(player);
    
    engine.start();
}

const canvas = document.querySelector('canvas');
const win_model = document.querySelector('.win-container');
const coins_container = document.querySelector('#coinsContainer');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const win_distance = 2600;
const death_interval = 450;

const engine = new Engine(canvas, 'white');

//creating gamemap
const levels_map = [
    {
        coins: 
        [
            new Coin(475, canvas.height-150, 50, 50, 'yellow'),
            new Coin(1590, canvas.height-350, 50, 50, 'yellow'),
            new Coin(1962.5, canvas.height-425, 50, 50, 'yellow'),
        ],
        platforms: [
            new Platform(0, canvas.height-20, 250, 20, 'green'),
            new Platform(300, canvas.height-100, 400, 20, 'green'),
            new Platform(850, canvas.height-100, 175, 20, 'green'),
            new Platform(1100, canvas.height-200, 250, 20, 'green'),
            new Platform(1500, canvas.height-300, 230, 20, 'green'),
            new Platform(1900, canvas.height-375, 175, 20, 'green'),
            new Platform(2350, canvas.height-50, 200, 20, 'green'),
            new Platform(2750, canvas.height-100, 400, 20, 'green'),
        ]
    }
];

//adding platforms collision checks
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

//adding coins collisions check
engine.addFrameAction(function(){
    
    let collected_coin_id = null;

    for(let coin of coins)
    {
        if(player.x + player.width >= coin.x 
            && player.x + player.width <= coin.x + coin.width
            && player.y + player.height >= coin.y
            && player.y + player.height <= coin.y + coin.height)
        {
            coins_collected++;
            coins_container.innerHTML = 'Coins: '+coins_collected;
            collected_coin_id = coin.id;
            engine.deleteObject(coin.id);
            break;
        }
    }

    if(collected_coin_id != null) coins = coins.filter(function(coin){ return coin.id != collected_coin_id });

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
            start(engine, levels_map[0]);
        }, death_interval);
    }
});

//adding controls
engine.addButtonPressEvent('KeyA', function() {  player.startMove(-1); });
engine.addButtonReleaseEvent('KeyA', function(){ player.stopMove(); });

engine.addButtonPressEvent('KeyD', function(){  player.startMove(1); });
engine.addButtonReleaseEvent('KeyD', function(){ player.stopMove(); });

engine.addButtonPressEvent('KeyW', function(){  player.jump(); });

start(engine, levels_map[0]);

//engine.start();
let animation_frame;
function loop()
{
    animation_frame = requestAnimationFrame(loop);
    engine.render();
}

loop();
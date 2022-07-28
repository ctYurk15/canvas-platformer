//game config
const win_distance = 2700;
const death_interval = 450;

//current state
let player = null;
let platforms = [];
let coins = [];
let enemies = [];
let coins_collected = 0;

function die()
{
    engine.stop();

    setTimeout(function(){
        engine.clearObjects();
        start(engine, levels_map[0]);
    }, death_interval);
}

function start(engine, level_map)
{
    //reset values
    player = null;
    platforms = [];
    coins = [];
    enemies = [];
    coins_collected = 0;

    //reset ui
    coins_container.innerHTML = 'Coins: 0';

    //rebuild level
    level_map.platforms.forEach(platform => {
        platforms.push(new Platform(platform.x, platform.y, platform.width, platform.height, platform.sprite));
        engine.addObject(platforms[platforms.length-1]);
    });

    level_map.coins.forEach(coin => {
        coins.push(new Coin(coin.x, coin.y, coin.width, coin.height, coin.sprite));
        engine.addObject(coins[coins.length-1]);
    });

    level_map.enemies.forEach(enemy => {
        enemies.push(new Enemy(enemy.x, enemy.y, enemy.width, enemy.height, enemy.sprites, enemy.speed, enemy.moving_borders));
        engine.addObject(enemies[enemies.length-1]);
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

//textures
const player_run_img = document.querySelector('#player_run');
const coin_texture = document.querySelector('#coin1');

const small_platform1_texture = document.querySelector('#small-platform1');
const medium_platform1_texture = document.querySelector('#medium-platform1');
const big_platform1_texture = document.querySelector('#big-platform1');
const small_platform2_texture = document.querySelector('#small-platform2');
const medium_platform2_texture = document.querySelector('#medium-platform2');
const big_platform2_texture = document.querySelector('#big-platform2');

const skeleton_walkR_texture = document.querySelector('#skeleton-walkR');
const skeleton_walkL_texture = document.querySelector('#skeleton-walkL');

const coin_sprite = new Sprite(coin_texture, 10, 150, 16, 16);

const small_platform1_sprite = new Sprite(small_platform1_texture, 0, 0, 72, 24);
const medium_platform1_sprite = new Sprite(medium_platform1_texture, 0, 0, 144, 24);
const big_platform1_sprite = new Sprite(big_platform1_texture, 0, 0, 288, 24);
const small_platform2_sprite = new Sprite(small_platform2_texture, 0, 0, 72, 24);
const medium_platform2_sprite = new Sprite(medium_platform2_texture, 0, 0, 144, 24);
const big_platform2_sprite = new Sprite(big_platform2_texture, 0, 0, 288, 24);

const skeleton_walk_spriteR = new Sprite(skeleton_walkR_texture, 6, 150, 15, 31);
const skeleton_walk_spriteL = new Sprite(skeleton_walkL_texture, 6, 150, 15, 31);

const engine = new Engine(canvas, 'aqua');

//creating gamemap
const levels_map = [
    {
        coins: 
        [
            {x: 475, y: canvas.height-150, width: 50, height: 50, sprite: coin_sprite},
            {x: 1590, y: canvas.height-350, width: 50, height: 50, sprite: coin_sprite},
            {x: 1962.5, y: canvas.height-425, width: 50, height: 50, sprite: coin_sprite},
        ],
        platforms: [
            new Platform(0, canvas.height-48, 288, 48, medium_platform2_sprite),
            new Platform(425, canvas.height-100, 288, 48, medium_platform1_sprite),
            new Platform(850, canvas.height-100, 144, 48, small_platform1_sprite),
            new Platform(1100, canvas.height-200, 288, 48, medium_platform2_sprite),
            new Platform(1500, canvas.height-300, 288, 48, medium_platform1_sprite),
            new Platform(1900, canvas.height-375, 144, 48, small_platform2_sprite),
            new Platform(2350, canvas.height-50, 288, 48, medium_platform1_sprite),
            new Platform(2750, canvas.height-100, 576, 48, big_platform1_sprite),
        ],
        enemies: [
            new Enemy(1200, canvas.height-293, 48, 93, [skeleton_walk_spriteL, skeleton_walk_spriteR], 2, [1100, 1388]),
            new Enemy(2875, canvas.height-193, 48, 93, [skeleton_walk_spriteL, skeleton_walk_spriteR], 2, [2750, 3326]),
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

        if(player.rectangleCollided(coin))
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

//adding enemies collisions check
engine.addFrameAction(function(){
    
    enemies.forEach(enemy => {
        if(player.rectangleCollided(enemy)) die();
    });

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

    if(player.y - 2 * player.width >= canvas.height) die();

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
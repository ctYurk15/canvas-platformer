//game config
const death_interval = 450;

//current state
let player = null;
let platforms = [];
let coins = [];
let enemies = [];
let coins_collected = 0;
let current_level = 0;

function die()
{
    engine.stop();

    setTimeout(function(){
        engine.clearObjects();
        start(engine, levels_map[current_level]);
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
    player = new Player(
        level_map.player.x, 
        level_map.player.y, 
        level_map.player.width, 
        level_map.player.height, 
        level_map.player.sprites, 
        level_map.player.gravity, 
        level_map.player.speed, 
        level_map.player.jump_force, 
        level_map.player.paralax_borders, 
        engine);
    engine.addObject(player);
    
    engine.start();
}

//configuring canvas
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//getting ui-elements
const win_model = document.querySelector('.win-container');
const next_level_btn = document.querySelector('#nextLevelButton');
const coins_container = document.querySelector('#coinsContainer');

const engine = new Engine(canvas, background1_sprite);

//creating gamemap
const levels_map = [
    {
        win_distance: 2700,
        coins: 
        [
            {x: 475, y: canvas.height-150, width: 50, height: 50, sprite: coin_sprite},
            {x: 1590, y: canvas.height-350, width: 50, height: 50, sprite: coin_sprite},
            {x: 1962.5, y: canvas.height-425, width: 50, height: 50, sprite: coin_sprite},
        ],
        platforms: [
            {x: 0, y: canvas.height-48, width: 288, height: 48, sprite: medium_platform2_sprite},
            {x: 425, y: canvas.height-100, width: 288, height: 48, sprite: medium_platform1_sprite},
            {x: 850, y: canvas.height-100, width: 144, height: 48, sprite: small_platform1_sprite},
            {x: 1100, y: canvas.height-200, width: 288, height: 48, sprite: medium_platform2_sprite},
            {x: 1500, y: canvas.height-300, width: 288, height: 48, sprite: medium_platform1_sprite},
            {x: 1900, y: canvas.height-375, width: 144, height: 48, sprite: small_platform2_sprite},
            {x: 2350, y: canvas.height-50, width: 288, height: 48, sprite: medium_platform1_sprite},
            {x: 2750, y: canvas.height-100, width: 576, height: 48, sprite: big_platform1_sprite},
        ],
        enemies: [
            {x: 1200, y: canvas.height-293, width: 48, height: 93, sprites: [skeleton_walkL_sprite, skeleton_walkR_sprite], speed: 2, moving_borders: [1100, 1388]},
            {x: 2875, y: canvas.height-193, width: 48, height: 93, sprites: [skeleton_walkL_sprite, skeleton_walkR_sprite], speed: 2, moving_borders: [2750, 3326]},
        ],
        player: {
            x: 120, 
            y: 200, 
            width: 106, 
            height: 103, 
            sprites: player_spritesheet, 
            gravity: 5, 
            speed: 10, 
            jump_force: 65, 
            paralax_borders: [100, 500], 
            engine: engine
        }
    },
    {
        win_distance: 4000,
        coins: 
        [
            {x: 571, y: canvas.height-250, width: 50, height: 50, sprite: coin_sprite},
            {x: 763, y: canvas.height-250, width: 50, height: 50, sprite: coin_sprite},
            {x: 965, y: canvas.height-250, width: 50, height: 50, sprite: coin_sprite},
            {x: 2247, y: canvas.height-98, width: 50, height: 50, sprite: coin_sprite},
            {x: 2597, y: canvas.height-98, width: 50, height: 50, sprite: coin_sprite},
            {x: 2943, y: canvas.height-98, width: 50, height: 50, sprite: coin_sprite},
            {x: 3293, y: canvas.height-98, width: 50, height: 50, sprite: coin_sprite},
        ],
        platforms: [
            {x: 0, y: canvas.height-120, width: 288, height: 48, sprite: medium_platform1_sprite},
            {x: 500, y: canvas.height-200, width: 576, height: 48, sprite: big_platform2_sprite},
            {x: 1300, y: canvas.height-300, width: 576, height: 48, sprite: big_platform1_sprite},
            {x: 2200, y: canvas.height-48, width: 144, height: 48, sprite: small_platform1_sprite},
            {x: 2550, y: canvas.height-48, width: 144, height: 48, sprite: small_platform1_sprite},
            {x: 2900, y: canvas.height-48, width: 144, height: 48, sprite: small_platform1_sprite},
            {x: 3250, y: canvas.height-48, width: 144, height: 48, sprite: small_platform1_sprite},
            {x: 3600, y: canvas.height-156, width: 288, height: 48, sprite: medium_platform2_sprite},
            {x: 4000, y: canvas.height-250, width: 288, height: 48, sprite: medium_platform2_sprite},
            {x: 4400, y: canvas.height-350, width: 288, height: 48, sprite: medium_platform1_sprite},
        ],
        enemies: [
            {x: 1300, y: canvas.height-393, width: 48, height: 93, sprites: [skeleton_walkL_sprite, skeleton_walkR_sprite], speed: 2, moving_borders: [1300, 1876]},
            {x: 1800, y: canvas.height-393, width: 48, height: 93, sprites: [skeleton_walkL_sprite, skeleton_walkR_sprite], speed: 2, moving_borders: [1300, 1876]},
            {x: 4000, y: canvas.height-343, width: 48, height: 93, sprites: [skeleton_walkL_sprite, skeleton_walkR_sprite], speed: 2, moving_borders: [4000, 4288]},
        ],
        player: {
            x: 120, 
            y: 200, 
            width: 106, 
            height: 103, 
            sprites: player_spritesheet, 
            gravity: 5, 
            speed: 10, 
            jump_force: 65, 
            paralax_borders: [100, 500], 
            engine: engine
        }
    },
    {
        win_distance: 6050,
        coins: 
        [
            {x: 650, y: canvas.height-250, width: 50, height: 50, sprite: coin_sprite},
            {x: 1371, y: canvas.height-250, width: 50, height: 50, sprite: coin_sprite},
            {x: 1467, y: canvas.height-250, width: 50, height: 50, sprite: coin_sprite},
            {x: 2517, y: canvas.height-450, width: 50, height: 50, sprite: coin_sprite},
            {x: 2709, y: canvas.height-450, width: 50, height: 50, sprite: coin_sprite},
            {x: 3943, y: canvas.height-200, width: 50, height: 50, sprite: coin_sprite},
            {x: 5319, y: canvas.height-300, width: 50, height: 50, sprite: coin_sprite},
            {x: 5919, y: canvas.height-325, width: 50, height: 50, sprite: coin_sprite},
        ],
        platforms: [
            {x: 0, y: canvas.height-48, width: 576, height: 48, sprite: big_platform1_sprite},
            {x: 800, y: canvas.height-100, width: 288, height: 48, sprite: medium_platform2_sprite},
            {x: 1300, y: canvas.height-200, width: 288, height: 48, sprite: medium_platform2_sprite},
            {x: 1850, y: canvas.height-300, width: 288, height: 48, sprite: medium_platform1_sprite},
            {x: 2350, y: canvas.height-400, width: 576, height: 48, sprite: big_platform2_sprite},
            {x: 3200, y: canvas.height-48, width: 576, height: 48, sprite: big_platform2_sprite},
            {x: 3900, y: canvas.height-150, width: 144, height: 48, sprite: small_platform1_sprite},
            {x: 4200, y: canvas.height-200, width: 288, height: 48, sprite: medium_platform1_sprite},
            {x: 4700, y: canvas.height-250, width: 288, height: 48, sprite: medium_platform2_sprite},
            {x: 5219, y: canvas.height-250, width: 288, height: 48, sprite: medium_platform1_sprite},
            {x: 5800, y: canvas.height-275, width: 288, height: 48, sprite: medium_platform1_sprite},
            {x: 6400, y: canvas.height-300, width: 288, height: 48, sprite: medium_platform2_sprite},
        ],
        enemies: [
            {x: 800, y: canvas.height-193, width: 48, height: 93, sprites: [skeleton_walkL_sprite, skeleton_walkR_sprite], speed: 2, moving_borders: [800, 1088]},
            {x: 2350, y: canvas.height-493, width: 48, height: 93, sprites: [skeleton_walkL_sprite, skeleton_walkR_sprite], speed: 2, moving_borders: [2350, 2926]},
            {x: 4700, y: canvas.height-343, width: 48, height: 93, sprites: [skeleton_walkL_sprite, skeleton_walkR_sprite], speed: 2, moving_borders: [4700, 4988]},
            {x: 5800, y: canvas.height-368, width: 48, height: 93, sprites: [skeleton_walkL_sprite, skeleton_walkR_sprite], speed: 2, moving_borders: [5800, 6088]},
        ],
        player: {
            x: 120, 
            y: 200, 
            width: 106, 
            height: 103, 
            sprites: player_spritesheet, 
            gravity: 5, 
            speed: 10, 
            jump_force: 65, 
            paralax_borders: [100, 500], 
            engine: engine
        }
    },
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
    if(player.paralax_scroll >= levels_map[current_level].win_distance)
    {
        engine.stop();
        win_model.classList.remove('hidden');

        if(levels_map.length-1 >= current_level+1) next_level_btn.classList.remove('hidden');
        else next_level_btn.classList.add('hidden');
        
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

//binding ui-elements
next_level_btn.addEventListener('click', function(){
    if(levels_map.length-1 >= current_level+1)
    {
        current_level++;
        engine.clearObjects();
        start(engine, levels_map[current_level]);
        win_model.classList.add('hidden')
    }
});

start(engine, levels_map[current_level]);

//game loop
let animation_frame;
function loop()
{
    animation_frame = requestAnimationFrame(loop);
    engine.render();
}

loop();
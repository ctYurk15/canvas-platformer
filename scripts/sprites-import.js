//textures
const coin_texture = document.querySelector('#coin1');

const small_platform1_texture = document.querySelector('#small-platform1');
const medium_platform1_texture = document.querySelector('#medium-platform1');
const big_platform1_texture = document.querySelector('#big-platform1');
const small_platform2_texture = document.querySelector('#small-platform2');
const medium_platform2_texture = document.querySelector('#medium-platform2');
const big_platform2_texture = document.querySelector('#big-platform2');

const player_walkR_texture = document.querySelector('#player-walkR');
const player_walkL_texture = document.querySelector('#player-walkL');
const player_idleR_texture = document.querySelector('#player-IDLER');
const player_idleL_texture = document.querySelector('#player-IDLEL');

const skeleton_walkR_texture = document.querySelector('#skeleton-walkR');
const skeleton_walkL_texture = document.querySelector('#skeleton-walkL');

const background1_texture = document.querySelector('#background1');

//sprites
const coin_sprite = new Sprite(coin_texture, 10, 150, 16, 16);

const small_platform1_sprite = new Sprite(small_platform1_texture, 0, 0, 72, 24);
const medium_platform1_sprite = new Sprite(medium_platform1_texture, 0, 0, 144, 24);
const big_platform1_sprite = new Sprite(big_platform1_texture, 0, 0, 288, 24);
const small_platform2_sprite = new Sprite(small_platform2_texture, 0, 0, 72, 24);
const medium_platform2_sprite = new Sprite(medium_platform2_texture, 0, 0, 144, 24);
const big_platform2_sprite = new Sprite(big_platform2_texture, 0, 0, 288, 24);

const player_walkR_sprite = new Sprite(player_walkR_texture, 6, 150, 58, 55);
const player_walkL_sprite = new Sprite(player_walkL_texture, 6, 150, 58, 55);
const player_idleR_sprite = new Sprite(player_idleR_texture, 8, 150, 31, 54);
const player_idleL_sprite = new Sprite(player_idleL_texture, 8, 150, 31, 54);

const skeleton_walkR_sprite = new Sprite(skeleton_walkR_texture, 6, 150, 15, 31);
const skeleton_walkL_sprite = new Sprite(skeleton_walkL_texture, 6, 150, 15, 31);

const background1_sprite = new Sprite(background1_texture, 0, 0, 320, 180);

const player_spritesheet = {
    right: 
    {
        walk: player_walkR_sprite,
        idle: player_idleR_sprite,
    }, 
    left: 
    {
        walk: player_walkL_sprite,
        idle: player_idleL_sprite,
    }
};
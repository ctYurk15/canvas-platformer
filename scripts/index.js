const canvas = document.querySelector('canvas');
const scoreTables = document.querySelectorAll(".score-text");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new Engine(canvas, 'white');
engine.start();

//engine.start();
let animation_frame;
function loop()
{
    animation_frame = requestAnimationFrame(loop);
    engine.render();
}

loop();
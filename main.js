import Grid from './grid.js';
import * as constants from './constants.js';

window.color = function(r, g, b){
  g = g || r;
  b = b || r;
  return `rgb(${r}, ${g}, ${b})`;
}

const canvas = document.getElementById("screen");
canvas.setAttribute('width', constants.WIDTH);
canvas.setAttribute('height', constants.HEIGHT);
const ctx = canvas.getContext("2d");

let grid = new Grid(10, 10);

function createBoard(){
    ctx.fillStyle = color(210);
    ctx.fillRect(0, 0, constants.WIDTH, constants.HEIGHT);

    grid.draw(ctx);

    // re-draws the grid to display mine / count according to user clicks
    requestAnimationFrame(createBoard);
}

// capture mouse click and redirect it to grid for processing
canvas.onclick = function(event){
    grid.onclick(event.clientX, event.clientY);
}

createBoard();
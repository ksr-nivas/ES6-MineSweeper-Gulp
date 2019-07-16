import Cell from './cell.js'
import * as constants from './constants.js';

export default class Grid {
  constructor(rows, cols) {
    // grid contains rows, columns and cells array, each cell item consists of its position information in the grid.
    this.rows = rows;
    this.cols = cols;
    this.cells = Array(rows).fill().map(() => Array(cols).fill());

    this.resetBoard();
  }

  resetBoard(){
    this.cells.forEach((row, i) => {
      row.forEach((cell, j) => {
        // creates cell
        this.cells[i][j] = new Cell(i, j, constants.WIDTH / this.cols, constants.HEIGHT / this.rows);
      });
    });

    // check neighbours and attach mines count around
    this.getAllCells().forEach(cell => {
      cell.isHidden = true;
      this.countMines(cell)
    });
  }

  getAllCells() {
    let allCells = [];
    this.cells.forEach((row, i) => {
      row.forEach((cell, j) => {
        allCells.push(cell);
      });
    });
    return allCells;
  }

  // count Mines
  countMines(cell) {
    // identify neighbours
    let neighbours = this.getNeighbourCells(cell);

    cell.mineCount = neighbours.filter(c => c.isMine).length;
  }

  getNeighbourCells(cell){
    let neighbours = this.getAllCells().filter(item => {
      return item.row >= cell.row - 1 && //left cell
        item.col >= cell.col - 1 && // top cell
        item.row <= cell.row + 1 && // right cell
        item.col <= cell.col + 1 && // bottom cell
        !(item.row === cell.row && item.col === cell.col); // exclude current selected cell
    });

    return neighbours;
  }

  // draw the grid
  draw(ctx) {
    this.getAllCells().forEach((cell) => {
      cell.draw(ctx);
    });
  }

  // capture the click event and reveal the cell
  onclick(mouseX, mouseY) {
    this.getAllCells().forEach((cell) => {
      if (cell.getCell(mouseX, mouseY)) {
        this.show(cell);
      }
    });
  }

  show(cell){
    // if user clicks on already revelaed cell, just return
    if(!cell.isHidden) return;

    cell.show();

    // if user clicks on mine, that's it. BOOM!!!
    if(cell.isMine){
      setTimeout(() => {
        alert('You Lose Game!!!');
        this.resetBoard();
      }, 500);
      
      return;
    }

    if(cell.mineCount !== 0) return;

    //As a convenience to the player, the game continues to expose adjacent squares until a non-zero square is reached.
    // reveal neighbours
    let neighboursToReveal = this.getNeighbourCells(cell).filter( n => n.isHidden && !n.isMine && n.mineCount === 0);
    neighboursToReveal.forEach(neighbour => this.show(neighbour));
  }
}

const mine = '9';

export default class Cell {
    constructor(row, col, w, h){
      this.row = row;
      this.col = col;
      
      this.padding = 1;
  
      // actual cell width & height excluding right & left padding
      this.width = w - this.padding*2; 
      this.height = h - this.padding*2;
  
      // cell coordinates
      this.x = col * w + this.padding;
      this.y = row * h + this.padding;
  
      // place mines at random cells
      this.isMine = Math.random() < 0.1;

      // by default all the cells are in hidden state. on click of cell, it will displays mine / count
      this.isHidden = true;
  
      // holds the neighbour cells mine count
      this.mineCount = 0;
      this.fontSize = this.width/2;
    }
  
    // returns a particular cell based on mouse click
    getCell(mouseX, mouseY){
      return (mouseX > this.x && mouseX < this.x + this.width &&
              mouseY > this.y && mouseY < this.y + this.height);
    }
  
    // draw the cells
    draw(ctx){
      ctx.fillStyle = color(this.isHidden ? 90 : 200);
      ctx.fillRect(this.x, this.y, this.width, this.height);
  
      if(this.isHidden) return;
  
      // based on the mine-cell we have to display a mine(9) or the count(0/1/2) of mines on the adjacent cells
      if(this.isMine){
        ctx.font = `${this.fontSize}px Arial`;
        ctx.fillStyle = color(255, 1, 1);
        ctx.fillText(mine, this.x + this.width/2, this.y + 2*this.height/3);
      }
      else{
        ctx.font = `${this.fontSize}px Arial`;
        ctx.fillStyle = color(0);
        ctx.fillText(this.mineCount, this.x + this.width/2, this.y + 2*this.height/3);
      }
    }
  
    // flips the cell and shows whether it is a mine(9) or mines count
    show(){
      this.isHidden = false;
    }
  }
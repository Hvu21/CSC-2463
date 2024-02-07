let selectedColor;
let colors;
let dragging = false;

function setup() {
  createCanvas(1000, 1000);
  selectedColor = color('black');

  colors = [
    new colorSquare(0, 0, color('red')),
    new colorSquare(0, 20, color('orange')),
    new colorSquare(0, 40, color('yellow')),
    new colorSquare(0, 60, color('limegreen')),
    new colorSquare(0, 80, color('lightblue')),
    new colorSquare(0, 100, color('blue')),
    new colorSquare(0, 120, color('magenta')),
    new colorSquare(0, 140, color('brown')),
    new colorSquare(0, 160, color('white')),
    new colorSquare(0, 180, color('black'))
  ];
}

function draw() {
  for (let i = 0; i < colors.length; i++) {
    colors[i].draw();
  }
  stroke(selectedColor);
  strokeWeight(4);
  fill(selectedColor);

  if (dragging) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

class colorSquare {
  constructor(x, y, fill) {
    this.x = x;
    this.y = y;
    this.fill = fill;
  }

  draw() {
    stroke(225);
    strokeWeight(1);
    fill(this.fill);
    square(this.x, this.y, 20);
  }

  contains(x, y) {
    let insideX = x >= this.x && x <= this.x + 20;
    let insideY = y >= this.y && y <= this.y + 20;
    return insideX && insideY;
  }
}

function mousePressed() {
  for (let i = 0; i < colors.length; i++) {
    if (colors[i].contains(mouseX, mouseY)) {
      selectedColor = colors[i].fill;
      dragging = false; 
    }
  }
}

function mouseDragged() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    dragging = true;
  }
}

function mouseReleased() {
  dragging = false; 
}


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("white");
  noStroke();
  //Red
  fill(255,0,0,80);
  circle(150,90,100);
  //Green
  fill(0,0,255,80);
  circle(120,150,100);
  //Blue
  fill(0,255,0,80);
  circle(180,150,100);
}
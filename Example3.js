function setup() {
  createCanvas(330, 200);
}

function draw() {
  //PAC MAN
  background("black");
  noStroke();
  fill(255,255,0);
  arc(70, 100, 100, 100, 5/4*PI, 3/4*PI);

  //ghost
  //body
  fill(255,0,0);
  rect(180, 100, 100,50);
  circle(230, 100, 100); 

  fill(255);
  circle(205, 100, 30); //left eye outer
  circle(255, 100, 30); // right eye outer

  fill(0,0,255);
  circle(205, 100, 20); // left eye inner
  circle(255, 100, 20);// right eye inner


}
function setup() {
  createCanvas(200, 200);
}

function draw(){
  background(0,0,120);
  strokeWeight(2)
  stroke("white");
  fill("green");
  circle(100,98,100);
  fill("red")
  beginShape()
  vertex(100,50);//1
  vertex(112,80); //2
  vertex(145,80); //3
  vertex(119,101); //4
  vertex(130,135);//5 /
  vertex(100, 113); //6
  vertex(72,135); //7 /
  vertex(82,101); //8
  vertex(57,80); //9
  vertex(90,80); //10
  
  
  
  endShape(CLOSE);

}
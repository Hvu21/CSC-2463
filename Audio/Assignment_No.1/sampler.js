let a, b, c;
let fx = new Tone.Players({
  Note: "Sounds/Note.wav", //Sound of Guitar String
  Step: "Sounds/Step.mp3", //Sound of anime animal taking a step
  Water: "Sounds/Water.mp3", //Sound of a Water Drop
  Wind: "Sounds/Wind.wav", //Sound of a Japanese Wind Chime
});

let names = ["Note", "Step", "Water", "Wind"];
let b1, b2, b3, b4;
let PingPong = new Tone.PingPongDelay(0, 0.2);

let s1, s2;
fx.connect(PingPong);
PingPong.toDestination();

function preload() {
  a = random(0, 255);
}

function setup() {
  let canvas = createCanvas(400, 400);
  let cp = canvas.position();

  let bspace = 90; //Space btw the Buttons 
  let bx = 16; //Starting Position of the Buttons, Changes on the X Axis
  let by = 60; //The Height of all the Buttons, Changes on the Y Axis

  //Buttons Creation 
  b1 = createButton("Note");
  b1.position(cp.x + bx, cp.y + by);
  b1.mousePressed(() => {
    fx.player("Note").start();
  });

  b2 = createButton("Step");
  b2.position(cp.x + bx + bspace, cp.y + by);
  b2.mousePressed(() => {
    fx.player("Step").start();
  });

  b3 = createButton("Water");
  b3.position(cp.x + bx + bspace * 2, cp.y + by);
  b3.mousePressed(() => {
    fx.player("Water").start();
  });

  b4 = createButton("Wind");
  b4.position(cp.x + bx + bspace * 3, cp.y + by);
  b4.mousePressed(() => {
    fx.player("Wind").start();
  });

  let sx = 100; //Starting Position of the Slider, Changes on the X Axis
  let sy = 115; //Starting Position of the Slider, Changes on the Y Axis
  //Sliders Creation 
  s1 = createSlider(0, 1, 0, 0.05);
  s1.position(cp.x + sx, cp.y + sy+50);
  s1.mouseMoved(() => { 
    PingPong.delayTime.value = s1.value();
  });

  s2 = createSlider(0, 1, 0, 0.05);
  s2.position(cp.x + sx, cp.y + sy+90);
  s2.input(() => {
    PingPong.feedback.value = s2.value();
  });
}

function draw() {
  background(220);
  textSize(14);  
  let tx = 130; //Starting Position of the Sliders Text, Changes on the X Axis
  let ty = 100; //Starting Position of the Sliders Text, Changes on the Y Axis
  let tx2 = 12; //Starting Position of the Footnotes Text, Changes on the X Axis
  let ty2 = 220; //Starting Position of the Footnotes Text, Changes on the Y Axis
  fill("Black");
  text("Click TO PLAY sound.", 10, 30);
  text("Adjust the Sliders for Delay and Feeback Options.", 12, 120);
  text("Delay", tx, ty+62);
  text("Feedback", tx+5, ty+102);
  text("________________________________________________________", 1, ty2+40);
  text("*Note: Guitar String/Note*", tx2, ty2+80);
  text("*Step: Sound of Anime animal taking a step*", tx2, ty2+100);
  text("*Water: Sound of a Water Drop*", tx2, ty2+120)
  text("*Wind: Sound of a Japanese Wind Chime*", tx2, ty2+140);
}

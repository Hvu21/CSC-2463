const synth = new Tone.PolySynth(Tone.Synth);
const bend = new Tone.PitchShift();
let vibrato = new Tone.Vibrato(5, 0.1);
synth.connect(vibrato);
vibrato.connect(bend);
bend.toDestination();

function preload() {
  Squeak = loadImage("Squeak/Happy.png");
}

function setup() {
  createCanvas(400, 400);
  bend.pitch = 20;
  vibrato.depth.value = 0.9;
}

function draw() {
  if(mouseIsPressed === true){background(Squeak);
  }else if (mouseIsPressed === false){ background(240);
    text("Press and Hold for Ghost Dog", 120, 100);
  }
}

let soundFX = {
  'sound': 'C5',
  'follow': 'C3'
}

function mousePressed(){
  let ps = soundFX.sound;
  let ps2 = soundFX.follow;
  synth.triggerAttack(ps);
  synth.triggerAttack(ps2);
}

function mouseReleased(){
  let ps = soundFX.sound;
  let ps2 = soundFX.follow;
  synth.triggerRelease(ps, '0.01');
  synth.triggerRelease(ps2, '0.01');
}


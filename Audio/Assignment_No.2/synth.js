/**JavaScript using the Tone.js library 
 * To Create a Polyphonic Synthesizer
 * Can Add More Synth Options*/

let synth = new Tone.PolySynth(Tone.Synth); 
let bend = new Tone.PitchShift();

bend.pitch = 0; 

const reverb = new Tone.Reverb({
  decay: 1.5, 
  preDelay: 0
})

synth.connect(bend); 
bend.connect(reverb);
reverb.toDestination();

let notes = {
  //Black Keys
  'w' : "C#4",
  'e' : "D#4",
  't' : "F#4",
  'y' : "G#4",
  'u' : "A#4",

  //White Keys
  'q' : "B3",
  'a' : "C4",
  's' : "D4", 
  'd' : "E4", 
  'f' : "F4", 
  'g' : "G4", 
  'h' : "A4", 
  'j' : "B4", 
  'k' : "C5"
};

function setup() {
  createCanvas(200, 400);

  pitchSlider = createSlider(0, 12, 0, 0.1);
  pitchSlider.position(10, 235); 
  pitchSlider.mouseMoved(() => bend.pitch = pitchSlider.value()); 

  // Slider for Reverb Room Size
  rroomSlider = createSlider(0, 10, 1.5, 0.1);
  rroomSlider.position(10, 295);
  rroomSlider.mouseMoved(() => reverb.decay = rroomSlider.value());
}

function keyPressed() {
  let playNotes = notes[key]; 
  synth.triggerAttack(playNotes); 
}

function keyReleased() {
  let playNotes = notes[key]; 
  synth.triggerRelease(playNotes,'+0.03'); 
}

function draw() {
  background(220);

  let tx = 10; //Starting Position of the Sliders Text, Changes on the X Axis
  let ty = 25; //Starting Position of the Sliders Text, Changes on the Y Axis
  let tx2 = 12; //Starting Position of the Footnotes Text, Changes on the X Axis
  let ty2 = 220; //Starting Position of the Footnotes Text, Changes on the Y Axis

  text('Play W,E,T,Y,U for Sharp Notes!', tx, ty); 
  text('Play Q, A-K for Natural Notes!', tx, ty+20); 
  text('Adjust the Pitch', tx2, ty2);
  text('Adjust the Reverb (Room Size)', tx2, ty2+60);

  text('*Default Reveb Wet Level*', tx2, ty2+120);
}
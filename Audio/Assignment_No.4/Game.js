/* 
Instructions: Bug Squish
Make a fun musical theme with your new found sequence, scheduling and looping skills.
Have in-game events trigger sonic events. These could be synthesized, soundfiles, or both. 
What is the sound of a squished bug? A missed bug? Frenzied bug skittering?
As the game play changes, (increases speed, adds more bugs, nears the end) represent it sonically.
How will the music or sound adapt?
Incorporate game states into the sound design. e.g. start page, game over, etc. 
Adapt your music or interaction sounds accordingly. 
*/

let bugs = [];
let rightEdgeBugImages = [];
let leftEdgeBugImages = [];
let currentRightEdgeBugImageIndex = 0;
let currentLeftEdgeBugImageIndex = 0;
let score = 0;
let timer = 30; //Default Timer
let bugSpeed = 4; //Default Bug Speed
let bugImage;
let squishedBugImage;

let squishSound;
let missedBugSound;

let gameState = "menu"; // Initial game state
let gameOverSound; // Variable to store the game over sound

let backgroundMusicMenu1; // Background music for menu
let backgroundMusicMenu2;
let backgroundMusicLevel1;
let backgroundMusicLevel2;



function preload() {
  for (let i = 0; i < 2; i++) {
    rightEdgeBugImages.push(loadImage(`Bug/RightBug${i + 1}.png`));
    leftEdgeBugImages.push(loadImage(`Bug/LeftBug${i + 1}.png`));
  }
  squishedBugImage = loadImage('Bug/SquishedBug.png');
  squishSound = loadSound('Sounds/squish_sound.wav');

  missedBugSound = loadSound('Sounds/missed_bug_sound.mp3');
  gameOverSound = loadSound('Sounds/game_over_sound.mp3');  
  
  backgroundMusicMenu1 = loadSound('Sounds/menu_music1.mp3'); // Menu background music
  backgroundMusicMenu2 = loadSound('Sounds/menu_music2.mp3'); // Menu background music
  backgroundMusicLevel1 = loadSound('Sounds/background_music_1.mp3'); // Level background music
  backgroundMusicLevel2 = loadSound('Sounds/background_music_2.mp3'); // Level background music
}

function setup() {
  createCanvas(500, 500);

  // Start playing background music
  backgroundMusicMenu2.loop();
}

function draw() {
  background(150); //OG: 220

  if (gameState === "menu") {
    displayMenu();
  } else if (gameState === "level1") {
    playLevel1();
    backgroundMusicMenu2.stop();
  } else if (gameState === "level2") {
    playLevel2();
    backgroundMusicMenu2.stop();
  }
  // Check if the game over condition is met
  if (timer === 0 && !gameOverSound.isPlaying()) {
    // If the game over condition is met and the game over sound is not playing, play the game over sound
    gameOverSound.play();
  }
}

function displayMenu() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Bug Squish - Level Selection", width / 2, height / 2 - 50);
  textSize(24);
  text("1. Level 1 (Original)", width / 2, height / 2);
  text("2. Level 2 (Advanced)", width / 2, height / 2 + 40);
}

function moveBug(bug) {
  if (!bug.squished) {
    bug.x += bug.speed;
  }
  // Bounce off the canvas edges
  // Check right canvas edge
  if (bug.x + 16 > width) {
    bug.speed *= -1; // Reverse the direction
    currentRightEdgeBugImageIndex = (currentRightEdgeBugImageIndex + 1) % rightEdgeBugImages.length;
  }

  // Check left canvas edge
  if (bug.x - 16 < 0) {
    bug.speed *= -1; // Reverse the direction
    currentLeftEdgeBugImageIndex = (currentLeftEdgeBugImageIndex + 1) % leftEdgeBugImages.length;
  }

  // Determine which set of bug images to use based on direction
  let currentBugImage = bug.speed > 0 ? rightEdgeBugImages[currentRightEdgeBugImageIndex] : leftEdgeBugImages[currentLeftEdgeBugImageIndex];

  // Draw the bug with the appropriate image
  image(currentBugImage, bug.x, bug.y, 64, 64);
}

function mousePressed() {
  if (gameState === "menu") {
    // Check if Level 1 is clicked
    if (mouseY > height / 2 - 20 && mouseY < height / 2 + 20 && mouseX > width / 2 - 100 && mouseX < width / 2 + 100) {
      gameState = "level1";
      startLevel1();
    }
    // Check if Level 2 is clicked
    if (mouseY > height / 2 + 20 && mouseY < height / 2 + 60 && mouseX > width / 2 - 100 && mouseX < width / 2 + 100) {
      gameState = "level2";
      startLevel2();
    }
  } else if (gameState === "level1") {
    let bugClicked = false; // Flag to check if any bug was clicked

    for (let i = 0; i < bugs.length; i++) {
      if (isBugClicked(bugs[i]) && !bugs[i].squished && timer > 0) {
        squishBug(bugs[i]);
        score++;
        bugSpeed += 0.2;
        let newBug = {
          x: random(60, width - 40),
          y: random(60, height - 40),
          speed: bugSpeed,
          squished: false,
        };
        bugs.push(newBug);

        // Increase playback rate of background music based on score
        let playbackRate = map(score, 0, 100, 1, 2); // Adjust 100 to desired maximum score
        backgroundMusicLevel1.rate(playbackRate);

        bugClicked = true; // Set flag to true since a bug was clicked
        break; // Exit loop since a bug was clicked
      }
    }
  } else if (gameState === "level2") {
    let bugClicked = false; // Flag to check if any bug was clicked

    for (let i = 0; i < bugs.length; i++) {
      if (isBugClicked(bugs[i]) && !bugs[i].squished && timer > 0) {
        squishBug(bugs[i]);
        score++;
        bugSpeed += 0.5;
        let newBug = {
          x: random(60, width - 40),
          y: random(60, height - 40),
          speed: bugSpeed,
          squished: false,
        };
        bugs.push(newBug);

        // Increase playback rate of background music based on score
        let playbackRate = map(score, 0, 100, 1, 2); // Adjust 100 to desired maximum score
        backgroundMusicLevel2.rate(playbackRate);

        bugClicked = true; // Set flag to true since a bug was clicked
        break; // Exit loop since a bug was clicked
      }
    }

    // If no bug was clicked, play the missed bug sound
    if (!bugClicked && timer > 0 ) {
      missedBugSound.play();
    }
  }
}

function isBugClicked(bug) {
  return mouseX >= bug.x && mouseX <= (bug.x + 64) && mouseY >= bug.y && mouseY <= (bug.y + 64);
}

function squishBug(bug) {
  bug.squished = true;
  bug.speed = 0;
  squishSound.play(); // Play the squish sound when a bug is squished
}

function changeBugImage() {
  // Change to the next bug image for the correct direction
  if (bugSpeed > 0) {
    currentRightEdgeBugImageIndex = (currentRightEdgeBugImageIndex + 1) % rightEdgeBugImages.length;
  } else {
    currentLeftEdgeBugImageIndex = (currentLeftEdgeBugImageIndex + 1) % leftEdgeBugImages.length;
  }
}

function startLevel1() {
  timer = 30; //Timer for Level 1 only
  score = 0; 
  bugSpeed = 4;
  bugs = [];

  for (let i = 0; i < 30; i++) {
    let bug = {
      x: random(60, width - 40),
      y: random(60, height - 40),
      speed: bugSpeed,
      squished: false,
    };
    bugs.push(bug);
  }

  // Start playing the background music for the level
  backgroundMusicLevel1.loop();

  setInterval(function () {
    if (timer > 0) {
      timer--;
      changeBugImage();
    }
  }, 1000);
}

function playLevel1() {
  if (timer > 0) {
    fill(0);
    textSize(20);
    text(`Score: ${score}`, 50, 20);
    text(`Time: ${timer}`, 50, 40);

    bugs.forEach((bug) => {
      if (!bug.squished) {
        moveBug(bug);
      } else {
        image(squishedBugImage, bug.x, bug.y, 64, 64);
      }
    });
  } else {
    textSize(32);
    fill(255, 0, 0);
    text(`Game Over! Score: ${score}`, width / 2, height / 2);
    noLoop();

    // Stop background music when game is over
    backgroundMusicLevel1.stop();
  }
}

function startLevel2() {
  timer = 10; //Timer for Level 2 only
  score = 0; 
  bugSpeed = 8;
  bugs = [];

  for (let i = 0; i < 40; i++) {
    let bug = {
      x: random(60, width - 40),
      y: random(60, height - 40),
      speed: bugSpeed,
      squished: false,
    };
    bugs.push(bug);
  }

  // Start playing the background music for the level
  backgroundMusicLevel2.loop();

  setInterval(function () {
    if (timer > 0) {
      timer--;
      changeBugImage();
    }
  }, 1000);
}

function playLevel2() {
  if (timer > 0) {
    fill(0);
    textSize(20);
    text(`Score: ${score}`, 50, 20);
    text(`Time: ${timer}`, 50, 40);

    bugs.forEach((bug) => {
      if (!bug.squished) {
        moveBug(bug);
      } else {
        image(squishedBugImage, bug.x, bug.y, 64, 64);
      }
    });
  } else {
    textSize(32);
    fill(255, 0, 0);
    text(`Game Over! Score: ${score}`, width / 2, height / 2);
    noLoop();

    // Stop background music when game is over
    backgroundMusicLevel2.stop();
  }
}

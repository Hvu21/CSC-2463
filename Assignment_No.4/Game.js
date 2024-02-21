let bugs = [];
let rightEdgeBugImages = [];
let leftEdgeBugImages = [];
let currentRightEdgeBugImageIndex = 0;
let currentLeftEdgeBugImageIndex = 0;
let score = 0;
let timer = 30;
let bugSpeed = 4;
let bugImage;
let squishedBugImage;

function preload() {
  for (let i = 0; i < 2; i++) {
    rightEdgeBugImages.push(loadImage(`Bug/RightBug${i + 1}.png`));
    leftEdgeBugImages.push(loadImage(`Bug/LeftBug${i + 1}.png`));
  }
  squishedBugImage = loadImage('Bug/SquishedBug.png');
}

function setup() {
  createCanvas(500, 500);

  for (let i = 0; i < 10; i++) {
    let bug = {
      x: random(60, width - 40),
      y: random(60, height - 40),
      speed: bugSpeed,
      squished: false,
    };
    bugs.push(bug);
  }

  setInterval(function () {
    if (timer > 0) {
      timer--;
      changeBugImage();
    }
  }, 1000);
}

function draw() {
  background(220);

  fill(0);
  textSize(16);
  text(`Score: ${score}`, 10, 20);
  text(`Time: ${timer}`, 10, 40);

  if (timer > 0) {
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
    text(`Game Over! Score: ${score}`, width / 2 - 150, height / 2);
    noLoop();
  }
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
  for (let i = 0; i < bugs.length; i++) {
    if (isBugClicked(bugs[i]) && !bugs[i].squished) {
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
    }
  }
}

function isBugClicked(bug) {
  return mouseX >= bug.x && mouseX <= (bug.x + 128) && mouseY >= bug.y && mouseY <= (bug.y + 64);
}

function squishBug(bug) {
  bug.squished = true;
  bug.speed = 0;
}

function changeBugImage() {
  // Change to the next bug image for the correct direction
  if (bugSpeed > 0) {
    currentRightEdgeBugImageIndex = (currentRightEdgeBugImageIndex + 1) % rightEdgeBugImages.length;
  } else {
    currentLeftEdgeBugImageIndex = (currentLeftEdgeBugImageIndex + 1) % leftEdgeBugImages.length;
  }
}
let sprite; 
let characters = [];

function preload() {
    let lilpeeps = {
        stand: { row: 0, frames: 1 }, 
        standUp: { row: 5, col: 1 }, 
        standDown: { row: 5, col: 11 },
        walkRight: { row: 0, col: 1, frames: 8},
        walkUp: { row: 5, frames: 6}, 
        walkDown: { row: 5, col: 6, frames: 6}, 
        walkLeft: { row: 0, col: 1, frames: 8}
    }; 

    characters.push(new character(100,100,80,80,'Characters/Ninja.png', lilpeeps));
    characters.push(new character(200,200,80,80,'Characters/Yang.png', lilpeeps));
    characters.push(new character(300,300,80,80,'Characters/Yellow.png', lilpeeps));

}

function setup() {
    createCanvas(400,400);
}

function draw() {
    background(0);

    characters.forEach((character) => {
        if (kb.pressing('d')) {
            character.walkRight(); 
        } else if (kb.pressing('a')) {
            character.walkLeft(); 
        } else if (kb.pressing('w')) {
            character.walkUp(); 
        } else if (kb.pressing('s')) {
            character.walkDown(); 
        } else if (kb.released('w')) {
            character.stopUp(); 
        } else if (kb.released('s')) {
            character.stopDown(); 
        } else if (kb.released('a') || kb.released('d')){
            character.stop(); 
        }

        if (character.sprite.x + character.sprite.width/4 > width) {
            if (kb.pressing('d')) {
              character.walkLeft(); 
            }
        } else if (character.sprite.x - character.sprite.width/4 < 0) {
          if (kb.pressing('a')) {
            character.walkRight(); 
          }
        }
    }); 
    

    
}

class character {
    constructor(x, y, width, height, spriteSheet, lilpeeps) {
        this.sprite = new Sprite(x, y, width, height);
        this.sprite.spriteSheet = spriteSheet;

        this.sprite.anis.frameDelay = 8; 
        this.sprite.addAnis(lilpeeps);
        this.sprite.changeAni('stand');
    }

    stopUp() {
      this.sprite.vel.x = 0; 
      this.sprite.vel.y = 0; 
      this.sprite.changeAni('standUp'); 
    }

    stopDown() {
      this.sprite.vel.x = 0; 
      this.sprite.vel.y = 0; 
      this.sprite.changeAni('standDown'); 
    }

    stop() {
        this.sprite.vel.x = 0; 
        this.sprite.vel.y = 0; 
        this.sprite.changeAni('stand');
    }
    
    walkRight() {
        this.sprite.changeAni('walkRight');
        this.sprite.vel.x = 1;
        this.sprite.scale.x = 1; 
        this.sprite.vel.y = 0; 
    }
    
    walkLeft() {
        this.sprite.changeAni('walkRight');
        this.sprite.vel.x = -1; 
        this.sprite.scale.x = -1; 
        this.sprite.vel.y = 0; 
    }
    
    walkUp() {
        this.sprite.changeAni('walkUp'); 
        this.sprite.vel.y = -1; 
        this.sprite.vel.x = 0; 
    }
    
    walkDown() {
        this.sprite.changeAni('walkDown');
        this.sprite.vel.y = 1; 
        this.sprite.vel.x = 0; 
    }
}
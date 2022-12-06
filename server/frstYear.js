document.addEventListener('DOMContentLoaded', () => {
  // Declaring variables
  const app = new PIXI.Application({
    width: 500,
    height: 800,
    backgroundColor: 0x4a1721,
  });
  let gameOver = false;
  let playLeft = true;
  let playRight = true;
  const platforms = [];
  let jumping = false;
  let left = false;
  let right = false;
  let up = false;
  let xVel = 0;
  let yVel = 0;
  let score = 0;
  const text = new PIXI.Text(`Score: ${score}`, { fontFamily: 'Arial', fontSize: 24, fill: 0xFFFFFF });
  text.x = 375;
  text.y = 750;
  const background = document.querySelector('.background');
  background.appendChild(app.view);
  // load all the assets
  app.loader
    .add('background', 'images/background.png')
    .add('player', 'images/player.png')
    .add('platform', 'images/platForm.png');
  app.loader.onComplete.add(doneLoading);
  const jumpSound = new Audio('audio/jump.mp3');
  const leftSound = new Audio('audio/left.mp3');
  const rightSound = new Audio('audio/right.mp3');
  document.addEventListener('keydown', move);
  document.addEventListener('keyup', moveEnd);
  app.loader.load();
  let player = new Player(250, 250, app.loader.resources.player.texture);
  let backDrop;
  app.stage.addChild(app.loader.resources.player.texture);
  app.ticker.add(gameUpdate);
  addEvents();

  // When stuff is done loadign add the assets so the appear properly
  function doneLoading() {
    backDrop = new PIXI.TilingSprite(app.loader.resources.background.texture, 500, 800);
    backDrop.position.set(0, 0);
    app.stage.addChild(backDrop);
    player = new Player(250, 250, app.loader.resources.player.texture);
    app.stage.addChild(player);
    createPlatforms();
    for (let x = 0; x < platforms.length; x++) {
      app.stage.addChild(platforms[x]);
    }
    app.stage.addChild(text);
    app.ticker.add(gameUpdate);
  }

  // Creates the initial platforms
  function createPlatforms() {
    for (let i = 0; i < 5; i++) {
      const platGap = 800 / 5;
      const newPlatBottom = 700 - i * platGap;
      const x = Math.random() * 400 + 50;
      const newPlatform = new Platform(x, newPlatBottom, app.loader.resources.platform.texture);
      platforms.push(newPlatform);
    }
  }

  // Move depending on what the input is by changing
  // the bool directions to true
  function move(e) {
    if (e.key === 'ArrowLeft') {
      left = true;
      player.scale.x = -1;
    } else if (e.key == 'ArrowRight') {
      right = true;
      player.scale.x = 1;
    } else if ((e.key === 'ArrowUp')) {
      up = true;
    }
  }

  // Ends moving by setting the bools to false
  function moveEnd(e) {
    if (e.key === 'ArrowLeft') {
      left = false;
    } else if (e.key == 'ArrowRight') {
      right = false;
    } else if ((e.key === 'ArrowUp')) {
      up = false;
    }
  }

  // Moves all the platforms using a foreach statement
  function movePlatforms() {
    platforms.forEach((platform) => {
      platform.y += 0.8;
      // If a platform falls out of the space delete it then creat another
      if (platform.y > 810) {
        platforms.shift();
        const x = Math.random() * 400 + 50;
        const newPlatform = new Platform(x, 0, app.loader.resources.platform.texture);
        platforms.push(newPlatform);
        for (let x = 0; x < platforms.length; x++) {
          app.stage.addChild(platforms[x]);
        }
      }
    });
  }

  // Main update function this is where all the movement and collision
  // is handeled
  function gameUpdate() {
    if (!gameOver) {
      // Check what userinput has selected for the character to move
      // Has an if statement inside so that the sound doesn't sound super annoying
      // By only letting it play once each time the character changes direction
      if (left) {
        xVel -= 0.6;
        if (playLeft) {
          leftSound.play();
          playLeft = false;
          playRight = true;
        }
      }
      if (right) {
        xVel += 0.6;
        if (playRight) {
          rightSound.play();
          playRight = false;
          playLeft = true;
        }
      }
      if (up && !jumping) {
        yVel = -25;
        jumping = true;
        jumpSound.play();
      }
      // Checks for collision using an if statement
      // and other if statements to see where exactly it collided.
      platforms.forEach((platform) => {
        const playerBox = player.getBounds();
        const platformBox = platform.getBounds();
        let xHappened = true;
        if (playerBox.x + playerBox.width > platformBox.x
                    && playerBox.x < platformBox.x + platformBox.width
                    && playerBox.y + playerBox.height > platformBox.y
                    && playerBox.y < platformBox.y + platformBox.height) {
          if ((playerBox.x - playerBox.width / 2 >= platformBox.x + platformBox.width / 2 + 10)) {
            xVel = 0;
            player.x = platform.x + 75;
            xHappened = false;
          }
          if ((playerBox.x + playerBox.width / 2 <= platformBox.x + platformBox.width / 2 - 70)) {
            xVel = 0;
            player.x = platform.x - 75;
            xHappened = false;
          }
          if ((playerBox.y - playerBox.height / 2 <= platformBox.y - platformBox.height / 2) && xHappened) {
            yVel = 0;
            player.y = platform.y + 49;
          }
          if ((playerBox.y + playerBox.height / 2 <= platformBox.y + platformBox.height / 2) && xHappened) {
            yVel = 0;
            player.y = platform.y - 48;
            jumping = false;
          }
        }
        yVel += 0.2;
      });

      // Move objects
      movePlatforms();
      player.move(xVel, yVel);

      // Slows the character down using artificial friction
      if (xVel > 0) {
        xVel -= 0.1;
      }
      if (xVel < 0) {
        xVel += 0.1;
      }
      if (yVel > 1.5) {
        yVel = 1.5;
      }

      // Checks to see if the character hits the sides of the app view
      if (player.x < 25) {
        xVel = 0;
        player.x = 25;
      }
      if (player.x > 475) {
        xVel = 0;
        player.x = 475;
      }

      // Scroll the sprite down adds score and checks if the player died
      backDrop.tilePosition.y = backDrop.tilePosition.y + 1;
      score += 0.01;
      text.text = `Score: ${score}`;
      if (player.y > 850) {
        gameOver = true;
      }
    }
    // Stops
    else {
      text.x = 180;
      text.text = `Game Over! Final Score: ${score}`;
    }
  }
});

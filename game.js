class Game {
    constructor () {
      let canvas = document.querySelector('#canvas')
      let context = canvas.getContext('2d')
      let gameSize = { x: canvas.width, y: canvas.height }
      this.player = new Player(gameSize)
      this.keyboarder = Keyboarder
      this.enemy = new Enemy(gameSize)
      this.startTime = Date.now();
      this.animateBool = true;
      this.finalScore;
        
      let animate = () => {
        let frameId = window.requestAnimationFrame(animate);
        this.update(frameId)
        this.drawPlayer(context, gameSize)
        this.drawEnemy(context)
      }


      animate();
    }
  
    drawPlayer (context, gameSize) {
      context.clearRect(0, 0, gameSize.x, gameSize.y)
      context.fillStyle = '#07BEB8'
      let startingXPosition = this.player.center.x - this.player.size.x / 2
      let startingYPosition = this.player.center.y - this.player.size.y / 2 
      let playerWidth = this.player.size.x
      let playerHeight = this.player.size.y
      context.fillRect(startingXPosition, startingYPosition, playerWidth, playerHeight)
    }

    drawEnemy(context) {
      context.fillStyle = '#000000'
      context.fillRect(this.enemy.center.x, this.enemy.center.y, this.enemy.size.x, this.enemy.size.y)
    }

    updateScoreboard() {
      let startTime = this.startTime;
      let current = Date.now();

      let score = setInterval(1000, (current - startTime) * .0001);
      let scoreboard = document.querySelector(".scoreboard")
      scoreboard.innerText = "Score: " + score;
      return score;
    }

    checkForCollision(player, enemy, id) {
        var player = {x: player.center.x, y: player.center.y, width: player.size.x, height: player.size.y}
        var enemy = {x: enemy.center.x, y: enemy.center.y, width: enemy.size.x, height: enemy.size.y}

        if (player.x < enemy.x + enemy.width &&
          player.x + player.width > enemy.x &&
          player.y < enemy.y + enemy.height &&
          player.y + player.height > enemy.y) {
          this.animateBool = false;
          window.cancelAnimationFrame(id);
        }
    }

    printScore(score) {
      let modalScoreboard = document.querySelector("#finalScore");
      let scoreText = document.querySelector("#score-text");
      modalScoreboard.style.opacity = "100";
      scoreText.innerText = score + " points"
    }

  
    update (frameId) {
      this.player.update()
      this.enemy.update()
      this.checkForCollision(this.player, this.enemy, frameId) 
      this.updateScoreboard(this.startTime);
      this.finalScore = this.updateScoreboard();
      if(this.keyboarder.isDown(this.keyboarder.KEYS.R)) {
        location.reload();
      }
      if (!this.animateBool) {
        this.printScore(this.finalScore)
      }
    }

    
  }
  
  class Player {
    constructor (gameSize) {
      this.size = { x: 30, y: 30 }
      this.center = { x: gameSize.x / 2, y: gameSize.y / 2 }
      this.keyboarder = Keyboarder
      this.gameSize = gameSize;
      this.leftBorder = 0 + this.size.x / 2;
      this.topBorder = 0 + this.size.y / 2;
      this.rightBorder = this.gameSize.x - this.size.x / 2;
      this.bottomBorder = this.gameSize.y - this.size.y / 2;
    }
  
    update () {
      if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
        if (this.center.x < this.rightBorder) {
          this.center.x += 5
        }
      } else if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
          if (this.center.x > this.leftBorder){
            this.center.x -= 5
          }
      } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
          if (this.center.y < this.bottomBorder) {
            this.center.y += 5
          }
      } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
          if (this.center.y > this.topBorder){
            this.center.y -= 5
          }
      }
    }
    
  }

  class Enemy {
    constructor (gameSize) {
      this.size = { x: 40, y: 40 }
      this.gameSize = gameSize;
      this.center = this.generateStartingPosition(gameSize);
    }

    generateStartingPosition(gameSize) {
      let startingPositionOptions = ["Top", "Right", "Bottom", "Left"];
      let startingPosition = startingPositionOptions[Math.floor(Math.random() * startingPositionOptions.length)];

      if (startingPosition === "Right") {
        return { x: gameSize.x + this.size.x, y: Math.random() * gameSize.y, dir: "L" }
      } else if (startingPosition === "Bottom") {
        return { x: Math.random() * gameSize.x, y: gameSize.y + this.size.y, dir: "U" } 
      } else if (startingPosition === "Left") {
        return { x: 0 - this.size.x, y:  Math.random() * gameSize.y, dir: "R" }
      } else if (startingPosition === "Top") {
        return { x: Math.random() * gameSize.x, y: 0 - this.size.y, dir: "D" }
      }
    }


    update() {
      if (this.center.dir === "L") {
          if (this.center.x <= 0 - this.size.x) {
            this.center = this.generateStartingPosition(this.gameSize)
          } else {
            this.center.x -= 6 
          }
      } else if (this.center.dir === "U") {
          if (this.center.y <= 0 - this.size.y) {
            this.center = this.generateStartingPosition(this.gameSize)
          } else {
            this.center.y -= 6;
          }
      } else if (this.center.dir === "R") {
          if (this.center.x >= this.gameSize.x + this.size.x) {
            this.center = this.generateStartingPosition(this.gameSize)
          } else {
            this.center.x += 6;
          }
      } else if (this.center.dir === "D" ) {
          if (this.center.y >= this.gameSize.y + this.size.y) {
            this.center = this.generateStartingPosition(this.gameSize)
          } else {
            this.center.y += 6;
          }
      }
    }
  }

  function beginGame() {
    new Game();
    let startButton = document.querySelector("#start");
    startButton.innerText = "Press 'R' to restart";
  }

  function restart() {
    location.reload();
  }


  //Need boundaries on the game       √
  //create enemies      √
  //collision          √
  //scoreboard (timer)  √
  //'press UP arrow to restart' --> start button      √
  // game overs        √
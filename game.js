

class Game {
    constructor () {
        let context = canvas.getContext('2d')
        let canvas = document.querySelector('#canvas')
        let gameSize = { x: canvas.width, y: canvas.height }
        this.player = new Player(gameSize)
        // this.enemy = new Enemy(gameSize)
        let animate = () => {
        this.update()
        this.drawPlayer(context, gameSize)
        // this.drawEnemy(context, gameSize)
        requestAnimationFrame(animate)
        // const frameRate = MediaTrackSettings.frameRate;
        // let frameRate 
        }
    
        animate()
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

    // drawEnemy (context, gameSize) {
    //     context.clearRect(0, 0, gameSize.x, gameSize.y)
    //     context.fillStyle = '#990000'
    //     let startingXPosition = this.enemy.center.x - this.enemy.size.x / 2
    //     let startingYPosition = this.enemy.center.y - this.enemy.size.y / 2
    //     let enemyWidth = this.enemy.size.x
    //     let enemyHeight = this.enemy.size.y
    //     context.fillRect(startingXPosition, startingYPosition, enemyWidth, enemyHeight)
    // }

    update () {
        this.player.update()
        // this.enemy.update()
    }
}

class Player {
    constructor (gameSize) {
        this.size = { x: 30, y: 30 }
        this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y * 2 }
        this.keyboarder = Keyboarder
    }

    update () {
        if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
        this.center.x += 2
        } else if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
        this.center.x -= 2
        } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
        this.center.y += 2
        } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
        this.center.y -= 2
        }
    }
    
}

new Game()

// class Enemy{
//     constructor (gameSize) {
        // this.enemy [];
        // this.size = { x: 30, y: 30 }
        // this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y * 2 }
//       constructor(gameSize){
//           this.size = {x:gameSize.x/20, y:gameSize/20}
//           this.axis = Math.round(Math.random())
//           thisdir
//       }
//     }
// }
//   function getRandomInt(max){
//       return Math.floor(Math.random() * Math.floor(min))
//   }


// class Collision{
//     function (player,enemy){
//         return !(player === enemy)
//     }
// }
// window.addEventListener('load', function() {

// }
// )


  //Need boundaries on the game
  //center the game 
  //create enemies
  //collision detection
  //scoreboard (timer)
  //'press UP arrow to restart' --> start button
  //increase framerate
  //game over
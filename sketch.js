var trex, trex_running, trex_collided, edges ;
var groundImage;
var ground;
var groundInvisible;
var cloud;
var cloudImage;
var obstacle;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var score = 0;
var groupObstacle;
var groupCloud;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, restart;
var gameOverImage, restartImage;
var checkp;
var die;
var jump;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  trex_collided = loadAnimation("trex_collided.png")
  gameOverImage = loadImage("gameOver.png")
  restartImage= loadImage("restart.png")
  checkp = loadSound("checkpoint.mp3")
  die = loadSound("die.mp3")
  jump = loadSound("jump.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  groundInvisible = createSprite(300, 165, 600, 10)
  groundInvisible.visible = false;
  ground = createSprite(300, 160, 600, 10)
  ground.addImage(groundImage)
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("stopped", trex_collided);
  gameOver = createSprite(300, 70)
  gameOver.addImage(gameOverImage)
  restart = createSprite(300, 90)
  restart.addImage(restartImage)
  edges = createEdgeSprites();  

  restart.scale = 0.3
  gameOver.scale = 1.5
  trex.scale = 0.5;
  trex.x = 50
  trex.debug = true
  trex.setCollider("circle", 0, 0, 48,)

  groupObstacle = new Group();
  groupCloud = new Group();
}

function draw() {
  background("white");

  text("score: " + score, 10, 15)
 
  console.log(getFrameRate())
  trex.collide(groundInvisible)
  
if(gameState == PLAY){
  gameOver.visible = false
  restart.visible = false
  ground.velocityX = - (3 + score / 1000)
  score = score + Math.round(getFrameRate() / 60 )
  if (ground.x < 0) {
    ground.x = 300
  }
    if (keyDown("space") && trex.y > 129 || touches.length > 0) {
      touches = [] 
      trex.velocityY = -11;
      jump.play()
    }
    trex.velocityY = trex.velocityY + 0.5;
    spawnClouds()
    spawnObstacle()
    if(score%100 == 0 && score > 0){
      checkp.play()
      
    }
  if( groupObstacle.isTouching(trex)){
    gameState = END
    die.play()

  }
}
else if(gameState == END){
  gameOver.visible = true
  restart.visible = true
  ground.velocityX = 0
  trex.velocityY = 0                 
  trex.changeAnimation("stopped")
  groupCloud.setVelocityXEach(0)
  groupObstacle.setVelocityXEach(0)
  groupCloud.setLifetimeEach(-1)
  groupObstacle.setLifetimeEach(-1)
  if(mousePressedOver(restart)){
      reset() 
  
  }
}
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 == 0) {
    cloud = createSprite(600, 40, 50, 40)
    cloud.velocityX = - (3 + score / 1000)
    cloud.addImage(cloudImage)
    cloud.scale = 0.7
    cloud.y = Math.round(random(20, 50))

    cloud.depth = trex.depth
    trex.depth = trex.depth + 1

    cloud.lifetime = 210
    groupCloud.add(cloud)
  }
}

function spawnObstacle() {
  if (frameCount % 60 == 0) {
    obstacle = createSprite(600, 143, 50, 40)
    obstacle.velocityX = - (3 + score / 1000)
    obstacle.scale = 0.5

    var rng;
    rng = Math.round(random(1, 6))

    switch (rng) {
      case 1:
        obstacle.addImage(obstacle1)
        break;
      case 2:
        obstacle.addImage(obstacle2)
        break;
      case 3:
        obstacle.addImage(obstacle3)
        break;
      case 4:
        obstacle.addImage(obstacle4)
        break;
      case 5:
        obstacle.addImage(obstacle5)
        break;
      case 6:
        obstacle.addImage(obstacle6)
        break;
      default:
        break;

    }

    obstacle.lifetime = 210  
    groupObstacle.add(obstacle)
  }

}
function reset() {
  gameState = PLAY
  groupCloud.destroyEach()
  groupObstacle.destroyEach()
  score = 0 
  trex.changeAnimation("running")
}
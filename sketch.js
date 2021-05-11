var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage, forestImg
var FoodGroup, obstacleGroup
var score, survivalTime;
var ground, invisibleGround;




function preload() {


  monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  forestImg = loadImage("jungle.jpg");

}



function setup() {

 createCanvas(700,400)

  survivalTime = 0;


  //creating monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 100, 771, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.addImage("ground", forestImg);

  invisibleGround = createSprite(400, 350, 1200, 10);
  invisibleGround.visible = false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;


}


function draw() {

  background(255);
  if (gameState === PLAY) {

    //console.log(ground.x);
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space")) {
      monkey.velocityY = -18;
    }

    switch (score) {

      case 10:
        monkey.scale = 0.14;
        break;
      case 20:
        monkey.scale = 0.18;
        break;
      case 30:
        monkey.scale = 0.22;
        break;
      case 40:
        monkey.scale = 0.26;
        break;
      default:
        break;

    }
    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score + Math.round(random(2, 10));
    }

    monkey.velocityY = monkey.velocityY + 1;
    monkey.collide(invisibleGround);

    if (obstaclesGroup.isTouching(monkey) && score > 10) {
      monkey.scale--;
    }

  }
  if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  drawSprites();
  spawnFood();
  spawnObstacles();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score:- " + score, 250, 50);
}


function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.velocityX = -5;

    //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

    //add image of banana
    banana.addImage(bananaImage);
    banana.scale = 0.1;

    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(800, 320, 10, 40);
    obstacle.velocityX = -6;

    //add image to the obstacle 
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;

    //lifetime to the obstacle     
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
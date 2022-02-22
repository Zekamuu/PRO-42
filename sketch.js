


var monkey, monkeyImg;
var monkeySize, monkeyJumpHeight;
var invisibleGround;
var banana, bananaImg;
var obstacle, obstacleImg;
var forest, forest2, backgroundImg;
var bananaGroup, obstacleGroup;
var score;
var gameState;
var END;
var PLAY;
var database = firebase.database();

function preload(){
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
  backgroundImg = loadImage("jungle.jpg");
  monkeyImg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
}

function setup() {
  createCanvas(700, 700);
  
  forest = createSprite(400, 350, 10, 10);
  forest.addImage("backgroundImg", backgroundImg);
  forest.velocityX = -15
  
  forest2 = createSprite(1400, 350, 10, 10);
  forest2.addImage("backgroundImg", backgroundImg)
  forest2.velocityX = -15;
  
  monkeySize = 0.1;
  
  monkeyJumpHeight = 350;
  
  monkey = createSprite(100, 550, 10, 10);
  monkey.addAnimation("monkeyImg", monkeyImg);
  monkey.scale = monkeySize;
  monkey.debug = true;
  
  invisibleGround = createSprite(100, 590, 10, 10);

  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  
  END = 0;
  PLAY = 1;
  gameState = PLAY;


}

function draw() {
  background("BLACK");
  
  if(gameState == PLAY){
    if(forest.x < -500){
      forest.x = 1200;
    }
    if(forest2.x < -500){
      forest2.x = 1200;
    }
    if(keyDown("space") && monkey.y >= monkeyJumpHeight){
      monkey.velocityY = -20;
    }
    
    monkey.velocityY = monkey.velocityY+2;
    monkey.collide(invisibleGround);
  
    if(monkey.isTouching(bananaGroup)){
      score = score+10;
      bananaGroup.destroyEach();
    }
    
    if(monkey.isTouching(obstacleGroup)){
      score = 0;
      monkeySize = 0.1;
      obstacleGroup.destroyEach();
    }
    
    if(score == 10){
        monkeySize = 0.2;
      }
      if(score == 20){
        monkeySize = 0.3;
      }
      if(score == 30){
        monkeySize = 0.4;
      }
      if(score == 40){
        monkeySize = 0.5;
      }

    monkey.scale = monkeySize;

    database.ref('/').update({
      score:score
    });
  
    spawnBanana();
    spawnOBSTACLE();
    drawSprites();
  
    fill("BLACK");
    stroke("BLACK");
    textSize(30);
    text("SCORE: "+score, 400, 100);
    if(score>40){
        fill("BLACK");
      stroke("BLACK");
      textSize(50);
      text("MAX HEIGHT", 40, 90);
    }
  }
}

function spawnBanana(){
  if(frameCount % 80 == 0){
    banana = createSprite(620, random(450, 530), 50, 50);
    banana.addImage(bananaImg);
    banana.scale = 0.07;
    banana.velocityX = -15;
    banana.lifetime = 125;
    bananaGroup.add(banana);
  }
  
}

function spawnOBSTACLE(){
  if(frameCount % 300 == 0){
    obstacle = createSprite(620, 560, 10, 10);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.2;
    obstacle.velocityX = -15;
    obstacle.lifetime = 125;
    obstacle.debug = true;
    obstacleGroup.add(obstacle)
  }
  
}

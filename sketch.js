var obstacleImage;
var player,player_running;
var obstacleGroup, foodGroup;
var score=0;
var food,obstacle;
var ground,ground_img;
var backgr,backgroundImg;

function preload()
{
  
  obstacleImage = loadImage("stone.png");
  foodImage = loadImage("banana.png");
  backgroundImg = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

}

function setup() 
{
  createCanvas(800, 400);
  
  backgr = createSprite(0,0,800,400);
  backgr.addImage(backgroundImg);
  backgr.x = background.width/2;
  backgr.velocityX = -4;
  backgr.scale=1.75
  
  player = createSprite(100,340,10,10);
  player.addAnimation("Running",player_running);
player.scale = 0.10;
  
  ground= createSprite(400,350,800,10)
  ground.x=ground.width/2
  ground.velocityX=-5;
  ground.visible=false;
  
  score=0;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  

}

function draw() 
{
  background(220);
  player.collide(ground);
  
  if(ground.x<0)
  {
    ground.x = ground.width/2;
  }
  
  if(backgr.x<100){
   backgr.x=backgr.width/2;
  }
  
 
  if(keyDown("space") ) {
      player.velocityY = -17;
    }
  
    player.velocityY = player.velocityY + 0.8
  
  if(foodGroup.isTouching(player))
  {
    score = score + 2;
    foodGroup.destroyEach();}
    switch(score)
    {
        case 10: player.scale = 0.12;
        break;
        case 20: player.scale = 0.14;
        break;
        case 30: player.scale = 0.16;
        break;
        case 40: player.scale = 0.18;
        break;
        default: break;
    }
  
  if(obstacleGroup.isTouching(player))
  {
    obstacleGroup.destroyEach();
    score = score - 5;
    player.scale=0.08;
  }
  
  spawnFood();
  spawnObstacles();
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE :" + score,400,30);
}

function spawnFood()
{
  if(frameCount%80===0){
  var food = createSprite(600,160,10,10);
  food.addImage(foodImage);
  food.y = random(120,200);
  food.velocityX = -6;
  food.lifetime = 180;
  foodGroup.add(food);
  food.scale = 0.05;
}
}

function spawnObstacles()
{
  if(frameCount%300===0){
  obstacle = createSprite(800,340,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -6;
  obstacle.lifetime = 180;
  obstacle.scale = 0.2;
  obstacleGroup.add(obstacle);
  }
}
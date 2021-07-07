var PLAY=1;
var END=0;
var gameState=PLAY;


var backgroundImg
var astronaut, astronautAnimation
var obstaclesGroup
var score;
function preload()
{
	backgroundImg=loadImage("SpaceBackground.gif")
	astronautAnimation=loadAnimation("1.png","2.png","3.png","4.png", "5.png", "6.png")
gameoverImg=loadImage("gameover.jpg")
restartImg=loadImage("restartbutton.png")
titleImg=loadImage("title.png")

obstacle1=loadImage("obstacle1.png")
obstacle2=loadImage("obstacle2.png")
obstacle3=loadImage("obstacle3.png")
obstacle4=loadImage("obstacle4.png")
obstacle5=loadImage("obstacle5.png")
obstacle6=loadImage("obstacle6.png")

}

function setup() {
	createCanvas(800, 600);
astronaut=createSprite(60,490,20,50)
astronaut.addAnimation("running", astronautAnimation)
astronaut.scale=0.9

ground=createSprite(500,600,1000,10)
ground.visible=false
ground.x=ground.width/2;

gameover=createSprite(400,300)
gameover.addImage(gameoverImg)


restart=createSprite(412,400)
restart.addImage(restartImg)
restart.scale=0.27

title=createSprite(400,15)
title.addImage(titleImg)
title.scale=0.39

obstaclesGroup=createGroup();


astronaut.setCollider("rectangle",0,0,astronaut.width-30,astronaut.height)
  astronaut.debug=false;
  score=0;
  

	

	//Create the Bodies Here.


	
  
}


function draw() {
  rectMode(CENTER);
  background("black") ;
  image(backgroundImg,0,0,width,height)
  textSize(25);
 fill("white");
  text("SCORE:"+score,320,70);

  if(gameState === PLAY){
    gameover.visible=false;
    restart.visible=false;

    ground.velocityX=-(4+3* score/100)
    score = score + Math.round(getFrameRate()/60);

    if (ground.x<0){
      ground.x=ground.width/2;
    }
    if(keyDown("space")&& astronaut.y>=100){
      astronaut.velocityY=-12;
    }
    astronaut.velocityY=astronaut.velocityY+0.8

    spawnObstacles();

    if(obstaclesGroup.isTouching(astronaut)){
      astronaut.velocityY=-12;
      gameState=END;
    }
  }
  else if(gameState === END){
    gameover.visible=true;
    restart.visible=true;
   
    ground.velocityX=0
    astronaut.velocityY=0
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
  }
  astronaut.collide(ground);
  if(mousePressedOver(restart)){
    reset();
  }
  
 //textSize(25);
 //fill("white");
  //text("👨‍🚀PRESS THE SPACE KEY TO MAKE THE ASTRONAUT JUMP👨‍🚀",15,30);
 
  
  drawSprites();
 
}
function reset(){
  gameState=PLAY;
  score=0;
  gameover.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
}
function spawnObstacles(){
  if(frameCount%60===0){
    var obstacle=createSprite(600,165,10,40)
    obstacle.setCollider("rectangle",0,0,obstacle.width-5,astronaut.height-5)
    obstacle.y=Math.round(random(300,600))
    obstacle.velocityX=-(6+score/100);
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
      obstacle.scale=0.2
      break;
      case 2:obstacle.addImage(obstacle2);
      obstacle.scale=0.4
      break;
      case 3:obstacle.addImage(obstacle3);
      obstacle.scale=0.5
      break;
      case 4:obstacle.addImage(obstacle4);
      obstacle.scale=0.4
      break;
      case 5:obstacle.addImage(obstacle5);
      obstacle.scale=0.5
      break;
      case 6:obstacle.addImage(obstacle6);
      obstacle.scale=0.4
      break;
      default: break;
    }
    obstacle.lifetime=300;
    obstaclesGroup.add(obstacle);
  }
}



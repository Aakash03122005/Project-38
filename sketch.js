// score varible
var score=0;
// all are varabile .
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
// game State of the game.
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  // loading the images of the sprites.
}

function setup(){
  // Creating Canvas 
  createCanvas(600,600);

  // value of score is zero
  score = 0;

  // Background music (.loop means repeate again and again)
  spookySound.loop();

  //  creating tower
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  // Creating Groups of the Doors
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  // player ghost
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);

}

function draw(){
  
  // background black
  background("black");

   // score system
   fill("yellow");
   textSize(20);
   stroke("white");
   text("DISTANCE: "+ score, 215,50);
   
  if (gameState === "play") {
    score = score + Math.round(getFrameRate()/60);
    camera.velocityY = +(4 + 2*score/100);

    // if game State is  true then ghost will the turn to left.
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    // if game State is  true then ghost will the turn to right.
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    // id space button is pressed then ghost will jump.
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    // add gravity
    ghost.velocityY = ghost.velocityY + 0.8
    
    // moving camera 
    if(tower.y > 400)
    {
      tower.y = 300
      // the camera is moving  along with the position of the tower's x-axis.
      camera.position.x = tower.x;
    }

    // describeing function.
    spawnDoors();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    ghost.debug = true;
    drawSprites();
  }
  
  if (gameState === "end"){
    //score.hide();
    stroke("white");
    fill("yellow");
    textSize(30);
    text("Game Over", 200,250)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = false;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}


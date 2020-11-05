var monkey , monkey_running, monkeystop;
var ground, groundimage ,bg, bgimage;
var banana ,bananaImage, stone, stoneImage;
var bananagroup, stonegroup;
var score,score1;
var PLAY=1, END=0, gamestate= PLAY;


function preload(){
  
monkey_running=loadAnimation ("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png", "sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
monkeystop   = loadImage("sprite_0.png")  
bananaImage  = loadImage("banana.png");
stoneImage   = loadImage("obstacle.png");
groundimage  = loadImage("g.png");
bgimage      = loadImage("b.jpg");
}

function setup() {

createCanvas(600, 300);
  
ground= createSprite(500,70,10,10);
ground.addImage("i",groundimage);
ground.scale=6.3;
ground.x = ground.width /2;
ground.velocityX=-6;

bg    = createSprite(300,30,10,10);
bg.addImage("bg",bgimage)
bg.scale=2.5;  
  
monkey= createSprite(150,200,20,20);
monkey.addAnimation("monkey",monkeystop);
monkey.addAnimation("monkeys",monkey_running);
monkey.scale=0.1;

monkey.debug=false;                  
ground.debug=false;
  
ground.setCollider("rectangle",0,36,300,10);
score=0;
score1=0;
bananagroup= new Group();
stonegroup = new Group();
}

function draw() {

background("white");
drawSprites();  
monkey.collide(ground);
textSize(20)
text("Survival Time: "+ score, 443,30);
text("Bananas collected: "+ score1, 400,50);

if (ground.x < 0){
ground.x = ground.width/2;}
  
if(gamestate===PLAY){

spawnbanana(); 
spawnstone();
score= Math.round(frameCount/60)
monkey.changeImage("monkeys",monkey_running);
  
monkey.velocityY = monkey.velocityY + 0.8
if(keyDown("space")&& monkey.y >= 100) {
monkey.velocityY = -12;}
  
if(monkey.isTouching(bananagroup)){
bananagroup.destroyEach();
score1=score1+1}
  
if(monkey.isTouching(stonegroup)){
monkey.changeAnimation("monkey",monkeystop)
gamestate=END}
}

if(gamestate===END){  
monkey.velocityY = 0
ground.velocityX=0;
textSize(20);
fill("black")
text("Press R to restart",250,100)
  
stonegroup.setLifetimeEach(-1);
bananagroup.setLifetimeEach(-1);
     
stonegroup.setVelocityXEach(0);
bananagroup.setVelocityXEach(0);  
  
if(keyDown("r")){
restart()
score=0;}
}
} 

function spawnbanana(){
  
if(frameCount%100===0) {
banana = createSprite(610,50,10,10);
banana.y=Math.round(random(230,80))
banana.addImage("banana",bananaImage);
banana.scale=0.1;
banana.velocityX=-6; 
banana.lifetime=300;
bananagroup.add(banana);}
}

function spawnstone(){
if(frameCount%100===0) {
stone = createSprite(610,50,10,10);
stone.y=Math.round(random(230,200))
stone.addImage("banana",stoneImage);
stone.scale=0.1;
stone.velocityX=-6; 
stone.lifetime=200;
stone.debug=false;
stone.setCollider("circle",0,0,200)
stonegroup.add(stone)}  
}

function restart(){
  
gamestate=PLAY;
monkey.changeImage("monkeys",monkey_running);
stonegroup.setLifetimeEach(0) 
bananagroup.setLifetimeEach(0);
score=0;
ground.velocityX=-6; 
}
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();

  //criar sprite do ghost e da torre
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
 
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  //criar os grupos
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  //se o estado do jogo for play
  if(gameState === "play"){
    // 3 ifs para movimentar para direita pra esquerda e pra cima 
    console.log("Linha 40");
    if(keyDown("right_arrow")){
      ghost.x = ghost.x +5
    }
    if(keyDown("left_arrow")){
      ghost.x = ghost.x -5
    }
    if(keyDown("space")){
      ghost.velocityY = ghost.velocityY -5
    }
    // atribuir gravidade
    ghost.velocityY = ghost.velocityY = 0.1
    if(tower.y > 400){
      tower.y = 300
    }
    //descansar fantasma se tocar na grade 
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    //mudar status para fim se bloco invisivel tocar no fantasma ou o y for maior que 600
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
    //chamar função de geração de portas //spawndoors()
    spawndoors();
    drawSprites();
  }
  //se o estado de jogo for fim
  if(gameState === "end"){
    fill("cyan");
    textSize (80);
    //mensagem de texto fim de jogo
    text("Fim De Jogo",100,250);
  } 
    
}
//função de gerar portas
function spawndoors(){
  
  // if (frameCount % 200 === 0) {
  if(frameCount % 200 === 0 ){
    //criar objetos portas,grades e bloco invisivel
    door = createSprite(200,-50);
    climber = createSprite(200,10);
    invisibleBlock = createSprite(200,15);
    //carregar imagens ? precisa mesmo?
    door.addImage(doorImg);
    climber.addImage(climberImg);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //gerar objetos nas posições randomicas de x entre 120 e 400
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = climber.x;
    //atribuir velocidade
    door.velocityY = 2
    climber.velocityY = 2
    invisibleBlock.velocityY = 2
    //atribuir profundidade
    ghost.depht = door.depht;
    console.log("Linha 101");
    ghost.depht +=1
    //definir tempo de vida
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    //adicionar aos grupos
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
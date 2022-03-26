
var player;
var gameState = "play";
var score = 0;
var star = 0;
var restartText,restart;
var space;
var play;
var title;
var playtext;
var starGroup,aestroidGroup,planet1Group,planet2Group,planet3Group;
var gameOver
var text;
var instruction;



function preload(){
   bg = loadImage("bg.jpg");
   rocket = loadImage("rocket.png");
   planet1 = loadImage("planet1.png");
   planet2 = loadImage("planet2.png");
   planet3 = loadImage("planet3.png");
   aestroidImg = loadImage("aestroid.png");
   restartImg = loadImage("restart.png");
   restart_textImg = loadImage("restart_text.png");
   playImg = loadImage("play_button.png");
   play_textImg = loadImage("play_text.png");
   startingbg = loadImage("starting bg.jpg");
   starsImg = loadImage("stars.png");
   gametitle = loadImage("gametitle.png");
   gameoverImg = loadImage("game over.png")
   instructions = loadImage("INSTRUCTIONS.png")
    
   
}

function setup() {

    createCanvas(windowWidth,windowHeight);
  
    space = createSprite(600,600);
    space.addImage(bg);
    space.scale = 1.2;
    space.visible = false;

    starGroup = createGroup();
    aestroidGroup = createGroup();
    planet1Group = createGroup();
    planet2Group = createGroup();
    planet3Group = createGroup();
    
    

    player = createSprite(695,30);
    player.addImage(rocket);
    player.scale = 0.7;
    player.setCollider("rectangle",0,0,60,100);
    player.visible = false;

    instruction = createSprite(650,300);
    instruction.addImage(instructions);
    instruction.visible = false;

    play = createSprite(width/2,height/1.6);
    play.addImage(playImg);

    playtext = createSprite(width/2,height/2.2);
    playtext.addImage(play_textImg);
    playtext.scale = 0.3;

    title = createSprite(650,180);
    title.addImage(gametitle);
    title.scale = 0.8;

    restartText = createSprite(width/2,height/3);
    restartText.addImage( restart_textImg);
    restartText.scale = 0.9;
   
    restart = createSprite(width/2,height/2);
    restart.addImage(restartImg);
    restart.scale = 0.5;

    gameOver = createSprite(width/2,height/4.8)
    gameOver.addImage(gameoverImg);
    gameOver.scale = 0.8;

    restart.visible = false;
    restartText.visible = false;
    gameOver.visible = false;
    

}

function draw() {
    background(startingbg);

   edges = createEdgeSprites();
    player.collide(edges[1]);
    player.collide(edges[0]);
   
    if(mousePressedOver(play)){
        instruction.visible = true;
        play.visible = false;
        playtext.visible = false;
        title.visible = false;
      }
    
      if(keyDown("enter")){
        space.visible = true;
        space.velocityY = -2;
        player.visible = true;
        play.visible = false;
        score=score+Math.round(frameRate()/65);
        instruction.visible = false;
      }

    if(space.y < 0){
        space.y = height/2;
    }
    
    if(gameState === "play"){

        stars();
        aestroids();
        planets1();
        planets2();
        planets3();
        
       
        if(keyDown("up")||keyDown("w")||touches.length>0){
            player.velocityY =-10;
            touches = {}
        }

        player.velocityY = player.velocityY +=0.8;

        if(keyDown("left")||keyDown("a")||touches.length>0){
            player.x = player.x - 10;
            touches = {}
        }

        if(keyDown("right")||keyDown("d")||touches.length>0){
            player.x = player.x + 10;
            touches = {}
        }
        
    }

        if(starGroup.isTouching(player)){
            starGroup.destroyEach();
            star=star+1;

        }

        if(aestroidGroup.isTouching(player)){
            aestroidGroup.destroyEach();
            starGroup.destroyEach();
            gameState="end";

        }

        
        

        else if(gameState === "end"){
            space.velocityY=0;
            starGroup.setVelocityYEach(0);
            aestroidGroup.setVelocityYEach(0);

            restart.visible = true;
            restartText.visible = true;
            gameOver.visible = true;

            player.velocityY=0;

            starGroup.setLifetimeEach(-1);
            aestroidGroup.setLifetimeEach(-1);

            if(mousePressedOver(restart)){
                reset();
                restart.visible = false;
                restartText.visible = false;
                gameOver.visible = false;
                player.y = 500;
            }

        }

    drawSprites();
    textSize(20);
    fill("yellow");
    text("STARS:"+ star,10,30);
      
    textSize(20);
    fill("yellow");
    text("SCORE:"+score,10,60);

}

    function stars(){
        
            if(World.frameCount%200===0){
                star = createSprite(windowWidth,windowHeight);
                star.scale = 0.2;
                star.velocityY=-2.5;
                star.addImage(starsImg);
                star.x=Math.round(random(windowWidth,windowHeight));
               
                star.depth=player.depth;
                player.depth+=1;
                
                starGroup.add(star);
            }
        }
      
    function aestroids(){
        if(World.frameCount%150===0){
            aestroid = createSprite(windowWidth,windowHeight);
            aestroid.scale = 0.17;
            aestroid.velocityY=-2.5;
            aestroid.addImage(aestroidImg)
            aestroid.x=Math.round(random(windowWidth,windowHeight));
           
            aestroid.depth=player.depth;
            player.depth+=1;
            
            aestroidGroup.add(aestroid);
        }
    }

    function planets1(){
        if(World.frameCount%100===0){
            planet1 = createSprite(windowWidth,windowHeight);
           
            
            planet1.scale = 0.17;
            planet1.velocityY=-2.5;
            planet1.addImage(planet1Img)
            planet1.x=Math.round(random(windowWidth,windowHeight));
           
            planet1.depth=player.depth;
            player.depth+=1;
            
            planet1Group.add(planet1);
                
        }
    }

    function planets2(){
        if(World.frameCount%50===0){
            planet2 = createSprite(windowWidth,windowHeight);
            planet2.scale = 0.17;
            planet2.velocityY=-2.5;
            planet2.addImage(planet2Img)
            planet2.x=Math.round(random(windowWidth,windowHeight));
           
            planet2.depth=player.depth;
            player.depth+=1;
            
            planet2Group.add(planet2);
                
        }
    }

    function planets3(){
        if(World.frameCount%0===0){
            planet3 = createSprite(windowWidth,windowHeight);
           
            
            planet3.scale = 0.17;
            planet3.velocityY=-2.5;
            planet3.addImage(planet3Img)
            planet3.x=Math.round(random(windowWidth,windowHeight));
           
            planet3.depth=player.depth;
            player.depth+=1;
            
            planet3Group.add(planet3);
                
        }
    }
  

    function reset(){

        gameState="play";
        starGroup.destroyEach();
        aestroidGroup.destroyEach();
        score=0;
    }
          
        
    

    

   


    

    
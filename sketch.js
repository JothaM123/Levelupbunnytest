const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Bodies;


let engine;
let world;
let bg,ground;
let higherground;
let bunny,rope,rope2,link,link2;
let blink,eat,sad,starimg,bbl;
let btn1,btn2;

function preload(){

  bg = loadImage("background.png");
  food = loadImage("melon.png");
  bubbleI = loadImage("bubble.png");
  rabbit = loadImage("Rabbit-01.png");
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  starimg = loadImage("star.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
}


function setup() {
  createCanvas(500,800);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  //createSprite(400, 200, 50, 50);
  ground = new Ground(250, height-10, width,20);
  fruit = Bodies.circle(100,400, 15, {restituion:0.8});
  World.add(world, fruit);

  bbl = createSprite(290, 460, 20, 20);
  bbl.addImage(bubbleI);
  bbl.scale = 0.1;



  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(270,100,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;

  higherground = new Ground(300,170,100,10);

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  rope = new Rope(4,{x:230,y:330});
  rope2 = new Rope(4,{x:50, y:450});
  link = new Link(rope, fruit);
  link2 = new Link(rope2, fruit);

  btn1 = createImg('cut_btn.png');
  btn1.position(200, 320);
  btn1.size(50, 50);
  btn2 = createImg('cut_btn.png');
  btn2.position(30,420);
  btn2.size(50, 50);
  btn2.mouseClicked(()=>{
    rope2.break();
    link2.dettach();
    link2 = null;
  })

  ellipseMode(RADIUS);
  

 

}

function draw() {

  
  Engine.update(engine);

  background(bg); 
  
  push();

  imageMode(CENTER);
  if(fruit!=null){
    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }


  pop();
  ground.show();
  higherground.show();
  rope.show();
  rope2.show();

  if(collide(fruit,bunny,80) === true){
    (()=>{
      rope.break();
      link.dettach();
      link = null;
    });

    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
   }

   if(collide(fruit,bbl,40)===true){
     engine.world.gravity.y = -1;
     bbl.position.x = fruit.position.x;
     bbl.position.y = fruit.position.y;
   }


  drawSprites();

}

function collide(body,sprite,x){
  if(body!=null){
    var d = dist(body.position.x, body.position.y,sprite.position.x, sprite.position.y);
    if(d<=x){
      return true;
    }
    else{
      return false;
    }
  }
}
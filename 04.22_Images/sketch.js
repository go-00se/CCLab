let bkgImg, fish;
let imgW, imgH;
let red;

let worldWidth = 2000;
let worldHeight = 2000;

let particles = [];
let numParticles = 100;

let worldX = 0;
let worldY = 0;

let a, b;

function preload() {
  bkgImg = loadImage("assets/images/world.jpg");
  fish = loadImage("assets/images/fish.png");
  red = loadImage("assets/images/chilli.png");
}


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");


  imgH = bkgImg.height;
  imgW = bkgImg.width;

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}


function draw() {
  background(220);

 

  
 

  push();
  translate(worldX, worldY);
  image(bkgImg, 0, 0, worldWidth, worldHeight);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }
  
  pop();

  var navSpeed = 5;

 

  var space = 50;

    if (mouseY > height - space) {
      worldY -= navSpeed;
    } else if (mouseY < space) {
      worldY += navSpeed;
    } else if (mouseX < 100) {
      worldX += navSpeed;
    } else if (mouseX > width - 100) {
      worldX -= navSpeed;
    }

    push();

    rectMode(CENTER);
  
    a = map(0, worldX, worldWidth, 0, 40);
    b = map(0, worldY, worldHeight, 0, 150);

    
    
    translate(90, 90);
    fill("white");
    rect(0,0,40, 40);
    
    rect(a, b, 16, 10);
  
    pop();

  }


class Particle {
  constructor() {
    this.x = random(10, worldWidth - 20);
    this.y = random(0, worldHeight);
    this.speedX = random(-2, 2);
    this.dia = 40;
    this.rotate = random(0, 360);
  }

 update(){
  this.x += this.speedX;

  // if(this.x > width-this.dia/2 || this.x < this.dia/2){
  //   this.speedX = -this.speedX;
  // }

  if(this.x > worldWidth-this.dia/2 || this.x < this.dia/2){
    this.speedX = -this.speedX;
  }
}
 display(){

  push();
  translate(this.x, this.y);

  

  imageMode(CENTER);
  image(fish, 0, 0, this.dia, this.dia);

  circle(0,0,1);
 

  pop();
 }
}

class Red {
  constructor(){
    this.x = 200;
    this.y = 200;
  }

  update(){

  }

  display(){
    push();
    translate(this.x, this.y);
    rotate(radians(this.angle));
    imageMode(CENTER);
    image(red,-37, -47);
    
    
    pop();
  }

  moveRight(){
    this.x += this.speed;
    worldX -= this.speed;
    this.angle = 90;
  }
}

let waao;
let beep;

let bghue;
let instruments = [];


let sinInput = 0;
let speed = 0.01;

let img


function preload() {
  waao = loadSound("assets/sounds/long_waao.mp3");
  beep = loadSound("assets/sounds/8000__cfork__cf_fx_bloibb.mp3");
  img = loadImage("assets/images/waao.png");
}


// for(let i; i<=100; i++) {
//   waao.play();

//}

function mousePressed() {
  beep.play();

  let a = new Instrument(mouseX, mouseY);
  instruments.push(a);
  
}

function keyPressed() {
  if(key == 'a'){
    waao.play();
  }
  if(key == 'd'){
    beep.play();
  }
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  colorMode(HSB);

  bghue = random(255);


  let a = new Instrument(200, 200);
  instruments.push(a)
}

function draw() {
  background(bghue, 180, 30);

  push();
  translate(width / 2, 200);

  let sinValue = height / 2 * sin(10 * sinInput) + height / 1.5;
  cosValue = width / 2 * cos(10 * sinInput) + width / 1.5;

  noStroke();
  fill(sinValue, height / 2 - sinValue, height / 2 - height / 8 - sinValue);
  // textAlign(CENTER, CENTER)
  // text('我草', 0, 0);
  // textSize(sinValue);
  img.resize(sinValue, sinValue * cosValue / img.width);
  imageMode(CENTER);
  image(img, 0, 0);


  
  sinInput = sinInput + speed;
  pop();
  
  for(let i = 0; i < instruments.length; i++){
    instruments[i].update();
    instruments[i].display();
  }

  let playbackRate = map(mouseY, 0.1, height, 2, 0);
  playbackRate = constrain(playbackRate, 0.01, 4);
  waao.rate(playbackRate);
}


class Instrument{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;

    this.possibleSize = [10, 30, 50, 70, 90];
    this.size  = random(this.possibleSize);

    this.speedX = random(-4, 4);
    this.speedY = random(-4, 4);

    this.myHue = random(0, 50);

    this.myRate = map(this.size, 10, 90, 5, 0.1);
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x < this.size/2 || this.x > width+this.size/2){
      this.speedX = -this.speedX;

      waao.rate(this.myRate);
      waao.play();

    }
    if(this.y < this.size/2 || this.y > height+this.size/2){
      this.speedY = -this.speedY;

      beep.rate(this.myRate);
      beep.play();
  
    }

  
  }
  display(){
    push();
    translate(this.x, this.y);
    noStroke();
    fill(this.myHue, 255, 255);

    circle(0, 0, this.size);

    pop();
  }

}







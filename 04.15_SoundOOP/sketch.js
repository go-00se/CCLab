let waao;
let beep;

let bghue;
let instruments = [];

let dfhs = [];


let sinInput = 0;
let speed = 0.01;

let img

let dfh_1, dfh_2, dfh_3, dfh_4, dfh_5, dfh_6, dfh_7, dfh_8;

let showingDFH = false;
let dfhImg = null;
let dfhTimer = 0;
let dfhDuration = 2000; // 显示 2 秒



function preload() {
  waao = loadSound("assets/sounds/long_waao.mp3");
  beep = loadSound("assets/sounds/8000__cfork__cf_fx_bloibb.mp3");
  img = loadImage("assets/images/waao.png");
  dfh_1 = loadImage("assets/images/dfh_1.png");
  dfh_2 = loadImage("assets/images/dfh_2.png");
  dfh_3 = loadImage("assets/images/dfh_3.png");
  dfh_4 = loadImage("assets/images/dfh_4.png");
  dfh_5 = loadImage("assets/images/dfh_5.png");
  dfh_6 = loadImage("assets/images/dfh_6.png");
  dfh_7 = loadImage("assets/images/dfh_7.png");
  dfh_8 = loadImage("assets/images/dfh_8.png");

}


// for(let i; i<=100; i++) {
//   waao.play();

//}

function mousePressed() {

  for(let i = 0; i < instruments.length; i++){
  instruments[i].CheckClick();

  }

}

function keyPressed() {
  
  if(key == "s"){
    if(mouseX > 50 && mouseX < width-50 && mouseY > 50 && mouseY < height-50){
      let a = new Instrument(mouseX, mouseY);
      instruments.push(a)
  }
  if(key == 'a'){
    waao.play();
  }
  if(key == 'd'){
    beep.play();
  }



}
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  colorMode(HSB);

  bghue = random(255);


  let a = new Instrument(200, 200);
  instruments.push(a);
  dfhs = [dfh_1, dfh_2, dfh_3, dfh_4, dfh_5, dfh_6, dfh_7, dfh_8];
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

    this.myRate = map(this.size, 10, 90, 4, 0.9);

    this.strokeThickness  = this.size;
    this.strokeThicknessGoal  = this.size;
    this.dia = 1;
    this.diaGoal = this.size;
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x < this.size/2 || this.x > width+this.size/2){
      this.speedX = -this.speedX;

      beep.rate(this.myRate);
      beep.play();

      this.diaGoal = random(8, 50);
      this.strokeThicknessGoal = random(8, 54);

    }
    if(this.y < this.size/2 || this.y > height+this.size/2){
      this.speedY = -this.speedY;

      beep.rate(this.myRate);
      beep.play();

      this.diaGoal = random(10, 100);
      this.strokeThicknessGoal = random(10, 100);
  
    }

    this.dia = lerp(this.dia, this.diaGoal, 0.1);

  
  }
  display(){
    push();
    translate(this.x, this.y);
    // noStroke();
    // fill(this.myHue, 255, 255);

    // circle(0, 0, this.size);
    noFill();
    stroke(this.myHue, 255, 255);
    strokeWeight(this.strokeThickness);
    circle(0, 0, this.dia);

    pop();
  }

  CheckClick(){
    let d = dist(mouseX, mouseY, this.x, this.y);
    if(d < this.size/2){
      this.myHue = random(100, 200);
      // this.diaGoal = random(10, 100);
      // this.strokeThicknessGoal = random(10, 100);
    }
  }

}







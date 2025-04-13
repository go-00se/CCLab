// let ball
// let egg1

let basket = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  // ball = new BouncingBall(120, 120);
  // egg1 = new BouncingBall(290, 170);
  // basket.push(ball);

for (let i = 0; i <40;i++){
  let egg = new BouncingBall(random(0, width), random(0, height));
  basket.push(egg);
}
}

function draw() {
  background(211, 123, 43);

  // ball.display();
  // ball.update();
  for (let i = 0; i < basket.length; i++){
    basket[i].update();
    basket[i].display();
  }
}

class BouncingBall {
  constructor(x, y){
    this.x = x;
    this.y = y;
    // this.s = 50;
    this.xSpeed = random(1, 5);
    this.ySpeed = random(1, 5);
    this.diaX = 80
    this.diaY = 130
    this.size = random(0.5, 1.5);
    this.r = random(150,255);
    this.g = random(150, 255);
    this.b = random(10, 180);
  }
  update(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    // if (this.x > width - this.s /2 || this.x < this.s / 2){
    //   this.xSpeed = -this.xSpeed;
    // }
    // if (this.y > height - this.s /2 || this.y < this.s / 2){
    //   this.ySpeed = -this.ySpeed;
    // }

    if (this.x > width  || this.x < 0){
      this.xSpeed = -this.xSpeed;
    }
    if (this.y > height  || this.y < 0){
      this.ySpeed = -this.ySpeed;
    }
  }
  display(){
    push();
    translate(this.x, this.y);
    fill(this.r, this.g, this.b, 120);
    scale(this.size)
    noStroke();
    // circle(0, 0, this.s);
    arc(0, 0, this.diaX, this.diaY, PI, 2*PI);
    arc(0, 0, this.diaX, this.diaX, 0, PI);
    pop();
  }
}
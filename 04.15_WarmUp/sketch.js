let balls = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");


}

function draw() {
  background(20, 20, 50);


  let b = new Ball(width / 2, height / 2, 3 * sin(frameCount * 0.01), 3 * cos(frameCount * 0.01));
  balls.push(b)
  
  // display all balls


  

    for (let i = balls.length - 1; i >= 0 ; i--) {
    if(balls[i].x > width + 50 || balls[i].x < -50 || balls[i].y > height + 50 || balls[i].y < -50){
      balls.splice(i, 1);
    }
  }
  //


 

  for(let i = 0; i < balls.length; i++){
    balls[i].update();
    balls[i].display();
  }
  


  // text on canvas
  fill(255);
  textSize(20)
  text("number of balls in array: " + balls.length, 20, 40)
}

class Ball{
  constructor(startX, startY, a, b){
    this.x = startX;
    this.y = startY;
    this.xSpeed = random(a, b);
    this.ySpeed = random(-1, 1);
    this.size = random(5, 20);
    this.dia1 = random(1, 3);
    this.dia2 = random(30, 50);
    
  }
  update(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.size = map(dist(this.x, this.y, width / 2, height / 2), 0, width, this.dia1, this.dia2);
  }
  display(){
    push();
    translate(this.x, this.y);
    fill(255, 200);
    noStroke();
    circle(0, 0, this.size)
    pop();
  }

}
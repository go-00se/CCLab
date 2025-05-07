function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");


  for (i = 0; i < 5; i ++) {
  p = new Pinwheel(width / 2, height / 2);
  }
}

function draw() {
  background(220);


  // get scrolling percentage
  // how much have we scrolled  / entire scrolling space
  let alreadyScrolled = document.getElementById("scrollContainer").scrollTop;
  let entireScrollSpace = document.getElementById("scrollBox").scrollHeight - height;
  let scrollPercentage = alreadyScrolled/entireScrollSpace;
  fill(0)
  textSize(20)
  text(scrollPercentage, 20, 20)

  p.angle = map(scrollPercentage, 0, 1, 0, 360 *120)

  p.update();
  p.display();
}


class Pinwheel {

  constructor (startX, startY, scl) {
    this.x = startX;
    this.y = startY;
    this.angle = 0;
    this.scl = scl;
    this.radius = random(50, 100);
    this.speed = this.radius / 100;
    this.numWings = int(random(3, 6));
  }

update(){

}

display(){

  
  
push();
   translate(this.x, this.y);
   rotate(radians(this.angle)); 

   push();
    strokeWeight(12 * this.speed);
    stroke(0, 0, 0);
    line(0, 0, 0, 3 * this.radius + 1);
  pop();

   strokeWeight(7 * this.speed);
   stroke(153, 92, 10);
   line(0, 0, 0, 3 * this.radius);
  
    

pop();

push();
  translate(this.x, this.y);
  rotate(radians(this.angle) * -0.5); //rotate the pinwheel
  strokeWeight(2)
  
  //create the pinwheel
  push();
    translate(0, 0);
    for (let i = 0; i < this.numWings; i++) {
      rotate(radians(360 / this.numWings));
      this.drWing();
    }
  pop();

  fill("red");
  circle(0, 0, 5);
  pop();
  

  

}

drWing(){
    //small triangle
    fill(102,192,130)
    triangle(0, 0, 0, -this.radius / 2, this.radius / 2, -this.radius / 2);
  
    //big triangle
    fill(29,143,120)
    triangle(0, 0, this.radius / 2, -this.radius / 2, this.radius, 0);
}


}
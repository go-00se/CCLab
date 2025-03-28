let boat1;
let boat2;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  boat1 = new Boat(100, 300);
  boat2 = new Boat(300, 600);
}

function draw() {
  background(100,200,255);

  boat1.display();
  boat2.display();

}

class Boat{
  constructor(posX, posY){
    this.x = posX;
    this.y = posY;
    this.scaleFactor = 1;
    this.speed = 10;
  }

    update(){
      this.x += this.speed;
    }

  display(){
    push();
    translate(this.x, this.y);
    scale(this.scaleFactor);

    // Boat
    textSize(100);
    fill("pink");
    text("BOAT", 0, -20)
    this.drawSail();
    
    fill("red");
    noStroke();
    circle(0, 0, 5);
    pop();
  }

  drawSail(){
  textSize(50)
    text("sail",0, -100)
  }

}
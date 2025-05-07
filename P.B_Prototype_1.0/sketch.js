let dots = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

 
 
  for (let i = 0; i < 1; i++) {
    for(let x = 0; x < width; x+=20){
      for(let y = 0; y < height; y+=20){
        dots.push(new dot(x, y));
      }
    }

  }
}


function draw() {
  background(220);

  for(let i = 0; i < dots.length; i++){
    let d = dots[i];
    d.update();
    d.display();
  }
}

class dot {
  constructor(x, y){

    this.x = x;
    this.y = y;
    this.oriX  = x;
    this.oriY  = y;
    this.scl = 10
    this.destX = random(width);
    this.destY = random(height);

  }

  update(){

    if(mouseIsPressed === true){
      this.x = lerp(this.x, this.destX, 0.05);
      this.y = lerp(this.y, this.destY, 0.05);
    }
     else{
      this.x = lerp(this.x, this.oriX, 0.05);
      this.y = lerp(this.y, this.oriY, 0.05);
    }

  }

  display(){
    fill(0);
    noStroke();
    circle(this.x, this.y, 5);
  }

}
let confettis = [];
let numConfetti = 100;
let bakcgroundHUE;

function setup() {
  noCursor();
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  
  colorMode(HSB);

  bakcgroundHUE = random(0, 255);

}

function draw() {
  let i = bakcgroundHUE * cos(frameCount * 0.002);
  background(i, 10, 180);

  // for(let i = 0; i < 5; i++){
    confettis.push(new Confetti(width/2, height/2));
  // }

  for(let i = 0; i < confettis.length; i++){
    confettis[i].update();
    confettis[i].display();
    confettis[i].checkOutOfCanvas(); 
  }

  //delete the confetti that is out of the canvas
  
  // for (let i = 0; i < confettis.length; i++) {
    for (let i = confettis.length - 1; i >= 0 ; i--) {
    if(confettis[i].onCan == false){
      confettis.splice(i, 1);
    }
  }
  // while(confettis.length > 230){
  //   confettis.splice(0, 1);
  // }

  textAlign(RIGHT, TOP);
  textSize(30);
  text("🎉", mouseX, mouseY);
  // text(confettis.length + 10000,20, 20)


}

class Confetti{
  constructor(startX, startY){
    this.x = mouseX;
    this.y = mouseY;
    this.size = random(2, 10);
    
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);  
    
    this.conHUE = random(0, 255);

    this.conSAT = 90;

    this.conAlpha = 100;

    this.onCan = true;

  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    this.speedY += 0.1;
    this.speedX *= 0.99;

    this.conSAT *= 0.975

    this.conAlpha -= 1.2;

  }
  checkOutOfCanvas(){
    if(this.x < 0 || this.x > width || this.y < 0 || this.y > height + 100){
      this.onCan = false;
    }else{
      this.onCan = true;
    }
  }
  display(){    
    push();
    
    colorMode(HSB);
    
    translate(this.x, this.y);

      fill(this.conHUE, this.conSAT, 100, this.conAlpha);
      noStroke();
      circle(0, 0, this.size);
   
    pop();
  }

}

function mousePressed(){
  for(let i = 0; i < numConfetti; i++){
    confettis.push(new Confetti(width/2, height/2))
  }
}
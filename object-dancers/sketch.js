/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new YourNameDancer(width / 2, height / 2);
  
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class YourNameDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.head = ["😆", "💀", "🙃", "🫥", "😨", "💩","👽", "😇", "😋"];
    this.headX = 0;
    this.headY = -65;
    this.bodyX = 0;
    this.bodyY = 0;
    this.bodyAngle = 0;
    this.bodySpeed = 0.05;
    this.handLX = 0;
    this.handLY = 0;
    this.handPx = 0;
    this.handPy = 0;
    this.handRX = 0;
    this.handRY = 0;
    this.handP1X = 0;
    this.handP1Y = 0;
    this.handP2X = 0;
    this.handP2Y = 0;
    this.feetLX = 0;
    this.feetLY = 0;
    this.feetRX = 0;
    this.feetRY = 0;
    this.body = ["👕"];
    this.feetL = ["👟","👞"];
    this.feetR = ["👟","👞"];
    this.handL = ["🤚", "🖖", "✌️", "🤟" ,"👆"];
    this.handR = ["🤚", "🖖", "✌️", "🤟" ,"👆"];
    this.light = [
      [255,0,255,3],
      [0,255,255,3],
      [255,255,0,3],
      [255,69,0,3],
      [0,255,0,3],
      [255,0,0,3],
      [255,255,255,3],
    ];

    this.handScale = 0;
    this.scale = 0;
    this.goRound = 0;
  
    // add properties for your dancer here:
    //..
    //..
    //..
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour

    // this.bodyX = this.headX;
    // this.bodyY = this.headY + 55;

    
    
    this.bodyAngle = 30 * sin(frameCount * this.bodySpeed);
    this.bodyX = this.headX + sin(radians(this.bodyAngle));
    this.bodyY = this.headY + 55 * cos(radians(this.bodyAngle));
    // this.handLX = this.bodyX - 60;
    // this.handLY = this.bodyY + 30;
    // this.handRX = this.bodyX + 60;
    // this.handRY = this.bodyY + 30;
    this.feetLX = this.bodyX - 20;
    this.feetLY = this.bodyY + 110;
    this.feetRX = this.bodyX + 20;
    this.feetRY = this.bodyY + 110;
    push();
    translate(this.bodyX - 20, this.bodyY);
    this.handP1X = 30 * cos(radians(this.bodyAngle) * 5) + 10;
    this.handP1Y = 30 * sin(radians(this.bodyAngle) * 2) -10;
    pop();
    push();
    translate(this.handP1X, this.handP1Y);
    this.handP2X = 20 * sin(radians(this.bodyAngle)*4) - 12;
    this.handP2Y = 12 * cos(radians(this.bodyAngle) * 5) - 20;
    pop();

    this.handScale = map(abs(this.handP2X - this.x),430, 390, 15, 20);

    this.scale = map(sin(frameCount * 0.02), -1, 1, 1, 1.5);
    this.goRound = map(sin(frameCount * 0.04), -1, 1, -30, 30);

  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
   push();
   translate(this.x, this.y);
   this.drawLight();
  //  this.drawReferenceShapes()
   pop();
  
    push();
    translate(this.x + this.goRound, this.y);
    scale(this.scale * 0.68);
    // console.log(this.handP2X-this.x)

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    this.drawBody();
    this.drawHead();
    this.drawhandL();
    this.drawhandR();
    this.drawFeetL();
    this.drawFeetR();
    
    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
   

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
  drawHead(){
    push();
    textAlign(CENTER, CENTER);
    rotate(radians(this.bodyAngle*0.5));
    textSize(30);
    if (frameCount % 60 == 0) {
      this.head = shuffle(this.head);
    }
    text(this.head[0], this.headX, this.headY);
    pop();
  }
  drawBody(){
    push();
    translate(this.bodyX, this.bodyY);
    rotate(radians(this.bodyAngle));
    textAlign(CENTER, CENTER);
    textSize(60);
    if (frameCount % 60 == 0) {
      this.body = shuffle(this.body);
    }
    text(this.body[0], 0, 0);
    pop();
  }
  drawhandL(){
    push();
    translate(this.handP2X - 20, this.handP2Y);
    textAlign(CENTER, CENTER);
    textSize(this.handScale);
    rotate(radians(this.bodyAngle) * 5 + 1000);
    if (frameCount % 18 == 0) {
      this.handL = shuffle(this.handL);
    }
    text(this.handL[0], 0, 0);
    pop();
  }
  drawhandR(){
    push();
    translate(-this.handP2X + 10, 20 + this.handP2Y);
    textAlign(CENTER, CENTER);
    textSize(this.handScale);
    rotate(radians(this.bodyAngle) * -5);
    if (frameCount % 30 == 0) {
      this.handR = shuffle(this.handR);
    }
    text(this.handR[0], 0, 0);
    pop();
  }
  drawFeetL (){
    push();
    translate(this.feetLX, this.feetLY);
    textAlign(CENTER, BOTTOM);
    textSize(30);
    if (frameCount % 10 == 0) {
      this.feetL = shuffle(this.feetL);
    }
    text(this.feetL[0], 0, 0);  
    pop();
  }
  drawFeetR (){
    push();
    translate(this.feetRX, this.feetRY);
    textAlign(CENTER, BOTTOM);
    textSize(30);
    if (frameCount % 10 == 0) {
      this.feetR = shuffle(this.feetR);
    }
    text(this.feetR[0], 0, 0);  
    pop();
  }
  drawLight (){
    push();
    noStroke();
    
    ellipseMode(CENTER);
    if (frameCount % 80 == 0) {
      this.light = shuffle(this.light);
    }
    fill(this.light[0]);
    for (let i = 100; i >= 20; i -= 2){
    ellipse(0, 0, i, i * 2);
    }
    pop();
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/
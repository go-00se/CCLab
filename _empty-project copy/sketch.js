//chapter0
let titleX = 0;
let titleY = 0;
let noiseBeginX;
let noiseBeginY;
let penTrans0 = 255;
let titleGone = false;

//prologue
let prologue = false;
let penTrans = 0;
let penGone = false;
let penTrans1 = 0;
let penGone1 = false;
let penTrans2 = 0;
let penGone2 = false;
let penTrans3 = 0;
let penGone3 = false;
let penTrans4 = 0;
let penGone4 = false;

//chapter1
let Mosquitos = [];
let worldWidth = 2000;
let worldHeight = 1200;
let worldX = 300;
let worldY = 0;
let scaleM = 0.5;
let startGame = false;
let blood;
let soundRate = 1;
let chapter1 = false;
let transition1 = 0;
let chapter2 = false;
let chapter3 = false;
let killMosquitoes = [];

//monologue
transitionA=0;
transitionB=0;
transitionC=0;
transitionD=0;

//chapter2
let stars = [];
let transition2=0;

//chapter3
let num = 4;
let particles = [];
let eyesNum;
let shake1=0;
let shake2=0;
let endGame = 0;
let videoPlay = false;

//sound control
let bgSoundPlay = false;
let endSoundPlay = false;

function preload()
{
  bgSound = loadSound ("assets/mosquitoSound.wav");
  endSound = loadSound ("assets/distorted.wav");
  videoStreet = createVideo(['assets/street.mp4']);
  videoSize = (2000, 1200);
  videoStreet.hide();
  videoStreet.volume(0); 
  videoStreet.loop();
  const videoElement = document.querySelector('video');
videoStreet.muted = true;
videoStreet.play();
}
function setup() {
    let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  for (let i = 0; i < 510; i++) {
    Mosquitos[i] = new Mosquito();
  
  }
}

function draw() {
  if (titleGone == true)
  {
    penTrans0 -= 2;
  }
  if (penTrans0 <= 0)
  {
    startGame = true;
  }

  if (startGame == false)
    {
      push();
      background(255);
      textAlign(CENTER, CENTER);
      textSize(80);
      noStroke();
      fill(0, penTrans0);
      text ("MOSQUITO", titleX, titleY);
      noiseBeginX = noise(0.03*frameCount);
      noiseBeginY = noise(0.03*frameCount+10000);
      titleX = map (noiseBeginX, 0, 1, 0, 800);
      titleY = map (noiseBeginY, 0, 1, 0, 500);
      
      pop();
    }
  

  if (startGame == true && chapter1 == false &&chapter2 == false &&chapter3 == false)
    {
      prologue = true;
    }
  if (prologue == true)
  {
    background (0, 5);
    textSize(20);
    noStroke();
    fill(255, penTrans);
    textAlign (CENTER, CENTER);
    text ("I'm the one", 400, 250);
    if (penTrans >= 255)
    {
      penGone = true;
    }
    if (penGone == true && penTrans >= -255)
    {
      penTrans -=4;
    }
    if (penGone == false)
    {
      penTrans +=4;
    }
    if (penTrans <-255)
    {
      fill (255, penTrans1)
      text ("I'm the one who brings the world peace", 400, 250);
      if (penTrans1 >= 255)
      {
        penGone1 = true;
      }
      if (penGone1 == true && penTrans1 >= -255)
      {
        penTrans1 -=4;
      }
      if (penGone1 == false)
      {
        penTrans1 +=4;
      }
      if(penTrans1 <-255)
      {
        fill (255, penTrans2)
        text("A world with no mosquito", 400, 250);
        if (penTrans2 >= 255)
        {
          penGone2 = true;
        }
        if (penGone2 == true && penTrans2 >= -255)
        {
          penTrans2 -=4;
        }
        if (penGone2 == false)
        {
          penTrans2 +=4;
        }
        if(penTrans2 <-255)
          {
            fill (255, 0, 0, penTrans3);
            textSize(80);
            text("I HATE MOSQUITOES", 400, 250);
            if (penTrans3 >= 255)
            {
              penGone3 = true;
            }
            if (penGone3 == true && penTrans3 >= 0)
            {
              penTrans3 -=4;
            }
            if (penGone3 == false)
            {
              penTrans3 +=4;

      }
    }
    }


  }
}
if (penTrans3 < 0)
  {
    prologue = false;
    chapter1 = true;
  }

  //chapter1
  if (chapter1 == true)
    {
      push();
      bgSound.rate(soundRate);
  if (bgSoundPlay == false)
  {
    bgSound.loop();
    bgSoundPlay = true;
  }
  soundRate = map (Mosquitos.length, 0, 510, 1.5, 0.3);
  blood = 255-0.5*Mosquitos.length;
  background(255, 255-blood, 255-blood, 255-blood);
  strokeWeight(1);
  stroke(0);
  fill (0);
  textSize(20);
  // text("Patience: ", 60, 20);
  // text (Mosquitos.length, 120, 20);

  push();
  translate(-mouseX + worldX, -mouseY + worldY);
  scale(scaleM);

  rectMode(CORNER);
  rectMode(CENTER);

  // Corrected mouse
  let correctedMouseX = (2*mouseX - worldX) / scaleM;
  let correctedMouseY = (2*mouseY - worldY) / scaleM;
  for (let i = 0; i < Mosquitos.length; i++) {
    Mosquitos[i].update();
    Mosquitos[i].distanceCheck(correctedMouseX, correctedMouseY);
    Mosquitos[i].checkOffCanvas();
    Mosquitos[i].display();
  }
  

  pop(); // end world transformations

  // Remove dead mosquitos
  for (let i = Mosquitos.length - 1; i >= 0; i--) {
    if (Mosquitos[i].offCanvas == true) {
      Mosquitos.splice(i, 1);
    }
  }

  for (let i = killMosquitoes.length - 1; i >= 0; i--) {
    killMosquitoes[i].update();
    killMosquitoes[i].display();

    if (killMosquitoes[i].y > 2000) {
      killMosquitoes.splice(i, 1);
    }
  }
    

  // Navigation keys
  let navigationSpeed = 4;

  if (keyIsDown(65)) { // A
  if (worldX <= 400) {
    worldX += navigationSpeed;
  }
}
if (keyIsDown(87)) { // W
  if (scaleM <= 1.3) {
    scaleM += 0.01;
  }
}
if (keyIsDown(68)) { // D
  if (worldX >= 200) {
    worldX -= navigationSpeed;
  }
}
if (keyIsDown(83)) { // S
  if (scaleM >= 0.5) {
    scaleM -= 0.01;
  }
}

  

  if (Mosquitos.length<=20)
    {
      worldX = random (-100, 100);
      worldY = random (-100, 100);
      transition1+=1;
    }
  
    if (transition1 <800)
    {
  if(transition1 >= 200)
    {
      fill(255, 0, 0);
      rect (0, 0, 2000, 1200);
      fill(0);
      textSize(50);
      text("HAHA!DIEEEE!YOU ******!!!! ", 400, 250)
    }
    if(transition1 >= 300)
      {
        fill(255, 0, 0);
        rect (0, 0, 2000, 1200);
        fill(0);
        textSize(40);
        text("WHY THE SOUND KEEP GOING??????? ", 400, 200)
        text ("WHY IS IT STILL SO ANNOYING??????", 400, 300)
      }
      if(transition1 >= 400)
        {
          fill(255, 0, 0);
          rect (0, 0, 2000, 1200);
          fill(0);
          textSize(40);
          text("WHAT THE ..@!0&^^^^^^^Zzzzzzzzzzt!", 400, 250)
        }
        if(transition1 >= 600)
          {
            fill(255, 0, 0);
            rect (0, 0, 2000, 1200);
            fill(0);
            textSize(100);
            for (let i=0; i<500; i++)
            {
            text ("BzzzzzzzBzzzzzzzzzz", 400, 50*i);
            }

          }
        }
        if (transition1 >= 800)
        {

      chapter1 = false;
      chapter2 = true;
    }
      pop();
}


  if (chapter2 == true)
    {
      background(0, 10);
    soundRate = 30;

  transition2 += 1;
 stroke("green");
  if (transition2<=200)
  {
  for(let i = 0; i < 1; i++){
    stars.push(new Star()) 
  }
}
  
  for(let i = 0; i < stars.length; i++){
    stars[i].update();
    stars[i].display();
  }

  // clean
  for (let i=stars.length-1;i>=0;i--)
  {
    if(stars[i].s>3)
    {
      stars.splice(i,1);
    }
  }
      if (transition2 >= 350)
        {
          chapter2 = false;
          chapter3 = true;
        }
    }
  //chapter3
  if (chapter3 == true)
    {
      push();
      background (0, 10);
      if (endSoundPlay == false)
      {
      endSound.loop();
      endSoundPlay = true;
      }
      bgSound.stop();
      background(100, 3);
   for (let i=0; i< num; i++)
    {
      for (let j=0; j<num; j++)
        {
  particles.push(new particle(100+200*i, 62.5+125*j))
        }
    }
  
  for (i=0; i<particles.length; i++)
    {
  particles[i].display();
  particles[i].checkOffCanvas();
  particles[i].update();
    }
  for (let i=particles.length-1; i>=0; i--)
    {
  if (particles[i].canvas == false)
    {
      particles.splice (i, 1);
    }
    }

    let tx = constrain(shake1 - mouseX, -150, 250);
    let ty = constrain(shake2 - mouseY, -80, 80);
    translate(tx, ty);
shake1 = random (-50, 50);
shake2 = random (-50, 50);
    tint(255, 15);
  if(videoPlay == true)
  {
  image (videoStreet, -200, 0); 
  }


// fill (0, endGame);
// rect(0, 0, 800, 500);
// if (endGame<=10)
// {
// endGame+=0.03;
// }
// if (endGame>=10)
// {
//   endGame += 2;
// }



//   //reset everything
//   if (endGame >= 355)
//   {
// for (let i = 0; i < 510; i++) {
//   Mosquitos[i] = new Mosquito();
// }
// bgSoundPlay == false
// worldWidth = 2000;
// worldHeight = 1200;
// worldX = 300;
// worldY = 0;
// scaleM = 0.5;
// startGame = false;
// blood;
// soundRate = 1;
// chapter1 = false;
// transition1 = 0;
// chapter2 = false;
// chapter3 = false;

// //chapter2
// stars = [];
// transition2=0;

// //chapter3
// endSoundPlay = false;
// num = 4;
// particles = [];
// eyesNum;
// shake1=0;
// shake2=0;
// endGame = 0;

// endSound.stop();
//   }
//       pop();
   }

}




// Mosquito 
class Mosquito {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.size = random(3, 7);
    this.speedM;
    this.rx = random(0, 10000);
    this.ry = random(0, 10000);
    this.posX;
    this.posY;
    this.colorM = 0;
    this.movement = true;
    this.alive = true;
    this.offCanvas = false;
  }

  update() {
    if (this.alive == true) {
      if (this.movement == true) {
        this.speedM = map(Mosquitos.length, 0, 500, 0.01, 0.003);
      } else {
        this.speedM = 0.001;
      }

      let nx = noise(this.rx + this.speedM * frameCount);
      let ny = noise(this.ry + this.speedM * frameCount);

      this.posX = map(nx, 0, 1, 0, worldWidth);
      this.posY = map(ny, 0, 1, 0, worldHeight);

    }
  }

  distanceCheck(mx, my) {
    let distance = dist(this.posX, this.posY, mx, my);
    if (distance < 133) {
      this.movement = false;
      this.colorM = "red";
      if (mouseIsPressed) {
        this.alive = false;
      }
    } else {
      this.movement = true;
      this.colorM = 0;
    }
    if (this.alive == false) {
        this.speedM = 0;
        this.colorM = "red";
        let speedFall = 6;
        this.posY += speedFall;
      }
  }

  checkOffCanvas() {
    if (
      this.posY >= worldHeight-200 ||
      this.posY <= 0 ||
      this.posX >= worldWidth ||
      this.posX <= 0
    ) {
      this.offCanvas = true;
    }
  }

  display() {
    push();
    noStroke();
    fill(this.colorM);
    translate(this.posX, this.posY);
    textSize(this.size);
    text("死", this.x, this.y);
    pop();
  }
}


//chapter2 stars
class Star{
  constructor(){
    this.s = 0.02
    this.a = random(360)
    this.originX = 0;
   // variable point
  }
  update(){
    this.s *= 1.04
    // keep turning vision
    this.originX = lerp(this.originX, width/2, 0.02);
  }
  display(){
    push()
    translate(this.originX, height/2)
    rotate(radians(this.a))
    scale(this.s)

    //noStroke();
    fill (255,0,0);
    stroke(255,0,0);
    textSize(10);
    line (0, 100, 0, 200);
    text ("MOSQUITO", 0, 200);
    pop()
  }
}

//chapter3 particles
class particle
  {
    constructor(sX, sY)
    {
      //basic
      this.startX = sX;
      this.startY = sY;
      this.x = 400;
      this.y = 0;
      this.size = 0.4;
      this.darkness = random (50, 60);
      
      //speed
      this.speedx;
      this.speedy;
      this.noiseValue;
      this.noiseSpeed = 0;
      this.randomNoise = random (-10000, 10000);
      //length
      this.a = random (-100, 0);
      this.b = random (0, 100);
      this.c = random (0, 100);
      this.d = random (0, 100);
      this.weight = 1;
      this.canvas = true;
      this.rotateP = 0.07*frameCount+random(0, 2*PI);
      this.speedC = -100;
    }
    update()
    {
      this.speedC += 1;
      this.noiseSpeed += 0.1;
      this.noiseValue = noise (this.noiseSpeed+this.randomNoise);
      this.speedy = map (this.noiseValue, 0, 1, -5, 5);
      this.y = lerp (this.y, this.speedC, 0.02);
      this.x = lerp (this.x, this.speedC, 0.01);
    }
    checkOffCanvas()
    {
      if (this.speedC >= 50)
        {
          this.canvas = false;
        }
    }
    display()
    {
      push();
      let rotateQ = frameCount;
      translate (this.startX, this.startY);
      rotate(this.rotateP);
      scale(this.size);
      translate (this.x, this.y);
      strokeWeight (this.weight);
      stroke (0, this.darkness);
      line (0, 0, this.a, this.b);
      stroke (255, this.darkness);
      line (0, 0, this.c, this.d);
      pop();
    }
  }


function mousePressed()
{
  if (startGame == false)
  {
   // bgSound.loop();
    titleGone = true;
  }

  if (chapter1 == true)
  {
    let km = new killM(550 - Mosquitos.length);
    killMosquitoes.push(km);
  }

  if (chapter3 == true)
  {
   videoPlay = true;
  }
  
}

class killM 
{
  constructor(textS)
  {
    this.x = random (200, 600);
    this.y = 0;
    this.size = random (0, textS);
    this.a = random();
  }
  update()
  {
    this.y += 10;
  }
  display()
  {
    push();
    noStroke();
    fill(255, 0, 0);
    textSize(0.5*this.size);
    if (this.a<=1/3)
    {
      text("DIEEEEEEE", this.x, this.y);
    }
    if (this.a>1/3 && this.a <= 2/3)
    {
      text ("ANNNNOOOOOYYYYYYYIIIIINNNNGGGG", this.x, this.y);
    }
    if (this.a > 2/3)
    {
      text("I HATE YOUUUUUUUUUU", this.x, this.y);
    }
    }
}
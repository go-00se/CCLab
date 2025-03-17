let rects = []; //rectangles
let numRect = 35; //number of rects
let noiseAmp = 50;
let noiseFreq = 0.14;

//controls the random movement of the "destination" of the group of rects
let cX1 = 200;
let cY1 = 200;
let cX2 = 9;
let cY2 = 5;
let cX3 = 7;
let cY3 = 8;
let spdR = 0.1;
let spdX1 = 2.5;
let spdY1 = 6;
let leftEdge = 50;
let rightEdge = 750;
let upEdge = 0;
let downEdge = 490;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
    noStroke();
    frameRate(60);

  //initalize rect array
  for (let i = 0; i < numRect; i++) {
    rects.push({
      x: random(width),
      y: random(height),
      w: random(10, 30),
      h: random(10, 30),
      vx: 0,
      vy: 0, //initial speed o rect
      k: random(0.79, 0.85), //contol the speed, if k = 1; rect gradually stops at the destination
      eas: random(0.009, 0.067), //the acceleration of the acceleration of the movement
      noiseOffX: random(1000, 2000), //Xposition offset in noise function for every rect
      noiseOffY: random(0, 1000),
      r: random(255),
      g: random(255),
      b: random(255)
    });
  }
}

function draw() {
  
  console.log(numRect)
  background(0);
  noStroke();
  rectMode(CENTER);

  push();
  fill("white")
  textSize(10)
  text('interact with: mouseleft, d and f', 0, 10);
  pop();
  
  cX1 += spdX1;
  cY1 += spdY1;

  cX2 =
    cX1 + random(20, 30) * sin(frameCount * spdR * noise(0.0007 * frameCount));
  cY2 =
    cY1 +
    random(20, 30) *
      cos(frameCount * spdR * noise(0.00018 * frameCount + 1000));
  cX3 =
    cX2 + random(20, 30) * cos((cY2 / 100) * noise(0.00059 * frameCount + 200));
  cY3 =
    cY2 + random(20, 30) * cos((cX2 / 10) * noise(0.0037 * frameCount + 3500));

  if (
    cX1 > rightEdge - 2.5 ||
    cX1 < leftEdge + 2.5 ||
    cX2 > rightEdge - 2.5 ||
    cX2 < leftEdge + 2.5 ||
    cX3 > rightEdge - 2.5 ||
    cX3 < leftEdge + 2.5
  ) {
    spdX1 = -spdX1;
  }
  if (
    cY1 > downEdge - 2.5 ||
    cY1 < upEdge + 2.5 ||
    cY2 > downEdge - 2.5 ||
    cY2 < upEdge + 2.5 ||
    cY3 > downEdge - 2.5 ||
    cY3 < upEdge + 2.5
  ) {
    spdY1 = -spdY1;
  }

  if (mouseIsPressed) {
    // let globalNoiseX = noise(0.0001 * frameCount) * noiseAmp * 2 - noiseAmp;
    // let globalNoiseY = noise(0.0001 * frameCount + 1000) * noiseAmp * 2 - noiseAmp;
    cX1 = lerp(cX1, mouseX, 0.09);
    cY1 = lerp(cY1, mouseY + 8, 0.09);
  }

  for (let r of rects) {
    // let noiseValX = noise(0.0001 * frameCount + rects.noiseOffX, rects.noiseIntensity);
    // let noiseValY = noise(0.0001 * frameCount + rects.noiseOffY, rects.noiseIntensity);
    let noiseX = map(noise(r.noiseOffX), 0, 1, -noiseAmp, noiseAmp);
    let noiseY = map(noise(r.noiseOffY), 0, 1, -noiseAmp, noiseAmp);

    let destX = cX3 + noiseX;
    let destY = cY3 + noiseY;

    let ax = (destX - r.x) * r.eas;
    let ay = (destY - r.y) * r.eas;

    r.vx = r.vx * r.k + ax;
    r.vy = r.vy * r.k + ay;

    r.x += r.vx;
    r.y += r.vy;

    r.noiseOffX += noiseFreq;
    r.noiseOffY += noiseFreq;
    
    r.r += 0.3
    r.b += 0.3
    r.g += 0.3
    
    let rc = noise(r.r) * 255
    let gc = noise(r.g) * 255
    let bc = noise(r.b) * 255
    
    if (numRect < 30){
    fill(0, 0, bc);
    } else if(numRect > 50){
      
      fill(rc,0,0);
      
    } else {
      
      fill(rc);
    }
      
    rect(r.x, r.y, r.w, r.h);
  }
}

function keyPressed() {

  if (key == "f") {

    if (numRect >= 10 && numRect <= 180) {
      numRect += 20;
      //add 10 new ones
      for (let i = 0; i < 10; i++) {
        rects.push({
          x: random(width),
          y: random(height),
          w: random(10, 30),
          h: random(10, 30),
          vx: 0,
          vy: 0,
          k: random(0.79, 0.85),
          eas: random(0.009, 0.067),
          noiseOffX: random(1000, 2000),
          noiseOffY: random(0, 1000),
        });

        for (let r of rects) {
         r.k = random(0.8, 0.95);
        r.eas = random(0.005, 0.02);
        r.k = min(0.95, r.k - 0.05);
        r.eas = max(r.eas, r.eas + 0.0099) // increase eas, prevent too high
        }
        noiseFreq = noiseFreq + 0.4;
        noiseAmp = noiseAmp + 5;
      }
    } else {
      numRect = 100;
    }
  }
  if (key == "d") {
    
    if (numRect > 20 && numRect <= 200) {
      numRect -= 20;
      rects.splice(numRect);
      for (let r of rects) {
        r.k = random(0.8, 0.95);
        r.eas = random(0.005, 0.02);
        r.k = min(0.95, r.k + 0.05);
        r.eas = max(r.eas, r.eas - 0.0099);
      }
      noiseFreq = noiseFreq - 0.4;
      noiseAmp = noiseAmp - 5;
    } else {
      numRect = 20;
    }
  }
}



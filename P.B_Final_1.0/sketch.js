//handPose
let handPose;
let video;
let hands = [];

//pinchDetection()
let distPinch = 0;
let pinchX = 0;
let pinchY = 0;

let scene = 0;
let scenes = [];

let pD;

let adol1, adol2, adol3, adult1, adult2, infant1, infant2, old1, old2;
let page, motor;

let prevPinchX = 0; // 记录上一帧的 pinchX
let prevPinchY = 0; 

function preload() {
  handPose = ml5.handPose("MediaPipeHands", { flipped: true, maxHands: 1 });
  fontRegular = loadFont('assets/HomeVideo-BLG6G.ttf');
  fontBold = loadFont('assets/HomeVideoBold-R90Dv.ttf');
  adol1 = loadImage('assets/adol1.jpg');
  adol2 = loadImage('assets/adol2.jpg');
  adol3 = loadImage('assets/adol3.jpg');
  adult1 = loadImage('assets/adult1.jpg');
  adult2 = loadImage('assets/adult2.jpg');
  infant1 = loadImage('assets/infant1.jpg');
  infant2 = loadImage('assets/infant2.jpg');
  old1 = loadImage('assets/old1.jpg');
  old2 = loadImage('assets/old2.jpg');

  page = loadSound('assets/Page.mp3');
  motor = loadSound('assets/Motor.mp3');

}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  textAlign(CENTER, CENTER);

  //handpose
  video = createCapture(VIDEO, { flipped: true });
  video.size(800, 500);
  video.hide();
  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);

  scenes.push(new Scene0());
  scenes.push(new Scene1());
  scenes.push(new Scene2());
  // scenes.push(new Scene3());

}

function draw() {
  background(0);
  textFont(fontRegular);

  video.loadPixels();


  if (hands.length > 0) {
    let hand = hands[0];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      push();
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
      pop();
    }
  }

  pD = pinchDetection();


  scenes[scene].display();
  scenes[scene].update();

  if (scenes[scene].isFinished) {
    scene++;
    if (scene >= scenes.length) {
      scene = 0;
    }
  }
}

function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}



function pinchDetection() {
  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;

    push();
    noStroke();
    fill("red");

    distPinch = dist(index.x, index.y, thumb.x, thumb.y);

    pop();

   
    let currentPinchX = (index.x + thumb.x) / 2;
    let currentPinchY = (index.y + thumb.y) / 2;

    
    pinchX = lerp(prevPinchX, currentPinchX, 0.2);
    pinchY = lerp(prevPinchY, currentPinchY, 0.2);

    
    prevPinchX = pinchX;
    prevPinchY = pinchY;

    return {
      isPinch: distPinch <= 35,
      pinchX,
      pinchY,
      distPinch,
    };
  }

  return {
    isPinch: false,
    pinchX: 0,
    pinchY: 0,
    distPinch: 0,
  };
}

function calculateMidpoint() {
  if (hands.length > 0) {
    let hand = hands[0]; //
    let keypoint5 = hand.keypoints[5]; // 
    let keypoint17 = hand.keypoints[17];

    // center point of palm
    let midX = (keypoint5.x + keypoint17.x) / 2;
    let midY = (keypoint5.y + keypoint17.y) / 2;

    return {
      x: midX,
      y: midY
    };

  }

  return { x: 0, y: 0 };
}

class Scene0 {
  constructor() {
    this.textPosX = width / 2;
    this.textPosY = height / 2;
    this.waveAlpha = 255; // "WAVE AT ME" 
    this.pinchAlpha = 0;  // "TRY PINCHING" 
    this.goodAlpha = 0;   // "GOOD" 
    this.isFading = false; // "TRY PINCHING" "GOOD" 
    this.finalTimer = 0;
    this.finalState = false;
    this.isFinished = false;


    this.dotGrid = new DotGrid(20, 3);
  }

  update() {
    pD = pinchDetection();

    if (hands.length > 0) {

      this.waveAlpha = max(0, this.waveAlpha - 12);
      this.pinchAlpha = min(255, this.pinchAlpha + 3);


      if (pD.isPinch) {
        this.isFading = true;
      }
    }


    if (this.isFading) {
      this.pinchAlpha = max(0, this.pinchAlpha - 20);
      this.goodAlpha = min(255, this.goodAlpha + 7);
    }

    if (this.goodAlpha === 255) {
      this.finalState = true;
    }

    if (this.finalState === true) {
      this.finalTimer += deltaTime;
      if (this.finalTimer > 700) {
        this.goodAlpha = max(0, this.goodAlpha - 20);
      }

      if (this.goodAlpha === 0) {
        this.isFinished = true;
      }
    }


    this.dotGrid.update();
  }

  display() {

    this.dotGrid.display();

    textSize(80);
    textAlign(CENTER, CENTER);

    fill(255, 255, 255, this.waveAlpha);
    text("WAVE AT ME", this.textPosX, this.textPosY);

    push();
    textSize(50);

    fill(255, 255, 255, this.pinchAlpha);
    text("TRY PINCHING\nYOUR THUMB&INDEX FINGER", this.textPosX, this.textPosY);
    pop();

    fill(255, 255, 255, this.goodAlpha);
    text("NICE", this.textPosX, this.textPosY);
  }
}

class Scene1 {
  constructor() {
    this.isFinished = false;

    this.dotGrid = new DotGrid(20, 3);


    this.textParticles = fontRegular.textToPoints('ABOUT MEMORIES', width / 2 - 213, height / 2, 65, { sampleFactor: 0.2 });
    this.textMove = [];
    for (let i = 0; i < this.textParticles.length; i += 1) {
      let textParticle = this.textParticles[i];
      this.textMove[i] = new TextMove(textParticle.x, textParticle.y, this);
    }
  }

  display() {

    this.dotGrid.display();


    for (let i = 0; i < this.textMove.length; i += 1) {
      this.textMove[i].display();
    }
  }

  update() {

    for (let i = 0; i < this.textMove.length; i += 1) {
      this.textMove[i].update(pD.isPinch);
    }


    this.dotGrid.update();
  }
}

class TextMove {
  constructor(x, y, parentScene) {
    this.posX = x;
    this.posY = y;
    this.isMoving = false;
    this.alpha = 255;
    this.parentScene = parentScene;
  }

  update(isPinch) {
    if (isPinch) {
      this.isMoving = true;
    }

    if (this.isMoving) {
      this.posX = lerp(this.posX, random(this.posX - 20, this.posX + 20), 0.03);
      this.posY = lerp(this.posY, random(this.posY - 20, this.posY + 20), 0.03);
      this.alpha = max(0, this.alpha -= 4);
    }

    if (this.alpha == 0) {
      this.isFinished = true;
      this.parentScene.isFinished = true;
    }
  }

  display() {
    fill(255, 255, 255, this.alpha);
    noStroke();
    circle(this.posX, this.posY, 5);
  }
}

class DotGrid {
  constructor(spacing, dotSize) {
    this.spacing = spacing;
    this.dotSize = dotSize;
    this.dots = [];


    for (let x = 0; x < width; x += this.spacing) {
      for (let y = 0; y < height; y += this.spacing) {
        this.dots.push({ x: x, y: y, size: this.dotSize, color: 50 });
      }
    }
  }

  update() {

    let midpoint = calculateMidpoint();


    for (let dot of this.dots) {
      let distance = dist(dot.x, dot.y, midpoint.x, midpoint.y);


      dot.size = map(distance, 0, width / 2, 7, 2);
      dot.size = constrain(dot.size, 2, 7);


      dot.color = map(distance, 0, width / 2, 200, 50);
      dot.color = constrain(dot.color, 30, 80);
    }
  }

  display() {
    for (let dot of this.dots) {
      fill(dot.color);
      noStroke();
      circle(dot.x, dot.y, dot.size);
    }
  }
}



class Scene2 {
  constructor() {
    this.isFinished = false;


    this.images = [infant1, infant2, adol1, adol2, adol3, adult1, adult2, old1, old2];
    this.currentImageIndex = 0;
    this.dotImage = new DotImage(this.images[this.currentImageIndex], 5);


    this.prevMidX = 0;
    this.prevMidY = 0;
    this.speedThreshold = 300;


    this.lastSwitchTime = 0;
    this.cooldownDuration = 2000;


    this.isMotorPlaying = false;
  }

  update() {

    let midpoint = calculateMidpoint();


    let speedX = midpoint.x - this.prevMidX;
    let speedY = midpoint.y - this.prevMidY;

    this.prevMidX = midpoint.x;
    this.prevMidY = midpoint.y;


    let currentTime = millis();

    
    if (currentTime - this.lastSwitchTime > this.cooldownDuration) {

      if (abs(speedX) > this.speedThreshold) {
        if (speedX > 0) {

          this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
          page.play();
        } else {

          this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
          page.play();
        }


        this.dotImage.updateImage(this.images[this.currentImageIndex]);

        this.lastSwitchTime = currentTime;
      }
    }

    if (pD.isPinch) {
      if (!this.isMotorPlaying) {
        motor.play();
        this.isMotorPlaying = true;
      }
    } else {
      if (this.isMotorPlaying) {
        motor.stop();
        this.isMotorPlaying = false;
      }
    }

    this.dotImage.update(pD.isPinch);
  }

  display() {

    this.dotImage.display();
  }
}

class DotImage {
  constructor(img, spacing) {
    this.img = img;
    this.spacing = spacing;
    this.dots = [];
    this.initializeDots();
  }

  initializeDots() {
    this.dots = [];
    this.img.loadPixels();
    for (let x = 0; x < this.img.width; x += this.spacing) {
      for (let y = 0; y < this.img.height; y += this.spacing) {
        let index = (x + y * this.img.width) * 4;
        let r = this.img.pixels[index];
        let g = this.img.pixels[index + 1];
        let b = this.img.pixels[index + 2];
        let a = this.img.pixels[index + 3];

        let mappedX = random(width / 2 - 10, width / 2 + 10);
        let mappedY = random(height / 2 - 5, height / 2 + 5);


        let gridX = map(x, 0, this.img.width, 110, width - 110);
        let gridY = map(y, 0, this.img.height, 90, height - 90);

        this.dots.push(new Dot(mappedX, mappedY, r, g, b, a, gridX, gridY));
      }
    }
  }

  updateImage(newImg) {
    this.img = newImg;
    this.initializeDots();
  }

  update(isPinch) {

    for (let dot of this.dots) {
      dot.update(isPinch);
    }
  }

  display() {

    for (let dot of this.dots) {
      dot.display();
    }
  }
}

class Dot {
  constructor(x, y, r, g, b, a, gridX, gridY) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;

    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = random(1000);

    this.targetX = x;
    this.targetY = y;

    this.gridX = gridX;
    this.gridY = gridY;
  }

  update(isPinch) {
    if (isPinch) {

      let distance = dist(this.gridX, this.gridY, pD.pinchX, pD.pinchY);


      let maxJitter = map(distance, 0, width / 2, 0.01, 69);
      let jitterX = map(noise(this.noiseOffsetX * 10), 0, 1, -maxJitter, maxJitter);
      let jitterY = map(noise(this.noiseOffsetY * 10), 0, 1, -maxJitter, maxJitter);

      this.targetX = this.gridX + jitterX;
      this.targetY = this.gridY + jitterY;


      this.size = map(distance, 0, width / 2, 13, 0.01);


      this.noiseOffsetX += 0.05;
      this.noiseOffsetY += 0.05;
    } else {

      this.targetX = map(noise(this.noiseOffsetX), 0, 1, 1, width - 1);
      this.targetY = map(noise(this.noiseOffsetY), 0, 1, 1, height - 5);


      this.noiseOffsetX += 0.005;
      this.noiseOffsetY += 0.005;


      this.size = 5;
    }


    this.x = lerp(this.x, this.targetX, 0.05);
    this.y = lerp(this.y, this.targetY, 0.05);
  }

  display() {
    fill(this.r, this.g, this.b, this.a);
    noStroke();
    circle(this.x, this.y, this.size);
  }
}
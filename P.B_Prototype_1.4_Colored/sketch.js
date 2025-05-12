let handPose;
let video;
let hands = [];

let dots = [];

let centerPointX;
let centerPointY;

// fistOrNot();

let ErrorMean = 0;
let distPinch = 0;
let pinchX = 0;
let pinchY = 0;

let MAX_FORCE = 200;
let MIN_FORCE = 0;

let fD, pD;



function preload() {

  handPose = ml5.handPose("MediaPipeHands", { flipped: true, maxHands: 1 });

}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  video = createCapture(VIDEO, { flipped: true });
  video.size(800, 500);
  video.hide();
  // img = createImage(width, height);

  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);

  for (let x = 0; x < width; x += 12) {
    for (let y = 0; y < height; y += 12) {
      dots.push(new dot(x, y));
    }
  }


}


function draw() {
  image(video, 0, 0, width, height);
  background(0);

  video.loadPixels();
  // img.loadPixels();

  noStroke();

  //  video.loadPixels();
  //  img.loadPixels();



  // for (let i = 0; i < hands.length; i++) {
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
  fD = fistDetection();

  for(let i = 0; i < dots.length; i++){
    let d = dots[i];
    d.update();
    d.display();
    // d.color(r, g, b);


  }

  // pinchDetection();
  // fistDetection();

}




function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

class dot {
  constructor(x, y) {
    // const hC = handCenter(); // 调用 handCenter() 获取中心点
    // const centerX = centerPointX;
    // const centerY = centerPointY;

    this.x = x;
    this.y = y;
    this.tarX = x;
    this.tarY = y;
    this.oriX = x;
    this.oriY = y;
    this.xColor = x;
    this.yColor = y;
    this.scl = 10;
    this.ranX = random(width); // 使用 centerX
    this.ranY = random(height); // 使用 centerY

    this.destX = x;
    this.destX = y;
    this.lerpFactor = 0.05;

    this.r = 0;
    this.g = 0;
    this.b = 0;




  }

  update() {

    // let hC = handCenter();
    // let fD = fistDetection(); //fD.isFist
    // let pD = pinchDetection(); //pD.isPinch; pD.pinchX; pD.pinchY;

    // if (pD.isPinch) {
    //   let pinchVec = createVector(pD.pinchX, pD.pinchY); //the vecotr pointing towards the pinch point
    //   let currVec = createVector(this.x, this.y); //current vector
    //   let tarVec = createVector(this.tarX, this.tarY);

    //   let toParticleVec = p5.Vector.sub(currVec, pinchVec);
    //   let distToPinch = toParticleVec.mag();

    //   let toTarVec = p5.Vector.sub(tarVec, currVec);
    //   let distToTar = toTarVec.mag();

    //   let totalForce = createVector(0, 0);

    //   if (distToPinch < 180) {
    //     let push = map(distToPinch, 0, 150, MAX_FORCE, MIN_FORCE);
    //     toParticleVec.setMag(push);
    //     totalForce.add(toParticleVec);
    //   }

    //   if (distToPinch > 0) {
    //     let attract = map(distToTar, 0, 150, MIN_FORCE, MAX_FORCE);
    //     toTarVec.setMag(attract);
    //     totalForce.add(toTarVec);
    //   }

    //   this.x += totalForce.x;
    //   this.y += totalForce.y;

    // } else {
      if (pD.isPinch) {
        // this.x = lerp(this.x, this.destX, 0.05);
        // this.y = lerp(this.y, this.destY, 0.05);
        this.destX = this.ranX;
        this.destY = this.ranY;
      } else {
        // this.x = lerp(this.x, this.oriX, 0.05);
        // this.y = lerp(this.y, this.oriY, 0.05);
        this.destX = this.oriX;
        this.destY = this.oriY;
      }
      // }

      this.x = lerp(this.x, this.destX, this.lerpFactor);
      this.y = lerp(this.y, this.destY, this.lerpFactor);

      let index = (this.xColor + this.yColor * width) * 4

      this.r = video.pixels[index + 0];
      this.g = video.pixels[index + 1];
      this.b = video.pixels[index + 2];
    }

    display() {

      fill(this.r, this.g, this.b)
      noStroke();
      circle(this.x, this.y, 2);
      // console.log(this.r, this.g, this.b)
    }


  }

function fistDetection() {

  // for (let i = 0; i < hands.length; i++) {
  // let hand = hands[i];
  if (hands.length > 0) {
    let hand = hands[0];

    let ErrorSum = 0;
    // for (let j = 0; j < hand.keypoints.length; j++) {
    //   const keypoint = hand.keypoints[j];

    //   let XSum = 0;
    //   let YSum = 0;

    //   XSum =+ keypoint.x;
    //   YSum =+ keypoint.y;

    //    const centerX = XSum / hand.keypoints.length;
    //    const centerY = YSum / hand.keypoints.length;



    //   let errorX = keypoint.x - centerX;
    //   let errorY = keypoint.y - centerY;

    //   let error = sqrt(errorX * errorX + errorY * errorY);
    //   ErrorSum =+ error;
    // }

    //  ErrorMean = ErrorSum / hand.keypoints.length;

  }

  // console.log(ErrorMean);

  return {
    isFist: ErrorMean >= 25,
  };
}



function pinchDetection() {

  // for (let i = 0; i < hands.length; i++) {

  //   let hand = hands[i];
  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;

    noStroke();
    fill(0, 255, 255);
    fill("red")



    distPinch = dist(index.x, index.y, thumb.x, thumb.y);

    // if(d < 18){
    //   fill("yellow")
    // }

    circle(index.x, index.y, 10);
    circle(thumb.x, thumb.y, 10);

    pinchX = (index.x + thumb.x) / 2;
    pinchY = (index.y + thumb.y) / 2;



  }

  return {
    isPinch: distPinch <= 18,
    pinchX,
    pinchY,
  };

}



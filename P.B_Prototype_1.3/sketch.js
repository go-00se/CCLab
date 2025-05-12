let handPose;
let video;
let hands = [];

let dots = [];
let colors = [];

let centerPointX;
let centerPointY;

// fistOrNot();

let ErrorMean = 0;

let cols =  0;
let rows = 0;

function preload() {
  
  handPose = ml5.handPose("MediaPipeHands", { flipped: true});

}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  video = createCapture(VIDEO, { flipped: true});
  video.size(640, 480);
  video.hide();
  img = createImage(width, height);

   // Start detecting hands from the webcam video
   handPose.detectStart(video, gotHands);

  for (let i = 0; i < 1; i++) {
    for(let x = 0; x < width; x+= 30){
      for(let y = 0; y < height; y+= 30){
        dots.push(new dot(x, y));
      }
    }

  }
  cols = floor(width / scl) + 1;
  rows = floor(height / scl) + 1
}


function draw() {
  // image(video, 0, 0, width, height);
  background(220);

  noStroke();

//  handCenter();
 fistDetection();

 video.loadPixels();
 img.loadPixels();


for (let y = 0; y < rows; y++){
  for(let x = 0; x< cols; x++){
    var index = x + y * rows
  }
}
 

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      push();
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
      pop();
    }
  }
  
  // for(let x = 0; x < width; x+= 20){
  //   for(let y = 0; y < height; y+= 20){

  // for(let i = 0; i < dots.length; i++){
  //   let d = dots[i];

  //   let index = (y + x * img.height) * 4;


  //   let r = video.pixels[index + 0];
  //   let g = video.pixels[index + 1];
  //   let b = video.pixels[index + 2];

  //   d.color(r, g, b);
  // }
  //   }
  // }


  for(let i = 0; i < dots.length; i++){
    let d = dots[i];
    d.update();
    d.display();
    // d.color(r, g, b);

  
  }

}


// class dot {
//   constructor(x, y){

// const hC = fistDetection();
// const centerX = centerPointX;
// const centerY = centerPointY;

//     this.x = x;
//     this.y = y;
//     this.oriX  = x;
//     this.oriY  = y;
//     this.scl = 10
//     this.destX = random(centerX -200, centerX + 200);
//     this.destY = random(centerY -200, centerY + 200);

    

//   }

//   update(){
//     let hC = handCenter();
//     let fD = fistDetection();
//     // if(mouseIsPressed === true){
//     //   this.x = lerp(this.x, this.destX, 0.05);
//     //   this.y = lerp(this.y, this.destY, 0.05);
//     // }
//     //  else{
//     //   this.x = lerp(this.x, this.oriX, 0.05);
//     //   this.y = lerp(this.y, this.oriY, 0.05);
//     // }

//     if(fD.isFist){
//       this.x = lerp(this.x, this.destX, 0.05);
//       this.y = lerp(this.y, this.destY, 0.05);
//     }
//      else{
//       this.x = lerp(this.x, this.oriX, 0.05);
//       this.y = lerp(this.y, this.oriY, 0.05);
//     }

//   }

//   display(){
//     fill(0);
//     noStroke();
//     circle(this.x, this.y, 5);
//   }

// }

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
    this.oriX = x;
    this.oriY = y;
    this.scl = 10;
    this.destX = random(width); // 使用 centerX
    this.destY = random(height); // 使用 centerY


  }

  update() {
    // video.loadPixels();
    // img.loadPixels();

    let hC = handCenter();
    let fD = fistDetection();

    if (fD.isFist) {
      this.x = lerp(this.x, this.destX, 0.05);
      this.y = lerp(this.y, this.destY, 0.05);
    } else {
      this.x = lerp(this.x, this.oriX, 0.05);
      this.y = lerp(this.y, this.oriY, 0.05);
    }
  }

  display() {
    // video.loadPixels();
    // img.loadPixels();

    
    // let index = (x + y * img.width) * 4;


    // let r = video.pixels[index + 0];
    // let g = video.pixels[index + 1];
    // let b = video.pixels[index + 2];

    fill(0);
    noStroke();
    circle(this.x, this.y, 5);
  }

  color() {

    let r = 0;
    let g = 0; 
    let b = 0;

    let index = x + y * col
    // let index = (this.y + this.x * img.height) * 4;

    // this.r = video.pixels[index + 0];
    // this.g = video.pixels[index + 1];
    // this.b = video.pixels[index + 2];

    // console.log(this.r, this.g, this.b);
    // console.log(index);

}
}

function fistDetection() {
 
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let ErrorSum = 0;
    for (let j = 0; j < hand.keypoints.length; j++) {
      const keypoint = hand.keypoints[j];

      let XSum = 0;
let YSum = 0;


      XSum =+ keypoint.x;
      YSum =+ keypoint.y;

       const centerX = XSum / hand.keypoints.length;
       const centerY = YSum / hand.keypoints.length;

  
      
      let errorX = keypoint.x - centerX;
      let errorY = keypoint.y - centerY;
      
      let error = sqrt(errorX * errorX + errorY * errorY);
      ErrorSum =+ error;
    }

     ErrorMean = ErrorSum / hand.keypoints.length;
  
  }

  // console.log(ErrorMean);
  
  return {
    isFist: ErrorMean >= 19,
  };
}

// function handCenter() {

//   for (let i = 0; i < hands.length; i++) {
//     let hand = hands[i];
//     for (let j = 0; j < hand.keypoints.length; j++) {

//       const midPointX = (hand.keypoints[5].x + hand.keypoints[17].x) / 2;
//       const midPointY = (hand.keypoints[5].y + hand.keypoints[17].y) / 2;
      
//       centerPointX = (hand.keypoints[0].x + midPointX) / 2;
//       centerPointY = (hand.keypoints[0].y + midPointY) / 2;

//     }



//   }


// }

function handCenter() {

  while (hands.length > 0) {  
  let hand = hands[0]; // 假设只处理第一只手
    const midPointX = (hand.keypoints[5].x + hand.keypoints[17].x) / 2;
    const midPointY = (hand.keypoints[5].y + hand.keypoints[17].y) / 2;

    centerPointX = (hand.keypoints[0].x + midPointX) / 2;
    centerPointY = (hand.keypoints[0].y + midPointY) / 2;

    return {
      centerX: centerPointX,
      centerY: centerPointY,
    };
  }

}
let handPose;
let video;
let hands = [];

let dots = [];

let posX = 0;
let posY = 0;
let originX = 0;
let originY = 0;
let scl = 20;
let destX, destY;

let centerPointX;
let centerPointY;

// fistOrNot();

let ErrorMean = 0;

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


}


function draw() {
  // image(video, 0, 0, width, height);
  background(220);

  noStroke();

//  handCenter();
 fistDetection();

 video.loadPixels();
 img.loadPixels();
 


  
  for(let x = 0; x < width; x+= scl * 2){
    for(let y = 0; y < height; y+= scl * 2){


    let index = (y + x * img.height) * 4;


    let r = video.pixels[index + 0];
    let g = video.pixels[index + 1];
    let b = video.pixels[index + 2];

      fill(r, g, b);
      ellipse(x ,y, scl, scl);

    }
  }


}



function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
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
let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false
 };

function preload() {
  // Load the faceMesh model
  faceMesh = ml5.faceMesh(options);
}

let stars = [];
function setup() {
  
  let canvas = createCanvas(windowWidth, windowHeight); // fullscreen!
  canvas.parent("p5-canvas-container");
  // p.push(new Poi())
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  background(0, 90);

    // Draw the webcam video
    image(video, 0, 0, width, height);

    // Draw all the tracked face points
    push();
    for (let i = 0; i < faces.length; i++) {
      let face = faces[i];
      for (let j = 0; j < face.keypoints.length; j++) {
        let keypoint = face.keypoints[j];
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 5);
      }
    }
    pop();

  for(let i = 0; i < 1; i+=100){
    stars.push(new Star()) 
  }
  for(let i = 0; i < stars.length; i++){
    stars[i].update();
    stars[i].display();

    
  }

  // clean

  for(let i = stars.length- 1; i >= 0; i--){
    if(stars[i].s > 10){
      stars.splice(i, 1)
    }
  }

  // console.log(stars.length)

}

class Star{
  constructor(){
    this.s = 0.02
    this.a = 360 *  sin( random(0,0.314) +  frameCount * 0.01)
    this.originX = mouseX; // variable point
  }
  update(){
    this.s *= 1.04
    // keep turning vision
    this.originX = lerp(this.originX, width/2, 0.01)

  }
  display(){
    push()
    translate(this.originX, height/2)
    rotate(radians(this.a))
    scale(this.s)

    noStroke();
    circle(0, 200, 5)
    circle(200, 0, 5)
    circle(0, -200, 5)
    circle(-200, 0, 5)
    stroke(255);
    strokeWeight(2);
    // textSize(20);
    // textAlign(CENTER);
    // text('O', 0, 0);
    pop()
  }
}

function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}
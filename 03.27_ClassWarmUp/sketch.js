let posX = [];
let vib = 0;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < 100; i++){
    posX.push(5 + i * 25);
  }
}

function draw() {
  background(0);
  noStroke();

  
  for (let i = 0; i < posX.length; i++) {
    vib = map(noise(frameCount + posX[i] * 10, 0.006, 0.006), 0,1 ,-2, 2);
    rect(posX[i] + vib, height / 2 + vib * 10, 10, 10);
  }
  
}

function mousePressed() {
  posX.push(mouseX);
}
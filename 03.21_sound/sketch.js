let kick;

function preload() {
  kick = loadSound("assets/sounds/kick.mp3");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background('white');
  textSize(400);
  text('🔊', 100, 400);


}

function mousePressed() {
  for(let i; i<=100; i++) {
  kick.play();

  }
  
}
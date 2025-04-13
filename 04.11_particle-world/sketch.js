// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 10; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 500; // Decide the maximum number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  noStroke();

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(860, 182, 0, 530, 269, 15, 0, 0.015);
  }
}

function draw() {
  background(0);

  // consider generating particles in draw(), using Dynamic Array

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }

  // limit the number of particles
  if (particles.length > MAX_OF_PARTICLES) {
    particles.splice(0, 1); // remove the first (oldest) particle
  }
}

class Particle {
  // constructor function
  constructor(a, b, angle, posX, posY, size, delta, speed) {
    // properties (variables): particle's characteristics
    this.a = a;
    this.b = b;
    this.angle = angle;
    this.posX = posX;
    this.posY = posY;
    this.delta = delta;
    this.size = size;

    this.x = 0;
    this.y = 0;

    this.rotatedX = 0;
    this.rotatedY = 0; 

    this.speed = speed
  }
  // methods (functions): particle's behaviors
  update() {
    // (add) 
  this.x = this.a * cos(this.delta);
  this.y = this.b * sin(this.delta);
  this.rotatedX = this.x * cos(this.angle) - this.y * sin(this.angle);
  this.rotatedY = this.x * sin(this.angle) + this.y * cos(this.angle);
  this.delta += this.speed;
  }
  display() {
    // particle's appearance
    push();
    translate(this.posX, this.posY);

    noStroke();
    fill(255, 255, 255);

    circle(this.rotatedX, this.rotatedY, this.size);
    
    

    pop();
  }
}
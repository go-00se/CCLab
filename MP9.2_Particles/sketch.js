// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 4000; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 500; // Decide the maximum number of particles.

let particles = [];

let scl = 20;
let cols, rows;

let xoff = 0;
let yoff = 0;
let zoff = 0;

let delta = 0.1;

let intensity = 0.0075;

let vectors = [];
let index;

let v, angle;
let force;

let maxForce = 15;
let minForce = 1;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

    // generate particles
   

    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
      
      particles[i] = new Particle();
    }
  
  // grids' szie
  cols = floor(width / scl) + 1;
  rows = floor(height / scl) + 1;
  // frameRate(30);

}


function draw() {
  
  background(0, 70);

  // rand wave ---->
  //grids
  yoff = 0
  for (let y = 0; y < rows; y++) {
    xoff = 0;
   for (let x = 0; x < cols; x++) {
     let angle = noise(xoff, yoff, zoff) * TWO_PI;
     let v = p5.Vector.fromAngle(angle);
    v.setMag(0.43)
     

     //draw vector
    //  stroke(0);
    //  push();
    //  translate(x * scl, y * scl);
    //  rotate(v.heading());
    //  strokeWeight(1);
    //  line(0, 0, scl, 0);
    //  pop();
    
   

     xoff += delta;

     var index = x + y * cols; 
     vectors[index] = v; // store the vector in the array

   }

   yoff += delta;

   //the time-demension of noise
   zoff += intensity;

 }



  // consider generating particles in draw(), using Dynamic Array

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.follow(); // follow the vector
    p.update();
    p.display();
    p.checkOutOfCanvas();
    
    if (mouseIsPressed == true){p.Interact()};
  }

 
  for (let i = particles.length - 1; i >= 0 ; i--) {
    if(particles[i].onCan == false){
      particles.splice(i, 1);
    }
  }


}


class Particle {
  // constructor function
  constructor() {
    // properties (variables): particle's characteristics
    
    this.x = random(width);
    this.y = random(height);

    this.velX = 0;
    this.velY = 0;


    this.pos = createVector(this.x, this.y);
    this.vel = createVector(this.velX, this.velY);
    this.acc = createVector(0, 0);

    this.PrevX = this.pos.x;
    this.PrevY = this.pos.y;
  } 
  // methods (functions): particle's behaviors
  update() {
    // (add) 
    
     // set the acceleration to the vector
    this.vel.add(this.acc);
    this.pos.add(this.vel);

     // reset acceleration
     
   
    this.acc.mult(0);
     this.vel.limit(5);

     this.PrevX = this.pos.x;
     this.PrevY = this.pos.y;

  }
  display() {
    // particle's appearance
    push();
    translate(this.pos.x, this.pos.y);

    strokeWeight(1);
    colorMode(HSB);
    fill(this.vel.x * 13 + 250, this.vel.y * 18 + 20, 100);
    stroke(this.vel.x * 13 + 250, this.vel.y * 18 + 20, 100);
    circle(0,0,0.5)
    line(this.PrevX, this.PrevY, this.pos.x, this.pos.y);

    pop();

  }

  follow() {
    // follow the vector
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.acc.add(force);
  }

  checkOutOfCanvas(){
   if (this.pos.x < 0){
      this.pos.x = random(width - scl * 5, width);
   } else if (this.pos.x > width){
    this.pos.x = random(0, scl * 5);
 }else if (this.pos.y < 0){
    this.pos.y = random(height - scl * 5, height);
  }else if (this.pos.y > height){
    this.pos.y = random(0, scl * 5);
  }

}

Interact(){

  // if (dist(mouse, particle) < n ) {reject} else {attract}
  let x = floor(this.pos.x / scl);
  let y = floor(this.pos.y / scl);
  let index = x + y * cols;
  let force = vectors[index];

  let distMouseToParticle = dist(mouseX, mouseY, this.pos.x, this.pos.y);

  if (distMouseToParticle < scl * 1.8){
    let reject = map(distMouseToParticle, 0, 100, maxForce, minForce);
    this.acc.add(force.mult(-reject));
  } 
  
 

}
}
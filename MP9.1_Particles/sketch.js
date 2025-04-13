let scl = 40;
let cols, rows;

let xoff = 0;
let yoff = 0;
let zoff = 0;

let delta = 0.1;

let intensity = 0.0008;


let v, angle;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // grids' szie
  cols = floor(width / scl) + 1;
  rows = floor(height / scl) + 1;
  // frameRate(5);

}

function draw() {
  background(220);

  // rand wave ---->
  //grids
  yoff = 0
  for (let y = 0; y < rows; y++) {
    xoff = 0;
   for (let x = 0; x < cols; x++) {
     angle = noise(xoff, yoff, zoff) * TWO_PI;
     v = p5.Vector.fromAngle(angle);

     

     //draw vector
     stroke(0);
     push();
     translate(x * scl, y * scl);
     rotate(v.heading());
     strokeWeight(1);
     line(0, 0, scl, 0);
     pop();
    
   

     xoff += delta;

   }

   yoff += delta;

   //the time-demension of noise
   zoff += intensity;

 }


// synced wave ---->
//   //grids
  
//   for (let y = 0; y < rows; y++) {
//     xoff = 0;
//    for (let x = 0; x < cols; x++) {
//      angle = noise(xoff, yoff, zoff) * TWO_PI;
//      v = p5.Vector.fromAngle(angle);

     

//      //draw vector
//      stroke(0);
//      push();
//      translate(x * scl, y * scl);
//      rotate(v.heading());
//      strokeWeight(1);
//      line(0, 0, scl, 0);
//      pop();
    
   

//      xoff += delta;

//      yoff = 0

//    }

//    yoff += delta;

//    //the time-demension of noise
//    zoff += intensity;

//  }
  

}
// let greetings1 = "hi";
// let greetings2 = "halou";

let randomIndex;

let greetings = ["hi", "halou", "hello", "泥嚎", "wabaubdc","Bonjour", "Hola", "Ciao", ":D"] ;
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  randomIndex = floor(random(greetings.length));
}

function draw() {
  background(190);

  textSize(20);

for (let i = 0; i < greetings.length; i++) {

  // if(i == 0){
  //   fill("red");
  // }else if(i == greetings.length - 1){

  //   fill("blue");
  // }
  // else{
  //   fill("black");
  // }
  if (i == randomIndex){
    fill("yellow");
  }else{
  fill(i * 30, i* 10 + 20, i* 20 + 50);
  }
  text(greetings[i], width/2, 120 + i*20);
}


}
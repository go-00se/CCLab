let cX1 = 200;
let cY1 = 200;
let cX2 = 9;
let cY2 = 5;
let cX3 = 7;
let cY3 = 8;

let spdR = 0.1;
let spdX1 = 2;
let spdY1 = 7;
let leftEdge = 50;
let rightEdge = 350;
let upEdge = 0;
let downEdge = 400;

let w, h;
let posX = 0;
let posY = 0;
let slideX, slideY;

let vx = 0;
let vy = 0;
let k = 0.8;
let eas = 0.05;

let dense = 3;
let size = 3;

let count = 0;
let cRad = 30;
let squareSize = 30;

let alp = 0;

let lastTextUpdate = 0;

// 存储方块
let square0 = { active: false, x: 0, y: 0, speedX: 0, speedY: 0 };
let square1 = { active: false, x: 0, y: 0, speedX: 0, speedY: 0 };
let square2 = { active: false, x: 0, y: 0, speedX: 0, speedY: 0 };
let square3 = { active: false, x: 0, y: 0, speedX: 0, speedY: 0 };
let square4 = { active: false, x: 0, y: 0, speedX: 0, speedY: 0 };

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
  frameRate(30);
  textStyle(BOLD);
}

function draw() {
  background(0, 80);
  rectMode(CENTER);

  glitch(dense, size, 0, 120, 0);
  glitch(dense, size + 2, 0, 255, 0);

  if (count <= 10) {
    fill(10, 25); // 半透明黑色
    // rect(0, 0, width, height);

    // 每100毫秒更新一次文字（10 FPS）
    if (millis() - lastTextUpdate > 100) {
      drawText();
      lastTextUpdate = millis();
    }
    // 更新上次文字更新的时间

    if (mouseIsPressed === true) {
      if (frameCount % 60 === 0) {
        if (!square0.active) initSquare(square0);
        else if (!square1.active) initSquare(square1);
        else if (!square2.active) initSquare(square2);
        else if (!square3.active) initSquare(square3);
        else if (!square4.active) initSquare(square4);
      }

      updateSquare(square0);
      updateSquare(square1);
      updateSquare(square2);
      updateSquare(square3);
      updateSquare(square4);

      push();
      textSize(100);
      textAlign(CENTER, CENTER);
      text(count, width / 2, height / 2);
      pop();

      fill(0, 255, 0, 100);
      noStroke();
      circle(cX3, cY3, cRad * 2);
    }
  } else {
    fill(0, 255, 0, alp + 5);
    noStroke();

    rectMode(CENTER);
    rect(width / 2, height / 2, 800, 600);

    alp = min(alp + 10, 255);
  }
}

//             0(chaos level)      0
function glitch(dense, size, cr, cg, cb) {
  noStroke();

  destX = mouseX;
  destY = mouseY;
  if (mouseIsPressed === true) {
    cX1 = lerp(cX1, destX + 15, 0.3);
    cY1 = lerp(cY1, destY, 0.4);
    // line(cX3, cY3, mouseX, mouseY)
  } else {
    cX1 = cX1 + spdX1;
    cY1 = cY1 + spdY1;
  }

  cX2 = cX1 + 20 * sin(frameCount * spdR * noise(0.0005 * frameCount));
  cY2 = cY1 + 20 * cos(frameCount * spdR);
  cX3 = cX2 + 30 * cos(cY2 / 100);
  cY3 = cY2 + 30 * cos(cX2 / 10);

  // console.log(noise(0.005 * frameCount));

  if (
    cX1 > rightEdge - 2.5 ||
    cX1 < leftEdge + 2.5 ||
    cX2 > rightEdge - 2.5 ||
    cX2 < leftEdge + 2.5 ||
    cX3 > rightEdge - 2.5 ||
    cX3 < leftEdge + 2.5
  ) {
    // speed turns negative
    spdX1 = -spdX1;
    // leftEdge = random(10, 80);
  }
  if (
    cY1 > downEdge - 2.5 ||
    cY1 < upEdge + 2.5 ||
    cY2 > downEdge - 2.5 ||
    cY2 < upEdge + 2.5 ||
    cY3 > downEdge - 2.5 ||
    cY3 < upEdge + 2.5
  ) {
    // speed turns negative
    spdY1 = -spdY1;
  }

  //   fill("red");
  //   circle(cX1, cY1, 5);
  //   line(cX1, cY1,cX2, cY2);

  //   fill(0);
  //   circle(cX2, cY2, 5);
  // line(cX2,cY2, cX3, cY3 );
  noStroke();

  cX2 = cX2 + spdR;

  //    let ax = (destX - x) * eas;
  //     let ay = (destY - y) * eas;

  //     vx = vx * k + ax;
  //     vy = vy * k + ay;

  //     x += vx;
  //     y += vy;

  stroke(0, 255, 0);

  for (let a = 0; a <= random(dense, dense + count * 4); a += 5) {
    for (let i = 0; i <= random(5, 25); i += 10) {
      posX = lerp(posX, cX3, 0.08);
      posY = lerp(posY, cY3, 0.08);

      px = random(posX - random(3, 10) - size, posX + random(3, 10) * 2 + size);

      py = random(posY - random(3, 10) - size, posY + random(3, 10) * 2 + size);

      //       x = random(100, 90);

      //     y = random(100, 90);

      w = random(i + size, i + 15 + size);

      h = random(i + size, i + 15 + size);

      fill(cr, cg, cb);
      push();
      textFont("Monospace", 20);
      text("0", px, py, w, h);
      text("1", px - 10, py + 10, w, h);
      pop();
    }
  }
}
// function
function initSquare(sq) {
  const edge = floor(random(4));
  sq.active = true;

  if (edge === 0) {
    // 左边缘
    sq.x = -squareSize;
    sq.y = random(height);
    sq.speedX = random(1, 3);
    sq.speedY = random(-1, 1);
  } else if (edge === 1) {
    // 右边缘
    sq.x = width;
    sq.y = random(height);
    sq.speedX = random(-3, -1);
    sq.speedY = random(-1, 1);
  } else if (edge === 2) {
    // 上边缘
    sq.x = random(width);
    sq.y = -squareSize;
    sq.speedX = random(-1, 1);
    sq.speedY = random(1, 3);
  } else if (edge === 3) {
    // 下边缘
    sq.x = random(width);
    sq.y = height;
    sq.speedX = random(-2, 2);
    sq.speedY = random(-4, -2);
  }
}

function updateSquare(sq) {
  if (!sq.active) return;

  // 更新位置
  sq.x += sq.speedX;
  sq.y += sq.speedY;

  // 绘制方块
  fill(0, 255, 0);
  if (random() < 0.6) {
    text("0", sq.x, sq.y, squareSize, squareSize);
  } else {
    text("1", sq.x, sq.y, squareSize, squareSize);
  }

  // 碰撞检测
  const centerX = sq.x + squareSize / 2;
  const centerY = sq.y + squareSize / 2;
  if (dist(centerX, centerY, cX3, cY3) < cRad + squareSize / 2) {
    sq.active = false;
    count++;
    size = count * 50;
    dense = count * 50;
    cRad = count * 50;
  }

  // 边界检测
  if (
    sq.x < -squareSize * 2 ||
    sq.x > width + squareSize * 2 ||
    sq.y < -squareSize * 2 ||
    sq.y > height + squareSize * 2
  ) {
    sq.active = false;
  }
}

function keyPressed() {
  if (key === " ") {
    count = 0;
    // 重置所有方块状态
    square0.active = square1.active = square2.active = square3.active = square4.active = false;
  }
}

function drawText() {
  textSize(15);
  noStroke();
  push();
  fill(20, 100, 20); // 文字
  const noiseScale = 0.9 + 0.05 * count; // 控制噪声空间尺度
  const timeScale = 0.05 + 0.02 * count; // 控制噪声变化速度

  for (let i = 0; i < width; i += 20) {
    for (let j = 0; j < height; j += 20) {
      const n = noise(i * noiseScale, j * noiseScale, millis() * timeScale);

      if (n > 0.75) {
        const char = String.fromCharCode(0x30a0 + round(random(0, 96)));
        text(char, i, j);
      }
    }
  }
  pop();
}

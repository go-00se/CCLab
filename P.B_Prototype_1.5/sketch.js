//handPose
let handPose;
let video;
let hands = [];

//pinchDetection()
let distPinch = 0;
let pinchX = 0;
let pinchY = 0;

let scene = 0;
let scenes = [];

let pD;

let adol1, adol2, adol3, adult1, adult2, infant1, infant2, old1, old2;

function preload() {
  handPose = ml5.handPose("MediaPipeHands", { flipped: true, maxHands: 1 });
  fontRegular = loadFont('assets/HomeVideo-BLG6G.ttf');
  fontBold = loadFont('assets/HomeVideoBold-R90Dv.ttf');
  adol1 = loadImage('assets/adol1.jpg');
  adol2 = loadImage('assets/adol2.jpg');
  adol3 = loadImage('assets/adol3.jpg');
  adult1 = loadImage('assets/adult1.jpg');
  adult2 = loadImage('assets/adult2.jpg');
  infant1 = loadImage('assets/infant1.jpg');
  infant2 = loadImage('assets/infant2.jpg');
  old1 = loadImage('assets/old1.jpg');
  old2 = loadImage('assets/old2.jpg');
  

}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  textAlign(CENTER, CENTER);

  //handpose
  video = createCapture(VIDEO, { flipped: true });
  video.size(800, 500);
  video.hide();
  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);

  // scenes.push(new Scene0());
  // scenes.push(new Scene1());
  scenes.push(new Scene2());
  // scenes.push(new Scene3());

}

function draw() {
  background(0);
  textFont(fontRegular);

  video.loadPixels();

  // 绘制关键点
  if (hands.length > 0) {
    let hand = hands[0];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      push();
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
      pop();
    }
  }

  pD = pinchDetection();

  // 更新点阵背景


  // 场景显示和更新
  scenes[scene].display();
  scenes[scene].update();

  if (scenes[scene].isFinished) {
    scene++;
    if (scene >= scenes.length) {
      scene = 0;
    }
  }
}

function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

function pinchDetection() {
  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;

    push();
    noStroke();
    fill("red");

    distPinch = dist(index.x, index.y, thumb.x, thumb.y);

    circle(index.x, index.y, 10);
    circle(thumb.x, thumb.y, 10);

    pop();

    pinchX = (index.x + thumb.x) / 2;
    pinchY = (index.y + thumb.y) / 2;

    return {
      isPinch: distPinch <= 35, // 当距离小于 35 时，认为是 Pinch 手势
      pinchX,
      pinchY,
      distPinch,
    };
  }

  // 如果没有检测到手，返回默认值
  return {
    isPinch: false,
    pinchX: 0,
    pinchY: 0,
    distPinch: 0,
  };
}

function calculateMidpoint() {
  if (hands.length > 0) {
    let hand = hands[0]; // 获取第一只手
    let keypoint5 = hand.keypoints[5]; // 获取 keypoint[5]
    let keypoint17 = hand.keypoints[17]; // 获取 keypoint[0]

    // 计算中点坐标
    let midX = (keypoint5.x + keypoint17.x) / 2;
    let midY = (keypoint5.y + keypoint17.y) / 2;

    return {
      x: midX,
      y: midY
    };
    // 返回中点坐标
  }

  // 如果没有检测到手，返回默认值
  return { x: 0, y: 0 };
}

class Scene0 {
  constructor() {
    this.textPosX = width / 2; // 居中显示
    this.textPosY = height / 2;
    this.waveAlpha = 255; // "WAVE AT ME" 的初始透明度
    this.pinchAlpha = 0;  // "TRY PINCHING" 的初始透明度
    this.goodAlpha = 0;   // "GOOD" 的初始透明度
    this.isFading = false; // 控制 "TRY PINCHING" 和 "GOOD" 的切换
    this.finalTimer = 0;
    this.finalState = false;
    this.isFinished = false;

    // 初始化点阵背景
    this.dotGrid = new DotGrid(20, 3); // 间距为 20，点大小为 3
  }

  update() {
    pD = pinchDetection();

    if (hands.length > 0) {
      // 检测到手时，"WAVE AT ME" 渐隐，"TRY PINCHING" 渐显
      this.waveAlpha = max(0, this.waveAlpha - 12); // 逐渐减少透明度
      this.pinchAlpha = min(255, this.pinchAlpha + 3); // 逐渐增加透明度

      // 如果 "TRY PINCHING" 已完全显示，并且 isPinch 为 true
      if (pD.isPinch) {
        this.isFading = true; // 设置为 true，触发 "GOOD" 的显示逻辑
      }
    }

    // 当 isFading 为 true 时，切换到 "GOOD"
    if (this.isFading) {
      this.pinchAlpha = max(0, this.pinchAlpha - 20); // 逐渐减少 "TRY PINCHING" 的透明度
      this.goodAlpha = min(255, this.goodAlpha + 7); // 逐渐增加 "GOOD" 的透明度
    }

    if (this.goodAlpha === 255) {
      this.finalState = true;
    }

    if (this.finalState === true) {
      this.finalTimer += deltaTime;
      if (this.finalTimer > 700) {
        this.goodAlpha = max(0, this.goodAlpha - 20);
      }

      if (this.goodAlpha === 0) {
        this.isFinished = true;
      }
    }

    // 更新点阵背景
    this.dotGrid.update();
  }

  display() {
    // 绘制点阵背景
    this.dotGrid.display();

    textSize(80);
    textAlign(CENTER, CENTER);

    // 绘制 "WAVE AT ME"
    fill(255, 255, 255, this.waveAlpha);
    text("WAVE AT ME", this.textPosX, this.textPosY);

    push();
    textSize(50);
    // 绘制 "TRY PINCHING"
    fill(255, 255, 255, this.pinchAlpha);
    text("TRY PINCHING\nYOUR THUMB&INDEX FINGER", this.textPosX, this.textPosY);
    pop();

    // 绘制 "GOOD"
    fill(255, 255, 255, this.goodAlpha);
    text("GOOD", this.textPosX, this.textPosY);
  }
}

class Scene1 {
  constructor() {
    this.isFinished = false;

    // 初始化点阵背景
    this.dotGrid = new DotGrid(20, 3); // 间距为 20，点大小为 3

    // 初始化文字粒子
    this.textParticles = fontRegular.textToPoints('ABOUT MEMORIES', width / 2 - 213, height / 2, 65, { sampleFactor: 0.2 });
    this.textMove = [];
    for (let i = 0; i < this.textParticles.length; i += 1) {
      let textParticle = this.textParticles[i];
      this.textMove[i] = new TextMove(textParticle.x, textParticle.y, this); // 传递 Scene1 的引用
    }
  }

  display() {
    // 绘制点阵背景
    this.dotGrid.display();

    // 绘制文字粒子
    for (let i = 0; i < this.textMove.length; i += 1) {
      this.textMove[i].display();
    }
  }

  update() {
    // 更新文字粒子
    for (let i = 0; i < this.textMove.length; i += 1) {
      this.textMove[i].update(pD.isPinch); // 将 isPinch 传递给粒子
    }

    // 更新点阵背景
    this.dotGrid.update();
  }
}

class TextMove {
  constructor(x, y, parentScene) {
    this.posX = x;
    this.posY = y;
    this.isMoving = false; // 初始化为不运动
    this.alpha = 255;
    this.parentScene = parentScene; // 引用父场景（Scene1）
  }

  update(isPinch) {
    if (isPinch) {
      this.isMoving = true; // 当 isPinch 为 true 时，开始运动
    }

    if (this.isMoving) {
      this.posX = lerp(this.posX, random(this.posX - 20, this.posX + 20), 0.03); // 添加随机运动效果
      this.posY = lerp(this.posY, random(this.posY - 20, this.posY + 20), 0.03);
      this.alpha = max(0, this.alpha -= 4); // 逐渐减少透明度
    }

    if (this.alpha == 0) {
      this.isFinished = true;
      this.parentScene.isFinished = true; // 设置父场景的 isFinished 为 true
    }
  }

  display() {
    fill(255, 255, 255, this.alpha);
    noStroke();
    circle(this.posX, this.posY, 5); // 调整粒子大小
  }
}

class DotGrid {
  constructor(spacing, dotSize) {
    this.spacing = spacing; // 点之间的间距
    this.dotSize = dotSize; // 点的默认大小
    this.dots = [];

    // 初始化点阵
    for (let x = 0; x < width; x += this.spacing) {
      for (let y = 0; y < height; y += this.spacing) {
        this.dots.push({ x: x, y: y, size: this.dotSize, color: 50 }); // 每个点包含位置、大小和颜色
      }
    }
  }

  update() {
    // 调用 calculateMidpoint() 获取中点坐标
    let midpoint = calculateMidpoint();

    // 更新每个点的大小和颜色
    for (let dot of this.dots) {
      let distance = dist(dot.x, dot.y, midpoint.x, midpoint.y); // 计算点与中点的距离

      // 根据距离调整点的大小，距离越大，点越小
      dot.size = map(distance, 0, width / 2, 7, 2); // 最大值为 7，最小值为 2
      dot.size = constrain(dot.size, 2, 7); // 确保点的大小在范围内

      // 根据距离调整点的颜色，距离越近颜色越亮
      dot.color = map(distance, 0, width / 2, 200, 50); // 最大亮度为 200，最小亮度为 50
      dot.color = constrain(dot.color, 30, 80); // 确保颜色值在范围内
    }
  }

  display() {
    for (let dot of this.dots) {
      fill(dot.color); // 使用每个点的颜色
      noStroke();
      circle(dot.x, dot.y, dot.size); // 使用每个点的大小绘制点
    }
  }
}



class Scene2 {
  constructor() {
    this.isFinished = false;

    // 图片队列
    this.images = [infant1, infant2, adol1, adol2, adol3, adult1, adult2,old1, old2];
    this.currentImageIndex = 0; // 当前图片索引
    this.dotImage = new DotImage(this.images[this.currentImageIndex], 5); // 初始化 DotImage
    this.pinchEndTime = null; // 记录 pinch 松手的时间
    this.isPinchDetected = false; // 是否检测到 pinch 手势
  }

  update() {
    if (pD.isPinch) {
      // 如果正在 pinch，重置松手时间并标记为检测到 pinch
      this.pinchEndTime = null;
      this.isPinchDetected = true;
    } else if (this.isPinchDetected) {
      // 如果松手，记录松手时间
      if (this.pinchEndTime === null) {
        this.pinchEndTime = millis();
      }

      // 如果松手超过 2 秒，切换到下一张图片
      if (millis() - this.pinchEndTime > 2000) {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length; // 切换到下一张图片
        this.dotImage.updateImage(this.images[this.currentImageIndex]); // 更新 DotImage 的图片
        this.pinchEndTime = null; // 重置 pinch 时间
        this.isPinchDetected = false; // 重置检测状态
      }
    }

    // 更新点阵
    this.dotImage.update(pD.isPinch);
  }

  display() {
    // 绘制点阵
    this.dotImage.display();
  }
}

class DotImage {
  constructor(img, spacing) {
    this.img = img;
    this.spacing = spacing;
    this.dots = [];
    this.initializeDots();
  }

  initializeDots() {
    this.dots = [];
    this.img.loadPixels();
    for (let x = 0; x < this.img.width; x += this.spacing) {
      for (let y = 0; y < this.img.height; y += this.spacing) {
        let index = (x + y * this.img.width) * 4; // 获取像素索引
        let r = this.img.pixels[index];
        let g = this.img.pixels[index + 1];
        let b = this.img.pixels[index + 2];
        let a = this.img.pixels[index + 3];

        // 将点的初始位置映射到整个画布范围
        let mappedX = random(width / 2 - 10, width /2 + 10);
        let mappedY = random(height / 2 - 5, height / 2 + 5);

        // 计算点阵位置
        let gridX = map(x, 0, this.img.width, 110, width - 110);
        let gridY = map(y, 0, this.img.height, 90, height - 90);

        this.dots.push(new Dot(mappedX, mappedY, r, g, b, a, gridX, gridY));
      }
    }
  }

  updateImage(newImg) {
    this.img = newImg; // 更新图片
    this.initializeDots(); // 重新初始化点阵
  }

  update(isPinch) {
    // 更新每个点的位置
    for (let dot of this.dots) {
      dot.update(isPinch);
    }
  }

  display() {
    // 绘制每个点
    for (let dot of this.dots) {
      dot.display();
    }
  }
}

class Dot {
  constructor(x, y, r, g, b, a, gridX, gridY) {
    this.x = x; // 点的初始 x 坐标
    this.y = y; // 点的初始 y 坐标
    this.r = r; // 点的红色通道
    this.g = g; // 点的绿色通道
    this.b = b; // 点的蓝色通道
    this.a = a; // 点的透明度

    this.noiseOffsetX = random(1000); // 用于生成 x 方向的 Perlin 噪声
    this.noiseOffsetY = random(1000); // 用于生成 y 方向的 Perlin 噪声

    this.targetX = x; // 当前目标 x 坐标
    this.targetY = y; // 当前目标 y 坐标

    this.gridX = gridX; // 点阵的目标 x 坐标
    this.gridY = gridY; // 点阵的目标 y 坐标
  }

update(isPinch) {
  if (isPinch) {
    // 计算点与 pinchX 和 pinchY 的距离
    let distance = dist(this.gridX, this.gridY, pD.pinchX, pD.pinchY);

    // 根据距离调整抖动范围，距离越近抖动越剧烈
    let maxJitter = map(distance, 0, width / 2, 0.01, 69); // 距离越近，抖动范围越大

    // 使用 Perlin 噪声生成抖动值
    let jitterX = map(noise(this.noiseOffsetX * 10), 0, 1, -maxJitter, maxJitter);
    let jitterY = map(noise(this.noiseOffsetY * 10), 0, 1, -maxJitter, maxJitter);

    this.targetX = this.gridX + jitterX;
    this.targetY = this.gridY + jitterY;

    // 根据距离调整点的大小，距离越近点越大
    this.size = map(distance, 0, width / 2, 13, 0.01); // 最大大小为 10，最小大小为 3
  
    // 更新 Perlin 噪声的偏移量
    this.noiseOffsetX += 0.05;
    this.noiseOffsetY += 0.05;
  } else {
    // 使用 Perlin 噪声生成目标位置的偏移量
    this.targetX = map(noise(this.noiseOffsetX), 0, 1, 1, width - 1);
    this.targetY = map(noise(this.noiseOffsetY), 0, 1, 1, height - 5);

    // 更新 Perlin 噪声的偏移量
    this.noiseOffsetX += 0.005;
    this.noiseOffsetY += 0.005;

    // 恢复默认大小
    this.size = 5;
  }

  // 使用 lerp() 平滑移动到目标位置
  this.x = lerp(this.x, this.targetX, 0.05);
  this.y = lerp(this.y, this.targetY, 0.05);
}

display() {
  fill(this.r, this.g, this.b, this.a);
  noStroke();
  circle(this.x, this.y, this.size); // 使用动态大小绘制点
}
}
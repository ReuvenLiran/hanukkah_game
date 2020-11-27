import { getImgUrl } from "./utils";
import { showInstruction, getCurrentInstruction } from "./GameManager";

const BROWSER = {
  SAFARI: false,
  CHROME: false,
  FIREFOX: false,
};

let gradCtx;

function checkIsSafari() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("safari") != -1) {
    if (ua.indexOf("chrome") === -1) {
      BROWSER.SAFARI = true;
    } else {
      BROWSER.CHROME = true;
    }
  } else {
    BROWSER.SAFARI = true;
  }
}

checkIsSafari();

let globalRatio = 1;
const MENORAH_PADDING_LEFT = 100;
const MENORAH_PADDING_TOP = 10;

// canvas.width = canvasWidthRes;
// canvas.height = canvasHeightRes;
let imageWidth = 750;
let imageHeight = 800;
let ctx;
let canvas;

const candle = new Image();
candle.src = getImgUrl("candle.png");

let mainCandleParticles = [];
const mouse = {
  x: 0,
  y: 0,
};

const audioMatchStrike = document.getElementById("audio-match-strike");
const audioFire = document.getElementById("audio-fire");
audioFire.currentTime = 4;

let matchStrikeSoundTimeout;
let isMatchStriking = null;

const CANDLES = [
  {
    // First
    originalX: 36,
    originalY: 58,
    offsetX: 42,
    offsetY: 55,
    particles: [],
  },
  {
    // Second
    originalX: 107,
    originalY: 58,
    offsetX: 124,
    offsetY: 56,
    particles: [],
  },
  {
    // Third
    originalX: 179,
    originalY: 55,
    offsetX: 206,
    offsetY: 53,
    particles: [],
  },
  {
    // Fourth
    originalX: 250,
    originalY: 53,
    offsetX: 287,
    offsetY: 51,
    particles: [],
  },
  {
    // Fifth
    originalX: 327,
    originalY: 10,
    offsetX: 375,
    offsetY: 10,
    particles: [],
  },
  {
    // Sixth
    originalX: 405,
    originalY: 52,
    offsetX: 464,
    offsetY: 52,
    particles: [],
  },
  {
    // Seventh
    originalX: 475,
    originalY: 54,
    offsetX: 544,
    offsetY: 54,
    particles: [],
  },
  {
    // Eighth
    originalX: 548,
    originalY: 54,
    offsetX: 627,
    offsetY: 54,
    particles: [],
  },
  {
    // Ninth
    originalX: 618,
    originalY: 55,
    offsetX: 709,
    offsetY: 53,
    particles: [],
  },
];

function playWrongSound() {
  let randomIndex = Math.round(Math.random()) * 1;
  if (randomIndex < 0) {
    randomIndex = 0;
  } else if (randomIndex > 1) {
    randomIndex = 1;
  }
  const sounds = document.querySelectorAll(".audio-wrong");
  const sound = sounds[randomIndex];
  sound.play();
}

function getResponsiveXY(offsetX, offsetY) {
  return {
    x:
      offsetX +
      (canvas.width - imageWidth) -
      MENORAH_PADDING_LEFT * globalRatio,
    y:
      offsetY +
      (canvas.height - imageHeight) -
      MENORAH_PADDING_TOP * globalRatio,
  };
}

//Lets create some particles now
function createParticles(x, y) {
  let particle_count = 50; //70 * globalRatio * 0.5;
  particle_count = 30; // particle_count < 50 ? 50 : particle_count;
  const particles = [];
  for (var i = 0; i < particle_count; i++) {
    particles.push(new particle(x, y));
  }
  return particles;
}

function particle(x = 0, y = 0) {
  this.speed = {
    x:
      ((-2.5 + Math.random() * 5) / 4) *
      (globalRatio < 1 ? 1 : globalRatio) *
      1.1,
    y:
      ((-18 + Math.random() * 10) / 3) *
        (globalRatio < 1 ? 1 : globalRatio) *
        1.1 -
      3,
  };
  if (globalRatio < 0.6) {
    this.speed.x *= globalRatio; //0.8;
    this.speed.y *= globalRatio; //0.8;
    // alert(globalRatio)
  }

  //location = mouse coordinates
  //Now the flame follows the mouse coordinates
  this.location = { x, y };

  //radius range = 10-30
  this.radius = globalRatio * 0.85 * 10; // 10 + Math.random() * 20;
  //life range = 20-30
  this.life = 20 + Math.random() * 10 - 15;
  if (globalRatio < 1) {
    this.life -= 5;
  }
  this.remaining_life = this.life;
  //colors
  this.r = Math.round(Math.random() * 255);
  this.g = Math.round(Math.random() * 255);
  this.b = Math.round(Math.random() * 255);
}

var m = { x: 400, y: 300 };

function drawLight(x, y) {
  ctx.globalCompositeOperation = "source-over";

  var g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(1, "rgba(255,206,96,0)");
  g.addColorStop(0, "rgba(255,206,96,1)");
  ctx.fillStyle = g;
}

function drawFire(particles2, initialX, initialY) {
  ctx.globalCompositeOperation = "lighter";
  for (var i = 0; i < particles2.length; i++) {
    var p = particles2[i];
    ctx.beginPath();
    //changing opacity according to the life.
    //opacity goes to 0 at the end of life of a particle
    p.opacity = Math.round((p.remaining_life / p.life) * 100) / 100;
    //a gradient instead of white fill
    var gradient = ctx.createRadialGradient(
      p.location.x,
      p.location.y,
      0,
      p.location.x,
      p.location.y,
      p.radius
    );
    gradient.addColorStop(
      0,
      "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")"
    );
    gradient.addColorStop(
      0.5,
      "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")"
    );
    gradient.addColorStop(1, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 0)");
    ctx.fillStyle = gradient;
    ctx.arc(p.location.x, p.location.y, p.radius, Math.PI * 2, false);
    ctx.fill();

    //lets move the particles
    p.remaining_life--;
    // p.radius -= 0.1;
    const radiusMultiplier = globalRatio * 0.85;
    p.radius -= radiusMultiplier === 1 ? 0.15 : 0.15 * radiusMultiplier;

    p.location.x += p.speed.x;
    p.location.y += p.speed.y;

    //regenerate particles
    if (p.remaining_life < 0 || p.radius < 0) {
      //a brand new particle replacing the dead one
      particles2[i] = new particle(initialX, initialY);
    }
  }
}

function playFireSound() {
  try {
    if (isMatchStriking === false) {
      //&& instructionIndex > 1) {
      audioFire.currentTime = 4;
      audioFire.play();
    }
  } catch (e) {
    console.log(e);
  }
}

export function onClick(e) {
  const CLICK_AREA_SIZE = 30 * globalRatio;

  const bounds = e.target.getBoundingClientRect();
  const x = e.pageX - bounds.left - window.scrollX; // is window.scrollX same for Y
  const y = e.pageY - bounds.top - window.scrollY; //
  CANDLES.forEach(function (candle, index) {
    const { x: rX, y: rY } = getResponsiveXY(candle.offsetX, candle.offsetY);
    const instruction = getCurrentInstruction();

    const candleIndex =
      instruction && instruction.data ? instruction.data.candleIndex : -1;

    if (
      candleIndex >= 0 &&
      rX + CLICK_AREA_SIZE > x &&
      rX - CLICK_AREA_SIZE < x &&
      rY + CLICK_AREA_SIZE > y &&
      rY - CLICK_AREA_SIZE < y
    ) {
      if (index === candleIndex) {
        audioMatchStrike.pause();
        audioMatchStrike.play();
        isMatchStriking = true;
        audioMatchStrike.currentTime = 0;
        clearTimeout(matchStrikeSoundTimeout);

        function onEndMatchStrike() {
          audioMatchStrike.pause();
          isMatchStriking = false;
        }

        matchStrikeSoundTimeout = setTimeout(onEndMatchStrike, 3500);
        const time = BROWSER.SAFARI ? 500 : 0;

        setTimeout(() => {
          candle.particles = createParticles(rX, rY);
          showInstruction();
        }, time);
      } else if (candle.particles.length === 0) {
        if (BROWSER.SAFARI) {
          showInstruction(true);
          setTimeout(() => {
            playWrongSound();
          }, 0);
        } else {
          showInstruction(true);
          setTimeout(() => {
            playWrongSound();
          }, 100);
        }
      }
    }
  });
}

export function onMouseMove(e) {
  const bounds = e.target.getBoundingClientRect();
  mouse.x = e.pageX - bounds.left - window.scrollX; // is window.scrollX same for Y
  mouse.y = e.pageY - bounds.top - window.scrollY; //
}

var r = 100;

function flicker() {
  var a = Math.random() > 0.5 ? 0 : 1;
  var b = Math.random() > 0.5 ? 0 : 1;
  var c = Math.random() > 0.5 ? 0 : 1;
  if (a == b && b == c) {
    r = Math.random() > 0.5 ? 100 : 102;
  }
}

export function draw() {
  flicker();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "source-over";

  var g = ctx.createRadialGradient(
    mouse.x,
    mouse.y,
    0,
    mouse.x,
    mouse.y,
    r * globalRatio
  );
  g.addColorStop(1, "rgba(255,206,96,0)");
  g.addColorStop(0, "rgba(255,206,96,1)");
  ctx.fillStyle = g;

  ctx.save();

  CANDLES.forEach((candle) => {
    if (candle.particles.length > 0) {
      const { x: rX, y: rY } = getResponsiveXY(candle.offsetX, candle.offsetY);
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawLight(rX, rY);
    }
  });

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const numOfLightedCandles = CANDLES.filter(
    (candle) => candle.particles.length > 0
  ).length;
  ctx.fillStyle = `rgba(0,0,0,${0.6 - numOfLightedCandles * 0.03})`;

  ctx.globalCompositeOperation = "xor";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "source-over";

  ctx.save();

  const pos = { x: mouse.x, y: mouse.y };
  const FIX_POSITION_X = globalRatio * 16;
  const FIX_POSITION_Y = globalRatio * 125;
  ctx.translate(pos.x + FIX_POSITION_X, pos.y + FIX_POSITION_Y);
  ctx.rotate((-7 * Math.PI) / 180);
  const imgHeight = globalRatio * (550 / 2.1); // / 2.7; //80;
  const imgWidth = globalRatio * (55 / 2.1); // / 4; //15;

  ctx.drawImage(candle, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
  ctx.restore();

  drawFire(mainCandleParticles, mouse.x, mouse.y);

  CANDLES.forEach((candle) => {
    if (candle.particles.length > 0) {
      const { x: rX, y: rY } = getResponsiveXY(candle.offsetX, candle.offsetY);
      drawFire(candle.particles, rX, rY);
    }
  });

  // const h = canvas.height;
  // const w = canvas.width;
  // ctx.globalCompositeOperation = 'destination-in';
  // ctx.drawImage(gradCtx.canvas, 300 - w / 2, 300 - h / 2);
  // ctx.globalCompositeOperation = 'lighten';
  // ctx.fillRect(0, 0, w, h);
}

export function onResizeCanvas(_imageWidth, _imageHeight, _globalRatio) {
  globalRatio = _globalRatio;
  imageWidth = _imageWidth;
  imageHeight = _imageHeight;

  mainCandleParticles = createParticles(mouse.x, mouse.m);

  CANDLES.forEach((candle) => {
    candle.offsetX = candle.originalX * globalRatio;
    candle.offsetY = candle.originalY * globalRatio;
  });
}

function updateGradient() {
  const w = canvas.width;
  const h = canvas.height;
  var grad = gradCtx.createRadialGradient(w / 2, h / 2, w / 8, w / 2, h / 2, 0);
  grad.addColorStop(0, 'transparent');
  grad.addColorStop(1, 'white');
  gradCtx.fillStyle = grad;
  gradCtx.filter = "blur(5px)";
  gradCtx.fillRect(0, 0, w, h);
}

export function drawCanvas(_canvas) {
  canvas = _canvas;
  ctx = canvas.getContext("2d");
  gradCtx = canvas.cloneNode().getContext('2d');
  draw(canvas);
  setInterval(draw, 33);
  setInterval(playFireSound, 8000);
  playFireSound();
}

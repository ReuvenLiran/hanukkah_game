import { getImgUrl } from "../utils";
import {store} from "../store";
import { showInstruction, getCurrentInstruction } from "../GameManager";
import {
  BROWSER,
  MENORAH_PADDING_LEFT,
  MENORAH_PADDING_TOP,
  CANDLES,
} from "./consts";

let gradCtx;
let imageWidth = 750;
let imageHeight = 800;
let ctx;
let canvas;
let characterRef;
let candleRef;
let mainCandleParticles = [];
let globalRatio = 1;
let matchStrikeSoundTimeout;
let isMatchStriking = null;

const candle = new Image();
candle.src = getImgUrl("candle.png");

const mouse = {
  x: 0,
  y: 0,
};

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

function drawLightForWholeMenorah(numOfLightedCandles) {
  // numOfLightedCandles = 1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const {leftPosition, topPosition} = store.getState().canvas;

  ctx.globalCompositeOperation = "source-over";
  const radius = imageHeight / 2;
  const x = leftPosition + (imageWidth/2); //canvas.width - (imageWidth - (radius / 2));
  const y = topPosition + (imageHeight/2) - (100 * globalRatio); //canvas.height - imageHeight) + imageHeight / 2;

  var g = ctx.createRadialGradient(x, y, 0, x, y, radius);
  g.addColorStop(1, "rgba(255,206,96,0)");
  // g.addColorStop(0, `rgba(255,206,96,1)`);

  g.addColorStop(0, `rgba(255,206,96,${numOfLightedCandles * 0.02})`);
  ctx.fillStyle = g;
}

function drawLight(x, y, radius) {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "source-over";

  var g = ctx.createRadialGradient(x, y, 0, x, y, radius * globalRatio);
  g.addColorStop(1, "rgba(255,206,96,0)");
  g.addColorStop(0, "rgba(255,206,96,1)");
  ctx.fillStyle = g;
}

function drawMoonLight() {
  const { wasFocusDone } = store.getState().general;
  let x = (150/3) + 150;
  let y = (150/3) + 50;
  if (wasFocusDone) {
    x = (150/2) + 140;
    y = (150/2) + 50;
  }

  x = x * globalRatio;
  y = y * globalRatio;
  const radius = 150 * globalRatio;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "source-over";

  var g = ctx.createRadialGradient(x, y, 0, x, y, radius);
  g.addColorStop(1, "rgba(255,255,255,0)");
  g.addColorStop(0, "rgba(255,255,255,1)");
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
      const audioFire = document.getElementById("audio-fire");
      audioFire.currentTime = 4;
      audioFire.play();
    }
  } catch (e) {
    console.log(e);
  }
}

function playMatchStrikeSound () {
  const audioMatchStrike = document.getElementById("audio-match-strike");
  if (audioMatchStrike) {
    audioMatchStrike.play();
  }
}

function pauseMatchStrikeSound () {
  const audioMatchStrike = document.getElementById("audio-match-strike");
  if (audioMatchStrike) {
    audioMatchStrike.pause();
    audioMatchStrike.currentTime = 0;
  }
}

export function onClickCandle(e) {
  const CLICK_AREA_SIZE = 30 * globalRatio;

  const bounds = e.target.getBoundingClientRect();
  const x = e.pageX - bounds.left - window.scrollX; // is window.scrollX same for Y
  const y = e.pageY - bounds.top - window.scrollY; //

  CANDLES.forEach(function (candle, index) {
    let { x: rX, y: rY } = getResponsiveXY(candle.offsetX, candle.offsetY);

    const instruction = getCurrentInstruction();

    const candleIndex =
      instruction && instruction.data ? instruction.data.candleIndex : -1;

    if (candleIndex === 0) {
      rX = candle.offsetX;
      rY = candle.offsetY;
    }

    if (
      candleIndex >= 0 &&
      rX + CLICK_AREA_SIZE > x &&
      rX - CLICK_AREA_SIZE < x &&
      rY + CLICK_AREA_SIZE > y &&
      rY - CLICK_AREA_SIZE < y
    ) {
      if (index === candleIndex) {
        pauseMatchStrikeSound();
        playMatchStrikeSound();
        
        isMatchStriking = true;
        clearTimeout(matchStrikeSoundTimeout);

        function onEndMatchStrike() {
          pauseMatchStrikeSound();
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

function drawLightForCharacter () {
  const height = 475.99 * globalRatio;
  const width = 279.89 * globalRatio;;
  const x = width / 2;
  const y = window.innerHeight - (height / 2);
  const radius = (height / 2);

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "source-over";

  var g = ctx.createRadialGradient(x, y, 0, x, y, radius * globalRatio);
  g.addColorStop(1, "rgba(255,255,255,0)");
  g.addColorStop(0, "rgba(255,255,255,0.6)");
  ctx.fillStyle = g;
  drawLight(x, y, radius);

  // drawLight(width / 2, window.innerHeight - (height / 2), height / 2);

}

export function moveCandle(e) {
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

  drawMoonLight();
  drawLight(mouse.x, mouse.y, 100);

  ctx.save();

  CANDLES.forEach((candle, candleIndex) => {
    if (candle.particles.length > 0) {
      let { x: rX, y: rY } = getResponsiveXY(candle.offsetX, candle.offsetY);
      if (candleIndex === 0) {
        rX = candle.offsetX;
        rY = candle.offsetY;
        drawLight(rX, rY, 200);
      } else {
        drawLight(rX, rY, 100);
      }
    }
  });
  const numOfLightedCandles = CANDLES.filter(
    (candle) => candle.particles.length > 0
  ).length;

  drawLightForWholeMenorah(numOfLightedCandles);

  // drawLightForCharacter();

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ctx.fillStyle = `rgba(0,0,0,${0.8 - numOfLightedCandles * 0.03})`;
  
  ctx.fillStyle = `rgba(0,0,0,0.8)`;


  ctx.globalCompositeOperation = "xor";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "source-over";

  if (candleRef) { 
     candleRef.style.transform = `translate(${mouse.x + 1}px, ${mouse.y}px) rotateZ(-7deg)`;
  }

  drawFire(mainCandleParticles, mouse.x - 1, mouse.y + 2);

  // Candle of character
  // drawFire(mainCandleParticles,196 * globalRatio, canvas.height - (235 * globalRatio));

  // drawFire(mainCandleParticles,196 * globalRatio, canvas.height - (235 * globalRatio));

  CANDLES.forEach((candle, candleIndex) => {
    if (candle.particles.length > 0) {
      let { x: rX, y: rY } = getResponsiveXY(candle.offsetX, candle.offsetY);
      if (candleIndex === 0) {
        rX = candle.offsetX;
        rY = candle.offsetY;
      }
      drawFire(candle.particles, rX, rY);
    }
  });
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
  console.log("CCCCC", CANDLES[0])
}

function updateGradient() {
  const w = canvas.width;
  const h = canvas.height;
  var grad = gradCtx.createRadialGradient(w / 2, h / 2, w / 8, w / 2, h / 2, 0);
  grad.addColorStop(0, "transparent");
  grad.addColorStop(1, "white");
  gradCtx.fillStyle = grad;
  gradCtx.filter = "blur(5px)";
  gradCtx.fillRect(0, 0, w, h);
}

export function drawCanvas(_canvas, _characterRef, _candleRef) {
  canvas = _canvas;
  characterRef = _characterRef;
  candleRef = _candleRef;

  ctx = canvas.getContext("2d");
  gradCtx = canvas.cloneNode().getContext("2d");
  draw();
  setInterval(draw, 33);
  setInterval(playFireSound, 8000);
  playFireSound();
}

// function drawPanda () {
//   const pandaCanvas =
// }

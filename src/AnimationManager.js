import { store } from "./store.js";
import { MOVE_IMAGE, CHANGE_IMAGE, SET_ANIMATION_TYPE } from "./reducers";
import {
  WALKING_FRAMES,
  SPEAKING_FRAMES
} from './animationsConsts'

const moveToImage = (imageNumber) =>
  store.dispatch({
    type: MOVE_IMAGE,
    imageNumber,
  });

const changeImage = (imageBackground) =>
  store.dispatch({
    type: CHANGE_IMAGE,
    imageBackground,
  });

const setAnimationType = (animationType) => store.dispatch({
  type: SET_ANIMATION_TYPE,
  animationType,
})

function setSpeakingFirstFrame() {
  moveToImage(0);
}


export function animateSpeak(sentence, onDone, time = 0) {
  setAnimationType('SPEAKING');

  const words = sentence.split(" ").join("");
  const numOfWords = words.length;

  let imgIndex = 0;
  let forward = true;

  const interval = setInterval(() => {
    moveToImage(imgIndex);

    if (imgIndex === SPEAKING_FRAMES.length) {
      forward = false;
    } else if (imgIndex === 0) {
      forward = true;
    }
    if (forward) {
      imgIndex += 1;
    } else {
      imgIndex -= 1;
    }
  }, 55);

  setTimeout(() => {
    setSpeakingFirstFrame();
    clearInterval(interval);
    onDone && setTimeout(onDone, time);
  }, numOfWords * 100);
}

export function animateWalking(time, onDone) {
  setAnimationType('WALKING');
  let imgIndex = 0;
  let forward = true;

  const interval = setInterval(() => {
    moveToImage(imgIndex);

    if (imgIndex === WALKING_FRAMES.length) {
      forward = false;
      // imgIndex+=1;
    } else if (imgIndex === 0) {
      forward = true;
    }
    if (forward) {
      imgIndex += 1;
    } else {
      imgIndex = 0;
    }
  }, 33);

  setTimeout(() => {
    setSpeakingFirstFrame();
    clearInterval(interval);
    onDone && setTimeout(onDone, time);
  }, time);
}

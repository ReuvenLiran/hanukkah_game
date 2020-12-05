import { store } from "./store.js";
import {
  SET_CLASS_NAME,
  MOVE_IMAGE,
  CHANGE_IMAGE,
  SET_TRANSITION_TIME,
  UPDATE_LOCATION,
  SET_ANIMATION_TYPE,
} from "./reducers";
import { FRAMES_BY_TYPE, TYPES } from "./animationsConsts";

const moveToImage = (imageNumber) =>
  store.dispatch({
    type: MOVE_IMAGE,
    imageNumber,
  });

const setClassName = (className) =>
  store.dispatch({
    type: SET_CLASS_NAME,
    className,
  });

const setAnimationType = (animationType) =>
  store.dispatch({
    type: SET_ANIMATION_TYPE,
    animationType,
  });


  export const updateLocation = (x,y) => {
    store.dispatch({
      type: UPDATE_LOCATION,
      x, 
      y
    });
  }


  export const setTransitionTime = (transitionTime) => {
    store.dispatch({
      type: SET_TRANSITION_TIME,
      transitionTime
    });
  }

  

function setSpeakingFirstFrame() {
  moveToImage(0);
}

export function animateCharacter({
  type,
  frameDuration,
  runOnce,
  duration,
  onDone,
  className,
  x, 
  y
}) {
  const frames = FRAMES_BY_TYPE[type];
  setAnimationType(type);

  let imgIndex = 0;
  let forward = true;

  if (x || y) {
    const { x: posX = 0, y: posY = 0 } = store.getState().character;
    const newX = x ? posX + x : posX;
    const newY = y ? posY +  y : posY;
    updateLocation(newX, newY);
  }
  setTransitionTime(duration);

  const interval = setInterval(() => {
    if (className) {
      setClassName(className);
    }
    moveToImage(imgIndex);
    // if (x || y) {
    //   const { x: posX = 0, y: posY = 0 } = store.getState().character;
    //   const { globalRatio } = store.getState().canvas;
    //   const newX = x ? posX + x : posX;
    //   const newY = y ? posY +  y : posY;
    //   console.log("ZZZZZ", posX, x)
    //   updateLocation(newX, newY);
    // }

    if (imgIndex === frames.length - 1) {
      if (runOnce) {
        clearInterval(interval);
      }
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
  }, frameDuration);

  if (!runOnce) {
    setTimeout(() => {
      setSpeakingFirstFrame();
      clearInterval(interval);
      onDone && onDone();
    }, duration);
  }
}

export function animateSpeak(withCandle, sentence, onDone) {
  const words = sentence.split(" ").join("");
  const numOfWords = words.length;

  animateCharacter({
    type: withCandle ? TYPES.SPEAKING_WITH_CANDLE : TYPES.SPEAKING,
    frameDuration: 80,
    runOnce: false,
    duration: numOfWords * 100,
    onDone,
  });
}

// export function animateSpeakWithCandle(duration, onDone) {
//   animateCharacter(TYPES.SPEAKING_WITH_CANDLE, 55, false, duration, onDone);
// }

export function animateWalking(duration, onDone, className, x, y) {
  animateCharacter({
    type: TYPES.WALKING,
    frameDuration: 33,
    runOnce: false,
    duration,
    onDone,
    className,
    x,
    y
  });
}

export function animateUseCandle(duration, onDone) {
  animateCharacter({
    type: TYPES.USE_CANDLE,
    frameDuration: 66,
    runOnce: true,
    duration,
    onDone,
  });
}

import React, { forwardRef, useRef } from "react";
import { connect } from "react-redux";
import { getImgUrl } from "../utils";
import { FRAMES_BY_TYPE, TYPES } from "../animationsConsts";
import classNames from "classnames";

const RATION_REAL_WIDTH_HEIGHT = 279.9 / 476;
const LAST_FRAME = 38;

let i = 0;
const OFFSET_Y = 1;

const PANDA_IMGAE = "panda_new.svg";
// const POSItION_X_FACTOR = -392.5;
// const POSItION_X_FACTOR = -391.8;
const POSItION_X_FACTOR = -392.7;

const ANIMATION_TYPES = {
  [TYPES.SPEAKING_WITH_CANDLE]: {
    className: "panda-talking",
    backgroundImage: PANDA_IMGAE,
    backgroundPosition: (imageNumber) => {
      const backgroundPositionX =
        POSItION_X_FACTOR *
        FRAMES_BY_TYPE[TYPES.SPEAKING_WITH_CANDLE][imageNumber];

      const frameNumber = FRAMES_BY_TYPE[TYPES.SPEAKING_WITH_CANDLE][imageNumber];

      return {
        frameNumber,
        // backgroundPositionX,
        // backgroundPositionX: (FRAMES_BY_TYPE[TYPES.SPEAKING_WITH_CANDLE][imageNumber] / LAST_FRAME) * 100,
        backgroundPositionY: 0,
      };
    },
  },
  [TYPES.USE_CANDLE]: {
    className: "panda-talking",
    backgroundImage: PANDA_IMGAE,
    backgroundPosition: (imageNumber) => {
      const backgroundPositionX =
        POSItION_X_FACTOR * FRAMES_BY_TYPE[TYPES.USE_CANDLE][imageNumber];
  
      const frameNumber = FRAMES_BY_TYPE[TYPES.USE_CANDLE][imageNumber];

      return {
        frameNumber,
        // backgroundPositionX: (FRAMES_BY_TYPE[TYPES.USE_CANDLE][imageNumber] / LAST_FRAME) * 100,
        // backgroundPositionX,
        backgroundPositionY: 0,
      };
    },
  },

  [TYPES.SPEAKING]: {
    className: "panda-talking",
    backgroundImage: PANDA_IMGAE,
    backgroundPosition: (imageNumber) => {
      const frameNumber = FRAMES_BY_TYPE[TYPES.SPEAKING][imageNumber];

      const backgroundPositionX =
        POSItION_X_FACTOR * FRAMES_BY_TYPE[TYPES.SPEAKING][imageNumber];
      return {
        frameNumber,
        // backgroundPositionX: (FRAMES_BY_TYPE[TYPES.SPEAKING][imageNumber] / LAST_FRAME) * 100,
        // backgroundPositionX,
        backgroundPositionY: 0,
      };
    },
  },
  [TYPES.WALKING]: {
    className: "panda-walking",
    backgroundImage: PANDA_IMGAE,
    backgroundPosition: (imageNumber) => {
      const backgroundPositionX =
        POSItION_X_FACTOR * FRAMES_BY_TYPE[TYPES.WALKING][imageNumber];
      let backgroundPositionY = 0;

      if (imageNumber >= 0 && imageNumber < 9) {
        backgroundPositionY = imageNumber; // 0 - 8
      } else if (imageNumber >= 9 && imageNumber < 18) {
        // 9 - 17
        backgroundPositionY = 9 - (imageNumber - 9);
      } else if (imageNumber >= 19 && imageNumber < 28) {
        // 19 - 27
        backgroundPositionY = imageNumber - 19;
      } else if (imageNumber >= 28) {
        backgroundPositionY = 7 - (imageNumber - 28);
      }

      const frameNumber = FRAMES_BY_TYPE[TYPES.WALKING][imageNumber];


      return {
        frameNumber,
        // backgroundPositionX: (FRAMES_BY_TYPE[TYPES.WALKING][imageNumber] / LAST_FRAME) * 100,
        // backgroundPositionX,
        backgroundPositionY: backgroundPositionY * OFFSET_Y,
      };
    },
  },
};

function Character(props) {
  const {
    x,
    y,
    getRef,
    className,
    imageNumber,
    animationType,
    globalRatio,
    resizeRatio,
    transitionTime
  } = props;
  const animation = ANIMATION_TYPES[animationType];

  const {
    // backgroundPositionX,
    frameNumber,
    backgroundPositionY,
  } = animation.backgroundPosition(imageNumber);

  const scale = 0.65 * globalRatio;

  const padding = (1 / LAST_FRAME) * 0.09;
  const e = 30;
  const b = 392 / 400;
  const P = (1 / 38) * 0.09;
  const PP = ((e / 38) - P) * 100
  console.log("PPPP",(e / 38),  P, PP)
  const backgroundPositionX = ((frameNumber / LAST_FRAME) - padding) * 100;
  const style = {
    // left: 30 * globalRatio,
    bottom: 10,
    transformOrigin: `0px 480px`,
    transform: `scale(${scale})`,
    backgroundPosition: `${backgroundPositionX}%${backgroundPositionY}%`,
    // backgroundPosition: `${PP}%, ${0}px`,

    // backgroundPosition: `${POSItION_X_FACTOR * 0 + 0}px, ${backgroundPositionY}px`,
    // backgroundPosition: `${((7/38) - (0.0)) * 100}% ${backgroundPositionY * globalRatio}px`,
    backgroundImage: `url(${getImgUrl(animation.backgroundImage)})`,
  };

  const transform = `translate(${x * (globalRatio)}px, ${y * (1 / scale)}px)`;
  // console.log("SSSSS", frameNumber, style.backgroundPosition)
  // alert(globalRatio)
  // const ratio = 321 / 476;
  console.log("QQQQ", transitionTime)
  return (
    <div
      id="character-wrapper"
      style={{
        // tranisitonDuration: `${transitionTime}ms`,
        transform,  
        transformOrigin: style.transformOrigin,
        bottom: 0,
        position: "absolute",
        // left: x * globalRatio
        left: 0,
      }}
      className={classNames(`${animation.className}-wrapper`)}
    >
      <div
        id="character"
        ref={getRef}
        style={{
          // width: 405, //266.3,
          // height: 479.6,
          // width: ratio * 477 * globalRatio,
          // height: 477 * globalRatio,
          // bottom: 0,
          // position: "absolute",
          // // left: x * globalRatio,
          // left: 0,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${100 * (LAST_FRAME + 1)}%`,
          transform: style.transform,
          transformOrigin: style.transformOrigin,
          backgroundPosition: style.backgroundPosition,
          backgroundImage: style.backgroundImage,
        }}
        className={classNames(animation.className)}
      />
  </div>
  );
}

function mapStateToProps(state) {
  return {
    x: state.character.x,
    y: state.character.y,
    className: state.character.className,
    animationType: state.character.animationType,
    globalRatio: state.canvas.globalRatio,
    imageNumber: state.character.imageNumber,
    backgroundImage: state.character.backgroundImage,
    resizeRatio: state.general.resizeRatio,
    transitionTime: state.character.transitionTime
  };
}

export default connect(mapStateToProps)(Character);

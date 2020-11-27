import React from "react";
import { connect } from "react-redux";
import { getImgUrl } from "./utils";
import {
  WALKING_FRAMES,
  SPEAKING_FRAMES
} from './animationsConsts'

const RATION_REAL_WIDTH_HEIGHT = 279.9 / 476;

let i = 0;
const OFFSET_Y = 1;

const ANIMATION_TYPES = {
  SPEAKING: {
    className: "panda-talking",
    backgroundImage: "panda.svg",
    backgroundPosition: (imageNumber) => {
      const backgroundPositionX = -393 * SPEAKING_FRAMES[imageNumber];
      // const backgroundPositionX = -400 * SPEAKING_FRAMES[imageNumber];
      return {
        backgroundPositionX,
        backgroundPositionY: 0,
      };
    },
  },
  WALKING: {
    className: "panda-walking",
    backgroundImage: "panda.svg",
    backgroundPosition: (imageNumber) => {
      const backgroundPositionX = -393 * WALKING_FRAMES[imageNumber];
      let backgroundPositionY = 0;
      const isBackward = (i >= 9 && i <= 17) || i >= 28;
      
      if (imageNumber >= 0 && imageNumber < 9) {
        backgroundPositionY = imageNumber;// 0 - 8
      } else if (imageNumber >= 9 && imageNumber < 18) { // 9 - 17
        backgroundPositionY = 9 - (imageNumber - 9);
      } else if (imageNumber >= 19 && imageNumber < 28) { // 19 - 27
        backgroundPositionY = imageNumber - 19;
      } else if (imageNumber >= 28) {
        backgroundPositionY = 7 - (imageNumber - 28);
      }

      return {
        backgroundPositionX,
        backgroundPositionY: backgroundPositionY * OFFSET_Y
      };
    },
  },
};

function Character(props) {
  const { imageNumber, animationType, globalRatio } = props;
  const animation = ANIMATION_TYPES[animationType];

  const {
    backgroundPositionX,
    backgroundPositionY,
  } = animation.backgroundPosition(imageNumber);
 
  const style = {
    left: 30 * globalRatio,
    bottom: 10,
    // bottom: `calc(100vh - ${560 * globalRatio}px)`,
    transformOrigin: "bottom left",
    transform: `scale(${0.65 * globalRatio})`,
    backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
    backgroundImage: `url(${getImgUrl(animation.backgroundImage)})`,
  };
  // if (animationType === 'WALKING') {
  //   delete style.backgroundPosition;
  // }
  return <div style={style} className="character" id={animation.className} />;
}

function mapStateToProps(state) {
  return {
    animationType: state.character.animationType,
    globalRatio: state.canvas.globalRatio,
    imageNumber: state.character.imageNumber,
    backgroundImage: state.character.backgroundImage,
  };
}
export default connect(mapStateToProps)(Character);

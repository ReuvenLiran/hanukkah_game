import React, { useEffect } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { getImgUrl, debounce } from "./utils";
import {
  moveCandle,
  onClickCandle,
  drawCanvas,
  onResizeCanvas,
} from "./CanvasManager";
import { canvas } from './reducers'

const MENORAH_PADDING_LEFT = 100;
const MENORAH_PADDING_TOP = 10;

const onClickDebounce = debounce(onClickCandle, 300);

let ref;

let lastHeight = 0;
let lastWidth = 0;
let lastGlobalRatio = 1;

function Canvas(props) {
  const {
    width,
    height,
    leftPosition,
    topPosition,
    imageWidth,
    imageHeight,
    globalRatio,
    resizeCanvas,
    isShown
  } = props;

  const wasResized = !(lastHeight === height && lastWidth === width && globalRatio === lastGlobalRatio);

  const backgroundPosition = `${leftPosition}px ${topPosition}px`;
  const backgroundSize = `${imageWidth}px ${imageHeight}px`;

  if (wasResized) {
    onResizeCanvas(imageWidth, imageHeight, globalRatio);
  }
  lastWidth = width;
  lastHeight = height;

  useEffect(() => {
    drawCanvas(ref);
    resizeCanvas();
    onResizeCanvas(imageWidth, imageHeight, globalRatio);
    // code to run on component mount
  }, []);

  return (
    <canvas
      onLoad={() => {
        onResizeCanvas(imageWidth, imageHeight, globalRatio);
        drawCanvas(ref);
        resizeCanvas();
      }}
      style={{
        backgroundSize,
        backgroundPosition,
        // left: isShown ? 0 : "100vw",
        backgroundImage: `url(${getImgUrl("menorah.png")})`,
      }}
      onClick={onClickDebounce}
      onMouseMove={moveCandle}
      ref={(r) => (ref = r)}
      width={width}
      height={height}
      id="canvas"
      className={classNames({ show: isShown })}
    />
  );
}

const stateToProps = (state) => {
  const {
    width,
    height,
    leftPosition,
    topPosition,
    imageWidth,
    globalRatio,
    imageHeight,
    isShown
  } = state.canvas;
  return {
    isShown,
    globalRatio,
    width,
    height,
    leftPosition,
    topPosition,
    imageWidth,
    imageHeight,
  };
};

const dispatchToProps = {
  resizeCanvas: canvas.resizeCanvas
}

export default connect(stateToProps, dispatchToProps)(Canvas);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { canvas } from "../reducers";
import Menorah from "./Menorah";
import Candle from "./Candle";
import Canvas from "./Canvas1";

function CanvasWraper(props) {
  const {
    width,
    height,
    leftPosition,
    topPosition,
    imageWidth,
    globalRatio,
    imageHeight,
    isShown,
    resizeCanvas,
    characterRef,
  } = props;
  const [candleRef, setCandleRef] = useState();
 
  const backgroundPosition = `${leftPosition}px ${topPosition}px`;
  const backgroundSize = `${imageWidth}px ${imageHeight}px`;

  const shouldRenderCanvas = !!candleRef;

  return (
    <div id="canvas-wrapper"         className={classNames({ show: isShown })}>
      <Menorah
        backgroundSize={backgroundSize}
        backgroundPosition={backgroundPosition}
      />
      <Candle 
        globalRatio={globalRatio}
        getRef={setCandleRef} 
      />

      {shouldRenderCanvas && <Canvas
        resizeCanvas={resizeCanvas}
        candleRef={candleRef}
        characterRef={characterRef}
        width={width}
        height={height}
        leftPosition={leftPosition}
        topPosition={topPosition}
        imageWidth={imageWidth}
        globalRatio={globalRatio}
        imageHeight={imageHeight}
      />}
    </div>
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
    isShown,
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
  resizeCanvas: canvas.resizeCanvas,
};

export default connect(stateToProps, dispatchToProps)(CanvasWraper);

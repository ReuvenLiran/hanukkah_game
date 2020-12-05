import React, { useRef, useEffect } from "react";
import { debounce } from "../utils";
import {
  moveCandle,
  onClickCandle,
  drawCanvas,
  onResizeCanvas,
} from "./CanvasManager";

const onClickDebounce = debounce(onClickCandle, 300);

let lastHeight = 0;
let lastWidth = 0;
let lastGlobalRatio = 1;

export default function Canvas(props) {
  const {
    candleRef,
    characterRef,
    width,
    height,
    imageWidth,
    imageHeight,
    globalRatio,
    resizeCanvas
  } = props;

  const canvasRef = useRef();

  // const candleRef = useRef();
  const wasResized = !(
    lastHeight === height &&
    lastWidth === width &&
    globalRatio === lastGlobalRatio
  );

  if (wasResized) {
    onResizeCanvas(imageWidth, imageHeight, globalRatio);
  }

  lastWidth = width;
  lastHeight = height;

  useEffect(() => {
    drawCanvas(canvasRef.current, characterRef, candleRef);
    resizeCanvas();
    onResizeCanvas(imageWidth, imageHeight, globalRatio);
  }, []);


  return (
    <canvas
        onClick={onClickDebounce}
        onMouseMove={moveCandle}
        ref={canvasRef}
        width={width}
        height={height}
        id="canvas"
        className="layer"
    />
    );
}
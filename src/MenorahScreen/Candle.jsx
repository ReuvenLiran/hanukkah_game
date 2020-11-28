import React from "react";
import { getImgUrl } from "../utils";

export default function Candle(props) {
  const { getRef, globalRatio } = props;
  const candleHeight = globalRatio * (550 / 2.1); // / 2.7; //80;
  const candleWidth = globalRatio * (55 / 2.1); // / 4; //15;

  return (
    <img
      ref={getRef}
      id="main-candle"
      className="layer"
      style={{
        height: candleHeight,
        width: candleWidth,
      }}
      height={candleHeight}
      width={candleWidth}
      src={getImgUrl("candle.png")}
    />
  );
}

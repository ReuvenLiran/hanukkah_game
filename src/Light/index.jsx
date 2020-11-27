import "./style.scss"
import React from "react";
import classNames from "classnames";

export default function Light(props) {
  const { height, width, globalRatio, isLightOn, hideCover } = props;
  return (
    <div id="light-wrapper">
      <div
        id="light-cover"
        className={classNames({"turn-on": isLightOn})}
        style={{
          display: hideCover? "none" : "block",
        }}
      />
      <div
        id="light-background"
        style={{
          width,
          height,
        }}
      />
      <div
        id="light"
        style={{
          width,
          height,
          background: `radial-gradient( circle ${170 * globalRatio}px at ${
            120 * globalRatio
          }px calc(100% - ${
            170 * globalRatio
          }px), rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 20%, rgba(0,0,0,.5) 80%, rgba(0,0,0,.95) 100% )`,
        }}
      />
      <div
        id="light-back"
        style={{
          bottom: globalRatio * 10,
          left: globalRatio * 10,
          width: width - (globalRatio * 20),
          height: height - (globalRatio * 20),
        }}
      />
      <div
        id="light-off"
        style={{
          width,
          height,
        }}
      />
    </div>
  );
}

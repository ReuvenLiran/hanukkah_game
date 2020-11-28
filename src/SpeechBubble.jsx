import "./speechBubble.scss";

import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";

function SpeechBubble(props) {
  const { children, show, bottom, left, globalRatio } = props;

  return (
    <div
      className="speech-bubble-wrapper"
      style={{
        transform: `scale(${globalRatio})`,
        bottom: (476 - 70) * 0.65 * globalRatio,
        left: (279.9 + 10) * 0.9 * globalRatio,
        // bottom: `calc(100vh - ${300 * globalRatio}px)`,
        // left: `${160 * globalRatio}px`,
      }}
    >
      <div className={classNames("speech-bubble", { show })}>
        <div className="speech-bubble__content">{children}</div>
        <div className="speech-bubble-triangle" />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    globalRatio: state.canvas.globalRatio,
    left: state.speechBubble.left,
    bottom: state.speechBubble.bottom,
    show: state.speechBubble.show,
    children: state.speechBubble.content,
  };
}
export default connect(mapStateToProps)(SpeechBubble);

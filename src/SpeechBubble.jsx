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
        transformOrigin: "bottom left",
        bottom: (300) * globalRatio,
        left: (330) * globalRatio,
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

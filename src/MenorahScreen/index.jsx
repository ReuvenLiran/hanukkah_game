import "./style.scss";
import "./style.css";
import { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import SpeechBubble from "../SpeechBubble";
// import { showInstruction } from "../GameManager";
import Character from "./Character";
import Canvas from "./Canvas";
import { canvas, bubble } from "../reducers";
import Moon from './Moon/Moon';
import CreditsStart from "../Credits/CreditsStart";

// setTimeout(function () {
// showInstruction();
// }, 2000);

function App(props) {
  const {
    isCanvasShown,
    isShowStarted,
    globalRatio,
    wasFocusDone,
    resizeCanvas,
    resizeSpeechBubble,
    isLightOn,
  } = props;

  const [isRendered, setIsRendered] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      resizeCanvas();
      resizeSpeechBubble();
      setIsRendered(true);
    }, 100);
    window.addEventListener("resize", () => {
      resizeCanvas();
      resizeSpeechBubble();
    });
    // code to run on component mount
  }, []);

  return (
    <div className={classNames("menorah-screen", {
      "focus-moon": isRendered,
    })}
      style={{
        opacity: isRendered ? 1 : 0,
      }}
    >
      {!wasFocusDone && <CreditsStart />}
      <Moon globalRatio={globalRatio} />
      <Canvas />
      <Character />
      <SpeechBubble />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    wasFocusDone: state.general.wasFocusDone,
    isLightOn: state.general.isLightOn,
    isCanvasShown: state.canvas.isShown,
    isShowStarted: state.general.isShowStarted,
    globalRatio: state.canvas.globalRatio,
  };
}

const disptachToProps = {
  resizeSpeechBubble: bubble.resizeSpeechBubble,
  resizeCanvas: canvas.resizeCanvas,
};

export default connect(mapStateToProps, disptachToProps)(App);

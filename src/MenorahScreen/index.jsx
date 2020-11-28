import "./style.scss";
import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import SpeechBubble from "../SpeechBubble";
import { showInstruction } from "../GameManager";
import Character from "./Character";
import Canvas from "./Canvas";
import { canvas, bubble } from "../reducers";

// setTimeout(function () {
showInstruction();
// }, 2000);

function App(props) {
  const {
    isCanvasShown,
    globalRatio,
    resizeCanvas,
    resizeSpeechBubble,
    isLightOn,
  } = props;

  const [characterRef, setCharacterRef] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      resizeCanvas();
      resizeSpeechBubble();
    }, 100);
    window.addEventListener("resize", () => {
      resizeCanvas();
      resizeSpeechBubble();
    });
    // code to run on component mount
  }, []);

  return (
    <div>
      <Canvas />
      <Character />
      <SpeechBubble />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLightOn: state.general.isLightOn,
    isCanvasShown: state.canvas.isShown,
    globalRatio: state.canvas.globalRatio,
  };
}

const disptachToProps = {
  resizeSpeechBubble: bubble.resizeSpeechBubble,
  resizeCanvas: canvas.resizeCanvas,
};

export default connect(mapStateToProps, disptachToProps)(App);

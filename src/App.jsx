import { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import CreditsBar from "./CreditsBar";
import SpeechBubble from "./SpeechBubble";
import { showInstruction } from "./GameManager";
import Character from "./Character";
import Canvas from "./Canvas";
import { canvas, bubble } from "./reducers";
import TheaterCurtain from "./TheaterCurtain";
import Light from "./Light";

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


  const width = globalRatio * 300;
  const height = globalRatio * 350;

  // const width = isCanvasShown ? globalRatio * 300 : "100vw";
  // const height = isCanvasShown ? globalRatio * 350 : "100vh";
  console.log("QQQQ", isLightOn)
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: "rgb(10, 4, 73)",
    }}>
      <TheaterCurtain hide={isCanvasShown} />
      <Canvas />

      {/* <div
        id="light-off"
        style={{
          zIndex: 1,
          width,
          height
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 2,
          display: "block",
          width,
          height,
          backgroundColor: "rgb(10, 4, 73)",
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
          width,
          height,
        }}
      />
      <div
        id="light-off"
        style={{
          width,
          height
        }}
      /> */}

      <Light 
        hideCover={isCanvasShown}
        isLightOn={isLightOn}
        width={width}
        height={height}
        globalRatio={globalRatio}
      />
      <Character />
      <SpeechBubble />
      {/* <CreditsBar /> */}
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

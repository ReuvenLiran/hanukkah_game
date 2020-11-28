import { useEffect } from "react";
import { connect } from "react-redux";
// import "./App.css";
// import CreditsBar from "./CreditsBar";
// import SpeechBubble from "./SpeechBubble";
import { showInstruction } from "./GameManager";
// import Character from "./MenorahScreen/Character";
// import Canvas from "./Canvas";
import { canvas, bubble } from "./reducers";
import TheaterCurtain from "./TheaterCurtain";
import Light from "./Light";
import MenorahScreen from "./MenorahScreen";

// setTimeout(function () {
// showInstruction();
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

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: "rgb(10, 4, 73)",
    }}>
      <TheaterCurtain hide={isCanvasShown} />
      <MenorahScreen />

      {/* <Light 
        hideCover={isCanvasShown}
        isLightOn={isLightOn}
        width={width}
        height={height}
        globalRatio={globalRatio}
      /> */}
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

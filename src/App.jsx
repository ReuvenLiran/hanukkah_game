import { useEffect, useState } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { general, canvas, bubble } from "./reducers";
import TheaterCurtain from "./TheaterCurtain";
import MenorahScreen from "./MenorahScreen";
// import CreditsStart from "./Credits/CreditsStart";
import { showInstruction } from './GameManager'
import PreloadAssests from "./PreloadAssests"

function App(props) {
  const {
    isCanvasShown,
    globalRatio,
    resizeCanvas,
    resizeSpeechBubble,
    isLightOn,
    isShowStarted,
    isLoading
  } = props;

  const [gameStarted, startGame] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      props.setResizeRatio();
      resizeCanvas();
      resizeSpeechBubble();
    }, 100);
    window.addEventListener("resize", () => {
      // const { globalRatio } = props;
        // updateLocation(props.globalRatio * -600, 0);
      props.setResizeRatio();
      resizeCanvas();
      resizeSpeechBubble();
    });
    // code to run on component mount
  }, []);

  const width = globalRatio * 300;
  const height = globalRatio * 350;

  // const width = isCanvasShown ? globalRatio * 300 : "100vw";
  // const height = isCanvasShown ? globalRatio * 350 : "100vh";
  console.log("isLoading", isLoading)
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        // backgroundColor: "rgb(10, 4, 73)",
      }}
    >
      <PreloadAssests />
      {!gameStarted && <div  style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 15,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgb(10, 4, 73)",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>


        {!isLoading && <button onClick={() => {
          startGame(true);
          showInstruction();
        }}>
          Start Game
          </button>}
      {isLoading && <h1>Loading...</h1>}
      </div>}
      
      {gameStarted && <div
        style={{
          width: "100vw",
          height: "100vh",
          // backgroundColor: "rgb(10, 4, 73)",
        }}
        className={classNames("game", { "start-show": isShowStarted })}
      >
        {/* <TheaterCurtain hide={isCanvasShown} /> */}
        <MenorahScreen />
      </div>}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLightOn: state.general.isLightOn,
    isCanvasShown: state.canvas.isShown,
    globalRatio: state.canvas.globalRatio,
    isShowStarted: state.general.isShowStarted,
    // resizeRatio: state.general.resizeRatio,
    isLoading: general.checkIsLoading(state.general.loadedAssests)
  };
}

const disptachToProps = {
  setResizeRatio: general.setResizeRatio,
  resizeSpeechBubble: bubble.resizeSpeechBubble,
  resizeCanvas: canvas.resizeCanvas,
};

export default connect(mapStateToProps, disptachToProps)(App);
